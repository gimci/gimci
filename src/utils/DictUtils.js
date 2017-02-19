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
  log('Finished building new dictionary', conf.dictDestPath)
}


/**
 * Generate a file that has all the entries with a single lexical reference.
 *
 * e.g.
 * (romanized.txt)
 * foo
 * bar
 * ...
 *
 * => (dict0.txt)
 * foo -lexrf foo
 * fo -lexrf fo
 * ...
 */
const stage0 = (dictSrcPath) => {
  let tokens = {}
  let rl = readline.createInterface({
    input: fs.createReadStream(conf.dictSrcPath),
    output: fs.createWriteStream(conf.dict0DestPath, {'flags': 'a'})
  })
  let i, j

  rl.on('line', function (line) {
    line = String.removeWhiteSpaces(line) // for trailing space at the beginning of file
    tokens = String.createTokensByDeletion(line)

    rl.output.write(`${line} -lexrf ${tokens.base}\n`) // write base
    for (i = 0; i < tokens.del1.length; i++) {
      rl.output.write(`${tokens.del1[i]} -lexrf ${tokens.base}\n`) // write del1 tokens
    }
    for (j = 0; j < tokens.del2.length; j++) {
      rl.output.write(`${tokens.del2[j]} -lexrf ${tokens.base}\n`) // write del2 tokens
    }
  })
    .on('close', function (err) {
      log('end stage0', err)
      rl.close()
      stage1() // stage1
    })
}


/**
 * Write into multiple files each of which has word
 * grouped by a starting letter.
 * Note that the resulting file has unsorted data.
 *
 * e.g.
 * (dict0)
 * azxc
 * bac
 * bb
 * ca
 * aa
 * cfz
 *
 * =>
 * (dict_1a)
 * azxc
 * aa
 */
const stage1 = (path) => {

  let rl = readline.createInterface({
    input: fs.createReadStream(conf.dict0DestPath),
  })

  // Open multiple writestreams.
  const out_a = openWriteStream('a');
  // ...

  rl.on('line', (line) => {
    // if the line starts with a, then write in a
    // out_a.write(something)

    // else, if the line starts with letter 'x'
    // out_x.write(something)
  })
    .on('close', (msg) => {
      stage2()
    })

}


/**
 *
 */
const stage2 = (rpath, char) => {

  let rl = readline.createInterface({
    input: fs.createReadStream(conf.dict0DestPath),
  })

  const out = openWriteStream(`out_2${char}`)

  rl.on('line', (line) => {


  })

}

const stage3 = 

/**
 *
 */
const stage_1 = (somePath) => {

  let processed = [] // Checked entry will go into the list

  let rl = readline.createInterface({
    input: fs.createReadStream(conf.dict0DestPath),
    output: fs.createWriteStream(conf.dict1DestPath, {'flags': 'a'})
  })

  let entryInLine
  let newLine
  let processedLine = []

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
      var lineArr = line.split(' ')
      processedLine.push(`${lineArr[0]} -pop 0 -tot 0 ${lineArr[1]} ${lineArr[2]} -rel`)
    } else {
      for (i = 0; i < processed.length; i++) {
        if (entryInLine === processed[i]) {
          lineArr = line.split(' ')
          newLine = processedLine[i].split(' ')
          processedLine[i] = concatLexrf(lineArr, newLine)
        }
      }
    }
    // process it
  })
    .on('close', function (err) {
      log('end stage1', err)
      for (i = 0; i < processedLine.length; i++) {
        rl.output.write(`${processedLine[i]}\n`)
      }
      rl.close()


    })
}


/**
 *  ConcatLexrf
 *
 *  return String after concatination -lexrf
 */
const concatLexrf = (lineArr, newLine) => {
  let i = newLine.indexOf('-lexrf') + 1
  // console.log(1, i, newLine)
  if (i === 0) {
    console.log(`Error in concatLexrf in ${lineArr}`)
    return
  }
  var insertFlag = true

  while (newLine[i] !== '-rel') {
    if (getLexrf(lineArr) === newLine[i]) {
      insertFlag = false
    }
    i++
  }

  if (insertFlag) {
    // console.log(2, newLine[i-1], getLexrf(lineArr), newLine[i])
    newLine[i] = getLexrf(lineArr)
    newLine[i+1] = '-rel'
    // console.log(3, newLine[i-1], getLexrf(lineArr), newLine[i])
  }
  // console.log(4, newLine.join(' '))
  return newLine.join(' ')
}

/**
 * GetLexrf
 * return elem of -lexrf
 */
const getLexrf = (lineArr) => {
  let i

  for (i=0; i<lineArr.length; i++) {
    if (lineArr[i] === '-lexrf') {
      return lineArr[i+1]
    }
  }
  console.log(`Error in get Lexrf in line ${lineArr}`)
  return ''
}


/**
 * Takes a path of output file and open a writestream for that path.
 *
 * e.g. path => writestream(path)
 */
openWriteStream = (path) => {




}