define(function (require) {
    var Backbone = require("backbone");
    var Image = require("models/Image");

    var Images = Backbone.Collection.extend({
        initialize: function () {

        },
        model: Image,
        baseUrl: 'http://loveitaly.altervista.org/api/images/products/',
        url: function(idProduct){

          return url;

        },
        addIdProduct : function(){
          var url = this.baseUrl;
          url += idProduct + '/?display=full&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
          this.url = url;
        },
        parse: function (data) {
            console.log(data);
            return data;
        }
    });
    return Images;
});
