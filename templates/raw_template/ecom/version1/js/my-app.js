// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

 var mySwiper = myApp.swiper('.swiper-container', {
    pagination:'.swiper-pagination',
    paginationClickable: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false
  });

 var mySwiper = myApp.swiper('.swiper-container2', {

  });
 var mySwiper = myApp.swiper('.swiper-container3', {

  });

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

(function ($) {
 "use strict";
    
$(document).ready(function(){
    /*------------------------
    menu toggle
    --------------------------*/

    $(".js-toggle-menu").on('click', function(){
        $(".show-menu").slideToggle();
    });
    
    $(".js-toggle-menu2").on('click', function(){
        $(".show-menu2").slideToggle();
    });
    
    $( '.swipebox' ).swipebox();

  $(".clickopen").on('click', function(){
        $(".popover-links").slideToggle();
    });
     
    
});
    
    
    
})(jQuery);  
