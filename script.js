"use strict";

const eventData = {
  mehndi: {
    title: "Mehndi Night — Pervisha Laique",
    startUtc: "20261126T140000Z",
    // No end time was supplied; intentionally don't invent one.
    description: "Mehndi ceremony of Pervisha Laique, hosted by Muqadsa Laique and Noor Shakeel. Begins at 7 PM Pakistan time. End time not supplied.",
    location: "At Home, Moh. Naiyamat Pura"
  },
  baraat: {
    title: "Baraat — Pervisha Laique & Waleed Khan",
    startUtc: "20261127T140000Z",
    endUtc: "20261127T170000Z",
    description: "Wedding Baraat celebration of Pervisha Laique and Waleed Khan. 7 PM to 10 PM Pakistan time.",
    location: "Bhiya Marquee, Bypass Road, Gujrat, Pakistan",
    url: "https://maps.app.goo.gl/3RZAnP68aaE3Gpfh6"
  }
};

// Envelope opening: one focused, intentional reveal, no autoplay audio.
const openingScreen = document.getElementById("opening-screen");
const openingButton = document.getElementById("open-invitation");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let invitationOpened = false;

// Three real, included ORIGINAL instrumental tracks (NOT commercial recordings).
// Replace the MP3s with properly licensed song files later; scene switching remains unchanged.
const musicElements = {
  website: document.getElementById("website-music"),
  mehndi: document.getElementById("mehndi-music"),
  baraat: document.getElementById("baraat-music")
};
const musicDock = document.getElementById("music-dock");
const musicToggle = document.getElementById("music-toggle");
const musicToggleLabel = document.getElementById("music-toggle-label");
const musicDockCaption = document.getElementById("music-dock-caption");
const musicStatus = document.getElementById("music-status");
const MUSIC_VOLUME = 0.33;
const TRACK_LABELS = {
  website: "Website · romantic instrumental",
  mehndi: "Mehndi · festive instrumental",
  baraat: "Baraat · emotional instrumental"
};
let musicPlaying = false;
let requestedScene = "website";
let musicRequestId = 0;
let fadeFrame = 0;

// All three files ship in /assets, so NO missing-file detection and NO shared fallback.
// Each <audio> has its own physical MP3 with a different musical composition.
function setMusicState(playing, announcement) {
  musicPlaying = playing;
  musicDock.classList.toggle("is-playing", playing);
  musicToggle.setAttribute("aria-pressed", String(playing));
  musicToggle.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  musicToggle.title = playing ? "Pause music" : "Play music";
  musicToggleLabel.textContent = playing ? "Music on" : "Music off";
  musicDockCaption.textContent = TRACK_LABELS[requestedScene].toUpperCase();
  document.querySelectorAll("[data-dialog-music]").forEach(button => {
    button.textContent = playing ? "♫ Pause music" : "♫ Play music";
    button.setAttribute("aria-pressed", String(playing));
  });
  if (announcement) musicStatus.textContent = announcement;
}

function stopOtherTracks(except) {
  Object.entries(musicElements).forEach(([scene, audio]) => {
    if (scene !== except) {
      audio.pause();
      audio.volume = 0;
    }
  });
}

function fadeMusicIn(audio, requestId) {
  cancelAnimationFrame(fadeFrame);
  if (reduceMotion) { audio.volume = MUSIC_VOLUME; return; }
  const start = performance.now();
  const duration = 900;
  const tick = (now) => {
    if (requestId !== musicRequestId || audio.paused) return;
    const ratio = Math.min(1, Math.max(0, (now - start) / duration));
    audio.volume = MUSIC_VOLUME * (ratio * (2 - ratio));
    if (ratio < 1) fadeFrame = requestAnimationFrame(tick);
  };
  fadeFrame = requestAnimationFrame(tick);
}

function startWeddingMusic() {
  const requestId = ++musicRequestId;
  cancelAnimationFrame(fadeFrame);
  const scene = requestedScene;
  const audio = musicElements[scene];
  stopOtherTracks(scene);
  audio.volume = 0;
  const promise = audio.play();
  Promise.resolve(promise).then(() => {
    if (requestId !== musicRequestId) { audio.pause(); return; }
    setMusicState(true, `${TRACK_LABELS[scene]} playing.`);
    fadeMusicIn(audio, requestId);
  }).catch(() => {
    if (requestId !== musicRequestId) return;
    audio.pause();
    setMusicState(false, `Could not start ${TRACK_LABELS[scene]}; tap Music on to try again.`);
  });
}

function pauseWeddingMusic() {
  ++musicRequestId;
  cancelAnimationFrame(fadeFrame);
  Object.values(musicElements).forEach(audio => audio.pause());
  setMusicState(false, "Music paused.");
}

function switchSoundtrack(scene) {
  if (!Object.prototype.hasOwnProperty.call(musicElements, scene)) return;
  if (requestedScene === scene) return;
  const wasPlaying = musicPlaying;
  ++musicRequestId;
  cancelAnimationFrame(fadeFrame);
  Object.values(musicElements).forEach(audio => audio.pause());
  requestedScene = scene;
  setMusicState(false, `Now selected: ${TRACK_LABELS[scene]}.`);
  // A guest's manual pause is respected; card opening does not unmute them.
  if (wasPlaying) startWeddingMusic();
}

function toggleMusic() {
  if (musicPlaying) pauseWeddingMusic();
  else startWeddingMusic();
}
musicToggle.addEventListener("click", toggleMusic);
document.querySelectorAll("[data-dialog-music]").forEach(button => button.addEventListener("click", toggleMusic));

Object.entries(musicElements).forEach(([scene, audio]) => {
  audio.addEventListener("error", () => {
    if (requestedScene === scene) {
      setMusicState(false, `Audio file for ${scene} is missing or could not be decoded.`);
    }
  });
});

document.body.classList.add("no-scroll");
function openInvitation() {
  if (invitationOpened) return;
  invitationOpened = true;
  // Direct call in the opening-button click handler is required by mobile browsers.
  startWeddingMusic();
  openingScreen.classList.add("is-opening");
  window.setTimeout(() => {
    openingScreen.classList.add("is-complete");
    openingScreen.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    document.body.classList.add("music-visible");
    const focusTarget = window.innerWidth <= 1160
      ? document.querySelector(".identity")
      : document.querySelector(".header-cta");
    focusTarget?.focus({ preventScroll: true });
  }, reduceMotion ? 100 : 2050);
}
openingButton.addEventListener("click", openInvitation);
openingButton.focus({ preventScroll: true });
openingScreen.addEventListener("keydown", (event) => {
  if (event.key === "Escape") openInvitation();
  if (event.key === "Tab" && !invitationOpened) {
    event.preventDefault();
    openingButton.focus();
  }
});

// Navigation on small screens.
const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
function closeMobileMenu() {
  mobileMenu.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton.addEventListener("click", () => {
  const open = !mobileMenu.classList.contains("is-open");
  mobileMenu.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 850) closeMobileMenu();
});

// Entrance reveals; content remains visible without JS or when reduced motion is requested.
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -35px 0px" });
  document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-inview"));
}

// Modal folios: accessible click, Escape, focus restoration, outside click dismissal.
let lastOpenButton = null;
const dialogs = Array.from(document.querySelectorAll(".event-dialog"));
function closeDialog(dialog) {
  if (dialog.open) dialog.close();
}

document.querySelectorAll("[data-open-event]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(`${button.dataset.openEvent}-dialog`);
    if (!dialog) return;
    lastOpenButton = button;
    dialog.classList.remove("is-revealed");
    dialog.showModal();
    switchSoundtrack(button.dataset.openEvent);
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => requestAnimationFrame(() => dialog.classList.add("is-revealed")));
  });
});

dialogs.forEach((dialog) => {
  dialog.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => closeDialog(dialog)));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener("close", () => {
    switchSoundtrack("website");
    dialog.classList.remove("is-revealed");
    document.body.classList.remove("no-scroll");
    if (lastOpenButton) lastOpenButton.focus({ preventScroll: true });
  });
});

// Live countdown, in Pakistan Standard Time.
const countdownTarget = new Date("2026-11-27T19:00:00+05:00").getTime();
function updateCountdown() {
  const remaining = countdownTarget - Date.now();
  const message = document.getElementById("countdown-message");
  const clock = document.getElementById("countdown-clock");
  if (remaining <= 0) {
    clock.hidden = true;
    message.textContent = "The wedding celebration has begun — thank you for being part of it!";
    return;
  }
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };
  Object.entries(values).forEach(([key, value]) => {
    const item = document.getElementById(key);
    if (item) item.textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Download calendar invites: Mehndi does not invent an end time.
function calendarEscape(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}
function saveCalendar(key) {
  const data = eventData[key];
  if (!data) return;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pervisha and Waleed//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${key}-pervisha-waleed-2026@wedding-invitation`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART:${data.startUtc}`,
    ...(data.endUtc ? [`DTEND:${data.endUtc}`] : []),
    `SUMMARY:${calendarEscape(data.title)}`,
    `DESCRIPTION:${calendarEscape(data.description)}`,
    `LOCATION:${calendarEscape(data.location)}`,
    ...(data.url ? [`URL:${data.url}`] : []),
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  const blob = new Blob([lines.join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${key}-pervisha-waleed-2026.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
document.querySelectorAll("[data-calendar]").forEach((button) => {
  button.addEventListener("click", () => saveCalendar(button.dataset.calendar));
});

// RSVP stays local until the visitor sends the prepared WhatsApp message.
const rsvpForm = document.getElementById("rsvp-form");
rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!rsvpForm.reportValidity()) return;
  const form = new FormData(rsvpForm);
  const events = form.getAll("events");
  const status = document.getElementById("rsvp-status");
  if (!events.length) {
    status.textContent = "Please choose at least one celebration.";
    return;
  }
  const attending = form.get("attendance") === "Joyfully attending";
  const lines = [
    "Assalamu Alaikum! My RSVP for Pervisha & Waleed:",
    `Name: ${String(form.get("guestName") || "").trim()}`,
    form.get("guestRelation") ? `Relation: ${String(form.get("guestRelation")).trim()}` : "",
    `Reply: ${form.get("attendance")}`,
    ...(attending ? [`Guests: ${form.get("guestCount")}`] : []),
    `Celebration(s): ${events.join(", ")}`,
    form.get("message") ? `Wishes: ${String(form.get("message")).trim()}` : ""
  ].filter(Boolean);
  const phone = String(form.get("contact") || "923248680401");
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
  status.textContent = "Opening WhatsApp — please tap Send to complete your RSVP.";
  const tab = window.open(url, "_blank", "noopener,noreferrer");
  if (!tab) {
    status.innerHTML = "WhatsApp did not open automatically. ";
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Open your prepared message";
    status.appendChild(link);
  }
});
