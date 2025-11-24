window.addEventListener("scroll",()=>{
    const skillsSection =
    document.getElementById("skills");
    const progressBars =
    document.querySelectorAll(".progress");
    const sectionPosition =
    skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if(sectionPosition < screenPosition){
        progressBars.forEach((bar)=>{
            bar.style.animation = "fill 1s forwards";
        });
    }
});
  const text = "Frontend Developer";
  let i = 0;
  const speed = 100; // typing speed (ms)

  function typeWriter() {
    if (i < text.length) {
      document.querySelector(".typing-text").textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  window.onload = typeWriter;

  const signupBtn = document.getElementById("signupBtn");
  const signupModal = document.getElementById("signupModal");
  const closeModal = document.getElementById("closeModal");
  const signupForm = document.getElementById("signupForm");

  // Open modal
  signupBtn.addEventListener("click", () => {
    signupModal.style.display = "flex";
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    signupModal.style.display = "none";
  });

  // Submit form
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Sign Up Successful! 🎉");
    signupModal.style.display = "none";
    signupForm.reset(); // clear input fields
  });

  contactForm.addEventListener("submit",(e) => {
    e.preventDefault();
    alert("msg sent Successfully!");
    contactForm.reset();
  });

