/**
 * gimci
 * Natural Language Processing Module for Korean and Korean Letters (Hangul)
 *
 * Document under production
 *
 * 2016 All rights reserved.
 * @author engine enginehenryed@gmail.com, uenieng wonyeong91@gmail.com
 * @license MIT License
 *
 */

import getDistanceOfTwoWords from './getDistanceOfTwoWords'
import DictUtils from './utils/DictUtils'
import FileUtils from './utils/FileUtils'
import RomanizerUtils from './utils/RomanizerUtils'
import conf from './conf'
import search from './search'
import { convertHangyrToRoman, convertRomanToHangyr } from './transcribe'
import readline from 'readline'

export {
  conf,
  convertHangyrToRoman,
  convertRomanToHangyr,
  getDistanceOfTwoWords,
  search,

  // utils
  DictUtils,
  FileUtils,
  RomanizerUtils,
}

/**
 * Development
 * takes the input and process as demanded.
 */
if ((process.argv)[2] === 'dict') {
  DictUtils.build()
} else if ((process.argv)[2] === 'search') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('What do you want to search?', (ans) => {
    console.log(`input: ${ans}`);
    rl.close();
    search((process.argv)[2])
  });
}