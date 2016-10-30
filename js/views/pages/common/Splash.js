define(function (require) {

    var Backbone = require("backbone");
    var Customer = require("models/Customer");
    var Utils = require("utils");
    var Splash = Utils.Page.extend({
        constructorName: "Splash",
        model: Customer,
        email: "",
        password: "",
        initialize: function () {
            this.template = Utils.templates.login;
            this.render;
        },
        id: "splash",
        className: "splashscren",
        events: {
            "redirect": "redirect",
            "tap #registrati" : "registrati"
        },
        render: function (flag) {
            if (flag) {
                $(this.el).html(this.template({messaggio: "User e password sbagliati riprova"}));
            } else
                $(this.el).html(this.template());

            return this;
        },
        redirect: function (e) {

            Backbone.history.navigate("myview", {
                trigger: true
            });

        },
        registrati : function (){
            Backbone.history.navigate("gotoregistration", {
                trigger: true
            });
        }
    });

    return Splash;

});
