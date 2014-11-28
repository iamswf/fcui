/**
 * FCUI (Fengchao UI)
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @file DOM 辅助方法
 * @author Han Bing Feng (hanbingfeng@baidu.com)
 * @param {Function} require require
 * @return {Object} DOM辅助方法
 */
define(function (require) {
    var exports = {};

    /**
     * 从el起始，根据query查找元素。返回第一个match的。
     * 这个方法会直接依赖浏览器的querySelector方法。
     * 浏览器支持：IE8，FF3.5，Chrome1
     * @param {HTMLElement} el 查找的根元素
     * @param {string} query 符合CSS 2.1的查询串
     * @return {HTMLElement} 第一个match的元素
     */
    exports.find = function (el, query) {
        return el.querySelector(query);
    };

    /**
     * 从el起始，根据query查找元素。返回所有match的。
     * 这个方法会直接依赖浏览器的querySelectorAll方法。
     * 浏览器支持：IE8，FF3.5，Chrome1
     * @param {HTMLElement} el 查找的根元素
     * @param {string} query 符合CSS 2.1的查询串
     * @return {NodeList} 第一个match的元素
     */
    exports.findAll = function (el, query) {
        return el.querySelectorAll(query);
    };

    /**
     * 判断el是否match给定的query。
     * 这个方法会直接依赖浏览器的*matchSelector方法。
     * 浏览器支持：IE9，FF3.6，IE9
     * @param  {HTMLElement} el 查找的根元素
     * @param {string} query 符合CSS 2.1的查询串
     * @return {boolean} 是否match
     */
    exports.match = function (el, query) {
        var matches = // 兼容各个浏览器。额。。
            // w3c标准
            el.matches
            // Chrome, Opera 15+, Safari
            || el.webkitMatchesSelector
            // Mozilla
            || el.mozMatchesSelector
            // IE9+
            || el.msMatchesSelector
            // Opera
            || el.oMatchesSelector;

        return matches.call(el, query);
    };

    /**
     * 从el开始查找直到找到符合query的父元素。或直到endEl，或直到body为止。
     * 若query没提供，则直接返回endEl，或body。
     * 若没有找到匹配的，则返回null。
     * @param {HTMLElement} el 起始el
     * @param {string} query 符合CSS 2.1的查询串
     * @param {HTMLElement} endEl 查询截止的element
     * @return {HTMLElement} 符合query的父元素
     */
    exports.parent = function (el, query, endEl) {
        endEl = endEl || document.body;
        if (typeof query === 'undefined'
            || (query.length && query.length === 0)) {
            // 没给query，直接退出
            return endEl;
        }
        var cur = el;
        while (cur && cur !== endEl) {
            if (cur.nodeType === 1) {
                if (exports.match(cur, query)) {
                    return cur;
                }
            }
            cur = cur.parentNode;
        }
        return null;
    };

    /**
     * 拿取元素包括margin的高度
     * @param {HTMLElement} elm 元素
     * @return {number} 高度值
     */
    exports.getOuterHeight = function (elm) {
        var elmHeight;
        var elmMargin;

        if (document.all) {
            // IE
            elmHeight = parseInt(elm.currentStyle.height, 10);
            elmMargin = parseInt(elm.currentStyle.marginTop, 10)
                + parseInt(elm.currentStyle.marginBottom, 10);
        }
        else {
            // Mozilla
            var cs = document.defaultView.getComputedStyle(elm, '');
            elmHeight = parseInt(cs.getPropertyValue('height'), 10);
            elmMargin = parseInt(cs.getPropertyValue('margin-top'), 10)
                + parseInt(cs.getPropertyValue('margin-bottom'), 10);
        }
        return (elmHeight + elmMargin);
    };

    /**
     * 量取元素的宽度
     * @param  {HTMLElement} el 被量的元素
     * @return {number} 长度值
     */
    exports.measureWidth = function (el) {
        var rulerDiv = document.createElement('div');
        el.appendChild(rulerDiv);
        var width = rulerDiv.offsetWidth;
        rulerDiv.parentNode.removeChild(rulerDiv);

        return width;
    };

    return exports;
});
