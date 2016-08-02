/**
 * @file fis3-parse-rem
 * @author ienix(ienix@foxmail.com)
 *
 * @since 16/5/26
 */

"use strict";

var rem = require('rem-core');

module.exports = function (content, file, conf) {

    return rem.apply(null, arguments);
};
