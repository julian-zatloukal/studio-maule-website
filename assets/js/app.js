//JQuery Module Pattern

// An object literal
var app = {
  init: function() {
    app.mainFunction();
  },
  mainFunction: function () {
    //alert("This is working as intended!");
  }
};
$(function() {
  app.init();
});
