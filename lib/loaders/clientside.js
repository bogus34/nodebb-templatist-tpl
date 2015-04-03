"use strict";

/* global jQuery, templates */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('nodebb-templatist-tpl/loaders/clientside', factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.TemplatistTplLoader = factory(root.b);
    }
}(this, function() {
    return function(Templatist, options) {
        var createRenderFn = function(template) {
            return function(name, block, data, fn) {
                templates.parse(template, block, data, function(template){ fn(null, template); });
            };
        };

        var loader = function(name, callback) {
            jQuery.ajax({
                url: options.relative_path + '/templates/' + name + '.tpl' + (options.cache_buster ? '?v=' + options.cache_buster : ''),
                type: 'GET',
                success: function(data) {
                    callback(null, createRenderFn(data.toString()));
                },
                error: function(error) {
                    callback(new Error("Unable to load template: " + template + " (" + error.statusText + ")"));
                }
            });
        };

        loader.registerHelper = function(name, helper) {
            templates.registerHelper(name, helper);
        };

        loader.setGlobal = function(name, value) {
            templates.setGlobal(name, value);
        };

        Templatist.registerLoader('tpl', loader);
    };
}));
