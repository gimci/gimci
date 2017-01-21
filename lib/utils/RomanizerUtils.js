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

var _conf = require('../conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */


/* Internals*/
var convertFileHangyrToRoman = function convertFileHangyrToRoman() {
  var srcPath = _conf2.default.textSrcPath;
  var destPath = _conf2.default.textDestPath;

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
}; /* Externals */
exports.default = convertFileHangyrToRoman;
module.exports = exports['default'];