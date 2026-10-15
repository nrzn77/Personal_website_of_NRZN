(() => {
  "use strict";

  const S = window.SITE || {};
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  const ACCENTS = ["orange", "blue", "yellow", "red", "teal"];
  const accent = (name, k) => {
    const c = ACCENTS.includes(name) ? name : ACCENTS[k % ACCENTS.length];
    return `--accent:var(--${c});--accent-text:var(--${c}-text)`;
  };
  const initials = (name) =>
    String(name || "?").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const photo = () =>
    S.photo ? `<img src="${esc(S.photo)}" alt="${esc(S.name)}" loading="lazy">` : `<span>${esc(initials(S.name))}</span>`;
  const extLink = (l) =>
    l && l.url ? `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} <span aria-hidden="true">↗</span></a>` : "";

  /* ------------------------------------------------------------------ render */
  function render() {
    document.title = `${S.name} — ${S.alias}`;

    // hero
    $("#heroAlias").textContent = S.alias;
    $("#heroRole").textContent = S.role;
    $("#heroTagline").textContent = S.tagline;
    const nameEl = $("#heroName");
    const heroName = S.heroName || S.name;
    nameEl.setAttribute("aria-label", heroName);
    let i = 0;
    nameEl.innerHTML = String(heroName)
      .split(/\s+/)
      .map((w) => `<span class="word" aria-hidden="true">${[...w].map((c) => `<span class="ch" style="--i:${i++}">${esc(c)}</span>`).join("")}</span>`)
      .join(" ");

    const group = `<span class="marquee__group">${(S.ticker || []).map((t) => `<span class="marquee__item">${esc(t)}</span>`).join("")}</span>`;
    $("#marquee").innerHTML = group + group;

    // sessions
    $("#eps").innerHTML = (S.sessions || [])
      .map((p, k) => {
        const links = (p.links || []).map(extLink).join("");
        return `
        <article class="ep reveal" style="${accent(p.color, k)}">
          <div class="ep__no" aria-hidden="true">${pad(k + 1)}</div>
          <div class="ep__body">
            <p class="ep__meta mono">Session #${pad(k + 1)}${p.year ? ` · ${esc(p.year)}` : ""}</p>
            <h3 class="ep__title">${esc(p.title)}</h3>
            ${p.episode ? `<p class="ep__ep serif">“${esc(p.episode)}”</p>` : ""}
            <p class="ep__desc">${esc(p.desc)}</p>
            <ul class="ep__tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
          <div class="ep__side">
            ${p.kind ? `<span class="ep__kind mono">${esc(p.kind)}</span>` : ""}
            ${links ? `<div class="ep__links">${links}</div>` : ""}
          </div>
        </article>`;
      })
      .join("");

    // crew
    $("#dossier").innerHTML = `
      <div class="dossier reveal">
        <span class="dossier__clip" aria-hidden="true"></span>
        <div class="dossier__head mono"><span>Crew file</span><span>No. 001</span></div>
        <div class="dossier__top">
          <div class="halftone">${photo()}</div>
          <div>
            <p class="mono">Name</p>
            <p class="dossier__name">${esc(S.name)}</p>
            <p class="mono">${esc(S.location)}</p>
          </div>
        </div>
        <div class="dossier__bio">${(S.bio || []).map((p) => `<p>${esc(p)}</p>`).join("")}</div>
        <dl class="dossier__dl">${(S.dossier || []).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
      </div>`;

    $("#band").innerHTML = (S.band || [])
      .map(
        (b, k) => `
        <div class="inst reveal" style="${accent(b.color, k)};--rd:${k * 0.08}s">
          <div class="inst__top mono"><span>${pad(k + 1)}</span><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span></div>
          <h3 class="inst__name">${esc(b.instrument)}</h3>
          <p class="inst__note serif">${esc(b.note)}</p>
          <ul class="chips">${(b.skills || []).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        </div>`
      )
      .join("");

    // log
    $("#logList").innerHTML = (S.log || [])
      .map(
        (e, k) => `
        <li class="reveal" style="${accent(e.color, k)}">
          <div class="log__year">${esc(e.year)}</div>
          <div class="log__dot"><span class="log__planet" title="${esc(e.planet)}"></span></div>
          <div class="log__body">
            <p class="log__place mono">${esc(e.planet)} · ${esc(e.place)}</p>
            <h3 class="log__title">${esc(e.title)}</h3>
            <p class="log__text">${esc(e.text)}</p>
          </div>
        </li>`
      )
      .join("");

    // contact
    const rows = [];
    if (S.email)
      rows.push(`<li><a href="mailto:${esc(S.email)}"><span>Email</span><small>${esc(S.email)}</small></a>
        <button class="copy" type="button" data-copy="${esc(S.email)}">Copy</button></li>`);
    (S.links || []).filter((l) => l.url).forEach((l) =>
      rows.push(`<li><a href="${esc(l.url)}" target="_blank" rel="noopener"><span>${esc(l.label)}</span><small>↗</small></a></li>`)
    );
    if (S.resume)
      rows.push(`<li><a href="${esc(S.resume)}" target="_blank" rel="noopener"><span>Résumé</span><small>PDF ↗</small></a></li>`);
    $("#contact").innerHTML = rows.join("");

    const b = S.bounty || {};
    $("#poster").innerHTML = `
      <div class="poster reveal">
        <div class="poster__frame">
          <p class="poster__top mono">Inter-Solar System Police · Bounty Notice</p>
          <h3 class="poster__wanted">Wanted</h3>
          <div class="halftone poster__photo">${photo()}</div>
          <p class="poster__name">${esc(S.name)}</p>
          <p class="poster__alias mono">a.k.a. ${esc(S.alias)}</p>
          <div class="poster__amount"><span class="mono">Bounty</span><strong>₩ ${esc(b.amount)}</strong></div>
          <dl class="poster__fine">
            <div><dt>Wanted for</dt><dd>${esc(b.wantedFor)}</dd></div>
            <div><dt>Last seen</dt><dd>${esc(b.lastSeen)}</dd></div>
          </dl>
          <p class="poster__dead mono"><s>Dead or alive</s> Hire or collab</p>
        </div>
        <span class="stamp">${esc(S.status)}</span>
      </div>`;

    $("#year").textContent = new Date().getFullYear();
    $("#footName").textContent = S.name;
  }

  /* ------------------------------------------------------------------ intro */
  function intro(done) {
    const el = $("#intro");
    let seen = false;
    try { seen = sessionStorage.getItem("bebop-intro") === "1"; } catch (e) {}
    if (reduceMotion || seen) { el.remove(); done(); return; }
    try { sessionStorage.setItem("bebop-intro", "1"); } catch (e) {}

    document.body.classList.add("no-scroll");
    const count = $("#introCount");
    const steps = [
      { t: "3", bg: "var(--orange)", fg: "var(--ink)" },
      { t: "2", bg: "var(--blue)", fg: "var(--paper)" },
      { t: "1", bg: "var(--yellow)", fg: "var(--ink)" },
      { t: "Let's<br>Jam", bg: "var(--ink)", fg: "var(--paper)", jam: true },
    ];
    const timers = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      removeEventListener("keydown", onKey);
      el.classList.add("out");
      document.body.classList.remove("no-scroll");
      done();
      setTimeout(() => el.remove(), 900);
    };
    const onKey = (e) => { if (["Escape", "Enter", " "].includes(e.key)) { e.preventDefault(); finish(); } };

    steps.forEach((s, k) =>
      timers.push(setTimeout(() => {
        el.style.setProperty("--bg", s.bg);
        el.style.setProperty("--fg", s.fg);
        count.innerHTML = s.t;
        count.classList.toggle("jam", !!s.jam);
        el.classList.toggle("jamming", !!s.jam);
        count.classList.remove("pop");
        void count.offsetWidth;
        count.classList.add("pop");
      }, 120 + k * 520))
    );
    timers.push(setTimeout(finish, 120 + 3 * 520 + 950));

    el.addEventListener("click", finish);
    addEventListener("keydown", onKey);
  }

  /* ------------------------------------------------------------------ starfield */
  function starfield() {
    const cv = $("#stars");
    const ctx = cv.getContext("2d");
    let w, h, stars = [], shooter = null, raf = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(260, Math.round((w * h) / 5200));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1, t: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (ts = 0) => {
      ctx.clearRect(0, 0, w, h);
      const sy = scrollY;
      for (const s of stars) {
        if (!reduceMotion) { s.x -= s.z * 0.06; if (s.x < 0) s.x += w; }
        const y = (((s.y - sy * s.z * 0.18) % h) + h) % h;
        const tw = reduceMotion ? 1 : 0.4 + 0.6 * Math.abs(Math.sin(ts * 0.0008 * (0.5 + s.z) + s.t));
        ctx.globalAlpha = tw * (0.25 + s.z * 0.75);
        ctx.fillStyle = s.z > 0.92 ? "#f3b52f" : "#efe4cc";
        const r = 0.5 + s.z * 1.2;
        ctx.fillRect(s.x, y, r, r);
      }

      if (!reduceMotion) {
        if (!shooter && Math.random() < 0.004) {
          shooter = { x: Math.random() * w * 0.7 + w * 0.3, y: Math.random() * h * 0.4, life: 1 };
        }
        if (shooter) {
          const len = 140;
          const g = ctx.createLinearGradient(shooter.x, shooter.y, shooter.x + len, shooter.y - len * 0.35);
          g.addColorStop(0, "rgba(239,228,204,0.9)");
          g.addColorStop(1, "rgba(239,228,204,0)");
          ctx.globalAlpha = shooter.life;
          ctx.strokeStyle = g; ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(shooter.x, shooter.y);
          ctx.lineTo(shooter.x + len, shooter.y - len * 0.35);
          ctx.stroke();
          shooter.x -= 11; shooter.y += 3.8; shooter.life -= 0.022;
          if (shooter.life <= 0) shooter = null;
        }
        raf = requestAnimationFrame(draw);
      }
      ctx.globalAlpha = 1;
    };

    resize();
    addEventListener("resize", () => { resize(); if (reduceMotion) draw(); });
    if (reduceMotion) { draw(); addEventListener("scroll", () => draw(), { passive: true }); }
    else raf = requestAnimationFrame(draw);

    document.addEventListener("visibilitychange", () => {
      if (reduceMotion) return;
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    });
  }

  /* ------------------------------------------------------------------ nav, progress, menu */
  function chrome() {
    const nav = $("#nav"), progress = $("#progress");
    let lastY = scrollY, ticking = false;

    const onScroll = () => {
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.setProperty("--p", max > 0 ? y / max : 0);
      nav.classList.toggle("scrolled", y > 40);
      if (!document.body.classList.contains("menu-open")) nav.classList.toggle("hidden", y > lastY && y > 500);
      lastY = y;
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

    const burger = $("#burger");
    const setMenu = (open) => {
      document.body.classList.toggle("menu-open", open);
      document.body.classList.toggle("no-scroll", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) nav.classList.remove("hidden");
    };
    burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    $$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    matchMedia("(min-width: 761px)").addEventListener("change", (m) => { if (m.matches) setMenu(false); });
  }

  /* ------------------------------------------------------------------ observers */
  function observers() {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); reveal.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    $$(".reveal").forEach((el) => reveal.observe(el));

    const np = $("#np"), npText = $("#npText");
    const links = $$(".nav__links a");
    const sections = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const s = en.target;
        npText.textContent = `Session #${s.dataset.session} — ${s.dataset.title}`;
        np.classList.toggle("show", s.id !== "top" && s.id !== "end");
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + s.id));
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("[data-session]").forEach((s) => sections.observe(s));

    // end card typewriter
    const target = $("#seeYou");
    const text = "See you space cowboy…";
    if (reduceMotion) { target.textContent = text; return; }
    const typer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      typer.disconnect();
      let n = 0;
      const tick = () => {
        target.textContent = text.slice(0, ++n);
        if (n < text.length) setTimeout(tick, text[n - 1] === " " ? 140 : 70 + Math.random() * 60);
      };
      setTimeout(tick, 300);
    }, { threshold: 0.5 });
    typer.observe($(".see-you"));
  }

  /* ------------------------------------------------------------------ pointer fx */
  function pointer() {
    const hero = $(".hero");
    if (!reduceMotion && finePointer) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5) * 2);
        hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5) * 2);
      });
      hero.addEventListener("pointerleave", () => {
        hero.style.setProperty("--px", 0);
        hero.style.setProperty("--py", 0);
      });
    }

    if (!finePointer || reduceMotion) return;
    const cur = $("#cursor");
    let tx = -100, ty = -100, x = tx, y = ty;
    addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; cur.classList.add("on"); }, { passive: true });
    document.addEventListener("pointerleave", () => cur.classList.remove("on"));
    document.addEventListener("pointerover", (e) => {
      cur.classList.toggle("hover", !!e.target.closest("a, button, .ep, .inst, .poster"));
    });
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      cur.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ------------------------------------------------------------------ misc */
  function copyEmail() {
    document.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-copy]");
      if (!btn) return;
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = "Copied!";
      } catch (err) {
        location.href = "mailto:" + btn.dataset.copy;
      }
      setTimeout(() => (btn.textContent = "Copy"), 1600);
    });
  }

  function cigaretteEgg() {
    const trigger = $("#cigaretteEgg");
    const dialog = $("#cigaretteDialog");
    const gif = $("img", dialog);
    const closeButton = $("#cigaretteClose");
    const close = () => {
      dialog.classList.remove("is-open");
      dialog.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      trigger.focus();
    };
    closeButton.addEventListener("click", close);
    trigger.addEventListener("click", () => {
      if (!gif.hasAttribute("src")) gif.src = gif.dataset.src;
      document.body.classList.add("no-scroll");
      dialog.classList.add("is-open");
      dialog.setAttribute("aria-hidden", "false");
      closeButton.focus();
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) close();
    });
    addEventListener("keydown", (e) => {
      if (e.key === "Escape" && dialog.classList.contains("is-open")) {
        e.preventDefault();
        close();
      }
    });
  }

  /* ------------------------------------------------------------------ go */
  render();
  starfield();
  chrome();
  observers();
  pointer();
  copyEmail();
  cigaretteEgg();
  intro(() => requestAnimationFrame(() => document.body.classList.add("ready")));
})();
