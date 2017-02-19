'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getDistanceOfTwoWords = require('./getDistanceOfTwoWords');

var _getDistanceOfTwoWords2 = _interopRequireDefault(_getDistanceOfTwoWords);

var _DictUtils = require('./utils/DictUtils');

var _DictUtils2 = _interopRequireDefault(_DictUtils);

var _FileUtils = require('./utils/FileUtils');

var _FileUtils2 = _interopRequireDefault(_FileUtils);

var _RomanizerUtils = require('./utils/RomanizerUtils');

var _RomanizerUtils2 = _interopRequireDefault(_RomanizerUtils);

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _transcribe = require('./transcribe');

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Path resolution.
 */
global.__gimciBase = _path2.default.resolve(__dirname, '..');

/**
 * Development
 * takes the input and process as demanded.
 */
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

if (process.argv[2] === 'dict') {
  _DictUtils2.default.build();
} else if (process.argv[2] === 'search') {
  (function () {
    var rl = _readline2.default.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('What do you want to search?', function (ans) {
      console.log('input: ' + ans);
      rl.close();
      (0, _search2.default)(ans);
    });
  })();
}

exports.default = {
  conf: _conf2.default,
  convertHangyrToRoman: _transcribe.convertHangyrToRoman,
  convertRomanToHangyr: _transcribe.convertRomanToHangyr,
  getDistanceOfTwoWords: _getDistanceOfTwoWords2.default,
  search: _search2.default,

  // utils
  DictUtils: _DictUtils2.default,
  FileUtils: _FileUtils2.default,
  RomanizerUtils: _RomanizerUtils2.default
};
module.exports = exports['default'];