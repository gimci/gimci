/**/
let _srcPath = '../../assets/elementaryKorean.dict.json'


/* Sanity check */
try {
  let fs = require('fs');
  console.log("node js is in host environment");
} catch (err){
  console.log("Cannot load node modules")
  let fs = false
}


/**
 *
 */
const read = (srcPath = _srcPath) => {
  return fs ? (fs.readFileSync(srcPath, 'utf8')) : null
}

/**
 *
 */
const write = (destPath, data) => {
  if (fs) {
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
  if (fs) {
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
