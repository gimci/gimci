/* Externals */
import romanize from './romanize'

/* Internals */
import warning from './utils/warning'
import GenerateToken from './utils/generateToken'
import File from './utils/FileUtils'


/**/
class Dict {

  constructor() {

  }

  read() {
    return File.read()
  }

  write() {
    return File.write()
  }

  temp() {
    return GenerateToken
  }
}

export default new Dict()
