let otp = "";
let countdown = 30;
let timerInterval = null;

const sendOtpBtn = document.getElementById("sendOtpBtn");
const resendOtpBtn = document.getElementById("resendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");

const userInput = document.getElementById("userInput");
const otpInput = document.getElementById("otpInput");

const resendWrapper = document.getElementById("resendWrapper");
const timerText = document.getElementById("timer");

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function startTimer() {
  countdown = 30;
  timerText.innerText = countdown;
  resendOtpBtn.disabled = true;

  timerInterval = setInterval(() => {
    countdown--;
    timerText.innerText = countdown;

    if (countdown <= 0) {
      clearInterval(timerInterval);
      resendOtpBtn.disabled = false;
      document.getElementById("resendText").innerText = "Didn't receive OTP?";
    }
  }, 1000);
}

sendOtpBtn.addEventListener("click", () => {
  if (!userInput.value.trim()) {
    alert("Enter email or mobile number");
    return;
  }

  otp = generateOtp();
  console.log("OTP (demo):", otp); // demo only

  otpInput.disabled = false;
  verifyOtpBtn.disabled = false;

  resendWrapper.style.display = "block";
  document.getElementById("resendText").innerHTML =
    'Resend OTP in <span id="timer">30</span>s';

  startTimer();
});

resendOtpBtn.addEventListener("click", () => {
  otp = generateOtp();
  console.log("Resent OTP (demo):", otp);

  document.getElementById("resendText").innerHTML =
    'Resend OTP in <span id="timer">30</span>s';

  startTimer();
});

verifyOtpBtn.addEventListener("click", () => {
  if (otpInput.value === otp) {
    alert("OTP Verified ✅");
  } else {
    alert("Invalid OTP ❌");
  }
});
