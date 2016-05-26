/**
 * @file fis3-parse-rem
 * @author ienix(ienix@foxmail.com)
 *
 * @since 16/5/26
 */

"use strict";

var rem = require('./bin/main.js');

var entry = module.exports = function (content, file, conf) {

    return rem.apply(null, arguments);
};

entry.defaultOptions = {
    rem: 18,
    min: 3,
    type: 'default',
    exclude: [
        'width', 'height',
        'background', 'background-size'
    ]
};
