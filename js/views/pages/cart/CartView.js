define(function (require) {

    var Backbone = require("backbone");
    //  var MyModel = require("models/MyModel");
    var Utils = require("utils");
    var Cart = require("collections/Cart");
    var Products = require("collections/Products");

    var CartView = Utils.Page.extend({
        constructorName: "CartView",
        collection: Products,
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.cart;
            window.cart.on('itemSubtraction', this.render, this);
            window.cart.on('itemAddiction', this.render, this);




            $('#back-button').css('display', 'block');
            //$('#toggle-button').css('display','none');
            //this.collection.on('sync', this.render, this);
            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);

            // by convention, all the inner views of a view must be stored in this.subViews
        },
        id: "productcategory",
        className: "i-g page cart-result",
        events: {
            "tap #goToMap": "goToMap",
            "tap #goToCategory": "category",
            "tap #resetButton": "svuotaCarrello",
            "change #luoghiConsegna": "cambiaSpedizione",
            "tap #checkout": "gotocheckout"},
        redirectQui: function () {
            Backbone.history.navigate("carrello", {
                trigger: true
            });
        },
        render: function () {
//            
//            if (typeof window.cart.spedizione != 'undefined') {
////                
//                console.log(window.cart.spedizione);
//                query = '#spanid select option[value=' + window.cart.spedizione + ']';
//                console.log(query);
//               
////
//            }
            var costoTotale = window.cart.totale() + 2;
            $(this.el).html(this.template({articoli: window.cart.models,
                totale: window.cart.totale(),
                totaleColli: window.cart.totaleColli(),
                CostoTotale: costoTotale,
                spedizione: window.customer.spedizionelocale
            }));
            //      this.model.toJSON()
            return this;
        },
        svuotaCarrello: function () {
            window.cart.resettami();
            this.render();
        },
        goToMap: function (e) {
            Backbone.history.navigate("map", {
                trigger: true
            });
        },
        category: function (ev) {
            //        console.log("category qui");
            Backbone.history.navigate("gotocategory/" + $(ev.currentTarget).data('id'), {
                trigger: true
            });
        },
        cambiaSpedizione: function (ev) {
            window.customer.spedizionelocale = ev.target.value;
            window.customer.logged = true;
            window.localStorage.setItem('customer', JSON.stringify(window.customer));
        },
        gotocheckout: function () {
           console.log(window.cart.length);
            if (window.cart.length>0 && window.customer.logged){
                
                Backbone.history.navigate("gotocheckout", {
                    trigger: true
                });

            }else if(!window.customer.logged){
                
               Backbone.history.navigate("splashscreen", {
                    trigger: true
                }); 
                
            };

        }


    });

    return CartView;

});
