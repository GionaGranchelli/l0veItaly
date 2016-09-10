define(function (require) {
    var Backbone = require("backbone");
    var $ = require('jquery');
    var Product = require('models/Product');
    var CartProduct = Product.extend({
        constructorName: "CartProduct",
        idAttribute:"id",
        initialize: function (x) {
           
            this.quantity=0;
            
        },
        quantity: 0,
        addOneItm: function () {
            
            this.quantity++;
            
        },
        subOneItm: function () {
            
            this.quantity--;
            return this.quantity;
        },
        addXItm: function (x) {
            
            this.quantity+=x;
        },
        subXItm: function (x) {
            
            this.qantity-=x;
            return this.quantity;
        },
    });
    return CartProduct;
});