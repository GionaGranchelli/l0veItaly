define(function (require) {

    var Backbone = require("backbone");
    var Customer = require("models/Customer");
    var Utils = require("utils");
    var Login = Utils.Page.extend({
        constructorName: "Login",
        model: Customer,
        email: "",
        password: "",
        initialize: function () {
            this.template = Utils.templates.login;
            this.render;
            //var cust = new Customer({email:this.email});
            //cust.fetch({success:function(){



        },
        // here we can register to inTheDOM or removing events
        // this.listenTo(this, "inTheDOM", function() {
        //   $('#content').on("swipe", function(data){
        //     console.log(data);
        //   });
        // });
        // this.listenTo(this, "removing", functionName);

        id: "myview",
        className: "i-g page",
        events: {
            "tap #goToMap": "goToMap",
            "redirect": "redirect",
            "tap #loginFire": "loginAction"
        },
        render: function (flag) {
            // $("")
            if(flag){
                $(this.el).html(this.template({messaggio:"User e password sbagliati riprova"}));
            }else $(this.el).html(this.template()); 
           
            return this;
        },
        redirect: function (e) {

            Backbone.history.navigate("myview", {
                trigger: true
            });

        },
        loginAction: function (event) {
            event.preventDefault(); // Don't let this button submit the form
            var formValues = {
                email: $('#inputEmail').val(),
                password: $('#inputPassword').val()};
            probCus = new Customer(formValues.email.toString());
            probCus.fetch({
                success: function () {
                    //console.log(probCus);
                     //console.log(probCus).attributes;
                    probLog = probCus.attributes[0];
                    //console.log(probLog);
                    if ((probLog.passwd == formValues.password) & (probLog.passwd == formValues.password)&(probLog!=null)) {
                        window.customer = probLog;
                        window.customer.logged = true;
                       // console.log( window.customer);
                        Backbone.history.navigate("myview", {
                        trigger: true
                    });
                    } else {
                        
                        this.render(true);
                    }
                },
                error: function () {
                    this.render(true);


                }
            });
//            url="http://loveitaly.altervista.org/api/customers/?io_format=JSON&filter[email]=["+formValues.email+"]";
//             var autenticazione = function(xhr) {
//                var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
//                var token = 'Basic '.concat(key64);
//                xhr.setRequestHeader('Authorization', token);
//    }
//            $.ajax({
//            url:url,
//            type:'GET',
//            dataType:"json",
//            beforeSend: function (xhr) {
//                         xhr.setRequestHeader ("Authorization", "Basic " +'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6')
//          },
//            success:function (data) {
//                console.log(["Login request details: ", data]);
//               
//                if(data.error) {  // If there is an error, show the error messages
//                 console.log("error");
//                }
//                else { // If not, send them back to the home page
//                 console.log(data); //  window.location.replace('#');
//                }
//            },error:function (data) {console.log(data)}
//        });



        },
        goToMap: function (e) {
            Backbone.history.navigate("map", {
                trigger: true
            });
        }
    });

    return Login;

});
