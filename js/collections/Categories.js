define(function (require) {
    var Backbone = require("backbone");
    var Category = require("models/Category");
    
    var Categories = Backbone.Collection.extend({
        initialize: function () {
           
        },
        model: Category,
        url: 'http://loveitaly.altervista.org/api/categories/?display=full&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
        parse: function (data) {
            return data.categories;
        },
        addLimit : function (x,y){
            this.url = this.url +"&limit=" + x+ "," + y;
            return this.url;
        }
    });
    return Categories;
});