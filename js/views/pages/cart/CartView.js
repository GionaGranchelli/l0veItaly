define(function(require) {

  var Backbone = require("backbone");
  //  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var Cart = require("collections/Cart");
  var Products = require("collections/Products");

  var CartView = Utils.Page.extend({

    constructorName: "CartView",
    collection: Products,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.cart;
      window.cart.on('itemSubtraction', this.render, this);
      window.cart.on('itemAddiction', this.render, this);
      //$('#back-button').css('display','block');
      //$('#toggle-button').css('display','none');
      //this.collection.on('sync', this.render, this);
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
      "tap #goToCategory" : "category",
      "tap #resetButton" : "svuotaCarrello"
      // "tap .carriveri" : "render"


    },
    //    firequi : function(){
    //
    //        this.render();
    //         this.trigger('fireme');
    //    },
    //    firedownqui : function(){
    //
    //        this.render();
    //          this.trigger('firemeDown');
    //    },
    redirectQui : function(){
      Backbone.history.navigate("carrello", {
        trigger: true
      });
    },

    render: function() {
      var costoTotale = window.cart.totale() + 2;
      $(this.el).html(this.template({articoli : window.cart.models,
        totale : window.cart.totale(),
        totaleColli : window.cart.totaleColli(),
        CostoTotale :  costoTotale
      }));
      //      this.model.toJSON()
      return this;
    },
    svuotaCarrello : function(){
      window.cart.resettami();
      this.render();
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

  return CartView;

});
