document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".faq__item-title");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const accordionItem = this.closest(".faq__item");
      const content = accordionItem.querySelector(".faq__item-content");
      const isActive = this.classList.contains("_active");

      if (isActive) {
        closeAccordion(content, this);
      } else {
        closeAllAccordions();

        openAccordion(content, this);
      }
    });
  });

  function closeAllAccordions() {
    const allButtons = document.querySelectorAll(".faq__item-title._active");
    const allContents = document.querySelectorAll(".faq__item-content._active");

    allButtons.forEach((button) => {
      button.classList.remove("_active");
    });

    allContents.forEach((content) => {
      content.style.height = "0";
      content.style.opacity = "0";
      content.classList.remove("_active");
    });
  }

  function openAccordion(content, button) {
    const contentHeight = content.scrollHeight + "px";
    button.classList.add("_active");
    content.style.height = contentHeight;
    content.style.opacity = "1";
    content.classList.add("_active");
  }

  function closeAccordion(content, button) {
    const contentHeight = content.scrollHeight + "px";
    content.style.height = contentHeight;
    void content.offsetWidth;
    button.classList.remove("_active");
    content.style.height = "0";
    content.style.opacity = "0";
    content.classList.remove("_active");
  }
});
