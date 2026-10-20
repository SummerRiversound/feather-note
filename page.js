// 새찍도감 site: find and photograph hidden birds in the hero, the scroll story below, desk windows on wide screens.
(function () {
  const T = {
    ko: {
      name: "새찍도감", shootTab: "새 찍기", platforms: "iPhone · Android",
      hint: "풍경 속에 숨은 새 세 마리를 찾아서 찍어 보세요", miss: "아무것도 안 찍혔어요", dup: "이미 도감에 있어요", got: "{no} {n} 등록!",
      resultTitle: "도감 세 칸을 채웠어요!", again: "다시 찾기",
      resultBody: "앱에서는 새 사진을 고르면 기기 안의 판별 모델이 이름 후보를 보여 줘요. 여덟 권역, 781종.",
      other: "카드깡 시뮬레이터", otherWhat: "찍은 새를 카드 팩에서 뽑아 볼까요?", otherGo: "카드깡 시뮬레이터 보러 가기 →",
      wAbout: "소개", wAboutTitle: "새찍도감은?", wDex: "내 도감", wLegal: "도움말", close: "닫기",
      dexCount: "781종 중 {n}종", f1: "새를 찍으면 이름이 붙고, 그 한 장이 도감이 돼요.", f2: "판별은 기기 안에서, 인터넷 없이 끝나요.", f3: "전 세계 여덟 권역, 781종.", f4: "계정도 광고도 없고, 한 번 사면 끝이에요.",
      deskHint: "아이콘을 눌러 보세요 · 창은 띠를 잡고 끌어요",
      s1h: "사진 한 장이 곧 채집", s1p: "새를 찍으면 이름이 붙고, 그 한 장이 도감의 플레이트가 돼요.",
      s2h: "판별은 기기 안에서", s2p: "인터넷이 없어도 기기 안의 모델이 후보를 내놓아요. 확실하지 않으면 후보 세 종을 함께 보여 줘요.",
      s3h: "여덟 권역, 781종", s3p: "사는 곳에 따라 도감이 바뀌고, 지역별 진행도와 배지가 쌓여요.",
      s4h: "계정 없이, 이 기기에만", s4p: "피드도, 팔로워도, 광고도 없어요. 한 번 사면 끝이에요.",
      st1: "계정 없음", st2: "광고 없음", st3: "한 번 구매",
      endBody: "iPhone과 Android에서 만나요.",
      privacy: "개인정보 처리방침", support: "지원",
      credits: "© 2026 SummerRiversound · 글꼴 갈무리(SIL OFL 1.1)",
    },
    en: {
      name: "Feather Note", shootTab: "Photograph", platforms: "iPhone · Android",
      hint: "Find the three birds hiding in the scene and photograph them", miss: "Nothing in the frame", dup: "Already in your dex", got: "{no} {n} added!",
      resultTitle: "Three entries filled!", again: "Find again",
      resultBody: "In the app, pick a bird photo and the model on your phone suggests its name. Eight realms, 781 species.",
      other: "TCG Pack Simulator", otherWhat: "Pull the birds you photographed from card packs?", otherGo: "See TCG Pack Simulator →",
      wAbout: "About", wAboutTitle: "What is Feather Note?", wDex: "My dex", wLegal: "Help", close: "Close",
      dexCount: "{n} of 781 species", f1: "Photograph a bird and it gets its name; that photo becomes its dex plate.", f2: "Identification runs on your phone, no internet needed.", f3: "781 species across eight realms of the world.", f4: "No account, no ads, one purchase.",
      deskHint: "Click the icons · drag windows by their bar",
      s1h: "One photo, one specimen", s1p: "Photograph a bird and it gets its name; that one shot becomes a plate in your dex.",
      s2h: "Identified on your phone", s2p: "No internet needed: the model on your phone suggests names. When it isn't sure, it shows three candidates.",
      s3h: "Eight realms, 781 species", s3p: "Your dex follows where you live, with progress by region and badges along the way.",
      s4h: "No account, only this phone", s4p: "No feed, no followers, no ads. Buy it once and it's yours.",
      st1: "No account", st2: "No ads", st3: "One purchase",
      endBody: "Coming to iPhone and Android.",
      privacy: "Privacy Policy", support: "Support",
      credits: "© 2026 SummerRiversound · Font: Galmuri (SIL OFL 1.1)",
    },
    ja: {
      name: "Feather Note", shootTab: "撮る", platforms: "iPhone・Android",
      hint: "風景に隠れた鳥を3羽見つけて撮ってみよう", miss: "何も写っていない", dup: "もう図鑑にある", got: "{no} {n} 登録！",
      resultTitle: "図鑑が3つ埋まった！", again: "もう一度探す",
      resultBody: "アプリでは鳥の写真を選ぶと、端末の中の判定モデルが名前の候補を出す。8つの地域、781種。",
      other: "神引きシミュレーター", otherWhat: "撮った鳥をカードパックで引いてみる？", otherGo: "神引きシミュレーターを見る →",
      wAbout: "紹介", wAboutTitle: "Feather Noteとは", wDex: "わたしの図鑑", wLegal: "ヘルプ", close: "閉じる",
      dexCount: "781種中{n}種", f1: "鳥を撮ると名前がつき、その一枚が図鑑になる。", f2: "判定は端末の中で、ネットなしで終わる。", f3: "世界の8つの地域、781種。", f4: "アカウントも広告もなく、買い切り。",
      deskHint: "アイコンをクリック・ウィンドウは帯をつかんで動かす",
      s1h: "写真一枚がそのまま標本", s1p: "鳥を撮ると名前がつき、その一枚が図鑑のプレートになる。",
      s2h: "判定は端末の中で", s2p: "ネットがなくても端末の中のモデルが候補を出す。確かでないときは3種を並べて見せる。",
      s3h: "8つの地域、781種", s3p: "暮らす場所で図鑑が変わり、地域ごとの進み具合とバッジがたまる。",
      s4h: "アカウントなし、この端末だけに", s4p: "フィードもフォロワーも広告もない。一度買えばそれで終わり。",
      st1: "アカウントなし", st2: "広告なし", st3: "買い切り",
      endBody: "iPhoneとAndroidで会おう。",
      privacy: "プライバシーポリシー", support: "サポート",
      credits: "© 2026 SummerRiversound · フォント Galmuri（SIL OFL 1.1）",
    },
  };
  const t = k => Site.t(T, k);
  const D = window.DATA;
  const realm = D.realms[Site.lang === "en" ? "north-america" : "east-asia"];

  document.title = t("name");
  Site.applyText(T);
  Site.langSwitch(document.querySelector(".langs"));
  document.querySelectorAll("[data-stores]").forEach(n => { n.innerHTML = Site.stores("feathernote", n.dataset.stores, n.dataset.stores === "bar" ? "small" : ""); });
  document.querySelectorAll("[data-other]").forEach(a => { a.href = window.SITE_LINKS.cardkkang.site + "?lang=" + Site.lang; });
  Site.wireSoon();
  Site.desk(document.getElementById("hero"));

  // A field in the app's paper-map colours, painted at low resolution and scaled up as pixels.
  function paint(back, front, W, H, seed) {
    back.width = front.width = W; back.height = front.height = H;
    const b = back.getContext("2d"), f = front.getContext("2d");
    const n = (x, k) => Math.sin(x * .07 * k + seed) * .5 + Math.sin(x * .023 * k + seed * 2.3) * .8 + Math.sin(x * .17 * k + seed * .7) * .25;
    const bands = ["#f1ecde", "#ece9de", "#e6e8de", "#e0e6e0", "#dce5e8"];
    bands.forEach((c, i) => { b.fillStyle = c; b.fillRect(0, Math.round(H * .42 * i / bands.length), W, Math.ceil(H * .42 / bands.length) + 1); });
    b.fillStyle = "#fcf8ee";
    for (let i = 0; i < W / 40; i++) { const cx = (i * 47 + seed * 13) % W, cy = H * (.08 + (i % 3) * .05); b.fillRect(cx, cy, 14, 3); b.fillRect(cx + 3, cy - 2, 8, 2); }
    const ridge = (base, amp, k, color) => { b.fillStyle = color; for (let x = 0; x < W; x++) { const y = Math.round(H * base + n(x, k) * amp); b.fillRect(x, y, 1, H - y); } };
    ridge(.40, 5, .6, "#aebea9");
    ridge(.50, 4, 1.1, "#85a48d");
    // trees on the middle hills
    for (let x = 6; x < W; x += 9 + ((x * 7 + seed) % 11)) {
      const y = Math.round(H * .50 + n(x, 1.1) * 4), r = 4 + (x % 3);
      b.fillStyle = "#5e5226"; b.fillRect(x, y - 3, 1, 4);
      b.fillStyle = "#55846a"; b.fillRect(x - r + 1, y - 3 - r * 2, r * 2 - 1, r * 2); b.fillRect(x - r, y - 2 - r * 2 + 2, r * 2 + 1, r * 2 - 3);
      b.fillStyle = "#6e957c"; b.fillRect(x - r + 2, y - 2 - r * 2, r - 1, 2);
    }
    ridge(.60, 2, 1.6, "#d0d5c2");
    // the water
    const w0 = Math.round(H * .66), w1 = Math.round(H * .79);
    b.fillStyle = "#c3d3d8"; b.fillRect(0, w0, W, w1 - w0);
    b.fillStyle = "#dce5e8"; for (let y = w0 + 2; y < w1; y += 4) for (let x = (y * 3) % 9; x < W; x += 13) b.fillRect(x, y, 5, 1);
    b.fillStyle = "#4f6e78"; b.fillRect(0, w0, W, 1);
    b.fillStyle = "#e6dfc7"; b.fillRect(0, w1, W, H - w1);
    b.fillStyle = "#d0d5c2"; for (let y = w1 + 3; y < H; y += 5) for (let x = (y * 5) % 7; x < W; x += 11) b.fillRect(x, y, 2, 1);
    // reeds in front, drawn on their own canvas so a bird can hide behind them
    f.clearRect(0, 0, W, H);
    for (let x = 0; x < W; x++) {
      if (n(x, 2.6) < .2) continue;
      const h = Math.round(H * (.1 + .08 * (n(x, 5) + 1))), y = H - h;
      f.fillStyle = x % 3 ? "#2f6b4f" : "#55846a"; f.fillRect(x, y, 1, h);
      if (x % 4 === 0) { f.fillStyle = "#7d6221"; f.fillRect(x, y - 3, 1, 3); }
    }
    // a near tree on the left
    f.fillStyle = "#5e5226"; f.fillRect(Math.round(W * .1), Math.round(H * .2), 3, Math.round(H * .46));
    f.fillStyle = "#2f6b4f"; const tx = Math.round(W * .11), ty = Math.round(H * .2);
    [[-14, -10, 30, 16], [-18, -2, 36, 12], [-10, -18, 22, 10]].forEach(([dx, dy, w, h]) => f.fillRect(tx + dx, ty + dy, w, h));
    f.fillStyle = "#55846a"; f.fillRect(tx - 12, ty - 16, 12, 3); f.fillRect(tx - 16, ty - 6, 10, 2);
  }

  // Where a bird can hide, in % of the stage (above the dex bar), some half behind the reeds or leaves.
  const SPOTS = [
    { x: 25, y: 19 }, { x: 58, y: 70 }, { x: 84, y: 74 },
    { x: 70, y: 16 }, { x: 38, y: 47 }, { x: 30, y: 76 }, { x: 84, y: 50 },
  ];

  // hero: find and photograph
  const s = document.getElementById("stage");
  const back = s.querySelector(".back"), front = s.querySelector(".front"), vf = s.querySelector(".vf"), flash = s.querySelector(".flash"),
    toast = s.querySelector(".toast"), hint = s.querySelector(".hint"), bar = s.querySelector(".dexbar"), result = s.querySelector(".result");
  // 210 rows tall, as wide as keeps the pixels square on this screen
  paint(back, front, Math.round(210 * s.clientWidth / s.clientHeight), 210, 1.7);
  const seen = [];
  let birds = [], got;
  const say = m => { toast.textContent = m; toast.classList.add("on"); clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove("on"), 1100); };
  function slotsHtml(list) { return list.map(b => `<div class="slot"><img class="pix" src="birds/${b.id}.png" alt="${Site.name(b)}"><span class="st">${Site.pad(b.no)}</span></div>`).join(""); }
  function hide() {
    s.querySelectorAll(".hid").forEach(h => h.remove());
    birds = Site.shuffle(realm.birds).slice(0, 3);
    const spots = Site.shuffle(SPOTS).slice(0, 3);
    birds.forEach((b, i) => {
      const h = Site.el(`<img class="hid pix bob ${i % 2 ? "flip" : ""}" src="birds/${b.id}.png" alt="" data-i="${i}">`);
      h.style.left = spots[i].x + "%"; h.style.top = spots[i].y + "%"; h.style.animationDelay = i * .5 + "s";
      s.insertBefore(h, front);
    });
    got = new Set();
    bar.querySelector(".slots").innerHTML = slotsHtml(birds);
    bar.hidden = false; result.classList.remove("on"); hint.hidden = false;
  }
  const place = e => { const r = s.getBoundingClientRect(); vf.style.left = (e.clientX - r.left) + "px"; vf.style.top = (e.clientY - r.top) + "px"; };
  s.addEventListener("pointermove", e => { if (e.pointerType === "mouse") place(e); });
  s.addEventListener("pointerdown", e => {
    if (e.target.closest("button, a, .result, .dexbar")) return;
    place(e); vf.classList.add("snap"); setTimeout(() => vf.classList.remove("snap"), 150);
    flash.classList.add("on"); requestAnimationFrame(() => requestAnimationFrame(() => flash.classList.remove("on")));
    const v = vf.getBoundingClientRect(); let hit = -1;
    s.querySelectorAll(".hid").forEach(h => { const r = h.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2; if (cx > v.left && cx < v.right && cy > v.top && cy < v.bottom) hit = +h.dataset.i; });
    if (hit < 0) { say(t("miss")); return; }
    if (got.has(hit)) { say(t("dup")); return; }
    got.add(hit); const b = birds[hit];
    say(t("got").replace("{no}", Site.pad(b.no)).replace("{n}", Site.name(b)));
    bar.querySelectorAll(".slot")[hit].classList.add("got");
    if (!seen.some(x => x.id === b.id)) seen.push(b);
    renderDex();
    const h = s.querySelector(`.hid[data-i="${hit}"]`); h.classList.remove("bob"); h.style.transform = "translateY(-130%) scale(.8)"; h.style.opacity = 0;
    if (got.size === 3) setTimeout(() => {
      bar.hidden = true; hint.hidden = true;
      result.querySelector(".lead").before(Object.assign(document.createElement("div"), { className: "slots", innerHTML: slotsHtml(birds) }));
      result.querySelectorAll(".slots .slot").forEach(x => x.classList.add("got"));
      result.classList.add("on");
    }, 700);
  });
  result.querySelector(".again").addEventListener("click", () => { result.querySelector(".slots")?.remove(); hide(); });
  function renderDex() {
    const all = realm.birds.slice(0, 15);
    document.getElementById("dex").innerHTML = all.map(b => `<div class="${seen.some(x => x.id === b.id) ? "" : "no"}"><img class="pix" src="birds/${b.id}.png" alt=""></div>`).join("");
    document.getElementById("dexCount").textContent = t("dexCount").replace("{n}", seen.length);
    if (seen.length) document.getElementById("dexIcon").src = `birds/${seen[seen.length - 1].id}.png`;
  }
  hide(); renderDex();

  // story: a photo becomes a plate, candidates on the phone, the dex fills, no account
  const story = document.getElementById("story"), scene = story.querySelector(".scene"), actors = scene.querySelector(".actors");
  const cap = scene.querySelector(".cap"), end = scene.querySelector(".end"), pano = scene.querySelector("#pano");
  const panoFront = document.createElement("canvas"); paint(pano, panoFront, Math.round(210 * 2 * scene.clientWidth / scene.clientHeight), 210, 4.2);
  pano.getContext("2d").drawImage(panoFront, 0, 0);
  const cast = Site.shuffle(realm.birds);
  const star = cast[0];
  const wild = Site.el(`<img class="flyer pix" src="birds/${star.id}.png" alt="" style="left:60%;top:58%">`); actors.append(wild);
  const sflash = Site.el(`<div class="flash"></div>`); scene.append(sflash);
  const plate = Site.el(`<div class="win plate"><img class="pix" src="birds/${star.id}.png" alt=""><div>${Site.pad(star.no)} ${Site.name(star)}</div></div>`); actors.append(plate);
  const cands = Site.el(`<div class="win cands">${[star, cast[1], cast[2]].map((b, i) => `<div class="cand"><img class="pix" src="birds/${b.id}.png" alt=""><div>${Site.name(b)}<div class="meter"><i data-w="${[86, 9, 5][i]}"></i></div></div></div>`).join("")}</div>`); actors.append(cands);
  const grid = Site.el(`<div class="win grid"><div class="mini">${realm.birds.slice(0, 20).map(b => `<div class="no"><img class="pix" src="birds/${b.id}.png" alt=""></div>`).join("")}</div></div>`); actors.append(grid);
  const cells = [...grid.querySelectorAll(".mini > div")];
  const stamps = Site.el(`<div class="stamps"><div class="stamp">${t("st1")}</div><div class="stamp">${t("st2")}</div><div class="stamp">${t("st3")}</div></div>`); actors.append(stamps);
  let beat = -1, shot = false;
  const show = (n, on) => { n.style.opacity = on ? 1 : 0; n.style.transform = `translate(-50%, -50%) scale(${on ? 1 : .6})`; };
  Site.scrub(story, p => {
    const b = p < .25 ? 0 : p < .5 ? 1 : p < .74 ? 2 : 3;
    if (b !== beat) { beat = b; cap.querySelector(".step").textContent = `${b + 1} / 4`; cap.querySelector("h2").textContent = t(`s${b + 1}h`); cap.querySelector("p").textContent = t(`s${b + 1}p`); story.setAttribute("aria-label", t(`s${b + 1}h`)); }
    pano.style.transform = `translateX(${-p * 50}%)`;
    // 1: the camera finds a bird, the shutter, a plate
    const snap = p > .14;
    if (snap !== shot) { shot = snap; if (snap) { sflash.classList.add("on"); requestAnimationFrame(() => requestAnimationFrame(() => sflash.classList.remove("on"))); } }
    wild.style.opacity = snap ? 0 : 1; wild.style.transform = `translate(-50%,-50%) translateX(${-p * 300}%)`;
    show(plate, p > .14 && p < .25);
    // 2: three candidates, the first one sure
    show(cands, b === 1);
    cands.querySelectorAll(".meter i").forEach(i => { i.style.width = Site.seg(p, .28, .42) * i.dataset.w + "%"; });
    // 3: the dex fills cell by cell
    show(grid, b === 2);
    const filled = Math.round(Site.seg(p, .52, .72) * cells.length);
    cells.forEach((c, i) => c.classList.toggle("no", i >= filled));
    // 4: no account, no ads, one purchase
    show(stamps, b === 3);
    [...stamps.children].forEach((st, i) => { const on = p > .78 + i * .04; st.style.opacity = on ? 1 : 0; st.style.transform = `rotate(${[-4, 3, -2][i]}deg) scale(${on ? 1 : 1.8})`; });
    end.classList.toggle("on", p > .94);
  });
})();
