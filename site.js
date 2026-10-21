// Shared behaviour of the two app sites: language, store buttons, card tilt, desk windows and the scroll story.
(function () {
  const LANGS = ["ko", "en", "ja"];
  const STORE = {
    appStore: {
      ko: { soon: "App Store · 곧 출시", preorder: "App Store에서 사전 주문", live: "App Store에서 받기" },
      en: { soon: "App Store · Coming soon", preorder: "Pre-order on the App Store", live: "Download on the App Store" },
      ja: { soon: "App Store・近日公開", preorder: "App Storeで予約注文", live: "App Storeでダウンロード" },
    },
    play: {
      ko: { soon: "Google Play · 곧 출시", preorder: "Google Play 사전 등록", live: "Google Play에서 받기" },
      en: { soon: "Google Play · Coming soon", preorder: "Pre-register on Google Play", live: "Get it on Google Play" },
      ja: { soon: "Google Play・近日公開", preorder: "Google Playで事前登録", live: "Google Playで手に入れよう" },
    },
  };

  // build.py writes the page again under ko/, en/ and ja/, each marked with its language; the
  // root page picks one. An old ?lang= link on the root moves to that language's page.
  const PAGE = document.documentElement.dataset.pageLang;
  const PAGES = document.documentElement.dataset.langPages !== undefined;
  const asked = new URLSearchParams(location.search).get("lang");
  if (!PAGE && PAGES && LANGS.includes(asked)) location.replace(asked + "/" + location.hash);

  function pickLang() {
    if (LANGS.includes(PAGE)) return PAGE;
    const q = asked;
    if (LANGS.includes(q)) return q;
    try { const s = localStorage.getItem("lang"); if (LANGS.includes(s)) return s; } catch (e) {}
    for (const l of navigator.languages || [navigator.language || ""]) {
      const p = l.slice(0, 2).toLowerCase();
      if (LANGS.includes(p)) return p;
    }
    return "en";
  }

  const lang = pickLang();
  document.documentElement.lang = lang;
  // A language page's <base> points at the root, so a "#part" link there would leave the page.
  if (PAGE) document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a) a.href = location.pathname + a.getAttribute("href");
  }, true);

  const Site = {
    lang,
    motion: !matchMedia("(prefers-reduced-motion: reduce)").matches,  // site.css stops the CSS ones
    t(dict, key) { const v = (dict[lang] || {})[key]; return v === undefined ? dict.en[key] : v; },
    applyText(dict, root) {
      (root || document).querySelectorAll("[data-t]").forEach(n => { n.textContent = Site.t(dict, n.dataset.t); });
      (root || document).querySelectorAll("[data-t-label]").forEach(n => { n.setAttribute("aria-label", Site.t(dict, n.dataset.tLabel)); });
    },
    langSwitch(box) {
      box.innerHTML = LANGS.map(l => `<button type="button" aria-pressed="${l === lang}" data-l="${l}">${l.toUpperCase()}</button>`).join("");
      box.addEventListener("click", e => {
        const l = e.target.dataset && e.target.dataset.l; if (!l || l === lang) return;
        try { localStorage.setItem("lang", l); } catch (err) {}
        if (PAGES) { location.href = l + "/" + location.hash; return; }  // a language page's <base> is the root
        const u = new URL(location.href); u.searchParams.set("lang", l); location.replace(u);
      });
    },
    // Buttons for every store the app is on; a store without a page yet shows 곧 출시 and only wiggles.
    stores(app, spot, cls) {
      const L = window.SITE_LINKS[app];
      return ["appStore", "play"].filter(k => L[k]).map(k => {
        const s = L[k], label = STORE[k][lang][s.state];
        if (s.state === "soon") return `<span class="btn ${cls || ""}" role="link" aria-disabled="true" tabindex="0" data-soon>${label}</span>`;
        const href = k === "appStore"
          ? `https://apps.apple.com/app/id${s.id}` + (s.pt ? `?pt=${s.pt}&ct=site-${app}-${spot}&mt=8` : "")
          : `https://play.google.com/store/apps/details?id=${s.id}&referrer=${encodeURIComponent(`utm_source=site&utm_campaign=${app}-${spot}`)}`;
        return `<a class="btn ${cls || ""}" href="${href}" rel="noopener">${label}</a>`;
      }).join("");
    },
    // An app's site in this page's language (its per-language page).
    home(app) { return window.SITE_LINKS[app].site + lang + "/"; },
    img(src) { return new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src; }); },
    // A result picture to share: `paint` draws it on a fresh canvas once the pixel font is in.
    // It is made before the tap, so the share sheet opens inside the tap (Safari asks for that).
    picture(w, h, paint) {
      const c = document.createElement("canvas"); c.width = w; c.height = h;
      const g = c.getContext("2d"); g.imageSmoothingEnabled = false;
      return Promise.all([document.fonts.load('700 48px "Galmuri11"'), document.fonts.load('36px "Galmuri11"')])
        .then(() => paint(g, c)).then(() => new Promise(ok => c.toBlob(ok, "image/png")));
    },
    // Shares `blob` (a picture) with a line and a link: the share sheet where the browser has
    // one, else the picture downloads and the link is copied. Says which happened.
    async share(blob, name, text, url) {
      const file = blob && new File([blob], name, { type: "image/png" });
      try {
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text: text + " " + url }); return "shared"; }
        if (navigator.share) { await navigator.share({ text, url }); return "shared"; }
      } catch (e) { if (e && e.name === "AbortError") return "cancelled"; }
      if (blob) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000); }
      try { await navigator.clipboard.writeText(url); } catch (e) { return blob ? "saved" : "failed"; }
      return "copied";
    },
    // A dex window on a canvas: ink edge with its corner dots cut, cream, the green inner line.
    pane(g, x, y, w, h, d) {
      g.fillStyle = "#1a1c17"; g.fillRect(x + d, y, w - 2 * d, h); g.fillRect(x, y + d, w, h - 2 * d);
      g.fillStyle = "#fcf8ee"; g.fillRect(x + d, y + d, w - 2 * d, h - 2 * d);
      g.fillStyle = "#2f6b4f"; g.fillRect(x + 2 * d, y + 2 * d, w - 4 * d, h - 4 * d);
      g.fillStyle = "#fcf8ee"; g.fillRect(x + 3 * d, y + 3 * d, w - 6 * d, h - 6 * d);
    },
    // The page's card face (cardHtml) on a canvas, `d` px a dot, its top-left at x, y.
    drawCard(g, b, bird, x, y, d) {
      const w = 80 * d, h = 112 * d, tier = { common: "#2f6b4f", uncommon: "#5f9cc0", rare: "#c29435" }[b.rarity];
      g.fillStyle = "rgba(26,28,23,.35)"; g.fillRect(x + 3 * d, y + 3 * d, w, h);
      g.fillStyle = "#1a1c17"; g.fillRect(x, y, w, h);
      g.fillStyle = "#fcf8ee"; g.fillRect(x + d, y + d, w - 2 * d, h - 2 * d);
      g.fillStyle = tier; g.fillRect(x + 2 * d, y + 2 * d, w - 4 * d, h - 4 * d);
      g.fillStyle = "#fcf8ee"; g.fillRect(x + 3 * d, y + 3 * d, w - 6 * d, h - 6 * d);
      g.fillStyle = "#2f6b4f"; g.fillRect(x + 3 * d, y + 3 * d, w - 6 * d, 9 * d);
      g.fillStyle = "#fcf8ee"; g.font = (6 * d) + 'px "Galmuri11"'; g.textBaseline = "middle"; g.textAlign = "left";
      g.fillText(Site.pad(b.no), x + 6 * d, y + 7.5 * d);
      g.drawImage(bird, x + 8 * d, y + 16 * d, 64 * d, 64 * d);
      g.fillStyle = "#1a1c17"; g.font = "700 " + (7 * d) + 'px "Galmuri11"'; g.textAlign = "center";
      g.fillText(Site.name(b), x + w / 2, y + 96 * d, w - 10 * d);
      if (b.rarity === "rare") {  // the holo glare the page's rare card wears
        const s = g.createLinearGradient(x, y, x + w, y + h);
        s.addColorStop(.25, "rgba(143,122,216,0)"); s.addColorStop(.42, "rgba(143,122,216,.28)"); s.addColorStop(.5, "rgba(255,230,189,.34)");
        s.addColorStop(.58, "rgba(95,156,192,.28)"); s.addColorStop(.75, "rgba(95,156,192,0)");
        g.fillStyle = s; g.fillRect(x + 3 * d, y + 12 * d, w - 6 * d, h - 15 * d);
      }
      g.textAlign = "left";
    },
    el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; },
    pad(n) { return "No." + String(n).padStart(3, "0"); },
    shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    clamp(v, a = 0, b = 1) { return Math.max(a, Math.min(b, v)); },
    seg(p, a, b) { return Site.clamp((p - a) / (b - a)); },
    wiggle(n) { n.animate([{ transform: "translateX(0)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0)" }], { duration: 260, easing: "ease-out" }); },
    // Pointer (and, after a tap on iOS, the gyro) tilts a flipped card and moves its glare.
    tilt(card) {
      const set = (x, y) => {
        card.style.transform = `rotateY(${180 + (x - .5) * 34}deg) rotateX(${(.5 - y) * 26}deg)`;
        card.style.setProperty("--gx", (100 - x * 100) + "%"); card.style.setProperty("--gy", (y * 100) + "%");
      };
      card.addEventListener("pointermove", e => {
        if (!card.classList.contains("flip")) return;
        const r = card.getBoundingClientRect(); set((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
      });
      card.addEventListener("pointerleave", () => { if (card.classList.contains("flip")) card.style.transform = ""; });
      const onTilt = e => { if (e.gamma == null) return; set(Site.clamp(.5 + e.gamma / 60), Site.clamp(.5 + (e.beta - 45) / 60)); };
      card.addEventListener("pointerdown", () => {
        const D = window.DeviceOrientationEvent; if (!D || card.dataset.gyro) return; card.dataset.gyro = "1";
        if (typeof D.requestPermission === "function") D.requestPermission().then(r => { if (r === "granted") addEventListener("deviceorientation", onTilt); }).catch(() => {});
        else addEventListener("deviceorientation", onTilt);
      });
    },
    cardHtml(b, name, extra) {
      const tier = { common: "var(--field)", uncommon: "var(--sky)", rare: "var(--gold)" }[b.rarity];
      return `<div class="card ${b.rarity === "rare" ? "rare" : ""} ${extra || ""}" style="--tier:${tier}" tabindex="0" role="button">
        <div class="back"></div>
        <div class="face"><div class="no">${Site.pad(b.no)}</div><img class="pix" src="birds/${b.id}.png" alt="${name}"><div class="nm">${name}</div></div></div>`;
    },
    name(b) { return b["name_" + lang] || b.name_en; },
    // Desk windows: an icon with data-open toggles the window with that id; the band drags it.
    desk(hero) {
      let z = 10;
      const front = w => { w.style.zIndex = ++z; };
      hero.querySelectorAll("[data-open]").forEach(ic => ic.addEventListener("click", () => {
        const w = hero.querySelector("#" + ic.dataset.open);
        if (!w.hidden) { front(w); Site.wiggle(w); return; }
        w.hidden = false; w.classList.remove("open"); void w.offsetWidth; w.classList.add("open"); front(w);
      }));
      hero.querySelectorAll(".dwin").forEach(w => {
        w.addEventListener("pointerdown", () => front(w));
        const close = w.querySelector(".band button"); if (close) close.addEventListener("click", () => { w.hidden = true; });
        const band = w.querySelector(".band"); let dx = 0, dy = 0, drag = false;
        band.addEventListener("pointerdown", e => {
          if (e.target.closest("button")) return;
          drag = true; band.setPointerCapture(e.pointerId); dx = e.clientX - w.offsetLeft; dy = e.clientY - w.offsetTop; band.style.cursor = "grabbing";
        });
        band.addEventListener("pointermove", e => {
          if (!drag) return;
          w.style.left = Site.clamp(e.clientX - dx, 60 - w.offsetWidth, hero.clientWidth - 60) + "px";
          w.style.top = Site.clamp(e.clientY - dy, 0, hero.clientHeight - 48) + "px"; w.style.right = "auto"; w.style.bottom = "auto";
        });
        const up = () => { drag = false; band.style.cursor = ""; };
        band.addEventListener("pointerup", up); band.addEventListener("pointercancel", up);
      });
    },
    // Calls render(p) with how far (0..1) the page has scrolled through the section.
    scrub(section, render) {
      let raf = 0;
      const run = () => { raf = 0; const r = section.getBoundingClientRect(); render(Site.clamp(-r.top / (r.height - innerHeight))); };
      const ask = () => { if (!raf) raf = requestAnimationFrame(run); };
      addEventListener("scroll", ask, { passive: true }); addEventListener("resize", ask); run();
    },
    // A 곧 출시 button still answers a tap.
    wireSoon(root) {
      (root || document).addEventListener("click", e => { const s = e.target.closest("[data-soon]"); if (s) Site.wiggle(s); });
    },
  };
  window.Site = Site;
})();
