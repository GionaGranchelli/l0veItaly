define(function(require) {

  var Backbone = require("backbone");
  //  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var ProductDetailView = require('views/pages/products/ProductDetailView');
  var Products = require("collections/Products");

  var ProductListView = Utils.Page.extend({

    constructorName: "ProductListView",
    collection: Products,

    initialize: function() {

      _.bindAll(this, 'render');
      // load the precompiled template
      this.template = Utils.templates.productlist;
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

    id: "productlist",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",
      "tap #goToProductDetail" : "goToProductDetail",
      "scroll" : "fetchSheets"
    },

    render: function() {
      $(this.el).html(this.template({Prodotti: this.collection.toJSON()}));
      //      this.model.toJSON()
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    },
    goToProductDetail: function(ev){

      Backbone.history.navigate("gotoproductdetail/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });

    },
    fetchSheets: function () {

      var delta = this.checkScroll();
      console.log(delta);
      if (delta > -20) {
        console.log('this.collection =>' + this.collection);
        console.log('this.collection.initiale = >' + this.collection.initiale);
        console.log('this.collection.limite =>' + this.collection.limite);
        this.collection.initiale += 5;
        this.collection.limite += 5;
        this.collection.fetch();
      }
    },
    checkScroll: function () {
      var scrollHeight = this.el.offsetHeight;
                //  console.log("scrollHeight " + scrollHeight);
      var scrollTop = this.el.scrollHeight;// Altezza del contenuto di Page
                //  console.log("scrollTop " + scrollTop);
      var offsetHeight = this.el.scrollTop;  // Delta spostamento dello spostamento
                //  console.log("offsetHeight" + offsetHeight);
      return (scrollHeight - (scrollTop - offsetHeight));
    }
  });

          return ProductListView;

});
