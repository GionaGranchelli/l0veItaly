define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var Utils = require("utils");
    var Framework7 = require('framework7');
    var myApp = new Framework7();
    var apriChiudi = 0;
    var Customer = require('models/Customer');
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
            "tap #nav8": "Carrello",
            "tap #menuButton": "openMenu",
            "opened .panel": "apertura",
            "tap #settingsModal": "openSearchBar",
            "tap #back-button": "goBack",
            "tap #firemeUp": "fireMe",
            "tap #firemeDown": "fireMeDown",
            "tap #logout": "logout",
            "tap #orderList": "orderList",
            "tap #profile": "profile",
            "tap #loginFire": "loginAction",
            "loggalo": "loginA",
            "tap #searchButton": "doSearch",
            "keypress #search": "doSearchRapid",
            "tap #guestEntry": "myView"

        },
        loginA: function (e) {
            e.preventDefault();

            window.location.href = '';

        },
        initialize: function (options) {
            // load the precompiled template
//                if(window.customer.logged){
//                    this.template = Utils.templates.structure;
//                    
//                }else {this.template = Utils.templates.structurePublic;
//            console.log("mica qua");
//            console.log(options.myflag);
            $('#back-button').css('display', 'none');
            $('#toggle-button').css('display', 'block');
            if (options.myflag)
                this.template = Utils.templates.structure;

            else {
                this.template = Utils.templates.structurePublic;
            }
            //this.on("inTheDOM", this.rendered);
            // bind the back event to the goBack function
            // document.getElementById("back-button").addEventListener("back", this.goBack(), false);




        },
        loginAction: function (event) {

            var formValues = {
                email: $('#inputEmail').val(),
                password: $('#inputPassword').val()};
            url = "http://loveitaly.altervista.org/api/customers/?io_format=JSON&display=full&filter[email]=[" + formValues.email + "]";
            var that = this;
            $.ajax({
                url: url,
                type: 'GET',
                dataType: "json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6')
                },
                success: function (data) {
                    console.log(data.customers.passwd);
                    console.log(data.customers[0].passwd);
                    if ((data.customers[0].passwd == formValues.password) & (data.customers[0].email == formValues.email)) {

                        window.customer = data.customers[0];
                        window.customer.logged = true;
                        window.localStorage.setItem('customer', JSON.stringify(window.customer));
                        window.localStorage.setItem('flag', JSON.stringify(true));
                        that.myflag = true;
                        console.log(that);
                        window.location.href = "";

                    }


                    if (data.error) {  // If there is an error, show the error messages
//                        console.log("error");
                    } else { // If not, send them back to the home page
//                        console.log(data); //  window.location.replace('#');
                    }
                }, error: function (data) {
                    
                }
            });



        },
        loginato: function () {
            
        },
        beforeRender: function () {
            
//               this.template = Utils.templates.structure;
//               if(!window.customer.logged) Utils.templates.structurePublic;
//               

        },
        render: function (my) {

            this.el.innerHTML = this.template({});
            // cache a reference to the content element
            this.contentElement = this.$el.find('#content')[0];
            return this;
        },
        afterRender: function () {
            
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
        FarmList: function (event) {
            Backbone.history.navigate("gotofarmlist", {
                trigger: true
            });
        },
        openSearchBar: function (event) {

        },
        LoginPage: function (event) {
            Backbone.history.navigate("login", {
                trigger: true
            });
        },
        Carrello: function (event) {
            Backbone.history.navigate("carrello", {
                trigger: true
            });
        },
        fireMe: function (ev) {

            productItem = $(ev.currentTarget).data('id');
            window.cart.addOne(productItem);
        },
        fireMeDown: function (ev) {
            productItem = $(ev.currentTarget).data('id');
            $(ev.currentTarget).next('shopbox-content').css('background-image', 'url("img/cart.png")');

            window.cart.subOne(productItem);
            console.log(window.cart.totale());
        },
        AboutUs: function () {
            Backbone.history.navigate("gotoaboutus", {
                trigger: true
            });
        },
        profile: function () {
            Backbone.history.navigate("gotoprofile", {
                trigger: true
            });
        },
        logout: function (e) {
            console.log("qaaaaaaaaaaaaa");
            window.cart.resettami();
            window.customer = {};
            window.customer.logged = false;
            window.localStorage.removeItem('customer');
            window.localStorage.setItem('flag', JSON.stringify(false));
            window.location.href = '';
        },
        orderList: function () {
            Backbone.history.navigate("gotoorderlist", {
                trigger: true
            });
        },
        doSearch: function (ev) {
            this.searchQuery = $('#search').val();
            this.cat = $("#categorySelector").val();
            if (this.searchQuery) {
                if (this.cat == 0 || this.cat == undefined || this.cat == null) {
                    console.log("gotosearchresult");

                    Backbone.history.navigate("gotosearchresult/" + this.searchQuery, {trigger: true});

                } else {
                    console.log("gotosearchresultcategory");
                    Backbone.history.navigate("gotosearchresultcategory/" + this.searchQuery + "/" + this.cat, {trigger: true});
                }

            } else {
                if (this.cat != 0) {
                    console.log('goToCategory');
                    Backbone.history.navigate("gotocategory/" + this.cat, {trigger: true});
                }
            }

        },
        doSearchRapid: function (event) {
//            console.log(event.keyCode);
            var code = event.keyCode || event.which;
            if (code === 13) {
                this.doSearch();
            }
        }





    });
    return StructureView;
});
