define(function (require) {

    var Backbone = require("backbone");
    var Farm = require("models/Farm");
    var Farms = Backbone.Collection.extend({
        initialize: function (option) {
            if (typeof option === "number") {
                console.log("option");
                this.url += '&limit=' + option;
            }
        },
        model: Farm,
        url: 'http://loveitaly.altervista.org/api/manufacturers/?display=full&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
        parse: function (data) {
            return data.manufacturers;
        }
    });
    return Farms;
});