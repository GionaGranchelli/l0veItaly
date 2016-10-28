define(function (require) {

    var Backbone = require("backbone");
    //  var MyModel = require("models/MyModel");
    var Utils = require("utils");
    var Order = require("models/Order");
    var CheckOut = Utils.Page.extend({
        constructorName: "Order",
        model: Order,
        initialize: function () {
            this.template = Utils.templates.checkout;
            this.model = new Order();
            this.model.list = window.cart.models;
            this.model.totale = window.cart.totale();
            this.model.totaleColli = window.cart.totaleColli();
        },
        className: "i-g page",
        events: {
            "tap #modifica": "modifica",
            "tap #conferma": "conferma"
        },
        conferma: function () {

            console.log(window.localStorage.getItem('order'));
            
            if (window.localStorage.getItem('order')) {
                prec = JSON.parse(window.localStorage.getItem('order'));
                prec[prec.length] = window.cart.models;
                window.localStorage.setItem('order', JSON.stringify(prec));
            } else {
                var list = new Array();
                list[0] = window.cart.models;
                window.localStorage.setItem('order', JSON.stringify(list));
            }
            window.cart.resettami();
            alert("ordine confermato in attesa di elaborazione");
             console.log(window.localStorage.getItem('order'));
            Backbone.history.navigate("myview", {
                trigger: true
            });

        },
        modifica: function () {

            Backbone.history.navigate("carrello", {
                trigger: true
            });
        },
        render: function () {
            var costoTotale = this.model.totale + 2;
            $(this.el).html(this.template({articoli: this.model.list,
                totale: this.model.totale,
                totaleColli: this.model.totaleColli,
                CostoTotale: costoTotale,
                spedizione: window.customer.spedizionelocale
            }));
            return this;
        }
    });

    return CheckOut;

});
