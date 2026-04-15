/**
 * @file
 * Behaviors for the vardoc_theme theme.
 */

(function ($, _, Drupal, drupalSettings) {
  Drupal.behaviors.vardoc_theme = {
    attach(context) {
      // vardoc_theme JavaScript behaviors goes here.
    },
  };

  // turned on Sumo Select on any select
  Drupal.behaviors.formStyle = {
    attach(context) {
      // Add sumo select for all select on views exposed form
      if ($('.views-exposed-form').length) {
        if ($('.views-exposed-form select')[0]) {
          $('.views-exposed-form select').each(function () {
            const selectLabel = $(this).parent().find('label').text();
            $(this, context).SumoSelect({
              placeholder: selectLabel,
              search: true,
              searchText: 'Search text',
            });
          });
        }
      }
      $('.ni-zoom-split-in').click(function (e) {
        setTimeout(function () {
          $('.block-views-exposed-filter-blockbook-search-page-search')
            .find('input')
            .focus();
        }, 750);
      });
    },
  };

  Drupal.behaviors.stickyHeader = {
    attach(context) {
      let prevScrollpos = window.pageYOffset;
      const $header_navbar = $('body header.navbar');

      $(window).on('load resize scroll', function () {
        const winTop = $(window).scrollTop();
        const currentScrollPos = window.pageYOffset;

        // Start the sticky header style
        if (winTop >= 150) {
          $header_navbar.addClass('sticky-header');
          $header_navbar.removeClass('main-header');
          $('body').css('padding-top', '100px');
        } else if (winTop <= 0) {
          $header_navbar.removeClass('sticky-header');
          $header_navbar.addClass('main-header');
          $('body').css('padding-top', '0px');
        }

        // smart sticky header start working
        if (winTop >= 600) {
          if (prevScrollpos > currentScrollPos) {
            $header_navbar.css({ top: '0px' });
            $('.toolbar-fixed header.navbar').css('top', '79px');
          } else if (prevScrollpos < currentScrollPos) {
            $header_navbar.css({ top: '-92px' });
          }
          prevScrollpos = currentScrollPos;
        } else {
          $header_navbar.removeAttr('style');
        }
      });

      $(once('bar-icon-click-event', '.bar-icons-wrapper')).each(function () {
        $(this)
        .on('click', function () {
          $('body header.navbar').toggleClass('expanded-header');
          $('body').toggleClass('body-overflow-hidden');
          $('html').toggleClass('overflow-hidden');
        });
      });
    },
  };

  Drupal.behaviors.booknavigation = {
    attach(context) {
      $(once('menu-click-event', '.block-book-navigation .menu .menu-item span')).each(function () {
        $(this)
        .on('click', function () {
          $(this).parent().children('ul').slideToggle('500');
          $(this).parent().toggleClass('open');
        });
      });
      if ($(window).width() > 1024) {
        $(once('dropdown-hover-event', '.navbar-nav .nav-item.dropdown .dropdown-toggle')).each(function () {
          $(this)
          .hover(function () {
            $(this)
              .parents('.nav-item.dropdown')
              .find('.dropdown-menu')
              .toggleClass('show');
          });
        });
        $(once('dropdown-menu-event', '.navbar-nav .nav-item.dropdown ul.dropdown-menu')).each(function () {
          $(this)
          .hover(function () {
            $(this)
              .parents('.nav-item.dropdown')
              .find('.dropdown-menu')
              .toggleClass('show');
          });
        });
        $(once('avatar-hover-event', '.header-avatar')).each(function () {
          $(this)
          .hover(function () {
            $('.menu--account').toggleClass('show');
          });
        });
        $(once('menu-hover-event', '.menu--account ul')).each(function () {
          $(this)
          .hover(function () {
            $('.menu--account').toggleClass('show');
          });
        });
      }
    },
  };

  // Fix overlaping between the cursor and sticky header
  $(window).on('scroll', function () {
    $('.SumoSelect').removeClass('open');
    $(':focus').blur();
  });
})(window.jQuery, window._, window.Drupal, window.drupalSettings);
