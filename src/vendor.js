'use strict';

import 'jquery';
import $ from 'jquery';
window.$ = window.jQuery = $;
import 'slick-carousel';
function importAll(r) {
  return r.keys().map(r);
}
import 'bootstrap';

var moment = require('moment');
window.moment = moment;

initializeHyphenopoly();

function initializeHyphenopoly(){
  var Hyphenopoly = {
    require: {
      es: 'FORCEHYPHENOPOLY',
      it: 'FORCEHYPHENOPOLY'
    },
    paths: {
      patterndir: './js/hyphenopoly/patterns/', //path to the directory of pattern files
      maindir: './js/hyphenopoly/' //path to the directory where the other ressources are stored
    }
  };
  window.Hyphenopoly = Hyphenopoly;
  const hyphenopoly_loader = require('hyphenopoly/Hyphenopoly_Loader');
}
