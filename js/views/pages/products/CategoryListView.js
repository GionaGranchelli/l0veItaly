define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var Categories = require("collections/Categories");
  var CategoryListView = Utils.Page.extend({
    constructorName: "CategoryListView",
    collection: Categories,
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.productcategory;
      this.collection = new Categories();
      this.collection.fetch();
      $('#back-button').css('display','block');
      $('#toggle-button').css('display','none');
      this.collection.on('sync', this.render, this);
    },
    id: "productcategory",
    className: "i-g page",
    events: {
      "tap #goToMap": "goToMap",
      "tap #goToCategory" : "category"
    },
    render: function() {
      $(this.el).html(this.template({Category : this.collection.toJSON()}));
      return this;
    },
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    },
    category: function(ev) {
      Backbone.history.navigate("gotocategory/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    }
  });

  return CategoryListView;

});
