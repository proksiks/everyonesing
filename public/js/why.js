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
    item.style.transform = "translateY(0)";
  });

  let ticking = false;
  let lastTransforms = {};

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
    const titleMoveDown = titleProgress * 500;
    const titleOpacity = Math.max(0, 1 - titleProgress * 1.8);
    cardsTitle.style.transform = `translateY(${titleMoveDown}px)`;
    cardsTitle.style.opacity = titleOpacity;

    cardsItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();

      const bufferZone = windowHeight * 0.1;
      const isInBufferZone =
        itemRect.top < windowHeight * 1.1 + bufferZone &&
        itemRect.bottom > windowHeight * -0.2 - bufferZone;

      if (isInBufferZone) {
        const normalizedTop = Math.max(
          -0.2 * windowHeight,
          Math.min(windowHeight * 1.1, itemRect.top)
        );
        const itemProgress = 1 - normalizedTop / windowHeight;

        const fixedMoves = [320, 320, 220, 80];
        const targetTransform = itemProgress * fixedMoves[index];

        const itemId = item.dataset.index || index;
        const prevTransform = lastTransforms[itemId] || 0;
        const smoothTransform =
          prevTransform + (targetTransform - prevTransform) * 0.12;

        item.style.transform = `translateY(${-smoothTransform}px)`;
        lastTransforms[itemId] = smoothTransform;
      } else {
        const itemId = item.dataset.index || index;
        const prevTransform = lastTransforms[itemId] || 0;

        if (Math.abs(prevTransform) < 3) {
          item.style.transform = "translateY(0px)";
          delete lastTransforms[itemId];
        } else {
          const quickReset = prevTransform * 0.88;
          item.style.transform = `translateY(${-quickReset}px)`;
          lastTransforms[itemId] = quickReset;
        }
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

  cardsItems.forEach((item, index) => {
    item.dataset.index = index;
    item.style.transform = "translateY(0px)";
  });

  updateAnimation();
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick, { passive: true });
}

document.addEventListener("DOMContentLoaded", initCardsAnimation);
