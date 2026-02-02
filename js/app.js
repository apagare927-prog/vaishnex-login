/* ======================================================
   VAISHNEX LOGIN – FINAL APP.JS
   - IP based tenant (INDIA / GLOBAL)
   - Country selector
   - OTP + resend timer
   - No HTML change required
====================================================== */

/* ---------- TENANT DETECTION (IP + HARDCODE) ---------- */

let TENANT = "GLOBAL";

(async function detectTenant() {
  try {
    const res = await fetch("https://ipwho.is/?fields=country_code");
    const data = await res.json();
    if (data && data.country_code === "IN") {
      TENANT = "INDIA";
    }
  } catch (e) {
    TENANT = "GLOBAL";
  }
  console.log("Tenant selected:", TENANT);
})();

/* ---------- DOM ELEMENTS ---------- */

const countryBtn = document.getElementById("countryBtn");
const countryModal = document.getElementById("countryModal");
const countryList = document.getElementById("countryList");
const searchCountry = document.getElementById("searchCountry");
const countryFlag = document.getElementById("countryFlag");
const countryCode = document.getElementById("countryCode");

const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const resendBtn = document.getElementById("resendBtn");
const otpInput = document.getElementById("otpInput");
const timerText = document.getElementById("timerText");
const error = document.getElementById("error");

/* ---------- TIMER ---------- */

let timer;
let seconds = 30;

/* ---------- COUNTRY DATA ---------- */

const countries = [
  { name: "India", code: "+91", flag: "in" },
  { name: "United States", code: "+1", flag: "us" },
  { name: "United Kingdom", code: "+44", flag: "gb" },
  { name: "Canada", code: "+1", flag: "ca" },
  { name: "Australia", code: "+61", flag: "au" },
  { name: "Germany", code: "+49", flag: "de" },
  { name: "France", code: "+33", flag: "fr" },
  { name: "Japan", code: "+81", flag: "jp" },
  { name: "UAE", code: "+971", flag: "ae" }
];

/* ---------- RENDER COUNTRIES ---------- */

function renderCountries(list) {
  countryList.innerHTML = "";
  list.forEach(c => {
    const div = document.createElement("div");
    div.className = "country-item";
    div.innerHTML = `
      <img src="https://flagcdn.com/w40/${c.flag}.png">
      <span>${c.name} (${c.code})</span>
    `;
    div.onclick = () => {
      countryFlag.src = `https://flagcdn.com/w40/${c.flag}.png`;
      countryCode.textContent = c.code;
      countryModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    };
    countryList.appendChild(div);
  });
}

renderCountries(countries);

/* ---------- COUNTRY MODAL ---------- */

countryBtn.onclick = () => {
  countryModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

countryModal.onclick = e => {
  if (e.target === countryModal) {
    countryModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
};

/* ---------- SEARCH COUNTRY ---------- */

searchCountry.oninput = () => {
  const v = searchCountry.value.toLowerCase();
  renderCountries(
    countries.filter(
      c => c.name.toLowerCase().includes(v) || c.code.includes(v)
    )
  );
};

/* ---------- OTP LOGIC ---------- */

function startTimer() {
  seconds = 30;
  timerText.classList.remove("hidden");
  resendBtn.classList.add("hidden");
  timerText.textContent = `Resend OTP in ${seconds}s`;

  timer = setInterval(() => {
    seconds--;
    timerText.textContent = `Resend OTP in ${seconds}s`;
    if (seconds <= 0) {
      clearInterval(timer);
      timerText.classList.add("hidden");
      resendBtn.classList.remove("hidden");
    }
  }, 1000);
}

sendOtpBtn.onclick = () => {
  error.textContent = "";

  otpInput.classList.remove("hidden");
  verifyOtpBtn.classList.remove("hidden");

  console.log("Send OTP → Tenant:", TENANT);
  startTimer();
};

resendBtn.onclick = () => {
  console.log("Resend OTP → Tenant:", TENANT);
  startTimer();
};

verifyOtpBtn.onclick = () => {
  const otp = otpInput.value.trim();

  if (!otp || otp.length < 4) {
    error.textContent = "Invalid OTP";
    return;
  }

  console.log("Verify OTP → Tenant:", TENANT);

  // SUCCESS (demo)
  alert("Login / Signup Successful");
};
