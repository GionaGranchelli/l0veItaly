define(function (require) {
    var Backbone = require("backbone");
    // var Search = require("models/Search");

    var Searchs = Backbone.Collection.extend({
        initialize: function () {

        },
        // model: Search,
        category : undefined,
        products : undefined,
        url: 'http://loveitaly.altervista.org/api/search?language=1&io_format=JSON&display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
        parse: function (data) {
            this.category = data.categories;
            this.products = data.products;
            return this;
        },
        setQuery : function(queryValue){
          this.url += "&query=" + queryValue;
        }
    });
    return Searchs;
});
