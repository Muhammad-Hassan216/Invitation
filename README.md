# Pervisha & Waleed — Royal Wedding Invitation with Background Music

This is the updated royal invitation site with envelope-opening animation, two folio event cards, countdown, WhatsApp RSVP, date downloads, and one gentle continuous soundtrack.

## Music setup (important)

The included `assets/wedding-song.mp3` is a short **original romantic instrumental demo**, created specifically for this project (not a popular commercial song). It makes the website fully testable now.

To use your chosen romantic song:

1. Use an MP3 file you own or have permission to publish on a public website.
2. Rename it to exactly **`wedding-song.mp3`**.
3. Replace the existing `assets/wedding-song.mp3` with your file (same name and path).
4. Deploy this entire folder to Vercel again. If you use GitHub, push the new file to the linked repository. If you deploy files manually, upload the updated folder.

Do **not** rename the HTML/CSS/JS, and do not put a Google Drive or YouTube link in place of the MP3. Those do not function as an HTML audio source.

When a guest taps **Open your invitation**, music starts at low volume and smoothly fades in. A floating **Music on / Music off** toggle lets guests pause and resume at any point. Browsers can block sound without a tap; in that case guests can tap the music button. Music continues while scrolling and opening invitation details. No backend needed.

## Publish on Vercel

- Upload the project folder to Vercel, or push it to the existing GitHub repository and deploy.
- Framework preset: Other / static site. Build command: none. Output directory: `.`.
- Keep `index.html`, `styles.css`, `script.js`, and `assets/` together.
- The one-file HTML download embeds the included demo MP3 and image assets. Replacing the song in that one-file version requires rebuilding it; the ZIP is easier for custom songs.

## Confirmed details

- Mehndi: Thursday, 26 November 2026, from 7 PM, at home, Moh. Naiyamat Pura. Hosted by Muqadsa Laique & Noor Shakeel.
- Baraat: Friday, 27 November 2026, 7–10 PM, Bhiya Marquee, Bypass Road, Gujrat. https://maps.app.goo.gl/3RZAnP68aaE3Gpfh6
- Mehndi end time is intentionally not invented in the downloadable calendar file.
- WhatsApp RSVP only opens a prepared message. The visitor sends it from their own WhatsApp app.
