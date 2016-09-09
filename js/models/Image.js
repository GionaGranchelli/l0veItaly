define(function (require) {
    var Backbone = require("backbone");
    var Image = Backbone.Model.extend({
        initialize: function () {
        },
        url: 'http://loveitaly.altervista.org/api/products/',
        addIdProduct : function(idProduct){
            var url = this.url;
            url += idProduct + '/';
            this.url = url;
        },
        addIdImage : function(idImage){
            var url = this.url;
            url += idImage + '/?display=full&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
            this.url = url;
        }
      });
return Image;
});
