/* global SimpleCrypto */

$(function() {
  $.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl)
      $.fn.textWidth.fakeEl = $('<span>')
        .hide()
        .appendTo(document.body);
    $.fn.textWidth.fakeEl
      .text(text || this.val() || this.text())
      .css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
  };

  /* encoded phone and email  https://developer.mozilla.org/en-US/docs/Glossary/Base64 */
  var data = JSON.parse(atob('<redacted>'))

  var fontHeight = window
    .getComputedStyle(document.getElementById('testRenderText'))
    .getPropertyValue('font-size');
  var textWidth = $.fn.textWidth(data.email, `${fontHeight} Segoe UI`);
  var textHeight = parseInt(fontHeight);

  var canavsElement = document.createElement('canvas');
  canavsElement.width = textWidth;
  canavsElement.height = textHeight;
  var canvasContext = canavsElement.getContext('2d');
  canvasContext.font = `${fontHeight} Segoe UI`;

  canvasContext.fillStyle = '#ffffff';
  canvasContext.textBaseline = 'top';
  canvasContext.fillText(data.phone, 0, 0);
  $('#phone-data-container').width(textWidth);
  $('#phone-data-container').height(textHeight);
  $('#phone-data-container').css(
    'background-image',
    'url("' + canvasContext.canvas.toDataURL('image/png') + '")'
  );

  canvasContext.clearRect(0, 0, canavsElement.width, canavsElement.height);
  canvasContext.fillText(data.email, 0, 0);
  $('#email-data-container').width(textWidth);
  $('#email-data-container').height(textHeight);
  $('#email-data-container').css(
    'background-image',
    'url("' + canvasContext.canvas.toDataURL('image/png') + '")'
  );
});
