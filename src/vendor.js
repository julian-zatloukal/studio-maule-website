'use strict';

import 'jquery';
import $ from 'jquery';
window.$ = window.jQuery = $;
import 'slick-carousel';
const slickFonts = importAll(
    require.context('slick-carousel/slick/fonts', false, /.*/s)
);
import gif from 'slick-carousel/slick/ajax-loader.gif';


import 'bootstrap';
import 'moment';

function importAll(r) {
  return r.keys().map(r);
}



console.log('Hello, from vendor!');
console.log(slickFonts);
console.log(gif);

