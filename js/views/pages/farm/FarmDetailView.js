define(function(require) {

  var Backbone = require("backbone");
//  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var Farm = require('models/Farm');
  var Products = require('collections/Products');

  var FarmDetailView = Utils.Page.extend({

    constructorName: "FarmDetailView",
    model : Farm,
    collection : Products,
    iniziale: 4,
    limit: 8,
    initialize: function(farmKey) {
      // load the precompiled template
      this.template = Utils.templates.farm;
      this.model = new Farm({id:farmKey });
      this.model.fetch();
      this.collection = new Products();
      this.collection .setFarm(farmKey);
      this.collection .fetch();
      this.collection.on('sync', this.render, this);
      this.model.on('sync', this.render, this);
    },

    id: "farm",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",
      "tap #goToProductDetail" : "goToProductDetail",
      "scroll" : "fetchSheets"
    },
    beforeRender : function(){
        this.collection.on('sync', this.render, this);
    },
    render: function() {

     $(this.el).html(this.template({
          model : this.model.toJSON(),
          Products : this.collection.models

      }
      ));
//      $(this.el).html(this.template({Products : }));
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
        this.collection.setFarm(this.model.id);
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
    }
  });

  return FarmDetailView;

});
