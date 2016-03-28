// "use strict"; 

var HR = HR || {};

(function($){

  HR = {

    currPageName:"",
    homeState: false,
    clickHandler: ('ontouchstart' in document.documentElement ? "touchstart" : "click"),

    init: function () {
      console.log('init');
      HR.updatePageName();

      var $loading = $('.loader').hide();
      $(document)
        .ajaxStart(function () {
          $loading.show();
        })
        .ajaxStop(function () {
          $loading.hide();
        });
            

      
      /**************************************/
      /*   Video Click image swap
      /***************************************************/
      $(document).on( HR.clickHandler, '.video', function() { 
        console.log('!!!'); 
      });

      /**************************************/
      /*   History.popstate
      /***************************************************/
      window.onpopstate = function (e) {
        console.log('*****************onpopstate triggered*********************');
        var thisPage = location.href.split('/')[location.href.split('/').length -1 ];
        var thisPageName = thisPage.replace('.html','');
      }

      /**************************************/
      /*   Navigation link click
      /***************************************************/
      $(document).on( HR.clickHandler , '.site-nav .list-nav a, .logo', function(e) { 
        e.preventDefault();
        console.log('*****************nav click*********************');

        if( History ) {
          console.log('history!');

          var href = ($(this).attr('href')) ? $(this).attr('href') : $(this).attr('xlink:href');
          var thisPage = href.replace('.html','');
        }
      });

      /**************************************/
      /*   Remove/Add outline on a/button click
      /***************************************************/
      $("body").on("mousedown", "*", function(e) {
        if (($(this).is(":focus") || $(this).is(e.target)) && $(this).css("outline-style") == "none") {
            $(this).css("outline", "none").on("blur", function() {
                $(this).off("blur").css("outline", "");
            });
        }
      });
        

      /**************************************/
      /*   Binding load event
      /***************************************************/  
      $(window).on('load', function(){

      });



      /**************************************/
      /*   Site Nav button animation on click
      /***************************************************/
      $('.site-nav-btn').on( HR.clickHandler , function(){
        $(this).toggleClass('active');
        
      }); // end on click .site-nav-btn

    },
    

  };
})(jQuery); // end SEF

HR.init();