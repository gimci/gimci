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

  insertIntoDict(elem, base, dict) {
    if (!dict[elem]) {
      // console.log(33, dict[delete1Elem])
      dict[elem] = { refer: [base] }
    } else {
      // console.log(44, dict[delete1Elem])
      dict[elem]['refer'].push(base)
    }
    return dict
  }

  makeDict() {
    let dict = {}
    const _data = File.read()
    const data = _data.match(/[^\r\n]+/g);

    let tokens = {}
    let base = ''

    data.map(elem => {
      tokens = GenerateToken.byDeletion(elem)
      base = tokens['base']
      dict = this.insertIntoDict(base, base, dict)

      // Delete single
      tokens['delete1'].map(delete1Elem => {
        dict = this.insertIntoDict(delete1Elem, base, dict)
      })

      // Delete twice
      tokens['delete2'].map(delete2Elem => {
        dict = this.insertIntoDict(delete2Elem, base, dict)
      })

    })
    console.log(3, dict)
  }

  write(data) {
    return File.write(data)
  }


  temp() {
    return GenerateToken
  }
}

export default new Dict()
