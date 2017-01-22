'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StringUtils = require('./utils/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

var _FileUtils = require('./utils/FileUtils');

var _FileUtils2 = _interopRequireDefault(_FileUtils);

var _transcribe = require('./transcribe');

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * const dict = {
 *  'foo': { 
 *    'refer': ['foo', 'foox', 'fooy' ...]
 *  },
 *  'bar': {
 *    'refer': [...]
 *  }
 * }
 */

/**
 *
 *
 * T1: d === q; exact match
 * T2: d === proc(q); d matches processed query
 * T3: (those not included in T1, T2)
 *    LH  del(d) === q => found in the entry but entry !== refer
 *    LH  d === del(q)
 *    L   del(d) === proc(q)
 *    L   d === proc(del(q))
 * T4: (not in T1, T2, T3)
 *    LH  del(d) === del(q)
 *    L   del(d) === proc(del(q))
 */
/* Internals */
var search = function search(_query) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _conf2.default.searchMode;


  // execute softSearch which have tier2 ignoring difference of lower, uppercase && single quota '
  // if(mode === 'hard') {
  //   return hardSearch(_query, dictPath, mode) }

  var query = (0, _transcribe.convertHangyrToRoman)(_query);

  var dict = require('../assets/elementaryKorean.dict.json');

  // regex to delete single quota '
  var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;
  var tokensOfQuery = _StringUtils2.default.createTokensByDeletion(query);
  var candidates = tokensOfQuery['delete1'].concat(tokensOfQuery['delete2']);
  var res = {};
  res['tier1'] = [];
  res['tier2'] = [];
  res['tier3'] = [];
  res['tier4'] = [];

  // T1
  // case1
  // When the dict has exact 'query' entry ANDit is standard (not derivatives),
  if (dict.hasOwnProperty(query) && dict[query]['refer'].includes(query)) {
    res['tier1'].push((0, _transcribe.convertRomanToHangyr)(query));
  }

  // T2
  // case2
  // describtion above.
  console.log([1], query.replace(pattern, "").toLowerCase());
  if (dict.hasOwnProperty(query.replace(pattern, "").toLowerCase()) && dict[query.replace(pattern, "").toLowerCase()]['refer'].includes(query.replace(pattern, "").toLowerCase())) {
    if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(query.replace(pattern, "").toLowerCase())) === -1) {
      res['tier2'].push((0, _transcribe.convertRomanToHangyr)(query.replace(pattern, "").toLowerCase()));
    }
  }

  // T3
  // case3
  // loop through dict['elem']['refer']
  // pick whose refer does not contain elem itself, but only the query string
  if (dict.hasOwnProperty(query) && !dict[query]['refer'].includes(query)) {
    dict[query]['refer'].map(function (refer) {
      if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1) {
        res['tier3'].push((0, _transcribe.convertRomanToHangyr)(refer));
      }
    });
  }

  // case4
  // loop through candidates
  // pick candiate === dict[candidate]
  candidates.map(function (candidate) {
    if (dict.hasOwnProperty(candidate) && dict[candidate]['refer'].includes(candidate)) {
      if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate)) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate)) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate)) === -1) {
        res['tier3'].push((0, _transcribe.convertRomanToHangyr)(candidate));
      }
    }
  });

  // case5
  //  L   del(d) === proc(q)
  if (mode === 'loose') {
    if (dict.hasOwnProperty(query.replace(pattern, "").toLowerCase()) && !dict[query.replace(pattern, "").toLowerCase()]['refer'].includes(query.replace(pattern, "").toLowerCase())) {
      dict[query.replace(pattern, "").toLowerCase()]['refer'].map(function (refer) {
        if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1) {
          res['tier3'].push((0, _transcribe.convertRomanToHangyr)(refer));
        }
      });
    }

    // case6
    // L   d === proc(del(q))
    candidates.map(function (candidate) {
      if (dict.hasOwnProperty(candidate.replace(pattern, "").toLowerCase()) && dict[candidate.replace(pattern, "").toLowerCase()]['refer'].includes(candidate.replace(pattern, "").toLowerCase())) {
        if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, "").toLowerCase())) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, "").toLowerCase())) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, "").toLowerCase())) === -1) {
          res['tier3'].push((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, "").toLowerCase()));
        }
      }
    });
  }

  // T4
  // case7
  // loop through dict['elem']['refer'] and candidates
  // match all the possible cases
  candidates.map(function (candidate) {
    if (dict.hasOwnProperty(candidate) && !dict[candidate]['refer'].includes(candidate)) {
      dict[candidate]['refer'].map(function (refer) {
        if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier4'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1) {
          res['tier4'].push((0, _transcribe.convertRomanToHangyr)(refer));
        }
      });
    }
  });

  // case8
  // L   del(d) === proc(del(q))
  if (mode === 'loose') {
    candidates.map(function (candidate) {
      if (dict.hasOwnProperty(candidate.replace(pattern, "").toLowerCase()) && !dict[candidate.replace(pattern, "").toLowerCase()]['refer'].includes(candidate.replace(pattern, "").toLowerCase())) {
        dict[candidate.replace(pattern, "").toLowerCase()]['refer'].map(function (refer) {
          if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier4'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1) {
            res['tier4'].push((0, _transcribe.convertRomanToHangyr)(refer));
          }
        });
      }
    });
  }

  return res;
};

exports.default = search;
module.exports = exports['default'];