// "use strict"; 

var HR = HR || {};

(function($){

  HR = {

    currPageName:"",
    homeState: false,

    init: function () {
        console.log('init');
      HR.updatePageName();
      // HR.prepTransition();
      // HR.transitionContent();
      

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

// <iframe width="853" height="480" src="https://www.youtube.com/embed/ebskHpNblZU?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

      /**************************************/
      /*   Preping Videos
      /***************************************************/
      // HR.createVidArr();
      // HR.createVidPoster();
      // HR.bindVidEvent();
      HR.addVideoImgs();
      HR.bindVidEvent();

      // $('.video').on('click', function() { console.log('!!!'); });
      $(document).on('click', '.video', function() { 
        console.log('!!!'); 
        var vidID = $(this).attr('id');

        var iframe_url = "https://www.youtube.com/embed/" + vidID + "?autoplay=1&autohide=1";
    
        // The height and width of the iFrame should be the same as parent
        var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url })

        // Replace the YouTube thumbnail with YouTube HTML5 Player
        $(this).append(iframe);
      });

      window.onpopstate = function (e) {
        console.log('*****************onpopstate triggered*********************');
        var thisPage = location.href.split('/')[location.href.split('/').length -1 ];
        var thisPageName = thisPage.replace('.html','');
        console.log('popstate - thisPage: ', thisPage);
        if (thisPage === ""){
          // thisPage = 'index.html';
          thisPageName = 'index';
          // history.pushState({page: 'index'}, null, thisPage);
          // return;
        }
        // ($(this).attr('href')) ? $(this).attr('href') : $(this).attr('xlink:href');
        // $('[href="'+ thisPage +'"]').trigger('click');

        HR.updatePageName();

        HR.transitionContent(thisPageName);
      }


      $(document).on('click', '.site-nav .list-nav a, .logo', function(e) { 
        e.preventDefault();
        console.log('*****************nav click*********************');

        if(typeof History === "function") {
          console.log('history!');

          var href = ($(this).attr('href')) ? $(this).attr('href') : $(this).attr('xlink:href');
          var thisPage = href.replace('.html','');

          history.pushState({page: thisPage}, null, href);

          HR.updatePageName();

          HR.transitionContent(thisPage);
        }
      });


      // $(".video").each(function() {
      //   var vidID = $(this).attr('id');
      //   console.log('youtube id: ', vidID);

      //   // Based on the YouTube ID, we can easily find the thumbnail image
      //   $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/hqdefault.jpg)');
    
      //   // Overlay the Play icon to make it look like a video player
      //   $(this).append($('<div/>', {'class': 'play'}));
    
      //   // $(document).delegate('#'+vidID, 'click', function() {
      //   $(this).find('.play').on('click', function(e) {
      //       console.log('video');
      //       // Create an iFrame with autoplay set to true
      //       var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
      //       if ($(this).data('params')) iframe_url+='&'+$(this).data('params');
    
      //       // The height and width of the iFrame should be the same as parent
      //       var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })
    
      //       // Replace the YouTube thumbnail with YouTube HTML5 Player
      //       $(this).replaceWith(iframe);
      //   });
      // });
        

      /**************************************/
      /*   Binding load and hashchange events
      /***************************************************/  
      window.onhashchange = HR.locationHashChanged;
      $(window).on('load', HR.updatePageContent );



      /**************************************/
      /*   Site Nav button animation on click
      /***************************************************/
      $('.site-nav-btn').on('click', function(){
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



      /**************************************/
      /*   Navigation Content Switch Animation on click
      /***************************************************/
      // $('[data-content]').on('click', function (e) {
      //   // e.preventDefault();
      //   console.log('clicked nav link');
        
      //   // location.hash = $(this).attr('href');
        
      // });

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
      // test if loaded
      // var imgs = $('img');
      $('image').load(function() {
        console.log('imagesLoaded');
        return true;
      });
      // $('image').bind('load', function() {
      //   console.log('new image loaded: ' + $(this).attr('xlink:href'));
      // });
    },

    addVideoImgs: function() {
        console.log('addVideoImg');

      $('.video').each(function(i){
        var
        $this = $(this), vidID = $this.attr('id');

        // HR.vids.push(vidID);

        // $this.append('<img src="http://i.ytimg.com/vi/' + vidID + '/hqdefault.jpg" />');
        // $this.append('<a href="#" class="play-vid"><span class="icon st-icon-triangle-down st-shape-icon"></span></a>');
        // $this.on('click', HR.swapImgVid(vidID, $this));
        // $this.on('click', function(){
        //   console.log('clicked vid img');
        //   $this.call($this, swapImgVid(vidID, $this));
        // });
      })
    },

    bindVidEvent: function() {
        console.log('bindVidEvent');

      $('.video').each(function(i){
        console.log('bindVidEvent video');
        var 
        $this = $(this), vidID = $this.attr('id');

        $this.on('click', HR.swapImgVid(vidID, $this));

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

    videosLoaded: function() {
      $('iframe').load(function() {
        console.log('videosLoaded');
        return true;
      });
    },

    createVidArr: function (vids){
      // for each .video, get the data-id and place in the HR.vidArr property
    },

    createVidPoster: function (vidArr) {
      // for each vidArr element append an a tag that goes to the video url and to images inside of the a tag (the postser and the play button(pointer-events: none)
    },

    bindVidEvent: function (vidArr) {
      // for each vidArr a tag preventDefault, then load iframe video under images, then fade out images, then place images under video or remove images
    },

    transitionContent: function(page){
        console.log('*****************transitionContent*********************');

        console.log('transitionContent - name: ', HR.currPageName);
        HR.imagesLoaded();
        // if (HR.imagesLoaded && HR.videosLoaded){
        if (HR.imagesLoaded){
          if(page === 'index'){
            HR.homeAnim();
          }

          // $('.loader').animate({
          //   'opacity':0
          // },400)
          // .css({
          //   'display': 'none'
          // });

          // $('#content-holder').animate({
          //   opacity: 1
          // },600);
        }
          
        $( "#content-holder" ).load( page + ".html .content-container section" );

        $('body').attr('class', '').addClass(page + '-page');

        $('.loader').animate({
          'opacity':0
        },400)
        .css({
          'display': 'none'
        });

        $('#content-holder').animate({
          opacity: 1
        },600);


        // history.pushState({'pagename: '+page, null, page + '.html'});
    },
    
    prepTransition: function(page){
        console.log('prepTransition - name: ', HR.currPageName);
        $('#content-holder').css({
          'opacity': 0
        })
        
        if (!HR.isEmpty($('#content-holder'))) {
            $('#content-holder').empty();
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
    
    locationHashChanged: function () {
        console.log('locationHashChanged');
        HR.updatePageContent();
        // HR.updatePageName();
        // HR.prepTransition(HR.currPageName);
        // HR.transitionContent(HR.currPageName);
    },

    updatePageContent: function () {
        HR.updatePageName();
        // HR.prepTransition(HR.currPageName);
        HR.transitionContent(HR.currPageName);
    },
    
    isEmpty: function( el ){
        return !$.trim(el.html())
    }
  };
})(jQuery); // end SEF

HR.init();