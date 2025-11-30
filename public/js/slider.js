import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";

const maoinSlider = new Swiper(".main-slider", {
  effect: "coverflow",
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  slidesPerView: "auto",
  centeredSlides: true,
  coverflowEffect: {
    rotate: 80,
    stretch: 150,
    depth: 700,
    modifier: 1,
    slideShadows: true,
  },
  navigation: {
    nextEl: ".main-slider__button--next",
    prevEl: ".main-slider__button--prev",
  },
});
maoinSlider.slideTo(2);
