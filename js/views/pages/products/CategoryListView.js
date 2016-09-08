define(function(require) {

  var Backbone = require("backbone");
//  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var Categories = require("collections/Categories");
  
  var CategoryListView = Utils.Page.extend({

    constructorName: "CategoryListView",
    collection: Categories,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.productcategory;
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

    id: "productcategory",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",
      "tap #goToCategory" : "category"
     
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
    },

    category: function(ev) {
//        console.log("category qui");
      Backbone.history.navigate("gotocategory/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    }
      
    
  });

  return CategoryListView;

});