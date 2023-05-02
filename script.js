document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item");

  // Initialize the first accordion item as open
  accordionItems[0]
    .querySelector(".accordion-content")
    .classList.remove("hidden");
  accordionItems[0].classList.remove("closed-max-height");
  accordionItems[0].classList.add("open");
  accordionItems[0].querySelector(".accordion-header").classList.add("rotated");

  accordionItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Skip if the item is already open
      if (item.classList.contains("open")) {
        return;
      }

      // Close other open sections
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.querySelector(".accordion-content").classList.add("hidden");
          otherItem.classList.add("closed-max-height");
          otherItem.classList.remove("open");
          otherItem
            .querySelector(".accordion-header")
            .classList.remove("rotated");
        }
      });

      // Open the clicked section
      item.querySelector(".accordion-content").classList.remove("hidden");
      item.classList.remove("closed-max-height");
      item.classList.add("open");
      item.querySelector(".accordion-header").classList.add("rotated");
    });
  });
});

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
