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
    const titleMoveDown = titleProgress * 200;
    const titleOpacity = Math.max(0, 1 - titleProgress * 1.5);
    cardsTitle.style.transform = `translateY(${titleMoveDown}px)`;
    cardsTitle.style.opacity = titleOpacity;

    cardsItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();

      const bufferZone = windowHeight * 0.05;
      const isInBufferZone =
        itemRect.top < windowHeight * 1.0 + bufferZone &&
        itemRect.bottom > windowHeight * -0.3 - bufferZone;

      if (isInBufferZone) {
        const normalizedTop = Math.max(
          -0.3 * windowHeight,
          Math.min(windowHeight * 1.0, itemRect.top)
        );
        const itemProgress = 1 - normalizedTop / windowHeight;

        const fixedMoves = [200, 185, 170, 155];
        const targetTransform = itemProgress * fixedMoves[index];

        const itemId = item.className;
        const prevTransform = lastTransforms[itemId] || 0;
        const smoothTransform =
          prevTransform + (targetTransform - prevTransform) * 0.15;

        item.style.transform = `translateY(${-smoothTransform}px)`;
        lastTransforms[itemId] = smoothTransform;
      } else {
        const itemId = item.className;
        const prevTransform = lastTransforms[itemId] || 0;
        const smoothReset = prevTransform * 0.9;

        if (Math.abs(smoothReset) < 1) {
          item.style.transform = "translateY(0px)";
          delete lastTransforms[itemId];
        } else {
          item.style.transform = `translateY(${-smoothReset}px)`;
          lastTransforms[itemId] = smoothReset;
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

  updateAnimation();
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick, { passive: true });
}

document.addEventListener("DOMContentLoaded", initCardsAnimation);
