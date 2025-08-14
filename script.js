// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 70,
      behavior: "smooth",
    });
  });
});

// Add fade-in animation on scroll
const sections = document.querySelectorAll(".section");
const options = {
  threshold: 0.1,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

// Card hover animation trigger
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("hover");
  });
  card.addEventListener("mouseleave", () => {
    card.classList.remove("hover");
  });
});

// Expand/Collapse functionality for contents section
const expandBtn = document.getElementById("expandBtn");
const hiddenCards = document.querySelectorAll(".hidden-card");
let isExpanded = false;

if (expandBtn) {
  expandBtn.addEventListener("click", () => {
    if (!isExpanded) {
      // Show hidden cards
      hiddenCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("show");
        }, index * 200); // Stagger the animation
      });

      // Update button text and icon
      expandBtn.querySelector("span").textContent = "Show Less";
      expandBtn.classList.add("expanded");
      isExpanded = true;
    } else {
      // Hide cards
      hiddenCards.forEach((card) => {
        card.classList.remove("show");
      });

      // Update button text and icon
      expandBtn.querySelector("span").textContent = "Show All Contents";
      expandBtn.classList.remove("expanded");
      isExpanded = false;
    }
  });
}

// Mobile Navigation Functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileOffcanvas = document.getElementById("mobileOffcanvas");
const mobileOverlay = document.getElementById("mobileOverlay");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

// Open mobile menu
function openMobileMenu() {
  mobileOffcanvas.classList.add("active");
  mobileOverlay.classList.add("active");
  mobileMenuBtn.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Close mobile menu
function closeMobileMenu() {
  mobileOffcanvas.classList.remove("active");
  mobileOverlay.classList.remove("active");
  mobileMenuBtn.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Event listeners
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", openMobileMenu);
}

if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", closeMobileMenu);
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", closeMobileMenu);
}

// Close menu when clicking on navigation links
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileOffcanvas.classList.contains("active")) {
    closeMobileMenu();
  }
});
