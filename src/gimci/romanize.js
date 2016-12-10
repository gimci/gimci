/**
 * Unicode standard, ver. 9.0
 * Hangul compatibility Jamo
 */

const INITIAL = [
  {ko: 'ㄱ', ro: 'g', uni: 0x3131},
  {ko: 'ㄲ', ro: 'Gg', uni: 0x3132},
  {ko: 'ㄴ', ro: 'n', uni: 0x3134},
  {ko: 'ㄷ', ro: 'd', uni: 0x3137},
  {ko: 'ㄸ', ro: 'Dd', uni: 0x3138},
  {ko: 'ㄹ', ro: 'r', uni: 0x3139},
  {ko: 'ㅁ', ro: 'm', uni: 0x3141},
  {ko: 'ㅂ', ro: 'b', uni: 0x3142},
  {ko: 'ㅃ', ro: 'Bb', uni: 0x3143},
  {ko: 'ㅅ', ro: 's', uni: 0x3145},
  {ko: 'ㅆ', ro: 'ss', uni: 0x3146},
  {ko: 'ㅇ', ro: '', uni: 0x3147}, // 11th
  {ko: 'ㅈ', ro: 'j', uni: 0x3148},
  {ko: 'ㅉ', ro: 'Jj', uni: 0x3149},
  {ko: 'ㅊ', ro: 'c', uni: 0x314a},
  {ko: 'ㅋ', ro: 'k', uni: 0x314b},
  {ko: 'ㅌ', ro: 't', uni: 0x314c},
  {ko: 'ㅍ', ro: 'p', uni: 0x314d},
  {ko: 'ㅎ', ro: 'h', uni: 0x314e}
]

const MEDIAL = [
  {ko: 'ㅏ', ro: 'a', uni: 0x314f},
  {ko: 'ㅐ', ro: 'ai', uni: 0x3150},
  {ko: 'ㅑ', ro: 'ia', uni: 0x3151},
  {ko: 'ㅒ', ro: 'iai', uni: 0x3152},
  {ko: 'ㅓ', ro: 'e', uni: 0x3153},
  {ko: 'ㅔ', ro: 'ei', uni: 0x3154},
  {ko: 'ㅕ', ro: 'ie', uni: 0x3155},
  {ko: 'ㅖ', ro: 'iei', uni: 0x3156},
  {ko: 'ㅗ', ro: 'o', uni: 0x3157},
  {ko: 'ㅘ', ro: 'oa', uni: 0x3158},
  {ko: 'ㅙ', ro: 'oai', uni: 0x3159},
  {ko: 'ㅚ', ro: 'oi', uni: 0x315a},
  {ko: 'ㅛ', ro: 'io', uni: 0x315b},
  {ko: 'ㅜ', ro: 'u', uni: 0x315c},
  {ko: 'ㅝ', ro: 'ue', uni: 0x315d},
  {ko: 'ㅞ', ro: 'uei', uni: 0x315e},
  {ko: 'ㅟ', ro: 'ui', uni: 0x315f},
  {ko: 'ㅠ', ro: 'iu', uni: 0x3160},
  {ko: 'ㅡ', ro: 'y', uni: 0x3161},
  {ko: 'ㅢ', ro: 'yi', uni: 0x3162},
  {ko: 'ㅣ', ro: 'i', uni: 0x3163},
]

const FINAL = [
  {ko: '', ro: '', uni: 0x0000},
  {ko: 'ㄱ', ro: 'g', uni: 0x3131},
  {ko: 'ㄲ', ro: 'gg', uni: 0x3132},
  {ko: 'ㄱㅅ', ro: 'gs', uni: 0x3133},
  {ko: 'ㄴ', ro: 'n', uni: 0x3134},
  {ko: 'ㄴㅈ', ro: 'nj', uni: 0x3135},
  {ko: 'ㄴㅎ', ro: 'nh', uni: 0x3136},
  {ko: 'ㄷ', ro: 'd', uni: 0x3137},
  {ko: 'ㄹ', ro: 'r', uni: 0x3139},
  {ko: 'ㄹㄱ', ro: 'rg', uni: 0x313a},
  {ko: 'ㄹㅁ', ro: 'rm', uni: 0x313b},
  {ko: 'ㄹㅂ', ro: 'rb', uni: 0x313c},
  {ko: 'ㄹㅅ', ro: 'rs', uni: 0x313d},
  {ko: 'ㄹㅌ', ro: 'rt', uni: 0x313e},
  {ko: 'ㄹㅍ', ro: 'rp', uni: 0x313f},
  {ko: 'ㄹㅎ', ro: 'rh', uni: 0x3140},
  {ko: 'ㅁ', ro: 'm', uni: 0x3141},
  {ko: 'ㅂ', ro: 'b', uni: 0x3142},
  {ko: 'ㅂㅅ', ro: 'bs', uni: 0x3144},
  {ko: 'ㅅ', ro: 's', uni: 0x3145},
  {ko: 'ㅆ', ro: 'ss', uni: 0x3146},
  {ko: 'ㅇ', ro: 'ng', uni: 0x3147}, // note that 'IYng' is nasal here, thus 'ng' not '\phi'
  {ko: 'ㅈ', ro: 'j', uni: 0x3148},
  {ko: 'ㅊ', ro: 'c', uni: 0x314a},
  {ko: 'ㅋ', ro: 'k', uni: 0x314b},
  {ko: 'ㅌ', ro: 't', uni: 0x314c},
  {ko: 'ㅍ', ro: 'p', uni: 0x314d},
  {ko: 'ㅎ', ro: 'h', uni: 0x314e}
]

export default function romanize(text) {

  var chars = []
  let l1, l2, l3, initial, medial, final
  var ret = ''

  for (let i = 0; i < text.length; i++) {
    // console.log('input', chars[i])
    l1 = 0
    l2 = 0
    l3 = 0
    initial = ''
    medial = ''
    final = ''

    chars[i] = text.charCodeAt(i)

    if (chars[i] >= 0xAC00 && chars[i] <= 0xD7A3) {
      l1 = 0, l2 = 0, l3 = 0;
      l3 = chars[i] - 0xAC00;
      l1 = l3 / (21 * 28); // initial
      l3 = l3 % (21 * 28);
      l2 = l3 / 28; // median
      l3 = l3 % 28; // final

      initial = INITIAL[parseInt(l1)].ro
      if(initial !== '') {
        ret = ret.concat(initial)
      }

      medial = MEDIAL[parseInt(l2)].ro
      if(initial === '') { // make the first char uppercase when initial is empty,
        medial = medial.charAt(0).toUpperCase() + medial.slice(1);
      }
      ret = ret.concat(medial)

      if(l3 != 0x0000) { // if final is not empty
        final = FINAL[parseInt(l3)].ro
        ret = ret.concat(final)
      }

    }
    else { // if the char is not hangyr
      ret = ret.concat(String.fromCharCode(chars[i]));
    }
  }
  return ret;
}
