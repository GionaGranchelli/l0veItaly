define(function (require) {
    var Backbone = require("backbone");
    var Image = Backbone.Model.extend({
        initialize: function () {
        },
        url: 'http://192.168.56.101/loveitaly/api/products/',
        addIdProduct : function(idProduct){
            var url = this.url;
            url += idProduct + '/';
            this.url = url;
        },
        addIdImage : function(idImage){
            var url = this.url;
            url += idImage + '/?display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
            this.url = url;
        }
      });
return Image;
});
