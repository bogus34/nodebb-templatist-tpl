var fs = require('fs'),
    path = require('path'),
    importRegex = /[ \t]*<!-- IMPORT ([\s\S]*?)? -->[ \t]*/;

function compiler(paths, relativePath,  callback) {
    var filePath = paths[relativePath];
    fs.readFile(filePath, function(err, file) {
        if (err) {
            callback(err);
            return;
        }

        var matches = null,
            warnings = [];
        file = file.toString();

        while((matches = file.match(importRegex)) !== null) {
            var partial = "/" + matches[1];

            if (paths[partial] && relativePath !== partial) {
                file = file.replace(importRegex, fs.readFileSync(paths[partial]).toString());
            } else {
                warnings.push('Partial not loaded: ' + matches[1]);
                file = file.replace(importRegex, "");
            }
        }

        var files = {};
        files[relativePath] = file;
        callback(null, {files: files, warnings: warnings});
    });
};

module.exports = function(Templatist) {
    Templatist.registerCompiler('tpl', compiler);
};
