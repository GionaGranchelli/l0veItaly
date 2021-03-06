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
        framework7: '../lib/template/framework7.min',
        validate: '../lib/validate/validate'
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
    require(['preloader', 'router', '../lib/template/jquery.swipebox', 'collections/Cart', 'models/Customer'], function (PreLoader, AppRouter, Swiper, Cart, Customer) {

        //CORDOVA PLUGIN ADDED
//        cordova plugin add cordova-plugin-network-information
//      cordova plugin add cordova-plugin-dialogs
//        cordova plugin add cordova - plugin - inappbrowser
//        document.addEventListener("offline", onOffline, false);

        document.addEventListener("deviceready", run, false);
//
//        function onOffline(){
//            if (checkConnection() === 'No network connection') {
//                navigator.notification.alert(
//                    'Per Utilizzare LoveItaly devi essere Connesso', // messagio no rete
//                    alertDismissed, // Callback che non usiamo al momento
//                    'Attiva una Rete', // Titolo Messaggio errore
//                    'Ok'                  // Nome del Bottone
//                                       );
//            }
//        }
//        function checkConnection() {
//            var networkState = navigator.connection.type;
//            var states = {};
//            states[Connection.UNKNOWN] = 'Unknown connection';
//            states[Connection.ETHERNET] = 'Ethernet connection';
//            states[Connection.WIFI] = 'WiFi connection';
//            states[Connection.CELL_2G] = 'Cell 2G connection';
//            states[Connection.CELL_3G] = 'Cell 3G connection';
//            states[Connection.CELL_4G] = 'Cell 4G connection';
//            states[Connection.CELL] = 'Cell generic connection';
//            states[Connection.NONE] = 'No network connection';
//            return states[networkState];
//        }
//        function alertDismissed(){
//            
//        }
        function run() {
//              if (checkConnection() === 'No network connection') {
//                navigator.notification.alert(
//                    'Per Utilizzare LoveItaly devi essere Connesso', // messagio no rete
//                    alertDismissed, // Callback che non usiamo al momento
//                    'Attiva una Rete', // Titolo Messaggio errore
//                    'Ok'                  // Nome del Bottone
//                                       );
//            }
            window.cart = new Cart();

            var customer = JSON.parse(window.localStorage.getItem('customer'));
//            console.log(customer);
            if (customer !== null) {
                if (customer.logged !== false && customer.logged !== undefined) {
//                    console.log('ci sta');
                    window.customer = customer;
                } else {
//                    console.log('non ci sta');
                    window.customer = new Customer();
                    window.customer.logged = false;
                    window.localStorage.setItem('customer', JSON.stringify(window.customer));
                }
            } else {
//                console.log('non ci sta');
                window.customer = new Customer();
                window.customer.logged = false;
                window.localStorage.setItem('customer', JSON.stringify(window.customer));
            }


            // Here we precompile ALL the templates so that the app will be quickier when switching views
            // see utils.js
            Utils.loadTemplates().once("templatesLoaded", function () {

                var preloadedImages = ['img/farms/1.jpg',
                    'img/farms/tempodi.jpg',
                    'img/farms/2.jpg',
                    'img/farms/3.jpg',
                    'img/farms/4.jpg',
                    'img/farms/5.jpg',
                    'img/farms/home1.jpg',
                    'img/farms/home2.jpg',
                    'img/farms/home3.jpg'
                ]; // here the developer can add the paths to the images that he would like to be preloaded

                if (preloadedImages.length) {
                    new PreLoader(preloadedImages, {
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
                        'padding': 250,
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
