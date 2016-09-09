define(function(require) {

  var Backbone = require("backbone");
  //  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  // var ProductDetailView = require('views/pages/products/ProductDetailView');
  var Seachs = require("collections/Searchs");

  var SearcListView = Utils.Page.extend({

    constructorName: "SearcListView",
    collection: Seachs,

    initialize: function() {
      console.log("Sono dentro la Search List");
      _.bindAll(this, 'render');
      // load the precompiled template
      this.template = Utils.templates.searchlist;
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

    id: "searchlist",
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
      console.log(this.collection);

      $(this.el).html(this.template({
          Products : this.collection.products,
          Category : this.collection.category
      }));
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
      console.log("doSearch " + searchQuery);
      Backbone.history.navigate("gotosearchresult/" + searchQuery,{trigger: true});

    },
    doSearchRapid : function(event){

      if (event.keyCode === 13) {
        var searchQuery = $('#search').val();
        console.log("doSearchRapid "+searchQuery);
        Backbone.history.navigate("gotosearchresult/" + searchQuery,{trigger: true});
      }
    }
  });

          return SearcListView;

});
