/* Externals */
import romanize from './romanize'

/* Internals */
import warning from './utils/warning'
import GenerateToken from './utils/generateToken'
import File from './utils/FileUtils'

/**/
const insertIntoDict = (elem, base, dict) => {
  if (!dict[elem]) {
    dict[elem] = { refer: [base] }
  } else {
    for (let i = 0; i < dict[elem]['refer'].length; i++) {
      if (dict[elem]['refer'][i] === base) {
        return dict
      }
    }
    dict[elem]['refer'].push(base)
  }
  return dict
}

const makeDict = () => {
  let dict = {}
  const _data = File.read('../../data/elementaryKorean.romanized.txt')
  const data = _data.match(/[^\r\n]+/g);

  let tokens = {}
  let base = ''

  data.map(elem => {
    tokens = GenerateToken.byDeletion(elem)
    base = tokens['base']
    dict = insertIntoDict(base, base, dict)

    // Delete single
    tokens['delete1'].map(delete1Elem => {
      dict = insertIntoDict(delete1Elem, base, dict)
    })

    // Delete twice
    tokens['delete2'].map(delete2Elem => {
      dict = insertIntoDict(delete2Elem, base, dict)
    })
  })
  // console.log('make dict finished', dict)
  File.write('../../data/elementaryKorean.dict.json', dict)
}


export default {
  makeDict
}
