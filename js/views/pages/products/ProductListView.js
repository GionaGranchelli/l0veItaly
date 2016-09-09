define(function(require) {

  var Backbone = require("backbone");
  //  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var ProductDetailView = require('views/pages/products/ProductDetailView');
  var Products = require("collections/Products");
  var Categories = require("collections/Categories");

  var ProductListView = Utils.Page.extend({

    constructorName: "ProductListView",
    collection: Products,
    model: Categories,
    initialize: function() {
      this.cat = window.localStorage.getItem('CategoryId');
      _.bindAll(this, 'render');
      // load the precompiled template
      this.template = Utils.templates.productlist;
      this.collection.on('sync', this.render, this);
      this.model.on('sync', this.render, this);
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
    cat: undefined,
    events: {
      "tap #goToMap": "goToMap",
      "tap #goToProductDetail" : "goToProductDetail",
      "scroll" : "fetchSheets",
      "tap #searchButton" : "doSearch",
      "keypress #search": "doSearchRapid",
      "change #categorySelector" : "chooseCategory"
    },

    render: function() {
      $(this.el).html(this.template({
        Prodotti: this.collection.toJSON(),
        Categorie: this.model.toJSON()
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
    doSearch : function(ev){
      var searchQuery = $('#search').val();
      console.log(searchQuery);
      this.cat = window.localStorage.getItem('CategoryId');
      console.log(this.cat);
      if(typeof this.cat === undefined){
          // console.log("Undef");
          Backbone.history.navigate("gotosearchresult/" + searchQuery,{trigger: true});
      }else{
        if(this.cat == 0){
          // console.log("sei zero");
          Backbone.history.navigate("gotosearchresult/" + searchQuery,{trigger: true});
        }else{
          // console.log("def");
          Backbone.history.navigate("gotosearchresultcategory/" + searchQuery + "/"+ this.cat,{trigger: true});
        }

      }

      var categoria=  $('select>option').data('CategoryId');
    },
    doSearchRapid : function(event){
      console.log(event.keyCode);
      if (event.keyCode === 13) {
        console.log($('#search').val());

        var searchQuery = $('#search').val();
        console.log(searchQuery);
        Backbone.history.navigate("gotosearchresult/" + searchQuery,{trigger: true});
      }
    },
    chooseCategory : function(ev){
      var cateCatch = $("#categorySelector").val();

      window.localStorage.setItem('CategoryId', cateCatch);


    }
  });

          return ProductListView;

});
