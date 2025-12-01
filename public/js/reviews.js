import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";

const mediaQuery = window.matchMedia("(max-width: 1440px)");

function handleMediaChange(e) {
  if (e.matches) {
    new Swiper(".reviews__slider", {
      slidesPerView: "auto",
      pagination: {
        el: ".reviews__slider-pagination",
        clickable: true,
      },
    });
  }
}

handleMediaChange(mediaQuery);
mediaQuery.addEventListener("change", handleMediaChange);
