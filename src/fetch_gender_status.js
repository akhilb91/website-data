const drive = require('drive-db')
const fs = require('fs')
const _ = require('lodash')
const CONSTANTS = require('./constants');

const SHEET = CONSTANTS.SUMMARY_SHEET;
const SHEET_GENDER_TAB = CONSTANTS.SHEET_GENDER_TAB;


// Helper method to do parseInt safely (reverts to 0 if unparse)
const safeParseInt = v => {
  let result = parseInt(v)
  if (isNaN(result)) {
    return 0
  }
  return result
}

async function fetchGenderStatus() {
  return drive({sheet: SHEET, tab: SHEET_GENDER_TAB})
    .then(db => {
      if (db && db.length > 0) {
      	genderStatus = {}
      	genderStatus.female = safeParseInt(db[0].female)
      	genderStatus.male = safeParseInt(db[0].male)
      	genderStatus.unspecified = safeParseInt(db[0].unspecified)
      	genderStatus.total = safeParseInt(db[0].total)
        return genderStatus
      }
      return ''
    })
}

exports.fetchGenderStatus = fetchGenderStatus;
