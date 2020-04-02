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

import SimpleCrypto from "simple-crypto-js";
window.SimpleCrypto = SimpleCrypto;