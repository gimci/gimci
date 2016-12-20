import warning from './utils/warning'
import romanize from './romanize'
import fs from 'fs'


class Dict {

  constructor() {

  }

  read(srcPath) {
    fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) throw err;
        return data;
      }
    );
  }

  write() {

  }
}

export default new Dict()