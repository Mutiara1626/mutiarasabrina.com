!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Hero typed slide up multi text
  if ($('.typed').length) {
    var wordIndex = 0;
    var wordLists = [
      "Welcome!",
      "Selamat Datang!",
      "Wilujeung!",
      "Hwan-yeong!",
      "Irasshaimase!",
      // Tambahkan kata-kata lain di sini
    ];
  
    var container = $('.typed');
    container.html('<span class="typed-text">' + wordLists[wordIndex] + '</span>'); // Tampilkan kata pertama
  
    // Tambahkan durasi sebelum menampilkan kata "Welcome"
    setTimeout(function () {
      $('.typed-text').addClass('active'); // Tambahkan kelas 'active' untuk memicu animasi Slide Up

      setInterval(function () {
        $('.typed-text').removeClass('active');  // Hapus teks saat ini
    
        // Atur jeda sebelum menambahkan kata berikutnya
        setTimeout(function () {
          wordIndex = (wordIndex + 1) % wordLists.length; // Pindah ke kata berikutnya dalam daftar

          // Tambahkan kata berikutnya
          container.html('<span class="typed-text">' + wordLists[wordIndex] + '</span>');
    
          // Tambahkan kelas 'active' untuk memicu animasi Slide Up
          setTimeout(function () {
            $('.typed-text').addClass('active');
          }, 50); // Sesuaikan jeda sesuai kebutuhan
        }, 500); // Sesuaikan jeda sebelum menambahkan kata berikutnya
      }, 2000); // Sesuaikan interval perubahan kata sesuai kebutuhan
    }, 1000);
  }
  
  // JUDUL
  if ($('#hero h1 .hero-text').length) {
    var typed_strings_h1 = $("#hero h1 .hero-text").data('typed-items');
    typed_strings_h1 = typed_strings_h1.split(',')
    new Typed('#hero h1 .hero-text', {
      strings: typed_strings_h1,
      loop: true,
      typeSpeed: 100,
      backSpeed: 150,
      backDelay: 1000,
      startDelay: 500
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 300;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 200) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $('.venobox').venobox({
      'share': false
    });

    // Initiate aos_init() function
    aos_init();

  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);

