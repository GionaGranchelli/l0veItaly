define(function (require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var AboutUs = require("collections/AboutUs");
    var AboutUsView = Utils.Page.extend({
        constructorName: "AboutUsView",
        collection: AboutUs,
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.aboutus;
            $('#back-button').css('display', 'block');
            $('#toggle-button').css('display', 'none');
            this.collection = new AboutUs();
            this.collection.fetch();
            this.collection.on('sync', this.render, this);
        },
        id: "aboutus",
        className: "i-g page",
        events: {
            "tap #mailto": "mailto"
        },
        render: function () {
            $(this.el).html(this.template({Contacts: this.collection.toJSON()}));
            return this;
        },
        mailto: function (ev) {
            var link = 'mailto:' + $(ev.currentTarget).data('mailto');
            window.open(link, 'Mailer');
            return false;
        }
    });

    return AboutUsView;

});
