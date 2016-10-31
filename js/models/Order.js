define(function (require) {
    var Backbone = require("backbone");
    var $ = require('jquery');
    var CommonModel = require("models/CommonModel");
    var Order = CommonModel.extend({
        constructorName: "Order",
        idAttribute: "id"
//        url: function () {
//            var url = 'http://loveitaly.altervista.org/api/orders/' + this.get('id');
//            url += '&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
//
//            return url;
//        }
    });
    return Order;
});