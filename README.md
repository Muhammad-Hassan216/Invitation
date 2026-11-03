# Pervisha & Waleed — Baraat Song Ready Website

This package contains the royal invitation website, envelope animation, interactive Mehndi and Baraat folios, WhatsApp RSVP, calendar buttons, countdown, and a two-track music system.

## Music: what is installed now
- `assets/wedding-song.mp3` contains the original, project-made **instrumental demo** and starts on the guest's opening tap.
- The site is **prepared** to use the romantic Baraat song **Dulhe Ka Sehra Suhana Lagta Hai** (the song containing “Main teri baahon ke jhoole mein pali babul”). **The commercial recording is NOT included.**
- To add a legally authorized copy, place your MP3 at **`assets/baraat-song.mp3`** (exact filename; do not replace `wedding-song.mp3`). You must have permission to use the recording publicly.
- When the visitor opens the **Baraat** invitation folio, the page pauses the background instrumental and fades in this special song. When they close the Baraat folio, the original instrumental resumes. During the Mehndi folio the original instrumental continues.
- The floating **Music on/off** control works on both tracks. If the Baraat MP3 is not installed or fails to load, the original instrumental will play instead.
- Browsers require a visitor gesture before audio can start. If a browser blocks a start, the visitor can tap the music control.

## Deploy to the existing Vercel site
1. Copy your licensed song into `assets/baraat-song.mp3`.
2. Verify the site locally using a small static server, e.g. `python -m http.server 8000` in the folder.
3. Deploy the whole folder to your existing Vercel project (or commit/push it to the connected GitHub repository). If you upload manually, make sure all files in `assets/` are included.
4. Clear cache or hard-refresh the deployed URL after redeploying if necessary.

You do **not** need a backend. Do not use a YouTube URL as the MP3 source; it isn't a directly playable audio file.

## Confirmed event details
- Mehndi: 26 November 2026, 7 PM onwards, At Home, Moh. Naiyamat Pura.
- Baraat: 27 November 2026, 7–10 PM at Bhiya Marquee, Bypass Road, Gujrat.
- Venue link: https://maps.app.goo.gl/3RZAnP68aaE3Gpfh6
