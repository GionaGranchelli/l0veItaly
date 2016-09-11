define(function (require) {

    var Backbone = require("backbone");
    var CartProduct = require("models/CartProduct");
    var Product = require("models/Product");
    var Cart = Backbone.Collection.extend({
        initialize: function (option, category, farm) {
            console.log("carrello inizializzato");
        },
        model: CartProduct,
        constructorName: "Cart",
        addOne: function (Itm) {
            console.log("addone");
            if (this.get(Itm) == undefined) {
                modello = new CartProduct({id: Itm})
                modello.addOneItm();
                this.add(modello);
                console.log(this.get(Itm));
                console.log(modello);
                console.log(this);
            } else {
                this.get(Itm).addOneItm();
                console.log("ancora");

            }

            return this;
        },
        subOne: function (Itm) {
            console.log("subOne");
            if (this.get(Itm) == undefined) {
                return this;
            } else {
                result = this.get(Itm).subOneItm();
                console.log("ancora subone");
                if (result <= 0) {
                    this.remove(Itm);
                }
            }

            return this;
        },
        resettami: function () {

            this.models = {};
            cartNew = new Cart();
            window.cart=cartNew;



        }





    });
    return Cart;
});
