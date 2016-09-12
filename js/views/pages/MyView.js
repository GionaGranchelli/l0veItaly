define(function (require) {

    var Backbone = require("backbone");
    var Products = require("collections/Products");
    var Categories = require("collections/Categories");
    var Product = require("models/Product");
    var Utils = require("utils");
//    var Framework7 = require('framework7');
//    var swiper = require('swiper');
//    var myapp = require('myapp');

//  var ProductListView = require("views/pages/products/ProductListView");

    var MyView = Utils.Page.extend({
        constructorName: "MyView",
        collection: Products,
        model: Categories,
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.myview;
            $('#back-button').css('display','none');
            $('#toggle-button').css('display','block');
            this.collection.on('sync', this.render, this);
            this.model.on('sync', this.render, this);
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
            "tap #goToMap": "goToMap",
            "tap #goToProduct" : "goToProduct",
            "tap #goToCategory" : "goToCategory",
            "tap #goToFarm" : "goToFarm"
        },
        render: function () {
//            console.log(this.categories.toJSON());
            $(this.el).html(this.template({
                Prodotti: this.collection.toJSON(),
                Categorie : this.model.toJSON()
            }));
            return this;
        },
        goToProduct : function (ev){
            Backbone.history.navigate("gotoproduct/" + $(ev.currentTarget).data('id'), {
                trigger: true
            });
        },
        goToCategory : function (ev){
            Backbone.history.navigate("gotocategory/"+$(ev.currentTarget).data('id'), {
                trigger: true
            });
        },
        goToFarm : function (ev){
            Backbone.history.navigate("gotofarm/"+$(ev.currentTarget).data('id'), {
                trigger: true
            });
        }
    });

    return MyView;

});
