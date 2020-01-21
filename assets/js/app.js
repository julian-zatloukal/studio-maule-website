//JQuery Module Pattern

// An object literal
var app = {
  init: function () {
    app.mainFunction();
  },
  mainFunction: function () {
    // jQuery code
    
    $("#nav-item-contacto").click(function(event) {
      event.preventDefault();
  
      $('html, body').animate({
          scrollTop: $("#contact-form-whole").offset().top + $("#contact-form-whole").height() / 2
      }, 2000);
  });

  }
};
$(function () {
  app.init();
});
