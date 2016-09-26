define(function(require) {

  var Backbone = require("backbone");
  //  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  // var Cart = require("collections/Cart");
  // var Products = require("collections/Products");

  var ProfileView = Utils.Page.extend({

    constructorName: "ProfileView",
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.profile;
      $('#back-button').css('display','block');
      $('#toggle-button').css('display','none');
    },
    id: "profileview",
    className: "i-g page",
    events: {
      "tap #goToMap": "goToMap"
    },
    render: function() {
      console.log(window.customer);
      $(this.el).html(this.template(window.customer));
      return this;
    }



  });

  return ProfileView;

});
