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

    let tokens = {}
    let base = ''

    data.map(elem => {
      tokens = GenerateToken.byDeletion(elem)
      base = tokens['base']
      dict[base] = { refer: [ base ] }
      // console.log(1, base, tokens['delete1'])

      // Delete single
      tokens['delete1'].map(delete1Elem => {
        // console.log(3, delete1Elem)
        // If it does not exists,
        if (!dict[delete1Elem]) {
          // console.log(33, dict[delete1Elem])
          dict[delete1Elem] = { refer: [base] }
        } else {
          // console.log(44, dict[delete1Elem])
          dict[delete1Elem]['refer'].push(base)
          // if(!dict[delete1Elem]['refer'])
          // {
          //   dict[delete1Elem] = { refer: [base] }
          // } else {
          //   dict[delete1Elem]['refer'].push(base)
          // }
        }
      })

      // Delete twice

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
