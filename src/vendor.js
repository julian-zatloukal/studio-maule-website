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
      maindir: '../node_modules/hyphenopoly/',
      patterndir: '../node_modules/hyphenopoly/patterns/'
    }
  };
  window.Hyphenopoly = Hyphenopoly;
  const hyphenopoly_loader = require('hyphenopoly/Hyphenopoly_Loader');
}
