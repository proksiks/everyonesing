function initWhyAnimation() {
  const whyContainer = document.querySelector(".cards-wrapper");
  if (!whyContainer) return;

  const items = Array.from(document.querySelectorAll(".cards__item"));

  if (!items.length) return;

  items.forEach((item) => {
    item.classList.add("cards__item--hidden");
  });

  function showItems() {
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > 0;

      if (isVisible) {
        item.classList.remove("cards__item--hidden");
        item.classList.add("cards__item--visible");
      }
    });
  }

  showItems();

  window.addEventListener("scroll", showItems);
}

document.addEventListener("DOMContentLoaded", initWhyAnimation);
