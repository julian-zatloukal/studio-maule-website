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
      var URL = "https://d8wgnuyah9.execute-api.us-east-1.amazonaws.com/default/mailfwd";

      var Namere = /[A-Za-z]{1}[A-Za-z]/;
      if (!Namere.test($("#name-input").val())) {
        alert("Name can not less than 2 char");
        return;
      }
      var mobilere = /[0-9]{10}/;
      if (!mobilere.test($("#phone-input").val())) {
        alert("Please enter valid mobile number");
        return;
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
        url: "https://d8wgnuyah9.execute-api.us-east-1.amazonaws.com/default/mailfwd",
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data_form),

        success: function () {
          // clear form and show a success message
          alert("Successfull");
          document.getElementById("contact-form").reset();
          location.reload();
        },
        error: function () {
          // show an error message
          alert("UnSuccessfull");
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
