// Generates the self-contained animated SVGs used by both README.md and site/index.html.
// Zero dependencies. Run: node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));
const out = (p, s) => {
  mkdirSync(dirname(join(root, p)), { recursive: true });
  writeFileSync(join(root, p), s);
  console.log("wrote", p);
};

const contrib = read("data/contributions.json");
const sprint = read("data/sprint-57.json");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY = 86400000;
const parse = (s) => new Date(s + "T00:00:00Z");
const iso = (d) => d.toISOString().slice(0, 10);
const fmt = (d) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
const n = (x) => x.toLocaleString("en-AU");

// Shared theme: light by default, dark via media query (works inside <img> on GitHub).
const theme = `
  :root{--ink:#1c1917;--mute:#78716c;--rule:#d6d3d1;--l0:#ebe8e4;--l1:#fde9b8;--l2:#fbc65a;--l3:#f59e0b;--l4:#ea580c;--l5:#c2280f;--acc:#ea580c;--scope:#a8a29e;--wk:#f5f3f0}
  @media (prefers-color-scheme:dark){:root{--ink:#f5f5f4;--mute:#a8a29e;--rule:#44403c;--l0:#292524;--l1:#4a3410;--l2:#7c4f0b;--l3:#c27408;--l4:#f97316;--l5:#ff5a36;--acc:#fb923c;--scope:#78716c;--wk:#1f1c1a}}
  text{font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;fill:var(--ink)}
  .mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .mute{fill:var(--mute)}
  .l0{fill:var(--l0)}.l1{fill:var(--l1)}.l2{fill:var(--l2)}.l3{fill:var(--l3)}.l4{fill:var(--l4)}.l5{fill:var(--l5)}
  .fa{fill:var(--acc)}.sa{stroke:var(--acc)}.sr{stroke:var(--rule)}.sm{stroke:var(--mute)}.ss{stroke:var(--scope)}.fw{fill:var(--wk)}
  @keyframes in{from{opacity:0}to{opacity:1}}
  @keyframes rise{from{transform:scaleY(0)}to{transform:scaleY(1)}}
  @keyframes draw{to{stroke-dashoffset:0}}
  @media (prefers-reduced-motion:reduce){*{animation:none!important;stroke-dashoffset:0!important}}
`;

const level = (c) => (c === 0 ? 0 : c < 5 ? 1 : c < 15 ? 2 : c < 40 ? 3 : c < 100 ? 4 : 5);

// ---------- inflection.svg : 12-month contribution heatmap ----------
function inflection() {
  const from = parse(contrib.from), to = parse(contrib.to);
  const start = new Date(from.getTime() - from.getUTCDay() * DAY); // back to Sunday
  const cell = 13, gap = 3, step = cell + gap;
  const left = 32, top = 74, W = 900;
  let cells = "", months = "", total = 0, peak = { c: 0 }, lastMonth = -1;
  let col = 0;
  for (let d = start; d <= to; d = new Date(d.getTime() + DAY)) {
    const dow = d.getUTCDay();
    col = Math.floor((d - start) / DAY / 7);
    if (d < from) continue;
    const c = contrib.days[iso(d)] || 0;
    total += c;
    if (c > peak.c) peak = { c, d };
    const x = left + col * step, y = top + dow * step;
    if (dow === 0 && d.getUTCMonth() !== lastMonth && d.getUTCDate() <= 7) {
      lastMonth = d.getUTCMonth();
      months += `<text x="${x}" y="${top - 8}" font-size="10" class="mute">${MONTHS[lastMonth]}</text>`;
    }
    cells += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2.5" class="l${level(c)}" style="animation:in .35s ${(col * 0.045).toFixed(2)}s both"><title>${c} on ${fmt(d)}</title></rect>`;
  }
  const colOf = (s) => Math.floor((parse(s) - start) / DAY / 7);
  const x0 = left + colOf(sprint.start) * step, x1 = left + colOf(sprint.end) * step + cell;
  const by = top + 7 * step + 6, t = 2.6;
  const H = by + 52;
  const peakX = left + colOf(iso(peak.d)) * step + cell / 2, peakY = top + peak.d.getUTCDay() * step;
  const legend = [0, 1, 2, 3, 4, 5].map((l, i) => `<rect x="${W - 132 + i * 15}" y="${H - 22}" width="11" height="11" rx="2" class="l${l}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d">
<title id="t">The inflection — ${n(total)} GitHub contributions in 12 months</title>
<desc id="d">Contribution heatmap from ${fmt(from)} ${from.getUTCFullYear()} to ${fmt(to)} ${to.getUTCFullYear()}. Near-empty for six months, ramping from mid-year, peaking at ${peak.c} on ${fmt(peak.d)} during sprint ${sprint.sprint}.</desc>
<style>${theme}</style>
<text x="${left}" y="26" font-size="20" font-weight="700">${n(total)} <tspan font-weight="400" class="mute">contributions · last 12 months</tspan></text>
<text x="${W - 32}" y="26" font-size="12" text-anchor="end" class="mute mono">github.com/sekmun</text>
<text x="${left}" y="46" font-size="12" class="mute">Quiet for six months. Then the loop switched on.</text>
${months}${cells}
<g style="animation:in .6s ${t}s both">
  <line x1="${peakX}" y1="${peakY - 2}" x2="${peakX}" y2="${top - 22}" class="sa" stroke-width="1"/>
  <text x="${peakX - 6}" y="${top - 26}" font-size="11" text-anchor="end" font-weight="600" class="fa">peak ${peak.c} · ${fmt(peak.d)}</text>
  <path d="M${x0} ${by}v6h${x1 - x0}v-6" fill="none" class="sa" stroke-width="1.5"/>
  <text x="${(x0 + x1) / 2}" y="${by + 22}" font-size="12" text-anchor="middle" font-weight="700" class="fa">Sprint ${sprint.sprint}: ${sprint.completed} pts · ${Math.round((sprint.completed / sprint.forecast) * 100)}% of forecast</text>
</g>
<text x="${W - 140}" y="${H - 12.5}" font-size="10" text-anchor="end" class="mute">less</text>${legend}<text x="${W - 40}" y="${H - 12.5}" font-size="10" class="mute">more</text>
</svg>`;
}

// ---------- sprint.svg : burnup of the mega sprint ----------
function sprintSvg() {
  const days = sprint.completedDaily.length;
  const start = parse(sprint.start);
  const dates = Array.from({ length: days }, (_, i) => new Date(start.getTime() + i * DAY));
  const sum = sprint.completedDaily.reduce((a, b) => a + b, 0);
  if (sum !== sprint.completed) throw new Error(`completedDaily sums to ${sum}, expected ${sprint.completed}`);
  const cum = sprint.completedDaily.reduce((a, v, i) => (a.push((a[i - 1] || 0) + v), a), []);
  const working = dates.map((d) => !sprint.nonWorking.includes(iso(d)));
  const wDays = working.filter(Boolean).length;
  let g = 0;
  const guide = working.map((w) => (g += w ? sprint.forecast / wDays : 0));

  const W = 900, H = 430, L = 64, R = 180, T = 70, B = 360;
  const yMax = Math.ceil((sprint.totalEffort * 1.05) / 100) * 100;
  const colW = (W - L - R) / days;
  const xc = (i) => L + colW * (i + 0.5);
  const xe = (i) => L + colW * (i + 1);
  const y = (v) => B - (v / yMax) * (B - T);
  const stepPath = (arr) => `M${L} ${y(0)}` + arr.map((v, i) => `H${xe(i) - colW * 0.5}V${y(v)}`).join("") + `H${xe(days - 1)}`;

  let grid = "", wk = "", bars = "", labels = "", heat = "";
  for (let v = 0; v <= yMax; v += 200)
    grid += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="sr" stroke-width=".6"/><text x="${L - 10}" y="${y(v) + 4}" font-size="10" text-anchor="end" class="mute mono">${v}</text>`;
  dates.forEach((d, i) => {
    if (!working[i]) wk += `<rect x="${L + colW * i}" y="${T}" width="${colW}" height="${B - T}" class="fw"/>`;
    const v = sprint.completedDaily[i], bh = (v / yMax) * (B - T);
    if (v) bars += `<rect x="${xc(i) - colW * 0.3}" y="${B - bh}" width="${colW * 0.6}" height="${bh}" rx="2" class="l2" opacity=".75" style="transform-origin:0 ${B}px;animation:rise .5s ${(0.25 + i * 0.07).toFixed(2)}s both"/>`;
    labels += `<text x="${xc(i)}" y="${B + 16}" font-size="10" text-anchor="middle" class="mute">${d.getUTCDate()}</text>`;
    const c = contrib.days[iso(d)] || 0;
    heat += `<rect x="${xc(i) - 7}" y="${B + 40}" width="14" height="14" rx="2.5" class="l${level(c)}"><title>${c} GitHub contributions on ${fmt(d)}</title></rect>`;
  });
  const last = xe(days - 1);
  const pct = Math.round((sprint.completed / sprint.forecast) * 100);
  const big = sprint.completedDaily.indexOf(Math.max(...sprint.completedDaily.slice(1)));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H + 20}" width="${W}" height="${H + 20}" role="img" aria-labelledby="t d">
<title id="t">Sprint ${sprint.sprint} burnup — ${sprint.completed} points against a ${sprint.forecast}-point forecast</title>
<desc id="d">${sprint.board} sprint ${sprint.sprint}, ${fmt(start)} to ${fmt(dates[days - 1])}. Forecast ${sprint.forecast} points; ${sprint.completed} completed (${pct}%). Scope grew to ${sprint.totalEffort} points during the sprint.</desc>
<style>${theme}</style>
<text x="${L}" y="30" font-size="20" font-weight="700">Sprint ${sprint.sprint} <tspan font-weight="400" class="mute">· ${fmt(start)} – ${fmt(dates[days - 1])} ${start.getUTCFullYear()} · one engineer + agent loop</tspan></text>
<text x="${L}" y="50" font-size="12" class="mute">Daily completed points (bars), cumulative completed, scope, and the locked forecast.</text>
${wk}${grid}${bars}
<path d="${stepPath(guide)}" fill="none" class="sm" stroke-width="1.5" stroke-dasharray="3 4" style="animation:in .4s .2s both"/>
<path d="${stepPath(sprint.totalEffortCumulative)}" fill="none" class="ss" stroke-width="1.2" style="animation:in .4s .4s both"/>
<path d="${stepPath(cum)}" fill="none" class="sa" stroke-width="3" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" style="animation:draw 2.2s .3s ease-out forwards"/>
<g style="animation:in .5s 2.5s both">
  <circle cx="${last}" cy="${y(sprint.completed)}" r="4.5" class="fa"/>
  <text x="${last + 14}" y="${y(sprint.completed) + 30}" font-size="28" font-weight="800" class="fa">${sprint.completed}</text>
  <text x="${last + 14}" y="${y(sprint.completed) + 47}" font-size="11" class="mute">pts completed · ${pct}%</text>
  <text x="${last + 14}" y="${y(sprint.totalEffort) - 8}" font-size="11" class="mute">scope grew to ${sprint.totalEffort}</text>
  <text x="${last + 14}" y="${y(sprint.forecast) + 4}" font-size="11" class="mute">forecast ${sprint.forecast}</text>
  <text x="${xc(big)}" y="${B - (sprint.completedDaily[big] / yMax) * (B - T) - 8}" font-size="10" text-anchor="middle" font-weight="600" class="fa">${sprint.completedDaily[big]}</text>
</g>
${labels}
<text x="${L - 10}" y="${B + 51}" font-size="10" text-anchor="end" class="mute">GitHub</text>
${heat}
<text x="${L}" y="${H + 12}" font-size="10" class="mute">Shaded columns are weekends — the loop kept shipping. Points from ClickUp; contributions from GitHub, same days.</text>
</svg>`;
}

out("site/assets/inflection.svg", inflection());
out("site/assets/sprint.svg", sprintSvg());
