define(function (require) {
    var Backbone = require("backbone");
    var $ = require('jquery');
    var Farm = Backbone.Model.extend({
        initialize: function () {
        },
        url: function () {
            var url = 'http://loveitaly.altervista.org/api/manufacturers/';
            url += this.id;
            url += '?io_format=JSON';
            return url;
        }
      });
return Farm;
});