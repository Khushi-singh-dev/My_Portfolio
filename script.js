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

// //Q1.
//   let nums = [1,2,3];
//   let double = nums.map(n=>n*2);
//   console.log(double);
// //Q2.
//   let newnum = [3,6,8,9]
//   let filter = newnum.filter(n=> n>5);
//   console.log(filter)
// //Q3.
//   const user = { name: "khushi", age: 29 };
//   const newobj = {user};
//   console.log(newobj);
// //Q4.
//   const product = {title: "phone",price: 12000};
//   const {title,price} = product;
//   console.log(product);
// //Q5.
//   async function getData(){
//     const result = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await result.json();
//     data.forEach(user => {
//       console.log(user.name);
//     });
    
//   };
//   getData();
// //Q6.
//   let newnums = [1,2,3];
//   const newarr = [newnums];
//   console.log(newarr);