/* Internals */
import GenerateToken from './utils/generateToken'
import File from './utils/FileUtils'

/* */
const _dictPath = '../../data/elementaryKorean.dict.json'


/**
 *
 */
const search = (query, dictPath = _dictPath) => {
  let dict = JSON.parse(File.read(dictPath))

  const tokensOfQuery = GenerateToken.byDeletion(query)
  const candidates = tokensOfQuery['delete1'].concat(tokensOfQuery['delete2'])
  let res = {}
  res['tier2'] = []
  res['tier3'] = []


  // case1
  if (
    dict.hasOwnProperty(query)
    && dict[query]['refer'].includes(query)
  ) {
    res['tier1'] = query
  }

  // case2
  // loop through dict['elem']['refer']
  // pick whose refer does not contain elem itself, but only the query string
  if (
    dict.hasOwnProperty(query)
    && !dict[query]['refer'].includes(query)
  ) {
    dict[query]['refer'].map(refer => {
      if(res['tier2'].indexOf(refer) === -1) {
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
      if(res['tier2'].indexOf(candidate) === -1) {
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
        if(res['tier3'].indexOf(refer) === -1) {
          res['tier3'].push(refer)
        }
      })
    }
  })

  return res
}

export default search
