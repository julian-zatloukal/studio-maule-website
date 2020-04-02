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

  var encryptedData = "921f5cb464fc0e54bf7463564cf4521041615d28a297d97c70b3c024cb5b1351DdUcuVPY5mS1ZrZgJPcIYt4K0unt1tDEqdvWtiot0ql7kiMVQ7wL6Q70W/kOh6MU63NCWpKz4+N/jhYcBk1uJ/ZCcdubVv98aFIDQ8hgAOo=";
  var simpleCrypto = new SimpleCrypto('H81YEZhJ7lPwvpDs40Ch##');
  var data = JSON.parse(simpleCrypto.decrypt(encryptedData));

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
