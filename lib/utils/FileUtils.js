'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**/
var _srcPath = '../../assets/elementaryKorean.dict.json';
var fs = false;

/* Sanity check */
try {
  fs = require('fs');
  console.log("node js is in host environment");
} catch (err) {
  fs = false;
  console.log("Cannot load node modules");
}

/**
 *
 */
var read = function read() {
  var srcPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _srcPath;

  return fs.readFileSync ? fs.readFileSync(srcPath, 'utf8') : null;
};

/**
 *
 */
var write = function write(destPath, data) {
  if (fs.writeFile) {
    fs.writeFile(destPath, JSON.stringify(data), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was written.");
    });
  } else {
    // do nothing
  }
};

/**
 *
 */
var resolvePath = function resolvePath(srcPath) {
  if (path) {
    console.log('path resolved', srcPath);
    var _path = require('path');
    _path.join(srcPath, '..');
  } else {
    // do nothing
  }
};

exports.default = {
  read: read,
  write: write
};
module.exports = exports['default'];