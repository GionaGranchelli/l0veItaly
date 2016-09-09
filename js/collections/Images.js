define(function (require) {
    var Backbone = require("backbone");
    var Image = require("models/Image");

    var Images = Backbone.Collection.extend({
        initialize: function () {

        },
        model: Image,
        url: 'http://loveitaly.altervista.org/api/images/products/',
        addIdProduct : function(idProduct){
          this.url += idProduct + '/?display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
          console.log(this.url);
        },
        parse: function (data) {

          var $xml = $(data);

          return $xml.find('declination').map(function () {
                 var imageHref = $(this).attr('xlink:href');
                 imageHref += "/?display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H";
                 return {"href":imageHref};
                 }).get();
        },
        fetch: function (options) {
        options = options || {};
        options.dataType = "xml";
        return Backbone.Collection.prototype.fetch.call(this, options);
    }
    });
    return Images;
});
