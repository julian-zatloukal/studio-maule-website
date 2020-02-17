/**
 * @license Hyphenopoly_Loader 4.0.0 - client side hyphenation
 * ©2020  Mathias Nater, Güttingen (mathiasnater at gmail dot com)
 * https://github.com/mnater/Hyphenopoly
 *
 * Released under the MIT license
 * http://mnater.github.io/Hyphenopoly/LICENSE
 */
((e,t,n,s)=>{"use strict";const a=sessionStorage,r="Hyphenopoly_Loader",l=new Map,o=()=>s.create(null),i="appendChild",p="createElement",h="createTextNode",c=(e,t)=>s.keys(e).forEach(t);n.cacheFeatureTests&&a.getItem(r)?n.cf=JSON.parse(a.getItem(r)):n.cf={langs:o(),pf:!1},(()=>{const e=t.currentScript.src.replace(/Hyphenopoly_Loader.js/i,""),s=e+"patterns/";n.paths?(n.paths.maindir=n.paths.maindir||e,n.paths.patterndir=n.paths.patterndir||s):n.paths={maindir:e,patterndir:s}})(),n.setup?(n.setup.hide=n.setup.hide||"all",n.setup.selectors=n.setup.selectors||{".hyphenate":{}},n.setup.timeout=n.setup.timeout||1e3):n.setup={hide:"all",selectors:{".hyphenate":{}},timeout:1e3},n.setup.hide=(()=>{switch(n.setup.hide){case"all":return 1;case"element":return 2;case"text":return 3;default:return 0}})(),c(n.require,e=>{const t=n.fallbacks&&n.fallbacks[e]?n.fallbacks[e]:e;l.set(e.toLowerCase(),new Map([["fn",t],["wo",n.require[e]]]))}),n.defProm=()=>{let e=null,t=null;const n=new Promise((n,s)=>{e=n,t=s});return n.resolve=e,n.reject=t,n},n.hiding=(e,s)=>{const a="H9Y_Styles";if(1===e){const e=t.getElementById(a);e&&e.parentNode.removeChild(e)}else{const e=" {visibility: hidden !important}\n",r=t[p]("style");let l="";r.id=a,1===s?l="html"+e:c(n.setup.selectors,t=>{l+=2===s?t+e:t+" {color: transparent !important}\n"}),r[i](t[h](l)),t.head[i](r)}},n.res=new Map,n.res.set("he",new Map),(()=>{const s=(()=>{let e=null;const s="hyphens:auto",a=`visibility:hidden;-moz-${s};-webkit-${s};-ms-${s};${s};width:48px;font-size:12px;line-height:12px;border:none;padding:0;word-wrap:normal`;return{ap:t=>e?(t[i](e),e):null,cl:()=>{e&&e.parentNode.removeChild(e)},cr:s=>{if(n.cf.langs[s])return;e=e||t[p]("body");const r=t[p]("div");r.lang=s,r.style.cssText=a,r[i](t[h](l.get(s).get("wo").toLowerCase())),e[i](r)}}})();function d(t){const s=l.get(t).get("fn")+".wasm";n.cf.pf=!0,n.cf.langs[t]="H9Y",n.res.get("he").set(t,e.fetch(n.paths.patterndir+s,{credentials:"include"}))}l.forEach((e,t)=>{"FORCEHYPHENOPOLY"===e.get("wo")||n.cf.langs[t]&&"H9Y"===n.cf.langs[t]?d(t):s.cr(t)});const u=s.ap(t.documentElement);if(null!==u){u.querySelectorAll("div").forEach(e=>{var t;"auto"===((t=e).style.hyphens||t.style.webkitHyphens||t.style.msHyphens||t.style["-moz-hyphens"])&&e.offsetHeight>12?n.cf.langs[e.lang]="CSS":d(e.lang)}),s.cl()}if(n.cf.pf){n.res.set("DOM",new Promise(e=>{"loading"===t.readyState?t.addEventListener("DOMContentLoaded",e,{once:!0,passive:!0}):e()})),1===n.setup.hide&&n.hiding(0,1),0!==n.setup.hide&&(n.setup.timeOutHandler=e.setTimeout(()=>{n.hiding(1,null),console.error(`Hyphenopoly timed out after ${n.setup.timeout}ms`)},n.setup.timeout)),n.res.get("DOM").then(()=>{n.setup.hide>1&&n.hiding(0,n.setup.hide)});const s=t[p]("script");s.src=n.paths.maindir+"Hyphenopoly.js",t.head[i](s),c(n.cf.langs,e=>{"H9Y"===n.cf.langs[e]&&(n.hyphenators=n.hyphenators||o(),n.hyphenators[e]||(n.hyphenators[e]=n.defProm()))}),n.handleEvent&&n.handleEvent.polyfill&&n.handleEvent.polyfill()}else n.handleEvent&&n.handleEvent.tearDown&&n.handleEvent.tearDown(),e.Hyphenopoly=null;n.cacheFeatureTests&&a.setItem(r,JSON.stringify(n.cf))})()})(window,document,Hyphenopoly,Object);