'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StringUtils = require('./utils/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

var _FileUtils = require('./utils/FileUtils');

var _FileUtils2 = _interopRequireDefault(_FileUtils);

var _transcribe = require('./transcribe');

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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
 *    LH  del(d) === proc(q)
 *    LH  d === proc(del(q))
 * T4: (not in T1, T2, T3)
 *    LH  del(d) === del(q)
 *    LH  del(d) === proc(del(q))
 */

/* Internals */
var search = function search(_query, cb) {
  var query = (0, _transcribe.convertHangyrToRoman)(_query);
  console.log(3, cb);

  // let dict = require('../assets/dict1.txt')


  // regex to delete single quota '
  var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;
  var tokensOfQuery = _StringUtils2.default.createTokensByDeletion(query);
  var candidates = tokensOfQuery['del1'].concat(tokensOfQuery['del2']);
  var res = {};
  res['tier1'] = [];
  res['tier2'] = [];
  res['tier3'] = [];
  res['tier4'] = [];

  var entryInLine;
  var i = void 0;
  var includeFlag = false;
  var lineArr = [];

  var rl = _readline2.default.createInterface({
    input: _fs2.default.createReadStream('../assets/dict1.txt')
  });

  rl.on('line', function (line) {
    entryInLine = line.split(' ')[0];

    if (query === entryInLine) {
      lineArr = line.split(' ');
      i = lineArr.indexOf('-lexrf') + 1;
      while (lineArr[i] !== '-rel') {
        if (query === lineArr[i]) {
          // T1
          res['tier1'].push((0, _transcribe.convertRomanToHangyr)(query));
          includeFlag = true;
        }
        i++;
      }
      if (includeFlag === false) {
        i = lineArr.indexOf('-lexrf') + 1;
        while (lineArr[i] !== '-rel') {
          if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1) {
            // T3
            res['tier3'].push((0, _transcribe.convertRomanToHangyr)(lineArr[i]));
          }
          i++;
        }
      }
      includeFlag = false;
      // T2
    } else if (query.replace(pattern, "").toLowerCase() === entryInLine) {
      lineArr = line.split(' ');
      i = lineArr.indexOf('-lexrf') + 1;
      while (lineArr[i] !== '-rel') {
        if (query.replace(pattern, "").toLowerCase() === lineArr[i]) {
          if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1) {
            res['tier2'].push((0, _transcribe.convertRomanToHangyr)(lineArr[i]));
          }
        }
        i++;
      }
      includeFlag = false;
      // T2
    } else if (query.replace(pattern, "") === entryInLine) {
      lineArr = line.split(' ');
      i = lineArr.indexOf('-lexrf') + 1;
      while (lineArr[i] !== '-rel') {
        if (query.replace(pattern, "") === lineArr[i]) {
          includeFlag = true;
          if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1) {
            res['tier2'].push((0, _transcribe.convertRomanToHangyr)(lineArr[i]));
          }
        }
        i++;
      }

      // case5
      if (includeFlag === false) {
        i = lineArr.indexOf('-lexrf') + 1;
        while (lineArr[i] !== '-rel') {
          if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1) {
            res['tier3'].push((0, _transcribe.convertRomanToHangyr)(lineArr[i]));
          }
          i++;
        }
      }
      includeFlag = false;
    }

    candidates.map(function (candidate) {
      if (candidate === entryInLine) {
        lineArr = line.split(' ');
        i = lineArr.indexOf('-lexrf') + 1;
        while (lineArr[i] !== '-rel') {
          if (candidate === lineArr[i]) {
            includeFlag = true;
            if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate)) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate)) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate)) === -1) {
              // case4
              res['tier3'].push((0, _transcribe.convertRomanToHangyr)(candidate));
            }
          }
          i++;
        }
        // T4
        // case 7
        if (includeFlag === false) {
          i = lineArr.indexOf('-lexrf') + 1;
          while (lineArr[i] !== '-rel') {
            if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier4'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1) {
              // case4
              res['tier4'].push((0, _transcribe.convertRomanToHangyr)(lineArr[i]));
            }
            i++;
          }
        }
        includeFlag = false;
      } else if (candidate.replace(pattern, "") === entryInLine) {
        lineArr = line.split(' ');
        i = lineArr.indexOf('-lexrf') + 1;
        while (lineArr[i] !== '-rel') {
          if (candidate.replace(pattern, "") === lineArr[i]) {
            includeFlag = true;
            if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, ""))) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, ""))) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, ""))) === -1) {
              // case6
              res['tier3'].push((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, "")));
            }
          }
          i++;
        }
        if (includeFlag === false) {
          i = lineArr.indexOf('-lexrf') + 1;
          while (lineArr[i] !== '-rel') {
            if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1 && res['tier4'].indexOf((0, _transcribe.convertRomanToHangyr)(lineArr[i])) === -1) {
              // case4
              res['tier4'].push((0, _transcribe.convertRomanToHangyr)(lineArr[i]));
            }
            i++;
          }
        }
        includeFlag = false;
      }
    });
  }).on('close', function (err) {
    console.log(22, removeOverlap(res));
    if (cb) {
      cb.json(removeOverlap(res));
    }
    return removeOverlap(res);
  });
};

var search2 = function search2(_query) {
  var query = (0, _transcribe.convertHangyrToRoman)(_query);

  // let dict = require('../assets/elementaryKorean.dict.json')


  // regex to delete single quota '
  var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;
  var tokensOfQuery = _StringUtils2.default.createTokensByDeletion(query);
  var candidates = tokensOfQuery['del1'].concat(tokensOfQuery['delete2']);
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
  if (dict.hasOwnProperty(query.replace(pattern, "").toLowerCase()) && dict[query.replace(pattern, "").toLowerCase()]['refer'].includes(query.replace(pattern, "").toLowerCase())) {
    if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(query.replace(pattern, "").toLowerCase())) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(query.replace(pattern, "").toLowerCase())) === -1) {
      res['tier2'].push((0, _transcribe.convertRomanToHangyr)(query.replace(pattern, "").toLowerCase()));
    }
  }
  if (dict.hasOwnProperty(query.replace(pattern, "")) && dict[query.replace(pattern, "")]['refer'].includes(query.replace(pattern, ""))) {
    if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(query.replace(pattern, ""))) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(query.replace(pattern, ""))) === -1) {
      res['tier2'].push((0, _transcribe.convertRomanToHangyr)(query.replace(pattern, "")));
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

  // del(d) === proc(q)

  if (dict.hasOwnProperty(query.replace(pattern, "")) && !dict[query.replace(pattern, "")]['refer'].includes(query.replace(pattern, ""))) {
    dict[query.replace(pattern, "")]['refer'].map(function (refer) {
      if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1) {
        res['tier3'].push((0, _transcribe.convertRomanToHangyr)(refer));
      }
    });
  }
  // case6

  // d === proc(del(q))

  candidates.map(function (candidate) {
    if (dict.hasOwnProperty(candidate.replace(pattern, "")) && dict[candidate.replace(pattern, "")]['refer'].includes(candidate.replace(pattern, ""))) {
      if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, ""))) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, ""))) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, ""))) === -1) {
        res['tier3'].push((0, _transcribe.convertRomanToHangyr)(candidate.replace(pattern, "")));
      }
    }
  });

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

  // del(d) === proc(del(q))

  candidates.map(function (candidate) {
    if (dict.hasOwnProperty(candidate.replace(pattern, "")) && !dict[candidate.replace(pattern, "")]['refer'].includes(candidate.replace(pattern, ""))) {
      dict[candidate.replace(pattern, "")]['refer'].map(function (refer) {
        if (res['tier1'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier2'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier3'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1 && res['tier4'].indexOf((0, _transcribe.convertRomanToHangyr)(refer)) === -1) {
          res['tier4'].push((0, _transcribe.convertRomanToHangyr)(refer));
        }
      });
    }
  });

  return res;
};

var removeOverlap = function removeOverlap(arr) {
  var i = void 0;
  for (i = 0; i < arr['tier4'].length; i++) {
    if (arr['tier1'].indexOf(arr['tier4'][i]) !== -1 || arr['tier2'].indexOf(arr['tier4'][i]) !== -1 || arr['tier3'].indexOf(arr['tier4'][i]) !== -1) {
      arr['tier4'].splice(i, 1);
    }
  }
  for (i = 0; i < arr['tier3'].length; i++) {
    if (arr['tier1'].indexOf(arr['tier3'][i]) !== -1 || arr['tier2'].indexOf(arr['tier3'][i]) !== -1) {
      arr['tier3'].splice(i, 1);
    }
  }
  for (i = 0; i < arr['tier2'].length; i++) {
    if (arr['tier1'].indexOf(arr['tier2'][i]) !== -1) {
      arr['tier2'].splice(i, 1);
    }
  }

  return arr;
};

exports.default = search;
module.exports = exports['default'];