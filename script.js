document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");
  const navListItems = document.querySelectorAll(".nav-links li");
  const anchors = document.querySelectorAll('nav a[href^="#"], nav a[href^="/"], nav a[target="_blank"]');
  const signupBtn = document.getElementById("signupBtn");
  const signupModal = document.getElementById("signupModal");
  const closeModal = document.getElementById("closeModal");
  const signupForm = document.getElementById("signupForm");
  const contactForm = document.getElementById("contactForm");

  // Helper: set aria-expanded on menu button
  function setMenuExpanded(expanded) {
    if (menuIcon) menuIcon.setAttribute("aria-expanded", expanded ? "true" : "false");
  }

  // Hamburger Menu toggle
  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
      const open = navLinks.classList.toggle("active");
      menuIcon.classList.toggle("open");
      setMenuExpanded(open);
      // if opened, move focus to first nav link for keyboard users
      if (open) {
        const firstLink = navLinks.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });
  }

  // Smooth scrolling for in-page anchors (keep existing behavior)
  anchors.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
      // Close mobile menu after clicking any nav link
      if (navLinks) navLinks.classList.remove("active");
      if (menuIcon) {
        menuIcon.classList.remove("open");
        setMenuExpanded(false);
      }
    });
  });

  // Make entire nav row (li) clickable — progressive enhancement
  navListItems.forEach(li => {
    li.addEventListener("click", (e) => {
      // If the click was on a real interactive element (a, button, input, svg), do nothing —
      // anchor clicks are already handled above.
      if (e.target.closest("a, button, input, svg, textarea")) return;

      const anchor = li.querySelector("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // If it's an in-page anchor, smoothly scroll
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else {
        // For external links, follow them (preserve target)
        if (anchor.target === "_blank") {
          window.open(href, "_blank", "noopener");
        } else {
          window.location.href = href;
        }
      }

      // Close mobile menu if open
      if (navLinks) navLinks.classList.remove("active");
      if (menuIcon) {
        menuIcon.classList.remove("open");
        setMenuExpanded(false);
      }
    });
  });

  // Skills Animation — fix ID mismatch (HTML uses id="skills")
  const skillsSection = document.getElementById("skills");
  const progressBars = document.querySelectorAll(".progress");
  if (skillsSection && progressBars.length) {
    const onScroll = () => {
      if (skillsSection.getBoundingClientRect().top < window.innerHeight / 1.3) {
        progressBars.forEach(bar => (bar.style.animation = "fill 1.2s forwards"));
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll);
    // also trigger once in case already in view
    onScroll();
  }

  // Typing effect
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

  // Sign Up Modal (guard existence)
  if (signupBtn && signupModal && closeModal && signupForm) {
    signupBtn.addEventListener("click", () => {
      signupModal.style.display = "flex";
      signupModal.setAttribute("aria-hidden", "false");
      // focus first input
      const first = signupModal.querySelector("input");
      if (first) first.focus();
    });
    closeModal.addEventListener("click", () => {
      signupModal.style.display = "none";
      signupModal.setAttribute("aria-hidden", "true");
      signupForm.reset();
    });
    signupForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Sign Up Successful! 🎉");
      signupModal.style.display = "none";
      signupModal.setAttribute("aria-hidden", "true");
      signupForm.reset();
    });
  }

  // Contact Form (guard)
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Message Sent Successfully!");
      contactForm.reset();
    });
  }

  // Close mobile menu when clicking outside (optional small UX improvement)
  document.addEventListener("click", (e) => {
    const clickedInsideNav = e.target.closest(".nav-links, .menu-icon");
    if (!clickedInsideNav && navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      if (menuIcon) {
        menuIcon.classList.remove("open");
        setMenuExpanded(false);
      }
    }
  });

  // Keyboard: close menu with Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      if (menuIcon) {
        menuIcon.classList.remove("open");
        setMenuExpanded(false);
      }
    }
  });
});
