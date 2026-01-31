let generatedOTP = null;

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isMobile(value) {
  return /^[0-9]{8,15}$/.test(value);
}

function sendOTP() {
  const input = document.getElementById("userInput").value.trim();
  const error = document.getElementById("error");

  error.textContent = "";

  if (!isEmail(input) && !isMobile(input)) {
    error.textContent = "Please enter valid email or mobile";
    return;
  }

  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("OTP:", generatedOTP); // demo

  document.getElementById("otpBox").classList.remove("hidden");
}

function verifyOTP() {
  const otp = document.getElementById("otpInput").value.trim();
  const error = document.getElementById("otpError");

  error.textContent = "";

  if (otp !== generatedOTP) {
    error.textContent = "Invalid OTP";
    return;
  }

  alert("OTP Verified ✅ (Go to Dashboard)");
}

function resendOTP() {
  sendOTP();
}
