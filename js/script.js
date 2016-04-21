// "use strict"; 

var HR = HR || {};

(function($){


  HR = {
    currPageName:"",
    homeState: false,
    loader: $('.loader'),
    pageAreaElem: $('html'),
    sideNavElem: $('.site-nav'),
    siteNavBtnElem: $('.site-nav-btn'), 
    siteNavLinkElem: $('.list-nav a'), 
    clickHandler: ('ontouchstart' in document.documentElement ? "touchstart" : "click"),
    isHome: function( page ){
      if(page === '' || page === null || page === 'index'){
        return true;
      }
    },

    imagesLoaded: function() {
      $('image, img').load(function() {
        console.log('imagesLoaded');
        return true;
      });
    },

    homeAnim: function() {
      /**************************************/
      /*   Home Intro Image Animation
      /***************************************************/
      var img_counter = 6;
      var curr_img = $('.lg-logo image.show-item');
      var imgInterval = setInterval(function(){ 
        animateImgs();
        if (img_counter === 1){
          console.log('almost end of counter');
        }
        if (img_counter === 0){
          console.log('end of counter');
          $('.ad-module').addClass('active').delay(400).find('.banner-ad').addClass('animate');
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
        if($('.site-nav').hasClass('expanded')){
          HR.sideNav['slideOut']();
        } else {
          HR.sideNav['slideIn']();
        }
      },
      pageAreaNotify: function(dir){
        console.log('pageAreaNotify - dir:', dir);
        if(dir === -1){
          console.log('dir false');
          HR.sideNav['slideOut']();
        }else{
          console.log('dir not false');
        }
      },
      slideOut: function() {
        console.log('slide out');
        $('.site-nav-btn').removeClass('active');
        $('#content-holder a').css({'pointer-events':'auto'});
        $('.site-nav-bkgd').css({'z-index':20});
        $('.site-header').css({'z-index':20});
        $('.list-nav').css({'z-index':20});
        $('.list-nav li a').css({'z-index':20});

        $('.site-nav').velocity({
            'margin-left': '-320px'
          },600);
          $('.site-nav-bkgd').velocity({
            'left': '-150%',
            'opacity': 0
          },600);
        $('.site-nav').removeClass('expanded');
      },
      slideIn: function() {
        console.log('slide in');
        $('.site-nav-btn').addClass('active');
        $('#content-holder a').css({'pointer-events':'none'});

        $('.site-nav').velocity({
            'margin-left':0
          },600);
          $('.site-nav-bkgd').velocity({
            'left': '-50%',
            'opacity': 1
          },600);
        $('.site-nav').addClass('expanded');
      }
    },
    pageArea: {
      observers: [],
      registerObserver: function(observer){
        this.observers.push(observer);
      },
      notifyObservers: function(dir){
        for(var i = 0; i < this.observers.length; i++) {
          this.observers[i].pageAreaNotify(dir);
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
        // if (HR.imagesLoaded){
        //   HR.homeAnim();
        // }
        // HR.homeAnim();
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
        // 
        HR.loader.removeClass('collapsed');
          
        $( "#content-holder .wrapper" ).load( page + ".html .content-container section", function() {
          console.log( "Load was performed." );
          if(HR.isHome(page)){
            if (HR.imagesLoaded){
              HR.loader.addClass('collapsed');
              HR.homeAnim();
            }
          } else {
            HR.loader.addClass('collapsed');
          }
        });

        $('body').attr('class', '').addClass(page + '-page');

        // $('#content-holder').animate({
        //   opacity: 1
        // },600);
    },
    init: function () {
      console.log('init');
      HR.loader.removeClass('collapsed');


      HR.menuBtn.registerObserver(HR.sideNav);
      HR.pageLocation.registerObserver(HR.pageState);
      HR.pageArea.registerObserver(HR.sideNav);

      // var $loading = $('.loader').hide();
      // $(document)
      //   .ajaxStart(function () {
      //     $loader.show(400);
      //   })
      //   .ajaxStop(function () {
      //     $loader.hide(400);
      //   });

        // $( "a" ).keydown(function() {
        //   $(this).css({'outline':'solid'});
        // })
        // .mousedown(function() {
        //   $(this).css({'outline':'none'});
        // });
            

      
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
        // e.stopPropagation();
        e.stopImmediatePropagation();
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
      /*   Video Click image swap
      /***************************************************/
      $(document).on( HR.clickHandler, '.video', function(e) { 
        e.preventDefault();
        console.log('!!!'); 
        var vidID = $(this).attr('id');

        var iframe_url = "https://www.youtube.com/embed/" + vidID + "?rel=0&autoplay=1&autohide=1&showinfo=0";
    
        // The height and width of the iFrame should be the same as parent
        var iframe = $('<iframe/>', {'frameborder': '0', 'allowfullscreen': '', 'src': iframe_url });

        // Replace the YouTube thumbnail with YouTube HTML5 Player
        $(this).append(iframe);
      });

      // $('.content-wrapper .wrapper *').not(".site-nav").on('click', function(e) {
      //   console.log('html click'); 
      //   var dir;

      //   if(HR.sideNavElem.hasClass('expanded')){
      //     dir = -1;
      //   }else {
      //     dir = 1;
      //   }
      //   console.log('dir: ',dir); 
      //   HR.pageArea.notifyObservers(dir);
      // });

      // HR.sideNavElem.on('click', function(e) {
      //   e.stopPropagation();
      // });

      // HR.siteNavLinkElem.on('click', function(e) {
      //   console.log('nav btn click - target: ', e.target);
      //   console.log('nav btn click - current target: ', e.currentTarget);
      //   // e.stopPropagation();
      // });

      // HR.siteNavBtnElem.on('click', function(e) {
      //   console.log('menu btn click - target: ', e.target);
      //   console.log('menu btn click - current target: ', e.currentTarget);
      //   e.stopPropagation();
      // });



      /**************************************/
      /*   Remove/Add outline on a/button click
      /***************************************************/
      // $("body").on("mousedown", "*", function(e) {
      //   // if (($(this).is(":focus") || $(this).is(e.target)) && $(this).css("outline-style") !== "none") {
      //   if (($(this).is(":focus") || $(this).is(e.target)) && $(this).css("outline-style") !== "none") {
      //   // if ($(this).css("outline-style") !== "none") {
      //     $(this).css("outline", "none").on("blur", function() {
      //       $(this)
      //       .off("blur")
      //       .addClass('focus');
      //       // .css("outline", "");
      //     });
      //   }
      // });

      // $("body").on("mousedown", "a:focus, button:focus", function(e) {
      //   console.log('clicked focused element');
      //   $(this).css('outline-color','transparent');
      // });

      // // $("body").on("mouseup mouseleave blur", "a:focus, button:focus", function(e) {
      // $("body").on("blur", "a:focus, button:focus", function(e) {
      //   console.log('clicked focused element');
      //   $(this).css('outline-color','#fff');
      // });


      /**************************************/
      /*   Site Nav button animation on click
      /***************************************************/
      $('.site-nav-btn').on( HR.clickHandler , function(){
        console.log('nav menu btn clicked - ', HR.clickHandler);
        HR.menuBtn.notifyObservers();
      }); // end on click .site-nav-btn
    }
  };
})(jQuery); // end SEF

HR.init();