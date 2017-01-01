/**/
import fs from 'fs'
import path from 'path'

let _srcPath = '../../data/elementaryKorean.dict.json'

/**
 *
 */
const read = (srcPath = _srcPath) => {
  return JSON.parse(fs.readFileSync(srcPath, 'utf8'))
}

/**
 *
 */
const write = (destPath, data) => {
  fs.writeFile(destPath, JSON.stringify(data), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was written.");
  });
}

/**
 *
 */
const resolvePath = (srcPath) => {
  console.log('path resolved', srcPath)
  path.join(srcPath, '..')
}

export default {
  read,
  write
}
