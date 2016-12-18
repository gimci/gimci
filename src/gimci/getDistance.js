import warning from './utils/warning'
import romanize from './romanize'


/**
 *
 * @param words array
 * @param method
 * @returns {*}
 */
export default function getDistance(words, method = 'levenshtein') {

  if (words.length !== 2) {
    warning('You should provide two discrete words')
  } else {
    if (method === 'levenshtein') {
      return getLevenshteinDistanceEX(romanize(words[0]), romanize(words[1]))
    } else {
      return 0
    }
  }

}


/**
 *
 * @param word1
 * @param word2
 * @returns {d0: val, di: val}
 */

function getLevenshteinDistanceEX(word1, word2) {

  let d = {
    d0: 0,
    d1: 0,
  }

  if (word1.length === 0) {
    return word2.length
  }
  if (word2.length === 0) {
    return word1.length
  }

  let tmp, prev, val

  // swap to save some memory O(min(a,b)) instead of O(a)
  if (word1.length > word2.length) {
    tmp = word1
    word1 = word2
    word2 = tmp
  }

  var row = new Array(word1.length + 1)

  // init the row
  for (let i = 0; i <= word1.length; i++) {
    row[i] = i
  }

  for (let i = 1; i <= word2.length; i++) {
    prev = i

    for (let j = 1; j <= word1.length; j++) {
      if (word2[i - 1] === word1[j - 1]) {
        val = row[j-1] // match
      } else {
        val = Math.min(
          row[j - 1] + 1, // substitution
          Math.min(
            prev + 1,     // insertion
            row[j] + 1))  // deletion
      }
      row[j - 1] = prev
      prev = val
    }
    row[word1.length] = prev
  }
  d['d0'] = row[word1.length]


  return row[word1.length]
}


/**
 *
 * @param word1
 * @param word2
 * @returns {*}
 */
function getLevenshteinDistance(word1, word2) {

  let cost = 0
  let d = make2DArray(word1.length + 1, word2.length + 1, 0)

  // console.log(11, word1.length, word2.length, d[1][2])

  // source prefixes can be transformed into empty string by
  // dropping all characters
  for (let i = 1; i <= word1.length; i++) {
    d[i][0] = i
  }

  // console.log(1, d)

  // target prefixes can be reached from empty source prefix
  // by inserting every character
  for (let j = 1; j <= word2.length; j++) {
    d[0][j] = j
  }

  for (let j = 1; j <= word2.length; j++) {
    for (let i = 1; i <= word1.length; i++) {
      if(word1[i] === word2[j]) {
        cost = 0
      } else {
        cost = 1
      }
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      )
    }
  }
  return d[word1.length][word2.length]
}


/**
 *
 * @param rows
 * @param cols
 * @param val
 * @returns {Array}
 */
function make2DArray(rows, cols, val) {

  let arr = [];

  // Creates all lines:
  for (let i = 0; i < rows; i++) {

    // Creates an empty line
    arr.push([]);

    // Adds cols to the empty line:
    arr[i].push(new Array(cols));

    for (let j=0; j < cols; j++) {
      arr[i][j] = val;
    }
  }
  return arr;
}
