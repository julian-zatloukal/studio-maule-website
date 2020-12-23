/* eslint-disable no-undef */

$(function() {
  Object.defineProperty(window, 'verify', {
    get: function() {
      ContactForm.verifyField('g-recaptcha');
      return null;
    }
  });
  Object.defineProperty(window, 'ip', {
    get: function() {
      ContactForm.getIPAddrPromise().then(
        result => console.log('IP: ' + result),
        error => alert(error)
      );
      return null;
    }
  });
  Object.defineProperty(window, 'time', {
    get: function() {
      console.log(moment().format());
      return null;
    }
  });
  Object.defineProperty(window, 'gresponse', {
    get: function() {
      var response = grecaptcha.getResponse();
      //recaptcha failed validation
      console.log(response);
      return null;
    }
  });
  Object.defineProperty(window, 'scroll', {
    get: function() {
      scrollHandler('contact-form');
      return null;
    }
  });
  Object.defineProperty(window, 'display_success', {
    get: function() {
      ContactForm.displaySubmitOutcome('success');
      return null;
    }
  });
  Object.defineProperty(window, 'display_failure', {
    get: function() {
      ContactForm.displaySubmitOutcome('failure');
      return null;
    }
  });
});


