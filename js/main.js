// here we put the paths to all the libraries and framework we will use
require.config({
    paths: {
        jquery: '../lib/zepto/zepto', // ../lib/jquery/jquery',
        underscore: '../lib/underscore/underscore',
        backbone: "../lib/backbone/backbone",
        text: '../lib/require/text',
        async: '../lib/require/async',
        handlebars: '../lib/handlebars/handlebars',
        templates: '../templates',
        leaflet: '../lib/leaflet/leaflet',
        spin: '../lib/spin/spin.min',
        preloader: '../lib/preloader/pre-loader',
        utils: '../lib/utils/utils',
        slideout: './slideout',
        framework7: '../lib/template/framework7.min'
        // swiper: '../lib/template/jquery.swipebox'
//    myapp: '../lib/template/my-app'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'leaflet': {
            exports: 'L'
        },
        'framework7': {
            exports: 'Framework7'
        }
    }
});

// We launch the App
require(['backbone', 'utils', 'slideout'], function (Backbone, Utils, Slideout) {
    require(['preloader', 'router' ,'../lib/template/jquery.swipebox'], function (PreLoader, AppRouter, Swiper) {

        document.addEventListener("deviceready", run, false);

        function run() {

            // Here we precompile ALL the templates so that the app will be quickier when switching views
            // see utils.js
            Utils.loadTemplates().once("templatesLoaded", function () {

                var images = []; // here the developer can add the paths to the images that he would like to be preloaded

                if (images.length) {
                    new PreLoader(images, {
                        onComplete: startRouter
                    });
                } else {
                    // start the router directly if there are no images to be preloaded
                    startRouter();
                }

                function startRouter() {
                    // launch the router
                    var router = new AppRouter();
                    Backbone.history.start();
                    var slideoutt = new Slideout({
                        'panel': document.getElementById('panel'),
                        'menu': document.getElementById('menu'),
                        'padding':250,
                        'tolerance': 0,
                        'swipeRegion': 25
                    });
                    // Toggle button
                    document.querySelector('#content').addEventListener('click', function () {
                        if (slideoutt.isOpen()) {
                            slideoutt.toggle();
                        }
                    });
                    // Toggle button
                    $('#menu li span').on('click', function () {
                        slideoutt.toggle();
                    });
                    // Toggle button
                    document.querySelector('#toggle-button').addEventListener('click', function () {
                        slideoutt.toggle();
                    });
                }
            });
        }
    });
});
