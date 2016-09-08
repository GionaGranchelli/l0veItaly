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
    pagination:true,
    paginationClickable: true,
    autoplay: 7000,
    autoplayDisableOnInteraction: false
  });


 /*---------------------
 index page
--------------------- */ 
myApp.onPageInit('index', function (page) {

});
 /*---------------------
 single-product  page
--------------------- */ 
myApp.onPageInit('product', function (page) {
  var mySwiper = myApp.swiper('.swiper-container2', {
    paginationClickable: true,
    autoplay: 1000,
    autoplayDisableOnInteraction: false
  });
});
 /*---------------------
 notification
--------------------- */ 
myApp.onPageInit('notification', function (page) {

$$('.notification-default').on('click', function () {
    myApp.addNotification({
        title: 'Framework7',
        message: 'This is a simple notification message with title and message'
    });
});
$$('.notification-full').on('click', function () {
    myApp.addNotification({
        title: 'Framework7',
        subtitle: 'Notification subtitle',
        message: 'This is a simple notification message with custom icon and subtitle',
        media: '<i class="icon icon-f7"></i>'
    });
});
$$('.notification-custom').on('click', function () {
    myApp.addNotification({
        title: 'My Awesome App',
        subtitle: 'New message from John Doe',
        message: 'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',
        media: '<img width="44" height="44" style="border-radius:100%" src="img/user.png">'
    });
});
$$('.notification-callback').on('click', function () {
    myApp.addNotification({
        title: 'My Awesome App',
        subtitle: 'New message from John Doe',
        message: 'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',
        media: '<img width="44" height="44" style="border-radius:100%" src="img/user.png">',
        onClose: function () {
            myApp.alert('Notification closed');
        }
    });
});


});


 /*---------------------
 image-gallery
--------------------- */  
myApp.onPageInit('image-gallery', function (page) {

$('.galleryimg' ).swipebox();



});

 /*---------------------
 video gallery
--------------------- */  
myApp.onPageInit('video-gallery', function (page) {

var myPhotoBrowserPopupDark = myApp.photoBrowser({
    photos : [
        {
            html: '<iframe width="100%" height="auto" src="https://www.youtube.com/embed/gLg6qxkQ94A?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>',
        },
        {
            html: '<iframe width="100%" height="auto" src="https://www.youtube.com/embed/zj_Ul6lr9PQ" frameborder="0" allowfullscreen></iframe>',
        },
        {
            html: '<iframe width="100%" height="auto" src="https://www.youtube.com/embed/l4xFy8pFQXo?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>',
        },
        {
            html: '<iframe width="100%" src="https://www.youtube.com/embed/gLg6qxkQ94A?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>',
        },
        {
            html: '<iframe width="100%" height="auto" src="https://www.youtube.com/embed/UNOYIQ8V6C8" frameborder="0" allowfullscreen></iframe>',
        },
  
        {
            html: '<iframe width="100%" height="auto" src="https://www.youtube.com/embed/zKtAuflyc5w" frameborder="0" allowfullscreen></iframe>',
        },
  
    ],
    theme: 'dark',
    type: 'standalone'
});
$$('.pb-video').on('click', function () {
    myPhotoBrowserPopupDark.open();
});

});


 /*---------------------
 dashoboard
--------------------- */  
myApp.onPageInit('video-gallery', function (page) {

  $$('.open').on('click', function () {
    myApp.sortableOpen('.sortable');
  });


});

(function ($) {
 "use strict";
    
$(function(){

$( '.swipebox' ).swipebox();


});
    
    
})(jQuery);    

  