/**
 * Create a set of tokens made by deleting exactly one character of the original string.
 * Note that the order of characters in the original string will be kept.
 *
 * e.g. 'star' => ['tar', 'sar', 'str']
 */
const deleteOnce = (str) => {
  let ret = [];
  let newWord = ''
  for (let i = 0; i < str.length; i++) {
    newWord = str.substr(0, i) + str.substr(i + 1, str.length);
    if(ret.indexOf(newWord) === -1) {
      ret.push(newWord);
    }
  }
  return ret;
}

/**
 * Functions similar to deleteOnce(), only that it does the same thing twice.
 *
 * e.g. 'star' => ['st', 'sa', 'sr', 'ta', 'ar']
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
 * Takes a string and create an object which contains variations of that string.
 * Variation in this context means the crafted string built by deleting a number of characters
 * from the original string.
 *
 *
 * mode: a // return tokens in array, default.
 *       s // return tokens in string.
 *
 * (str, num = 2) => ({
 *   base: str,
 *   del1: [foo, bar, baz,,.],
 *   del2: [fo, ba, bz,,.]
 * })
 */
const createTokensByDeletion = (str, mode = 'a') => {
  let tokenSet = {};
  tokenSet['base'] = str;
  tokenSet['del1'] = mode === 's' ? deleteOnce(str).join(" ") : deleteOnce(str)
  tokenSet['del2'] = mode === 's' ? deleteTwice(str).join(" ") : deleteTwice(str)
  return tokenSet
}

const removeWhiteSpaces = (str) => {
  return str.replace(/(^\s*)|(\s*$)/, '')
}

export default {
  createTokensByDeletion,
  removeWhiteSpaces
}

