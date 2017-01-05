'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 *
 */
var deleteOnce = function deleteOnce(str) {
  var ret = [];
  // for(var w = 0; w < words.length; w++) {
  // var word = words[w];
  for (var i = 0; i < str.length; i++) {
    var a = str.substr(0, i) + str.substr(i + 1, str.length);
    if (ret.indexOf(a) === -1) {
      ret.push(a);
    }
  }
  // }
  return ret;
};

/**
 *
 */
var deleteTwice = function deleteTwice(str) {
  var ret = [];
  var tokenDeletedOnce = deleteOnce(str);
  for (var i = 0; i < tokenDeletedOnce.length; i++) {
    ret = ret.concat(deleteOnce(tokenDeletedOnce[i]));
  }
  return ret;
};

/**
 *
 */
var byDeletion = function byDeletion(str, num) {
  var tokenSet = {};
  tokenSet['base'] = str;
  tokenSet['delete1'] = deleteOnce(str);
  if (num === 1) {
    return tokenSet;
  } else {
    tokenSet['delete2'] = deleteTwice(str);
    return tokenSet;
  }
};

var GenerateToken = {};
GenerateToken.byDeletion = byDeletion;

exports.default = GenerateToken;
module.exports = exports['default'];