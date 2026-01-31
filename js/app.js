const input = document.getElementById("userInput");
const country = document.getElementById("countrySelect");
const btn = document.getElementById("sendOtp");
const welcome = document.getElementById("welcomeText");

const welcomeLines = [
  "Welcome to Vaishnex",
  "Secure access to Vaishnex",
  "Vaishnex welcomes you",
  "Continue with Vaishnex",
  "Login to Vaishnex"
];

welcome.innerText =
  welcomeLines[Math.floor(Math.random() * welcomeLines.length)];

input.addEventListener("input", () => {
  const val = input.value.trim();

  if (/^\d+$/.test(val)) {
    country.classList.remove("hidden");
  } else {
    country.classList.add("hidden");
  }
});

btn.addEventListener("click", () => {
  if (input.value.trim() === "") {
    input.classList.add("error");
    setTimeout(() => input.classList.remove("error"), 500);
    return;
  }

  alert("OTP sent successfully");

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 900);
});
