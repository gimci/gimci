/**/
import { INITIAL, MEDIAL, FINAL, JAMO } from './bagsynghienRule'



/**
 *
 */
const compose = (str) => {
  const re = /([aeiouyAEIOUY]+)/
  const lettersSegmented = str.split(re)

  const initialId = getByRoman(lettersSegmented[0], INITIAL)
  const medialId = getByRoman(lettersSegmented[1].toLowerCase(), MEDIAL)
  const finalId =
    lettersSegmented.length >= 2
    ? getByRoman(lettersSegmented[2], FINAL)
    : undefined

  const charCode = 0xAC00 + 28 * 21 * initialId + 28 * medialId + finalId
  return String.fromCharCode(charCode)
}

/*
 *
 */
const getByRoman = (ro, haystack) => {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i].ro === ro) {
      return i
    }
  }
  console.log(`Couldn't find ${ro} in ${haystack}`)
}


/**
 *
 * @param text
 * @returns {string}
 */
export default function convertRomanToHangyr(text) {
  return compose(text)
}



// // obsolete
// const vowel = (c) => {
//   return ['a', 'e', 'i', 'o', 'u', 'y'].indexOf(c.toLowerCase()) !== -1
// }
//
// // obsolete
// const segmentIntoLetters = (str) => {
//   let initial, medial, final;
//   for (let i = 0; i < str.length; i++) {
//     if (vowel(str[i])) {
//       initial = i === 0 ? 0 : i - 1
//     }
//   }
// }
