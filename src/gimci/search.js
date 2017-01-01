/* Internals */
import GenerateToken from './utils/generateToken'
import File from './utils/FileUtils'

const _dictPath = '../../data/elementaryKorean.dict.json'



/**
 *
 */
const search = (query, dict = _dictPath) => {

  const dict = File.read(dict)
  const tokensOfQuery = GenerateToken.byDeletion(query)
  const candidates = tokensOfQuery['delete1'].concat(tokensOfQuery['delete2'])
  let res = {}

  // console.log(file)

  // case1
  if (
     dict.hasOwnProperty(query)
  && dict[query][refer].includes(query)) {
    res['tier1'] = dict[query]
  }

  // case2
  // loop through dict['elem']['refer']
  // pick whose refer does not contain elem itself, but only the query string

  // case3
  // loop through candidates
  // pick candiate === dict[candidate]

  // case4
  // loop through dict['elem']['refer'] and candidates
  // match all the possible cases

}




export default search
