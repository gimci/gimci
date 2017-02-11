/* Internal Dependencies */
import String from './StringUtils'
import File from './FileUtils'
import conf from '../conf'
import readline from 'readline'
import {log} from './LogUtils'
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
    input: fs.createReadStream(conf.dictSrcPath),
    output: fs.createWriteStream(conf.dict0DestPath, {'flags': 'a'})
  })
  // let ws = fs.createWriteStream(conf.dict0DestPath, {'flags': 'a'})
  let i, j

  rl.on('line', function (line) {
    line = String.removeWhiteSpaces(line) // for trailing space at the beginning of file
    tokens = String.createTokensByDeletion(line)

    rl.output.write(`${line} -refer ${tokens.base}\n`) // write base
    // fs.appendFileSync(conf.dict0DestPath, line)
    for (i = 0; i < tokens.del1.length; i++) {
      rl.output.write(`${tokens.del1[i]} -refer ${tokens.base}\n`) // write del1 tokens
    }
    for (j = 0; j < tokens.del2.length; j++) {
      rl.output.write(`${tokens.del2[j]} -refer ${tokens.base}\n`) // write del2 tokens
    }
  })
    .on('close', function (err) {
      log('end stage0', err)
      rl.close()


      // stage1
      stage1()
    })
}

/**
 *
 */
const stage1 = (somePath) => {

  let processed = [] // Checked entry will go into the list
  let rl = readline.createInterface({
    input: fs.createReadStream(conf.dict0DestPath),
    output: fs.createWriteStream(conf.dict1DestPath, {'flags': 'a'})
  })

  let entryInLine
  let newLine
  let newLineArr = []

  // during some condition,
  let cond = true
  let i
  let lineArr = []

  rl.on('line', function (line) {
    // if 'line' is not already taken entry, start processing
    // add it to the 'entries'
    // entryAcc = !entry ? line : entryAcc

    entryInLine = line.split(' ')[0]

    if (!processed.includes(entryInLine)) {
      processed.push(entryInLine)
      newLineArr.push(line)
    } else {
      for (i = 0; i < processed.length; i++) {
        if (entryInLine === processed[i]) {
          lineArr = line.split(' ')
          newLine = newLineArr[i].split(' ')
          if (newLine.indexOf(lineArr[2]) === -1) {
            newLine.push(lineArr[2])
          }
          newLineArr[i] = newLine.join(' ')
        }
      }

    }
    // process it
  })
    .on('close', function (err) {
      log('end stage1', err)
      for (i = 0; i < newLineArr.length; i++) {
        rl.output.write(`${newLineArr[i]}\n`)
      }
      rl.close()


    })
}

/**
 *
 */
const sumEntryInstances = (rl, ws) => {
  // Create a readstream again,
  rl = readline.createInterface({
    input: fs.createReadStream(conf.dictSrcPath)
  })
  // let entry = ''

  rl.on('line', function (line) {
    // if 'line' is not already taken entry, start processing
    // add it to the 'entries'
    // entry = line.split(' ')[0]


    // process it
  })
    .on('close', function () {
      // process again with the other entry
      // sumEntryInstances()
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
      this._dict[word] = {refer: [base]}
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
