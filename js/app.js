let otp = null;
let timerInterval;
let timeLeft = 30;

const userInput = document.getElementById("userInput");
const countrySelect = document.getElementById("country");
const resendBtn = document.getElementById("resendBtn");
const timerText = document.getElementById("timer");

/* LOAD COUNTRIES (230+) */
fetch("https://restcountries.com/v3.1/all")
  .then(r => r.json())
  .then(data => {
    data.forEach(c => {
      if (c.idd?.root) {
        const code = c.idd.root + (c.idd.suffixes?.[0] || "");
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = `${c.flag || ""} ${code}`;
        countrySelect.appendChild(opt);
      }
    });
  });

/* EMAIL / MOBILE DETECT */
userInput.addEventListener("input", () => {
  const val = userInput.value.trim();
  if (/^\d{5,}$/.test(val)) {
    countrySelect.classList.remove("hidden");
  } else {
    countrySelect.classList.add("hidden");
  }
});

function sendOTP() {
  const val = userInput.value.trim();
  const err = document.getElementById("inputError");
  err.classList.remove("error-active");

  if (!val) {
    err.classList.add("error-active");
    return;
  }

  otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("OTP:", otp);

  document.getElementById("otpBox").classList.remove("hidden");

  resendBtn.style.display = "none"; // 🔴 HIDE resend
  startTimer();
  autoReadOTP();
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;

  timerText.textContent = `Resend OTP in ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Resend OTP in ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerText.textContent = "";
      resendBtn.style.display = "inline"; // ✅ SHOW resend
    }
  }, 1000);
}

function resendOTP() {
  if (timeLeft > 0) return;
  sendOTP();
}

function verifyOTP() {
  const entered = document.getElementById("otpInput").value.trim();
  const err = document.getElementById("otpError");
  err.classList.remove("error-active");

  if (entered !== otp) {
    err.classList.add("error-active");
    return;
  }

  document.getElementById("loginCard").classList.add("hidden");
  document.getElementById("successCard").classList.remove("hidden");
}

/* AUTO OTP READ (ANDROID CHROME) */
async function autoReadOTP() {
  if (!("OTPCredential" in window)) return;

  try {
    const content = await navigator.credentials.get({
      otp: { transport: ["sms"] },
      signal: new AbortController().signal
    });
    document.getElementById("otpInput").value = content.code;
    verifyOTP();
  } catch (e) {}
}
