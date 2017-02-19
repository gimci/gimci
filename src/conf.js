const path = global.__gimciBase

let config = {
  textSrcPath: `${path}/assets/elementaryKorean.hangul.txt`,
  textDestPath: `${path}/assets/elementaryKorean.romanized.txt`,
  dictSrcPath: `${path}/assets/elementaryKorean.romanized.txt`,
  // dictSrcPath: '${path}/assets/temp.txt',
  dict0DestPath: `${path}/assets/dict0.txt`,
  dict1DestPath: `${path}/assets/dict1.txt`,
  dictDestPath: `${path}/assets/dict.txt`,
  // dictDestPath: '${path}/assets/temp3.txt',
}

export default config