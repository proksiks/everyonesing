import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";
const textSlider = new Swiper(".main-slider-text", {
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  watchSlidesProgress: true,
  allowTouchMove: false,
});
new Swiper(".main-slider", {
  effect: "coverflow",
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  slidesPerView: "auto",
  navigation: {
    nextEl: ".main-slider__button--next",
    prevEl: ".main-slider__button--prev",
  },
  pagination: {
    el: ".main-slider-pagination",
    clickable: true,
  },
  thumbs: {
    swiper: textSlider,
  },
  breakpoints: {
    320: {
      coverflowEffect: {
        rotate: 50,
        stretch: 250,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
    },
    768: {
      coverflowEffect: {
        rotate: 80,
        stretch: 150,
        depth: 700,
      },
    },
  },
});
