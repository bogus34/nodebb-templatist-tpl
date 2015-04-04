"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('nodebb-templatist-tpl/loaders/common', factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.TemplatistTplLoaderCommon = factory();
    }
}(this, function() {
    return {
        addCommonMethods: function(loader, templates) {
            loader.registerHelper = function(name, helper) {
                templates.registerHelper(name, helper);
            };

            loader.setGlobal = function(name, value) {
                templates.setGlobal(name, value);
            };
        },

        mkRender: function(template, templates) {
            return function(name, block, data, fn) {
                templates.parse(template, block, data, function(template){ fn(null, template); });
            };
        }
    };
}));
