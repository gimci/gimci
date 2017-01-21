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

  // case1
  // When the dict has exact 'query' entry ANDit is standard (not derivatives),
  if (dict.hasOwnProperty(query) && dict[query]['refer'].includes(query)) {
    res['tier1'].push(query);
  }

  // case2
  // T2. describtion above.


  // case3
  // loop through dict['elem']['refer']
  // pick whose refer does not contain elem itself, but only the query string
  if (dict.hasOwnProperty(query) && !dict[query]['refer'].includes(query)) {
    dict[query]['refer'].map(function (refer) {
      if (res['tier1'].indexOf(refer) === -1 && res['tier2'].indexOf(refer) === -1 && res['tier3'].indexOf(refer) === -1) {
        // case2
        console.log([1], query.replace(pattern, "").toLowerCase());
        if (pattern.test(query) && query.replace(pattern, "").toLowerCase() === refer.toLowerCase()) {
          res['tier2'].push(refer);
        } else if (query.toLowerCase() === refer.toLowerCase() || query.replace(pattern, "") === refer) {
          res['tier2'].push(refer);
        } else {
          res['tier3'].push(refer);
        }
      }
    });
  }

  // case4
  // loop through candidates
  // pick candiate === dict[candidate]
  candidates.map(function (candidate) {
    if (dict.hasOwnProperty(candidate) && dict[candidate]['refer'].includes(candidate)) {
      if (res['tier1'].indexOf(candidate) === -1 && res['tier2'].indexOf(candidate) === -1 && res['tier3'].indexOf(candidate) === -1) {
        // case2
        if (pattern.test(query) && query.replace(pattern, "").toLowerCase() === candidate.toLowerCase()) {
          res['tier2'].push(candidate);
        } else if (query.toLowerCase() === candidate.toLowerCase() || query.replace(pattern, "") === candidate) {
          res['tier2'].push(candidate);
        } else {
          res['tier3'].push(candidate);
        }
      }
    }
  });

  // case5
  // loop through dict['elem']['refer'] and candidates
  // match all the possible cases
  candidates.map(function (candidate) {
    if (dict.hasOwnProperty(candidate) && !dict[candidate]['refer'].includes(candidate)) {
      dict[candidate]['refer'].map(function (refer) {
        if (res['tier1'].indexOf(refer) === -1 && res['tier2'].indexOf(refer) === -1 && res['tier3'].indexOf(refer) === -1 && res['tier4'].indexOf(refer) === -1) {
          // case2
          if (pattern.test(query) && query.replace(pattern, "").toLowerCase() === refer.toLowerCase()) {
            res['tier2'].push(candidate);
          } else if (query.toLowerCase() === refer.toLowerCase() || query.replace(pattern, "") === refer) {
            res['tier2'].push(refer);
          } else {
            res['tier4'].push(refer);
          }
        }
      });
    }
  });

  // if query contain single quiota such as 's, 'b ...
  if (pattern.test(query)) {
    var res2 = search(query.replace(pattern, ""));
    res2['tier1'].map(function (tier1) {
      // nothing
    });
    res2['tier2'].map(function (tier2) {
      if (res['tier2'].indexOf(tier2) === -1) {
        res['tier2'].push(tier2);
      }
    });
    res2['tier3'].map(function (tier3) {
      if (res['tier3'].indexOf(tier3) === -1) {
        res['tier3'].push(tier3);
      }
    });
    res2['tier4'].map(function (tier4) {
      if (res['tier4'].indexOf(tier4) === -1) {
        res['tier4'].push(tier4);
      }
    });
  }

  res = convertSearchRetToHangul(res, mode);
  return res;
};

/*
 *
 */
var hardSearch = function hardSearch(_query) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _conf2.default.searchMode;

  var query = (0, _transcribe.convertHangyrToRoman)(_query);
  var dictPath = _conf2.default.dictPath;

  var dict = require('../assets/elementaryKorean.dict.json');

  // regex to delete single quota '


  var tokensOfQuery = _StringUtils2.default.createTokensByDeletion(query);
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

  res = convertSearchRetToHangyr(res, mode);
  return res;
};

/*
 *
 */
var convertSearchRetToHangul = function convertSearchRetToHangul(tierSet, mode) {
  for (var i = 0; i < tierSet['tier1'].length; i++) {
    if (tierSet['tier1'][i] !== '') {
      tierSet['tier1'][i] = (0, _transcribe.convertRomanToHangyr)(tierSet['tier1'][i]);
    }
  }
  for (var _i = 0; _i < tierSet['tier2'].length; _i++) {
    tierSet['tier2'][_i] = (0, _transcribe.convertRomanToHangyr)(tierSet['tier2'][_i]);
  }
  for (var _i2 = 0; _i2 < tierSet['tier3'].length; _i2++) {
    tierSet['tier3'][_i2] = (0, _transcribe.convertRomanToHangyr)(tierSet['tier3'][_i2]);
  }
  if (_conf2.default.searchMode !== 'hard') {
    for (var _i3 = 0; _i3 < tierSet['tier4'].length; _i3++) {
      tierSet['tier4'][_i3] = (0, _transcribe.convertRomanToHangyr)(tierSet['tier4'][_i3]);
    }
  }
  return tierSet;
};

exports.default = search;
module.exports = exports['default'];