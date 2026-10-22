const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
// Catálogo de cursos. Para habilitar pagos más adelante: completar "precio" y "linkPago" en cada curso.
// Los datos viven en data/*.json. Para habilitar pagos: completar "precio" y "linkPago" en data/cursos.json.
let CURSOS = [];

// Ilustraciones de línea según el tema del curso
const S = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
const A = 'fill="var(--accent-fill)"';
const ILUSTRACIONES = {
  evaluacion: `<rect x="16" y="12" width="32" height="42" rx="2" ${A}/><rect x="16" y="12" width="32" height="42" rx="2" ${S}/><path d="M26 9h12v6H26z" ${S}/><path d="M22 26l3 3 5-6M34 27h9M22 37l3 3 5-6M34 38h9M22 47h21" ${S}/>`,
  lectoescritura: `<path d="M10 50 L18 22 L26 50 M13 41 H23" ${S}/><path d="M32 34c0-4 3-6 6-6s6 2 6 6v16M44 39c-2-2-11-2-11 5 0 5 9 6 11 1" ${S}/><path d="M48 54l6-26 3 1-6 26-3 1z" ${A}/><path d="M48 54l6-26 3 1-6 26-3 1z" ${S}/><path d="M8 56 H40" ${S} opacity=".5"/>`,
  ejecutivas: `<circle cx="32" cy="32" r="20" ${A}/><path d="M24 14a10 10 0 0 0-12 10c-3 3-3 9 1 12-1 5 3 9 8 9 2 4 8 5 11 1 3 4 9 3 11-1 5 0 9-4 8-9 4-3 4-9 1-12a10 10 0 0 0-12-10c-3-4-13-4-16 0z" ${S}/><path d="M32 14v36M24 24c3 0 5 2 5 5M40 24c-3 0-5 2-5 5M22 38h6M36 38h6" ${S}/>`,
  juego: `<rect x="10" y="26" width="22" height="22" rx="3" ${A}/><rect x="10" y="26" width="22" height="22" rx="3" ${S}/><circle cx="16" cy="32" r="1.6" fill="currentColor"/><circle cx="21" cy="37" r="1.6" fill="currentColor"/><circle cx="26" cy="42" r="1.6" fill="currentColor"/><path d="M38 20l14-6 6 14-14 6z" ${S}/><circle cx="46" cy="21" r="1.5" fill="currentColor"/><circle cx="50" cy="27" r="1.5" fill="currentColor"/><path d="M38 52 a6 6 0 0 1 12 0 M44 46 v-6 M41 40 h6" ${S}/>`,
  supervision: `<path d="M8 14h28a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H20l-7 6v-6H8a3 3 0 0 1-3-3V17a3 3 0 0 1 3-3z" ${A}/><path d="M8 14h28a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H20l-7 6v-6H8a3 3 0 0 1-3-3V17a3 3 0 0 1 3-3z" ${S}/><path d="M13 21h18M13 26h12" ${S}/><path d="M56 30H34a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h14l6 5v-5h2a3 3 0 0 0 3-3V33a3 3 0 0 0-3-3z" ${S}/><path d="M37 37h15M37 42h9" ${S}/>`,
  familias: `<path d="M6 30 L20 18 L34 30 V52 H6 Z" ${A}/><path d="M6 30 L20 18 L34 30 M9 28 V52 H31 V28 M17 52 V42 H23 V52" ${S}/><path d="M36 52 V30 H58 V52 M36 30 L47 22 L58 30 M47 22 V14 h6 v4 h-6" ${S}/><path d="M41 36h4M49 36h4M41 43h4M49 43h4M45 52v-5h4v5" ${S}/>`,
};
const ilustracion = tema => ILUSTRACIONES[tema] ? `<svg viewBox="0 0 64 64" aria-hidden="true">${ILUSTRACIONES[tema]}</svg>` : "";

const grid = document.getElementById("courses-grid");
function renderCursos(filtro) {
  grid.innerHTML = "";
  CURSOS.filter(c => filtro === "todos" || c.nivel === filtro).forEach(c => {
    const el = document.createElement("article");
    el.className = "course";
    const pago = c.precio && c.linkPago;
    el.innerHTML = `
      <div class="course-cover t-${c.tema}">${ilustracion(c.tema)}<span class="lvl">${c.nivel}</span></div>
      <div class="course-body">
        <h3>${c.titulo}</h3>
        <p>${c.desc}</p>
        <div class="course-info"><span>${c.semanas} semanas</span><span>${c.modalidad}</span><span>Inicio: ${c.inicio}</span></div>
      </div>
      <div class="course-foot">
        <span class="price ${pago ? "" : "soon"}">${pago ? c.precio : "Inscripción próximamente"}</span>
        ${pago ? `<a class="btn btn-primary" href="${c.linkPago}" target="_blank" rel="noopener">Inscribirme</a>` : `<a class="btn btn-ghost" href="#contacto" data-curso="${c.titulo}">Quiero info</a>`}
      </div>`;
    grid.appendChild(el);
  });
}
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const getJSON = path => fetch(path).then(r => { if (!r.ok) throw new Error(path); return r.json(); });

getJSON("data/cursos.json")
  .then(d => { CURSOS = d; renderCursos("todos"); })
  .catch(() => { grid.innerHTML = '<p class="load-error">No se pudieron cargar los cursos. Si abriste el archivo directo, usá un servidor local (ver README).</p>'; });

const playIcon = s => `<span class="play" aria-hidden="true"><svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#12324a"/></svg></span>`;
getJSON("data/videos.json").then(vs => {
  if (!vs.length) return;
  const link = v => v.url ? `href="${esc(v.url)}" target="_blank" rel="noopener"` : 'href="#videos"';
  const [first, ...rest] = vs;
  document.getElementById("video-grid").innerHTML = `
    <a class="video video-feature" ${link(first)}>
      <div class="thumb">${playIcon(22)}<span class="dur">${esc(first.duracion)}</span></div>
      <h3>${esc(first.titulo)}</h3><p>${esc(first.desc)}</p>
    </a>
    <div class="video-list">${rest.map(v => `
      <a class="video small" ${link(v)}>
        <div class="thumb">${playIcon(16)}<span class="dur">${esc(v.duracion)}</span></div>
        <div><h3>${esc(v.titulo)}</h3><p>${esc(v.desc)}</p></div>
      </a>`).join("")}</div>`;
}).catch(() => {});

getJSON("data/encuentros.json").then(es => {
  if (!es.length) return;
  document.getElementById("agenda-list").innerHTML = es.map(e => `
    <li><div class="date"><b>${esc(e.dia)}</b><small>${esc(e.mes)}</small></div><div><strong>${esc(e.titulo)}</strong><span>${esc(e.detalle)}</span></div></li>`).join("");
  const f = es[0], d = document.getElementById("hero-meet-date"), t = document.getElementById("hero-meet-text");
  if (d) d.innerHTML = `<b>${esc(f.dia)}</b><small>${esc(f.mes)}</small>`;
  if (t) t.innerHTML = `<small class="fc-label">${esc(f.etiqueta || "Próximo encuentro")}</small><strong>${esc(f.tarjetaInicio || f.titulo)}</strong>`;
}).catch(() => {});

getJSON("data/contacto.json").then(c => {
  if (c.email) document.getElementById("c-mail").textContent = c.email;
  if (c.whatsapp) {
    document.getElementById("c-wa").textContent = c.whatsapp;
    document.querySelector(".wa-float").href = "https://wa.me/" + c.whatsapp.replace(/\D/g, "");
  }
  if (c.instagram) document.getElementById("c-ig").textContent = c.instagram;
}).catch(() => {});

document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".filters button").forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
  renderCursos(b.dataset.filter);
}));
grid.addEventListener("click", e => {
  const a = e.target.closest("[data-curso]");
  if (!a) return;
  document.getElementById("f-topic").value = "Cursos";
  const msg = document.getElementById("f-msg");
  if (!msg.value) msg.value = `Hola Pamela, me interesa el curso "${a.dataset.curso}".`;
});

// Navegación por pantallas
const views = [...document.querySelectorAll(".view")];
views.forEach((v, i) => {
  if (v.id === "inicio") return;
  const prev = views[i - 1], next = views[i + 1];
  const pager = document.createElement("div");
  pager.className = "pager";
  pager.innerHTML = (prev ? `<a class="prev" href="#${prev.id}"><small>← Anterior</small><strong>${prev.dataset.name}</strong></a>` : "") +
    (next ? `<a class="next" href="#${next.id}"><small>Siguiente →</small><strong>${next.dataset.name}</strong></a>` : `<a class="next" href="#inicio"><small>Volver al inicio</small><strong>Inicio</strong></a>`);
  const holder = document.createElement("div");
  holder.className = "pager-wrap";
  holder.appendChild(pager);
  v.appendChild(holder);
});
function show(id, animate) {
  const target = views.find(v => v.id === id) || views[0];
  views.forEach(v => { v.hidden = v !== target; v.classList.remove("entering"); });
  if (animate) { void target.offsetWidth; target.classList.add("entering"); }
  if (target.id === "inicio") runCounters();
  document.querySelectorAll(".nav a, .tabbar a").forEach(a => { if (a.getAttribute("href") === "#" + target.id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  window.scrollTo(0, 0);
}
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href").slice(1);
  if (!views.some(v => v.id === id)) return;
  e.preventDefault();
  try { history.pushState(null, "", "#" + id); } catch (err) {}
  show(id, true);
});
addEventListener("popstate", () => show(location.hash.slice(1) || "inicio", true));
show(location.hash.slice(1) || "inicio", false);

// Contadores del inicio
function runCounters() {
  document.querySelectorAll("[data-count]").forEach(el => {
    const end = +el.dataset.count, pre = el.dataset.prefix || "";
    if (reduceMotion) { el.textContent = pre + end; return; }
    const t0 = performance.now(), dur = 1200;
    const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = pre + Math.round(end * e); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}

// Sombra del encabezado al hacer scroll
addEventListener("scroll", () => document.querySelector(".top").classList.toggle("scrolled", scrollY > 8), { passive: true });

// Menú móvil
const menuBtn = document.getElementById("menu-btn"), nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => { const o = nav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", o); });
nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });

// Copiar datos de contacto
document.querySelectorAll(".copy").forEach(btn => btn.addEventListener("click", () => {
  const el = document.getElementById(btn.dataset.copy);
  const done = () => { btn.textContent = "Copiado"; setTimeout(() => btn.textContent = "Copiar", 1600); };
  try {
    navigator.clipboard.writeText(el.textContent).then(done, () => selectText(el));
  } catch (e) { selectText(el); }
}));
function selectText(el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }

// Formulario (vista previa: todavía no envía)
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const note = document.getElementById("form-note");
  const name = document.getElementById("f-name").value.trim();
  const mail = document.getElementById("f-mail").value.trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(mail)) { note.textContent = "Completá tu nombre y un email válido para continuar."; return; }
  note.textContent = `Gracias, ${name}. En esta vista previa el formulario todavía no envía mensajes; en la versión final le llegará a Pamela por email.`;
});

// Ilustración del mar en el inicio
(function () {
  const cv = document.getElementById("seascape"); if (!cv) return;
  const ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W, H, t = 0;
  const layers = [
    { y: 0.50, amp: 7, len: 140, speed: 0.6, color: "#8fd0cf" },
    { y: 0.58, amp: 9, len: 180, speed: -0.45, color: "#4fb0b8" },
    { y: 0.67, amp: 10, len: 220, speed: 0.35, color: "#2a8fa8" },
    { y: 0.77, amp: 12, len: 260, speed: -0.28, color: "#1f6f8b" },
    { y: 0.88, amp: 12, len: 300, speed: 0.2, color: "#12506b" },
  ];
  const fish = Array.from({ length: 5 }, (_, i) => ({ x: Math.random(), y: 0.62 + i * 0.06, s: 0.0006 + Math.random() * 0.0008, dir: i % 2 ? -1 : 1 }));
  function size() { const r = cv.getBoundingClientRect(); const d = devicePixelRatio || 1; W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
  function draw() {
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5);
    sky.addColorStop(0, "#fbe9cf"); sky.addColorStop(1, "#cfe9e6");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    // sol
    const sx = W * 0.5, sy = H * 0.36, sr = W * 0.17;
    const glow = ctx.createRadialGradient(sx, sy, sr * 0.6, sx, sy, sr * 2.4);
    glow.addColorStop(0, "rgba(242, 160, 120, 0.45)"); glow.addColorStop(1, "rgba(242, 160, 120, 0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#f2a078"; ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
    // olas
    layers.forEach((L, i) => {
      ctx.fillStyle = L.color; ctx.beginPath(); ctx.moveTo(0, H);
      for (let x = 0; x <= W + 4; x += 4) ctx.lineTo(x, H * L.y + Math.sin((x / L.len) * Math.PI * 2 + t * L.speed) * L.amp + Math.sin(x / 47 + t * 0.7) * 2);
      ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
      // peces entre capas
      [].filter(f => Math.abs(f.y - L.y) < 0.03 && i > 1).forEach(f => {
        const fx = ((f.x * W) % (W + 40)) - 20, fy = H * (f.y + 0.03);
        ctx.fillStyle = "rgba(255, 250, 241, 0.75)";
        ctx.beginPath(); ctx.ellipse(fx, fy, 7, 3.2, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(fx - 6 * f.dir, fy); ctx.lineTo(fx - 11 * f.dir, fy - 4); ctx.lineTo(fx - 11 * f.dir, fy + 4); ctx.fill();
      });
    });
  }
  function tick() {
    t += 0.008;
    fish.forEach(f => { f.x += f.s * f.dir; if (f.x > 1.1) f.x = -0.1; if (f.x < -0.1) f.x = 1.1; });
    draw(); requestAnimationFrame(tick);
  }
  size(); addEventListener("resize", () => { size(); if (reduce) draw(); });
  reduce ? draw() : tick();
})();
