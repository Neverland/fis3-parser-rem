/**
 * @file px2rem
 * @author ienix(ienix@foxmail.com)
 *
 * @since 16/5/26
 */

"use strict";

module.exports = function (str, conf) {
    return str.replace(/\b([\d\.]+)px\b/g, function(s, px) {
        px = +px;
        if (px >= conf.min) {
            return (px / conf.rem + 0.0001).toFixed(4) + 'rem';
        }
        return s;
    });
};
