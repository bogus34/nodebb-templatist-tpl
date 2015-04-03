var templates = require('templates.js'),
    fs = require('fs'),
    async = require('async'),
    path = require('path');

module.exports = function(Templatist, viewsDir) {
    var loader = function(name, callback) {
        var filename = path.join(viewsDir, name) + '.tpl';

        fs.exists(filename, function(exists) {
            if (!exists) {
                callback(new Error('Template not found: ' + name + '.tpl'));
                return;
            }

            fs.readFile(filename, {encoding: 'utf8'}, function(err, template) {
                if (err) {
                    callback(err);
                    return;
                }

                var render = function(name, block, data, fn) {
                    var result = templates.parse(template.toString(), data);
                    fn(null, result);
                };

                callback(null, render);
            });
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
