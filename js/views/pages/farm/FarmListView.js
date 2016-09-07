define(function(require) {

  var Backbone = require("backbone");
//  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var FarmListView = Utils.Page.extend({

    constructorName: "FarmListView",


    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.farmlist;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "farmlist",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",
      "tap .farmitem" : "goToFarmDetail"
    },

    render: function() {
      $(this.el).html(this.template());
//      this.model.toJSON()
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    },
    goToFarmDetail: function(e){
        Backbone.history.navigate("gotofarmdetail", {
        trigger: true
      });
      
    }
  });

  return FarmListView;

});