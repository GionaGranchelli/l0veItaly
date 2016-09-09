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
    iniziale: 4,
    limit: 8,
    events: {
      "tap #goToMap": "goToMap",
      "tap #goToProductDetail" : "goToProductDetail",
      "scroll" : "fetchSheets",
      "tap #searchButton" : "doSearch",
      "keypress #search": "doSearchRapid"
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
      if (delta > -10) {
        this.collection.setPagination(this.iniziale, this.limit);
        this.inziale = this.limit;
        this.limit += 5;
        this.collection.fetch({remove: false});
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
    },
    doSearch : function(){
      var searchQuery = $('#search').val();
      console.log(searchQuery);
      Backbone.history.navigate("gotosearchresult/" + searchQuery,{trigger: true});

    },
    doSearchRapid : function(event){
      console.log(event.keyCode);
      if (event.keyCode === 13) {
        console.log($('#search').val());

        var searchQuery = $('#search').val();
        console.log(searchQuery);
        Backbone.history.navigate("gotosearchresult/" + searchQuery,{trigger: true});
      }
    }
  });

          return ProductListView;

});
