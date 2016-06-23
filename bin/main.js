/**
 * @file rem entry
 * @author ienix(ienix@foxmail.com)
 *
 * @since 16/5/25
 */

"use strict";

var css = require('css');

var fontFilter = require('./lib/font/fontFilter.js');
var font = require('./lib/font/font.js');

var px2rem = require('./lib/px2rem.js');

module.exports = function (content, file, conf) {
    var styleSheet = css.parse(content);
    var rules = styleSheet.stylesheet.rules;

    function entry() {
        // css文件第一行必须为 /*userem*/
        if (!/(\/\*!@userem\*\/)/i.test(content)
            || !rules.length) {
            // ignore file;
            return false;
        }
        return true;
    }

    if (!entry()) {
        return content;
    }

    var prefix = ['-webkit-', '-ms-', '-moz-', '-o-'];
    var styleExpr = new RegExp(
        '(' + prefix.join('|') + ')',
        'gi'
    );

    function prepare() {
        rules.forEach(function (item, index) {
            // ignore
            if (item.type !== 'rule') {
                return false;
            }

            var declarations = item.declarations;
            var exclude = conf.exclude;

            declarations.forEach(function (val, idx) {
                var value = val.value;
                var property = val.property && val.property.replace(styleExpr, '');
                var next = declarations[idx + 1] || '';

                if (/@norem\b/g.test(next.comment)
                    || !/px/g.test(value)
                    || exclude.indexOf(property) === 0) {

                    return false;
                }

                if (property.toLowerCase() === 'font-size') {
                    fontFilter.collection(item, value);
                }
                else {
                    try {
                        rules[index].declarations[idx].value = px2rem(value, conf);
                    }
                    catch (e) {
                        console.log('Error: ' + e.message);
                    }
                }
            });
        });

        return rules;
    }

    function post() {
        var styleResult = prepare() || [];
        var fontResult = font(fontFilter.map, conf);
        var result = {
            type: 'stylesheet',
            stylesheet: {
                rules: styleResult
            }
        };

        return css.stringify(result)
            + (fontResult ? fontResult : '');
    }

    return post();
};
