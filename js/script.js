// "use strict"; 

var HR = HR || {};

(function($){

  HR = {

    currPageName:"",

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



      /**************************************/
      /*   Preping Videos
      /***************************************************/
      HR.createVidArr();
      HR.createVidPoster();
      HR.bindVidEvent();


      $(".video").each(function() {
        var vidID = $(this).attr('id');
        console.log('youtube id: ', vidID);

        // Based on the YouTube ID, we can easily find the thumbnail image
        $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/hqdefault.jpg)');
    
        // Overlay the Play icon to make it look like a video player
        $(this).append($('<div/>', {'class': 'play'}));
    
        // $(document).delegate('#'+vidID, 'click', function() {
        $(this).find('.play').on('click', function(e) {
            console.log('video');
            // Create an iFrame with autoplay set to true
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url+='&'+$(this).data('params');
    
            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })
    
            // Replace the YouTube thumbnail with YouTube HTML5 Player
            $(this).replaceWith(iframe);
        });
      });
        

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
      $('[data-content]').on('click', function (e) {
        // e.preventDefault();
        console.log('clicked nav link');
        
        // location.hash = $(this).attr('href');
        
      });

    },
    
    updatePageName: function() {
        HR.currPageName = location.hash;

        if(location.hash === ''){
          HR.currPageName = location.hash = '#home';
        }
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
        console.log('transitionContent - name: ', HR.currPageName);
        HR.imagesLoaded();
        // if (HR.imagesLoaded && HR.videosLoaded){
        if (HR.imagesLoaded){
          if(location.hash === '#home'){
            HR.homeAnim();
          }

          $('.loader').animate({
            'opacity':0
          },400)
          .css({
            'display': 'none'
          });

          $('#content-holder').animate({
            opacity: 1
          },600);
        }
    },
    
    prepTransition: function(page){
        console.log('prepTransition - name: ', HR.currPageName);
        $('#content-holder').css({
          'opacity': 0
        })
        
        if (!HR.isEmpty($('#content-holder'))) {
            $('#content-holder').empty();
        }

        var pageContent = $(HR.currPageName).contents().clone();
        // var pageName = page.toString();
        console.log('page: ', HR.currPageName);
        console.log('pageContent: ', pageContent);
        var pageName = location.hash.replace('#', '');
        console.log('pageName: ', pageName);

        // console.log('pageName: ', pageName);
        $("body").attr('class','');
        $('body').addClass(pageName);
        pageContent.appendTo('#content-holder');

        // if(location.hash === '#home'){
        //   HR.homeAnim();
        // }
        // $('#content-holder').animate({
        //   opacity: 1
        // },600);
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
        HR.prepTransition(HR.currPageName);
        HR.transitionContent(HR.currPageName);
    },
    
    isEmpty: function( el ){
        return !$.trim(el.html())
    }
  };
})(jQuery); // end SEF

HR.init();