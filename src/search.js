/* Internals */
import Str from './utils/StringUtils'
import File from './utils/FileUtils'
import {convertHangyrToRoman, convertRomanToHangyr} from './transcribe'
import readline from 'readline'
import fs from 'fs'
import conf from './conf'


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


const search = (_query, cb) => {
  const query = convertHangyrToRoman(_query)
  // let dict = require('../assets/dict1.txt')


  // regex to delete single quota '
  const pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi
  const tokensOfQuery = Str.createTokensByDeletion(query)
  const candidates = tokensOfQuery['del1'].concat(tokensOfQuery['del2'])
  let res = {}
  res['tier1'] = []
  res['tier2'] = []
  res['tier3'] = []
  res['tier4'] = []


  var entryInLine
  let i
  let includeFlag = false
  let lineArr = []


  let rl = readline.createInterface({
    input: fs.createReadStream(`${global.__gimciBase}/assets/dict1.txt`)
  })

  rl.on('line', function (line) {
    entryInLine = line.split(' ')[0]


    if (query === entryInLine) {
      lineArr = line.split(' ')
      i = lineArr.indexOf('-lexrf') + 1
      while (lineArr[i] !== '-rel') {
        if (query === lineArr[i]) {
          // T1
          res['tier1'].push(convertRomanToHangyr(query))
          includeFlag = true
        }
        i++
      }
      if (includeFlag === false) {
        i = lineArr.indexOf('-lexrf') + 1
        while (lineArr[i] !== '-rel') {
          if (res['tier1'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier2'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier3'].indexOf(convertRomanToHangyr(lineArr[i])) === -1) {
            // T3
            res['tier3'].push(convertRomanToHangyr(lineArr[i]))
          }
          i++
        }
      }
      includeFlag = false
      // T2
    } else if (query.replace(pattern, "").toLowerCase() === entryInLine) {
      lineArr = line.split(' ')
      i = lineArr.indexOf('-lexrf') + 1
      while (lineArr[i] !== '-rel') {
        if (query.replace(pattern, "").toLowerCase() === lineArr[i]) {
          if (res['tier1'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier2'].indexOf(convertRomanToHangyr(lineArr[i])) === -1) {
            res['tier2'].push(convertRomanToHangyr(lineArr[i]))
          }
        }
        i++
      }
      includeFlag = false
      // T2
    } else if (query.replace(pattern, "") === entryInLine) {
      lineArr = line.split(' ')
      i = lineArr.indexOf('-lexrf') + 1
      while (lineArr[i] !== '-rel') {
        if (query.replace(pattern, "") === lineArr[i]) {
          includeFlag = true
          if (res['tier1'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier2'].indexOf(convertRomanToHangyr(lineArr[i])) === -1) {
            res['tier2'].push(convertRomanToHangyr(lineArr[i]))
          }
        }
        i++
      }

      // case5
      if (includeFlag === false) {
        i = lineArr.indexOf('-lexrf') + 1
        while (lineArr[i] !== '-rel') {
          if (res['tier1'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier2'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier3'].indexOf(convertRomanToHangyr(lineArr[i])) === -1) {
            res['tier3'].push(convertRomanToHangyr(lineArr[i]))
          }
          i++
        }
      }
      includeFlag = false
    }

    candidates.map(candidate => {
      if (candidate === entryInLine) {
        lineArr = line.split(' ')
        i = lineArr.indexOf('-lexrf') + 1
        while (lineArr[i] !== '-rel') {
          if (candidate === lineArr[i]) {
            includeFlag = true
            if (res['tier1'].indexOf(convertRomanToHangyr(candidate)) === -1 && res['tier2'].indexOf(convertRomanToHangyr(candidate)) === -1 && res['tier3'].indexOf(convertRomanToHangyr(candidate)) === -1) {
              // case4
              res['tier3'].push(convertRomanToHangyr(candidate))
            }
          }
          i++
        }
        // T4
        // case 7
        if (includeFlag === false) {
          i = lineArr.indexOf('-lexrf') + 1
          while (lineArr[i] !== '-rel') {
            if (res['tier1'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier2'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier3'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier4'].indexOf(convertRomanToHangyr(lineArr[i])) === -1) {
              // case4
              res['tier4'].push(convertRomanToHangyr(lineArr[i]))
            }
            i++
          }
        }
        includeFlag = false
      } else if (candidate.replace(pattern, "") === entryInLine) {
        lineArr = line.split(' ')
        i = lineArr.indexOf('-lexrf') + 1
        while (lineArr[i] !== '-rel') {
          if (candidate.replace(pattern, "") === lineArr[i]) {
            includeFlag = true
            if (res['tier1'].indexOf(convertRomanToHangyr(candidate.replace(pattern, ""))) === -1 && res['tier2'].indexOf(convertRomanToHangyr(candidate.replace(pattern, ""))) === -1 && res['tier3'].indexOf(convertRomanToHangyr(candidate.replace(pattern, ""))) === -1) {
              // case6
              res['tier3'].push(convertRomanToHangyr(candidate.replace(pattern, "")))
            }
          }
          i++
        }
        if (includeFlag === false) {
          i = lineArr.indexOf('-lexrf') + 1
          while (lineArr[i] !== '-rel') {
            if (res['tier1'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier2'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier3'].indexOf(convertRomanToHangyr(lineArr[i])) === -1 && res['tier4'].indexOf(convertRomanToHangyr(lineArr[i])) === -1) {
              // case4
              res['tier4'].push(convertRomanToHangyr(lineArr[i]))
            }
            i++
          }
        }
        includeFlag = false
      }
    })

  }).on('close', function (err) {
    console.log(22, removeOverlap(res))
    if (cb) {
      cb.json(removeOverlap(res))
    }
    return removeOverlap(res)
  })

}


const search2 = (_query) => {
  const query = convertHangyrToRoman(_query)

  // let dict = require('../assets/elementaryKorean.dict.json')


  // regex to delete single quota '
  const pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi
  const tokensOfQuery = Str.createTokensByDeletion(query)
  const candidates = tokensOfQuery['del1'].concat(tokensOfQuery['delete2'])
  let res = {}
  res['tier1'] = []
  res['tier2'] = []
  res['tier3'] = []
  res['tier4'] = []

  // T1
  // case1
  // When the dict has exact 'query' entry ANDit is standard (not derivatives),
  if (
    dict.hasOwnProperty(query)
    && dict[query]['refer'].includes(query)
  ) {
    res['tier1'].push(convertRomanToHangyr(query))
  }

  // T2
  // case2
  // describtion above.
  if (
    dict.hasOwnProperty(query.replace(pattern, "").toLowerCase())
    && dict[query.replace(pattern, "").toLowerCase()]['refer'].includes(query.replace(pattern, "").toLowerCase())
  ) {
    if (res['tier1'].indexOf(convertRomanToHangyr(query.replace(pattern, "").toLowerCase())) === -1 && res['tier2'].indexOf(convertRomanToHangyr(query.replace(pattern, "").toLowerCase())) === -1) {
      res['tier2'].push(convertRomanToHangyr(query.replace(pattern, "").toLowerCase()))
    }
  }
  if (
    dict.hasOwnProperty(query.replace(pattern, ""))
    && dict[query.replace(pattern, "")]['refer'].includes(query.replace(pattern, ""))
  ) {
    if (res['tier1'].indexOf(convertRomanToHangyr(query.replace(pattern, ""))) === -1 && res['tier2'].indexOf(convertRomanToHangyr(query.replace(pattern, ""))) === -1) {
      res['tier2'].push(convertRomanToHangyr(query.replace(pattern, "")))
    }
  }

  // T3
  // case3
  // loop through dict['elem']['refer']
  // pick whose refer does not contain elem itself, but only the query string
  if (
    dict.hasOwnProperty(query)
    && !dict[query]['refer'].includes(query)
  ) {
    dict[query]['refer'].map(refer => {
      if (res['tier1'].indexOf(convertRomanToHangyr(refer)) === -1 && res['tier2'].indexOf(convertRomanToHangyr(refer)) === -1 && res['tier3'].indexOf(convertRomanToHangyr(refer)) === -1) {
        res['tier3'].push(convertRomanToHangyr(refer))
      }
    })
  }

  // case4
  // loop through candidates
  // pick candiate === dict[candidate]
  candidates.map(candidate => {
    if (
      dict.hasOwnProperty(candidate)
      && dict[candidate]['refer'].includes(candidate)
    ) {
      if (res['tier1'].indexOf(convertRomanToHangyr(candidate)) === -1 && res['tier2'].indexOf(convertRomanToHangyr(candidate)) === -1 && res['tier3'].indexOf(convertRomanToHangyr(candidate)) === -1) {
        res['tier3'].push(convertRomanToHangyr(candidate))
      }
    }
  })


  // case5 
  // del(d) === proc(q) 
  if (dict.hasOwnProperty(query.replace(pattern, "")) && !dict[query.replace(pattern, "")]['refer'].includes(query.replace(pattern, ""))) {
    dict[query.replace(pattern, "")]['refer'].map(refer => {
      if (res['tier1'].indexOf(convertRomanToHangyr(refer)) === -1 && res['tier2'].indexOf(convertRomanToHangyr(refer)) === -1 && res['tier3'].indexOf(convertRomanToHangyr(refer)) === -1) {
        res['tier3'].push(convertRomanToHangyr(refer))
      }
    })
  }
  // case6 
  // d === proc(del(q)) 
  candidates.map(candidate => {
    if (dict.hasOwnProperty(candidate.replace(pattern, "")) && dict[candidate.replace(pattern, "")]['refer'].includes(candidate.replace(pattern, ""))) {
      if (res['tier1'].indexOf(convertRomanToHangyr(candidate.replace(pattern, ""))) === -1 && res['tier2'].indexOf(convertRomanToHangyr(candidate.replace(pattern, ""))) === -1 && res['tier3'].indexOf(convertRomanToHangyr(candidate.replace(pattern, ""))) === -1) {
        res['tier3'].push(convertRomanToHangyr(candidate.replace(pattern, "")))
      }
    }
  })

  // T4
  // case7
  // loop through dict['elem']['refer'] and candidates
  // match all the possible cases
  candidates.map(candidate => {
    if (
      dict.hasOwnProperty(candidate)
      && !dict[candidate]['refer'].includes(candidate)
    ) {
      dict[candidate]['refer'].map(refer => {
        if (res['tier1'].indexOf(convertRomanToHangyr(refer)) === -1 && res['tier2'].indexOf(convertRomanToHangyr(refer)) === -1 && res['tier3'].indexOf(convertRomanToHangyr(refer)) === -1 && res['tier4'].indexOf(convertRomanToHangyr(refer)) === -1) {
          res['tier4'].push(convertRomanToHangyr(refer))
        }
      })
    }
  })

  // case8 
  // del(d) === proc(del(q)) 
  candidates.map(candidate => {
    if (dict.hasOwnProperty(candidate.replace(pattern, "")) && !dict[candidate.replace(pattern, "")]['refer'].includes(candidate.replace(pattern, ""))) {
      dict[candidate.replace(pattern, "")]['refer'].map(refer => {
        if (res['tier1'].indexOf(convertRomanToHangyr(refer)) === -1 && res['tier2'].indexOf(convertRomanToHangyr(refer)) === -1 && res['tier3'].indexOf(convertRomanToHangyr(refer)) === -1 && res['tier4'].indexOf(convertRomanToHangyr(refer)) === -1) {
          res['tier4'].push(convertRomanToHangyr(refer))
        }
      })
    }
  })




  return res
}

const removeOverlap = (arr) => {
  let i
  for (i =0; i < arr['tier4'].length; i++) {
    if (arr['tier1'].indexOf(arr['tier4'][i]) !==-1 || arr['tier2'].indexOf(arr['tier4'][i]) !== -1 || arr['tier3'].indexOf(arr['tier4'][i]) !== -1) {
      arr['tier4'].splice(i, 1)
    }
  }
  for (i =0; i < arr['tier3'].length; i++) {
    if (arr['tier1'].indexOf(arr['tier3'][i]) !==-1 || arr['tier2'].indexOf(arr['tier3'][i]) !== -1) {
      arr['tier3'].splice(i, 1)
    }
  }
  for (i =0; i < arr['tier2'].length; i++) {
    if (arr['tier1'].indexOf(arr['tier2'][i]) !==-1) {
      arr['tier2'].splice(i, 1)
    }
  }

  return arr
}

export default search
