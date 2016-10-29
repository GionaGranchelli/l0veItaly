define(function(require) {

  var Backbone = require("backbone");
  //  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var Orders = require("collections/Orders");
  var OrderList = Utils.Page.extend({
    constructorName: "OrderList",
    collection: Orders,
    initialize: function() {
      this.template = Utils.templates.orderlist;
      this.collection = new Orders(window.customer.id);
      this.collection.fetch();
      this.collection.on('sync', this.render, this);
    },
    className: "i-g page",
    events: {
    },
    render: function() {
         console.log(JSON.parse(window.localStorage.getItem('order')));
      $(this.el).html(this.template({
        Ordini: this.collection.toJSON(),
        Pending: JSON.parse(window.localStorage.getItem('order'))
      }));
      return this;
    }
  });

    return OrderList;

});
