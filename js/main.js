jQuery(document).ready(function ($) {

  $('.loader').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
  var $win = $(window);
  var winH = $win.height();

  // Header fixed and Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
      $('#mobile-nav-toggle').addClass('mobile-nav-margin');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
      $('#mobile-nav-toggle').removeClass('mobile-nav-margin');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').append('<div id="mobile-body-overly"></div>');

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('icon-menu icon-close');
      $('#mobile-body-overly').toggle();
    });

    $( window ).resize(function(e) {
      nav_close(e);
    });

    $(document).click(function (e) {
      nav_close(e);
    });

  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  function nav_close(e) {
    var container = $("#mobile-nav, #mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('icon-menu icon-close');
        $('#mobile-body-overly').fadeOut();
      }
    }
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not(.nav-link').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('icon-menu icon-close');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  var hero_carousel = $(".hero_carousel");

  hero_carousel.owlCarousel({
    autoplay: false,
    loop: true,
    dots: false,
    nav: true,
    navText: ["<a class='btn_floating prev'><span class='icon-chevron-left'></span></a>","<a class='btn_floating next'><span class='icon-chevron-right'></span></a>"],
    autoplayTimeout: 7000,
    autoplaySpeed: 7000,
    items: 1,
    animateIn: 'fadeIn', 
    animateOut: 'fadeOut',
    onChanged: callBack,
    onTranslate: video_pause,
    onTranslated: video_play
  });  

  $(document).on("click", ".unmute", function() {
    var video = $(this).attr("data-video");
    $("#video_bg").prop('muted', false);
    $(this).css('display','none');
    $(".video_toggle_btn + button").css('display','block');
  });

  $(document).on("click", ".mute", function() {
    var video = $(this).attr("data-video");
    $("#video_bg").prop('muted', true);
    $(this).css('display','none');
    $(".video_toggle_btn").prev().css('display','block');
  });

  function video_pause (event) {
    $("#video_bg").prop('muted', true);
  };

  function video_play (event) {
    $('.owl-item.active .unmute').css('display','block');
    $('.owl-item.active .mute').css('display','none');
  }

  function callBack(event) {
    var current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
    var allItems = event.item.count;
    if (current > allItems || current <= 0) {
      current = allItems - (current % allItems);
    }
    if(current==1) {
      $('.slide_one .hero_content').fadeIn();
      hero_carousel.trigger('stop.owl.autoplay');
      $('.slide_one .hero_content').delay(3000).fadeOut('slow');
    }
    if(current==2 || current==3){
      hero_carousel.trigger('play.owl.autoplay')
    }
  }

  // Logos carousel (uses the Owl Carousel library)
  $(".logo_carousel").owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,
    loop: true,
    dots: false,
    lazyLoad: true,
    responsiveClass: true,
    slideTransition: 'linear',
    autoplayTimeout: 1000,
    autoplaySpeed: 1000,
    responsive: {
      0: {
        items: 1
      },
      601: {
        items: 2
      },
      901: {
        items: 3
      },
      1024: {
        items: 5
      }
    }
  });  

  //Testimonials carousel (uses the Owl Carousel library)
  $(".testimonial_carousel").owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,
    loop: true,
    dots: false,
    responsiveClass: true,
    slideTransition: 'linear',
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1200:  {
        items: 3
      }
    }
  });

  //Gallery carousel (uses the Owl Carousel library)
  $(".gallery_carousel").owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,
    loop: true,
    dots: false,
    responsiveClass: true,
    slideTransition: 'linear',
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 1
      },
      601: {
        items: 2
      },
      768: {
        items: 3
      },
      1200:  {
        items: 4
      }
    }
  });

  $('.gallery_carousel').lightGallery({
    selector: '.owl-item:not(.cloned) .gallery_thumb',
    mode: 'lg-fade',
    cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)'
  });

  //Articles carousel (uses the Owl Carousel library)
  $(".article_carousel").owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,
    loop: true,
    dots: false,
    responsiveClass: true,
    slideTransition: 'linear',
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 2
      },
      601: {
        items: 3
      },
      768: {
        items: 3
      },
      901: {
        items: 4
      },
      1200:  {
        items: 5
      }
    }
  });

  $('#gallery_view_2019').on('click', function() {
    $('#firstItem_2019').trigger('click');
  });

  $('#gallery_view_2018').on('click', function() {
    $('#firstItem_2018').trigger('click');
  });

  $('.article_carousel').lightGallery({
    selector: '.owl-item:not(.cloned) .article_thumb',
    mode: 'lg-fade',
    cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)'
  });

  // Season Tabs
  $('.nav-tabs a').click(function(){
    $('.nav-tabs li').removeClass('active');
    $(this).parent().addClass('active');
    $('.tab_content').hide();
    var activeTab = $(this).attr('href');
    $(activeTab).fadeIn();
    return false;
  });


  $win.on("scroll", function () {
      if ($(this).scrollTop() > winH ) {
        $("#video_bg").prop('muted', true);
        $('.owl-item .unmute').css('display','block');
        $('.owl-item .mute').css('display','none');
      }
    }).on("resize", function(){ // If the user resizes the window
       winH = $(this).height(); // you'll need the new height value
    });


});
