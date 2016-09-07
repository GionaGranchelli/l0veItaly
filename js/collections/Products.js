define(function (require) {

    var Backbone = require("backbone");
    var Product = require("models/Product");
    var Products = Backbone.Collection.extend({
        initialize: function (option) {
            if (typeof option === "number") {
                console.log("option");
                this.url += '&limit=' + option;
            }
        },
        model: Product,
        url: 'http://loveitaly.altervista.org/api/products/?display=full&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
        parse: function (data) {
            return data.products;
        }
    });
    return Products;
});