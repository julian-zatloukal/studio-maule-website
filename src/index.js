/* eslint-disable no-undef */
import './js/app-slick-carousel';
import './js/recaptcha-functions';
import './js/app';
import './js/development-functions';
import './js/pageEvents';
import './js/footer';
import './js/services'

function importAll(r) {
  return r.keys().map(r);
}

const dataImagesUrl = importAll(
  require.context('./data/img', false, /\.(png|jpe?g|svg)$/)
);

window.dataImagesUrl = dataImagesUrl;

jQuery.fn.textNodes = function() {
  return this.contents().filter(function() {
    return this.nodeType === Node.TEXT_NODE && this.nodeValue.trim() !== '';
  });
};