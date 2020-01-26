//JQuery Module Pattern

// An object literal
var app = {
  init: function () {
    app.mainFunction();
  },
  mainFunction: function () {
    // jQuery code

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

    $('#contact-form').submit(function (event) {
      event.preventDefault();
      alert("Processing");
      var form_name = $('#form_name').val();
      var form_tel = $('#form_tel').val();
      var form_email = $('#form_email').val();
      var form_need = $('#form_need').val();
      var form_message = $('#form_message').val();


      grecaptcha.ready(function () {
        grecaptcha.execute('6Lea19EUAAAAAAfIv-yvbpA-GH4hSAEDdPG--q-C', { action: 'homepage' }).then(function (token) {
          console.log(token);
          document.getElementById("token").value = token;
          $('#contact-form').prepend('<input type="hidden" name="token" value="' + token + '">');
          $('#contact-form').prepend('<input type="hidden" name="action" value="contact_action">');
          $('#contact-form').unbind('submit').submit();
        });;
      });
    });



  }
};
$(function () {
  app.init();
});
