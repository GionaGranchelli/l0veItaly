define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var Utils = require("utils");
    var Framework7 = require('framework7');
    var myApp = new Framework7();
    var apriChiudi = 0;
//    var mainView = myApp.addView('.view-main', {
//        // Because we use fixed-through navbar we can enable dynamic navbar
//        dynamicNavbar: true
//    });


    var StructureView = Backbone.View.extend({
        constructorName: "StructureView",
        id: "main",
        myApp: myApp,
        events: {
            "tap #nav1": "myView",
            "tap #nav2": "map",
            "tap #nav3": "ProductList",
            "tap #nav4": "CategoryList",
            "tap #nav5": "FarmList",
            "tap #nav6": "AboutUs",
            "tap #nav7": "LoginPage",
            "tap #menuButton": "openMenu",
            "opened .panel": "apertura",
            "tap #settingsModal" : "openSearchBar",
            "tap #back-button" : "goBack",
            "tap #firemeUp": "fireMe",
            "tap #firemeDown": "fireMeDown"
        },
        initialize: function (options) {
            // load the precompiled template
            this.template = Utils.templates.structure;
            $('#back-button').css('display','none');
            $('#toggle-button').css('display','block');
            //this.on("inTheDOM", this.rendered);
            // bind the back event to the goBack function
            // document.getElementById("back-button").addEventListener("back", this.goBack(), false);
            _.bindAll(this, 'beforeRender', 'render', 'afterRender');
            var _this = this;
            this.render = _.wrap(this.render, function(render) {
              _this.beforeRender();
              render();
              _this.afterRender();
              return _this;
            });


        },
        beforeRender: function() {
           console.log('beforeRender');
        },
        render: function () {
            // load the template
            this.el.innerHTML = this.template({});
            // cache a reference to the content element
            this.contentElement = this.$el.find('#content')[0];

            return this;
        },
        afterRender: function() {
        console.log('afterRender');
        },
        goBack: function () {
            window.history.back();
        },
        setActiveTabBarElement: function (elementId) {
            // here we assume that at any time at least one tab bar element is active
//      document.getElementsByClassName("active")[0].classList.remove("active");
//      document.getElementById(elementId).classList.add("active");
        },
        map: function (event) {

            Backbone.history.navigate("map", {
                trigger: true
            });
        },
        myView: function (event) {

            Backbone.history.navigate("myview", {
                trigger: true
            });
        },
        ProductList: function (event) {

            Backbone.history.navigate("gotoproductlist", {
                trigger: true
            });

        },
        CategoryList: function (event) {

            Backbone.history.navigate("gotocategorylist", {
                trigger: true
            });

        },
        FarmList: function(event){
            Backbone.history.navigate("gotofarmlist", {
                trigger: true
            });
        },
        openSearchBar : function(event){

        },
         LoginPage: function(event){
            Backbone.history.navigate("login", {
                trigger: true
            });
        },
         fireMe: function (ev) {

            productItem = $(ev.currentTarget).data('id');
            window.cart.addOne(productItem);
        },
         fireMeDown: function (ev) {
            productItem = $(ev.currentTarget).data('id');
            $(ev.currentTarget).next('shopbox-content').css('background-image','url("img/cart.png")');
            console.log($(ev.currentTarget));
            console.log($(ev.currentTarget).siblings());
            console.log($(ev.currentTarget).next().next());
            console.log($(ev.currentTarget).next('shopbox-content'));
            console.log($(ev.currentTarget).next().next('shopbox-content'));
            window.cart.subOne(productItem);

        },
        AboutUs: function(){
          Backbone.history.navigate("gotoaboutus", {
              trigger: true
          });
        }
    });

    return StructureView;

});
