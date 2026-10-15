# BEBOP — personal site

A Cowboy Bebop–inspired portfolio. Plain HTML/CSS/JS — no framework, no build step.

```
index.html   page skeleton
style.css    all styling (colors live in :root at the top)
script.js    rendering + animation (intro, starfield, reveals, cursor…)
content.js   ← YOUR CONTENT. Edit this file.
.nojekyll    tells GitHub Pages to serve files as-is
```

## Edit your content

Open `content.js` and change the name, role, email, links, projects (`sessions`),
skills (`band`), timeline (`log`) and the bounty poster text. Accent colors per
item: `orange`, `blue`, `yellow`, `red`, `teal`. Links with an empty `url` are hidden.

To use a photo, drop it in `assets/` and set `photo: "assets/me.jpg"`.

## Preview locally

```bash
python -m http.server 5173
```

Then open http://localhost:5173. The intro plays once per browser tab — open a new
tab to see it again.

## Deploy to GitHub Pages

1. Create a repo on GitHub named **`<your-username>.github.io`** (public).
2. From this folder:

```bash
git init
git add .
git commit -m "Launch the Bebop"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

3. In the repo: **Settings → Pages → Build and deployment → Deploy from a branch →
   `main` / `/ (root)`**. The site goes live at `https://<your-username>.github.io`
   in a minute or two.

---

Fan-made tribute. Cowboy Bebop © Sunrise. No show assets are used — every shape is CSS.
