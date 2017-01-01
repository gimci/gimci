import GenerateToken from './utils/generateToken'
import File from './utils/FileUtils'

const _dictPath = '../../data/elementaryKorean.dict.json'


/**
 *
 */
const search = (query, dict = _dictPath) => {
  let dictBase = []


  const tokens = GenerateToken.byDeletion(query)
  const file = File.read(dict)
  // console.log(file)

  dictBase = file['base']

  // tokens['delete1'].map



  // case1
  dictBase.map(dictBaseElem => {
    if(query === dictBaseElem) {
      // do something
    }
  })

  // case2

  // case3

  // case4

}




export default search
