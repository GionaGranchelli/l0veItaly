define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Addresses = require("models/Addresses");
    var ProfileView = Utils.Page.extend({
        constructorName: "ProfileView",
        addresses: Addresses,
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.profile;
            this.addresses = new Addresses();
            this.addresses.addIdAddress(window.customer.id);
            this.addresses.fetch();
            this.addresses.on('sync', this.render, this);
            $('#back-button').css('display', 'block');
            $('#toggle-button').css('display', 'none');
        },
        id: "profileview",
        className: "i-g page",
        events: {
            "tap #update": "changeTemplate"
        },
        render: function () {

            $(this.el).html(this.template({
                Customer: window.customer,
                Addresses: this.addresses.toJSON()}));
            return this;
        },
        changeTemplate: function () {
            Backbone.history.navigate("gotoupdateprofile", {trigger: true});
        },
        runUpdate: function () {}
    });

    return ProfileView;

});
