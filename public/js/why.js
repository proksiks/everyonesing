function initCardsAnimation() {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  if (!cardsWrapper) return;

  const cardsTitle = cardsWrapper.querySelector(".cards__title");
  const cardsItems = Array.from(cardsWrapper.querySelectorAll(".cards__item"));
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
  let cardsPositions = [];

  function cacheCardsPositions() {
    cardsPositions = cardsItems.map((item) => {
      const rect = item.getBoundingClientRect();

      return {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
      };
    });
  }

  cacheCardsPositions();
  window.addEventListener(
    "resize",
    () => {
      cacheCardsPositions();
      requestTick();
    },
    { passive: true }
  );

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

    const bufferZone = windowHeight * 0.1;
    const fixedMoves = [320, 320, 220, 80];

    cardsItems.forEach((item, index) => {
      const pos = cardsPositions[index];

      const itemTopInView = pos.top - scrollY;
      const itemBottomInView = pos.bottom - scrollY;

      const isInBufferZone =
        itemTopInView < windowHeight * 1.1 + bufferZone &&
        itemBottomInView > windowHeight * -0.2 - bufferZone;

      const itemId = index;

      if (isInBufferZone) {
        const normalizedTop = Math.max(
          -0.2 * windowHeight,
          Math.min(windowHeight * 1.1, itemTopInView)
        );
        const itemProgress = 1 - normalizedTop / windowHeight;
        const targetTransform = itemProgress * fixedMoves[index];

        const prevTransform = lastTransforms[itemId] || 0;
        const smoothTransform =
          prevTransform + (targetTransform - prevTransform) * 0.12;

        item.style.transform = `translateY(${-smoothTransform}px)`;
        lastTransforms[itemId] = smoothTransform;
      } else {
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

  updateAnimation();

  window.addEventListener("scroll", requestTick, { passive: true });
}

document.addEventListener("DOMContentLoaded", initCardsAnimation);
