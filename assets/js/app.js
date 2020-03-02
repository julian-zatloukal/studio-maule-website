//JQuery Module Pattern

// An object literal
var app = {
  init: function () {
    app.mainFunction();
  },
  mainFunction: function () {
    // jQuery code


    var grecaptchaSuccessfulEvent = function () {
      ContactForm.verifyField("g-recaptcha");
    };

    var grecaptchaExpiredEvent = function () {
      ContactForm.verifyField("g-recaptcha");
    };

    var grecaptchaErrorEvent = function () {
      ContactForm.verifyField("g-recaptcha");
    };

    var successfulGRecaptchaLoading = false;
    var onloadCallback = function () {
      successfulGRecaptchaLoading = true;
      grecaptcha.render($("#g-recaptcha-container")[0], {
        "sitekey": "6LfBRdMUAAAAAFEYhfH9JLBVbQhgO8LU7fIML1ne",
        "callback": grecaptchaSuccessfulEvent,
        "error-callback": grecaptchaErrorEvent,
        "expired-callback": grecaptchaExpiredEvent
      });
    };
    window.onloadCallback = onloadCallback;







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
          let ipv4 = await getIPAddrPromise();
          let timestamp = moment().format();
          let grecaptcha_response = grecaptcha.getResponse();
  
          var data_form = {
            ipv4: ipv4,
            timestamp: timestamp,
            grecaptcha_response: grecaptcha_response,
            name: name,
            phone: phone,
            email: email,
            subject: subject,
            desc: desc,
          };
  
          $.ajax({
            type: "POST",
            url: "https://s19rftjwb7.execute-api.us-east-1.amazonaws.com/test/contact-us",
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data_form),
  
            success: function () {
              // clear form and show a success message
              document.getElementById("contact-form").reset();
              // location.reload();
              $("#submit_result_area").html("<section style='border-style:solid !important; border-width: 2px !important;' class='jumbotron border border-success bg-transparent text-success text-center pt-1 pb-1 my-4'>  <div class='container'>	<h5 style='margin-bottom: 0.25rem !important;' class='jumbotron-heading'>¡Mensaje enviado exitosamente, gracias por su tiempo!</h3>  </div></section>");
            },
            error: function () {
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
            break;
          case "phone-input":
            if ($("#phone-input").val().trim() != "") {
              var mobilere = /^(?=.{2,22}$)(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;
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
            break;
          case "subject-input":
            if ($("#subject-input").val().trim() == "") {
              ContactForm.showVerifyAlert("#subject-input", lang.contactForm.subjectInput.completeThisField);
              return false;
            } else {
              ContactForm.hideVerifyAlert("#subject-input");
              return true;
            }
            break;
          case "email-input":
            if ($("#email-input").val().trim() != "") {
              var reeamil = /^(?!.{254})([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/;
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
            break;
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
            break;
          case "g-recaptcha":
            if (grecaptcha.getResponse().length == 0) {
              ContactForm.showVerifyAlert("#g-recaptcha-container", lang.contactForm.nameInput.completeThisField);
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
              return false;
            } else {
              ContactForm.hideVerifyAlert("#g-recaptcha-container");
              $(".g-recaptcha-container div div iframe").css({
                "border-style": "hidden"
              });
              $(".g-recaptcha-container:first-child").removeClass("alert-validate");
              return true;
            }
            break;
        }
      }
    }



    //$("#description-input").change(() => { ContactForm.verifyField("description-input"); });

    window.ContactForm = ContactForm;

    $("#description-input").on('input', function () {
      $('#character-count').text($("#description-input").val().length);
    });

    function getIPAddrPromise() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          type: 'GET',
          timeout: 1200,
          url: 'https://www.cloudflare.com/cdn-cgi/trace',
          success: function (data) {
            const regex = /(?<=ip=)(.*)(?=[\r\n])/gm;
            var ipv4_string;
            if ((ipv4_string = data.match(regex)) !== null) {
              resolve(ipv4_string[0]);
            } else {
              reject("Could not fetch IPv4");
            }
          }
        });
      });
    }


    //#region development
    Object.defineProperty(window, 'veirfy', {
      get: function () {
        ContactForm.verifyField("g-recaptcha");
        return null;
      }
    });
    Object.defineProperty(window, 'ip', {
      get: function () {
        getIPAddrPromise().then(
          result => console.log("IP: " + result),
          error => alert(error)
        );
        return;
      }
    });
    Object.defineProperty(window, 'time', {
      get: function () {
        console.log(moment().format());
        return;
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
    //#endregion






    $("#1.carousel-button").click(function (event) {
      event.preventDefault();
      scrollToContactForm("");

    });

    $("#2.carousel-button").click(function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $("#nuestros-clientes-divider").offset().top - ($("#nuestros-clientes-divider").outerHeight(true) / 2) - $("#main-navbar").outerHeight()
      }, 2000);
    });

    $("#3.carousel-button").click(function (event) {
      event.preventDefault();
      scrollToContactForm("");
    });



    function scrollToContactForm(subject) {
      //var subject = $("select#subject-input").map(function() {return $(this).val();}).get();
      $('html, body').animate({
        scrollTop: $("#contact-form-whole").offset().top - $("#main-navbar").outerHeight()
      }, 2000, function () {
        $("select#subject-input").val(subject).change();
      });
    }

    $("[role='button'].service-card").click(function (event) {
      event.preventDefault();
      scrollToContactForm($(this).parent().siblings(".service-card").text());
    });

    $("#nav-item-contacto").click(function (event) {
      event.preventDefault();

      $('html, body').animate({
        scrollTop: $("#contact-form-whole").offset().top - $("#main-navbar").outerHeight()
      }, 2000);
    });

    $("#nav-item-servicios").click(function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $("#servicios-container").offset().top - $("#main-navbar").outerHeight() - 10
      }, 2000);
    });

    $("#nav-item-quienes-somos").click(function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $("#quien-somos-divider").offset().top - ($("#quien-somos-divider").outerHeight(true) / 2) - $("#main-navbar").outerHeight()
      }, 2000);
    });

    $("#nav-item-nuestros-clientes").click(function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $("#nuestros-clientes-divider").offset().top - ($("#nuestros-clientes-divider").outerHeight(true) / 2) - $("#main-navbar").outerHeight()
      }, 2000);
    });

    $("#back-to-top").click(function (event) {
      event.preventDefault();
      var body = $("html, body");
      body.stop().animate({ scrollTop: 0 }, 2000, 'swing');
    });

    $("#nav-item-inico").click(function (event) {
      event.preventDefault();
      var body = $("html, body");
      body.stop().animate({ scrollTop: 0 }, 2000, 'swing');
    });

    $("#contact-form").submit(function (e) {
      e.preventDefault();
      ContactForm.submitToAPI(e);
    });

    $.fn.strech_text = function () {
      var elmt = jQuery(this),
        cont_width = elmt.width();

      if (jQuery(this).find('.stretch_it').length > 0) {
        var txt = jQuery(this).find('.stretch_it').html();
        jQuery(this).html(txt);
      } else {
        var txt = elmt.html();
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

  }
};
$(function () {
  app.init();
});
