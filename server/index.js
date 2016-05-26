var fs = require('fs')
var http = require('http')
var ReqLogger = require('req-logger')
var Authentic = require('authentic-server')

var db = require('./db')
var sendEmail = require('./send-email')
var healthRoute = require('health-route')

var logger = ReqLogger({
  version: require('../package.json').version
})

var auth = Authentic({
  db: db,
  publicKey: fs.readFileSync(__dirname + '/../config/rsa-public.pem'),
  privateKey: fs.readFileSync(__dirname + '/../config/rsa-private.pem'),
  sendEmail: sendEmail
})

module.exports = function createServer () {
  return http.createServer(function (req, res) {
    if (req.url === '/health') return healthRoute(req, res)
    logger(req, res)
    auth(req, res)
  })
}
