'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _warning = require('../utils/warning');

var _warning2 = _interopRequireDefault(_warning);

var _generateToken = require('../utils/generateToken');

var _generateToken2 = _interopRequireDefault(_generateToken);

var _FileUtils = require('../utils/FileUtils');

var _FileUtils2 = _interopRequireDefault(_FileUtils);

var _transcribe = require('../transcribe');

var _convertFileHangyrToRoman = require('./convertFileHangyrToRoman');

var _convertFileHangyrToRoman2 = _interopRequireDefault(_convertFileHangyrToRoman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**/
var insertIntoDict = function insertIntoDict(elem, base, dict) {
  if (!dict[elem]) {
    dict[elem] = { refer: [base] };
  } else {
    for (var i = 0; i < dict[elem]['refer'].length; i++) {
      if (dict[elem]['refer'][i] === base) {
        return dict;
      }
    }
    dict[elem]['refer'].push(base);
  }
  return dict;
};

/* Default Paths */
/* Internals */
var _srcPath = '';
var _destPath = '';

/**
 *
 */
var buildNew = function buildNew(srcPath, destPath) {
  var dict = {};
  var _data = _FileUtils2.default.read('../../assets/elementaryKorean.romanized.txt');
  var data = _data.match(/[^\r\n]+/g);

  var tokens = {};
  var base = '';

  data.map(function (elem) {
    // Delete space
    elem = elem.replace(/(^\s*)|(\s*$)/, '');

    tokens = _generateToken2.default.byDeletion(elem);
    base = tokens['base'];
    dict = insertIntoDict(base, base, dict);

    // Delete single
    tokens['delete1'].map(function (delete1Elem) {
      dict = insertIntoDict(delete1Elem, base, dict);
    });

    // Delete twice
    tokens['delete2'].map(function (delete2Elem) {
      dict = insertIntoDict(delete2Elem, base, dict);
    });
  });
  console.log('Finished building new dictionary');
  _FileUtils2.default.write('../../assets/elementaryKorean.dict.json', dict);
};

exports.default = {
  buildNew: buildNew,
  convertFileHangyrToRoman: _convertFileHangyrToRoman2.default
};
module.exports = exports['default'];