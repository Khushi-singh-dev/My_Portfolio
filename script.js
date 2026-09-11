/**
 * Fully Dynamic Portfolio Script
 * Enhanced interactivity for desktop and mobile
 */

document.addEventListener("DOMContentLoaded", () => {
  // ====== ELEMENT REFERENCES ======
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");
  const navListItems = document.querySelectorAll(".nav-links li");
  const anchors = document.querySelectorAll(
    'nav a[href^="#"], nav a[href^="/"], nav a[target="_blank"]'
  );
  const signupBtn = document.getElementById("signupBtn");
  const signupModal = document.getElementById("signupModal");
  const closeModal = document.getElementById("closeModal");
  const signupForm = document.getElementById("signupForm");
  const contactForm = document.getElementById("contactForm");
  const skillsSection = document.getElementById("skills");
  const progressBars = document.querySelectorAll(".progress");

  // ====== UTILITIES ======

  /**
   * Set aria-expanded attribute on menu button
   */
  function setMenuExpanded(expanded) {
    if (menuIcon) {
      menuIcon.setAttribute("aria-expanded", expanded ? "true" : "false");
    }
  }

  /**
   * Toggle body scroll (for modal)
   */
  function toggleBodyScroll(disable) {
    if (disable) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }

  /**
   * Close all open menus and modals
   */
  function closeAllMenus() {
    if (navLinks) {
      navLinks.classList.remove("active");
    }
    if (menuIcon) {
      menuIcon.classList.remove("open");
      setMenuExpanded(false);
    }
  }

  /**
   * Smooth scroll to element
   */
  function smoothScrollTo(element) {
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  // ====== HAMBURGER MENU ======
  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("active");
      menuIcon.classList.toggle("open", isOpen);
      setMenuExpanded(isOpen);

      // Move focus to first nav link for keyboard users
      if (isOpen) {
        const firstLink = navLinks.querySelector("a");
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100);
        }
      }
    });
  }

  // ====== SMOOTH SCROLLING FOR ANCHORS ======
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        smoothScrollTo(target);
      }

      // Close mobile menu after clicking
      closeAllMenus();
    });
  });

  // ====== MAKE NAV ITEMS FULLY CLICKABLE ======
  navListItems.forEach((li) => {
    li.addEventListener("click", (e) => {
      // Don't interfere with real interactive elements
      if (e.target.closest("a, button, input, svg, textarea")) return;

      const anchor = li.querySelector("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Handle in-page anchors
      if (href.startsWith("#")) {
        e.preventDefault();
        smoothScrollTo(document.querySelector(href));
      } else {
        // Handle external links
        if (anchor.target === "_blank") {
          window.open(href, "_blank", "noopener");
        } else {
          window.location.href = href;
        }
      }

      // Close mobile menu
      closeAllMenus();
    });
  });

  // ====== SKILLS ANIMATION ======
  if (skillsSection && progressBars.length) {
    let hasAnimated = false;

    const animateSkills = () => {
      const rect = skillsSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;

      if (isVisible && !hasAnimated) {
        progressBars.forEach((bar) => {
          bar.style.animation = "fill 1.2s forwards";
        });
        hasAnimated = true;
        window.removeEventListener("scroll", animateSkills);
      }
    };

    window.addEventListener("scroll", animateSkills);
    // Trigger once in case already in view
    animateSkills();
  }

  // ====== TYPING EFFECT - SIMPLE VERSION ======
  const typingEl = document.querySelector(".typing-text");
  if (typingEl) {
    const text = "Frontend Developer";
    let i = 0;
    const speed = 100;
    
    function typeWriter() {
      if (i < text.length) {
        typingEl.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    
    typeWriter();
  }

  // ====== SIGNUP MODAL ======
  if (signupBtn && signupModal && closeModal && signupForm) {
    signupBtn.addEventListener("click", () => {
      signupModal.classList.add("active");
      signupModal.setAttribute("aria-hidden", "false");
      toggleBodyScroll(true);

      // Focus first input
      setTimeout(() => {
        const firstInput = signupModal.querySelector("input");
        if (firstInput) firstInput.focus();
      }, 100);
    });

    closeModal.addEventListener("click", () => {
      closeSignupModal();
    });

    // Close modal when clicking outside (on background)
    signupModal.addEventListener("click", (e) => {
      if (e.target === signupModal) {
        closeSignupModal();
      }
    });

    function closeSignupModal() {
      signupModal.classList.remove("active");
      signupModal.setAttribute("aria-hidden", "true");
      toggleBodyScroll(false);
      signupForm.reset();
    }

    // Keyboard: close with Escape
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        signupModal.classList.contains("active")
      ) {
        closeSignupModal();
      }
    });

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Sign Up Successful! 🎉");
      closeSignupModal();
    });
  }

  // ====== CONTACT FORM - SIMPLE VERSION ======
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Message Sent Successfully!");
      contactForm.reset();
    });
  }

  // ====== CLOSE MENU ON OUTSIDE CLICK ======
  document.addEventListener("click", (e) => {
    const clickedInsideNav = e.target.closest(".nav-links, .menu-icon");

    if (!clickedInsideNav && navLinks && navLinks.classList.contains("active")) {
      closeAllMenus();
    }
  });

  // ====== KEYBOARD NAVIGATION ======
  document.addEventListener("keydown", (e) => {
    // Close menu with Escape
    if (e.key === "Escape" && navLinks?.classList.contains("active")) {
      closeAllMenus();
    }
  });

  console.log("✨ Portfolio initialized successfully!");
});
