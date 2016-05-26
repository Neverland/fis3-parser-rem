/**
 * @file font filter
 * @author ienix(ienix@foxmail.com)
 *
 * @since 16/5/26
 */

"use strict";

var map = {};

exports.collection = function (item, val) {

    if (!map[item.selectors]) {
        map[item.selectors] = val;
    }
};

exports.map = map;