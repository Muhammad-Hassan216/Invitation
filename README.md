# Pervisha & Waleed — Selected Wedding Songs (NO DEMO MUSIC)

This version is prepared for **the three actual songs you selected**. The demo instrumentals from the previous ZIP were removed completely. **No commercial song recording is included.** The page will be silent until you supply the audio recordings you have rights to publish.

## Exact files to provide in `assets/`

| Scene | Exact selected song | Required file |
| --- | --- | --- |
| Website / envelope / general sections | **Din Shagna Da — Jasleen Royal** | `assets/website-song.mp3` |
| Mehndi invitation opened | **Mehndi Hai Rachnewali — Alka Yagnik** | `assets/mehndi-song.mp3` |
| Baraat invitation opened | **Dulhe Ka Sehra Suhana Lagta Hai — Nusrat Fateh Ali Khan** | `assets/baraat-song.mp3` |

**IMPORTANT:** Please upload files from a source that permits publishing them on a public website. Downloading a track from a streaming subscription or linking to YouTube does not, by itself, give hosting permission. If you do not have permission to embed these recordings, get an appropriate license or use another legally publishable recording.

## How switching works

1. Guest clicks the envelope -> website song is selected.
2. Opens Mehndi card -> Mehndi recording plays, website audio stops.
3. Closes card -> website song resumes.
4. Opens Baraat card -> Baraat recording plays, website audio stops.
5. Closes Baraat -> website song resumes.
6. Guest may pause/resume at any time; card changes respect manual pauses.

If one MP3 is missing, the player **does not play any substitute music**. Instead it displays the missing filename; other scenes work if their own MP3s have been supplied.

## Vercel upload

Place the three licensed MP3s with the filenames above inside `assets/` **before uploading** the folder to Vercel. Keep the project structure:

```
index.html
script.js
styles.css
assets/
  floral-corner.svg
  rosette.svg
  website-song.mp3    <- you add
  mehndi-song.mp3     <- you add
  baraat-song.mp3     <- you add
```

Deploy the extracted project folder, then open the Vercel site and test the envelope and both event cards. To confirm files served correctly, visit `https://YOURDOMAIN/assets/mehndi-song.mp3` etc. These URLs should return playable audio, not a 404.

The standalone HTML is not provided here because audio cannot be embedded until the actual files exist.
