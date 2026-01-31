const input = document.getElementById("identity");
const errorMsg = document.getElementById("errorMsg");
const btn = document.getElementById("sendOtpBtn");

btn.addEventListener("click", () => {
  const value = input.value.trim();

  if (!value) {
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";

  const isEmail = value.includes("@");
  const isMobile = /^[0-9]{6,15}$/.test(value);

  if (!isEmail && !isMobile) {
    errorMsg.textContent = "Enter valid email or mobile number";
    errorMsg.style.display = "block";
    return;
  }

  // DEMO FLOW
  alert("OTP sent to " + value);
});
