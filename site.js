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

  function pickLang() {
    const q = new URLSearchParams(location.search).get("lang");
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

  const Site = {
    lang,
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
