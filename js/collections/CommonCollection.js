define(function (require) {
    var Backbone = require("backbone");
    var $ = require('jquery');
   CommonCollection = Backbone.Collection.extend({

    initialize: function(attributes, options) {
        options || (options = {});
        this.on("error", this.defaultErrorHandler);
        this.init && this.init(attributes, options);
    },

    defaultErrorHandler: function(model, error) {
        console.log("aeiouy");
        if (error.status == 401 || error.status == 403 || error.status == 403 || error.status == 400 || error.status == 404 || error.status == 500 || error.status == 501 || error.status == 502) {
                console.log("***************************minchia panico ****************************************");
                Backbone.history.navigate("gotogenericerror", {
                    trigger: true
                });
        }
    }

});

return CommonCollection;
});