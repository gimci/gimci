'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Create a set of tokens made by deleting exactly one character of the original string.
 * Note that the order of characters in the original string will be kept.
 *
 * e.g. 'star' => ['tar', 'sar', 'str']
 */
var deleteOnce = function deleteOnce(str) {
  var ret = [];
  var newWord = '';
  for (var i = 0; i < str.length; i++) {
    newWord = str.substr(0, i) + str.substr(i + 1, str.length);
    if (ret.indexOf(newWord) === -1) {
      ret.push(newWord);
    }
  }
  return ret;
};

/**
 * Functions similar to deleteOnce(), only that it does the same thing twice.
 *
 * e.g. 'star' => ['st', 'sa', 'sr', 'ta', 'ar']
 */
var deleteTwice = function deleteTwice(str) {
  var ret = [];
  var tokenDeletedOnce = deleteOnce(str);
  for (var i = 0; i < tokenDeletedOnce.length; i++) {
    ret = ret.concat(deleteOnce(tokenDeletedOnce[i]));
  }
  return ret;
};

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
var createTokensByDeletion = function createTokensByDeletion(str) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'a';

  var tokenSet = {};
  tokenSet['base'] = str;
  tokenSet['del1'] = mode === 's' ? deleteOnce(str).join(" ") : deleteOnce(str);
  tokenSet['del2'] = mode === 's' ? deleteTwice(str).join(" ") : deleteTwice(str);
  return tokenSet;
};

var removeWhiteSpaces = function removeWhiteSpaces(str) {
  return str.replace(/(^\s*)|(\s*$)/, '');
};

exports.default = {
  createTokensByDeletion: createTokensByDeletion,
  removeWhiteSpaces: removeWhiteSpaces
};
module.exports = exports['default'];