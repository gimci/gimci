'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDistanceOfTwoWords;

var _LogUtils = require('./utils/LogUtils');

var _LogUtils2 = _interopRequireDefault(_LogUtils);

var _transcribe = require('./transcribe');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param words array
 * @param method
 * @returns {*}
 */
/* Internals */
function getDistanceOfTwoWords(words) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'levenshtein';

  if (words.length !== 2) {
    (0, _LogUtils2.default)('You should provide two discrete words');
  } else {
    if (method === 'levenshtein') {
      return getLevenshteinDistance((0, _transcribe.convertHangyrToRoman)(words[0]), (0, _transcribe.convertHangyrToRoman)(words[1]));
    } else {
      return 0;
    }
  }
}

/**
 *
 * @param word1
 * @param word2
 * @returns {d0: val, di: val}
 */
var getLevenshteinDistance = function getLevenshteinDistance(word1, word2) {

  var d = {
    d0: 0,
    d1: 0
  };

  if (word1.length === 0) {
    return word2.length;
  }
  if (word2.length === 0) {
    return word1.length;
  }

  var tmp = void 0,
      prev = void 0,
      val = void 0;

  // swap to save some memory O(min(a,b)) instead of O(a)
  if (word1.length > word2.length) {
    tmp = word1;
    word1 = word2;
    word2 = tmp;
  }

  var row = new Array(word1.length + 1);

  // init the row
  for (var i = 0; i <= word1.length; i++) {
    row[i] = i;
  }

  for (var _i = 1; _i <= word2.length; _i++) {
    prev = _i;

    for (var j = 1; j <= word1.length; j++) {
      if (word2[_i - 1] === word1[j - 1]) {
        val = row[j - 1]; // match
      } else {
        val = Math.min(row[j - 1] + 1, // substitution
        Math.min(prev + 1, // insertion
        row[j] + 1)); // deletion
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[word1.length] = prev;
  }
  d['d0'] = row[word1.length];

  return row[word1.length];
};
module.exports = exports['default'];