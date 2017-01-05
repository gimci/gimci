'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _transcribe = require('../transcribe');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default paths
/* Externals */
var _srcPath = '../../assets/elementaryKorean.hangul.txt';

/* Internals*/

var _destPath = '../../assets/elementaryKorean.romanized.txt';

/**
 *
 */
var convertFileHangyrToRoman = function convertFileHangyrToRoman() {
  var srcPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _srcPath;
  var destPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _destPath;

  var rl = _readline2.default.createInterface({
    input: _fs2.default.createReadStream(srcPath),
    output: process.stdout,
    terminal: false
  });

  var fd = _fs2.default.openSync(destPath, 'w');

  rl.on('line', function (line) {
    _fs2.default.write(fd, (0, _transcribe.convertHangyrToRoman)(line) + '\n');
  });

  console.log('Finished romanizing data in file', srcPath, 'into', destPath);
};

exports.default = convertFileHangyrToRoman;
module.exports = exports['default'];