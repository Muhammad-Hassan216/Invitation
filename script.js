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

// Play ambient music after the guest opens the envelope. Switch to the
// selected Baraat song only while its folio is open. Never start unprompted.
const weddingMusic = document.getElementById("wedding-music");
const baraatMusic = document.getElementById("baraat-music");
const musicDock = document.getElementById("music-dock");
const musicToggle = document.getElementById("music-toggle");
const musicToggleLabel = document.getElementById("music-toggle-label");
const musicDockCaption = document.getElementById("music-dock-caption");
const musicStatus = document.getElementById("music-status");
const MUSIC_VOLUME = 0.32;
let musicPlaying = false;
let musicRequestId = 0;
let fadeFrame = 0;
let currentTrack = "ambient";
// Start with the demo until the separate audio file has been verified.
// This avoids a broken switch when the optional licensed MP3 is missing.
let baraatTrackMissing = true;
const baraatSourceUrl = baraatMusic.querySelector("source")?.getAttribute("src") || "";
if (baraatSourceUrl.startsWith("data:audio/")) {
  baraatTrackMissing = baraatSourceUrl.length < 100;
} else if (baraatSourceUrl) {
  fetch(baraatSourceUrl, { method: "HEAD" })
    .then((response) => {
      const contentType = response.headers.get("content-type") || "";
      baraatTrackMissing = !response.ok || !(/audio\/|application\/octet-stream/i.test(contentType));
    })
    .catch(() => { baraatTrackMissing = true; });
}

function chosenAudio() {
  return currentTrack === "baraat" && !baraatTrackMissing ? baraatMusic : weddingMusic;
}

function setMusicState(isPlaying, announcement) {
  musicPlaying = isPlaying;
  musicDock.classList.toggle("is-playing", isPlaying);
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  const actionLabel = isPlaying ? "Pause music" : "Play music";
  musicToggle.setAttribute("aria-label", actionLabel);
  musicToggle.title = actionLabel;
  musicToggleLabel.textContent = isPlaying ? "Music on" : "Music off";
  musicDockCaption.textContent = currentTrack === "baraat" && !baraatTrackMissing
    ? "A MELODY FOR THE BARAAT"
    : "A LITTLE MUSIC FOR OUR LOVE STORY";
  if (announcement) musicStatus.textContent = announcement;
}

function fadeMusicIn(audio, requestId) {
  cancelAnimationFrame(fadeFrame);
  if (reduceMotion) {
    audio.volume = MUSIC_VOLUME;
    return;
  }
  const started = performance.now();
  const duration = 1500;
  const animate = (now) => {
    if (requestId !== musicRequestId || audio.paused) return;
    const progress = Math.max(0, Math.min(1, (now - started) / duration));
    audio.volume = MUSIC_VOLUME * (progress * (2 - progress));
    if (progress < 1) fadeFrame = requestAnimationFrame(animate);
  };
  fadeFrame = requestAnimationFrame(animate);
}

function startWeddingMusic() {
  const requestId = ++musicRequestId;
  cancelAnimationFrame(fadeFrame);
  const audio = chosenAudio();
  const other = audio === weddingMusic ? baraatMusic : weddingMusic;
  other.pause();
  audio.volume = 0;
  // `play()` happens synchronously inside the tap/click handler for mobile browsers.
  const playRequest = audio.play();
  const onSuccess = () => {
    if (requestId !== musicRequestId) return;
    setMusicState(true, currentTrack === "baraat" && !baraatTrackMissing
      ? "Baraat music playing." : "Background music playing.");
    fadeMusicIn(audio, requestId);
  };
  const onFailure = () => {
    if (requestId !== musicRequestId) return;
    if (audio === baraatMusic) {
      // The commercial recording is NOT bundled. Keep the original demo running
      // rather than leaving visitors with a broken player.
      baraatTrackMissing = true;
      startWeddingMusic();
      musicStatus.textContent = "Special Baraat recording is not installed; instrumental music is playing.";
      return;
    }
    setMusicState(false, "Music could not start. Tap Music off to try again.");
  };
  if (playRequest && typeof playRequest.then === "function") {
    playRequest.then(onSuccess).catch(onFailure);
  } else {
    onSuccess();
  }
}

function pauseWeddingMusic() {
  ++musicRequestId;
  cancelAnimationFrame(fadeFrame);
  weddingMusic.pause();
  baraatMusic.pause();
  setMusicState(false, "Music paused.");
}

function switchSoundtrack(track) {
  if (currentTrack === track) return;
  const wasPlaying = musicPlaying;
  ++musicRequestId;
  cancelAnimationFrame(fadeFrame);
  weddingMusic.pause();
  baraatMusic.pause();
  currentTrack = track;
  setMusicState(false);
  if (wasPlaying) startWeddingMusic();
}

musicToggle.addEventListener("click", () => {
  if (musicPlaying) pauseWeddingMusic();
  else startWeddingMusic();
});
weddingMusic.addEventListener("error", () => {
  if (chosenAudio() === weddingMusic) {
    setMusicState(false, "Instrumental music could not be loaded.");
  }
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
    if (button.dataset.openEvent === "baraat") switchSoundtrack("baraat");
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
    if (dialog.id === "baraat-dialog") switchSoundtrack("ambient");
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
