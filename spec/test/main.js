/**
 * @file test/main.js
 * @author ienix(ienix@foxmail.com)
 *
 * @since 16/5/26
 */

"use strict";

var fs = require('fs');
var rem = require(process.cwd() + '/index.js');

var defaultOptions = {
    rem: 18,
    min: 3,
    exclude: [
        'width',
        'height',
        'background',
        'background-size'
    ]
};

fs.readFile('./spec/test/demo.css', 'utf8', function (err, content) {
    var result = rem(content, ' ', defaultOptions);

    fs.writeFile('./spec/test/result.css', result , function (err, content) {
        console.log('done');
    });
});
