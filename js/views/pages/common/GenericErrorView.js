define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
   
    var GenericErrorView = Utils.Page.extend({
        constructorName: "GenericErrorView",
         initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.genericerror;
            this.render();
        },
        id: "genericerror",
        className: "i-g page",
        events: {
            "tap #gohome": "gohome"
        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        },
        gohome: function () {
           Backbone.history.navigate("myview", {
                trigger: true
            });
        }
    });

    return GenericErrorView;

});
