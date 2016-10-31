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
            //this.model = new Order();
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

//            console.log(window.localStorage.getItem('order'));
            console.log(window.cart.models);
            if (window.localStorage.getItem('order')) {
                prec = JSON.parse(window.localStorage.getItem('order'));
                var obj = {
                    totale: window.cart.totale() + 2,
                    invoicedate: new Date().toJSON().slice(0, 10),
                    spedizione: window.customer.spedizionelocale,
                    prodotti: new Array()
                }

                for (i = 0; i < window.cart.models.length; i++) {
                    obj.prodotti[i] = {
                        prodotto: window.cart.models[i],
                        quantity: window.cart.models[i].quantity,
                    };
                }
                prec[prec.length] = obj;
                window.localStorage.setItem('order', JSON.stringify(prec));
            } else {
                var list = new Array();
                var obj = {
                    totale: window.cart.totale() + 2,
                    invoicedate: new Date().toJSON().slice(0, 10),
                    spedizione: window.customer.spedizionelocale,
                    prodotti: new Array()
                }
                for (i = 0; i < window.cart.models.length; i++) {
                    obj.prodotti[i] = {
                        prodotto: window.cart.models[i],
                        quantity: window.cart.models[i].quantity,
                    };
                }
                list[0] = obj;
                window.localStorage.setItem('order', JSON.stringify(list));
            }
            window.cart.resettami();
            navigator.notification.alert(
                    'Il tuo ordine è stato confermato ed è in fase di elaborazione', // message
                    this.alertDismissed, // callback
                    'Ordine Effettuato', // title
                    'Grazie'                  // buttonName
                    );
//            alert("ordine confermato in attesa di elaborazione");
            console.log(window.localStorage.getItem('order'));
            Backbone.history.navigate("myview", {
                trigger: true
            });

        },
        alertDismissed : function(){
            
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
