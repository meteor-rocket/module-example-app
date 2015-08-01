import lowercase from 'lower-case'
import uppercase from 'upper-case'

console.log(' --- ', lowercase('LOWERCASE, FROM A LOCAL PACKAGE, CLIENT AND SERVER.'))
console.log(' --- ', uppercase('uppercase, from a local package, client and server.'))

// Package exports don't work for now. This will be fixed in v1.0.0.
//Lib = {
    //aloha: function() {
        //return 'Aloha.'
    //}
//}
