define(function(require) {

  var Backbone = require("backbone");
//  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var Farm = require('models/Farm');
  var Products = require('collections/Products');

  var FarmDetailView = Utils.Page.extend({

    constructorName: "FarmDetailView",
    model : Farm,
    collection : Products,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.farm;
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

    id: "farm",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap"
    },
    beforeRender : function(){
        this.collection.on('sync', this.render, this);
    },
    render: function() {
<<<<<<< HEAD
        console.log("COLLECTION" + this.collection.toJSON());
      $(this.el).html(this.template({
          model : this.model.toJSON(),
          Products : [this.collection.toJSON()]
=======
     $(this.el).html(this.template({
          model : this.model.toJSON(),
          Products : this.collection.models
>>>>>>> 81232458136556e76b4d162170fcf09fce3d150c
      }
      ));
//      $(this.el).html(this.template({Products : }));
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
     
    }
  });

  return FarmDetailView;

});