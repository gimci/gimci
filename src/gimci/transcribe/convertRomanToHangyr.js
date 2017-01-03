/**/
import {INITIAL, MEDIAL, FINAL, JAMO} from './bagsynghienRule'

/**
 *
 * @param text
 * @returns {string}
 */
export default function convertRomanToHangyr(text) {
  let seg = segment(text)
  let n = seg.length
  for (let i = n - 1; i > 0; i--) {
    if (seg[i].charAt(0) === seg[i].charAt(0).toLowerCase()) {
      // check last word is consonant
      if (i !== 0 && !isVowel(seg[i - 1].charAt(seg[i - 1].length - 1))) {
        // check Uppercase consonant
        if (!isVowel(seg[i - 1].charAt(seg[i - 1].length - 2))
            && seg[i - 1].charAt(seg[i - 1].length - 2) === seg[i - 1].charAt(seg[i - 1].length - 2).toUpperCase()) {
          // slice end of two letter and concat
          seg[i] = seg[i - 1].slice(seg[i - 1].length - 2, seg[i - 1].length).concat(seg[i])
          seg[i - 1] = seg[i - 1].slice(0, seg[i - 1].length - 2)
        } else {
          // slice end of one letter and concat
          seg[i] = seg[i - 1].slice(seg[i - 1].length - 1, seg[i - 1].length).concat(seg[i])
          seg[i - 1] = seg[i - 1].slice(0, seg[i - 1].length - 1)
        }
      } else if (i !== 0 && isVowel(seg[i - 1].charAt(seg[i - 1].length - 1))) {
        // if last word is vowel
        // concat lastArray to front and delete lastArray
        seg[i - 1] = seg[i - 1].concat(seg[i])
        seg.splice(i, 1)
      }
    } else {
      // if Uppercase Of Vowel
      // nothing
    }
  }

  // handle when firstArray is ''
  if(seg[0] === '') {
    seg.splice(0, 1)
  }


  return seg
}


/*
 * slice word start with vowel
 */
const segment = (text) => {
  let slicePosition = 0
  let ret = []
  let char = ''

  for (let i = 1; i < text.length; i++) {
    char = text.charAt(i)
    // if char is vowel
    if (isVowel(char)) {
      ret.push(text.slice(slicePosition, i))
      slicePosition = i;
    }
  }
  ret.push(text.slice(slicePosition))

  return ret;
}


/*
 * check vowel
 */
const isVowel = (vowel) => {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(vowel.toLowerCase()) !== -1
}

