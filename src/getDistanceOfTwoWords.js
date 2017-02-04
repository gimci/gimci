/* Internals */
import warning from './utils/LogUtils'
import { convertHangyrToRoman } from './transcribe'


/**
 *
 * @param words array
 * @param method
 * @returns {*}
 */
export default function getDistanceOfTwoWords(words, method = 'levenshtein') {
  if (words.length !== 2) {
    warning('You should provide two discrete words')
  } else {
    if (method === 'levenshtein') {
      return getLevenshteinDistance(convertHangyrToRoman(words[0]), convertHangyrToRoman(words[1]))
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
const getLevenshteinDistance = (word1, word2) => {

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
