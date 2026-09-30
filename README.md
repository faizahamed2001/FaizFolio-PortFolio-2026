# Faiz — Personal Portfolio

A fast, accessible, single-page portfolio built with **plain HTML, CSS, and vanilla JavaScript**. No build step, no frameworks, no server — just static files you can host free on GitHub Pages.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All content and structure. |
| `style.css` | Design system, themes, layout, motion. |
| `script.js` | Theme toggle, mobile menu, scroll reveals. |
| `assets/` | (Optional, you create this) Favicon and OG preview image. |

---

## Quick start (local preview)

Just open `index.html` in a browser — the site is fully static, so that's all you need. If you'd rather serve it over a tiny local server:

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

---

## What to edit (search the code for `EDIT HERE`)

Every spot you need to personalise is marked with a `<!-- EDIT HERE -->` (HTML), `/* EDIT HERE */` or `// EDIT HERE` (CSS/JS) comment. The essentials:

1. **Your details** — name, headline, tagline, about text, highlights (`index.html`).
2. **Skills** — add/remove `<li>` items inside each skills group.
3. **Projects** — replace `[Project 1/2/3]` titles, descriptions, tech tags, and the GitHub/demo links. Duplicate a `.project` block to add more.
4. **Experience** — fill in the timeline entries (`[Previous Role]`, etc.).
5. **Contact links** — email, LinkedIn, GitHub. Update them in **both** the Contact section and the footer.
6. **SEO / social preview** — update the `<title>`, description, and the Open Graph / Twitter `og:url` and `og:image` URLs in `<head>`.
7. **Accent colour** — change `--accent` (dark) and the `[data-theme="light"]` accent in `style.css` to rebrand the whole site.

### Add a social preview image (optional but recommended)
Add a `1200×630` PNG at `assets/og-image.png` and point the `og:image` / `twitter:image` meta tags at its full URL. This is what shows when the link is shared on LinkedIn/Slack/X.

---

## Deploy to GitHub Pages

1. Create a new GitHub repository.
   - For a site at `https://<username>.github.io/`, name the repo **`<username>.github.io`**.
   - For a project site at `https://<username>.github.io/<repo>/`, name it anything (e.g. `portfolio`).
2. Add these files to the repo root and push:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio site"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment**.
   - Source: **Deploy from a branch**.
   - Branch: **main**, folder: **/ (root)**. Save.
4. Wait ~1 minute, then open the URL GitHub shows (e.g. `https://<username>.github.io/<repo>/`).

> **Tip:** After deploying, update the `og:url` and `og:image` meta tags to your live URL so link previews resolve correctly.

---

## Features

- **Light/dark theme toggle** — remembers your choice (`localStorage`) and respects the OS preference on first visit.
- **Fully responsive**, mobile-first; sticky nav collapses into a hamburger menu on small screens.
- **Accessible** — semantic landmarks, skip link, keyboard navigation, visible focus states, `aria` attributes, and WCAG-AA-minded contrast.
- **Tasteful motion** — fade-and-rise scroll reveals via the Intersection Observer API, smooth anchor scrolling, gentle hover states. All of it is disabled automatically when `prefers-reduced-motion` is set.
- **SEO + Open Graph** meta tags for clean link previews.
- **Zero dependencies** — no libraries, tiny footprint, instant load.

---

## Browser support
Works in all modern browsers (Chrome, Edge, Firefox, Safari). Uses `color-mix()` and `svh` units, which are supported in current versions of all major browsers.

---

Built with care. Enjoy — and go get that role. 🚀
