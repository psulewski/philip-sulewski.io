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

// alternate names that should resolve to an existing page
const pageAliases = { resume: "cv" };

const normalizePageName = function (name) {
  const key = name.trim().toLowerCase();
  return pageAliases[key] || key;
}

// show one page and mark its nav link active; returns false if no such page exists
const activatePage = function (name) {

  const targetPageName = normalizePageName(name);
  let pageFound = false;

  for (let i = 0; i < pages.length; i++) {
    const isMatch = pages[i].dataset.page.toLowerCase() === targetPageName;
    pages[i].classList.toggle("active", isMatch);
    if (isMatch) pageFound = true;
  }

  if (!pageFound) return false;

  for (let i = 0; i < navigationLinks.length; i++) {
    const isMatch = normalizePageName(navigationLinks[i].innerHTML) === targetPageName;
    navigationLinks[i].classList.toggle("active", isMatch);
  }

  return true;

}

const activatePageFromHash = function () {
  const fromHash = window.location.hash.slice(1);
  return fromHash ? activatePage(fromHash) : false;
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const targetPageName = normalizePageName(this.innerHTML);

    if (!activatePage(targetPageName)) {
      console.warn("No matching page found for:", targetPageName);
      return;
    }

    // keep the URL in sync so every section is linkable, e.g. /#resources
    if (normalizePageName(window.location.hash.slice(1)) !== targetPageName) {
      window.history.pushState(null, "", "#" + targetPageName);
    }

    window.scrollTo(0, 0);

  });
}

// in-page links and browser back/forward
window.addEventListener("hashchange", function () {
  if (activatePageFromHash()) window.scrollTo(0, 0);
});

// Initialize the page - honour the URL hash, otherwise show the first page
const initPage = function () {

  if (activatePageFromHash()) return;

  const activeNavLink = document.querySelector("[data-nav-link].active") || navigationLinks[0];
  if (activeNavLink) activatePage(activeNavLink.innerHTML);

}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}



// copy-to-clipboard buttons on code blocks
const copyButtons = document.querySelectorAll("[data-copy-btn]");

for (let i = 0; i < copyButtons.length; i++) {
  copyButtons[i].addEventListener("click", function () {

    const block = this.closest("[data-copy-block]");
    const source = block && block.querySelector("[data-copy-source]");
    const label = this.querySelector("[data-copy-label]");

    if (!source || !navigator.clipboard) return;

    const button = this;

    navigator.clipboard.writeText(source.innerText.trim()).then(function () {

      button.classList.add("copied");
      if (label) label.innerText = "Copied";

      setTimeout(function () {
        button.classList.remove("copied");
        if (label) label.innerText = "Copy";
      }, 1600);

    });

  });
}
