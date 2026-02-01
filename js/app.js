/**********************************************************
 * VAISHNEX LOGIN – FINAL HEAVY SCRIPT
 * Features:
 * - Welcome text (NO repeat, persistent)
 * - Country selector (230+ via SAFE CDN, with fallback)
 * - Email / Mobile auto-detect
 * - Strong validation
 * - OTP flow with timer + resend (clickable only after timer)
 **********************************************************/

"use strict";

/* ================= ELEMENTS ================= */
const welcomeText   = document.getElementById("welcomeText");
const userInput     = document.getElementById("userInput");
const inputError    = document.getElementById("inputError");
const sendOtpBtn    = document.getElementById("sendOtpBtn");

const otpSection    = document.getElementById("otpSection");
const otpInput      = document.getElementById("otpInput");
const otpError      = document.getElementById("otpError");
const verifyOtpBtn  = document.getElementById("verifyOtpBtn");

const timerText     = document.getElementById("timerText");
const resendBtn     = document.getElementById("resendBtn");

const countryBtn    = document.getElementById("countryBtn");
const countryModal  = document.getElementById("countryModal");
const countryList   = document.getElementById("countryList");
const countrySearch = document.getElementById("countrySearch");

/* ================= STATE ================= */
let SELECTED_COUNTRY = null;
let OTP_CODE = "";
let TIMER = null;

/* ================= WELCOME TEXT (NO REPEAT) ================= */
const WELCOME_LINES = [
  "Welcome to Vaishnex",
  "Welcome to the Vaishnex Network",
  "Welcome back to Vaishnex",
  "Welcome to a smarter Vaishnex",
  "Welcome to Vaishnex Premium",
  "Welcome to secure Vaishnex access",
  "Welcome inside Vaishnex",
  "Welcome to your Vaishnex account"
];

(function setWelcome() {
  const used = JSON.parse(localStorage.getItem("vx_used_welcome") || "[]");

  let available = WELCOME_LINES.filter(l => !used.includes(l));
  if (available.length === 0) {
    localStorage.removeItem("vx_used_welcome");
    available = [...WELCOME_LINES];
  }

  const chosen = available[Math.floor(Math.random() * available.length)];
  welcomeText.innerText = chosen;

  used.push(chosen);
  localStorage.setItem("vx_used_welcome", JSON.stringify(used));
})();

/* ================= COUNTRY UTIL ================= */
function isoToFlag(iso) {
  return iso
    .toUpperCase()
    .replace(/./g, c =>
      String.fromCodePoint(127397 + c.charCodeAt())
    );
}

/* ================= COUNTRY DATA LOAD (SAFE) ================= */
async function loadCountries() {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/country-codes-list@1.0.0/dist/country-codes.json"
    );
    const data = await res.json();

    const countries = Object.values(data)
      .filter(c => c.dial_code)
      .map(c => ({
        name: c.country_name_en,
        iso: c.country_code,
        dial: "+" + c.dial_code,
        min: 6,
        max: 15
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    buildCountryList(countries);
    autoDetectCountry(countries);
  } catch (e) {
    // Fallback (minimum safe)
    const fallback = [
      { name: "India", iso: "IN", dial: "+91", min: 10, max: 10 },
      { name: "United States", iso: "US", dial: "+1", min: 10, max: 10 },
      { name: "United Kingdom", iso: "GB", dial: "+44", min: 10, max: 10 }
    ];
    buildCountryList(fallback);
    SELECTED_COUNTRY = fallback[0];
  }
}

function buildCountryList(list) {
  countryList.innerHTML = "";
  list.forEach(c => {
    const li = document.createElement("li");
    li.innerText = `${isoToFlag(c.iso)} ${c.name} (${c.dial})`;
    li.onclick = () => {
      SELECTED_COUNTRY = c;
      countryBtn.innerText = isoToFlag(c.iso);
      closeCountryModal();
    };
    countryList.appendChild(li);
  });
}

/* ================= AUTO DETECT COUNTRY ================= */
async function autoDetectCountry(list) {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const geo = await res.json();
    const found = list.find(c => c.iso === geo.country_code);
    if (found) {
      SELECTED_COUNTRY = found;
      countryBtn.innerText = isoToFlag(found.iso);
    }
  } catch {
    SELECTED_COUNTRY = list[0];
    countryBtn.innerText = isoToFlag(list[0].iso);
  }
}

/* ================= MODAL HANDLING ================= */
function openCountryModal() {
  countryModal.classList.remove("hidden");
  countrySearch.value = "";
}

function closeCountryModal() {
  countryModal.classList.add("hidden");
}

countryBtn.onclick = openCountryModal;
countryModal.onclick = e => {
  if (e.target === countryModal) closeCountryModal();
};

countrySearch.oninput = () => {
  const q = countrySearch.value.toLowerCase();
  [...countryList.children].forEach(li => {
    li.style.display = li.innerText.toLowerCase().includes(q)
      ? "block"
      : "none";
  });
};

/* ================= VALIDATION ================= */
function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isRepeated(v) {
  return /^(\d)\1+$/.test(v);
}

function isSequential(v) {
  return "0123456789".includes(v) || "9876543210".includes(v);
}

/* ================= SEND OTP ================= */
sendOtpBtn.onclick = () => {
  inputError.innerText = "";
  const value = userInput.value.trim();

  if (!value) {
    inputError.innerText = "Email or mobile number required";
    return;
  }

  if (isEmail(value)) {
    // email ok
  } else {
    if (!/^\d+$/.test(value)) {
      inputError.innerText = "Mobile number must be digits only";
      return;
    }
    if (!SELECTED_COUNTRY) {
      inputError.innerText = "Select country";
      return;
    }
    if (
      value.length < SELECTED_COUNTRY.min ||
      value.length > SELECTED_COUNTRY.max
    ) {
      inputError.innerText =
        "Invalid mobile number for " + SELECTED_COUNTRY.name;
      return;
    }
    if (SELECTED_COUNTRY.dial === "+91" && !/^[6-9]/.test(value)) {
      inputError.innerText = "Invalid Indian mobile number";
      return;
    }
    if (isRepeated(value) || isSequential(value)) {
      inputError.innerText = "Invalid mobile number pattern";
      return;
    }
  }

  // DEMO OTP
  OTP_CODE = "1234";
  otpSection.classList.remove("hidden");
  startTimer();
};

/* ================= VERIFY OTP ================= */
verifyOtpBtn.onclick = () => {
  otpError.innerText = "";

  if (!otpInput.value) {
    otpError.innerText = "OTP cannot be empty";
    return;
  }

  if (otpInput.value !== OTP_CODE) {
    otpError.innerText = "Invalid OTP";
    return;
  }

  alert("Login successful (demo)");
};

/* ================= TIMER & RESEND ================= */
function startTimer() {
  let t = 30;
  resendBtn.classList.add("hidden");
  timerText.innerText = `Resend OTP in ${t}s`;

  clearInterval(TIMER);
  TIMER = setInterval(() => {
    t--;
    timerText.innerText = `Resend OTP in ${t}s`;
    if (t <= 0) {
      clearInterval(TIMER);
      timerText.innerText = "";
      resendBtn.classList.remove("hidden");
    }
  }, 1000);
}

resendBtn.onclick = () => {
  startTimer();
};

/* ================= INIT ================= */
loadCountries();
