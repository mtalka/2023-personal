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

const scrollingText = document.querySelector(".scrolling-text");
let scrollPosition = 0;

function autoScroll() {
  scrollPosition += 1;

  if (scrollPosition >= scrollingText.scrollHeight) {
    scrollPosition = 0;
  }

  scrollingText.scrollTop = scrollPosition;

  requestAnimationFrame(autoScroll);
}

requestAnimationFrame(autoScroll);

function updateViewportDimensions() {
  const visualViewport = window.visualViewport;
  const visibleWidth = visualViewport.width;
  const visibleHeight = visualViewport.height;

  console.log(
    `Visible width: ${visibleWidth}px, visible height: ${visibleHeight}px`
  );
}

// Update dimensions when the viewport changes
window.visualViewport.addEventListener("resize", updateViewportDimensions);

// Update dimensions on page load
updateViewportDimensions();
