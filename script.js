document.addEventListener("DOMContentLoaded", () => {
    const accordionItems = document.querySelectorAll(".accordion-item");
    const accordionContainer = document.querySelector("#accordion");
  
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
  
        // Calculate height of closed sections and margins
        const closedSectionsHeight = Array.from(accordionItems)
          .filter((otherItem) => otherItem !== item)
          .reduce(
            (height, otherItem) =>
              height + otherItem.offsetHeight + parseInt(getComputedStyle(otherItem).marginTop) + parseInt(getComputedStyle(otherItem).marginBottom),
            0
          );
  
        // Set max-height of open section to fill remaining space
        const maxHeight = window.visualViewport.height - closedSectionsHeight - item.querySelector(".accordion-header").offsetHeight;
        item.querySelector(".accordion-content").style.maxHeight = `${maxHeight}px`;
  
        // Open the clicked section
        item.querySelector(".accordion-content").classList.remove("hidden");
        item.classList.remove("closed-max-height");
        item.classList.add("open");
        item.querySelector(".accordion-header").classList.add("rotated");
      });
    });
  });
  
  // We listen to the resize and orientationchange events
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  
  window.addEventListener("orientationchange", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  
  async function loadHTML() {
    const sections = ["about", "work", "school", "contact"];
    for (const section of sections) {
        const response = await fetch(`contents/${section}.html`);
        const data = await response.text();
        document.getElementById(`${section}`).innerHTML = data;
    }
  }
  
  // Call the function to load the content
  loadHTML();