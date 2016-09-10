
define(function (require) {
    var Backbone = require("backbone");
    var $ = require('jquery');
    var Customer = Backbone.Model.extend({
        initialize: function (param) {
           this.param=param;
           
            
        },
        constructorName:"Customer",
        idAttribute: "id",
        logged:false,
        param:"",
        
        
     
        url: function () {
            
            var url = 'http://loveitaly.altervista.org/api/customers/';
                url += '?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H&filter[email]=['+this.param+']&display=full&io_format=JSON';
               // url += '&filter[email]=['+this.email+']&display=full';
                //
               console.log(url);
            return url;
        }, 
        
        parse : function(data){
            
            return data.customers;
            
            
        },
        printUrl:function(){
            
            console.log(this.url);
            
        }
        
      });
      
return Customer;
});