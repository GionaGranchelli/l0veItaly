define(function (require) {
//    var validate = require("validate");
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
            this.validate(data);
            window.customer = data;
            window.customer.logged = true;
            window.localStorage.setItem('customer', JSON.stringify(window.customer));
            window.localStorage.setItem('flag', JSON.stringify(true));
            console.log(window.customer);
            window.location.href = "";

        },
        validate: function (data) {
            if(data.firstname.lenght > this.validationparameters.firstname.length.maximum || data.firstname === "" || data.firstname == null){
                console.log("firstanme male");
            }
        },
        validationparameters: {
            firstname: {
                length: {
                    maximum: 32,
                    tooLong: 'Massimo 32 caratteri'
                }
            },
            lastname: {
                length: {
                    maximum: 32,
                    tooLong: 'Massimo 32 caratteri'
                }
            },
            passwd: {
                length: {
                    maximum: 32,
                    tooLong: 'Massimo 32 caratteri'
                }
            },
            email: {
                length: {
                    maximum: 128,
                    tooLong: 'Massimo 128 caratteri'
                }
            }
        }
    });

    return RegistrationView;

});
