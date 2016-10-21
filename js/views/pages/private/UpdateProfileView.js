define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Addresses = require("models/Addresses");
    var UpdateProfileView = Utils.Page.extend({
        constructorName: "UpdateProfileView",
        addresses: Addresses,
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.updateprofile;
            $('#back-button').css('display', 'block');
            $('#toggle-button').css('display', 'none');
            this.render();
        },
        id: "profileview",
        className: "i-g page",
        events: {
            "tap #runUpdate": "runUpdate"
        },
        render: function () {

            $(this.el).html(this.template({
                Customer: window.customer
            }));
            return this;
        },
        runUpdate: function (ev) {

            var data = {
                id: $("#idCostumer").val(),
                firstname: $("#firstname").val(),
                lastname: $("#lastname").val(),
                city: $("#city").val(),
                birthday: $("#birthday").val(),
                address1: $("#address1").val(),
                address2: $("#address2").val(),
                email: $("#email").val(),
                postcode: $("#postcode").val(),
                phone: $("#phone").val(),
                phone_mobile: $("#phone_mobile").val()
            };
            window.customer = data;
            window.customer.logged = true;
            window.localStorage.setItem('customer', JSON.stringify(window.customer));
            window.localStorage.setItem('flag', JSON.stringify(true));
            Backbone.history.navigate('gotoprofile', true);




        }
    });

    return UpdateProfileView;

});
