var templates = require('templates.js'),
    fs = require('fs'),
    async = require('async'),
    path = require('path'),
    common = require('./common');

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

                callback(null, common.mkRender(template, templates));
            });
        });
    };

    common.addCommonMethods(loader, templates);

    Templatist.registerLoader('tpl', loader);
};
