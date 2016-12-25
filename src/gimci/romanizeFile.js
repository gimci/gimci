/**/
import path from 'path'
import fs from 'fs'
import readline from 'readline'

/**/
import romanize from './romanize'

const romanizeFile = (srcPath) => {
  const rl = readline.createInterface({
    input: fs.createReadStream('../../data/elementaryKorean.hangul.txt'),
    output: process.stdout,
    terminal: false
  });

  let fd = fs.openSync('../../data/elementaryKorean.romanized.txt', 'w');

  rl.on('line', function (line) {
    fs.write(fd, `${romanize(line)}\n`);
  });
}

export default romanizeFile
