class customersCarousel {
  static initialize() {
    $('.slick-carousel-items').slick({
      dots: true,
      arrows: true,
      infinite: false,
      accessibility: true,
      //autoplay: true,
      autoplaySpeed: 5000,
      speed: 800,
      slidesToShow: 3,
      adaptiveHeight: true,
      slidesToScroll: 1,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('.slick-carousel-items')
      .find('.slick-list')
      .focus();

    $('.customer-review-modal').on('show.bs.modal', function(event) {
      var large_body = $(event.relatedTarget)
        .parents('.slick-carousel-card')
        .attr('data-large-body');
      var name = $(event.relatedTarget)
        .parents('.slick-carousel-card')
        .find('.cust-name')
        .first()
        .text();
      var modal = $(this);
      modal.find('.modal-title').text('Reseña de ' + name);

      modal.find('.modal-body-container p').html(large_body);
    });
  }
}
window.customersCarousel = customersCarousel;

$(function() {
  customersCarousel.initialize();
});
