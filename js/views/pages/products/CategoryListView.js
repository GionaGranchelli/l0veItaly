define(function(require) {

  var Backbone = require("backbone");
//  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var CategoryListView = Utils.Page.extend({

    constructorName: "CategoryListView",


    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.productcategory;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "productcategory",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",
      "tap #prodottiBio" : "prodottiBio",
      "tap #prodottiForno" : "prodottiForno",
      "tap #ortaggi" : "ortaggi",
      "tap #frutta" : "frutta",
      "tap #legumi" : "legumi",
      "tap #formaggi" : "formaggi",
      "tap #olio" : "olio",
      "tap #vino" : "vino",
      "tap #miele" : "miele",
      "tap #condimenti" : "condimenti",
      "tap #conserve" : "conserve",
      "tap #carne" : "carne",
      "tap #infusi" : "infusi"
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

    prodottiBio: function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    prodottiForno: function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    ortaggi:function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    }
    ,

    frutta: function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    legumi:function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    formaggi: function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    olio: function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    vino: function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    miele: function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    condimenti: function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    conserve: function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    carne: function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },

    infusi:function(ev) {
      Backbone.history.navigate("category/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    }
      
    
  });

  return CategoryListView;

});