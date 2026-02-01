/* ---------------- WELCOME TEXTS (NO REPEAT) ---------------- */

const welcomeLines = [
  "Welcome to Vaishnex",
  "Vaishnex welcomes you",
  "Start your journey with Vaishnex",
  "Secure login to Vaishnex",
  "Experience Vaishnex AI",
  "Vaishnex is ready for you",
  "Hello from Vaishnex",
  "Your Vaishnex account awaits"
];

let usedWelcome = [];

function changeWelcome() {
  if (usedWelcome.length === welcomeLines.length) {
    usedWelcome = [];
  }

  let line;
  do {
    line = welcomeLines[Math.floor(Math.random() * welcomeLines.length)];
  } while (usedWelcome.includes(line));

  usedWelcome.push(line);
  document.getElementById("welcomeText").innerText = line;
}

changeWelcome();

/* ---------------- COUNTRY LIST (230+) ---------------- */

const countrySelect = document.getElementById("countrySelect");

fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    data
      .sort((a, b) => a.name.common.localeCompare(b.name.common))
      .forEach(c => {
        if (!c.idd?.root) return;

        const code = c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "");
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = `${c.flag} ${code}`;
        countrySelect.appendChild(opt);
      });
  });

/* ---------------- OTP LOGIC ---------------- */

const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const otpSection = document.getElementById("otpSection");
const timerEl = document.getElementById("timer");

let generatedOtp = "";
let timer = 30;
let interval;

sendOtpBtn.onclick = () => {
  const input = document.getElementById("userInput").value.trim();
  const error = document.getElementById("inputError");

  error.innerText = "";

  if (!input) {
    error.innerText = "Vaishnex: input required";
    return;
  }

  if (isNaN(input) && !input.includes("@")) {
    error.innerText = "Vaishnex: invalid email or number";
    return;
  }

  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("OTP (demo):", generatedOtp);

  otpSection.classList.remove("hidden");
  startTimer();
};

verifyOtpBtn.onclick = () => {
  const otpInput = document.getElementById("otpInput").value;
  const err = document.getElementById("otpError");

  err.innerText = "";

  if (!otpInput) {
    err.innerText = "Vaishnex: OTP required";
    return;
  }

  if (otpInput !== generatedOtp) {
    err.innerText = "Vaishnex: Invalid OTP";
    return;
  }

  alert("Vaishnex login successful");
};

/* ---------------- TIMER ---------------- */

function startTimer() {
  timer = 30;
  timerEl.innerText = timer;

  clearInterval(interval);

  interval = setInterval(() => {
    timer--;
    timerEl.innerText = timer;

    if (timer <= 0) {
      clearInterval(interval);
      document.getElementById("resendBox").innerText = "Resend OTP";
    }
  }, 1000);
}
