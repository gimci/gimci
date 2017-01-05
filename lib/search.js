'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generateToken = require('./utils/generateToken');

var _generateToken2 = _interopRequireDefault(_generateToken);

var _FileUtils = require('./utils/FileUtils');

var _FileUtils2 = _interopRequireDefault(_FileUtils);

var _convertHangyrToRoman = require('./transcribe/convertHangyrToRoman');

var _convertHangyrToRoman2 = _interopRequireDefault(_convertHangyrToRoman);

var _convertRomanToHangyr = require('./transcribe/convertRomanToHangyr');

var _convertRomanToHangyr2 = _interopRequireDefault(_convertRomanToHangyr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Default paths */
/* Internals */
var _dictPath = '../assets/elementaryKorean.dict.json';

/**
 *
 */
var search = function search(_query) {
  var dictPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _dictPath;

  var query = (0, _convertHangyrToRoman2.default)(_query);

  // let dict =
  //   process.env.NODE_ENV === 'web'
  //   ? require(`../assets/elementaryKorean.dict.json`)
  //   : JSON.parse(File.read(dictPath))

  var dict = require('../assets/elementaryKorean.dict.json');

  var tokensOfQuery = _generateToken2.default.byDeletion(query);
  var candidates = tokensOfQuery['delete1'].concat(tokensOfQuery['delete2']);
  var res = {};
  res['tier1'] = [];
  res['tier2'] = [];
  res['tier3'] = [];

  // case1
  if (dict.hasOwnProperty(query) && dict[query]['refer'].includes(query)) {
    res['tier1'].push(query);
  }

  // case2
  // loop through dict['elem']['refer']
  // pick whose refer does not contain elem itself, but only the query string
  if (dict.hasOwnProperty(query) && !dict[query]['refer'].includes(query)) {
    dict[query]['refer'].map(function (refer) {
      if (res['tier1'].indexOf(refer) === -1 && res['tier2'].indexOf(refer) === -1) {
        res['tier2'].push(refer);
      }
    });
  }

  // case3
  // loop through candidates
  // pick candiate === dict[candidate]
  candidates.map(function (candidate) {
    if (dict.hasOwnProperty(candidate) && dict[candidate]['refer'].includes(candidate)) {
      if (res['tier1'].indexOf(candidate) === -1 && res['tier2'].indexOf(candidate) === -1) {
        res['tier2'].push(candidate);
      }
    }
  });

  // case4
  // loop through dict['elem']['refer'] and candidates
  // match all the possible cases
  candidates.map(function (candidate) {
    if (dict.hasOwnProperty(candidate) && !dict[candidate]['refer'].includes(candidate)) {
      dict[candidate]['refer'].map(function (refer) {
        if (res['tier1'].indexOf(refer) === -1 && res['tier2'].indexOf(refer) === -1 && res['tier3'].indexOf(refer) === -1) {
          res['tier3'].push(refer);
        }
      });
    }
  });

  res = convertSearchRetToHangul(res);
  return res;
};

/*
 *
 */
var convertSearchRetToHangul = function convertSearchRetToHangul(tierSet) {
  for (var i = 0; i < tierSet['tier1'].length; i++) {
    if (tierSet['tier1'][i] !== '') {
      tierSet['tier1'][i] = (0, _convertRomanToHangyr2.default)(tierSet['tier1'][i]);
    }
  }
  for (var _i = 0; _i < tierSet['tier2'].length; _i++) {
    tierSet['tier2'][_i] = (0, _convertRomanToHangyr2.default)(tierSet['tier2'][_i]);
  }
  for (var _i2 = 0; _i2 < tierSet['tier3'].length; _i2++) {
    tierSet['tier3'][_i2] = (0, _convertRomanToHangyr2.default)(tierSet['tier3'][_i2]);
  }
  return tierSet;
};

exports.default = search;
module.exports = exports['default'];