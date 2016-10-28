define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");

    //VIEW
    var StructureView = require("views/StructureView");
    var MyView = require("views/pages/MyView");
    var Framework7 = require('framework7');
    var myApp = new Framework7();
    var Handlebars = require('handlebars');

    //Product
    var ProductListView = require("views/pages/products/ProductListView");
    var ProductDetailView = require("views/pages/products/ProductDetailView");
    //Category
    var CategoryListView = require("views/pages/products/CategoryListView");
    //Farm
    var FarmListView = require('views/pages/farm/FarmListView');
    var FarmDetailView = require('views/pages/farm/FarmDetailView');
    //Search
    var SearchListView = require('views/pages/search/SearchListView');
    //contacts
    var AboutUsView = require('views/pages/common/AboutUsView');
    //Loginview
    var LoginView = require('views/pages/common/Login');
    //CartView
    var CartView = require('views/pages/cart/CartView');
    //Order
    var OrderList = require('views/pages/private/OrdersList');
    //contacts
    var Splash = require('views/pages/common/Splash');
    //profile
    var ProfileView = require('views/pages/private/ProfileView');
    var UpdateProfileView = require('views/pages/private/UpdateProfileView');
    var RegistrationView = require('views/pages/common/RegistrationView');
    //genericError
    var GenericError = require('views/pages/common/GenericErrorView');
    //checkout
    var CheckOut = require('views/pages/private/CheckOut');
    //Backbone.emulateHTTP = true; // Use _method parameter rather than using DELETE and PUT methods
    //Backbone.emulateJSON = true; // Send data to server via parameter rather than via request content
    var AppRouter = Backbone.Router.extend({
        constructorName: "AppRouter",
        routes: {
            "": "showStructure",
            "myview": "myView",
            "splashscreen": "splashScreen",
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
            "gotoprofile": "goToProfile",
            "gotoregistration" : "goToRegistration",
            "gotoupdateprofile": "goToUpdateProfile",
            "gotogenericerror": "goToGenericError",
            "gotocheckout": "goToCheckOut"
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
                if (typeof variable !== 'undefined' && variable !== null && variable !== '') {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
            Handlebars.registerHelper('notExists', function (variable, options) {
                if (typeof variable === 'undefined' || variable === null || variable === '') {
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
                if (typeof variable != 'undefined') {
                    var temp = variable.toString();
                    return temp.substring(0, temp.indexOf(".") + 2);
                } else {

                    return "stocazzo";
                }
            });
            Handlebars.registerHelper('multiply', function (variable, variable2, options) {
                if ((typeof variable !== 'undefined') & (typeof variable2 !== 'undefined')) {
                    var temp1 = variable * variable2;
                    var temp = temp1.toString();
                    if (((temp.length - 1) - temp.indexOf(".")) > 3) {
                        return temp.substring(0, temp.indexOf(".") + 3);
                    } else {
                        return temp;
                    }
                } else {
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
            this.structureView.setActiveTabBarElement("nav1");
            var page = new MyView(4, 2, 4);
            this.changePage(page);
        },
        showStructure: function () {
            var customer = JSON.parse(window.localStorage.getItem('customer'));
            if (customer.logged === true) {
                this.firstView = "myview";
            }
            if (!this.structureView) {
                this.structureView = new StructureView({
                    myApp: myApp,
                    myflag: customer.logged
                });
                // put the el element of the structure view into the DOM
                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }
            // go to first view
            this.navigate(this.firstView, {trigger: true});
        },
        goToProductList: function () {
            var page = new ProductListView(4);
            this.changePage(page);
        },
        goToProductDetail: function (key) {
            var page = new ProductDetailView(key);
            this.changePage(page);
        },
        goToCategoryList: function () {
            var page = new CategoryListView();
            this.changePage(page);
        },
        goToFarmList: function () {
            var page = new FarmListView();
            this.changePage(page);
        },
        goToFarmDetail: function (key) {
            var page = new FarmDetailView(key);
            this.changePage(page);
        },
        goToCategory: function (key) {
            var page = new ProductListView(5, key);
            this.changePage(page);
        },
        goToSearchResult: function (query) {
            var page = new SearchListView(query);
            this.changePage(page);

        },
        goToSearchResultCategory: function (query, category) {
            var page = new SearchListView(query, category);
            this.changePage(page);
        },
        goToAboutUs: function () {
            var page = new AboutUsView();
            this.changePage(page);
        },
        login: function () {
            var page = new LoginView();
            this.changePage(page);
        },
        ShowCart: function () {
            var page = new CartView();
            this.changePage(page);
        },
        goToOrderList: function (event) {
            var page = new OrderList();
            this.changePage(page);
        },
        goToProfile: function () {
            var page = new ProfileView();
            // show the view
            this.changePage(page);
        },
        goToRegistration : function (){
            var page = new RegistrationView();
            this.changePage(page);
        },
        goToUpdateProfile : function (){
            var page = new UpdateProfileView();
            // show the view
            this.changePage(page);
        },
        goToGenericError: function () {
            var page = new GenericError();
            this.changePage(page);
        },
        goToCheckOut: function () {
            var page = new CheckOut();
            this.changePage(page);
        }

    });
    return AppRouter;

});
