define(function (require) {
    var Backbone = require("backbone");
    var Utils = require("utils");
    var Cart = require("collections/Cart");
    var Products = require("collections/Products");
    var CartView = Utils.Page.extend({
        constructorName: "CartView",
        collection: Products,
        initialize: function () {
            this.template = Utils.templates.cart;
            window.cart.on('itemSubtraction', this.render, this);
            window.cart.on('itemAddiction', this.render, this);
            _.bindAll(this, 'render', 'afterRender');
            var _this = this;
            this.render = _.wrap(this.render, function (render) {
                render();
                _this.afterRender();
                return _this;
            });
        },
        id: "productcategory",
        className: "i-g page cart-result",
        events: {
            "tap #goToMap": "goToMap",
            "tap #goToCategory": "category",
            "tap #resetButton": "svuotaCarrello",
            "change #luoghiConsegna": "cambiaSpedizione",
            "tap #checkout": "gotocheckout",
            "shipment": "changeit"
        },
        redirectQui: function () {
            Backbone.history.navigate("carrello", {
                trigger: true
            });
        },
        render: function () {
            var costoTotale = window.cart.totale() + 2;
            $(this.el).html(this.template({articoli: window.cart.models,
                totale: window.cart.totale(),
                totaleColli: window.cart.totaleColli(),
                CostoTotale: costoTotale,
                spedizione: window.customer.spedizionelocale
            }));
            $('#back-button').css('display', 'block');
            $('#toggle-button').css('display', 'none');
            return this;
        },
        svuotaCarrello: function () {
            window.cart.resettami();
            this.render();
        },
        goToMap: function (e) {
            Backbone.history.navigate("map", {
                trigger: true
            });
        },
        category: function (ev) {
            Backbone.history.navigate("gotocategory/" + $(ev.currentTarget).data('id'), {
                trigger: true
            });
        },
        cambiaSpedizione: function (ev) {
            window.customer.spedizionelocale = ev.target.value;
            window.customer.logged = true;
            window.localStorage.setItem('customer', JSON.stringify(window.customer));
        },
        gotocheckout: function () {
            console.log(window.cart.length);
            if (window.cart.length <= 0) {
                navigator.notification.alert(
                        'il carrello è vuoto :/ Fatti tentare dalla genuinità di loveitaly!! ', // message
                        null,
                        'cart', // title
                        'Fatti tentare dalla genuinità di loveitaly'                  // buttonName
                        );
            } else if (!window.customer.logged) {
                navigator.notification.alert(
                        'devi essere registrato per accedere al cibo a km 0', // message
                        null,
                        'registration', // title
                        'Fatti tentare dalla genuinità di loveitaly'                  // buttonName
                        );
                Backbone.history.navigate("splashscreen", {
                    trigger: true
                });
            } else if (window.customer.spedizionelocale) {
                Backbone.history.navigate("gotocheckout", {
                    trigger: true
                });
            } else
                navigator.notification.alert(
                        'seleziona il paese per la spedizione', // message
                        null,
                        'shipment', // title
                        'Grazie'                  // buttonName
                        );
        },
        afterRender: function () {
            console.log('afterRender');
            if (window.customer.spedizionelocale) {
//                $("#luoghiConsegna").val(window.customer.spedizionelocale);
                
            }
        }



    });

    return CartView;

});
