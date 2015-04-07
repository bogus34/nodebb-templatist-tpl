/* global jQuery */
var initLoader = require('./lib/loaders/clientside');

$(window).one('action:init-templatist', function(e, options) {
    initLoader(options.templatist, options);
});
