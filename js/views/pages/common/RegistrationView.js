define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Addresses = require("models/Addresses");
    var RegistrationView = Utils.Page.extend({
        constructorName: "RegistrationView",
        addresses: Addresses,
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.registration;
//            this.addresses = new Addresses();
//            this.addresses.addIdAddress(window.customer.id);
//            this.addresses.fetch();
//            this.addresses.on('sync', this.render, this);
            $('#back-button').css('display', 'block');
            $('#toggle-button').css('display', 'none');
            this.render();
        },
        id: "profileview",
        className: "i-g page",
        events: {
            "tap #update": "update"
        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        },
        update: function (ev) {

            //Get the modification 
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
            console.log(window.customer);
           window.location.href = "";

        }
    });

    return RegistrationView;

});
