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

            if (this.validate(data)) {
                navigator.notification.confirm(
                        'Sei Sicuro delle Modifiche?', // message
                        this.onConfirm, // callback to invoke with index of button pressed
                        'Modifiche', // title
                        ['Procedi', 'No!!']     // buttonLabels
                        );
            }



        },
        onConfirm: function (buttonIndex) {
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

            if (buttonIndex === 1) {
                window.customer = data;
                window.customer.logged = true;
                window.localStorage.setItem('customer', JSON.stringify(window.customer));
                window.localStorage.setItem('flag', JSON.stringify(true));
                Backbone.history.navigate("myview", {
                    trigger: true
                });
            }
        },
        validate: function (data) {
            var validity = 0;
            if (data.firstname.lenght > this.validationparameters.firstname.length.maximum || data.firstname === "" || data.firstname === null) {
                $('#firstnameError').attr('class', 'mostra');
                $('#firstnameError').text("Nome obligatorio, lunghezza deve essere inferiore di 32 caratteri");
                validity++;
            } else {
                $('#firstnameError').attr('class', 'nascosto');
            }
            if (data.lastname.lenght > this.validationparameters.lastname.length.maximum || data.lastname === "" || data.lastname === null) {
                $('#lastnameError').attr('class', 'mostra');
                $('#lastnameError').text("Cognome obligatorio e lunghezza deve essere inferiore di 32 caratteri");
                validity++;
            } else {
                $('#lastnameError').attr('class', 'nascosto');
            }
            
            if (!this.isEmail(data.email)) {
                $('#emailError').attr('class', 'mostra');
                $('#emailError').text("Inserisci un email corretta");
                validity++;
            } else {
                $('#emailError').attr('class', 'nascosto');
            }
            
            if (validity === 0) {
                return true;
            } else {
                return false;
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
            password: {
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
        },
        isEmail: function (email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }
    });

    return UpdateProfileView;

});
