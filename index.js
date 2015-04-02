"use strict";

module.exports = function(Templatist, viewsDir) {
    require('./compiler')(Templatist);
    require('./loaders/serverside')(Templatist, viewsDir);
};
