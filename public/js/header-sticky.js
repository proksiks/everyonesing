function initHeaderSticky() {
  const header = document.querySelector(".header-sticky");
  const headerMain = document.querySelector(".header");
  const mobileLeft = document.querySelector(".mobile-sticky__left");
  const mobileMenuContent = document.querySelector(".mobile-menu__content");
  const mobileMenuDecorate = document.querySelector(".mobile-menu__decorate");

  if (!header || !headerMain) return;

  const heroHeight = headerMain.offsetHeight;
  let isMenuOpen = false;
  let startY = 0;
  let currentY = 0;
  let isDragging = false;

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
    document.body.classList.remove("overflow-hidden");

    setTimeout(() => {
      mobileMenuContent.style.display = "none";
      mobileMenuContent.classList.remove("hide");
      mobileMenuDecorate.style.display = "none";
      mobileMenuDecorate.classList.remove("hide");
      mobileMenuContent.style.transform = "";
      mobileMenuContent.style.opacity = "";
      mobileMenuDecorate.style.opacity = "";
      isMenuOpen = false;
    }, 350);
  }

  function openMobileMenu() {
    isMenuOpen = true;
    mobileMenuContent.style.display = "block";
    mobileMenuDecorate.style.display = "block";
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
    animateCloseMenu();
  }

  function initMobileMenu() {
    closeMobileMenu();

    mobileLeft.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (isMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    document.addEventListener("click", function (e) {
      if (
        isMenuOpen &&
        !mobileLeft.contains(e.target) &&
        !mobileMenuContent.contains(e.target) &&
        !mobileMenuDecorate.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileMenu();
    });

    mobileMenuContent.addEventListener("touchstart", function (e) {
      if (!isMenuOpen) return;
      startY = e.touches[0].clientY;
      currentY = startY;
      isDragging = true;
      mobileMenuContent.style.transition = "none";
      mobileMenuDecorate.style.transition = "none";
    });

    mobileMenuContent.addEventListener("touchmove", function (e) {
      if (!isDragging || !isMenuOpen) return;
      currentY = e.touches[0].clientY;
      const dragDistance = currentY - startY;
      if (dragDistance > 0) {
        mobileMenuContent.style.transform = `translateY(${dragDistance}px)`;
        mobileMenuContent.style.opacity = `${
          1 - Math.min(dragDistance / 120, 1)
        }`;
        mobileMenuDecorate.style.opacity = `${
          1 - Math.min(dragDistance / 100, 1)
        }`;
      }
    });

    mobileMenuContent.addEventListener("touchend", function () {
      if (!isDragging || !isMenuOpen) return;
      const dragDistance = currentY - startY;
      isDragging = false;
      mobileMenuContent.style.transition = "";
      mobileMenuDecorate.style.transition = "";
      if (dragDistance > 70) {
        mobileMenuContent.style.transform = `translateY(100%)`;
        mobileMenuContent.style.opacity = "0";
        mobileMenuDecorate.style.opacity = "0";
        setTimeout(closeMobileMenu, 350);
      } else {
        mobileMenuContent.style.transform = "";
        mobileMenuContent.style.opacity = "";
        mobileMenuDecorate.style.opacity = "";
      }
    });
  }

  handleScroll();
  initMobileMenu();
  window.addEventListener("scroll", handleScroll);
}
document.addEventListener("DOMContentLoaded", initHeaderSticky);
