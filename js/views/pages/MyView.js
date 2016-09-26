define(function (require) {

    var Backbone = require("backbone");
    var Products = require("collections/Products");
    var Categories = require("collections/Categories");
    var Utils = require("utils");

    var MyView = Utils.Page.extend({
        constructorName: "MyView",
        collection: Products,
        model: Categories,
        initialize: function (productLimit, catInit, catLimit) {
            
            this.template = Utils.templates.myview;
            $('#back-button').css('display','none');
            $('#toggle-button').css('display','block');
            
            // create a model with an arbitrary attribute for testing the template engine
            this.collection = new Products();
            this.collection.setLimit(productLimit);
            this.collection.fetch();
            this.model = new Categories();
            this.model.addLimit(catInit,catLimit);
            this.model.fetch();
            this.collection.on('sync', this.render, this);
            this.model.on('sync', this.render, this);
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
