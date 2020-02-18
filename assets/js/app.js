//JQuery Module Pattern

// An object literal
var app = {
  init: function () {
    app.mainFunction();
  },
  mainFunction: function () {
    // jQuery code

    async function submitToAPI(e) {
      e.preventDefault();
      var URL = "https://s19rftjwb7.execute-api.us-east-1.amazonaws.com/test/contact-us";

      var Namere = /[A-Za-z]{1}[A-Za-z]/;
      if (!Namere.test($("#name-input").val())) {
        alert("Name can not less than 2 char");
        return;
      }

      if ($("#phone-input").val() != "") {
        var mobilere = /[0-9]{10}/;
        if (!mobilere.test($("#phone-input").val())) {
          alert("Please enter valid mobile number");
          return;
        }
      }

      if ($("#email-input").val() == "") {
        alert("Please enter your email id");
        return;
      }

      var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
      if (!reeamil.test($("#email-input").val())) {
        alert("Please enter valid email address");
        return;
      }

      var response = grecaptcha.getResponse();
      //recaptcha failed validation
      if (response.length == 0) {
        $('.g-recaptcha div div iframe').css('border', '1px solid red');
        showAlertRecaptcha();
        return false;
      } else {
        hideAlertRecaptcha();
      }


      var name = $("#name-input").val();
      var phone = $("#phone-input").val();
      var email = $("#email-input").val();
      var subject = $("#subject-input").val();
      var desc = $("#description-input").val();
      var ipv4 = await getIPv4Promise();
      var timestamp = moment().format();
      var grecaptcha_response = grecaptcha.getResponse();

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

      console.log(data_form);

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
          $("#submit_result_area").html("<section style='border-style:solid !important; border-width: 2px !important;' class='jumbotron border border-success bg-transparent text-success text-center pt-1 pb-1 my-3'>  <div class='container'>	<h5 style='margin-bottom: 0.25rem !important;' class='jumbotron-heading'>¡Mensaje enviado exitosamente, gracias por su tiempo!</h3>  </div></section>");
        },
        error: function () {
          // show an error message
          $("#submit_result_area").html("<section style='border-style:solid !important; border-width: 2px !important;' class='jumbotron border border-danger bg-transparent text-danger text-center pt-1 pb-1 my-3'>  <div class='container'>	<h5 style='margin-bottom: 0.25rem !important;' class='jumbotron-heading'>Se ha producido un error al enviar el mensaje.</h3>  </div></section>");
        }
      });
    }


    
    $("#description-input").on('input', function () {
      $('#character-count').text($("#description-input").val().length);
    });

    async function getIPv4(callback){
      let promise = new Promise(function(resolve, reject) {
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

      promise.then(
        result => callback(result)
      );
    }


    function getIPv4Promise(){
      return new Promise(function(resolve, reject) {
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
    Object.defineProperty(window, 'show', {
      get: function () {
        showAlertRecaptcha();
        return null;
      }
    });
    Object.defineProperty(window, 'hide', {
      get: function () {
        hideAlertRecaptcha();
        return null;
      }
    });
    Object.defineProperty(window, 'ipv4', {
      get: function () {
        getIPv4Promise().then(
          result => console.log("IPv4: " + result), 
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
    //#endregion


    

    

    

    


    function scrollToContactForm(subject) {
      //var subject = $("select#subject-input").map(function() {return $(this).val();}).get();
      $('html, body').animate({
        scrollTop: $("#contact-form-whole").offset().top - $("#main-navbar").outerHeight()
      }, 2000, function () {
        $("select#subject-input").val(subject).change();
      });
    }

    $("[role='button'].service-card").click(function (event) {
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
      submitToAPI(e);
    });

    $.fn.strech_text = function(){
      var elmt          = jQuery(this),
          cont_width    = elmt.width();
          
      if(jQuery(this).find('.stretch_it').length > 0){
          var txt           = jQuery(this).find('.stretch_it').html();
          jQuery(this).html(txt);
      }else{
          var txt           = elmt.html();
      }
  
      var one_line      = jQuery('<span class="stretch_it">' + txt + '</span>'),
          nb_char       = elmt.text().length,
          spacing       = cont_width/nb_char,
          txt_width;
      
      elmt.html(one_line);
      txt_width = one_line.width();
      
      if (txt_width < cont_width){
          var  char_width     = txt_width/nb_char,
               ltr_spacing    = spacing - char_width + (spacing - char_width)/nb_char ; 
    
          one_line.css({'letter-spacing': ltr_spacing});
      } else {
          one_line.contents().unwrap();
          elmt.addClass('justify');
      }
  };

  
  
    jQuery(window).resize(function(){
      jQuery('.stretch').each(function(){
          jQuery(this).strech_text();
      });
  });

  $('.stretch').each(function(){
    $(this).strech_text();
});

  }
};
$(function () {
  app.init();
});
