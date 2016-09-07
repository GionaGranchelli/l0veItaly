define(function (require) {
    var Backbone = require("backbone");
    var $ = require('jquery');
    var Product = Backbone.Model.extend({
        initialize: function () {
        },
        url: function () {
            var url = 'http://loveitaly.altervista.org/api/products/';
            url += this.id;
            url += '?io_format=JSON';
            return url;
        }
      });
return Product;
});