import warning from './utils/warning'
import romanize from './romanize'
import fs from 'fs'
import path from 'path'


class Dict {

  constructor() {
    this._path = ''
  }

  read(srcPath = '../../data/data.txt') {
    this._path = this.resolvePath(srcPath)
    fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) {
          throw err;
        }
        console.log('file read', data)
        return data;
      }
    );
  }

  write() {
    const destPath = `${this._path}/parsed.txt`
    fs.writeFile(destPath, "Hey there!", function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  }

  resolvePath(srcPath) {
    return path.join(srcPath, '..')
  }
}

export default new Dict()