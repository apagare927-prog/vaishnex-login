const userInput = document.getElementById("userInput");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otpInput");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");

const inputError = document.getElementById("inputError");
const otpError = document.getElementById("otpError");

const timerText = document.getElementById("timerText");
const resendOtpBtn = document.getElementById("resendOtpBtn");

let generatedOtp = "";
let timer = 30;
let timerInterval = null;

// VALIDATION
function isValidInput(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;
  return emailRegex.test(value) || phoneRegex.test(value);
}

// SEND OTP
sendOtpBtn.addEventListener("click", () => {
  const value = userInput.value.trim();

  inputError.textContent = "";
  userInput.classList.remove("error-border");

  if (!isValidInput(value)) {
    inputError.textContent = "Enter valid email or mobile";
    userInput.classList.add("error-border");
    return;
  }

  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("OTP (demo):", generatedOtp);

  otpSection.classList.remove("hidden");
  startTimer();
});

// VERIFY OTP
verifyOtpBtn.addEventListener("click", () => {
  otpError.textContent = "";
  otpInput.classList.remove("error-border");

  if (otpInput.value !== generatedOtp) {
    otpError.textContent = "Invalid OTP";
    otpInput.classList.add("error-border");
    return;
  }

  alert("Vaishnex login successful ✅");
});

// TIMER
function startTimer() {
  clearInterval(timerInterval);
  timer = 30;
  resendOtpBtn.classList.add("disabled");
  timerText.textContent = `Resend OTP in ${timer}s`;

  timerInterval = setInterval(() => {
    timer--;
    timerText.textContent = `Resend OTP in ${timer}s`;

    if (timer <= 0) {
      clearInterval(timerInterval);
      timerText.textContent = "";
      resendOtpBtn.classList.remove("disabled");
    }
  }, 1000);
}

// RESEND OTP
resendOtpBtn.addEventListener("click", () => {
  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Resent OTP (demo):", generatedOtp);
  startTimer();
});
