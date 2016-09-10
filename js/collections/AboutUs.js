
define(function (require) {
    var Backbone = require("backbone");

    var AboutUs = Backbone.Collection.extend({
        initialize: function () {

        },

        url: 'http://loveitaly.altervista.org/api/contacts/&io_format=JSON&display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
        parse: function (data) {
            return data.contacts;
        }
    });
    return AboutUs;
});
