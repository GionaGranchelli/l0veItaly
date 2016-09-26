define(function(require) {

  var Backbone = require("backbone");
  var Product = require("models/Product");
  var Utils = require("utils");
  var Images = require('collections/Images');
  // var Swiper = require('swiper');


  var ProductDetailView = Utils.Page.extend({

    constructorName: "ProductDetailView",

    model: Product,
    collection: Images,
    initialize: function(productKey) {
      // load the precompiled template
      _.bindAll(this, 'beforeRender', 'render', 'afterRender');
      this.template = Utils.templates.product;
      this.model = new Product({id: productKey});
      this.model.fetch();
      this.collection = new Images();
      this.collection.addIdProduct(productKey);
      this.collection.fetch();
      this.collection.on('sync', this.render, this);
      this.model.on('sync', this.render, this);
      var _this = this;
      this.render = _.wrap(this.render, function(render) {
            _this.beforeRender();
            render();
            _this.afterRender();
            return _this;
      });
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
