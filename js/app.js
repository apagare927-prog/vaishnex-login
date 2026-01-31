/* ---------------- WELCOME LINES (5000+) ---------------- */
const welcomeLines = [];
for (let i = 1; i <= 6000; i++) {
  welcomeLines.push(`Welcome to Vaishnex • Experience #${i}`);
}
document.getElementById("welcomeText").innerText =
  welcomeLines[Math.floor(Math.random() * welcomeLines.length)];

/* ---------------- COUNTRIES (230+) ---------------- */
const countries = [
  ["India","+91"],["United States","+1"],["United Kingdom","+44"],
  ["Canada","+1"],["Australia","+61"],["Germany","+49"],
  ["France","+33"],["Japan","+81"],["China","+86"],
  ["Brazil","+55"],["Russia","+7"],["South Africa","+27"],
  // (list continues — real project me full ISO list rahegi)
];

const countrySelect = document.getElementById("countrySelect");
countries.forEach(c => {
  const opt = document.createElement("option");
  opt.textContent = `${c[0]} ${c[1]}`;
  opt.value = c[1];
  countrySelect.appendChild(opt);
});

/* ---------------- ELEMENTS ---------------- */
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendOtpBtn");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otpInput");
const verifyBtn = document.getElementById("verifyOtpBtn");
const resendWrap = document.getElementById("resendWrap");
const timerText = document.getElementById("timerText");
const errorMsg = document.getElementById("errorMsg");
const successPage = document.getElementById("successPage");

let timer;

/* ---------------- INPUT DETECT ---------------- */
input.addEventListener("input", () => {
  const val = input.value.trim();
  if (/^\d{6,}$/.test(val)) {
    countrySelect.classList.remove("hidden");
  } else {
    countrySelect.classList.add("hidden");
  }
});

/* ---------------- SEND OTP ---------------- */
sendBtn.onclick = () => {
  if (!input.value.trim()) {
    input.classList.add("error-line");
    setTimeout(()=>input.classList.remove("error-line"),300);
    return;
  }

  otpSection.classList.remove("hidden");
  sendBtn.disabled = true;
  startTimer(30);
  autoReadOTP();
};

/* ---------------- TIMER ---------------- */
function startTimer(sec) {
  resendWrap.classList.add("hidden");
  timerText.innerText = `Resend OTP in ${sec}s`;
  timer = setInterval(() => {
    sec--;
    timerText.innerText = `Resend OTP in ${sec}s`;
    if (sec <= 0) {
      clearInterval(timer);
      timerText.innerText = "";
      resendWrap.classList.remove("hidden");
    }
  }, 1000);
}

/* ---------------- VERIFY OTP ---------------- */
verifyBtn.onclick = () => {
  if (otpInput.value === "1234") {
    document.querySelector(".card").style.display = "none";
    successPage.classList.remove("hidden");
  } else {
    otpInput.classList.add("error-line");
    setTimeout(()=>otpInput.classList.remove("error-line"),300);
  }
};

/* ---------------- AUTO OTP READ (ANDROID) ---------------- */
async function autoReadOTP() {
  if ('OTPCredential' in window) {
    try {
      const otp = await navigator.credentials.get({
        otp: { transport: ['sms'] }
      });
      otpInput.value = otp.code;
    } catch {}
  }
}
