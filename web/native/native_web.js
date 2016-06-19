var ffi = require('ffi');

var myLib = ffi.Library('./myLib', {
    'factorial': ['uint64', ['int']],
    'getString': ['String',['String']]
});

if (process.argv.length < 3) {
    console.log('default value: 5');
}

var output = myLib.factorial(parseInt(process.argv[2]) || 5);
console.log('Your output: ' + output);

console.log(myLib.getString("pham khac"));

//module.exports = myLib;

var express = require('express');
var app = express();
app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(3000, function(){
    console.log('Native app run on 3000');
});
