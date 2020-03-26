/* eslint-disable no-undef */
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
  function onloadCallback() {
    successfulGRecaptchaLoading = true;
    grecaptcha.render($("#g-recaptcha-container")[0], {
      "sitekey": "6LfBRdMUAAAAAFEYhfH9JLBVbQhgO8LU7fIML1ne",
      "callback": grecaptchaSuccessfulEvent,
      "error-callback": grecaptchaErrorEvent,
      "expired-callback": grecaptchaExpiredEvent
    });
  }
  window.onloadCallback = onloadCallback;