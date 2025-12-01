function initCardsAnimation() {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  if (!cardsWrapper) return;

  const cardsTitle = cardsWrapper.querySelector(".cards__title");
  const cardsItems = cardsWrapper.querySelectorAll(".cards__item");
  if (!cardsTitle || cardsItems.length === 0) return;

  cardsTitle.style.willChange = "transform, opacity";
  cardsTitle.style.transition = "none";
  cardsItems.forEach((item) => {
    item.style.willChange = "transform";
    item.style.transition = "none";
  });

  let ticking = false;

  function updateAnimation() {
    const rect = cardsWrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const titleTriggerPoint = windowHeight * 0.5;
    let titleProgress = 0;
    if (rect.top < titleTriggerPoint) {
      const distanceFromTrigger = titleTriggerPoint - rect.top;
      titleProgress = Math.max(
        0,
        Math.min(1, distanceFromTrigger / windowHeight)
      );
    }
    const titleMoveDown = titleProgress * 200;
    const titleOpacity = Math.max(0, 1 - titleProgress * 1.5);
    cardsTitle.style.transform = `translateY(${titleMoveDown}px)`;
    cardsTitle.style.opacity = titleOpacity;

    cardsItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const isVisible =
        itemRect.top < windowHeight * 0.9 &&
        itemRect.bottom > windowHeight * -0.2;

      if (isVisible) {
        const normalizedTop = Math.max(0, Math.min(windowHeight, itemRect.top));
        const itemProgress = 1 - normalizedTop / windowHeight;

        const baseMove = 200;
        const reductionStep = 15;
        const moveUp = itemProgress * (baseMove - index * reductionStep);

        item.style.transform = `translateY(${-moveUp}px)`;
      } else {
        item.style.transform = "translateY(0px)";
      }
    });
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
  window.addEventListener("resize", requestTick, { passive: true });
}

document.addEventListener("DOMContentLoaded", initCardsAnimation);
