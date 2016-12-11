import warning from './utils/warning'

export default function getDistance(words, method = 'levenshtein') {

  console.log(method)
  if (words.length !== 2) {
    warning('You should provide two discrete words')
  } else {
    if (method === 'levenshtein') {
      return getLevenshteinDistance(words[0], words[1])
    } else {
      return 0
    }
  }

}



function getLevenshteinDistance(word1, word2) {

  let cost = 0
  let d = make2DArray(word1.length + 1, word2.length + 1, 0)

  console.log(11, word1.length, word2.length, d[1][2])
//
//   // source prefixes can be transformed into empty string by
//   // dropping all characters
  for (let i = 1; i <= word1.length; i++) {
    d[i][0] = i
  }

  console.log(1, d)
//
//   // target prefixes can be reached from empty source prefix
//   // by inserting every character
  for (let j = 1; j <= word2.length; j++) {
    d[0][j] = j
  }

  console.log(2, d)

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
  console.log(2, d[word1.length][word2.length])

  return d[word1.length][word2.length]
}


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
      console.log(arr[i][j])
    }
  }
  console.log(44, arr)

  return arr;
}
