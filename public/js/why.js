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
      const isVisible = rect.top < windowHeight * 0.6 && rect.bottom > 0;

      if (isVisible) {
        item.classList.remove("cards__item--hidden");
        item.classList.add("cards__item--visible");
      }
    });
  }

  showItems();

  window.addEventListener("scroll", showItems);
}

function initCardsTitleAnimation() {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  if (!cardsWrapper) return;

  const cardsTitle = cardsWrapper.querySelector(".cards__title");
  if (!cardsTitle) return;

  cardsTitle.style.willChange = "transform, opacity";
  cardsTitle.style.transition = "none";

  let ticking = false;

  function updateAnimation() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const titleTriggerPoint = windowHeight * 0.5;

    const titleRect = cardsWrapper.getBoundingClientRect();
    const titleOffsetTop = titleRect.top;

    let titleProgress = 0;
    if (titleOffsetTop < titleTriggerPoint) {
      const distanceFromTrigger = titleTriggerPoint - titleOffsetTop;
      titleProgress = Math.max(
        0,
        Math.min(1, distanceFromTrigger / windowHeight)
      );
    }
    cardsTitle.style.transform = `translateY(${titleProgress * 500}px)`;
    cardsTitle.style.opacity = Math.max(0, 1 - titleProgress * 1.8);
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateAnimation();
        ticking = false;
      });
      ticking = true;
    }
  }

  updateAnimation();

  window.addEventListener("scroll", requestTick, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initWhyAnimation();
  initCardsTitleAnimation();
});

document.addEventListener("DOMContentLoaded", initWhyAnimation);
