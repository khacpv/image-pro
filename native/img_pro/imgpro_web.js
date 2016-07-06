var ffi = require('ffi');

var myLib = ffi.Library('../../bin/libfacelib_today.so', {
    'process': ['String',['String']]
});

if (process.argv.length < 3) {
    console.log('default value: 5');
}

console.log(myLib.process("../../public/images/ggplay.png"));

module.exports = myLib;

var express = require('express');
var app = express();
app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(3000, function(){
    console.log('Native app run on 3000');
});
