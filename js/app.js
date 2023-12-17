/*****Constants*****/

const TOP_VALUE = 150;
const BOTTOM_VALUE = 150;
const DEFAULT_VALUE = -150;

/*******************/

/*****Helper Functions*****/

const getDataNavSections = () => {
  const allSections = document.querySelectorAll("section");
  const dataNavSections = [];

  allSections.forEach((section) => {
    const navDataset = section.dataset.nav;
    if (navDataset && navDataset.includes("Section")) {
      dataNavSections.push(section);
    }
  });

  return dataNavSections;
};

/**************************/

/*****Main Functions*****/

/**
 * This function creates the navigation links within the navbar at the top of the page.
 * On click of each link it will navigate the page to the corresponding section
 */
const createNavLinks = () => {
  const sections = getDataNavSections();
  const ul = document.querySelector("#navbar__list");
  const fragment = document.createDocumentFragment();

  // Get all the sections available. If the section has a data-nav property set to Section# then add a nav link to navbar.
  // In future if a new section is added with same data-nav property then a link will be added to navigate to that section in the navbar
  // we are using fragments to avoid appendChild call on document which may affect the performance inside a loop.
  sections.forEach((section) => {
    const navDataset = section.dataset.nav;
    const li = document.createElement("li");
    li.innerHTML = `<a href="#${section.id}" class="menu__link">${navDataset}</a>`;
    fragment.appendChild(li);
  });

  ul.append(fragment);
};

createNavLinks();

/************************/

/*****Event Listeners and Handlers*/

/**
 * Event listener to handle click on all of the section links in navbar.
 * By handling it on the parent element, we are avoiding the need to add listeners to each individual links.
 * On clck of the link, the corresponding section will be moved into the viewport with smooth scroll action
 */
const navbarList = document.querySelector("#navbar__list");

const updateNavBarHandler = (event) => {
  // Only clicks on the section links should be processed.
  // Also we are disabling the default action of link which is to scroll to the respective seciton tag.
  if (event.target.nodeName.toLowerCase() === "a") {
    event.preventDefault();
    // Using the anchor tags href attribute to get the id of the section to be scrolled into viewport
    const sectionId = event.target.getAttribute("href");

    if (sectionId.includes("#section")) {
      document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
    }
  }
};
navbarList.addEventListener("click", updateNavBarHandler);

/**
 * Event listener to handle scrolling.
 * When any of the section reaches close to the top of the viewport it will be marked as active.
 * When the same section moves away from the viewport it will be marked inactive
 */

const scrollEventHandler = () => {
  const sections = getDataNavSections();
  const mainHeading = document.querySelector(".main__hero").firstElementChild;

  const rectMainHeading = mainHeading.getBoundingClientRect();
  if (rectMainHeading.top >= DEFAULT_VALUE) {
    // This condition is added to make sure that the first section retains the default active class
    const section1 = document.querySelector("#section1");
    if (!section1.classList.contains("active__section")) {
      section1.classList.add("active__section");
    }
  } else {
    sections.forEach((section) => {
      const rectSection = section.getBoundingClientRect();
      if (rectSection.top <= TOP_VALUE && rectSection.bottom >= BOTTOM_VALUE) {
        if (!section.classList.contains("active__section")) {
          section.classList.add("active__section");
        }
      } else {
        if (section.classList.contains("active__section")) {
          section.classList.remove("active__section");
        }
      }
    });
  }
};

document.addEventListener("scroll", scrollEventHandler);

/******************************/
