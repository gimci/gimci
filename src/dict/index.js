/* Internals */
import warning from '../utils/warning'
import GenerateToken from '../utils/generateToken'
import File from '../utils/FileUtils'
import { convertHangyrToRoman } from '../transcribe'
import convertFileHangyrToRoman from './convertFileHangyrToRoman'


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

/* Default Paths */
const _srcPath = '../assets/elementaryKorean.romanized.txt'
const _destPath = '../assets/elementaryKorean.dict.json'

/**
 *
 */
const buildNew = (srcPath = _srcPath, destPath = _destPath) => {
  let dict = {}
  const _data = File.read(srcPath)
  const data = _data.match(/[^\r\n]+/g);

  let tokens = {}
  let base = ''

  data.map(elem => {
    // Delete space
    elem = elem.replace(/(^\s*)|(\s*$)/, '');

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
  console.log('Finished building new dictionary')
  File.write(destPath, dict)
}

export default {
  buildNew,
  convertFileHangyrToRoman
}
