define(function(require) {

  var Backbone = require("backbone");
  //  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var OrderDetail = require('views/pages/private/OrderDetail');
  var Orders = require("collections/Orders");

    var OrderList = Utils.Page.extend({

    constructorName: "OrderList",
    collection: Orders,
    initialize: function() {
      this.template = Utils.templates.orderlist;
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

    className: "i-g page",
    events: {
      "tap #goToMap": "goToMap"
//      "tap #goToProductDetail" : "goToOrderDetail",
    },

    render: function() {
      $(this.el).html(this.template({
        Ordini: this.collection.toJSON()
      }));
      //      this.model.toJSON()
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    },
    goToOrderDetail: function(ev){

      Backbone.history.navigate("gotoordertdetail/" + $(ev.currentTarget).data('id'), {
        trigger: true
      });

    }
  });

          return OrderList;

});
