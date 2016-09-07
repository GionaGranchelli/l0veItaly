define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    //MODEL
    
        var MyModel = require("models/MyModel");
        //PRODUCT
        var Product = require("models/Product");
        var Products = require("collections/Products");
        //CATEGORY
        var Category = require("models/Category");
        var Categories = require("collections/Categories");
    
    //VIEW
    
    var StructureView = require("views/StructureView");
    var MyView = require("views/pages/MyView");
    var MapView = require("views/pages/MapView");
    var Framework7 = require('framework7');
    var myApp = new Framework7({swipePanel: 'left'});
    var ProductListView = require("views/pages/products/ProductListView");
    var ProductDetailView = require("views/pages/products/ProductDetailView");
    var CategoryListView = require("views/pages/products/CategoryListView");
    var FarmListView = require('views/pages/farm/FarmListView');
    var FarmDetailView = require('views/pages/farm/FarmDetailView');


    //Backbone.emulateHTTP = true; // Use _method parameter rather than using DELETE and PUT methods
    //Backbone.emulateJSON = true; // Send data to server via parameter rather than via request content
    var AppRouter = Backbone.Router.extend({
        constructorName: "AppRouter",
        routes: {
            // the default is the structure view
            "": "showStructure",
            "myview": "myView",
            "map": "map",
            "gotoproductlist": "goToProductList",
            "gotoproductdetail/:key": "goToProductDetail",
            "gotocategorylist": "goToCategoryList"
        },
        firstView: "myview",
        initialize: function (options) {
            this.currentView = undefined;
        },
        myView: function () {
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav1");
            // create a model with an arbitrary attribute for testing the template engine
            var model = new Products(4);
            model.fetch();
            // create the view
            var page = new MyView({
                collection: model
            });
            
            // show the view
            this.changePage(page);
        },
        map: function () {
            // highlight the nav2 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav2");
            // create the view and show it
            var page = new MapView();
            this.changePage(page);
        },
        // load the structure view
        showStructure: function () {
            if (!this.structureView) {
                this.structureView = new StructureView({
                    myApp : myApp
                });
                // put the el element of the structure view into the DOM
                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }
            // go to first view
            this.navigate(this.firstView, {trigger: true});
        },
        goToProductList: function (e) {

            var model = new Products();
            model.fetch();
            // create the view
            var page = new ProductListView({
                collection: model
            });
            this.changePage(page);
        },
        goToProductDetail: function (key) {
            var model = new Product({id : key});
            model.fetch();
            var page = new ProductDetailView({
                model:model
            });
            // show the view
            this.changePage(page);
        },
        goToCategoryList : function (event) {
            var model = new Categories();
            model.fetch();
            var page = new CategoryListView({
                collection:model
            });
            // show the view
            this.changePage(page);
        },
        goToFarmList : function (event) {

            var page = new FarmListView({
            });
            // show the view
            this.changePage(page);
        },
        goToFarmDetail : function (event) {

            var page = new FarmDetailView({
            });
            // show the view
            this.changePage(page);
        }

    });

    return AppRouter;

});
