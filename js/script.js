// "use strict"; 

var HR = HR || {};

(function($){


  HR = {

    currPageName:"",
    homeState: false,
    clickHandler: ('ontouchstart' in document.documentElement ? "touchstart" : "click"),
    menuBtn: {
        observers: [],
        registerObserver: function(observer){
          this.observers.push(observer);
        },
        notifyObservers: function(){
          for(var i = 0; i < this.observers.length; i++) {
            this.observers[i].notify();
          }
        }
    },
    sideNav: {
      notify: function() {
        console.log('site nav notified');

        $('.site-nav-btn').toggleClass('active');

        if($('.site-nav').hasClass('expanded')){
          $('.site-nav').velocity({
            'margin-left': '-320px'
          },600);
          $('.site-nav-bkgd').velocity({
            'left': '-150%',
            'opacity': 0
          },600);
          $('.site-nav').removeClass('expanded');
        } else {
          $('.site-nav').velocity({
            'margin-left':0
          },600);
          $('.site-nav-bkgd').velocity({
            'left': '-50%',
            'opacity': 1
          },600);
          $('.site-nav').addClass('expanded');
        }
      }
    },
    pageLocation: {
        observers: [],
        registerObserver: function(observer){
          this.observers.push(observer);
        },
        notifyObservers: function(page){
          var thisPage = page;
          for(var i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(thisPage);
          }
        }
    },
    pageState: {
      notify: function(page) {
        console.log('pageContent notified - page: ', page);
        HR.pageState[page]();
      },
      home: function() {
        console.log('home state notified')
      },
      bio: function() {
        console.log('bio state notified')
      },
      works: function() {
        console.log('works state notified')
      },
      services: function() {
        console.log('services state notified')
      },
      contact: function() {
        console.log('contact state notified')
      }

    },

    init: function () {
      console.log('init');

      HR.menuBtn.registerObserver(HR.sideNav);
      HR.pageLocation.registerObserver(HR.pageState);

      // HR.updatePageName();

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
        console.log('video !!!'); 
      });

      /**************************************/
      /*   History.popstate
      /***************************************************/
      window.onload = window.onpopstate = function (e) {
        console.log('*****************onpopstate/onload triggered*********************');
        var thisPage = location.href.split('/')[location.href.split('/').length -1 ];
        var thisPageName = thisPage.replace('.html','');
        console.log('thisPageName: ', thisPageName); 
        HR.pageLocation.notifyObservers(thisPageName);
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
          console.log('nav click - thisPage: ', thisPage); 

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
      // $(window).on('load', function(){

      // });



      /**************************************/
      /*   Site Nav button animation on click
      /***************************************************/
      $('.site-nav-btn').on( HR.clickHandler , function(){
        console.log('nav menu btn clicked - ', HR.clickHandler);
        // $(this).toggleClass('active');
        HR.menuBtn.notifyObservers();
        
      }); // end on click .site-nav-btn

    },
    

  };
})(jQuery); // end SEF

HR.init();