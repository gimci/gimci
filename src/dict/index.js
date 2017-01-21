/* Internals */
import warning from '../utils/warning'
import Str from '../utils/StringUtils'
import File from '../utils/FileUtils'
import { convertHangyrToRoman } from '../transcribe'
import conf from '../conf'


/**
 * Auxiliary method.
 */
const insertIntoDict = (elem, base, dict) => {
  if (!dict[elem]) {
    dict[elem] = { refer:   [base] }
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

/**
 * This will create a JSON format file with all the populated data.
 */
const populate = () => {
  let dict = {}
  const _data = File.read(conf.dictSrcPath)
  const data = _data.match(/[^\r\n]+/g);

  let tokens = {}
  let base = ''

  data.map(elem => {
    // Delete space
    elem = elem.replace(/(^\s*)|(\s*$)/, '');

    tokens = Str.createTokensByDeletion(elem)
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

  File.write(conf.dictDestPath, dict)
  console.log('Finished building new dictionary', conf.dictDestPath)
}

export default {
  populate,
}
