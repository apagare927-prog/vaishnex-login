const input = document.getElementById("mainInput");
const btn = document.getElementById("actionBtn");
const countrySelect = document.getElementById("countrySelect");
const resendText = document.getElementById("resendText");
const welcomeText = document.getElementById("welcomeText");

let otpSent = false;
let timer = 30;

/* DYNAMIC WELCOME */
const welcomes = [
  "Welcome to Vaishnex",
  "Welcome back to Vaishnex",
  "Secure login with Vaishnex",
  "Start your journey with Vaishnex",
  "Vaishnex is happy to see you"
];
welcomeText.innerText =
  welcomes[Math.floor(Math.random() * welcomes.length)];

/* LOAD COUNTRIES */
countries.forEach(c => {
  const opt = document.createElement("option");
  opt.value = c.code;
  opt.textContent = `${c.name} ${c.code}`;
  countrySelect.appendChild(opt);
});

/* INPUT DETECTION (🔥 FIX HERE) */
input.addEventListener("input", () => {
  if (otpSent) return;

  const value = input.value.trim();

  // If starts with number → MOBILE
  if (/^[0-9]/.test(value)) {
    countrySelect.classList.remove("hidden");
  } else {
    countrySelect.classList.add("hidden");
  }
});

/* BUTTON CLICK */
btn.onclick = () => {
  input.classList.remove("error");

  if (!otpSent) {
    if (!input.value.trim()) {
      input.classList.add("error");
      return;
    }

    otpSent = true;

    // Move to OTP stage
    input.value = "";
    input.placeholder = "Enter OTP";
    countrySelect.classList.add("hidden");
    btn.innerText = "Verify OTP";

    startTimer();
  } else {
    if (input.value.length !== 6) {
      input.classList.add("error");
      return;
    }

    alert("OTP verified ✔ → Dashboard");
  }
};

/* RESEND OTP TIMER */
function startTimer() {
  resendText.classList.remove("hidden");
  resendText.innerText = `Resend OTP in ${timer}s`;

  const t = setInterval(() => {
    timer--;
    resendText.innerText = `Resend OTP in ${timer}s`;

    if (timer === 0) {
      clearInterval(t);
      resendText.innerText = "Resend OTP";
      timer = 30;
    }
  }, 1000);
}
