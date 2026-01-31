const emailBtn = document.getElementById("emailBtn");
const mobileBtn = document.getElementById("mobileBtn");
const emailInput = document.getElementById("email");
const mobileBox = document.querySelector(".mobileBox");

if (emailBtn && mobileBtn) {
  emailBtn.onclick = () => {
    emailBtn.classList.add("active");
    mobileBtn.classList.remove("active");
    emailInput.style.display = "block";
    mobileBox.classList.add("hidden");
  };

  mobileBtn.onclick = () => {
    mobileBtn.classList.add("active");
    emailBtn.classList.remove("active");
    emailInput.style.display = "none";
    mobileBox.classList.remove("hidden");
  };
}

// VALIDATION
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = false;

    form.querySelectorAll("input").forEach(input => {
      input.classList.remove("error");
      if (input.value.trim() !== "") valid = true;
    });

    if (!valid) {
      form.querySelectorAll("input").forEach(i => i.classList.add("error"));
    } else {
      alert("Form submitted (demo)");
    }
  });
});
