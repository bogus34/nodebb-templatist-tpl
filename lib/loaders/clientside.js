"use strict";

/* global jQuery, templates */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('nodebb-templatist-tpl/loaders/clientside', ['nodebb-templatist-tpl/loaders/common'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('./common'));
    } else {
        // Browser globals (root is window)
        root.TemplatistTplLoader = factory(root.TemplatistTplLoaderCommon);
    }
}(this, function(common) {
    return function(Templatist, options) {
        var loader = function(name, callback) {
            jQuery.ajax({
                url: options.relative_path + '/templates/' + name + '.tpl' + (options.cache_buster ? '?v=' + options.cache_buster : ''),
                type: 'GET',
                success: function(data) {
                    callback(null, common.mkRender(data, templates));
                },
                error: function(error) {
                    callback(new Error("Unable to load template: " + template + " (" + error.statusText + ")"));
                }
            });
        };

        common.addCommonMethods(loader, templates);

        Templatist.registerLoader('tpl', loader);
    };
}));
