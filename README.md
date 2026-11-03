# Pervisha & Waleed — Final Wedding Website with Updated Background Audio

All three audio files are now the **actual files uploaded by the user** in the most recent turn, not the former instrumental examples.

| Where it plays | Bundled filename | Uploaded source |
|---|---|---|
| Opening envelope and general website | `assets/website.mpeg` | `website.mpeg` |
| Mehndi card | `assets/mahndi.mpeg` | `mahndi(1).mpeg` |
| Baraat card | `assets/barat.mpeg` | `barat(1).mpeg` |

The background soundtrack plays after the guest taps **Open your invitation**. Opening Mehndi or Baraat pauses it and plays that card's recording. Closing the card resumes the website track. The pause/play button remains available and user pauses are respected.

## Deploying to Vercel

Extract this ZIP, then deploy the complete project directory. Keep `index.html`, `script.js`, `styles.css` and the `assets` directory together. Check these live file URLs after deployment: `/assets/website.mpeg`, `/assets/mahndi.mpeg`, `/assets/barat.mpeg`.

If audio is cached from an earlier deployment, do a hard reload or redeploy the full project. All three files are MPEG Layer III audio, with `.mpeg` extension; the `<source type="audio/mpeg">` declaration is retained for browser compatibility.

Use only recordings you have the permission to publish publicly.
