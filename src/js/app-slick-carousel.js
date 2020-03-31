class customersCarousel{
    static initialize() {
        console.log('LOADING CAROUSEL');
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
    
        $('.slick-carousel-items').find('.slick-list').focus();
    }
}
window.customersCarousel = customersCarousel;

$(function() {
    customersCarousel.initialize();
  });