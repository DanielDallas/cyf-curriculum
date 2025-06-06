// I haven't written anything fancy here, just a few things to make the site work

// menu toggle
const menuToggles = document.querySelectorAll(".js-menu-toggle");
const menu = document.getElementById("site-menu");
const skipLink = document.getElementById("skip-link");
function toggleMenu() {
  menu.classList.toggle("is-active");
  menu.toggleAttribute("hidden");
  main.toggleAttribute("inert");
  if (menu.getAttribute("hidden") == null) {
    menu.focus();
  } else {
    skipLink.focus({ preventScroll: true });
  }
}
// listeners - we allow anything to toggle Menu if nominated with the class
menuToggles.forEach((toggle) => toggle.addEventListener("click", toggleMenu));

// if the menu is open listen for escape key to close it
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("is-active")) {
    toggleMenu();
  }
  // if meta plus slash key combination is pressed toggle the menu
  if (e.key === "/" && e.metaKey) {
    toggleMenu();
  }
});

// if a block has notes on the back, double click to flip
// Select all elements with the data-card attribute
const cards = document.querySelectorAll("[data-card]");

// Add a double click event listener to each card
cards.forEach((card) => {
  card.addEventListener("dblclick", () => {
    // Toggle the is-flipped class on double click
    card.classList.toggle("is-active");
  });
  card.addEventListener("keydown", (event) => {
    // kbd interaction
    if (event.key === "Tab") {
      card.classList.toggle("is-active");
    }
  });
});

// I think this should probably be a custom render hook, will read up
// probably actually want to render all code blocks as code mirrors
// query all code blocks with a data-lang attribute
const editableCodeBlocks = document.querySelectorAll("code[data-lang]");
editableCodeBlocks.forEach((block) => {
  block.setAttribute("contenteditable", true);
  block.setAttribute("spellcheck", false);
  block.setAttribute("autocorrect", "off");
  block.setAttribute("autocapitalize", "off");
});

// Fix for GFM task lists
// https://github.com/github/cmark-gfm/issues/299
window.addEventListener("DOMContentLoaded", (event) => {
  const taskListItems = document.querySelectorAll(
    "ul > li > input[type=checkbox]"
  );
  taskListItems.forEach((item) => {
    item.removeAttribute("disabled");
    const parent = item.parentNode;
    parent.innerHTML = `<label>${parent.innerHTML}</label>`;
  });
});

// Toggle learning objectives for print
window.addEventListener("beforeprint", () => {
  document
    .querySelectorAll("details")
    .forEach((d) => d.setAttribute("open", ""));
});
