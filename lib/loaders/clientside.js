"use strict";

/* global jQuery, templates */
var common = require('./common');

module.exports = function(Templatist, options) {
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
