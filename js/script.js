// "use strict"; 

var HR = HR || {};

(function($){

  HR = {

    currPageName:"",

    init: function () {
        
      HR.updatePageName();
      HR.prepTransition();
      HR.transitionContent();
        
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
      $('[data-content]').on('click', function (e) {
        // e.preventDefault();
        console.log('clicked nav link');
        
        // location.hash = $(this).attr('href');
        
      });

    },
    
    updatePageName: function() {
        HR.currPageName = location.hash;
        console.log('updatePageName - name: ', HR.currPageName);
    },
    
    transitionContent: function(page){
        console.log('transitionContent - name: ', HR.currPageName);
    },
    
    prepTransition: function(page){
        console.log('prepTransition - name: ', HR.currPageName);
        $('#content-holder').css({
          'opacity': 0
        })
        
        if (!HR.isEmpty($('#content-holder'))) {
            $('#content-holder').empty();
        }

        var pageContent = $(page).contents().clone();
        // var pageName = page.toString();
        console.log('page: ', page);
        console.log('pageContent: ', pageContent);
        var pageName = location.hash.replace('#', '');
        console.log('pageName: ', pageName);

        // console.log('pageName: ', pageName);
        $("body").attr('class','');
        $('body').addClass(pageName);
        pageContent.appendTo('#content-holder');
        $('#content-holder').animate({
          opacity: 1
        },600);
    },
    
    locationHashChanged: function () {
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