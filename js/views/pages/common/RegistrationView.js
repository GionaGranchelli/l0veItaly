define(function (require) {
    var validate = require("validate");
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

        },
        defaults: {
            // valori di controllo
            firstname: 'name-unknown',
            lastname: 'surname-unknown',
            email: 'user@example.com',
            passwd: 'no-one',
            active: 1, // si suppone che l'utente sia attivo
            id_default_group: 3 // è un customer
        },
        validationparameters:  {
            firstname: {
                length: {
                    maximum: 32,
                    tooLong : 'Massimo 32 caratteri'
                },
                format: {
                    pattern: /^[^0-9!<>,;?=+()@#"°{}_$%:]*$/u,
                    message: function (value, attribute, validatorOptions, attributes, globalOptions) {
                        return 'firstname-format-error'
                    }
                }
            },
            lastname: {
                length: {
                    maximum: 32,
                    tooLong: 'Massimo 32 caratteri'
                },
                format: {
                    pattern: /^[^0-9!<>,;?=+()@#"°{}_$%:]*$/u,
                    message: function (value, attribute, validatorOptions, attributes, globalOptions) {
                        return 'lastname-format-error'
                    }
                }
            },
            passwd: {
                length: {
                    maximum: 32,
                    tooLong: 'Massimo 32 caratteri'
                },
                format: {
                    pattern: /^[.a-zA-Z_0-9-!@#$%\^&*()]{5,32}$/,
                    message: function (value, attribute, validatorOptions, attributes, globalOptions) {
                        return 'passwd-format-error'
                    }
                }
            },
            email: {
                length: {
                    maximum: 128,
                    tooLong: 'Massimo 128 caratteri'
                },
                format: {
                    pattern: /^[a-z0-9_-]+[.a-z0-9_-]*@[a-z0-9]+[._a-z0-9-]*\.[a-z0-9]+$/ui,
                    message: function (value, attribute, validatorOptions, attributes, globalOptions) {
                        return 'email-format-error'
                    }
                }
            },
            birthday: {
                format: {
                    pattern: /^([0-9]{4})-((0?[1-9])|(1[0-2]))-((0?[1-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/,
                    message: function (value, attribute, validatorOptions, attributes, globalOptions) {
                        return 'email-format-error'
                    }
                }
            }
        }
    });

    return RegistrationView;

});
