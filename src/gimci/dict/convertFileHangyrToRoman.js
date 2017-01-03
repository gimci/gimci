/* Externals */
import path from 'path'
import fs from 'fs'
import readline from 'readline'

/* Internals*/
import { convertHangyrToRoman } from '../transcribe'


// Default paths
const _srcPath = '../../assets/elementaryKorean.hangul.txt'
const _destPath = '../../assets/elementaryKorean.romanized.txt'

/**
 *
 */
const convertFileHangyrToRoman = (srcPath = _srcPath, destPath = _destPath) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(srcPath),
    output: process.stdout,
    terminal: false
  });

  let fd = fs.openSync(destPath, 'w');

  rl.on('line', function (line) {
    fs.write(fd, `${convertHangyrToRoman(line)}\n`);
  });

  console.log('Finished romanizing data in file', srcPath, 'into', destPath)
}

export default convertFileHangyrToRoman
