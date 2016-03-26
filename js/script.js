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
      /*   Handeling Font issues in Windows
      /***************************************************/
      var OSName="Unknown OS";
      if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
      if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
      if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
      if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

      if (OSName === "Windows") 
      {
        $('p').css('font-wieght',800);
      } 

      /**************************************/
      /*   Video Click image swap
      /***************************************************/
      $(document).on( HR.clickHandler, '.video', function() { 
        console.log('!!!'); 
        var vidID = $(this).attr('id');

        var iframe_url = "https://www.youtube.com/embed/" + vidID + "?rel=0&autoplay=1&autohide=1&showinfo=0";
    
        // The height and width of the iFrame should be the same as parent
        var iframe = $('<iframe/>', {'frameborder': '0', 'allowfullscreen': '', 'src': iframe_url });

        // Replace the YouTube thumbnail with YouTube HTML5 Player
        $(this).append(iframe);
      });

      /**************************************/
      /*   History.popstate
      /***************************************************/
      window.onpopstate = function (e) {
        console.log('*****************onpopstate triggered*********************');
        var thisPage = location.href.split('/')[location.href.split('/').length -1 ];
        var thisPageName = thisPage.replace('.html','');
        console.log('popstate - thisPage: ', thisPage);
        if (thisPage === ""){
          thisPageName = 'index';
        }

        HR.updatePageName();

        HR.transitionContent(thisPageName);
      }

      /**************************************/
      /*   Navigation link click
      /***************************************************/
      $(document).on( HR.clickHandler , '.site-nav .list-nav a, .logo', function(e) { 
        e.preventDefault();
        console.log('*****************nav click*********************');

        // if(typeof History === "function") {
        if( History ) {
          console.log('history!');

          var href = ($(this).attr('href')) ? $(this).attr('href') : $(this).attr('xlink:href');
          var thisPage = href.replace('.html','');

          history.pushState({page: thisPage}, null, href);

          HR.updatePageName();

          HR.transitionContent(thisPage);
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
        // $('.loader').css({
        //   'display': 'block',
        //   'opacity': 1
        // });

        HR.updatePageContent();
      });



      /**************************************/
      /*   Site Nav button animation on click
      /***************************************************/
      $('.site-nav-btn').on( HR.clickHandler , function(){
        $(this).toggleClass('active');
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
      }); // end on click .site-nav-btn

    },
    
    updatePageName: function() {
        console.log('*****************updatePageName*********************');

        var urlPathArr = location.pathname.split('/');
        var urlPageStr = urlPathArr[urlPathArr.length - 1];
        console.log('urlPathArr: ', urlPathArr);
        console.log('urlPageStr: ', urlPageStr);

        if(urlPageStr === '' || null){
          HR.currPageName = 'index';
          console.log('updatePageName - name: ', HR.currPageName);

          return;
        }

        HR.currPageName = urlPageStr.replace('.html','');

        
        console.log('updatePageName - name: ', HR.currPageName);
    },

    imagesLoaded: function() {
      $('image').load(function() {
        console.log('imagesLoaded');
        return true;
      });
    },

    swapImgVid: function(vidID, context) {
      console.log('swapImgVid');
      var iframe_url = "https://www.youtube.com/embed/" + vidID + "?autoplay=1&autohide=1";
    
      // The height and width of the iFrame should be the same as parent
      var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': '100%', 'height': '300px' })

      // Replace the YouTube thumbnail with YouTube HTML5 Player
      context.append(iframe);
    },

    transitionContent: function(page){
        console.log('*****************transitionContent*********************');

        console.log('transitionContent - name: ', HR.currPageName);
        // HR.imagesLoaded();
        if (HR.imagesLoaded){
          if(page === 'index'){
            // $('.loader').addClass('collapsed');
            HR.homeAnim();
          }
        }
          
        $( "#content-holder" ).load( page + ".html .content-container section" );

        $('body').attr('class', '').addClass(page + '-page');

        // $('.loader').animate({
        //   'opacity':0
        // },400)
        // .css({
        //   'display': 'none'
        // });

        $('#content-holder').animate({
          opacity: 1
        },600);
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

    updatePageContent: function () {
        HR.updatePageName();
        HR.transitionContent(HR.currPageName);
    },
    
    isEmpty: function( el ){
        return !$.trim(el.html())
    }
  };
})(jQuery); // end SEF

HR.init();