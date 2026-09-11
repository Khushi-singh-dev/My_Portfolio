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
   * Smooth scroll to element with offset
   */
  function smoothScrollTo(element, offset = 80) {
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
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
          bar.style.animation = "fill 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards";
        });
        hasAnimated = true;
        window.removeEventListener("scroll", animateSkills);
      }
    };

    window.addEventListener("scroll", animateSkills);
    // Trigger once in case already in view
    animateSkills();
  }

  // ====== TYPING EFFECT ======
  const typingEl = document.querySelector(".typing-text");
  if (typingEl) {
    const textArray = [
      "Frontend Developer",
      "Web Designer",
      "UI/UX Enthusiast",
      "Full Stack Learner",
    ];
    let textIndex = 0;
    let charIndex = 0;
    const speed = 100;
    const delay = 2000;

    function typeWriter() {
      const currentText = textArray[textIndex];

      if (charIndex < currentText.length) {
        typingEl.textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
      } else {
        // Pause before erasing
        setTimeout(eraseWriter, delay);
      }
    }

    function eraseWriter() {
      const currentText = textArray[textIndex];

      if (charIndex > 0) {
        typingEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseWriter, speed / 2);
      } else {
        // Move to next text
        textIndex = (textIndex + 1) % textArray.length;
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

      // Get form data
      const name = document.getElementById("signup-name")?.value || "";
      const email = document.getElementById("signup-email")?.value || "";

      if (name && email) {
        // Show success message
        showNotification(`Welcome, ${name}! 🎉 Check your email at ${email}`);

        closeSignupModal();
      } else {
        showNotification("Please fill in all fields", "error");
      }
    });
  }

  // ====== CONTACT FORM ======
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value || "";
      const email = document.getElementById("email")?.value || "";
      const message = document.getElementById("message")?.value || "";

      if (name && email && message) {
        showNotification(
          `Thank you, ${name}! Your message has been sent. I'll get back to you soon! 📧`
        );
        contactForm.reset();
      } else {
        showNotification("Please fill in all fields", "error");
      }
    });
  }

  // ====== NOTIFICATION SYSTEM ======
  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#10b981" : "#ef4444"};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      z-index: 2000;
      animation: slideInRight 0.3s ease-out;
      max-width: 90vw;
      font-weight: 600;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }, 4000);
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

  // ====== INTERSECTION OBSERVER FOR ANIMATIONS ======
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
        }
      });
    }, observerOptions);

    // Observe skill items
    document.querySelectorAll(".skill").forEach((skill) => {
      observer.observe(skill);
    });

    // Observe project cards
    document.querySelectorAll(".project-card").forEach((card) => {
      card.style.opacity = "0";
      card.style.animation = "fadeInUp 0.6s ease-out forwards";
      observer.observe(card);
    });
  }

  // ====== SCROLL PROGRESS INDICATOR ======
  const scrollProgress = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    // You can add a progress bar element to show this
    document.documentElement.style.setProperty(
      "--scroll-progress",
      `${scrolled}%`
    );
  };

  window.addEventListener("scroll", scrollProgress);

  // ====== HEADER SCROLL EFFECT ======
  let lastScrollTop = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header?.style.setProperty("box-shadow", "0 4px 20px rgba(0, 0, 0, 0.15)");
    } else {
      header?.style.setProperty(
        "box-shadow",
        "0 2px 10px rgba(0, 0, 0, 0.1)"
      );
    }

    lastScrollTop = scrollTop;
  });

  // ====== FORM VALIDATION ======
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Add real-time validation to email inputs
  document.querySelectorAll('input[type="email"]').forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.value && !validateEmail(input.value)) {
        input.style.borderColor = "#ef4444";
      } else {
        input.style.borderColor = "";
      }
    });
  });

  // ====== DYNAMIC TITLE UPDATE ======
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.title = "Come back! 👋 - Khushi Singh Portfolio";
    } else {
      document.title = "Khushi Singh — Portfolio";
    }
  });

  // ====== LAZY LOAD IMAGES ======
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ====== PERFORMANCE MONITORING ======
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 3000) {
            console.warn("Slow interaction detected:", entry.name);
          }
        }
      });

      observer.observe({ entryTypes: ["longtask", "navigation"] });
    } catch (e) {
      // Performance observer not supported
    }
  }

  console.log("✨ Portfolio initialized successfully!");
});

// ====== ADD ANIMATION STYLES DYNAMICALLY ======
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(30px);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  img.loaded {
    animation: fadeInUp 0.6s ease-out;
  }

  .notification {
    animation: slideInRight 0.3s ease-out !important;
  }
`;
document.head.appendChild(style);
