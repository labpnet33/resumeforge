# ⬡ ResumeForge — Free Resume Builder

A clean, professional resume builder that works entirely in the browser. No sign-up. No data stored. Instant PDF download.

## ✨ Features

- **Real-time preview** — your resume updates as you type
- **PDF download** — one-click export with html2pdf.js
- **Dynamic sections** — add/remove work experience & education entries
- **Fully responsive** — works on desktop, tablet, and mobile
- **Zero backend** — pure HTML, CSS, and JS; no server required
- **Privacy-first** — no data ever leaves your browser

## 📁 File Structure

```
resume-builder/
├── index.html      # Main app markup
├── style.css       # All styles (responsive + print)
├── app.js          # Live preview + PDF logic
└── README.md       # This file
```

## 🚀 Deploy to Vercel (via GitHub)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Leave all settings as default (Vercel auto-detects static sites)
5. Click **Deploy** — your site will be live in ~30 seconds!

### Custom Domain (optional)
In your Vercel project → **Settings → Domains** → add your custom domain.

## 🛠 Local Development

No build tools needed. Just open `index.html` in any browser, or use a simple local server:

```bash
# Python (built-in)
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`

## 🔒 Privacy

All data entered stays in your browser. Nothing is sent to any server. When you close the tab, the data is gone. No cookies, no analytics, no tracking.

## 📄 License

Free to use, fork, and modify. No attribution required.
