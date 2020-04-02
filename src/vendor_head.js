//#region Load css
import './scss/main.scss';
//#endregion

//#region Google tag manager
(function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-MQMDBXC');
//#endregion

import html2canvas from 'html2canvas/dist/html2canvas';
window.html2canvas = html2canvas;


//#region Load Hyphenopoly
var Hyphenopoly = {
  require: {
    es: 'anticonstitucionalmente',
    it: 'precipitevolissimevolmente'
  },
  paths: {
    patterndir: './js/hyphenopoly/patterns/', //path to the directory of pattern files
    maindir: './js/hyphenopoly/' //path to the directory where the other ressources are stored
  }
};
window.Hyphenopoly = Hyphenopoly;
const hyphenopoly_loader = require('hyphenopoly/Hyphenopoly_Loader');
//#endregion