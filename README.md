# Pervisha & Waleed — Royal Wedding Invitation (3-Song Edition)

This is the original royal wedding website with an envelope opening, two unfolding invitation folios, countdown, calendar downloads, WhatsApp RSVP, and context-sensitive background music.

## Chosen music

| When | Song chosen | Artist | Audio filename |
|---|---|---|---|
| Website / envelope / countdown / RSVP | **Din Shagna Da** | Jasleen Royal | `assets/website-song.mp3` |
| Mehndi invitation open | **Mehndi Hai Rachnewali** | Alka Yagnik (Zubeidaa) | `assets/mehndi-song.mp3` |
| Baraat invitation open | **Dulhe Ka Sehra Suhana Lagta Hai** | Nusrat Fateh Ali Khan (Dhadkan) | `assets/baraat-song.mp3` |

**Important:** The three named commercial tracks are **not included** in the ZIP. Each must be obtained from an authorized source and licensed for public website use. A normal streaming subscription or YouTube link does not grant the right to serve the recording from your website. Do not use YouTube video URLs as `<audio>` sources.

## What works immediately

`assets/wedding-song.mp3` is an original, project-made **royal instrumental demo**. It is included and always plays as the fallback until the optional licensed MP3s have been added. The site will **not** falsely label the demo as one of the three named songs. The app checks that each MP3 is available before attempting playback.

## How music behaves

1. Music begins on the visitor's `Open your invitation` click (to follow mobile browser autoplay policies).
2. The website song plays during ordinary scrolling, if the optional website MP3 has been added; otherwise the original instrumental plays.
3. Opening the Mehndi folio switches to the Mehndi song, if it has been installed.
4. Opening the Baraat folio switches to the Baraat song, if it has been installed.
5. Closing either folio resumes the website soundtrack. The visitor can mute/pause at any time, and opening another card does not override a manual pause.
6. Transitions fade the new track in smoothly. All audio loops gently and plays at a restrained volume.

## Add your licensed MP3s

Place files in the `assets` folder, with **exact** names:

- `assets/website-song.mp3`
- `assets/mehndi-song.mp3`
- `assets/baraat-song.mp3`

Keep the original `assets/wedding-song.mp3`; it is the fallback and must not be renamed. MP3 format is recommended; use sensible file sizes for mobile connections.

## Local test and Vercel deploy

1. From the project folder, run `python -m http.server 8000` and browse to `http://localhost:8000`.
2. Click `Open your invitation`, then try both cards and the floating music control.
3. Upload the **entire folder** to the same Git repository or deploy the folder to your existing Vercel project.
4. Verify the live `assets/website-song.mp3`, `assets/mehndi-song.mp3` and `assets/baraat-song.mp3` paths respond with MP3 files once added.

### Event details
- Mehndi: 26 November 2026, 7:00 PM onwards, at home in Moh. Naiyamat Pura. End time not supplied.
- Baraat: 27 November 2026, 7:00–10:00 PM, Bhiya Marquee, Bypass Road, Gujrat. [Venue pin](https://maps.app.goo.gl/3RZAnP68aaE3Gpfh6).
