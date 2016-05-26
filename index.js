var name = require('./package.json').name
require('productionize')(name)

var server = require('./server')
var port = process.env.PORT || 3000
server().listen(port)
console.log(name, 'listening on port', port)
