'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _warning = require('../utils/warning');

var _warning2 = _interopRequireDefault(_warning);

var _StringUtils = require('../utils/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

var _FileUtils = require('../utils/FileUtils');

var _FileUtils2 = _interopRequireDefault(_FileUtils);

var _transcribe = require('../transcribe');

var _conf = require('../conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Auxiliary method.
 */
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

/**
 * This will create a JSON format file with all the populated data.
 */
/* Internals */
var populate = function populate() {
  var dict = {};
  var _data = _FileUtils2.default.read(_conf2.default.dictSrcPath);
  var data = _data.match(/[^\r\n]+/g);

  var tokens = {};
  var base = '';

  data.map(function (elem) {
    // Delete space
    elem = elem.replace(/(^\s*)|(\s*$)/, '');

    tokens = _StringUtils2.default.createTokensByDeletion(elem);
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

  _FileUtils2.default.write(_conf2.default.dictDestPath, dict);
  console.log('Finished building new dictionary', _conf2.default.dictDestPath);
};

exports.default = {
  populate: populate
};
module.exports = exports['default'];