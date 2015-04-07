"use strict";

module.exports = {
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
