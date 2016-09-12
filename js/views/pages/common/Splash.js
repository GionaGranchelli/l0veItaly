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
            //var cust = new Customer({email:this.email});
            //cust.fetch({success:function(){



        },
        // here we can register to inTheDOM or removing events
        // this.listenTo(this, "inTheDOM", function() {
        //   $('#content').on("swipe", function(data){
        //     console.log(data);
        //   });
        // });
        // this.listenTo(this, "removing", functionName);

        id: "splash",
        className: "splashscren",
        events: {
            "tap #goToMap": "goToMap",
            "redirect": "redirect"
        },
        render: function (flag) {
            // $("")
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
        goToMap: function (e) {
            Backbone.history.navigate("map", {
                trigger: true
            });
        }
    });

    return Splash;

});
