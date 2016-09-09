define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    //MODEL
    var MyModel = require("models/MyModel");

    //VIEW
    var StructureView = require("views/StructureView");
    var MyView = require("views/pages/MyView");

    var MapView = require("views/pages/MapView");
    var Framework7 = require('framework7');
    var myApp = new Framework7({swipePanel: 'left'});
    var Handlebars = require('handlebars');
    //Product
    var Product = require("models/Product");
    var Products = require("collections/Products");
    var ProductListView = require("views/pages/products/ProductListView");
    var ProductDetailView = require("views/pages/products/ProductDetailView");
    //Category
    var Category = require("models/Category");
    var Categories = require("collections/Categories");
    var CategoryListView = require("views/pages/products/CategoryListView");

    //Farm
    var FarmListView = require('views/pages/farm/FarmListView');
    var FarmDetailView = require('views/pages/farm/FarmDetailView');
    var Farms = require('collections/Farms');
    var Farm = require('models/Farm');

    //Search
    var Searchs = require('collections/Searchs');
    // var Search = require('models/Search');
    var SearchListView = require('views/pages/search/SearchListView');
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
            "gotocategorylist": "goToCategoryList",
            "gotocategory/:key" : "goToCategory",
            "gotofarmlist" : "goToFarmList",
            "gotofarmdetail/:key": "goToFarmDetail",
            "gotosearchresult/:query":"goToSearchResult"
        },
        firstView: "myview",
        initialize: function (options) {
            this.currentView = undefined;
            Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
                switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    case '&&':
                        return (v1 && v2) ? options.fn(this) : options.inverse(this);
                    case '||':
                        return (v1 || v2) ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
                }
            });
            /**
             * The {{#exists}} helper checks if a variable is defined.
             */
            Handlebars.registerHelper('exists', function(variable, options) {
                if (typeof variable !== 'undefined') {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
        },
        myView: function () {
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav1");
            // create a model with an arbitrary attribute for testing the template engine
            var model = new Products();
            model.setLimit(4);
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
                    myApp: myApp
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
            model.setLimit(4);
            model.fetch();
            // create the view
            var page = new ProductListView({
                collection: model
            });
            this.changePage(page);
        },
        goToProductDetail: function (key) {
            var model = new Product({id: key});
            model.fetch();
            var page = new ProductDetailView({
                model: model
            });
            // show the view
            this.changePage(page);
        },
        goToCategoryList: function (event) {
            var model = new Categories();
            model.fetch();
            var page = new CategoryListView({
                collection: model
            });
            // show the view
            this.changePage(page);
        },
        goToFarmList: function (event) {
//            console.log("goToFarmList");
            var collection = new Farms();
            collection.fetch();
            console.log(collection);
            var page = new FarmListView({
                collection : collection
            });
            // show the view
            this.changePage(page);
        },
        goToFarmDetail: function (key) {
            var model = new Farm({id: key});
            model.fetch();
            var collection = new Products();
            collection.setFarm(key);
            collection.fetch();
            var page = new FarmDetailView({
                model : model,
                collection : collection
            });
            // show the view
            this.changePage(page);
        },
        goToCategory: function (key) {
            //Da fixare qui devo querare solo i prodotti di una certa categoria e farli vedere in lista
            var model = new Products();
            model.setLimit(5);
            model.setCategory(key);
            model.fetch();
             var page = new ProductListView({
                collection: model
            });
            // show the view
            this.changePage(page);
        },
        goToSearchResult: function(query){
          var model = new Categories();
          model.fetch();
          var collection = new Searchs();
          console.log("Query" + query);
          collection.setQuery(query);
          collection.fetch();
          console.log(collection);
          var page = new SearchListView({
            collection: collection,
            category: model
          });
          this.changePage(page);

        }

    });

    return AppRouter;

});
