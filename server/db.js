var levelup = require('levelup')
var DynamoDown = require('dynamodown')

var config = require('../config')

var db, dbEngine

if (process.env.NODE_ENV === 'test') {
  db = levelup('mem', {
    db: require('memdown'),
    valueEncoding: 'json'
  })
} else {
  db = levelup(config.dynamo.table, {
    db: DynamoDown,
    valueEncoding: 'json',
    dynamo: config.dynamo
  })
}

module.exports = db
