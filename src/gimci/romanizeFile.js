/* Externals */
import path from 'path'
import fs from 'fs'
import readline from 'readline'

/* Internals*/
import romanize from './romanize'


// Default paths
const _srcPath = '../../data/elementaryKorean.hangul.txt'
const _destPath = '../../data/elementaryKorean.romanized.txt'

const romanizeFile = (srcPath = _srcPath, destPath = _destPath) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(srcPath),
    output: process.stdout,
    terminal: false
  });

  let fd = fs.openSync(destPath, 'w');

  rl.on('line', function (line) {
    fs.write(fd, `${romanize(line)}\n`);
  });

  console.log('Finished romanizing data in file', srcPath, 'into', destPath)
}

export default romanizeFile
