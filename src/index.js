/* eslint-disable no-undef */
import  './js/app-slick-carousel';
import './js/recaptcha-functions';
import './js/app';
import './js/development-functions';
import './js/pageEvents';
// import html_file from './html/carousel.html';
// const carouselData = require('./js/data/customer-carousel-data.json');
// import submit_success_template_html from './html/submit-success-alert.html';
// import submit_failure_template_html from './html/submit-failure-alert.html';
// import services_html from './html/services.html';
// import footer_html from './html/footer.html';

const carouselDataImagesUrl = importAll(
  require.context('./data/img', false, /\.(png|jpe?g|svg)$/)
);

function importAll(r) {
  return r.keys().map(r);
}

jQuery.fn.textNodes = function() {
  return this.contents().filter(function() {
    return this.nodeType === Node.TEXT_NODE && this.nodeValue.trim() !== '';
  });
};

$(function() {
  // loadServiceCardsHTML();
  // loadCarouselHTML();
  // loadContactFormHTML();
  // loadFooter();
});

// function loadFooter(){
//   var footer_jquery_html = $(footer_html);
//   $("main").append(footer_jquery_html[0])
// }

// function loadServiceCardsHTML(){
//   // Title:       service-card-title
//   // Body:        service-card-body
//   // View more:   service-view-more
//   // Button:      service-card-button

//   var services_jquery_html = $(services_html);
//   services_jquery_html.find('.service-view-more').each(function(index, val) {
//     $(this).html(lang.serviceCards.viewMore);
//   });
//   services_jquery_html.find('.service-card-button').each(function(index, val) {
//     $(this).html(lang.serviceCards.buttonContent);
//   });
//   services_jquery_html.find('.service-card-title').each(function(index, val) {
//     $(this).html(lang.serviceCards.cards[index].title);
//   });
//   services_jquery_html.find('.service-card-body').each(function(index, val) {
//     $(this).prepend(lang.serviceCards.cards[index].body);
//   });
//   services_jquery_html.find('.card').each(function(index, val) {
//     $(this).attr('data-service-index', index);
//   });

//   // Hide view more buttom util further content creation
//   services_jquery_html.find('.service-view-more').each(function(index, val) {
//     $(this).addClass('d-none');
//   });

//   $("#main-container").prepend(services_jquery_html[0]).promise().then( () => {
//     $(".service-card-button").click(function(event) {
//       event.preventDefault();
//       var serviceIndex = parseInt($(this).closest('.card').attr('data-service-index'));
//       scrollHandler('contact-form', serviceIndex+1);
//     });
//   });
// }

// function loadContactFormHTML(){
//   var submit_success_template_jquery_html = $(submit_success_template_html);
//   submit_success_template_jquery_html.find('#submit-success-heading').each(function(index, val) {
//     $(this).html(lang.contactForm.submitSuccess.heading);
//   });
//   submit_success_template_jquery_html.find('#submit-success-body').each(function(index, val) {
//     $(this).html(lang.contactForm.submitSuccess.body);
//   });
//   window.submit_success_template_html = submit_success_template_jquery_html[0];

//   var submit_failure_template_jquery_html = $(submit_failure_template_html);
//   submit_failure_template_jquery_html.find('#submit-failure-body').each(function(index, val) {
//     $(this).html(lang.contactForm.submitFailure.body);
//   });
//   window.submit_failure_template_html = submit_failure_template_jquery_html[0];
// }

// function loadCarouselHTML() {
//   var jquery_html = $(html_file);
//   jquery_html.find('.read-more-badge').each(function(index, val) {
//     $(this).attr('data-index', index);
//   });

//   jquery_html.find('.cust-name').each(function(index, val) {
//     $(this).text(carouselData.customers[index].name);
//   });

//   jquery_html.find('.cust-profession').each(function(index, val) {
//     $(this).text(carouselData.customers[index].tag);
//   });

//   jquery_html.find('.profile-pic').each(function(index, val) {
//     let image_url = carouselDataImagesUrl.find(url =>
//       url.includes(carouselData.customers[index].image.checksum)
//     );
//     $(this).css('background-image', 'url(' + image_url + ')');
//     $(this).css(
//       'background-position',
//       carouselData.customers[index].image.position
//     );
//   });

//   jquery_html.find('.customer-review-short').each(function(index, val) {
//     $(this)
//       .textNodes()
//       .first()
//       .replaceWith(
//         carouselData.customers[index].short_body.replace(/\n/g, '<br>') + ' '
//       );
//   });

//   $('#nuestros-clientes-container section')
//     .after(jquery_html[0])
//     .promise()
//     .then(() => {
//       slickCarousel.initialize();
//       $('.customer-review-modal').on('show.bs.modal', function(event) {
//         var index = $(event.relatedTarget).attr('data-index');
//         var modal = $(this);
//         modal
//           .find('.modal-title')
//           .text('Reseña de ' + carouselData.customers[index].name);

//         modal
//           .find('.modal-body-container p')
//           .html(
//             carouselData.customers[index].large_body.replace(/\n/g, '<br>')
//           );
//       });
//     });
// }
