/**/
let _srcPath = '../../assets/elementaryKorean.dict.json'
let fs = false


/* Sanity check */
try {
  fs = require('fs')
  console.log("node js is in host environment")
} catch (err){
  fs = false
  console.log("Cannot load node modules")
}


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

/**
 *
 */
const resolvePath = (srcPath) => {
  if (path) {
    console.log('path resolved', srcPath)
    let path = require('path')
    path.join(srcPath, '..')
  } else {
    // do nothing
  }
}

export default {
  read,
  write
}
