/**/
import fs from 'fs'
import path from 'path'

let _path = '../../data'

const read = (srcPath = '../../data/data.txt') => {
  console.log(1, srcPath)
  const path = resolvePath(srcPath)
  fs.readFile(srcPath, 'utf8', function (err, data) {
      if (err) {
        throw err;
      }
      console.log('file read', data)
      return data;
    }
  );
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
