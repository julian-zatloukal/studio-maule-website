/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */

import submit_success_template_html from '../html/submit-success-alert.html';
import submit_failure_template_html from '../html/submit-failure-alert.html';

var app = {
  init: function() {
    app.mainFunction();
  },
  mainFunction: function() {
    // Imports

    class ContactForm {
      static async submitToAPI(e) {
        e.preventDefault();

        if (ContactForm.sanitizeAndVerify()) {
          let name = $('#name-input').val();
          let phone = $('#phone-input').val();
          let email = $('#email-input').val();
          let subject = $('#subject-input').val();
          let desc = $('#description-input').val();
          let ip = await ContactForm.getIPAddrPromise();
          let timestamp = moment().format();
          let grecaptcha_response = grecaptcha.getResponse();

          var data_form = {
            ipAddress: ip,
            timestamp: timestamp,
            gRecaptchaToken: grecaptcha_response,
            name: name,
            phone: phone,
            email: email,
            subject: subject,
            body: desc
          };

          ContactForm.sendEmail(data_form);
        }
      }

      static sendEmail(data_form) {
        let gCloudFunctionUrl =
          'https://us-central1-studio-maule.cloudfunctions.net/mail-contact-service';

        fetch(gCloudFunctionUrl, {
          method: 'POST', 
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data_form)
        }).then((res) => {
          if (res.ok) {
            // clear form and show a success message
            $('#contact-form').trigger('reset');
            ContactForm.displaySubmitOutcome('success');
          } else {
            // show an error message
            ContactForm.displaySubmitOutcome('failure');
          }
        });
      }

      static displaySubmitOutcome(outcome_state) {
        switch (outcome_state) {
          case 'success':
            $('#submit_result_area').html(submit_success_template_html);
            break;
          case 'failure':
            $('#submit_result_area').html(submit_failure_template_html);
            break;
        }
      }

      static sanitizeAndVerify() {
        let allTestPassed = true;
        if (!ContactForm.verifyField('name-input')) allTestPassed = false;
        if (!ContactForm.verifyField('phone-input')) allTestPassed = false;
        if (!ContactForm.verifyField('subject-input')) allTestPassed = false;
        if (!ContactForm.verifyField('email-input')) allTestPassed = false;
        if (!ContactForm.verifyField('description-input'))
          allTestPassed = false;
        if (!ContactForm.verifyField('g-recaptcha')) allTestPassed = false;
        return allTestPassed;
      }

      static hideVerifyAlert(element_selector) {
        switch (element_selector) {
          case '#g-recaptcha-container':
            if ($(element_selector).hasClass('is-invalid')) {
              $(element_selector).removeClass('is-invalid');
              $(element_selector)
                .next()
                .toggleClass('d-inline-block d-none');
              $('.g-recaptcha-container div div iframe').css({
                'border-style': 'hidden'
              });
              $('.g-recaptcha-container:first-child').removeClass(
                'alert-validate'
              );
            }

            break;
          default:
            if ($(element_selector).hasClass('is-invalid')) {
              $(element_selector).removeClass('is-invalid');
              $(element_selector)
                .next()
                .toggleClass('d-inline d-none');
            }
            break;
        }
      }

      static showVerifyAlert(element_selector, error_description) {
        switch (element_selector) {
          case '#g-recaptcha-container':
            if (!$(element_selector).hasClass('is-invalid')) {
              $('.g-recaptcha-container div div iframe').css({
                'border-style': 'solid',
                'border-width': '0.075em',
                'border-color': getComputedStyle(
                  document.body
                ).getPropertyValue('--danger'),
                'border-radius': '0.25em'
              });
              $('.g-recaptcha-container:first-child').css({
                position: 'relative'
              });
              $('.g-recaptcha-container:first-child').addClass(
                'alert-validate'
              );
              $(element_selector).addClass('is-invalid');
              $(element_selector)
                .next()
                .toggleClass('d-none d-inline-block');
              $(element_selector)
                .next()
                .html(error_description);
            }
            break;
          default:
            if (!$(element_selector).hasClass('is-invalid')) {
              $(element_selector).addClass('is-invalid');
              $(element_selector)
                .next()
                .toggleClass('d-none d-inline');
              $(element_selector)
                .next()
                .html(error_description);
            }
            break;
        }
      }

      static getIPAddrPromise() {
        return new Promise(function(resolve, reject) {
          $.ajax({
            type: 'GET',
            timeout: 1200,
            url: 'https://www.cloudflare.com/cdn-cgi/trace',
            success: function(data) {
              const regexp = RegExp(`[\n\r].*ip=\s*([^\n\r]*)`, 'g');
              var ip_string = regexp.exec(data)[1];
              if (ip_string !== null) {
                resolve(ip_string);
              } else {
                reject('Could not fetch ip');
              }
            }
          });
        });
      }

      static verifyField(field_id) {
        switch (field_id) {
          case 'name-input':
            if (
              $('#name-input')
                .val()
                .trim() != ''
            ) {
              var namere = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,72}$/;
              if (!namere.test($('#name-input').val())) {
                ContactForm.showVerifyAlert(
                  '#name-input',
                  $('#name-input')
                    .parent()
                    .find('.error-caption-container')
                    .attr('data-error-bad-format')
                );
                return false;
              } else {
                ContactForm.hideVerifyAlert('#name-input');
                return true;
              }
            } else {
              ContactForm.showVerifyAlert(
                '#name-input',
                $('#name-input')
                  .parent()
                  .find('.error-caption-container')
                  .attr('data-error-incomplete')
              );
              return false;
            }
          case 'phone-input':
            if (
              $('#phone-input')
                .val()
                .trim() != ''
            ) {
              var mobilere = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;
              if (!mobilere.test($('#phone-input').val())) {
                ContactForm.showVerifyAlert(
                  '#phone-input',
                  $('#phone-input')
                    .parent()
                    .find('.error-caption-container')
                    .attr('data-error-bad-format')
                );
                return false;
              } else {
                ContactForm.hideVerifyAlert('#phone-input');
                return true;
              }
            } else {
              ContactForm.hideVerifyAlert('#phone-input');
              return true;
            }
          case 'subject-input':
            if (
              $('#subject-input')
                .val()
                .trim() == ''
            ) {
              ContactForm.showVerifyAlert(
                '#subject-input',
                $('#subject-input')
                  .parent()
                  .find('.error-caption-container')
                  .attr('data-error-incomplete')
              );
              return false;
            } else {
              ContactForm.hideVerifyAlert('#subject-input');
              return true;
            }
          case 'email-input':
            if (
              $('#email-input')
                .val()
                .trim() != ''
            ) {
              var reeamil = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/;
              if (!reeamil.test($('#email-input').val())) {
                ContactForm.showVerifyAlert(
                  '#email-input',
                  $('#email-input')
                    .parent()
                    .find('.error-caption-container')
                    .attr('data-error-bad-format')
                );
                return false;
              } else {
                ContactForm.hideVerifyAlert('#email-input');
                return true;
              }
            } else {
              ContactForm.showVerifyAlert(
                '#email-input',
                $('#email-input')
                  .parent()
                  .find('.error-caption-container')
                  .attr('data-error-incomplete')
              );
              return false;
            }
          case 'description-input':
            if (
              $('#description-input')
                .val()
                .trim() != ''
            ) {
              var descriptionInputRegex = /^.{0,5000}$/;
              if (!descriptionInputRegex.test($('#description-input').val())) {
                ContactForm.showVerifyAlert(
                  '#description-input',
                  $('#description-input')
                    .parent()
                    .find('.error-caption-container')
                    .attr('data-error-bad-format')
                );
                return false;
              } else {
                ContactForm.hideVerifyAlert('#description-input');
                return true;
              }
            } else {
              ContactForm.showVerifyAlert(
                '#description-input',
                $('#description-input')
                  .parent()
                  .find('.error-caption-container')
                  .attr('data-error-incomplete')
              );
              return false;
            }
          case 'g-recaptcha':
            if (grecaptcha.getResponse().length == 0) {
              ContactForm.showVerifyAlert(
                '#g-recaptcha-container',
                $('#g-recaptcha-container')
                  .parent()
                  .find('.error-caption-container')
                  .attr('data-error-incomplete')
              );
              return false;
            } else {
              ContactForm.hideVerifyAlert('#g-recaptcha-container');
              return true;
            }
        }
      }
    }

    window.ContactForm = ContactForm;
  }
};
$(function() {
  app.init();
});
