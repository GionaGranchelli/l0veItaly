define(function (require) {
    var Validate = require("validate");
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
                password: $("#password").val(),
                password2: $("#password2").val(),
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
                window.customer = data;
                window.customer.logged = true;
                window.localStorage.setItem('customer', JSON.stringify(window.customer));
                window.localStorage.setItem('flag', JSON.stringify(true));
                console.log(window.customer);
                window.location.href = "";
            }


        },
        validate: function (data) {
            var validity = 0;
            if (data.firstname.lenght > this.validationparameters.firstname.length.maximum || data.firstname === "" || data.firstname === null) {
                $('#firstnameError').attr('class', 'mostra');
                $('#firstnameError').text("Nome obligatorio, lunghezza deve essere inferiore di 32 caratteri");
                validity++;
            }else{
                $('#firstnameError').attr('class', 'nascosto');
            }
            if (data.lastname.lenght > this.validationparameters.lastname.length.maximum || data.lastname === "" || data.lastname === null) {
                $('#lastnameError').attr('class', 'mostra');
                $('#lastnameError').text("Cognome obligatorio e lunghezza deve essere inferiore di 32 caratteri");
                validity++;
            }else{
                $('#lastnameError').attr('class', 'nascosto');
            }
            if (data.password.lenght > this.validationparameters.password.length.maximum || data.password === "" || data.password === null) {
                $('#passwordError').attr('class', 'mostra');
                $('#passwordError').text("password Richiesta e lunghezza deve essere inferiore di 32 caratteri");
                validity++;
            }else{
                $('#passwordError').attr('class', 'nascosto');
            }
            if (!this.isEmail(data.email)) {
                $('#emailError').attr('class', 'mostra');
                $('#emailError').text("Inserisci un email corretta");
                validity++;
            }else{
                $('#emailError').attr('class', 'nascosto');
            }
            if (data.password2 != data.password) {
                $('#password2Error').attr('class', 'mostra');
                $('#password2Error').text("Password Differenti");
                validity++;
            }else{
                $('#password2Error').attr('class', 'nascosto');
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
    return RegistrationView;
});
