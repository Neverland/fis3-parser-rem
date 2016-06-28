/**
 * @file font filter
 * @author ienix(ienix@foxmail.com)
 *
 * @since 16/5/26
 */

"use strict";

var maps = {};

exports.collection = function (item, val) {
    if (!maps) {
      maps = {};
    }

    if (!maps[item.selectors]) {
        maps[item.selectors] = val;
    }
};

exports.clear = function () {
    maps = null;
};

exports.maps = function() {
    return maps;
};
