let swiper = new Swiper(".testimonial-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: true,
    centerSlide: 'true',
    loopFillGroupWithBlank: false,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        375: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        976: {
            slidesPerView: 3,
        },
        1440: {
            slidesPerView: 3
        }
    }
});