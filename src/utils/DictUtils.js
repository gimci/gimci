/* Internal Dependencies */
import String from './StringUtils'
import File from './FileUtils'
import conf from '../conf'
import readline from 'readline'
import { log } from './LogUtils'
import fs from 'fs'


/**
 * Pipeline for building a dictionary file.
 */

/**
 * Stage 0
 * Romanized data into a linear data chunk.
 *
 * e.g. The content of the output file should be as following.
 *   foo -refer foo
 *   fo -refer foo
 *   poo -refer poo
 *   po -refer po
 *   ...
 */
const build = (dictSrcPath) => {

  stage0(dictSrcPath)

  // File.write(conf.dictDestPath, dict.getDict())
  console.log('Finished building new dictionary', conf.dictDestPath)
}


/**
 *
 */
const stage0 = (dictSrcPath) => {
  let tokens = {}
  let rl = readline.createInterface({
    input: fs.createReadStream(conf.dictSrcPath)
  })
  let ws = fs.createWriteStream(conf.dict0DestPath, {'flags': 'a'})
  let i, j

  rl.on('line', function(line) {
    line = String.removeWhiteSpaces(line) // for trailing space at the beginning of file
    tokens = String.createTokensByDeletion(line)

    ws.write(`${line} -refer ${tokens.base}\n`) // write base
    for (i = 0; i < tokens.del1.length; i++) {
      ws.write(`${tokens.del1[i]} -refer ${tokens.base}\n`) // write del1 tokens
    }
    for (j = 0; j < tokens.del2.length; j++) {
      ws.write(`${tokens.del2[j]} -refer ${tokens.base}\n`) // write del2 tokens
    }
  })
    .on('close', function(err) {
      log('end stage0', err)

      // stage1
      stage1()
    })
}

/**
 *
 */
const stage1 = (somePath) => {

  let entries = [] // Checked entry will go into the list

  let rl = readline.createInterface({
    input: fs.createReadStream(conf.dictSrcPath)
  })
  let ws = fs.createWriteStream(conf.dict1DestPath, {'flags': 'a'})

  // during some condition,
  let cond = true
  while (cond) {
    rl.on('line', function(line) {
      // if 'line' is not already taken entry, start processing
      // add it to the 'entries'

      // process it
    })
      .on('close', function() {
        // process again with the other entry
        sumEntryInstances(rl, ws)
      })
  }
}

/**
 *
 */
const sumEntryInstances = (rl, ws) => {

  // Create a readstream again,
  rl = readline.createInterface({
    input: fs.createReadStream(conf.dictSrcPath)
  })

  rl.on('line', function(line) {
    // if 'line' is not already taken entry, start processing
    // add it to the 'entries'

    // process it
  })
    .on('close', function() {
      // process again with the other entry
    })
}








/**
 * DEPRECATED
 *
 * Inner dictionary class that holds the data.
 * This class will not be seen from the outside.
 */
class Dict {
  constructor() {
    this._dict = {}
  }

  /**
   * todos
   * Document should be made.
   */
  insert(word, base) {
    if (!this._dict[word]) {
      this._dict[word] = { refer: [base] }
    } else {
      if (this._dict[word]['refer'].indexOf(base) === -1) {
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
