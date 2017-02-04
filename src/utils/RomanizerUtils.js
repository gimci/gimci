/* Externals */
import path from 'path'
import fs from 'fs'
import readline from 'readline'

/* Internals*/
import { convertHangyrToRoman } from '../transcribe'
import conf from '../conf'

/**
 *
 */
const convertFileHangyrToRoman = () => {
  const srcPath = conf.textSrcPath
  const destPath = conf.textDestPath
  
  const rl = readline.createInterface({
    input: fs.createReadStream(srcPath),
    output: process.stdout,
    terminal: false
  });

  let fd = fs.openSync(destPath, 'w');

  rl.on('line', function(line) {
    fs.write(fd, `${convertHangyrToRoman(line)}\n`, () => {});
  });

  console.log('Finished romanizing data in file', srcPath, 'into', destPath)
}

export default {
  convertFileHangyrToRoman
}
