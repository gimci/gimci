'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convertHangyrToRoman;

var _bagsynghienRule = require('./bagsynghienRule');

/**
 *
 * @param text
 * @returns {string}
 */
function convertHangyrToRoman(text) {
  var chars = [];
  var l1 = void 0,
      l2 = void 0,
      l3 = void 0,
      initial = void 0,
      medial = void 0,
      final = void 0;
  var ret = '';

  for (var i = 0; i < text.length; i++) {
    l1 = 0;
    l2 = 0;
    l3 = 0;
    initial = '';
    medial = '';
    final = '';

    chars[i] = text.charCodeAt(i);

    if (chars[i] >= 0xAC00 && chars[i] <= 0xD7A3) {
      l1 = 0, l2 = 0, l3 = 0;
      l3 = chars[i] - 0xAC00;
      l1 = l3 / (21 * 28); // initial
      l3 = l3 % (21 * 28);
      l2 = l3 / 28; // median
      l3 = l3 % 28; // final


      initial = _bagsynghienRule.INITIAL[parseInt(l1)].ro;
      if (initial !== '') {
        ret = ret.concat(initial);
      }

      medial = _bagsynghienRule.MEDIAL[parseInt(l2)].ro;
      if (initial === '') {
        // make the first char uppercase when initial is empty,
        medial = medial.charAt(0).toUpperCase() + medial.slice(1);
      }
      ret = ret.concat(medial);

      if (l3 != 0x0000) {
        // if final is not empty
        final = _bagsynghienRule.FINAL[parseInt(l3)].ro;
        ret = ret.concat(final);
      }
    }

    // When a letter appears it its own form without being combined into a character,
    else if (chars[i] >= 0x3131 && chars[i] <= 0x3163) {
        ret = ret.concat(_bagsynghienRule.JAMO[chars[i].toString(16)].ro);
      }

      // if the char is not hangyr
      else {
          ret = ret.concat(String.fromCharCode(chars[i]));
        }
  }
  return ret;
} /**/
module.exports = exports['default'];