var HR = HR || {};

(function($){

  HR = {

    pages: [],
    currPageArr: location.pathname.split('/'),
    currPage: location.pathname.split('/').pop().split('.')[0],
    currHash: location.hash.split('#').pop(),
    baseURL: location.origin,

    init: function () {
      HR.getPages();
      HR.preload();
      // HR.homeAnim();
      // HR.updateContent(HR.currPage);
      console.log('currPageArr: ', HR.currPageArr);
      console.log('currPage: ', HR.currPage);

      if (HR.currPage === '' || HR.currHash === 'index'){
        console.log('init on load blank path');
        HR.currPage = 'index';
      }
      HR.updateContent(HR.currPage);
      HR.homeAnim();

      // $( window ).load(function() {
      //   console.log('*******************************');
      //   console.log('on load fired');

      //   if (HR.currPage === ''){
      //     console.log('init on load blank path');
      //     HR.currPage = 'index';
      //   }
      //   HR.updateContent(HR.currPage);
      // });

      window.onhashchange = HR.locationHashChanged;

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
      // $('.site-nav .list-nav a').on('click', function (e) {
      $('[data-content]').on('click', function (e) {
        e.preventDefault();
        console.log('clicked nav link');
        var linkName = $(this).data('content');
        HR.updateContent(linkName);
      });

      // $(document).pjax('[data-content]', '.content-holder');
    },

    locationHashChanged: function() {
      if ("onhashchange" in window) {
        console.log('*******************************');
        console.log('locationHashChanged fired');
        currHash = location.hash.split('#').pop();

        if (currHash === ''){
          currHash = 'index';
        }
        HR.updateContent(currHash);
      }
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
        // var pageBaseURL = "http://localhost:8888/other/hakim/hakim-minimal/";
        var pageBaseURL = "http://aliyarobinson.github.io/hakimrobinson/";

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
    },

    updateContent: function (pageName) {
      var linkName = pageName;
      var pageClass = '.' + linkName + '-page';
      console.log('linkName: ', linkName);
      $('body').attr('class','');
      $('body').attr('class',linkName);
      // $('.content-container').hide();
      $('.content-holder .wrapper').contents().remove();
      var pageClone = $(pageClass).contents().clone();
      $('.content-holder .wrapper').append(pageClone);
      location.hash = '#' + linkName;

      // location.pathname = 'other/hakim/hakim-minimal/' + linkName + '.html';
    }
  };
})(jQuery); // end SEF

// HR.init();

window.onload = function() {
  console.log('onload');
  HR.init();

  // // if (!supports_history_api()) { return; }
  // window.setTimeout(function() {
  //   // window.addEventListener("popstate", function(e) {
  //     console.log('popstate');
  //     HR.updateContent(HR.currPage);
  //   // }, false);
  // }, 1);
}

function supports_history_api() {
  return !!(window.history && history.pushState);
}