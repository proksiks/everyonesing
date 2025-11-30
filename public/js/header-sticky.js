function initHeaderSticky() {
  const header = document.querySelector(".header-sticky");
  const headerMain = document.querySelector(".header");
  if (!header || !headerMain) return;
  const heroHeight = headerMain.offsetHeight;

  function handleScroll() {
    if (window.scrollY > heroHeight) {
      header.classList.add("_show");
    } else {
      header.classList.remove("_show");
    }
  }

  handleScroll();

  window.addEventListener("scroll", handleScroll);
}

document.addEventListener("DOMContentLoaded", initHeaderSticky);
