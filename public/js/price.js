import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";

// Инициализируем слайдер на разрешениях меньше 1440px
const mediaQuery = window.matchMedia("(max-width: 1440px)");

function handleMediaChange(e) {
  if (e.matches) {
    new Swiper(".price__top-cards", {
      slidesPerView: "auto",
      pagination: {
        el: ".price__top-cards-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}

handleMediaChange(mediaQuery);
mediaQuery.addEventListener("change", handleMediaChange);
