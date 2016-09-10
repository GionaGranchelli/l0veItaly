define(function(require) {

  var Backbone = require("backbone");
//  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var Farms = require('collections/Farms');
  var FarmListView = Utils.Page.extend({

    constructorName: "FarmListView",
    collection: Farms,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.farmlist;
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

    id: "farmlist",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",
      "tap #farmItem" : "goToFarmDetail"
    },

    render: function() {
      $(this.el).html(this.template({Farms : this.collection.toJSON()}));
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    },
    goToFarmDetail: function(ev){


      Backbone.history.navigate("gotofarmdetail/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    }
  });

  return FarmListView;

});
