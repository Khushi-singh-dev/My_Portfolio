document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");

  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuIcon.classList.toggle("open");
    });
  }

  // Smooth scrolling
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
      navLinks.classList.remove("active"); // close menu after click
    });
  });

  // Skills Animation
  const skillsSection = document.getElementById("Skills");
  const progressBars = document.querySelectorAll(".progress");

  window.addEventListener("scroll", () => {
    if (skillsSection.getBoundingClientRect().top < window.innerHeight / 1.3) {
      progressBars.forEach(bar => {
        bar.style.animation = "fill 1.2s forwards";
      });
    }
  });

  // Typing effect
  const text = "Frontend Developer";
  let i = 0;
  const speed = 100;
  function typeWriter() {
    if (i < text.length) {
      document.querySelector(".typing-text").textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();

  // Sign Up Modal
  const signupBtn = document.getElementById("signupBtn");
  const signupModal = document.getElementById("signupModal");
  const closeModal = document.getElementById("closeModal");
  const signupForm = document.getElementById("signupForm");

  signupBtn.addEventListener("click", () => signupModal.style.display = "flex");
  closeModal.addEventListener("click", () => signupModal.style.display = "none");
  signupForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Sign Up Successful! 🎉");
    signupModal.style.display = "none";
    signupForm.reset();
  });

  // Contact Form
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    contactForm.reset();
  });
});