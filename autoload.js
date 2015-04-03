/* global jQuery */
$(window).one('action:init-templatist', function(e, options) {
    require(['nodebb-templatist', 'nodebb-templatist-tpl/loaders/clientside'],
        function(Templatist, initTplLoader) {
            initTplLoader(Templatist, options);
        });
});
