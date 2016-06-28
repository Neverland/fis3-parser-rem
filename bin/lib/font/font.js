/**
 * @file font.js
 * @author ienix(ienix@foxmail.com)
 *
 * @since 16/5/26
 */

"use strict";

var dpi1 = [];
var dpi2 = [];
var dpi3 = [];
var flexible = [];
var globalDpr;

function clear() {
  dpi1 = [];
  dpi2 = [];
  dpi3 = [];
  flexible = [];
}

module.exports = function (fonts, conf) {
    var selectors = Object.keys(fonts);
    var type = conf.type ==='default';
    var result;

    clear();

    globalDpr = conf.dpr;
    if (!selectors.length) {
        return '';
    }

    selectors.forEach(function (selector) {
        result = type
            ? fontSizeDpr(selector, fonts[selector])
            : flexibleDpr(selector, fonts[selector]);
    });

    return type
        ? fontSizeDprResult()
        : flexibleDprResult()
};

function flexibleDpr(selector, value) {
    var val = getRealValue(value);

    if (!val) {
        return false;
    }

    flexible.push(flexibleCreate(selector, val[0], val[1]));
}

function flexibleCreate(selector, value, suffix) {
    return '\r'
        + selector.split(',').map(function(item) {
            return '[data-dpr="1"] ' + item;
        }).join(', ') +' {\r'
        + '    font-size: ' + value + 'px;' + ' ' + suffix + '\r'
        + '}\r'
        + selector.split(',').map(function(item) {
            return '[data-dpr="2"] ' + item;
        }).join(', ') +' {\r'
        + '    font-size: ' + (value * 2) + 'px;' + ' ' + suffix + '\r'
        + '}\r'
        + selector.split(',').map(function(item) {
            return '[data-dpr="3"] ' + item;
        }).join(', ') +' {\r'
        + '    font-size: ' + (value * 3) + 'px;' + ' ' + suffix + '\r'
        + '}\r'

}

function flexibleDprResult() {
    return flexible.join('');
}

function getRealValue(value) {
    var oldVal = value.split('px');
    var val;


    if (oldVal) {
        val = oldVal[0] / globalDpr;
    }

    return (val && +oldVal[0] > 3)
        ? [val, oldVal[1]]
        : false;
}
function fontSizeDpr(selector, value) {
    var val = getRealValue(value);

    if (!val) {
        return false;
    }

    var rule = fontSizeDprCreate(selector, (' ' + val[1]) || '');

    dpi2.push(rule.replace(/%s/g, val[0]));
    dpi2.push(rule.replace(/%s/g, val[0] * 2));
    dpi3.push(rule.replace(/%s/g, val[0] * 3));
}

/**
 * 创建css规则
 *
 * @param {string} selectors
 * @param {string} suffix 原来的font-size值后面的如 ' !important'
 * @return {string} style text
 */
function fontSizeDprCreate(selectors, suffix) {
    return '\r'
        + '    ' + selectors + ' {\r'
        + '        font-size: %spx'+ suffix + ';\r'
        + '    }\r';
}

function fontSizeDprResult() {
    return ''
        + '\r@media(-webkit-min-device-pixel-ratio: 1) {\r'
        + '    ' + dpi1.join('')
        + '}'
        + '\r@media(-webkit-min-device-pixel-ratio: 2) {\r'
        + '    ' + dpi2.join('')
        + '}'
        + '\r@media(-webkit-min-device-pixel-ratio: 3) {\r'
        + '    ' + dpi3.join('')
        + '}';
}
