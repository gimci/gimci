/**/
import fs from 'fs'
import path from 'path'
let _srcPath = '../../assets/elementaryKorean.dict.json'

/**
 *
 */
const read = (srcPath = _srcPath) => {
  return fs.readFileSync ? (fs.readFileSync(srcPath, 'utf8')) : null
}

/**
 *
 */
const write = (destPath, data) => {
  if (fs.writeFile) {
    fs.writeFile(destPath, JSON.stringify(data), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was written.");
    });
  } else {
   // do nothing
  }
}

export default {
  read,
  write
}
