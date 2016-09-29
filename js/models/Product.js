define(function (require) {
    var Backbone = require("backbone");
    var CommonModel = require("models/CommonModel");
    var $ = require('jquery');
    var Product = CommonModel.extend({
       
        url: function () {
            var url = 'http://loveitaly.altervista.org/api/products/';
            url += this.id;
            url += '&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
            return url;
        }
      });
return Product;
});