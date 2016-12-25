/**/
import fs from 'fs'
import path from 'path'

let _path = '../../data'

const read = (srcPath = '../../data/data.txt') => {
  const path = resolvePath(srcPath)
  return fs.readFileSync(srcPath, 'utf8')
}

const write = (data) => {
  const destPath = `${_path}/parsed.json`
  fs.writeFile(destPath, JSON.stringify(data), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was written.");
  });
}

const resolvePath = (srcPath) => {
  console.log(2, srcPath)
  path.join(srcPath, '..')
}

export default {
  read,
  write
}