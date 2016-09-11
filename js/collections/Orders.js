define(function (require) {
    var Backbone = require("backbone");
    var Order = require("models/Order");
    var Orders = Backbone.Collection.extend({
        initialize: function (param) {
            this.param = param;
        },
        model: Order,
        constructorName: "Orders",
        param: "",
        url: function () {
            url = 'http://loveitaly.altervista.org/api/orders/?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H&display=full&io_format=JSON';
            url += '&filter[id_customer]=[' + this.param + ']';
            return url;
        },
    parse:function(data){
            return data.orders;
    }
    });
    return Orders;
});
