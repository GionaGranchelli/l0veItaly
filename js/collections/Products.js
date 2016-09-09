define(function (require) {

    var Backbone = require("backbone");
    var Product = require("models/Product");
    var Products = Backbone.Collection.extend({
        initialize: function () {

        },
        initiale : 0,
        finale : 0,
        category: undefined,
        model: Product,
        url : 'http://loveitaly.altervista.org/api/products/?display=full&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
        setLimit : function(limite){
          this.url += '&limit=' + encodeURIComponent(limite);
          finale = limite;
        },
        setRange : function(initiale, limite){
          this.url += '&limit=' +encodeURIComponent(initiale) + ',' + encodeURIComponent(limite);
          this.initiale = initiale;
          this.finale = limite;
        },
        setCategory : function(category){

          this.url += '&filter[id_category_default]=[' + category + ']';
          this.category = category;
        },
        setFarm : function(farm){
          this.url += '&filter[id_manufacturer]=[' + farm + ']';
        },
        getLimit :function(){
          return this.finale;
        },
        getInitial : function(){
          return this.initiale;
        },
        setPagination : function( iniziale , finale){
          this.url = 'http://loveitaly.altervista.org/api/products/?display=full&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
          this.url += '&limit=' +encodeURIComponent(iniziale) + ',' + encodeURIComponent(finale);
          if(this.category === undefined){
            // console.log("category undefined");
          }else {
              this.setCategory(this.category);
          }
        },
        parse: function (data) {
          console.log(this.base);
            return data.products;
        }
    });
    return Products;
});
