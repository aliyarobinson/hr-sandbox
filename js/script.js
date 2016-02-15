var HR = HR || {};

(function($){

  HR = {

    pages: [],
    currPageArr: location.pathname.split('/'),
    currPage: location.pathname.split('/').pop().split('.')[0],

    init: function () {
      HR.getPages();
      HR.preload();
      HR.homeAnim();
      console.log('currPageArr: ', HR.currPageArr);
      console.log('currPage: ', HR.currPage);

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
      $('.site-nav .list-nav a').on('click', function (e) {
        e.preventDefault();
        console.log('clicked nav link');
        var linkName = $(this).attr('href').split('.')[0];
        var pageClass = '.' + linkName + '-page';
        console.log('linkName: ', linkName);
        $('body').attr('class','');
        $('body').attr('class',linkName);
        // $('.content-container').hide();
        $('.content-holder .wrapper').contents().remove();
        var pageClone = $(pageClass).contents().clone();
        $('.content-holder .wrapper').append(pageClone);

        // location.pathname = 'other/hakim/hakim-minimal/' + linkName + '.html';


      });
    },

    getPages: function() {
      HR.pages.push('index');
      $('.site-nav .list-nav a').each(function(i){
        var pageURL = $(this).attr('href').split('.')[0];
        HR.pages.push(pageURL);
      });
    },

    preload: function () {
      // for each page create an element with contents from the page
      for (var i = 0; i < HR.pages.length; i++) {
        var pages = HR.pages;
        var pageBaseURL = "http://localhost:8888/other/hakim/hakim-minimal/";

        // SHOULD CREATE A DOC FRAGEMENT HERE BEFORE LAUNCH

        // Create & add element to main content wrapper
        $('<div class="content-container ' + pages[i] + '-page" />').appendTo('.main-content > .wrapper');

        // Populate element with corresponding content
        $( '.content-container.'+pages[i]+'-page' ).load( pageBaseURL + pages[i] + '.html .content-container section');

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
    }

  };





  // find .content-containter -  make display:none;
  // find page by url
  // trigger click of navigation

 


  

  /**************************************/
  /*   Navigation Content Switch Animation on click
  /***************************************************/
  // $('.site-nav .list-nav a').on('click', function (e) {
  //   e.preventDefault();

  //   var linkURL = $(this).attr('href');
  //   var pageURL = "http://localhost:8888/other/hakim/hakim-minimal/" + linkURL;

  //   /* Create container for new page contents  */

  //   $('.main-content .wrapper').append('<div class="content-container" />')

  //   /* Load new page contents  */

  //   $( ".content-container:nth-child(2)" ).load( pageURL + " .content-container section" );

  //   /*   */



  //   // get page name from url
  //   // find .content-containter - 
  //   // create a new .content-container under it as a sibling
  //   // ajax load second .content-container with page content
  //   // remove first container
  //   // fade in second container

  //   $('.content-container').animate({

  //   }, 1000);

  // })
})(jQuery); // end SEF

HR.init();