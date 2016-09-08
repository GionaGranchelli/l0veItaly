define(function (require) {

    var Backbone = require("backbone");
    var Products = require("collections/Products");
    var Product = require("models/Product");
    var Utils = require("utils");
//    var Framework7 = require('framework7');
//    var swiper = require('swiper');
//    var myapp = require('myapp');

//  var ProductListView = require("views/pages/products/ProductListView");

    var MyView = Utils.Page.extend({
        constructorName: "MyView",
        collection: Products,
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.myview;
            this.collection.on('sync', this.render, this);
            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);
        },
        id: "myview",
        className: "i-g page",
        events: {
            "tap #goToMap": "goToMap"
        },
        render: function () {

            $(this.el).html(this.template({Prodotti: this.collection.toJSON()}));
            return this;
        },
        goToMap: function (e) {
            Backbone.history.navigate("map", {
                trigger: true
            });
        }
    });

    return MyView;

});
