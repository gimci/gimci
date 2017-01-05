/* Internals */
import GenerateToken from './utils/generateToken'
import File from './utils/FileUtils'
import convertHangyrToRoman from './transcribe/convertHangyrToRoman'
import convertRomanToHangyr from './transcribe/convertRomanToHangyr'

/* Default paths */
const _dictPath = '../assets/elementaryKorean.dict.json'

/**
 *
 */
const search = (_query, dictPath = _dictPath) => {
  const query = convertHangyrToRoman(_query)
  let dict =
    process.env.NODE_ENV === 'web'
    ? require(`../assets/elementaryKorean.dict.json`)
    : JSON.parse(File.read(dictPath))

  const tokensOfQuery = GenerateToken.byDeletion(query)
  const candidates = tokensOfQuery['delete1'].concat(tokensOfQuery['delete2'])
  let res = {}
  res['tier1'] = []
  res['tier2'] = []
  res['tier3'] = []

  // case1
  if (
    dict.hasOwnProperty(query)
    && dict[query]['refer'].includes(query)
  ) {
    res['tier1'].push(query)
  }

  // case2
  // loop through dict['elem']['refer']
  // pick whose refer does not contain elem itself, but only the query string
  if (
    dict.hasOwnProperty(query)
    && !dict[query]['refer'].includes(query)
  ) {
    dict[query]['refer'].map(refer => {
      if(res['tier1'].indexOf(refer) === -1 && res['tier2'].indexOf(refer) === -1) {
        res['tier2'].push(refer)
      }
    })
  }

  // case3
  // loop through candidates
  // pick candiate === dict[candidate]
  candidates.map(candidate => {
    if (
      dict.hasOwnProperty(candidate)
      && dict[candidate]['refer'].includes(candidate)
    ) {
      if(res['tier1'].indexOf(candidate) === -1 && res['tier2'].indexOf(candidate) === -1) {
        res['tier2'].push(candidate)
      }
    }
  })

  // case4
  // loop through dict['elem']['refer'] and candidates
  // match all the possible cases
  candidates.map(candidate => {
    if (
      dict.hasOwnProperty(candidate)
      && !dict[candidate]['refer'].includes(candidate)
    ) {
      dict[candidate]['refer'].map(refer => {
        if(res['tier1'].indexOf(refer) === -1 && res['tier2'].indexOf(refer) === -1 && res['tier3'].indexOf(refer) === -1) {
          res['tier3'].push(refer)
        }
      })
    }
  })

  res = convertSearchRetToHangul(res)
  return res
}

/*
 *
 */
const convertSearchRetToHangul = (tierSet) => {
  for(let i = 0; i < tierSet['tier1'].length; i++) {
    if(tierSet['tier1'][i] !== '') {
      tierSet['tier1'][i] = convertRomanToHangyr(tierSet['tier1'][i])
    }
  }
  for(let i = 0; i < tierSet['tier2'].length; i++) {
    tierSet['tier2'][i] = convertRomanToHangyr(tierSet['tier2'][i])
  }
  for(let i = 0; i < tierSet['tier3'].length; i++) {
    tierSet['tier3'][i] = convertRomanToHangyr(tierSet['tier3'][i])
  }
  return tierSet
}

export default search
