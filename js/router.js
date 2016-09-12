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
    var myApp = new Framework7();
    var Handlebars = require('handlebars');
    // var Swiper = require('swiper');
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
    //Images
    var Images = require('collections/Images');
    var Image = require('models/Image');
    //contacts
    var AboutUs = require('collections/AboutUs');
    var AboutUsView = require('views/pages/common/AboutUsView');
    //Customer
    var Customer = require('models/Customer');
    //Loginview
    var LoginView = require('views/pages/common/Login');
    //CartView
    var CartView = require('views/pages/cart/CartView');
    //Order
    var OrderList = require('views/pages/private/OrdersList');
    var OrderDetail = require('views/pages/private/OrderDetail');
    var Orders = require('collections/Orders');
    var Order = require('models/Order');
    //contacts
    var AboutUs = require('collections/AboutUs');
    var AboutUsView = require('views/pages/common/AboutUsView');
    var Splash = require('views/pages/common/Splash');
    //profile
    var ProfileView = require('views/pages/private/ProfileView');
    //Backbone.emulateHTTP = true; // Use _method parameter rather than using DELETE and PUT methods
    //Backbone.emulateJSON = true; // Send data to server via parameter rather than via request content
    var AppRouter = Backbone.Router.extend({
        constructorName: "AppRouter",
        routes: {
            // the default is the structure view
            "": "showStructure",
            "myview": "myView",
            "splashscreen": "splashScreen",
            "map": "map",
            "gotoproductlist": "goToProductList",
            "gotoproductdetail/:key": "goToProductDetail",
            "gotocategorylist": "goToCategoryList",
            "gotocategory/:key": "goToCategory",
            "gotofarmlist": "goToFarmList",
            "gotofarmdetail/:key": "goToFarmDetail",
            "gotosearchresult/:query": "goToSearchResult",
            "gotosearchresultcategory/:query/:category": "goToSearchResultCategory",
            "gotoaboutus": "goToAboutUs",
            "carrello": "ShowCart",
            "login": "login",
            "gotoorderlist": "goToOrderList",
            "orderdetail": "goToOrderDetail",
            "gotoprofile": "goToProfile"
        },
        firstView: "splashscreen",
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
            Handlebars.registerHelper('exists', function (variable, options) {
                if (typeof variable !== 'undefined') {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
            Handlebars.registerHelper('isEmpty', function (variable, options) {
                if (variable.length === 0) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
            Handlebars.registerHelper('twodigit', function (variable, options) {
                if (typeof variable !== 'undefined') {
                    var temp = variable.toString();
                    if (((temp.length - 1) - temp.indexOf(".")) > 3) {
                        return temp.substring(0, temp.indexOf(".") + 3);
                    } else
                        "";
                } else {
                    
                    return "";
                }
            });
            Handlebars.registerHelper('multiply', function (variable, variable2, options) {
                if ((typeof variable !== 'undefined') & (typeof variable2 !== 'undefined')) {
                    var temp1 = variable * variable2;
                    var temp = temp1.toString();
                    if (((temp.length - 1) - temp.indexOf(".")) > 3) {
                        return temp.substring(0, temp.indexOf(".") + 3);
                    }else{
                        return temp;
                    }
                }else{
                    return "";
                }
            });
            Handlebars.registerHelper('isnullo', function (variable, variable2, options) {
                if ((variable != null) & (variable != undefined) & (variable != "")) {
                    return variable2.toString() + variable.toString();
                } else {
                    return "";
                }
            });
        },
        splashScreen: function () {
            var page = new Splash({
            });
            // show the view
            this.changePage(page);
        },
        myView: function () {
//            console.log(window.customer.logged);
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav1");
            // create a model with an arbitrary attribute for testing the template engine
            var model = new Products();
            model.setLimit(4);
            model.fetch();
            var categories = new Categories();
            categories.addLimit(2,4);
            categories.fetch();
            // create the view
            
            var page = new MyView({
                collection: model,
                model : categories
            });
            
            // show the view
            this.changePage(page);
        },
        // load the structure view
        showStructure: function () {
            var customer = JSON.parse(window.localStorage.getItem('customer'));
            if (customer.logged === true){
//                console.log("showstructure ramo true");
                this.firstView = "myview";
//                console.log(customer.logged);
            }else{
//                console.log("ramo false");
//                console.log(customer.logged);
            }
            if (!this.structureView) {
                this.structureView = new StructureView({
                    myApp: myApp,
                    myflag : customer.logged
                    
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
            var category = new Categories();
            category.fetch();
            // window.localStorage.setItem('category', category);
            // window.localStorage.setItem('categoryKey', 0);
            // create the view
            var page = new ProductListView({
                collection: model,
                model: category
            });
            this.changePage(page);
        },
        goToProductDetail: function (key) {
            var model = new Product({id: key});
            model.fetch();
            var immagini = new Images();
            immagini.addIdProduct(key);
            immagini.fetch();

            var page = new ProductDetailView({
                model: model,
                collection: immagini
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
//            console.log(collection);
            var page = new FarmListView({
                collection: collection
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
                model: model,
                collection: collection
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
            var category = new Categories();
            category.fetch();
            // window.localStorage.setItem('category', category);
            // window.localStorage.setItem('categoryKey', key);
            var page = new ProductListView({
                collection: model,
                model: category
            });
            // show the view
            this.changePage(page);
        },
        goToSearchResult: function (query) {
            var collection = new Searchs();
            collection.setQuery(query);
            collection.fetch();
            var model = new Categories();
            model.fetch();
            var page = new SearchListView({
                collection: collection,
                model: model
            });
            this.changePage(page);

        },
        goToSearchResultCategory: function (query, category) {
            var model = new Categories();
            model.fetch();
            var collection = new Searchs();
            collection.setQuery(query);
            collection.addCategoryFilter(category);
            collection.fetch();
            var page = new SearchListView({
                collection: collection,
                model: model
            });
            this.changePage(page);
        },
        goToAboutUs: function () {
            var collection = new AboutUs();
            collection.fetch();
            var page = new AboutUsView({
                collection: collection
            });
            this.changePage(page);
        },
        login: function () {
            //Da fixare qui devo querare solo i prodotti di una certa categoria e farli vedere in lista
            var page = new LoginView({
            });
            // show the view
            this.changePage(page);
        },
        ShowCart: function () {
            //Da fixare qui devo querare solo i prodotti di una certa categoria e farli vedere in lista
            var page = new CartView({
            });
            // show the view
            this.changePage(page);
        },
        goToOrderList: function (event) {
            
            var model = new Orders(window.customer.id);
            model.fetch();
            var page = new OrderList({
                collection: model
            });
            // show the view
            this.changePage(page);
        },
        goToOrderDetail: function (event) {
            var model = new Order();
            model.fetch();
            var page = new OrderDetail({
                model: model
            });
            // show the view
            this.changePage(page);
        },
          goToProfile : function(){
      var page = new ProfileView({
      });
      // show the view
      this.changePage(page);
          }

    });
    return AppRouter;
    
});
