const identity = document.getElementById("identity");
const otp = document.getElementById("otp");

const stepIdentity = document.getElementById("step-identity");
const stepOtp = document.getElementById("step-otp");

const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const resendOtp = document.getElementById("resendOtp");

const errorIdentity = document.getElementById("errorIdentity");
const errorOtp = document.getElementById("errorOtp");

sendOtpBtn.onclick = () => {
  const value = identity.value.trim();

  const isEmail = value.includes("@");
  const isMobile = /^[0-9]{6,15}$/.test(value);

  if (!value || (!isEmail && !isMobile)) {
    errorIdentity.style.display = "block";
    return;
  }

  errorIdentity.style.display = "none";

  // DEMO OTP SEND
  stepIdentity.classList.add("hidden");
  stepOtp.classList.remove("hidden");
};

verifyOtpBtn.onclick = () => {
  if (otp.value.length !== 6) {
    errorOtp.style.display = "block";
    return;
  }

  errorOtp.style.display = "none";
  alert("OTP verified → Dashboard (demo)");
};

resendOtp.onclick = () => {
  alert("OTP resent (demo)");
};
