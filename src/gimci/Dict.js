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

  makeDict() {
    let dict = {}
    const _data = File.read()
    const data = _data.match(/[^\r\n]+/g);
    console.log(1, data)

    let tokens = {}
    let token = ''

    data.map(elem => {
      tokens = GenerateToken.byDeletion(elem)
      // base
      token = tokens['base']
      dict[token] = { refer: dict[token] }

      // Delete single
      tokens['delete1'].map(delete1Elem => {
        // If it does not exists,
        if (!dict[delete1Elem]) {
          // todos: do something
        } else {
          // ...
        }
      })

      // Delete twice




    })
    console.log(1, dict)
  }

  write(data) {
    return File.write(data)
  }

  temp() {
    return GenerateToken
  }
}

export default new Dict()
