define(function (require) {

    var Backbone = require("backbone");
    var Product = require("models/Product");
    var Products = Backbone.Collection.extend({
        initialize: function (option, category, farm) {
            
            
            console.log('option' + option);
            console.log('category' + category);
            console.log('typeof category' + typeof category);
            console.log('farm' + farm);
            
            if (typeof option === "number") {
                this.url += '&limit=' + option;
            }
            if (category !== undefined ) {
                if (typeof category !== "string") {
                    console.log("Products filtered by Category");
                    this.url += '&filter[id_category_default]=[' + category + ']';
                }
            }
            if (farm !== undefined) {
                console.log("Products filtered by Farm");
                this.url += '&filter[id_manufacturer]=[' + farm + ']';
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