
define(function (require) {
    var Backbone = require("backbone");
    var $ = require('jquery');
    var CommonModel = require("models/CommonModel");
    var Contact = CommonModel.extend({
        initialize: function (param) {
            this.param = param;
            this.logged = false;
            this.id = undefined;
        },
        constructorName: "Contact",
        idAttribute: "id",
        logged: false,
        param: "",
        url: function () {
            var url = 'http://loveitaly.altervista.org/api/contacts/';
            console.log(url);
            return url;
        },
        parse: function (data) {

            return data;


        },
        printUrl: function () {

            console.log(this.url);

        },
        autenticazione: function (xhr) {
            var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
            var token = 'Basic '.concat(key64);
            xhr.setRequestHeader('Authorization', token);
        }

    });

    return Contact;
});