# Pervisha & Waleed — Wedding Invitation with Uploaded Recordings

This package contains your uploaded audio files, connected to the exact event cards.

## Audio connections

- Envelope + general website: `assets/website-song.mp3` (the website audio you uploaded)
- Mehndi invitation: **`assets/mahndi.mpeg`** (your exact uploaded MPEG recording; ~23 seconds)
- Baraat invitation: **`assets/barat.mpeg`** (your exact uploaded MPEG recording; ~45 seconds)

No old `mehndi-song.mp3` or `baraat-song.mp3` demo is included or used.

## Test it

1. Open the `index.html` file in a browser or serve this folder with a local web server.
2. Click **Open your invitation**; website audio starts after the click.
3. Click **Mehndi**; only `mahndi.mpeg` should play.
4. Close it, then click **Baraat**; only `barat.mpeg` should play.
5. Pause/resume with Music button.

## Deploy to Vercel

Upload the **entire folder**, including `assets/`, to your existing project. Do not upload only HTML/JS/CSS; audio files must be deployed too. On Vercel, verify that `/assets/barat.mpeg` and `/assets/mahndi.mpeg` load. If you host recordings of commercial songs publicly, make sure you have the required permission.

Note: The website audio in this package is the uploaded `website-song(1).mp3` file, not a verified commercial song recording.
