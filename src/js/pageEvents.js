function scrollHandler(section, parameter) {
  const scrollDelay = 2000;
  switch (section) {
    case 'head':
      if (
        window.matchMedia('only screen and (max-width: 768px)').matches &&
        $('.navbar-collapse').hasClass('show')
      ) {
        $('.navbar-toggler').trigger('click');
      }
      $('body, html').animate({ scrollTop: 0 }, scrollDelay);
      break;
    case 'services':
      if (window.matchMedia('only screen and (max-width: 768px)').matches) {
        // Mobile
        if ($('.navbar-collapse').hasClass('show')) {
          $('.navbar-toggler').trigger('click');
        }
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop:
                $('#servicios-container').offset().top -
                $(window).height() * 0.15
            },
            scrollDelay
          );
      } else {
        // Desktop
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop:
                $('#servicios-container').offset().top -
                $('#main-navbar').outerHeight(true) -
                $('#servicios-container').outerHeight(true) * 0.04
            },
            scrollDelay
          );
      }
      break;
    case 'about-us':
      if (window.matchMedia('only screen and (max-width: 768px)').matches) {
        // Mobile
        if ($('.navbar-collapse').hasClass('show')) {
          $('.navbar-toggler').trigger('click');
        }
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop:
                $('#quienes-somos-container').offset().top -
                $(window).height() * 0.16
            },
            scrollDelay
          );
      } else {
        // Desktop
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop:
                $('#quienes-somos-container').offset().top -
                $('#main-navbar').outerHeight(true) -
                $('#quienes-somos-container').outerHeight(true) * 0.32
            },
            scrollDelay
          );
      }
      break;
    case 'our-customers':
      if (window.matchMedia('only screen and (max-width: 768px)').matches) {
        // Mobile
        if ($('.navbar-collapse').hasClass('show')) {
          $('.navbar-toggler').trigger('click');
        }
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop:
                $('#nuestros-clientes-container').offset().top -
                $(window).height() * 0.16
            },
            scrollDelay
          );
      } else {
        // Desktop
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop:
                $('#nuestros-clientes-container').offset().top -
                $('#main-navbar').outerHeight(true) -
                $('#nuestros-clientes-container').outerHeight(true) * 0.23
            },
            scrollDelay
          );
      }
      break;
    case 'contact-form':
      if (window.matchMedia('only screen and (max-width: 768px)').matches) {
        // Mobile
        if ($('.navbar-collapse').hasClass('show')) {
          $('.navbar-toggler').trigger('click');
        }
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop:
                $('#contact-form-container').offset().top -
                $(window).height() * 0.15
            },
            scrollDelay
          )
          .promise()
          .then(() => {
            if (arguments.length == 2) {
              $('#subject-input option')[parameter].selected = true;
              $('#subject-input').trigger('change');
            }
          });
      } else {
        // Desktop
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop:
                $('#contact-form-container').offset().top -
                $('#main-navbar').outerHeight(true) -
                $('#contact-form-container').outerHeight(true) * 0.23
            },
            scrollDelay
          )
          .promise()
          .then(() => {
            if (arguments.length == 2) {
              $('#subject-input option')[parameter].selected = true;
              $('#subject-input').trigger('change');
            }
          });
      }
      break;
  }
}

class EventHandler {
  // static serviceCardClick(index){
  //   var serviceIndex = parseInt($(button).closest('.card').attr('data-service-index'));
  //   window.scrollHandler('contact-form', serviceIndex+1);
  // }
  static scrollHandlerOnClick(event, section){
    event.preventDefault();
    window.scrollHandler(section);
  }
}
window.EventHandler = EventHandler;

$(function() {
    //#region listeners-setup
$('#description-input').on('input', function() {
    $('#character-count').text($('#description-input').val().length);
  });
  
  $('#description-input').on('input', function() {
    $('#character-count').text($('#description-input').val().length);
  });
  
  $('#back-to-top').click(function(event) {
    event.preventDefault();
    scrollHandler('head');
  });
  
  $('#contact-form').submit(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    ContactForm.submitToAPI(e);
  });
  //#endregion
  
  //#region custom-stretch
  $.fn.strech_text = function() {
    var elmt = jQuery(this),
      cont_width = elmt.width();
    var txt;
  
    if (jQuery(this).find('.stretch_it').length > 0) {
      txt = jQuery(this)
        .find('.stretch_it')
        .html();
      jQuery(this).html(txt);
    } else {
      txt = elmt.html();
    }
  
    var one_line = jQuery('<span class="stretch_it">' + txt + '</span>'),
      nb_char = elmt.text().length,
      spacing = cont_width / nb_char,
      txt_width;
  
    elmt.html(one_line);
    txt_width = one_line.width();
  
    if (txt_width < cont_width) {
      var char_width = txt_width / nb_char,
        ltr_spacing = spacing - char_width + (spacing - char_width) / nb_char;
  
      one_line.css({ 'letter-spacing': ltr_spacing });
    } else {
      one_line.contents().unwrap();
      elmt.addClass('justify');
    }
  };
  
  jQuery(window).resize(function() {
    jQuery('.stretch').each(function() {
      jQuery(this).strech_text();
    });
  });
  
  $('.stretch').each(function() {
    $(this).strech_text();
  });
  //#endregion
});

//Global declares
window.scrollHandler = scrollHandler;