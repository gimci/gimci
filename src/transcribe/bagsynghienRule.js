/**
* bagsynghienRule
* Copyright 2016 2017 Seunghyun Park enginehenryed@gmail.com
* ...statement to be detailed
*/
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
  {ko: 'ㅆ', ro: 'Ss', uni: 0x3146},
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

const JAMO = {
  '3131': {ko: 'ㄱ', ro: `'g`, uni: 0x3131},
  '3132': {ko: 'ㄲ', ro: `'gg`, uni: 0x3132},
  '3133': {ko: 'ㄱㅅ', ro: `'gs`, uni: 0x3133},
  '3134': {ko: 'ㄴ', ro: `'n`, uni: 0x3134},
  '3135': {ko: 'ㄴㅈ', ro: `'nj`, uni: 0x3135},
  '3136': {ko: 'ㄴㅎ', ro: `nh`, uni: 0x3136},
  '3137': {ko: 'ㄷ', ro: `'d`, uni: 0x3137},
  '3138': {ko: 'ㄸ', ro: `'dd`, uni: 0x3138},
  '3139': {ko: 'ㄹ', ro: `'r`, uni: 0x3139},
  '313a': {ko: 'ㄹㄱ', ro: `'rg`, uni: 0x313a},
  '313b': {ko: 'ㄹㅁ', ro: `'rm`, uni: 0x313b},
  '313c': {ko: 'ㄹㅂ', ro: `'rb`, uni: 0x313c},
  '313d': {ko: 'ㄹㅅ', ro: `'rs`, uni: 0x313d},
  '313e': {ko: 'ㄹㅌ', ro: `'rt`, uni: 0x313e},
  '313f': {ko: 'ㄹㅍ', ro: `'rp`, uni: 0x313f},
  '3140': {ko: 'ㄹㅎ', ro: `'rh`, uni: 0x3140},
  '3141': {ko: 'ㅁ', ro: `'m`, uni: 0x3141},
  '3142': {ko: 'ㅂ', ro: `'b`, uni: 0x3142},
  '3143': {ko: 'ㅃ', ro: `'bb`, uni: 0x3143},
  '3144': {ko: 'ㅂㅅ', ro: `'bs`, uni: 0x3144},
  '3145': {ko: 'ㅅ', ro: `'s`, uni: 0x3145},
  '3146': {ko: 'ㅆ', ro: `'ss`, uni: 0x3146},
  '3147': {ko: 'ㅇ', ro: `'ng`, uni: 0x3147},
  '3148': {ko: 'ㅈ', ro: `'j`, uni: 0x3148},
  '3149': {ko: 'ㅉ', ro: `'Jj`, uni: 0x3149},
  '314a': {ko: 'ㅊ', ro: `'c`, uni: 0x314a},
  '314b': {ko: 'ㅋ', ro: `'k`, uni: 0x314b},
  '314c': {ko: 'ㅌ', ro: `'t`, uni: 0x314c},
  '314d': {ko: 'ㅍ', ro: `'p`, uni: 0x314d},
  '314e': {ko: 'ㅎ', ro: `'h`, uni: 0x314e},
  '314f': {ko: 'ㅏ', ro: `'a`, uni: 0x314f},
  '3150': {ko: 'ㅐ', ro: `'ai`, uni: 0x3150},
  '3151': {ko: 'ㅑ', ro: `'ia`, uni: 0x3151},
  '3152': {ko: 'ㅒ', ro: `'ai`, uni: 0x3152},
  '3153': {ko: 'ㅓ', ro: `'e`, uni: 0x3153},
  '3154': {ko: 'ㅔ', ro: `'ei'`, uni: 0x3154},
  '3155': {ko: 'ㅕ', ro: `'ie`, uni: 0x3155},
  '3156': {ko: 'ㅖ', ro: `'iei`, uni: 0x3156},
  '3157': {ko: 'ㅗ', ro: `'o`, uni: 0x3157},
  '3158': {ko: 'ㅘ', ro: `'oa`, uni: 0x3158},
  '3159': {ko: 'ㅙ', ro: `'oai`, uni: 0x3159},
  '315a': {ko: 'ㅚ', ro: `'oi`, uni: 0x315a},
  '315b': {ko: 'ㅛ', ro: `'io`, uni: 0x315b},
  '315c': {ko: 'ㅜ', ro: `'u`, uni: 0x315c},
  '315d': {ko: 'ㅝ', ro: `'ue`, uni: 0x315d},
  '315e': {ko: 'ㅞ', ro: `'uei'`, uni: 0x315e},
  '315f': {ko: 'ㅟ', ro: `'ui`, uni: 0x315f},
  '3160': {ko: 'ㅠ', ro: `'iu`, uni: 0x3160},
  '3161': {ko: 'ㅡ', ro: `'y`, uni: 0x3161},
  '3162': {ko: 'ㅢ', ro: `'yi`, uni: 0x3162},
  '3163': {ko: 'ㅣ', ro: `'i`, uni: 0x3163},
}

export {
  INITIAL,
  MEDIAL,
  FINAL,
  JAMO
}
