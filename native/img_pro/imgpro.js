var ffi = require('ffi');

var imgPro;
imgPro = ffi.Library('./native/img_pro/libfacedet', {
    'process': ['String',['String']]
});

console.log(imgPro.process("./public/images/ggplay.png"));

module.exports = imgPro || {};