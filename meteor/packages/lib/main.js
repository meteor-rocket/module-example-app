// Write your package code here!
var uppercase = require('upper-case')
var local = require('./local')

console.log(' --- ', uppercase('hello world!'))
console.log(' --- local import: ', local)

Lib = {
    hello: function() {
        return 'Hello.'
    }
}

