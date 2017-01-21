/* Internals */
import GenerateToken from './utils/generateToken'
import File from './utils/FileUtils'
import convertHangyrToRoman from './transcribe/convertHangyrToRoman'
import convertRomanToHangyr from './transcribe/convertRomanToHangyr'

/* Default paths */
const _dictPath = '../assets/elementaryKorean.dict.json'
const _defaultFlag = 'loose'

/**
 *
 */
const search = (_query, dictPath = _dictPath, flag = _defaultFlag) => {

  // execute softSearch which have tier2 ignoring difference of lower, uppercase && single quota '
  if(flag === 'hard') {
    return hardSearch(_query, dictPath, flag) }

  const query = convertHangyrToRoman(_query)

  let dict = require('../assets/elementaryKorean.dict.json')

  // regex to delete single quota '
  const pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi
  const tokensOfQuery = GenerateToken.byDeletion(query)
  const candidates = tokensOfQuery['delete1'].concat(tokensOfQuery['delete2'])
  let res = {}
  res['tier1'] = []
  res['tier2'] = []
  res['tier3'] = []
  res['tier4'] = []

  // case1
  if (
    dict.hasOwnProperty(query)
    && dict[query]['refer'].includes(query)
  ) {
    res['tier1'].push(query)
  }


  // case3
  // loop through dict['elem']['refer']
  // pick whose refer does not contain elem itself, but only the query string
  if (
    dict.hasOwnProperty(query)
    && !dict[query]['refer'].includes(query)
  ) {
    dict[query]['refer'].map(refer => {
      if (res['tier1'].indexOf(refer) === -1 && res['tier2'].indexOf(refer) === -1 && res['tier3'].indexOf(refer) === -1) {
        // case2
        console.log([1], query.replace(pattern, "").toLowerCase())
        if (pattern.test(query) && (query.replace(pattern, "")).toLowerCase() === refer.toLowerCase()) {
          res['tier2'].push(refer)
        } else if (query.toLowerCase() === refer.toLowerCase() || query.replace(pattern, "") === refer) {
          res['tier2'].push(refer)
        } else {
          res['tier3'].push(refer)
        }
      }
    })
  }

  // case4
  // loop through candidates
  // pick candiate === dict[candidate]
  candidates.map(candidate => {
    if (
      dict.hasOwnProperty(candidate)
      && dict[candidate]['refer'].includes(candidate)
    ) {
      if (res['tier1'].indexOf(candidate) === -1 && res['tier2'].indexOf(candidate) === -1 && res['tier3'].indexOf(candidate) === -1) {
        // case2
        if (pattern.test(query) && query.replace(pattern, "").toLowerCase() === candidate.toLowerCase()) {
          res['tier2'].push(candidate)
        } else if (query.toLowerCase() === candidate.toLowerCase() || query.replace(pattern, "") === candidate) {
          res['tier2'].push(candidate)
        } else {
          res['tier3'].push(candidate)
        }
      }
    }
  })

  // case5
  // loop through dict['elem']['refer'] and candidates
  // match all the possible cases
  candidates.map(candidate => {
    if (
      dict.hasOwnProperty(candidate)
      && !dict[candidate]['refer'].includes(candidate)
    ) {
      dict[candidate]['refer'].map(refer => {
        if (res['tier1'].indexOf(refer) === -1 && res['tier2'].indexOf(refer) === -1 && res['tier3'].indexOf(refer) === -1 && res['tier4'].indexOf(refer) === -1) {
          // case2
          if (pattern.test(query) && query.replace(pattern, "").toLowerCase() === refer.toLowerCase()) {
            res['tier2'].push(candidate)
          } else if (query.toLowerCase() === refer.toLowerCase() || query.replace(pattern, "") === refer) {
            res['tier2'].push(refer)
          } else {
            res['tier4'].push(refer)
          }
        }
      })
    }
  })

  // if query contain single quiota such as 's, 'b ...
  if (pattern.test(query)) {
    const res2 = search(query.replace(pattern, ""))
    res2['tier1'].map(tier1 => {
      // nothing
    })
    res2['tier2'].map(tier2 => {
      if (res['tier2'].indexOf(tier2) === -1) {
        res['tier2'].push(tier2)
      }
    })
    res2['tier3'].map(tier3 => {
      if (res['tier3'].indexOf(tier3) === -1) {
        res['tier3'].push(tier3)
      }
    })
    res2['tier4'].map(tier4 => {
      if (res['tier4'].indexOf(tier4) === -1) {
        res['tier4'].push(tier4)
      }
    })
  }

  res = convertSearchRetToHangul(res, flag)
  return res

}


/*
 *
 */
const hardSearch = (_query, dictPath = _dictPath, flag) => {
  const query = convertHangyrToRoman(_query)

  // temporary off
  // let dict =
  //   process.env.NODE_ENV === 'web'
  //   ? require(`../assets/elementaryKorean.dict.json`)
  //   : JSON.parse(File.read(dictPath))
  let dict = require('../assets/elementaryKorean.dict.json')
  // regex to delete single quota '


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
      if (res['tier1'].indexOf(refer) === -1 && res['tier2'].indexOf(refer) === -1) {
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
      if (res['tier1'].indexOf(candidate) === -1 && res['tier2'].indexOf(candidate) === -1) {
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
        if (res['tier1'].indexOf(refer) === -1 && res['tier2'].indexOf(refer) === -1 && res['tier3'].indexOf(refer) === -1) {
          res['tier3'].push(refer)
        }
      })
    }
  })

  res = convertSearchRetToHangul(res, flag)
  return res
}



/*
 *
 */
const convertSearchRetToHangul = (tierSet, flag) => {
  for (let i = 0; i < tierSet['tier1'].length; i++) {
    if (tierSet['tier1'][i] !== '') {
      tierSet['tier1'][i] = convertRomanToHangyr(tierSet['tier1'][i])
    }
  }
  for (let i = 0; i < tierSet['tier2'].length; i++) {
    tierSet['tier2'][i] = convertRomanToHangyr(tierSet['tier2'][i])
  }
  for (let i = 0; i < tierSet['tier3'].length; i++) {
    tierSet['tier3'][i] = convertRomanToHangyr(tierSet['tier3'][i])
  }
  if(flag !== 'hard') {
    for (let i = 0; i < tierSet['tier4'].length; i++) {
      tierSet['tier4'][i] = convertRomanToHangyr(tierSet['tier4'][i])
    }
  }
  return tierSet
}

export default search
