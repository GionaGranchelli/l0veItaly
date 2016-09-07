define(function(require) {

  var Backbone = require("backbone");
//  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var ProductDetailView = require('views/pages/products/ProductDetailView');

  var ProductListView = Utils.Page.extend({

    constructorName: "ProductListView",


    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.productlist;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "productlist",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",
      "tap #goToProductDetail" : "goToProductDetail"
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
    goToProductDetail: function(e){
        Backbone.history.navigate("gotoproductdetail", {
        trigger: true
      });
      
    }
  });

  return ProductListView;

});