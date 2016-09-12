define(function(require) {

  var Backbone = require("backbone");
  //  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  // var ProductDetailView = require('views/pages/products/ProductDetailView');
  var Seachs = require("collections/Searchs");
  var Categories = require("collections/Categories");
  var SearcListView = Utils.Page.extend({

    constructorName: "SearcListView",
    collection: Seachs,
    model : Categories,
    initialize: function() {

      _.bindAll(this, 'render');
      // load the precompiled template
      this.template = Utils.templates.searchlist;
      this.collection.on('sync', this.render, this);
      $('#back-button').css('display','block');
      $('#toggle-button').css('display','none');
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
      "tap #goToCategory" : "goToCategory",
      "scroll" : "fetchSheets",
      "tap #searchButton" : "doSearch",
      "keypress #search": "doSearchRapid"
    },

    render: function() {


      $(this.el).html(this.template({
          Products : this.collection.products,
          Category : this.collection.category,
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
    goToCategory: function (ev){
        Backbone.history.navigate("gotocategory/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });
    },
    fetchSheets: function () {

      var delta = this.checkScroll();
      console.log(delta);
      if (delta > -10) {
        this.collection.products.setPagination(this.iniziale, this.limit);
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
      this.searchQuery = $('#search').val();
      console.log("searchQuery");
      this.cat = window.localStorage.getItem('CategoryId');
      console.log(this.searchQuery);
      console.log(typeof this.searchQuery);
      console.log("cat");
      console.log(this.cat);
      if(this.searchQuery){
        if(this.cat == 0 || this.cat == undefined || this.cat == null){
            console.log("gotosearchresult");

            Backbone.history.navigate("gotosearchresult/" + this.searchQuery,{trigger: true});

        }else{
            console.log("gotosearchresultcategory");
            Backbone.history.navigate("gotosearchresultcategory/" + this.searchQuery + "/"+ this.cat,{trigger: true});
          }

      }else{
          if(this.cat == 0 || this.cat == undefined || this.cat == null){
            console.log('goToCategory');
            Backbone.history.navigate("goToCategory/" + this.cat,{trigger: true});
          }
      }

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
