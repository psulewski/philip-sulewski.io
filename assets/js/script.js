'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Only add select functionality if select element exists
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc(selectedValue);

    if (lastClickedBtn) {
      lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    
    // Store reference to the clicked navigation link
    const clickedNavLink = this;
    const targetPageName = this.innerHTML.toLowerCase();

    console.log('Clicked navigation:', targetPageName); // Debug log

    // Remove active class from all pages and navigation links
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
      console.log('Removing active from page:', pages[j].dataset.page); // Debug log
    }
    
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }

    // Find and activate the matching page
    let pageFound = false;
    for (let j = 0; j < pages.length; j++) {
      // Handle different possible naming conventions
      const pageName = pages[j].dataset.page;
      if (targetPageName === pageName || 
          targetPageName === pageName.toLowerCase() ||
          (targetPageName === "cv" && pageName.toLowerCase() === "cv") ||
          (targetPageName === "resume" && pageName.toLowerCase() === "cv") ||
          (targetPageName === "cv" && pageName.toLowerCase() === "resume")) {
        pages[j].classList.add("active");
        console.log('Activated page:', pageName); // Debug log
        pageFound = true;
        break;
      }
    }
    
    if (!pageFound) {
      console.warn('No matching page found for:', targetPageName);
      console.log('Available pages:', Array.from(pages).map(p => p.dataset.page));
    }
    
    // Activate the clicked navigation link
    clickedNavLink.classList.add("active");
    window.scrollTo(0, 0);

  });
}

// Initialize the page - show the first page by default
document.addEventListener('DOMContentLoaded', function() {
  // Find the first navigation link that's marked as active, or default to the first one
  let activeNavLink = document.querySelector("[data-nav-link].active");
  if (!activeNavLink && navigationLinks.length > 0) {
    activeNavLink = navigationLinks[0];
    activeNavLink.classList.add("active");
  }
  
  if (activeNavLink) {
    const targetPageName = activeNavLink.innerHTML.toLowerCase();
    
    // Activate the corresponding page
    for (let i = 0; i < pages.length; i++) {
      const pageName = pages[i].dataset.page;
      if (targetPageName === pageName || targetPageName === pageName.toLowerCase()) {
        pages[i].classList.add("active");
        break;
      }
    }
  }
});