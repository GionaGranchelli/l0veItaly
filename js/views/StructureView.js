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
            "tap #menuButton": "openMenu",
            "opened .panel": "apertura",
            "tap #settingsModal" : "openSearchBar"
        },
        initialize: function (options) {

            // load the precompiled template
            this.template = Utils.templates.structure;
            //this.on("inTheDOM", this.rendered);
            // bind the back event to the goBack function
            //document.getElementById("back").addEventListener("back", this.goBack(), false);

        },
        render: function () {
            // load the template
            this.el.innerHTML = this.template({});
            // cache a reference to the content element
            this.contentElement = this.$el.find('#content')[0];
            
            return this;
        },
        // rendered: function(e) {
        // },

        // generic go-back function
        goBack: function () {
            //window.history.back();
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

        }
    });

    return StructureView;

});
