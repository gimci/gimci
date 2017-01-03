
/**
 *
 */
const deleteOnce = (str) => {
  let ret = [];
  // for(var w = 0; w < words.length; w++) {
    // var word = words[w];
    for (var i = 0; i < str.length; i++) {
      var a = str.substr(0, i) + str.substr(i + 1, str.length);
      ret.push(a);
    }
  // }
  return ret;
}

/**
 *
 */
const deleteTwice = (str) => {
  let ret = []
  let tokenDeletedOnce = deleteOnce(str)
    for(let i = 0; i < tokenDeletedOnce.length; i++) {
      ret = ret.concat(deleteOnce(tokenDeletedOnce[i]))
    }
  return ret;
}

/**
 *
 */
const byDeletion = (str, num) => {
  let tokenSet = {};
  tokenSet['base'] = str;
  tokenSet['delete1'] = deleteOnce(str)
  if (num === 1) {
    return tokenSet
  } else {
    tokenSet['delete2'] = deleteTwice(str)
    return tokenSet
  }
}

let GenerateToken = {}
GenerateToken.byDeletion = byDeletion

export default GenerateToken
