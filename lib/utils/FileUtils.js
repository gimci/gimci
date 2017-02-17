'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**/
var _srcPath = '../../assets/elementaryKorean.dict.json';

/**
 *
 */
var read = function read() {
  var srcPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _srcPath;

  return _fs2.default.readFileSync ? _fs2.default.readFileSync(srcPath, 'utf8') : null;
};

/**
 *
 */
var write = function write(destPath, data) {
  if (_fs2.default.writeFile) {
    _fs2.default.writeFile(destPath, JSON.stringify(data), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was written.");
    });
  } else {
    // do nothing
  }
};

exports.default = {
  read: read,
  write: write
};
module.exports = exports['default'];