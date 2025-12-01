function initStepsAudioVisualizer() {
  const musicBlocks = document.querySelectorAll(".steps__step-music");
  if (!musicBlocks.length) return;

  const CANVAS_WIDTH = 260;
  const CANVAS_HEIGHT = 40;

  const LOW = 8;
  const MID = 16;
  const HIGH = 24;
  const barRadius = 2;

  const barCount = 40;
  const horizontalPadding = 0;

  const pattern = [LOW, MID, HIGH, MID, LOW];

  const allAudioElements = [];

  musicBlocks.forEach((block) => {
    const audioButton = block.querySelector(".steps__step-button");
    const audioElement = block.querySelector("audio");
    const canvas = block.querySelector("canvas");

    if (!audioButton || !audioElement || !canvas) return;

    allAudioElements.push(audioElement);

    const ctx = canvas.getContext("2d");
    const buttonIcons = audioButton.querySelectorAll(
      ".steps__step-button-icon"
    );
    const playIcon = buttonIcons[0];
    const pauseIcon = buttonIcons[1];

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const centerY = canvas.height / 2;

    const baseHeights = [];
    for (let i = 0; i < barCount; i++) {
      baseHeights.push(pattern[i % pattern.length]);
    }

    const innerWidth = canvas.width - horizontalPadding * 2;
    const barWidth = 4;
    const totalBarsWidth = barCount * barWidth;
    const spacing =
      barCount > 1 ? (innerWidth - totalBarsWidth) / (barCount - 1) : 0;
    const startX = horizontalPadding;

    let isPlaying = false;

    audioButton.addEventListener("click", () => {
      allAudioElements.forEach((otherAudio) => {
        if (otherAudio !== audioElement && !otherAudio.paused) {
          otherAudio.pause();
        }
      });

      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
    });

    audioElement.addEventListener("play", () => {
      isPlaying = true;
      playIcon.classList.remove("_show");
      pauseIcon.classList.add("_show");
      drawVisualization();
    });

    audioElement.addEventListener("pause", () => {
      isPlaying = false;
      playIcon.classList.add("_show");
      pauseIcon.classList.remove("_show");
    });

    audioElement.addEventListener("ended", () => {
      isPlaying = false;
      playIcon.classList.add("_show");
      pauseIcon.classList.remove("_show");
    });

    function drawVisualization() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const duration = audioElement.duration || 0;
      const current = audioElement.currentTime || 0;
      const progress = duration ? current / duration : 0;

      const activeBars = Math.round(barCount * progress);

      let x = startX;

      for (let i = 0; i < barCount; i++) {
        const h = baseHeights[i];
        const y = centerY - h / 2;

        drawRoundedRect(ctx, x, y, barWidth, h, barRadius, "#F4F6F9");

        if (i < activeBars) {
          drawRoundedRect(ctx, x, y, barWidth, h, barRadius, "#C61A02");
        }

        x += barWidth + spacing;
      }

      if (isPlaying && !audioElement.paused && !audioElement.ended) {
        requestAnimationFrame(drawVisualization);
      }
    }

    function drawRoundedRect(ctx, x, y, width, height, radius, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    }

    drawVisualization();
  });
}

function initStepsAnimation() {
  const stepsContainer = document.querySelector(".steps");
  if (!stepsContainer) return;

  const steps = Array.from(document.querySelectorAll(".steps__step"));
  const images = Array.from(document.querySelectorAll(".steps__image"));

  if (!steps.length) return;

  steps.forEach((step) => {
    step.classList.add("steps__step--hidden");
  });
  images.forEach((img) => img.classList.remove("_active"));
  steps[0].classList.remove("steps__step--hidden");
  steps[0].classList.add("_active");
  if (images[0]) images[0].classList.add("_active");

  function showActiveStep(index) {
    steps.forEach((step, i) => {
      if (i === index) {
        step.classList.remove("steps__step--hidden");
        step.classList.add("_active");
      } else {
        step.classList.remove("_active");
      }
    });

    images.forEach((img, i) => {
      if (i === index) {
        img.classList.add("_active");
      } else {
        img.classList.remove("_active");
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const viewportCenter = window.innerHeight / 2;

        let closestIndex = 0;
        let closestDist = Infinity;

        steps.forEach((step, index) => {
          const rect = step.getBoundingClientRect();
          const stepCenter = rect.top + rect.height / 2;
          const dist = Math.abs(stepCenter - viewportCenter);

          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = index;
          }
        });

        showActiveStep(closestIndex);
      });
    },
    {
      root: null,
      threshold: 0.2,
    }
  );

  observer.observe(stepsContainer);

  window.addEventListener("scroll", () => {
    const rect = stepsContainer.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let closestDist = Infinity;

    steps.forEach((step, index) => {
      const r = step.getBoundingClientRect();
      const stepCenter = r.top + r.height / 2;
      const dist = Math.abs(stepCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = index;
      }
    });

    showActiveStep(closestIndex);
  });
}

// Инициализация всех функций
document.addEventListener("DOMContentLoaded", () => {
  initStepsAudioVisualizer();
  initStepsAnimation();
});
