'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* Internal Dependencies */


var _StringUtils = require('./StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

var _FileUtils = require('./FileUtils');

var _FileUtils2 = _interopRequireDefault(_FileUtils);

var _conf = require('../conf');

var _conf2 = _interopRequireDefault(_conf);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _LogUtils = require('./LogUtils');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Pipeline for building a dictionary file.
 */

/**
 * Stage 0
 * Romanized data into a linear data chunk.
 *
 * e.g. The content of the output file should be as following.
 *   foo -refer foo
 *   fo -refer foo
 *   poo -refer poo
 *   po -refer po
 *   ...
 */
var build = function build(dictSrcPath) {

  stage0(dictSrcPath);

  // File.write(conf.dictDestPath, dict.getDict())
  console.log('Finished building new dictionary', _conf2.default.dictDestPath);
};

/**
 *
 */
var stage0 = function stage0(dictSrcPath) {
  var tokens = {};
  var rl = _readline2.default.createInterface({
    input: _fs2.default.createReadStream(_conf2.default.dictSrcPath),
    output: _fs2.default.createWriteStream(_conf2.default.dict0DestPath, { 'flags': 'a' })
  });
  // let ws = fs.createWriteStream(conf.dict0DestPath, {'flags': 'a'})
  var i = void 0,
      j = void 0;

  rl.on('line', function (line) {
    line = _StringUtils2.default.removeWhiteSpaces(line); // for trailing space at the beginning of file
    tokens = _StringUtils2.default.createTokensByDeletion(line);

    rl.output.write(line + ' -lexrf ' + tokens.base + '\n'); // write base
    // fs.appendFileSync(conf.dict0DestPath, line)
    for (i = 0; i < tokens.del1.length; i++) {
      rl.output.write(tokens.del1[i] + ' -lexrf ' + tokens.base + '\n'); // write del1 tokens
    }
    for (j = 0; j < tokens.del2.length; j++) {
      rl.output.write(tokens.del2[j] + ' -lexrf ' + tokens.base + '\n'); // write del2 tokens
    }
  }).on('close', function (err) {
    (0, _LogUtils.log)('end stage0', err);
    rl.close();

    // stage1
    stage1();
  });
};

/**
 *
 */
var stage1 = function stage1(somePath) {

  var processed = []; // Checked entry will go into the list
  var rl = _readline2.default.createInterface({
    input: _fs2.default.createReadStream(_conf2.default.dict0DestPath),
    output: _fs2.default.createWriteStream(_conf2.default.dict1DestPath, { 'flags': 'a' })
  });

  var entryInLine = void 0;
  var newLine = void 0;
  var processedLine = [];

  // during some condition,
  var cond = true;
  var i = void 0;
  var lineArr = [];

  rl.on('line', function (line) {
    // if 'line' is not already taken entry, start processing
    // add it to the 'entries'
    // entryAcc = !entry ? line : entryAcc

    entryInLine = line.split(' ')[0];

    if (!processed.includes(entryInLine)) {
      processed.push(entryInLine);
      var lineArr = line.split(' ');
      processedLine.push(lineArr[0] + ' -pop 0 -tot 0 ' + lineArr[1] + ' ' + lineArr[2] + ' -rel');
    } else {
      for (i = 0; i < processed.length; i++) {
        if (entryInLine === processed[i]) {
          lineArr = line.split(' ');
          newLine = processedLine[i].split(' ');
          processedLine[i] = concatLexrf(lineArr, newLine);
        }
      }
    }
    // process it
  }).on('close', function (err) {
    (0, _LogUtils.log)('end stage1', err);
    for (i = 0; i < processedLine.length; i++) {
      rl.output.write(processedLine[i] + '\n');
    }
    rl.close();
  });
};

/**
 *  ConcatLexrf
 *  return String after concatination -lexrf
 */
var concatLexrf = function concatLexrf(lineArr, newLine) {
  var i = newLine.indexOf('-lexrf') + 1;
  // console.log(1, i, newLine)
  if (i === 0) {
    console.log('Error in concatLexrf in ' + lineArr);
    return;
  }
  var insertFlag = true;

  while (newLine[i] !== '-rel') {
    if (getLexrf(lineArr) === newLine[i]) {
      insertFlag = false;
    }
    i++;
  }

  if (insertFlag) {
    // console.log(2, newLine[i-1], getLexrf(lineArr), newLine[i])
    newLine[i] = getLexrf(lineArr);
    newLine[i + 1] = '-rel';
    // console.log(3, newLine[i-1], getLexrf(lineArr), newLine[i])
  }
  // console.log(4, newLine.join(' '))
  return newLine.join(' ');
};

/**
 * GetLexrf
 * return elem of -lexrf
 */
var getLexrf = function getLexrf(lineArr) {
  var i = void 0;

  for (i = 0; i < lineArr.length; i++) {
    if (lineArr[i] === '-lexrf') {
      return lineArr[i + 1];
    }
  }
  console.log('Error in get Lexrf in line ' + lineArr);
  return '';
};

/**
 *
 */
var sumEntryInstances = function sumEntryInstances(rl, ws) {
  // Create a readstream again,
  rl = _readline2.default.createInterface({
    input: _fs2.default.createReadStream(_conf2.default.dictSrcPath)
  });
  // let entry = ''

  rl.on('line', function (line) {
    // if 'line' is not already taken entry, start processing
    // add it to the 'entries'
    // entry = line.split(' ')[0]


    // process it
  }).on('close', function () {
    // process again with the other entry
    // sumEntryInstances()
  });
};

/**
 * DEPRECATED
 *
 * Inner dictionary class that holds the data.
 * This class will not be seen from the outside.
 */

var Dict = function () {
  function Dict() {
    _classCallCheck(this, Dict);

    this._dict = {};
  }

  /**
   * todos
   * Document should be made.
   */


  _createClass(Dict, [{
    key: 'insert',
    value: function insert(word, base) {
      if (!this._dict[word]) {
        this._dict[word] = { refer: [base] };
      } else {
        if (this._dict[word]['refer'].indexOf(base) === -1) {
          this._dict[word]['refer'].push(base);
        }
      }
    }

    /**
     * ...
     */

  }, {
    key: 'getDict',
    value: function getDict() {
      return this._dict;
    }
  }]);

  return Dict;
}();

exports.default = {
  build: build
};
module.exports = exports['default'];