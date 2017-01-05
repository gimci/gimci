/**/
import {INITIAL, MEDIAL, FINAL, JAMO} from './bagsynghienRule'


/**
 * @param str Roman representation of hangyr character
 * @return char Hangyr character
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


/*
 * slice word start with vowel
 */
const segmentByVowel = (str) => {
  let slicePosition = 0
  let ret = []
  let char = ''

  for (let i = 1; i < str.length; i++) {
    char = str.charAt(i)
    // if char is vowel
    if (vowel(char)) {
      ret.push(str.slice(slicePosition, i))
      slicePosition = i;
    }
  }
  ret.push(str.slice(slicePosition))
  return ret;
}


/*
 * check vowel
 */
const vowel = (c) => {
  return ['a', 'e', 'i', 'o', 'u', 'y'].indexOf(c.toLowerCase()) !== -1
}


const segmentIntoChars = (segmentedByVowel) => {
  let segs = segmentedByVowel
  const numSegs = segs.length
  for (let i = numSegs - 1; i > 0; i--) {
    if (segs[i].charAt(0) === segs[i].charAt(0).toLowerCase()) {
      // check last word is consonant
      if (i !== 0 && !vowel(segs[i - 1].charAt(segs[i - 1].length - 1))) {
        // check Uppercase consonant
        if (!vowel(segs[i - 1].charAt(segs[i - 1].length - 2))
            && segs[i - 1].charAt(segs[i - 1].length - 2) === segs[i - 1].charAt(segs[i - 1].length - 2).toUpperCase()) {
          // slice end of two letter and concat
          segs[i] = segs[i - 1].slice(segs[i - 1].length - 2, segs[i - 1].length).concat(segs[i])
          segs[i - 1] = segs[i - 1].slice(0, segs[i - 1].length - 2)
        } else {
          // slice end of one letter and concat
          segs[i] = segs[i - 1].slice(segs[i - 1].length - 1, segs[i - 1].length).concat(segs[i])
          segs[i - 1] = segs[i - 1].slice(0, segs[i - 1].length - 1)
        }
      } else if (i !== 0 && vowel(segs[i - 1].charAt(segs[i - 1].length - 1))) {
        // if last word is vowel
        // concat lastArray to front and delete lastArray
        segs[i - 1] = segs[i - 1].concat(segs[i])
        segs.splice(i, 1)
      }
    } else {
      // if Uppercase Of Vowel
      // nothing
    }
  }

  // handle when firstArray is ''
  if(segs[0] === '') {
    segs.splice(0, 1)
  }
  return segs
}


export default function convertRomanToHangyr(str) {
  const segmentedByVowel = segmentByVowel(str)
  const segmentedIntoChars = segmentIntoChars(segmentedByVowel)
  let convertedHangul = ''

  // looping through segmentedIntoChars
  // concatenate each of the result of compose(char)
  for(let i = 0; i < segmentedIntoChars.length; i++) {
    convertedHangul = convertedHangul.concat(compose(segmentedIntoChars[i]))
  }

  return convertedHangul
}
