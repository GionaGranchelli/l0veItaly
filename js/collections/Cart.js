define(function (require) {

    var Backbone = require("backbone");
    var CartProduct = require("models/CartProduct");
    var Product = require("models/Product");
    var Cart = Backbone.Collection.extend({
        initialize: function (option) {
            console.log("carrello inizializzato");
        },
        model: CartProduct,
        constructorName: "Cart",
        addOne: function (Itm) {
            if (this.get(Itm) == undefined) {
                modello = new CartProduct({id: Itm});
                modello.addOneItm();
                this.add(modello);
            } else {
                this.get(Itm).addOneItm();
            }
            //parz= this.totale();
            //              console.log (parz);
            this.trigger('itemAddiction');
            return this;
        },
        subOne: function (Itm) {
            console.log("subOne");
            if (this.get(Itm) == undefined) {
                return this;
            } else {
                result = this.get(Itm).subOneItm();
                if (result <= 0) {
                    this.remove(Itm);
                }
            }
            //            parz= this.totale();
            //              console.log (parz);
            this.trigger('itemSubtraction');
            return this;
        },
        resettami: function () {

            this.models = {};
            cartNew = new Cart();
            window.cart = cartNew;



        },
        totale: function () {
            var tot = 0;
            for (var key in this.models) {
                tot += this.models[key].quantity * this.models[key].attributes.product.price;

            }

            return tot;
        },
        totaleColli: function () {
            var tot = 0;
            for (var key in this.models) {
                tot += this.models[key].quantity;

            }
            return tot;
        }

    });
    return Cart;
});
