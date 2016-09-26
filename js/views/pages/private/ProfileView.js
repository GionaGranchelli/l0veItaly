define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
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
      
    },
    render: function() {
      console.log(window.customer);
      $(this.el).html(this.template(window.customer));
      return this;
    }
});

  return ProfileView;

});
