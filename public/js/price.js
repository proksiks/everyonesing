import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";

const mediaQuery = window.matchMedia("(max-width: 1440px)");

function handleMediaChange(e) {
  if (e.matches) {
    new Swiper(".price__top-cards", {
      slidesPerView: "auto",
      pagination: {
        el: ".price__top-cards-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          initialSlide: 1,
        },
        480: {
          initialSlide: 0,
        },
      },
    });
  }
}

handleMediaChange(mediaQuery);
mediaQuery.addEventListener("change", handleMediaChange);
