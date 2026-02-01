const userInput = document.getElementById("userInput");
const otpInput = document.getElementById("otpInput");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const resendBtn = document.getElementById("resendBtn");
const timerText = document.getElementById("timerText");

const userError = document.getElementById("userError");
const otpError = document.getElementById("otpError");

const otpField = document.querySelector(".otp-field");
const resendBox = document.querySelector(".resend");

let generatedOtp = "";
let timer;
let timeLeft = 30;

const welcomes = [
  "Welcome to Vaishnex",
  "Welcome back to Vaishnex",
  "Secure login to Vaishnex",
  "Vaishnex welcomes you",
  "Enter Vaishnex Network"
];

document.getElementById("welcomeText").innerText =
  welcomes[Math.floor(Math.random() * welcomes.length)];

function isValidInput(value) {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone = /^[0-9]{6,15}$/;
  return email.test(value) || phone.test(value);
}

sendOtpBtn.onclick = () => {
  userError.innerText = "";
  otpError.innerText = "";

  if (!isValidInput(userInput.value)) {
    userError.innerText = "Enter valid email or mobile number";
    return;
  }

  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("OTP:", generatedOtp); // demo

  otpField.classList.remove("hidden");
  verifyOtpBtn.classList.remove("hidden");
  resendBox.classList.remove("hidden");

  startTimer();
};

verifyOtpBtn.onclick = () => {
  otpError.innerText = "";

  if (otpInput.value !== generatedOtp) {
    otpError.innerText = "Invalid OTP";
    return;
  }

  alert("Login successful – Vaishnex");
};

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  resendBtn.disabled = true;

  timerText.innerText = `Resend OTP in ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerText.innerText = `Resend OTP in ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      timerText.innerText = "You can resend OTP";
      resendBtn.disabled = false;
    }
  }, 1000);
}

resendBtn.onclick = () => {
  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Resent OTP:", generatedOtp);
  startTimer();
};
