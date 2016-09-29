define(function (require) {
    var Backbone = require("backbone");
    var $ = require('jquery');
    var CommonModel = require("models/CommonModel");
    var Addresses = CommonModel.extend({
        constructorName: "Addresses",
        url: 'http://loveitaly.altervista.org/api/addresses/',
        addIdAddress: function (id) {
            this.url += id;
            this.url += '?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H&io_format=JSON';
        },
        parse: function (data) {
            return data.address;
        }
    });
    return Addresses;
});

