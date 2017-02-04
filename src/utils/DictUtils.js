/* Internal Dependencies */
import String from './StringUtils'
import File from './FileUtils'
import conf from '../conf'

/**
 * This will create a JSON format file with all the populated data.
 */
const build = (dictSrcPath) => {
  let dict = new Dict()
  const _data = File.read(conf.dictSrcPath)
  const data = _data.match(/[^\r\n]+/g) // separate by 'new line' characters
  let tokens = {}

  data.map(word => {
    word = String.removeWhiteSpaces(word)
    tokens = String.createTokensByDeletion(word)

    dict.insert(word, word)

    tokens['delete1'].map(del1Word => {
      dict.insert(del1Word, word)
    })

    tokens['delete2'].map(del2Word => {
      dict.insert(del2Word, word)
    })
  })

  File.write(conf.dictDestPath, dict.getDict())
  console.log('Finished building new dictionary', conf.dictDestPath)
}


/**
 * Inner dictionary class that holds the data.
 * This class will not be seen from the outside.
 */
class Dict {

  constructor() {
    this._dict = {}
  }

  /**
   * ...
   */
  insert(word, base) {
    if (!this._dict[word]) {
      this._dict[word] = { refer: [base] }
    } else {
      if (this._dict[word]['refer'].indexOf(base) !== -1) {
        this._dict[word]['refer'].push(base)
      }
    }
  }

  /**
   * ...
   */
  getDict() {
    return this._dict
  }

}


export default {
  build
}
