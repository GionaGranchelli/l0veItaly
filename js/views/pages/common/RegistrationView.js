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
        },
        id: "profileview",
        className: "i-g page",
        events: {
            "tap #runUpdate": "runUpdate"
        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        },
        runUpdate: function (ev) {
            var autenticazione = function (xhr) {
                var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
//            var key = 'IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
                var token = 'Basic '.concat(key64);
//            var ntoken = 'Basic '.concat(key);
                xhr.setRequestHeader('Authorization', token);
            };

            var updateContact = function () {
                $.ajax({
                    url: 'http://192.168.56.101/loveitaly/api/customers/?io_format=XML&schema=synopsis',
                    async: true,
                    type: "GET",
                    dataType: 'xml',
                    beforeSend: autenticazione,
                    success: function (result) {
                        console.log(result);
                        postContact(result);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log('Errore chiamata ajax!' +
                                '\nReponseText: ' + XMLHttpRequest.responseText +
                                '\nStatus: ' + textStatus +
                                '\nError: ' + errorThrown);
                    }
                });
            };
            updateContact();
            var postContact = function (xml) {
                //Get the modification 
                var id = $("#idCostumer").val();
                var firstname = $("#firstname").val();
                var lastname = $("#lastname").val();
                var city = $("#city").val();
                var birthday = $("#birthday").val();
                var address1 = $("#address1").val();
                var address2 = $("#address2").val();
                var email = $("#email").val();
                var postcode = $("#postcode").val();
                var phone = $("#phone").val();
                var phone_mobile = $("#phone_mobile").val();
                console.log(phone_mobile);
                console.log("xml");
                console.log(xml);
                var $xml = $(xml);
                console.log("$xml");
                console.log($xml);
                
                $xml.find('id').text(id);
                $xml.find('name').find('language').text(firstname);
                $xml.find('email').text(email);
                console.log("Contact");
                var contact = '<prestashop>' + $xml.find('prestashop').html() + '</prestashop>';
                console.log(contact);
                $.ajax({
                    url: 'http://192.168.56.101/loveitaly/api/customers/?io_format=XML&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
                    async: true,
                    type: "PUT",
                    dataType: 'xml',
                    contentType: "text/xml",
                    beforeSend: autenticazione,
                    data: contact,
                    success: function (result) {
                        console.log(result);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log('Errore chiamata ajax!' +
                                '\nReponseText: ' + XMLHttpRequest.responseText +
                                '\nStatus: ' + textStatus +
                                '\nError: ' + errorThrown);
                    }
                });
            };


//            Backbone.history.navigate("gotoproductdetail/" + $(ev.currentTarget).data('id'), {
//                trigger: true
//            });
        }
    });

    return RegistrationView;

});
