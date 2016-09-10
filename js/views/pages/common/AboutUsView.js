define(function(require) {

  var Backbone = require("backbone");
//  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var AboutUs = require("collections/AboutUs");

  var AboutUsView = Utils.Page.extend({

    constructorName: "AboutUsView",
    collection: AboutUs,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.aboutus;
      $('#back-button').css('display','block');
      $('#toggle-button').css('display','none');
      this.collection.on('sync', this.render, this);
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "aboutus",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",

    },

    render: function() {

      $(this.el).html(this.template({Category : this.collection.toJSON()}));
//      this.model.toJSON()
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }


  });

  return AboutUsView;

});
