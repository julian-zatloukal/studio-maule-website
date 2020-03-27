/* eslint-disable no-undef */
var app = {
    init: function () {
      app.mainFunction();
    },
    mainFunction: function () {

     

      class ContactForm {
  
        static async submitToAPI(e) {
          e.preventDefault();
  
          if (ContactForm.sanitizeAndVerify()) {
            let URL = "https://s19rftjwb7.execute-api.us-east-1.amazonaws.com/test/contact-us";
  
            let name = $("#name-input").val();
            let phone = $("#phone-input").val();
            let email = $("#email-input").val();
            let subject = $("#subject-input").val();
            let desc = $("#description-input").val();
            let ip = await ContactForm.getIPAddrPromise();
            let timestamp = moment().format();
            let grecaptcha_response = grecaptcha.getResponse();
  
            var data_form = {
              ip: ip,
              timestamp: timestamp,
              grecaptcha_response: grecaptcha_response,
              name: name,
              phone: phone,
              email: email,
              subject: subject,
              desc: desc
            };
  
            console.log(data_form);
  
            $.ajax({
              type: "POST",
              url: URL,
              dataType: "json",
              crossDomain: "true",
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(data_form),
              success: function (response) {
                console.log(response);
                // clear form and show a success message
                $('#contact-form').trigger("reset");
                $("#submit_result_area").html("<section style='border-style:solid !important; border-width: 2px !important;' class='jumbotron border border-success bg-transparent text-success text-center pt-1 pb-1 my-4'>  <div class='container'>	<h5 style='margin-bottom: 0.25rem !important;' class='jumbotron-heading'>¡Mensaje enviado exitosamente, gracias por su tiempo!</h3>  </div></section>");
              },
              error: function (response) {
                console.log(response);
                // show an error message
                $("#submit_result_area").html("<section style='border-style:solid !important; border-width: 2px !important;' class='jumbotron border border-danger bg-transparent text-danger text-center pt-1 pb-1 my-4'>  <div class='container'>	<h5 style='margin-bottom: 0.25rem !important;' class='jumbotron-heading'>Se ha producido un error al enviar el mensaje.</h3>  </div></section>");
              }
  
            });
          }
        }
  
  
        static sanitizeAndVerify() {
          let allTestPassed = true;
          if (!ContactForm.verifyField("name-input")) allTestPassed = false;
          if (!ContactForm.verifyField("phone-input")) allTestPassed = false;
          if (!ContactForm.verifyField("subject-input")) allTestPassed = false;
          if (!ContactForm.verifyField("email-input")) allTestPassed = false;
          if (!ContactForm.verifyField("description-input")) allTestPassed = false;
          if (!ContactForm.verifyField("g-recaptcha")) allTestPassed = false;
          console.log("All elements have been validated!");
          return allTestPassed;
        }
  
        static hideVerifyAlert(element_selector) {
          switch (element_selector) {
            case "#g-recaptcha-container":
              if ($(element_selector).hasClass("is-invalid")) {
                $(element_selector).removeClass("is-invalid");
                $(element_selector).next().toggleClass("d-inline-block d-none");
                $(".g-recaptcha-container div div iframe").css({
                  "border-style": "hidden"
                });
                $(".g-recaptcha-container:first-child").removeClass("alert-validate");
              }
  
              break;
            default:
              if ($(element_selector).hasClass("is-invalid")) {
                $(element_selector).removeClass("is-invalid");
                $(element_selector).next().toggleClass("d-inline d-none");
              }
              break;
          }
        }
  
        static showVerifyAlert(element_selector, error_description) {
          switch (element_selector) {
            case "#g-recaptcha-container":
              if (!$(element_selector).hasClass("is-invalid")) {
                $(".g-recaptcha-container div div iframe").css({
                  "border-style": "solid",
                  "border-width": "0.075em",
                  "border-color": getComputedStyle(document.body).getPropertyValue(
                    "--danger"
                  ),
                  "border-radius": "0.25em"
                });
                $(".g-recaptcha-container:first-child").css({
                  "position": "relative",
                });
                $(".g-recaptcha-container:first-child").addClass("alert-validate");
                $(element_selector).addClass("is-invalid");
                $(element_selector).next().toggleClass("d-none d-inline-block");
                $(element_selector).next().html(error_description);
              }
              break;
            default:
              if (!$(element_selector).hasClass("is-invalid")) {
                $(element_selector).addClass("is-invalid");
                $(element_selector).next().toggleClass("d-none d-inline");
                $(element_selector).next().html(error_description);
              }
              break;
          }
        }
  
        static getIPAddrPromise() {
          return new Promise(function (resolve, reject) {
            $.ajax({
              type: 'GET',
              timeout: 1200,
              url: 'https://www.cloudflare.com/cdn-cgi/trace',
              success: function (data) {
                const regexp = RegExp(`[\n\r].*ip=\s*([^\n\r]*)`, 'g');
                var ip_string = regexp.exec(data)[1];
                if (ip_string !== null) {
                  resolve(ip_string);
                } else {
                  reject("Could not fetch ip");
                }
              }
            });
          });
        }
  
        static verifyField(field_id) {
          switch (field_id) {
            case "name-input":
              if ($("#name-input").val().trim() != "") {
                var namere = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,72}$/;
                if (!namere.test($("#name-input").val())) {
                  ContactForm.showVerifyAlert("#name-input", lang.contactForm.nameInput.badFormat);
                  return false;
                } else {
                  ContactForm.hideVerifyAlert("#name-input");
                  return true;
                }
              } else {
                ContactForm.showVerifyAlert("#name-input", lang.contactForm.nameInput.completeThisField);
                return false;
              }
            case "phone-input":
              if ($("#phone-input").val().trim() != "") {
                var mobilere = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;
                if (!mobilere.test($("#phone-input").val())) {
                  ContactForm.showVerifyAlert("#phone-input", lang.contactForm.phoneInput.badFormat);
                  return false;
                } else {
                  ContactForm.hideVerifyAlert("#phone-input");
                  return true;
                }
              } else {
                ContactForm.hideVerifyAlert("#phone-input");
                return true;
              }
            case "subject-input":
              if ($("#subject-input").val().trim() == "") {
                ContactForm.showVerifyAlert("#subject-input", lang.contactForm.subjectInput.completeThisField);
                return false;
              } else {
                ContactForm.hideVerifyAlert("#subject-input");
                return true;
              }
            case "email-input":
              if ($("#email-input").val().trim() != "") {
                var reeamil = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/;
                if (!reeamil.test($("#email-input").val())) {
                  ContactForm.showVerifyAlert("#email-input", lang.contactForm.emailInput.badFormat);
                  return false;
                } else {
                  ContactForm.hideVerifyAlert("#email-input");
                  return true;
                }
              } else {
                ContactForm.showVerifyAlert("#email-input", lang.contactForm.emailInput.completeThisField);
                return false;
              }
            case "description-input":
              if ($("#description-input").val().trim() != "") {
                var descriptionInputRegex = /^.{0,5000}$/;
                if (!descriptionInputRegex.test($("#description-input").val())) {
                  ContactForm.showVerifyAlert("#description-input", lang.contactForm.descriptionInput.badFormat);
                  return false;
                } else {
                  ContactForm.hideVerifyAlert("#description-input");
                  return true;
                }
              } else {
                ContactForm.showVerifyAlert("#description-input", lang.contactForm.descriptionInput.completeThisField);
                return false;
              }
            case "g-recaptcha":
              if (grecaptcha.getResponse().length == 0) {
                ContactForm.showVerifyAlert("#g-recaptcha-container", lang.contactForm.nameInput.completeThisField);
                return false;
              } else {
                ContactForm.hideVerifyAlert("#g-recaptcha-container");
                return true;
              }
          }
        }
      }
  
      // eslint-disable-next-line no-redeclare
      function scrollHandler(section, parameter) {
        const scrollDelay = 2000;
        switch (section) {
          case 'head':
            if (window.matchMedia("only screen and (max-width: 768px)").matches && $('.navbar-collapse').hasClass("show")) {
              $('.navbar-toggler').trigger('click');
            }
            $('body, html').animate({ scrollTop: 0 }, scrollDelay);
            break;
          case 'services':
            if (window.matchMedia("only screen and (max-width: 768px)").matches) {
              // Mobile
              if ($('.navbar-collapse').hasClass("show")) { $('.navbar-toggler').trigger('click'); }
              $("html, body").stop().animate({
                scrollTop: ($("#servicios-container").offset().top) - ($(window).height() * 0.15)
              }, scrollDelay);
            } else {
              // Desktop
              $("html, body").stop().animate({
                scrollTop: ($("#servicios-container").offset().top) - $("#main-navbar").outerHeight(true) - $("#servicios-container").outerHeight(true) * 0.04
              }, scrollDelay);
            }
            break;
          case 'about-us':
            if (window.matchMedia("only screen and (max-width: 768px)").matches) {
              // Mobile
              if ($('.navbar-collapse').hasClass("show")) { $('.navbar-toggler').trigger('click'); }
              $("html, body").stop().animate({
                scrollTop: ($("#quienes-somos-container").offset().top) - ($(window).height() * 0.16)
              }, scrollDelay);
            } else {
              // Desktop
              $("html, body").stop().animate({
                scrollTop: ($("#quienes-somos-container").offset().top) - $("#main-navbar").outerHeight(true) - $("#quienes-somos-container").outerHeight(true) * 0.32
              }, scrollDelay);
            }
            break;
          case 'our-customers':
            if (window.matchMedia("only screen and (max-width: 768px)").matches) {
              // Mobile
              if ($('.navbar-collapse').hasClass("show")) { $('.navbar-toggler').trigger('click'); }
              $("html, body").stop().animate({
                scrollTop: ($("#nuestros-clientes-container").offset().top) - ($(window).height() * 0.16)
              }, scrollDelay);
            } else {
              // Desktop
              $("html, body").stop().animate({
                scrollTop: ($("#nuestros-clientes-container").offset().top) - $("#main-navbar").outerHeight(true) - $("#nuestros-clientes-container").outerHeight(true) * 0.23
              }, scrollDelay);
            }
            break;
          case 'contact-form':
            if (window.matchMedia("only screen and (max-width: 768px)").matches) {
              // Mobile
              if ($('.navbar-collapse').hasClass("show")) { $('.navbar-toggler').trigger('click'); }
              $("html, body").stop().animate({
                scrollTop: ($("#contact-form-container").offset().top) - ($(window).height() * 0.15)
              }, scrollDelay).promise().then(() => {
                if (arguments.length == 2) {
                  $('#subject-input option')[parameter].selected = true;
                  $('#subject-input').trigger('change');
                }
              });
            } else {
              // Desktop
              $("html, body").stop().animate({
                scrollTop: ($("#contact-form-container").offset().top) - $("#main-navbar").outerHeight(true) - $("#contact-form-container").outerHeight(true) * 0.23
              }, scrollDelay).promise().then(() => {
                if (arguments.length == 2) {
                  $('#subject-input option')[parameter].selected = true;
                  $('#subject-input').trigger('change');
                }
              });
            }
            break;
        }
      }
  
      window.ContactForm = ContactForm;
  
      //#region development
      Object.defineProperty(window, 'veirfy', {
        get: function () {
          ContactForm.verifyField("g-recaptcha");
          return null;
        }
      });
      Object.defineProperty(window, 'ip', {
        get: function () {
          ContactForm.getIPAddrPromise().then(
            result => console.log("IP: " + result),
            error => alert(error)
          );
          return null;
        }
      });
      Object.defineProperty(window, 'time', {
        get: function () {
          console.log(moment().format());
          return null;
        }
      });
      Object.defineProperty(window, 'gresponse', {
        get: function () {
          var response = grecaptcha.getResponse();
          //recaptcha failed validation
          console.log(response);
          return null;
        }
      });
      Object.defineProperty(window, 'scroll', {
        get: function () {
          scrollHandler('contact-form');
          return null;
        }
      });
      //#endregion
  
      //#region listeners-setup
      $("#description-input").on('input', function () {
        $('#character-count').text($("#description-input").val().length);
      });
  
      $("#description-input").on('input', function () {
        $('#character-count').text($("#description-input").val().length);
      });
  
      $("#1.carousel-button").click(function (event) {
        event.preventDefault();
        scrollHandler('contact-form');
      });
  
      $("#2.carousel-button").click(function (event) {
        event.preventDefault();
        scrollHandler('our-customers');
      });
  
      $("#3.carousel-button").click(function (event) {
        event.preventDefault();
        scrollHandler('contact-form');
      });
  
      $("[role='button'].service-card").click(function (event) {
        event.preventDefault();
        var serviceIndex = parseInt($(this).parent().siblings(".service-card").attr('service-index'));
        scrollHandler('contact-form', serviceIndex);
      });
  
      $("#nav-item-contacto").click(function (event) {
        event.preventDefault();
        scrollHandler('contact-form');
      });
  
      $("#nav-item-servicios").click(function (event) {
        event.preventDefault();
        scrollHandler('services');
      });
  
      $("#nav-item-quienes-somos").click(function (event) {
        event.preventDefault();
        scrollHandler('about-us');
      });
  
      $("#nav-item-nuestros-clientes").click(function (event) {
        event.preventDefault();
        scrollHandler('our-customers');
      });
  
      $("#back-to-top").click(function (event) {
        event.preventDefault();
        scrollHandler('head');
      });
  
      $("#nav-item-inico").click(function (event) {
        event.preventDefault();
        scrollHandler('head');
      });
  
      $("#contact-form").submit(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        ContactForm.submitToAPI(e);
      });
      //#endregion
  
      //#region custom-stretch
      $.fn.strech_text = function () {
        var elmt = jQuery(this),
          cont_width = elmt.width();
        var txt;
  
        if (jQuery(this).find('.stretch_it').length > 0) {
          txt = jQuery(this).find('.stretch_it').html();
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
  
      jQuery(window).resize(function () {
        jQuery('.stretch').each(function () {
          jQuery(this).strech_text();
        });
      });
  
      $('.stretch').each(function () {
        $(this).strech_text();
      });
      //#endregion
  
    }
  };
  $(function () {
    app.init();
  });