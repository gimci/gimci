'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convertRomanToHangyr;

var _bagsynghienRule = require('./bagsynghienRule');

/**
 * @param str Roman representation of hangyr character
 * @return char Hangyr character
 */
var compose = function compose(str) {
  console.log(1, str);
  if (str.includes('\'')) {
    console.log(2);
    var charCode = getCharCodeByRoman(str, _bagsynghienRule.JAMO);
    return String.fromCharCode(charCode);
  } else {
    var re = /([aeiouyAEIOUY]+)/;
    var lettersSegmented = str.split(re);
    console.log(1, str, lettersSegmented);

    var initialId = getIdxByRoman(lettersSegmented[0], _bagsynghienRule.INITIAL);
    var medialId = getIdxByRoman(lettersSegmented[1].toLowerCase(), _bagsynghienRule.MEDIAL);
    var finalId = lettersSegmented.length >= 2 ? getIdxByRoman(lettersSegmented[2], _bagsynghienRule.FINAL) : undefined;

    var _charCode = 0xAC00 + 28 * 21 * initialId + 28 * medialId + finalId;
    return String.fromCharCode(_charCode);
  }
};

/*
 *
 */
/**/
var getIdxByRoman = function getIdxByRoman(ro, haystack) {
  for (var i = 0; i < haystack.length; i++) {
    if (haystack[i].ro === ro) {
      return i;
    }
  }
  console.log('Couldn\'t find ' + ro + ' in ' + haystack);
};

var getCharCodeByRoman = function getCharCodeByRoman(ro, haystack) {
  for (var i = 0; i < haystack.length; i++) {
    if (haystack[i].ro === ro) {
      return haystack[i].uni;
    }
  }
  console.log('Couldn\'t find ' + ro + ' in ' + haystack);
};

/*
 * slice word start with vowel
 */
var segmentByVowel = function segmentByVowel(str) {
  var slicePosition = 0;
  var ret = [];
  var char = '';

  for (var i = 1; i < str.length; i++) {
    char = str.charAt(i);
    // if char is vowel
    if (vowel(char)) {
      ret.push(str.slice(slicePosition, i));
      slicePosition = i;
    }
  }
  ret.push(str.slice(slicePosition));
  return ret;
};

/*
 * check vowel
 */
var vowel = function vowel(c) {
  return ['a', 'e', 'i', 'o', 'u', 'y'].indexOf(c.toLowerCase()) !== -1;
};

var segmentIntoChars = function segmentIntoChars(segmentedByVowel) {
  var segs = segmentedByVowel;
  var numSegs = segs.length;
  for (var i = numSegs - 1; i > 0; i--) {
    if (segs[i].charAt(0) === segs[i].charAt(0).toLowerCase()) {
      // check last word is consonant
      if (i !== 0 && !vowel(segs[i - 1].charAt(segs[i - 1].length - 1))) {
        // check Uppercase consonant
        if (!vowel(segs[i - 1].charAt(segs[i - 1].length - 2)) && segs[i - 1].charAt(segs[i - 1].length - 2) === segs[i - 1].charAt(segs[i - 1].length - 2).toUpperCase()) {
          // slice end of two letter and concat
          segs[i] = segs[i - 1].slice(segs[i - 1].length - 2, segs[i - 1].length).concat(segs[i]);
          segs[i - 1] = segs[i - 1].slice(0, segs[i - 1].length - 2);
        } else {
          // slice end of one letter and concat
          segs[i] = segs[i - 1].slice(segs[i - 1].length - 1, segs[i - 1].length).concat(segs[i]);
          segs[i - 1] = segs[i - 1].slice(0, segs[i - 1].length - 1);
        }
      } else if (i !== 0 && vowel(segs[i - 1].charAt(segs[i - 1].length - 1))) {
        // if last word is vowel
        // concat lastArray to front and delete lastArray
        segs[i - 1] = segs[i - 1].concat(segs[i]);
        segs.splice(i, 1);
      }
    } else {
      // if Uppercase Of Vowel
      // nothing
    }
  }

  // handle when firstArray is ''
  if (segs[0] === '') {
    segs.splice(0, 1);
  }
  return segs;
};

function convertRomanToHangyr(str) {
  var segmentedByVowel = segmentByVowel(str);
  var segmentedIntoChars = segmentIntoChars(segmentedByVowel);
  var convertedHangul = '';

  // looping through segmentedIntoChars
  // concatenate each of the result of compose(char)
  for (var i = 0; i < segmentedIntoChars.length; i++) {
    convertedHangul = convertedHangul.concat(compose(segmentedIntoChars[i]));
  }

  return convertedHangul;
}
module.exports = exports['default'];