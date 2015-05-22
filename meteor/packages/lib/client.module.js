// Write your package code here!
var uppercase = require('upper-case')
var local = require('./local')

console.log(' --- ', uppercase('hello world!'))
console.log(' --- local import: ', local)

// a Meteor export that other packages can use if they depend on this package.
Lib = {
    hello: function() {
        return 'Hello.'
    }
}

