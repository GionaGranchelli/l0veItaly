define(function (require) {

    var Backbone = require("backbone");
    var Product = require("models/Product");
    var Products = Backbone.Collection.extend({
        initialize: function (option, category, farm) {
            this.initiale = 0;
            this.limite = option;
            this.category = category;
            this.farm = farm;


        },
        model: Product,
        initiale: 0,
        limite : 4,
        category : undefined,
        farm : undefined,
        urlRoot: 'http://loveitaly.altervista.org/api/products/?display=full&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
        url : function(){
          console.log('option-> ' + this.option);
          console.log('typeof option-> ' + typeof this.option);
          console.log('category->' + this.category);
          console.log('typeof category-> ' + typeof this.category);
          console.log('farm->' + this.farm);
          console.log('initial ->' + this.initiale);
          console.log('limit ->' + this.limite);
          var base = this.urlRoot;
          if (typeof this.limite === "number") {
              if( this.initiale === 0 ){
                  base += '&limit=' + encodeURIComponent(this.limite);
              }else{
                  base += '&limit=' +encodeURIComponent(this.initiale) + ',' + encodeURIComponent(this.limite);
              }

          }
          if (this.category !== undefined ) {
              if (typeof category !== "string") {
                  console.log("Products filtered by Category");
                  base += '&filter[id_category_default]=[' + this.category + ']';
              }
          }
          if (this.farm !== undefined) {
              console.log("Products filtered by Farm");
              base += '&filter[id_manufacturer]=[' + this.farm + ']';
          }
          return base;
        },
        parse: function (data) {
          console.log(this.base);
            return data.products;
        }
    });
    return Products;
});
