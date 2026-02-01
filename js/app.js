const welcomeLines = [
  "Welcome to Vaishnex",
  "Welcome back to Vaishnex",
  "Experience Vaishnex",
  "Secure login with Vaishnex",
  "Vaishnex Premium Network"
];

document.getElementById("welcomeText").innerText =
  welcomeLines[Math.floor(Math.random() * welcomeLines.length)];

const countrySelect = document.getElementById("countrySelect");
const input = document.getElementById("userInput");
const inputError = document.getElementById("inputError");

const otpBox = document.getElementById("otpBox");
const otpInput = document.getElementById("otpInput");
const otpError = document.getElementById("otpError");

const sendBtn = document.getElementById("sendOtpBtn");
const resendBtn = document.getElementById("resendBtn");
const timerText = document.getElementById("timerText");

let timer;
let seconds = 30;

/* -------- COUNTRY LIST (230+) -------- */
fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    data
      .filter(c => c.idd?.root)
      .sort((a,b) => a.name.common.localeCompare(b.name.common))
      .forEach(c => {
        const code = c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "");
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = `${c.flag} ${c.name.common} ${code}`;
        countrySelect.appendChild(opt);
      });
  });

/* -------- AUTO COUNTRY DETECT -------- */
fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(d => {
    [...countrySelect.options].forEach(o => {
      if (o.text.includes(d.country_name)) {
        countrySelect.value = o.value;
      }
    });
  });

/* -------- SEND OTP -------- */
sendBtn.onclick = () => {
  input.classList.remove("error-border");
  inputError.innerText = "";

  if (!input.value.trim()) {
    input.classList.add("error-border");
    inputError.innerText = "Enter email or mobile number";
    return;
  }

  otpBox.classList.remove("hidden");
  startTimer();
};

/* -------- TIMER -------- */
function startTimer() {
  seconds = 30;
  resendBtn.disabled = true;
  timerText.innerText = `Resend OTP in ${seconds}s`;

  timer = setInterval(() => {
    seconds--;
    timerText.innerText = `Resend OTP in ${seconds}s`;

    if (seconds <= 0) {
      clearInterval(timer);
      timerText.innerText = "";
      resendBtn.disabled = false;
    }
  }, 1000);
}

resendBtn.onclick = startTimer;

/* -------- VERIFY OTP -------- */
document.getElementById("verifyOtpBtn").onclick = () => {
  otpError.innerText = "";
  otpInput.classList.remove("error-border");

  if (!otpInput.value.trim()) {
    otpInput.classList.add("error-border");
    otpError.innerText = "OTP required";
  }
};
