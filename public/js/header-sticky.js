function initHeaderSticky() {
  const header = document.querySelector(".header-sticky");
  const headerMain = document.querySelector(".header");
  const mobileLeft = document.querySelector(".mobile-sticky__left");
  const mobileMenuContent = document.querySelector(".mobile-menu__content");
  const mobileMenuDecorate = document.querySelector(".mobile-menu__decorate");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (
    !header ||
    !headerMain ||
    !mobileLeft ||
    !mobileMenuContent ||
    !mobileMenuDecorate ||
    !mobileMenu
  )
    return;

  const heroHeight = headerMain.offsetHeight;
  let isMenuOpen = false;
  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  let scrollPosition = 0;
  let canSwipe = true;
  let swipeTimeout = null;
  let initialScrollTop = 0;

  function handleScroll() {
    if (window.scrollY > heroHeight) {
      header.classList.add("_show");
    } else {
      header.classList.remove("_show");
    }
  }

  function animateCloseMenu() {
    mobileMenuContent.classList.remove("active");
    mobileMenuContent.classList.add("hide");
    mobileMenuDecorate.classList.remove("active");
    mobileMenuDecorate.classList.add("hide");

    setTimeout(() => {
      mobileMenuContent.style.display = "none";
      mobileMenuContent.classList.remove("hide");
      mobileMenuDecorate.style.display = "none";
      mobileMenuDecorate.classList.remove("hide");
      mobileMenu.style.display = "none";
      mobileMenuContent.style.transform = "";
      mobileMenuContent.style.opacity = "";
      mobileMenuDecorate.style.opacity = "";
      isMenuOpen = false;
    }, 350);
  }

  function openMobileMenu() {
    if (isMenuOpen) return;

    scrollPosition = window.scrollY;
    isMenuOpen = true;
    canSwipe = true;

    mobileMenu.style.display = "flex";
    mobileMenuContent.style.display = "block";
    mobileMenuDecorate.style.display = "block";

    mobileMenuContent.scrollTop = 0;

    void mobileMenuContent.offsetWidth;
    void mobileMenuDecorate.offsetWidth;

    mobileMenuContent.classList.add("active");
    mobileMenuContent.classList.remove("hide");
    mobileMenuDecorate.classList.add("active");
    mobileMenuDecorate.classList.remove("hide");

    document.body.classList.add("overflow-hidden");
  }

  function closeMobileMenu() {
    if (!isMenuOpen) return;

    document.body.classList.remove("overflow-hidden");
    window.scrollTo(0, scrollPosition);

    animateCloseMenu();
  }

  function canSwipeToClose() {
    return mobileMenuContent.scrollTop <= 1 && canSwipe;
  }

  function blockSwipeTemporarily() {
    canSwipe = false;
    if (swipeTimeout) clearTimeout(swipeTimeout);

    swipeTimeout = setTimeout(() => {
      canSwipe = true;
    }, 300);
  }

  function initMobileMenu() {
    if (mobileMenu.style.display === "flex") {
      mobileMenu.style.display = "none";
    }

    mobileLeft.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (isMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    const mobileMenuLinks = document.querySelectorAll(".mobile-menu__link");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        closeMobileMenu();

        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 400);
      });
    });

    document.addEventListener("click", function (e) {
      if (
        isMenuOpen &&
        !mobileLeft.contains(e.target) &&
        !mobileMenu.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    });

    mobileMenuContent.addEventListener(
      "touchstart",
      function (e) {
        if (!isMenuOpen) return;

        initialScrollTop = mobileMenuContent.scrollTop;
        startY = e.touches[0].clientY;
        currentY = startY;
        isDragging = true;

        if (canSwipeToClose()) {
          mobileMenuContent.style.transition = "none";
          mobileMenuDecorate.style.transition = "none";
        }
      },
      { passive: true }
    );

    mobileMenuContent.addEventListener(
      "touchmove",
      function (e) {
        if (!isDragging || !isMenuOpen) return;

        currentY = e.touches[0].clientY;
        const dragDistance = currentY - startY;

        if (
          dragDistance > 0 &&
          initialScrollTop === 0 &&
          canSwipeToClose() &&
          mobileMenuContent.scrollTop <= 1
        ) {
          mobileMenuContent.style.transform = `translateY(${dragDistance}px)`;
          mobileMenuContent.style.opacity = 1 - Math.min(dragDistance / 120, 1);
          mobileMenuDecorate.style.opacity =
            1 - Math.min(dragDistance / 100, 1);
        }
      },
      { passive: true }
    );

    mobileMenuContent.addEventListener(
      "touchend",
      function () {
        if (!isDragging || !isMenuOpen) return;

        const dragDistance = currentY - startY;
        isDragging = false;

        mobileMenuContent.style.transition = "";
        mobileMenuDecorate.style.transition = "";

        if (dragDistance > 70 && initialScrollTop === 0 && canSwipeToClose()) {
          mobileMenuContent.style.transform = `translateY(100%)`;
          mobileMenuContent.style.opacity = "0";
          mobileMenuDecorate.style.opacity = "0";
          setTimeout(closeMobileMenu, 350);
        } else {
          mobileMenuContent.style.transform = "";
          mobileMenuContent.style.opacity = "";
          mobileMenuDecorate.style.opacity = "";
        }
      },
      { passive: true }
    );

    let scrollTimeout = null;
    mobileMenuContent.addEventListener(
      "scroll",
      function () {
        if (this.scrollTop === 0) {
          blockSwipeTemporarily();
        }

        if (scrollTimeout) clearTimeout(scrollTimeout);
      },
      { passive: true }
    );

    mobileMenuDecorate.addEventListener("click", closeMobileMenu);
  }

  handleScroll();
  initMobileMenu();
  window.addEventListener("scroll", handleScroll, { passive: true });
}

document.addEventListener("DOMContentLoaded", initHeaderSticky);
