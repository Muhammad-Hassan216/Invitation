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

## Islamic / bride-family wording update
- All invitation wording is from the perspective of Pervisha Laique's family.
- Mehndi card label uses **The Bride's Mehndi**, not **The Night Before**.
- Family section includes Qur'an 78:8 (Sahih International translation) and a short excerpt of Qur'an 30:21, with references.
- Other blessings and prayers are original invitation wording, not represented as Qur'an or Hadith.
- Footer, RSVP, Mehndi and Baraat details have been updated.
- The three audio files are unchanged: `assets/website.mpeg`, `assets/mahndi.mpeg`, `assets/barat.mpeg`.

## Family detail
- Bride's father is respectfully listed as **Late Mr. Laique Akhtar Khan**.

## Verified update — 04 November 2026
The family section explicitly displays **Beloved daughter of / Late Mr. Laique Akhtar Khan**.
To confirm the current version is live after redeploy, visit `https://YOUR-VERCEL-DOMAIN/site-version.txt`. If it is missing, the new build has not been deployed.
