var ffi = require('ffi');

var myLib = ffi.Library('./bin/myLib', {
    'factorial': ['uint64', ['int']],
    'getString': ['String',['String']]
});

if (process.argv.length < 3) {
    console.log('default value: 5');
}

//var output = myLib.factorial(parseInt(process.argv[2]) || 5);
//
//console.log('Your output: ' + output);
//
console.log(myLib.getString("pham khac"));

module.exports = myLib;