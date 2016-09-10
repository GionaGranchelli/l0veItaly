define(function(require) {

  var Backbone = require("backbone");
  var Product = require("models/Product");
  var Utils = require("utils");
  var Img = require('collections/Images');
  // var Swiper = require('swiper');


  var ProductDetailView = Utils.Page.extend({

    constructorName: "ProductDetailView",

    model: Product,
    collection: Img,
    initialize: function() {
      // load the precompiled template
      _.bindAll(this, 'beforeRender', 'render', 'afterRender');
      this.template = Utils.templates.product;
      this.collection.on('sync', this.render, this);
      this.model.on('sync', this.render, this);
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);
      var _this = this;
              this.render = _.wrap(this.render, function(render) {
                  _this.beforeRender();
                  render();
                  _this.afterRender();
                  return _this;
              });


      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "product",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap"
    },

    render: function() {
      // console.log("images Dentro render");
      // console.log(this.collection);
      // var arrayImage = {images : )};
      // console.log(arrayImage);


      idProduct: this.model.id,
      $(this.el).html(this.template({
          Product : this.model.toJSON(),
          Immagini : {images : this.collection}
      }));
//      this.model.toJSON()
      return this;
    },

    beforeRender: function() {
      //  console.log('beforeRender');
    },

    afterRender: function() {
        // console.log('afterRender');


    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }

  });

  return ProductDetailView;

});
