const countrySelect = document.getElementById("countrySelect");
const userInput = document.getElementById("userInput");
const inputError = document.getElementById("inputError");
const sendOtpBtn = document.getElementById("sendOtpBtn");

const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otpInput");
const otpError = document.getElementById("otpError");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const timerText = document.getElementById("timerText");
const resendBtn = document.getElementById("resendBtn");

/* ===============================
   COUNTRIES (230+ SAFE API)
================================ */
fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    const countries = data
      .filter(c => c.idd?.root)
      .map(c => ({
        name: c.name.common,
        code: c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "")
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    countries.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.code;
      opt.textContent = `${c.name} (${c.code})`;
      countrySelect.appendChild(opt);
    });

    autoDetectCountry();
  });

/* AUTO COUNTRY */
function autoDetectCountry() {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
      [...countrySelect.options].forEach(o => {
        if (o.text.includes(data.country_name)) {
          o.selected = true;
        }
      });
    });
}

/* ===============================
   SEND OTP
================================ */
sendOtpBtn.onclick = () => {
  inputError.textContent = "";
  userInput.classList.remove("error-border");

  const value = userInput.value.trim();

  if (!value) {
    showError("Input required");
    return;
  }

  if (value.includes("@")) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      showError("Invalid email");
      return;
    }
  } else {
    if (!/^\d{6,15}$/.test(value)) {
      showError("Invalid mobile number");
      return;
    }
  }

  otpSection.classList.remove("hidden");
  startTimer();
};

/* ===============================
   OTP TIMER
================================ */
let timer;
function startTimer() {
  let time = 30;
  resendBtn.classList.add("hidden");

  timerText.textContent = `Resend OTP in ${time}s`;

  timer = setInterval(() => {
    time--;
    timerText.textContent = `Resend OTP in ${time}s`;
    if (time === 0) {
      clearInterval(timer);
      timerText.textContent = "";
      resendBtn.classList.remove("hidden");
    }
  }, 1000);
}

/* RESEND */
resendBtn.onclick = () => {
  startTimer();
};

/* VERIFY */
verifyOtpBtn.onclick = () => {
  otpError.textContent = "";
  if (otpInput.value.length < 4) {
    otpError.textContent = "Invalid OTP";
  } else {
    alert("OTP Verified (demo)");
  }
};

/* ERROR */
function showError(msg) {
  inputError.textContent = msg;
  userInput.classList.add("error-border");
}
