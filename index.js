"use strict";

module.exports = function(Templatist, viewsDir) {
    require('./lib/compiler')(Templatist);
    require('./lib/loaders/serverside')(Templatist, viewsDir);
};
