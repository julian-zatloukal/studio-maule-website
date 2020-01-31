//JQuery Module Pattern

// An object literal
var app = {
  init: function () {
    app.mainFunction();
  },
  mainFunction: function () {
    // jQuery code

    function submitToAPI(e) {
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

      var name = $("#name-input").val();
      var phone = $("#phone-input").val();
      var email = $("#email-input").val();
      var subject = $("#subject-input").val();
      var desc = $("#description-input").val();

      var data_form = {
        name: name,
        phone: phone,
        email: email,
        subject: subject,
        desc: desc
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
          location.reload();
          $("#submit_result_area").html("<section style='border-style:solid !important; border-width: 2px !important;' class='jumbotron border border-success bg-transparent text-success text-center pt-1 pb-1 my-3'>  <div class='container'>	<h5 style='margin-bottom: 0.25rem !important;' class='jumbotron-heading'>¡Mensaje enviado exitosamente, gracias por su tiempo!</h3>  </div></section>");
        },
        error: function () {
          // show an error message
          $("#submit_result_area").html("<section style='border-style:solid !important; border-width: 2px !important;' class='jumbotron border border-danger bg-transparent text-danger text-center pt-1 pb-1 my-3'>  <div class='container'>	<h5 style='margin-bottom: 0.25rem !important;' class='jumbotron-heading'>Se ha producido un error al enviar el mensaje.</h3>  </div></section>");
        }
      });
    }

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

    $("#nav-item-ultimos-trabajos").click(function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $("#ultimos-trabajos-divider").offset().top - ($("#ultimos-trabajos-divider").outerHeight(true) / 2) - $("#main-navbar").outerHeight()
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


  }
};
$(function () {
  app.init();
});
