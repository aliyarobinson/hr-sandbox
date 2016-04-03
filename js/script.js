// "use strict"; 

var HR = HR || {};

(function($){


  HR = {
    currPageName:"",
    homeState: false,
    clickHandler: ('ontouchstart' in document.documentElement ? "touchstart" : "click"),
    isHome: function( page ){
      if(page === '' || page === null || page === 'index'){
        return true;
      }
    },
    homeAnim: function() {
      /**************************************/
      /*   Home Intro Image Animation
      /***************************************************/
      var img_counter = 6;
      var curr_img = $('.lg-logo image');
      var imgInterval = setInterval(function(){ 
        animateImgs();
        if (img_counter === 0){
          clearInterval(imgInterval);
        }
      }, 600);

      function animateImgs(){
        img_counter--;
        console.log("counter: ", img_counter); 
        $img = $('.lg-logo image');
        $img.eq(img_counter).animate({
          'opacity':0
        },300);
        // curr_img.attr('xlink:href', '../intro_imgs/img_'+img_counter+'.jpg' );
      }
    },
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
        console.log('page nofify - ishome: ', HR.isHome(page));
        if(HR.isHome(page)){
          page = 'home';
        }
        console.log('pageContent notified - page: ', page);
        HR.pageState[page]();
      },
      home: function() {
        console.log('home state notified');
        document.querySelector('body').classList.add('home-page');
        HR.transitionContent('index');
        HR.homeAnim();
      },
      bio: function() {
        console.log('bio state notified');
        document.querySelector('body').classList.add('bio-page');
        HR.transitionContent('bio');
      },
      works: function() {
        console.log('works state notified');
        document.querySelector('body').classList.add('works-page');
        HR.transitionContent('works');
      },
      services: function() {
        console.log('services state notified');
        document.querySelector('body').classList.add('services-page');
        HR.transitionContent('services');
      },
      contact: function() {
        console.log('contact state notified');
        document.querySelector('body').classList.add('contact-page');
        HR.transitionContent('contact');
      }
    },
    transitionContent: function(page){
        console.log('*****************transitionContent*********************');

        console.log('transitionContent - name: ', HR.currPageName);
        // HR.imagesLoaded();
        // if (HR.imagesLoaded){
        //   if(page === 'index'){
        //     // $('.loader').addClass('collapsed');
        //     HR.homeAnim();
        //   }
        // }
          
        $( "#content-holder" ).load( page + ".html .content-container section" );

        // $('body').attr('class', '').addClass(page + '-page');

        // $('#content-holder').animate({
        //   opacity: 1
        // },600);
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
          if(HR.isHome(thisPage)){
            thisPage = 'home';
          }
          console.log('nav click - thisPage: ', thisPage); 
          history.pushState(null, null, href);
          HR.pageState[thisPage]();

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
    }
  };
})(jQuery); // end SEF

HR.init();