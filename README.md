# Pervisha & Waleed — 3 Working Music Tracks (FIXED)

## Why the older version played the same sound everywhere
The previous ZIP contained only `assets/wedding-song.mp3`. The other song paths were missing; the player fell back to the same demo each time. The issue is now fixed.

## Included RIGHT NOW — three different audio files

| Location | Included and playable | File |
| --- | --- | --- |
| Website (envelope, story, countdown, RSVP) | Original soft romantic instrumental | `assets/website-song.mp3` |
| Mehndi card open | Original lively festive Mehndi instrumental | `assets/mehndi-song.mp3` |
| Baraat card open | Original slow emotional Baraat instrumental | `assets/baraat-song.mp3` |

All three MP3 files are INCLUDED in the ZIP. They are separate musical compositions, not renamed copies of one song. They were generated as original demo music for this project.

## Requested film songs: not included
You previously chose these three commercially released songs:
- Website: **Din Shagna Da** — Jasleen Royal
- Mehndi: **Mehndi Hai Rachnewali** — Alka Yagnik
- Baraat: **Dulhe Ka Sehra Suhana Lagta Hai** — Nusrat Fateh Ali Khan

These exact recordings are NOT in the package. To use the songs, provide licensed MP3 copies that you are authorized to publish. Replace the matching MP3 file in `assets/` with the new one, keeping **the exact filename**. No code change is needed. Using a YouTube link or streaming account is not a license to host the audio.

## Functionality tested
- Open envelope -> website music starts on user interaction (browser autoplay policy)
- Open Mehndi -> website music pauses, Mehndi starts
- Close Mehndi -> website resumes
- Open Baraat -> website pauses, Baraat starts
- Close Baraat -> website resumes
- Music on/off button and in-card play/pause buttons
- Manual pause stays paused when opening and closing cards
- Tested on desktop (1440px) and mobile (390px) Chromium with audio currentTime and source switching assertions

## Deploy to Vercel
1. Extract the ZIP.
2. Upload/deploy the extracted folder with `index.html` and `assets/` together to your current Vercel project.
3. Visit your live URL and refresh (Ctrl+Shift+R) to avoid old cached assets.
4. Verify three URLs on your live domain: `/assets/website-song.mp3`, `/assets/mehndi-song.mp3`, `/assets/baraat-song.mp3`. They should load playable audio, NOT a 404 page.
5. Press `Open your invitation`, then open each card and listen for a different track.

**The standalone HTML** also includes all three instrumentals embedded inside it; it is larger, but useful for direct offline testing.

## Wedding information preserved
- Mehndi: 26 November 2026, 7 PM onwards, At Home, Moh. Naiyamat Pura.
- Baraat: 27 November 2026, 7 PM–10 PM, Bhiya Marquee, Bypass Road, Gujrat.
- Venue map: https://maps.app.goo.gl/3RZAnP68aaE3Gpfh6
