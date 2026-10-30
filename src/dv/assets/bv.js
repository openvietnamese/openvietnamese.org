/* ═══════════════════════════════════════════════════════════════
   Interactive lesson engine · Open Vietnamese
   Doing Vietnamese (Tiếng Việt Thực Hành) engine — forked 2026-10-29 from
   /uncviet/viet101/viet101-hw/assets/bv.js (itself a copy of the VIET 100 engine, 2026-10-26).
   Changes here do not affect VIET 100 / VIET 101 / VIET 203 / Basic Vietnamese.
   DV additions (backward compatible; see instruction/doing-vietnamese/bible/unit-template.md §6):
   BV_BOOK.theme + BV_BOOK.locale tokens · {{N|S}} variant chips · block tier/route + view filter ·
   BV_BOOK.draft badge · retrieve · tonelab · strand meter + first-try rate · record fourThreeTwo ·
   vocab deck: "series" (Leitner boxes).
   Pass 2 (2026-10-30, unit-template §3.2 / §6, D13, D23, D26):
   · BV_BOOK.askVoice → first-visit voice picker (NF/NM/SF/SM); drives the dialogue voices, the {{N|S}} dialect and the hero
     🗺 switch; hero 🎙 button changes it later; BV_BOOK.voiceKey shares the choice across books
   · listen: "first" | "along" | "yes" (content.md audio=…; `audio: "first"` is accepted and moved to `listen`) on dialogue,
     story and reading: "first" hides the text until the audio has played once to the end (the browser voice counts),
     "along" = listen-and-read first with line / sentence highlighting; "heard" persists in S.seen[id + '-heard']
   · fluency: dialogue relisten: true (timed re-listen at 1.0×) and story fluency: true (speed read, syllables/min, best
     kept) → S.fluency[id], shown in the report
   · tonelab items with set: [...] → minimal-pair mode (pick the word heard), scored like mc
   · reading blocks: "Done reading" mark → reading volume (stories + readings) in the report
   · session / part (prep: true → part A) chips + optional session filter in the view bar
   Pass 3 (2026-10-30, pilot unit b1u03; all optional, backward compatible):
   · BV_BOOK.showEn: true → English shown by default (DV: instructions are English in Book 1)
   · any block: lead / after (trusted html above / below the body), tasks: [blocks] (nested activities rendered after the body,
     scored and filtered with their parent; they inherit tier / route / session / part), nested: true (no chips)
   · dialogue: lines may be { panel: "…" } (a heading row, not spoken), ln.dir (stage direction, shown, not spoken), gloss
     [[word, gloss]], from: "<dialogue id>" + panels: [n…] (replays another dialogue's lines: no new recording),
     revealAfter: [item keys] (transcript hidden until those items are answered)
   · story: no body → a reader slot (readers: [ids] links; fluency → speed-read timer on the chosen reader); from: "<story id>"
     copies a body; no pairs → no match / order / fill (use tasks) and a "Done reading" mark; unlock chip
   · reading: gloss chips; a paragraph with its own recording plays as one file (recLines)
   · notice without opts: examples + the rule behind a "Show the rule" button (showRule: true shows it)
   · builder items: alts: [[tiles…]] (other accepted orders) · tonelab: from: [ids] + n | per (draw from earlier sets,
     missed items first, kept in S.draw), items with contrast: "vowel" · writing: model (html, opens after saving),
     checklist optional · rubric: levels[].n (score shown; a zero line is n: 0), criteria[].weight (total = Σ weight × n ÷ max n),
     shared: "<rubric id>" (no own rating) · infogap: holder "both" · drama: feelings / contexts optional; a pair may set
     senior: "A" | "B" and vars: { key: text } for {key} tokens
   · window.BV_ENGINE.markHeard(id): test hook (the autotest marks audio-first passages as heard)
   Recording manifest: _tools/dv/make-recording-list.js reads every src/dv/b<N>/data/u<NN>.js and writes the DV recorder's
   item list (src/dv/recorder/items.js) and per-unit audio maps (data/audio/uNN.js, window.BV_AUDIO). A BV_AUDIO value may be
   one URL or { NF, NM, SF, SM, guest: url }: the engine plays the learner's voice, else one of the same dialect, else any.
   A page loads, in order: an optional window.BV_BOOK (book settings,
   see BOOK below), its lesson data as window.BV_CHAPTER, then this file.
   Progress: localStorage BOOK.key (the book's index reads it too).
   Recordings: IndexedDB BOOK.recDb (never leave the device unless
   the learner downloads the lesson report).
   ═══════════════════════════════════════════════════════════════ */
(function () {
'use strict';

const C = window.BV_CHAPTER;
const app = document.getElementById('bv-app');
if (!C || !app) return;

/* Book settings — defaults are Basic Vietnamese */
const BOOK = Object.assign({
  key: 'basic-vn',
  prefsKey: 'basic-vn-prefs',
  recDb: 'basic-vn-rec',
  title: 'Basic Vietnamese',
  unit: { vi: 'Chương', en: 'Chapter' },
  home: { href: 'index.html', vi: 'Tất cả các chương', en: 'All chapters' },
  tabsSlot: null,         // id of an element to mount the tab bar in (e.g. a sidebar)
  filePrefix: 'basic-vietnamese-ch',
  credit: 'Open Vietnamese · openvietnamese.org — Basic Vietnamese, adapted from Tung Hoang (MSU Libraries, 2023), CC BY-NC 4.0.',
}, window.BV_BOOK || {});
/* DV: a book that sets only `key` gets its own prefs + recordings namespace (key-prefs, key-rec) */
if (window.BV_BOOK && window.BV_BOOK.key) {
  if (!window.BV_BOOK.prefsKey) BOOK.prefsKey = BOOK.key + '-prefs';
  if (!window.BV_BOOK.recDb) BOOK.recDb = BOOK.key + '-rec';
}
/* DV: theme tokens — BV_BOOK.theme = { brand, accent, logo, credit, navy, gold }
   brand + logo show in the hero; accent is the default --ch (a unit's C.color still wins);
   navy / gold recolour the hero, header bands and buttons; credit is the report credit unless BV_BOOK.credit is set */
const THEME = Object.assign({}, BOOK.theme || {});
if (THEME.credit && !(window.BV_BOOK && window.BV_BOOK.credit)) BOOK.credit = THEME.credit;

/* DV: deep string transform of the unit data, in place (object keys too, e.g. mc `why` keys) */
function walkData(x, f, k) {
  if (typeof x === 'string') return f(x, k);
  if (Array.isArray(x)) { for (let i = 0; i < x.length; i++) x[i] = walkData(x[i], f, k); return x; }
  if (x && typeof x === 'object' && Object.getPrototypeOf(x) === Object.prototype) {
    for (const kk of Object.keys(x)) {
      const v = walkData(x[kk], f, kk), nk = f(kk, '#key');
      if (nk !== kk) { delete x[kk]; x[nk] = v; } else x[kk] = v;
    }
  }
  return x;
}
/* DV: localisation tokens — BV_BOOK.locale = { campus: "…", city: "…", … }; every {campus} / {city} in the unit's text is replaced
   (only keys the locale defines, so drama tokens {A} {b} and cloze gaps {0} are untouched) */
const LOCALE = BOOK.locale || null;
if (LOCALE) walkData(C, s => s.replace(/\{(\w+)\}/g, (m, k) => (Object.prototype.hasOwnProperty.call(LOCALE, k) ? String(LOCALE[k]) : m)));

/* ═══════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════ */
const LS_KEY   = BOOK.key;
const LS_PREFS = BOOK.prefsKey;
const XP = { first: 10, retry: 5, record: 5, cando: 5, deck: 20, write: 15, recall: 2 };   // recall: DV retrieve items (practice, not mastery)
const LEVELS = [['Chưa', 'Not yet'], ['Đang tập', 'Getting there'], ['Tự tin', 'Confident']];
// Nation's Four Strands — optional tag on any block (strand: 'input' | 'output' | 'language' | 'fluency')
const STRANDS = {
  input:    { icon: '📥', vi: 'Tiếp nhận', en: 'Meaning-focused input' },
  output:   { icon: '📤', vi: 'Tạo lời', en: 'Meaning-focused output' },
  language: { icon: '🔍', vi: 'Ngôn ngữ', en: 'Language-focused learning' },
  fluency:  { icon: '⚡', vi: 'Trôi chảy', en: 'Fluency development' },
};

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = vhtml(v);   // DV: variant markers → chips
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : plain(v));
  }
  for (const kid of kids.flat(3)) {
    if (kid == null || kid === false) continue;
    if (typeof kid === 'string' && kid.indexOf('\uE000') >= 0) { el.append(vtext(kid)); continue; }   // DV: {{N|S}} chips
    el.append(kid.nodeType ? kid : document.createTextNode(kid));
  }
  return el;
}
// Bilingual label: Vietnamese first, English gloss (hidden by the EN switch)
function L(vi, en) {
  return [h('span', { lang: 'vi' }, vi), en ? h('span', { class: 'en' }, ' · ' + en) : null];
}
function T(x) { return x == null ? null : typeof x === 'string' ? L(x) : L(x.vi, x.en); }
function esc(s) {
  return String(plain(s)).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}
function shuffleMixed(a) {          // shuffled, but never left in the original order
  if (a.length < 2) return a.slice();
  let b;
  do { b = shuffle(a); } while (b.every((x, i) => x === a[i]));
  return b;
}
function wait(ms) { return new Promise(r => setTimeout(r, ms)); }
function fmtSec(s) { s = Math.round(s); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
function starStr(n) { return '⭐'.repeat(n) + '☆'.repeat(3 - n); }
function setFb(el, kind, text) { el.className = 'fb ' + kind; el.textContent = plain(text); }
function readJSON(k) { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } }
function writeJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }

/* ═══════════════════════════════════════
   PREFS + STATE
═══════════════════════════════════════ */
// VIET 101 homework: English hidden by default (learners tap EN to show it)
const prefs = Object.assign({ showEn: !!BOOK.showEn, slow: false, name: '', voiceDismissed: false }, readJSON(LS_PREFS));   // DV pass 3: BV_BOOK.showEn
function savePrefs() { writeJSON(LS_PREFS, prefs); }
/* DV pass 2: the learner's default voice (D13) — NF / NM / SF / SM. BV_BOOK.askVoice: true shows a picker on the first visit;
   BV_BOOK.voiceKey (optional, e.g. "dv-draft-voice") shares the choice across books, so a learner is asked once for the series. */
const VOICES4 = ['NF', 'NM', 'SF', 'SM'];
const VOICE_NAMES = { NF: ['Bắc · nữ', 'Northern · female'], NM: ['Bắc · nam', 'Northern · male'], SF: ['Nam · nữ', 'Southern · female'], SM: ['Nam · nam', 'Southern · male'] };
if (BOOK.voiceKey && !prefs.voice) {
  let v = null;
  try { v = localStorage.getItem(BOOK.voiceKey); } catch (e) { /* private mode */ }
  if (VOICES4.includes(v)) { prefs.voice = v; prefs.dialect = v[0]; prefs.voiceAsked = true; savePrefs(); }
}
/* DV pass 2: data normalisation — content.md header words map straight onto the data:
   audio: "first" | "along" | "yes" → listen (dialogue and story already use `audio` for file URLs); prep: true → part "A";
   a reading block without an id gets a positional one (its "read" mark and heard mark are stored under it) */
(C.tabs || []).forEach((t, ti) => (t.blocks || []).forEach((b, bi) => {
  if (['first', 'along', 'yes'].includes(b.audio)) { b.listen = b.audio; delete b.audio; }
  if (b.prep === true && !b.part) b.part = 'A';
  if (b.type === 'reading' && !b.id) b.id = 'rd' + (ti + 1) + '-' + (bi + 1);
}));
/* DV pass 3: replays and nested tasks.
   dialogue from: "h1-3" (+ panels: [2, 3]) copies another dialogue's lines (panel n = the lines after the n-th { panel } row);
   story from: "h2-5" copies a story body; tasks inherit the parent's tier / route / session / part and carry nested: true */
const ALLB = (C.tabs || []).flatMap(t => t.blocks || []);
const byId = id => ALLB.find(x => x.id === id);
ALLB.forEach(b => {
  if (b.type === 'dialogue' && b.from && !b.lines) {
    b.lines = [].concat(b.from).flatMap(src => {
      const s = byId(src);
      if (!s || !s.lines) return [];
      if (!b.panels) return JSON.parse(JSON.stringify(s.lines));
      const want = b.panels[src] || b.panels;
      let p = 0;
      return JSON.parse(JSON.stringify(s.lines.filter(l => { if (l.panel != null) p++; return want.includes(p); })));
    });
  }
  if (b.type === 'story' && b.from && !b.body) {
    const parts = [].concat(b.from).map(byId).filter(s => s && s.body);
    b.body = JSON.parse(JSON.stringify(parts.flatMap(s => s.body)));
  }
  (b.tasks || []).forEach(t => {
    t.nested = true;
    ['tier', 'route', 'session', 'part'].forEach(k => { if (b[k] != null && t[k] == null) t[k] = b[k]; });
    if (['first', 'along', 'yes'].includes(t.audio)) { t.listen = t.audio; delete t.audio; }
  });
});

/* ═══════════════════════════════════════
   DV: NORTHERN / SOUTHERN VARIANTS  {{bố|ba}}
   The dialect follows the learner's voice choice (NF/NM → Bắc, SF/SM → Nam), or the hero toggle,
   or BV_BOOK.dialect, default Bắc. Display text keeps both forms as a private-use marker
   (U+E000 n U+E001 s U+E002) and renders as a chip (tap → the other form); answer-bearing fields
   (opts, correct, tiles, bank, say, vocab words, match pairs …) are resolved to the dialect at load,
   and typed answers accept both forms.
═══════════════════════════════════════ */
const VV_SRC = /\{\{([^{}|]*)\|([^{}|]*)\}\}/g;
const VV_HAS = /\{\{[^{}|]*\|[^{}|]*\}\}/;
const VV_MARK = /\uE000([^\uE001\uE002]*)\uE001([^\uE002]*)\uE002/g;
const DIALECTS = { N: { vi: 'Bắc', en: 'Northern' }, S: { vi: 'Nam', en: 'Southern' } };
function dia() { const d = prefs.dialect || (prefs.voice ? String(prefs.voice)[0] : '') || BOOK.dialect || 'N'; return d === 'S' ? 'S' : 'N'; }
function pickForm(n, s, d) { return (d || dia()) === 'S' ? s : n; }
function plain(s) { return typeof s === 'string' && s.indexOf('\uE000') >= 0 ? s.replace(VV_MARK, (m, n, so) => pickForm(n, so)) : s; }
let HAS_VV = false;
const LOGIC_KEYS = new Set(['opts', 'correct', 'answers', 'tiles', 'extra', 'bank', 'answer', 'order', 'say', 'show', 'tone', 'word', 'set', 'story', 'voices', 'audio', 'src', '#key']);
(function variants() {
  const d0 = dia();
  const resolve = s => s.replace(VV_SRC, (m, n, so) => { HAS_VV = true; return pickForm(n, so, d0); });
  const mark = s => s.replace(VV_SRC, (m, n, so) => { HAS_VV = true; return '\uE000' + n + '\uE001' + so + '\uE002'; });
  const both = s => [...new Set([resolve(s), s.replace(VV_SRC, (m, n, so) => pickForm(n, so, d0 === 'S' ? 'N' : 'S'))])];
  (C.tabs || []).forEach(t => (t.blocks || []).flatMap(b => [b].concat(b.tasks || [])).forEach(b => {   // DV pass 3: nested tasks too
    if (b.type === 'type') (b.items || []).forEach(it => { if (it.answers) it.answers = it.answers.flatMap(a => (typeof a === 'string' && VV_HAS.test(a) ? both(a) : [a])); });
    if (b.type === 'vocab' && b.words) walkData(b.words, resolve);
    if (b.type === 'flashcards' && b.cards) walkData(b.cards, resolve);
    if ((b.type === 'match' || b.type === 'story') && b.pairs) walkData(b.pairs, resolve);
  }));
  walkData(C, (s, k) => (LOGIC_KEYS.has(k) ? resolve(s) : mark(s)));
})();
function setChip(el) {
  const d = dia(), n = el.dataset.n, s = el.dataset.s, other = d === 'S' ? 'N' : 'S';
  el.textContent = d === 'S' ? s : n;
  el.dataset.other = d === 'S' ? n : s;
  el.classList.toggle('vv-empty', !el.textContent);
  el.setAttribute('aria-label', el.textContent + ' — ' + DIALECTS[other].vi + ' · ' + DIALECTS[other].en + ': ' + (el.dataset.other || '—'));
  el.title = DIALECTS[other].vi + ' · ' + DIALECTS[other].en + ': ' + (el.dataset.other || '—');
}
function vchip(n, s) {
  if (n === s) return document.createTextNode(n);
  const el = document.createElement('span');
  el.className = 'vv';
  el.lang = 'vi';
  el.tabIndex = 0;
  el.setAttribute('role', 'button');
  el.setAttribute('aria-expanded', 'false');
  el.dataset.n = n;
  el.dataset.s = s;
  setChip(el);
  return el;
}
// text that may hold variant markers → fragment of text nodes + chips (never prints null)
function vtext(s) {
  s = String(s);
  const f = document.createDocumentFragment();
  let last = 0;
  s.replace(VV_MARK, (m, n, so, off) => { if (off > last) f.append(s.slice(last, off)); f.append(vchip(n, so)); last = off + m.length; return m; });
  if (last < s.length) f.append(s.slice(last));
  return f;
}
// trusted html that may hold markers: attribute values get the plain form, text gets chip markup
function vhtml(s) {
  if (typeof s !== 'string' || s.indexOf('\uE000') < 0) return s;
  s = s.replace(/(=\s*")([^"]*)"/g, (m, a, v) => a + plain(v) + '"').replace(/(=\s*')([^']*)'/g, (m, a, v) => a + plain(v) + "'");
  const e = x => x.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  return s.replace(VV_MARK, (m, n, so) => (n === so ? n : '<span class="vv" lang="vi" tabindex="0" role="button" aria-expanded="false" data-n="' + e(n) + '" data-s="' + e(so) + '">' + e(pickForm(n, so)) + '</span>'));
}
function applyDialect() {
  document.querySelectorAll('.vv').forEach(setChip);
  const t = document.getElementById('bvDialect');
  if (t) t.textContent = '🗺 ' + DIALECTS[dia()].vi;
}
/* DV pass 2: one place sets the voice — the first-visit picker, the hero 🎙 button and every dialogue's voice buttons.
   It also sets the dialect (NF/NM → Bắc, SF/SM → Nam), so the hero 🗺 switch follows it; dialogues listen for "bv-voice".
   Returns true when the dialect changed. */
function setVoice(v) {
  if (!VOICES4.includes(v)) return false;
  const before = dia();
  prefs.voice = v; prefs.dialect = v[0] === 'S' ? 'S' : 'N'; prefs.voiceAsked = true; savePrefs();
  if (BOOK.voiceKey) try { localStorage.setItem(BOOK.voiceKey, v); } catch (e) { /* private mode */ }
  applyDialect();
  const vb = document.getElementById('bvVoice');
  if (vb) vb.textContent = '🎙 ' + VOICE_NAMES[v][0];
  document.dispatchEvent(new CustomEvent('bv-voice', { detail: v }));
  return before !== dia();
}
function defaultVoice() { return VOICES4.includes(BOOK.voice) ? BOOK.voice : (BOOK.dialect === 'S' ? 'SF' : 'NF'); }
/* the picker: on the first visit (BV_BOOK.askVoice, prefs.voiceAsked unset) and from the hero 🎙 button.
   Answer-bearing fields were resolved to the dialect at load, so a choice that changes the dialect reloads the page
   (nothing is lost: progress is saved first). */
function voiceDialog(first) {
  const old = document.querySelector('.dv-voice-dlg');
  if (old) old.remove();
  const close = () => { dlg.remove(); document.removeEventListener('keydown', onKey); };
  const choose = v => { const changed = setVoice(v); close(); if (changed && HAS_VV) { save(); location.reload(); } };
  const onKey = e => { if (e.key === 'Escape') { e.preventDefault(); if (first) choose(prefs.voice || defaultVoice()); else close(); } };
  const cur = prefs.voice || '';
  const opts = VOICES4.map(v => h('button', { class: 'dv-voice-opt', type: 'button', 'data-voice': v, 'aria-pressed': String(cur === v), onclick: () => choose(v) },
    h('span', { class: 'dv-voice-ico', 'aria-hidden': 'true' }, v[0] === 'N' ? '🏔' : '🌴'),
    h('span', { lang: 'vi', class: 'dv-voice-vi' }, VOICE_NAMES[v][0]), h('span', { class: 'en' }, VOICE_NAMES[v][1])));
  const dv = defaultVoice();
  const dlg = h('div', { class: 'dv-voice-dlg', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'bvVoiceTitle' },
    h('div', { class: 'dv-voice-box' },
      h('h2', { id: 'bvVoiceTitle' }, ...L('Bạn muốn nghe giọng nào?', 'Which voice would you like to hear?')),
      h('p', { class: 'dv-voice-note' }, ...L('Giọng Bắc hay Nam cũng chọn cách viết các từ có hai dạng (bố / ba). Bạn có thể đổi lúc nào cũng được bằng nút 🎙 ở trên.',
        'Northern or Southern also picks the word forms that differ (bố / ba). You can change it any time with the 🎙 button at the top.')),
      h('div', { class: 'dv-voice-opts' }, opts),
      h('button', { class: 'ghost-btn dv-voice-skip', type: 'button', onclick: () => (first ? choose(prefs.voice || dv) : close()) },
        ...(first ? L('Bỏ qua (dùng ' + VOICE_NAMES[prefs.voice || dv][0] + ')', 'Skip — use ' + VOICE_NAMES[prefs.voice || dv][1]) : L('Đóng', 'Close')))));
  document.addEventListener('keydown', onKey);
  app.append(dlg);
  const f = dlg.querySelector('[aria-pressed="true"]') || opts[0];
  f.focus({ preventScroll: true });
  return dlg;
}
function toggleChip(el) { const on = !el.classList.contains('vv-open'); el.classList.toggle('vv-open', on); el.setAttribute('aria-expanded', String(on)); }
document.addEventListener('click', e => { const c = e.target.closest && e.target.closest('.vv'); if (c) { e.preventDefault(); e.stopPropagation(); toggleChip(c); } }, true);
document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('vv')) { e.preventDefault(); toggleChip(e.target); } });

function freshState() {
  return { v: 2, xp: 0, stars: 0, badge: false, mastery: 0, items: {}, cando: { before: {}, after: {} }, cards: {}, text: {}, seen: {} };
}
let S = readJSON(LS_KEY)[C.id];
if (!S || S.v !== 2) S = freshState();
S.rubric = S.rubric || {};
function save() { const all = readJSON(LS_KEY); all[C.id] = S; writeJSON(LS_KEY, all); }
/* DV pass 2: "heard" — a passage's audio played once to the end (file `ended`, or the browser voice finished every line).
   Stored per block in S.seen[id + '-heard']; listen: "first" passages unlock on it (D26). */
function isHeard(id) { return !!S.seen[id + '-heard']; }
function markHeard(id) {
  if (!id || S.seen[id + '-heard']) return;
  S.seen[id + '-heard'] = 1;
  save();
  document.dispatchEvent(new CustomEvent('bv-heard', { detail: id }));
}
function sylCount(s) { return String(plain(s)).split(/\s+/).filter(w => /[\p{L}\d]/u.test(w)).length; }   // syllables (Vietnamese: one per written word)
function onHeard(id, fn) { document.addEventListener('bv-heard', e => { if (e.detail === id) fn(); }); }
// the note above a listen: first / along passage; it turns green once the audio has been heard
function listenNote(b, firstVi, firstEn) {
  if (b.listen !== 'first' && b.listen !== 'along') return null;
  const txt = () => (isHeard(b.id) ? L('✓ Đã nghe hết một lần. Bây giờ bạn có thể đọc lại, không cần nghe.', '✓ Heard once to the end — you may re-read it silently now.')
    : b.listen === 'first' ? L('🔒 ' + (firstVi || 'Nghe hết một lần trước, rồi mới xem chữ.'), firstEn || 'Listen to the end once first; then the text unlocks.')
    : L('🎧 Lần đầu: vừa nghe vừa đọc theo.', 'First time: listen and read along — each sentence lights up as you hear it.'));
  const el = h('p', { class: 'listen-lock' + (isHeard(b.id) ? ' listen-done' : ''), 'aria-live': 'polite', 'data-listen': b.listen }, txt());
  onHeard(b.id, () => { el.replaceChildren(...txt()); el.classList.add('listen-done'); });
  return el;
}
let saveTimer = null;
function saveSoon() { clearTimeout(saveTimer); saveTimer = setTimeout(save, 400); }

/* Every point-earning item registers here while rendering, so totals
   and per-section mastery are computed from the chapter itself. */
const REG = new Map();   // key → { max, tab, kind }  kind: score | record | cando | deck | write
const HOOKS = {};        // key → fn, run when that item finishes
let currentTab = null;
let currentBlock = null;   // DV: the top-level block being rendered (tier / route view filter)
function reg(key, max, kind) { REG.set(key, { max, tab: currentTab, kind: kind || 'score', blk: currentBlock }); }
function result(key) { return S.items[key]; }
function finish(key, pts, tries) {
  if (S.items[key] && S.items[key].final) return;
  S.items[key] = { pts, tries, final: true };
  recompute();
  save();
  if (pts) toast('+' + pts + ' XP ⚡');
  if (HOOKS[key]) HOOKS[key]();
}
function totals() {
  let xp = 0, got = 0, max = 0, all = 0;
  for (const [k, r] of REG) {
    if (!shown(r.blk)) continue;   // DV: blocks hidden by the learner's view do not count
    const p = S.items[k] ? S.items[k].pts : 0;
    xp += p; all += r.max;
    if (r.kind === 'score') { got += p; max += r.max; }
  }
  return { xp, got, max, all };
}
function recompute() {
  const t = totals();
  const pct = t.max ? t.got / t.max : 0;
  S.xp = t.xp;
  S.mastery = Math.round(pct * 100);
  S.stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.4 ? 1 : 0;
  if (S.stars === 3) S.badge = true;
  updateHero();
}

/* ═══════════════════════════════════════
   SPEECH (browser voice)
═══════════════════════════════════════ */
const TTS = { ok: 'speechSynthesis' in window, voice: null, checked: false };
let voiceBannerEl = null;
let speechToken = 0;
function pickVoice() {
  if (!TTS.ok) return;
  const vs = speechSynthesis.getVoices();
  TTS.voice = vs.find(v => /^vi([-_]|$)/i.test(v.lang)) || null;
  if (vs.length) TTS.checked = true;
  updateVoiceBanner();
}
if (TTS.ok) {
  pickVoice();
  speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', pickVoice);
  setTimeout(() => { TTS.checked = true; updateVoiceBanner(); }, 1800);
}
/* VIET 101 homework: recorded files by text (window.BV_AUDIO from data/audio/lNN-hwN.js, generated);
   any 🔊 / flashcard / read-along plays the recording when one exists, else the browser voice */
function audioKey(s) { return String(plain(s)).normalize('NFC').toLowerCase().replace(/[.,!?;:…"“”()«»—–-]/g, ' ').replace(/\s+/g, ' ').trim(); }
const AUDIO = {};
Object.entries(window.BV_AUDIO || {}).forEach(([t, u]) => { AUDIO[audioKey(t)] = u; });
// DV pass 2: a value may be { NF, NM, SF, SM, guest } → the learner's voice, else a voice of the same dialect, else guest / any
function fileFor(text) {
  const f = text ? AUDIO[audioKey(text)] || null : null;
  if (!f || typeof f === 'string') return f;
  const v = prefs.voice, d = dia();
  return f[v] || f[d + 'F'] || f[d + 'M'] || f.guest || Object.values(f)[0] || null;
}
function speak(text, opts) {
  opts = opts || {};
  text = plain(text);
  const file = !opts.tts && fileFor(text);
  if (file) { if (!opts.keep) stopSpeech(); return playLine(file, text, opts.rate); }
  if (!TTS.ok || !text) return Promise.resolve();
  if (!opts.keep) { speechToken++; speechSynthesis.cancel(); }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'vi-VN';
  if (TTS.voice) u.voice = TTS.voice;
  u.rate = opts.rate || (prefs.slow ? 0.6 : 0.9);   // DV pass 2: opts.rate = fluency re-listen at 1.0×
  u.pitch = opts.pitch || 1;
  return new Promise(res => { u.onend = u.onerror = () => res(); speechSynthesis.speak(u); });
}
let lineAudio = null;
function stopSpeech() { speechToken++; if (TTS.ok) speechSynthesis.cancel(); if (lineAudio) { lineAudio.pause(); lineAudio = null; } }
/* play one recorded line (VIET 100); falls back to the browser voice if the file is missing */
function playLine(src, text, rate) {
  if (!src) return speak(text, { keep: true, rate });
  return new Promise(res => {
    const a = new Audio(src);
    lineAudio = a;
    a.playbackRate = rate || (prefs.slow ? 0.75 : 1);
    if (rate) a.dataset.rate = String(rate);
    let done = false;
    const end = () => { if (!done) { done = true; res(); } };
    const fallback = () => { if (done) return; done = true; speak(text, { keep: true, tts: true, rate }).then(res); };
    a.addEventListener('ended', end);
    a.addEventListener('pause', end);
    a.addEventListener('error', fallback);
    a.play().catch(fallback);
  });
}
// resolves true when every line was spoken, false when stopped part-way (DV pass 2: "played to the end")
async function speakAll(texts, onLine, o) {
  stopSpeech();
  const token = speechToken;
  for (let i = 0; i < texts.length; i++) {
    if (token !== speechToken) return false;
    if (onLine) onLine(i, true);
    await speak(texts[i].text || texts[i], { keep: true, pitch: texts[i].pitch, rate: o && o.rate });
    if (onLine) onLine(i, false);
    await wait(250);
  }
  return token === speechToken;
}
function sayBtn(text, label, hideText) {
  return h('button', { class: 'tts', type: 'button', 'data-say': text, 'aria-label': hideText ? 'Nghe · Listen' : 'Nghe: ' + text }, '🔊', label ? ' ' + label : null);
}
document.addEventListener('play', e => {
  if (e.target.tagName !== 'AUDIO') return;
  e.target.playbackRate = e.target.dataset.rate ? +e.target.dataset.rate : prefs.slow ? 0.75 : 1;   // DV pass 2: data-rate pins the speed (re-listen at 1.0×)
  stopSpeech();
  document.querySelectorAll('audio').forEach(a => { if (a !== e.target) a.pause(); });
}, true);
document.addEventListener('click', e => {
  const t = e.target.closest('[data-say]');
  if (t) { e.preventDefault(); speak(t.dataset.say); }
});

function voiceBanner() {
  const dismiss = h('button', { class: 'ghost-btn', type: 'button' }, ...L('Đã hiểu', 'Got it'));
  dismiss.addEventListener('click', () => { prefs.voiceDismissed = true; savePrefs(); voiceBannerEl.hidden = true; });
  voiceBannerEl = h('div', { class: 'voice-banner', role: 'status', hidden: true },
    h('div', { class: 'voice-banner-inner' },
      h('details', {},
        h('summary', {}, '🔇 ', ...L('Thiết bị này chưa có giọng đọc tiếng Việt.', 'No Vietnamese voice found — the 🔊 buttons may be silent or sound wrong. How to add one ▸')),
        h('ul', {},
          h('li', {}, 'Windows: Settings → Time & language → Speech → Add voices → Vietnamese'),
          h('li', {}, 'macOS: System Settings → Accessibility → Spoken Content → System voice → Manage Voices → Vietnamese (Linh)'),
          h('li', {}, 'iPhone / iPad: Settings → Accessibility → Spoken Content → Voices → Vietnamese'),
          h('li', {}, 'Android: Settings → Text-to-speech → Google → Install voice data → Vietnamese'),
          h('li', {}, 'Then reload this page. Chrome and Edge usually work best.'))),
      dismiss));
  return voiceBannerEl;
}
function updateVoiceBanner() {
  if (!voiceBannerEl) return;
  voiceBannerEl.hidden = prefs.voiceDismissed || !TTS.checked || (TTS.ok && !!TTS.voice);
}

/* ═══════════════════════════════════════
   VIETNAMESE TEXT: numbers, time, answer checking
═══════════════════════════════════════ */
const UNITS = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function numVi(n) {
  if (n < 10) return UNITS[n];
  if (n === 10) return 'mười';
  const t = Math.floor(n / 10), u = n % 10;
  const head = t === 1 ? 'mười' : UNITS[t] + ' mươi';
  if (u === 0) return head;
  const tail = u === 5 ? 'lăm' : u === 1 && t > 1 ? 'mốt' : u === 4 && t > 1 ? 'tư' : UNITS[u];
  return head + ' ' + tail;
}
// Canonical form for comparing typed answers: lowercase, no punctuation,
// digits spelled out (so "7 giờ" = "bảy giờ"), 7h30 / 7:30 = 7 giờ 30.
function norm(s) {
  s = String(s).normalize('NFC').toLowerCase().trim();
  s = s.replace(/(\d{1,2})\s*[:h]\s*(\d{1,2})/g, '$1 giờ $2').replace(/(\d{1,2})\s*h(?![\p{L}])/gu, '$1 giờ');
  s = s.replace(/[.,!?;:…"“”'’()\-–—]/g, ' ');
  s = s.replace(/\d+/g, d => (+d < 100 ? numVi(+d) : d));
  s = s.replace(/\s+/g, ' ').trim();
  return s.replace(/mươi mốt/g, 'mươi một').replace(/mươi tư/g, 'mươi bốn');
}
function bare(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').normalize('NFC'); }
function stripFrame(s) {
  return s.replace(/^(bây giờ là|giờ là|bây giờ|là)\s+/, '')
          .replace(/\s+rồi$/, '')
          .replace(/\s+(sáng|trưa|chiều|tối|đêm)$/, '').trim();
}
function checkTyped(value, answers, frame) {
  const prep = s => (frame ? stripFrame(norm(s)) : norm(s));
  const v = prep(value);
  for (const a of answers) if (prep(a) === v) return { kind: 'ok' };
  for (const a of answers) {
    const na = prep(a);
    if (bare(na) === bare(v)) {
      const aw = na.split(' '), vw = v.split(' ');
      return { kind: 'tone', words: vw.filter((w, i) => w !== aw[i]) };
    }
  }
  return { kind: 'bad' };
}
function period(H) { return H < 4 ? 'đêm' : H < 11 ? 'sáng' : H < 13 ? 'trưa' : H < 18 ? 'chiều' : H < 22 ? 'tối' : 'đêm'; }
function timeToVi(H, M) {
  const h12 = H % 12 || 12;
  const base = M === 0 ? h12 + ' giờ' : M === 30 ? h12 + ' giờ rưỡi' : h12 + ' giờ ' + M;
  return base + ' ' + period(H);
}
// All the accepted ways to say a clock time (12-hour)
function timeVariants(H, M) {
  const out = [];
  if (M === 0) out.push(H + ' giờ', H + ' giờ đúng');
  else {
    out.push(H + ' giờ ' + M, H + ' giờ ' + M + ' phút');
    if (M === 30) out.push(H + ' giờ rưỡi', H + ' rưỡi');
    if (M > 30) { const N = H === 12 ? 1 : H + 1; out.push(N + ' giờ kém ' + (60 - M), N + ' giờ kém ' + (60 - M) + ' phút'); }
  }
  return out;
}
function timeShow(H, M) {
  if (M === 30) return H + ' giờ rưỡi / ' + H + ' giờ 30';
  if (M > 30) { const N = H === 12 ? 1 : H + 1; return H + ' giờ ' + M + ' / ' + N + ' giờ kém ' + (60 - M); }
  return M === 0 ? H + ' giờ' : H + ' giờ ' + M;
}

/* ── Letter + tone-mark palette (for learners without a Vietnamese keyboard) ── */
const LETTERS = ['ă', 'â', 'đ', 'ê', 'ô', 'ơ', 'ư'];
const TONES = [['́', 'sắc', 'á'], ['̀', 'huyền', 'à'], ['̉', 'hỏi', 'ả'], ['̃', 'ngã', 'ã'], ['̣', 'nặng', 'ạ']];
const TONE_RE = /[̣̀́̃̉]/g;
// Put a tone mark on the right vowel of a syllable (modern placement rules)
function toneWord(word, mark) {
  const chars = [...word.normalize('NFD').replace(TONE_RE, '').normalize('NFC')];
  const lower = chars.map(c => c.toLowerCase());
  const V = 'aăâeêioôơuưy';
  let idx = lower.map((c, i) => (V.includes(c) ? i : -1)).filter(i => i >= 0);
  if (!idx.length) return word;
  if (lower[0] === 'q' && lower[1] === 'u') idx = idx.filter(i => i !== 1);
  if (lower[0] === 'g' && lower[1] === 'i' && idx.length > 1) idx = idx.filter(i => i !== 1);
  if (!idx.length) return word;
  const run = [idx[0]];
  for (let k = 1; k < idx.length && idx[k] === run[run.length - 1] + 1; k++) run.push(idx[k]);
  const special = run.filter(i => 'ăâêôơư'.includes(lower[i]));
  let target;
  if (special.length) target = special[special.length - 1];
  else if (run[run.length - 1] < lower.length - 1) target = run[run.length - 1];
  else if (run.length === 1) target = run[0];
  else if (run.length === 3) target = run[1];
  else target = ['oa', 'oe', 'uy'].includes(lower[run[0]] + lower[run[1]]) ? run[1] : run[0];
  chars[target] = (chars[target].normalize('NFD') + mark).normalize('NFC');
  return chars.join('');
}
function insertAtCursor(inp, text) {
  const s = inp.selectionStart != null ? inp.selectionStart : inp.value.length;
  const e = inp.selectionEnd != null ? inp.selectionEnd : s;
  inp.value = inp.value.slice(0, s) + text + inp.value.slice(e);
  inp.setSelectionRange(s + text.length, s + text.length);
  inp.focus();
  inp.dispatchEvent(new Event('input'));
}
function applyTone(inp, mark) {
  const pos = inp.selectionStart != null ? inp.selectionStart : inp.value.length;
  const m = inp.value.slice(0, pos).match(/\p{L}+$/u);
  if (!m) { inp.focus(); return; }
  const start = pos - m[0].length;
  const word = toneWord(m[0], mark);
  inp.value = inp.value.slice(0, start) + word + inp.value.slice(pos);
  inp.setSelectionRange(start + word.length, start + word.length);
  inp.focus();
  inp.dispatchEvent(new Event('input'));
}
function palBtn(label, aria, fn) {
  const b = h('button', { type: 'button', class: 'pal-btn', 'aria-label': aria, title: aria }, label);
  b.addEventListener('pointerdown', e => e.preventDefault());   // keep the cursor in the input
  b.addEventListener('mousedown', e => e.preventDefault());
  b.addEventListener('click', fn);
  return b;
}
function palette(inp) {
  const p = h('div', { class: 'palette', role: 'group', 'aria-label': 'Vietnamese letters and tone marks' });
  LETTERS.forEach(ch => p.append(palBtn(ch, 'Chèn ' + ch, () => insertAtCursor(inp, ch))));
  p.append(h('span', { class: 'pal-sep', 'aria-hidden': 'true' }));
  TONES.forEach(([mark, name, sample]) => p.append(palBtn(sample, 'Dấu ' + name, () => applyTone(inp, mark))));
  return p;
}
function paletteHelp() {
  return h('p', { class: 'palette-help' }, ...L(
    'Gõ chữ, rồi bấm nút dấu (á à ả ã ạ) để thêm dấu cho từ vừa gõ.',
    'No Vietnamese keyboard? Type the word, then tap a tone button (á à ả ã ạ) to mark the word you just typed.'));
}

/* ═══════════════════════════════════════
   RECORDINGS (IndexedDB, falls back to memory)
═══════════════════════════════════════ */
const DB = {
  mem: new Map(),
  open() {
    if (!this._p) this._p = new Promise(res => {
      try {
        const r = indexedDB.open(BOOK.recDb, 1);
        r.onupgradeneeded = () => r.result.createObjectStore('rec');
        r.onsuccess = () => res(r.result);
        r.onerror = () => res(null);
      } catch (e) { res(null); }
    });
    return this._p;
  },
  async tx(mode, fn) {
    const db = await this.open();
    if (!db) return null;
    return new Promise(res => {
      const t = db.transaction('rec', mode);
      const req = fn(t.objectStore('rec'));
      t.oncomplete = () => res(req && req.result);
      t.onerror = () => res(null);
    });
  },
  async put(k, v) { this.mem.set(k, v); await this.tx('readwrite', s => s.put(v, k)); },
  async get(k) { const v = await this.tx('readonly', s => s.get(k)); return v || this.mem.get(k) || null; },
  async del(k) { this.mem.delete(k); await this.tx('readwrite', s => s.delete(k)); },
  async keys() { const ks = await this.tx('readonly', s => s.getAllKeys()); return ks || [...this.mem.keys()]; },
};
function recKey(key) { return 'ch' + C.id + ':' + key; }
function recSupported() { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder); }
async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
  const mime = types.find(t => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) || '';
  const mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
  const chunks = [];
  const t0 = Date.now();
  mr.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
  mr.start();
  return {
    stop: () => new Promise(res => {
      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        res({ blob: new Blob(chunks, { type: mr.mimeType || mime || 'audio/webm' }), dur: (Date.now() - t0) / 1000 });
      };
      mr.stop();
    }),
  };
}
function blobToDataURL(blob) {
  return new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => res(''); r.readAsDataURL(blob); });
}

/* ═══════════════════════════════════════
   CARD WRAPPER
═══════════════════════════════════════ */
// where: 'home' | 'class' | 'both' · mins: estimated minutes
/* DV: tiers (core / extend / optional) and routes (hl / l2) — chips on every tagged block, and a learner view
   (“core only”, profile HL / L2 / both) that hides non-matching blocks and leaves them out of XP and mastery */
const TIERS = { core: { icon: '●', vi: 'Cốt lõi', en: 'Core' }, extend: { icon: '◐', vi: 'Nâng cao', en: 'Extend' }, optional: { icon: '○', vi: 'Tự chọn', en: 'Optional' } };
const ROUTES = { hl: { vi: 'HL · Gốc Việt', en: 'Heritage learners' }, l2: { vi: 'L2 · Ngoại ngữ', en: 'Learners of Vietnamese as a new language' } };
const BLOCK_EL = new Map();
/* DV pass 2: homework sessions (D23) — session: "h3" and part: "A" (before class; prep: true sets it) | "B" (this week)
   → a chip on the block, and an optional session filter in the view bar (blocks without a session always show) */
const PARTS = { A: { vi: 'Trước buổi học (A)', en: 'Before class' }, B: { vi: 'Trong tuần (B)', en: 'This week' } };
const SESSIONS = [...new Set((C.tabs || []).flatMap(t => t.blocks.map(b => b.session)).filter(Boolean))];
function viewOf() { return Object.assign({ core: false, route: 'both', session: '' }, prefs.view || {}); }
function shown(b) {
  if (!b) return true;
  const v = viewOf();
  if (v.core && b.tier && b.tier !== 'core') return false;
  if (v.route !== 'both' && b.route && b.route !== v.route) return false;
  if (v.session && SESSIONS.includes(v.session) && b.session && b.session !== v.session) return false;
  return true;
}
function viewChips(b) {
  return [b.tier && TIERS[b.tier] ? h('span', { class: 'tier-chip tier-' + b.tier, title: TIERS[b.tier].en }, TIERS[b.tier].icon + ' ' + TIERS[b.tier].vi) : null,
          b.route && ROUTES[b.route] ? h('span', { class: 'route-chip', title: ROUTES[b.route].en }, ROUTES[b.route].vi) : null,
          b.session ? h('span', { class: 'session-chip', title: 'Buổi ở nhà · Homework session ' + b.session }, '📅 ' + b.session) : null,
          b.part && PARTS[b.part] ? h('span', { class: 'part-chip part-' + b.part, 'data-part': b.part, title: PARTS[b.part].en }, PARTS[b.part].vi, h('span', { class: 'en' }, ' · ' + PARTS[b.part].en)) : null];
}
const HAS_VIEW = (C.tabs || []).some(t => t.blocks.some(b => b.tier || b.route)) || SESSIONS.length > 0;
const HAS_SERIES = (C.tabs || []).some(t => t.blocks.some(b => b.type === 'vocab' && b.deck === 'series'));
function applyView() {
  for (const [b, el] of BLOCK_EL) el.hidden = !shown(b);
  recompute();
  save();
}
function viewBar() {
  if (!HAS_VIEW) return null;
  const v = viewOf();
  const core = h('button', { class: 'cando-btn', type: 'button', 'aria-pressed': String(v.core) }, '● ', L('Chỉ phần cốt lõi', 'Core only'));
  core.addEventListener('click', () => {
    prefs.view = Object.assign(viewOf(), { core: !viewOf().core }); savePrefs();
    core.setAttribute('aria-pressed', String(prefs.view.core)); applyView();
  });
  const opts = [['both', 'Cả hai', 'Both'], ['hl', 'HL · Gốc Việt', 'Heritage'], ['l2', 'L2 · Ngoại ngữ', 'New to Vietnamese']];
  const rbtns = opts.map(([id, vi, en]) => {
    const bt = h('button', { class: 'cando-btn', type: 'button', role: 'radio', 'aria-checked': String(v.route === id), 'data-route': id }, L(vi, en));
    bt.addEventListener('click', () => {
      prefs.view = Object.assign(viewOf(), { route: id }); savePrefs();
      rbtns.forEach(x => x.setAttribute('aria-checked', String(x.dataset.route === id))); applyView();
    });
    return bt;
  });
  const sess = SESSIONS.length ? h('select', { class: 'dv-session', 'aria-label': 'Buổi ở nhà · Homework session' },
    h('option', { value: '' }, 'Mọi buổi · All sessions'), SESSIONS.map(x => h('option', { value: x }, '📅 ' + x))) : null;
  if (sess) {
    sess.value = SESSIONS.includes(v.session) ? v.session : '';
    sess.addEventListener('change', () => { prefs.view = Object.assign(viewOf(), { session: sess.value }); savePrefs(); applyView(); });
  }
  return h('div', { class: 'dv-view' },
    h('span', { class: 'drama-label' }, L('Chế độ xem', 'View')), core,
    h('div', { class: 'dv-route', role: 'radiogroup', 'aria-label': 'Hồ sơ người học · Learner profile' }, rbtns), sess);
}
function viewLabel() {
  const v = viewOf();
  return (v.core ? 'Cốt lõi · Core only' : 'Tất cả · All tiers') + ' · ' + (v.route === 'both' ? 'HL + L2' : ROUTES[v.route].vi)
    + (v.session && SESSIONS.includes(v.session) ? ' · 📅 ' + v.session : '');
}
const WHERE = { home: '🏠 Ở nhà · Home', class: '🏫 Trên lớp · In class', both: '🏠🏫 Ở nhà + trên lớp' };
function whereChips(b) {
  return [b.where ? h('span', { class: 'where-chip' }, WHERE[b.where] || b.where) : null,
          b.mins ? h('span', { class: 'where-chip' }, '⏱ ' + b.mins + '′') : null];
}
function card(b, body, xpNote) {
  const c = h('div', { class: 'card' + (b.ext ? ' card-ext' : '') });
  if (b.title) c.append(h('div', { class: 'card-header' },
    T(b.title),
    strandParts(b).map(([st, m]) => h('span', { class: 'strand-chip', title: STRANDS[st].en }, STRANDS[st].icon + ' ' + STRANDS[st].vi + (m && strandParts(b).length > 1 ? ' ' + m + '′' : ''))),   // DV: split strands (input:8,output:4)
    b.ext ? h('span', { class: 'ext-chip' }, 'Mở rộng · Extension') : null,
    b.nested ? null : viewChips(b),   // DV pass 3: nested tasks share their parent's chips
    b.nested ? null : whereChips(b),
    xpNote ? h('small', { class: 'xp-note' }, xpNote) : null));
  if (b.instr) c.append(h('p', { class: 'card-instr' }, T(b.instr)));
  if (b.lead) c.append(h('div', { class: 'card-body-pad prose dv-lead', html: b.lead }));   // DV pass 3
  c.append(body);
  if (b.after) c.append(h('div', { class: 'card-body-pad prose dv-after', html: b.after }));
  return c;
}
function list(b, makeItem, xpNote) {
  const body = h('div', { class: 'q-list' });
  b.items.forEach((it, i) => body.append(makeItem(it, b.id + '-' + (i + 1), i + 1)));
  return card(b, body, xpNote);
}
function pointsFor(tries) { return tries === 1 ? XP.first : tries === 2 ? XP.retry : 0; }

/* ═══════════════════════════════════════
   BLOCKS
═══════════════════════════════════════ */
const R = {};

/* html — trusted chapter content */
R.html = b => {
  const body = h('div', { class: 'card-body-pad prose', html: b.html || '' });
  return b.title ? card(b, body) : h('div', { class: 'card' }, body);
};

/* cando — "I can…" self-rating, before and after the chapter */
R.cando = b => {
  const phase = b.phase;
  const key = 'cando-' + phase;
  reg(key, XP.cando, 'cando');
  const rows = C.cando.map((c, i) => {
    const grp = h('div', { class: 'cando-opts', role: 'group', 'aria-label': c.en });
    LEVELS.forEach(([v, e], n) => {
      const bt = h('button', { class: 'cando-btn', type: 'button', 'aria-pressed': String(S.cando[phase][i] === n + 1) }, L(v, e));
      bt.addEventListener('click', () => {
        S.cando[phase][i] = n + 1;
        grp.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', String(j === n)));
        save();
        if (C.cando.every((_, k) => S.cando[phase][k])) finish(key, XP.cando, 1);
      });
      grp.append(bt);
    });
    const before = phase === 'after' && S.cando.before[i]
      ? h('div', { class: 'cando-before' }, ...L('Lúc bắt đầu: ' + LEVELS[S.cando.before[i] - 1][0], 'At the start: ' + LEVELS[S.cando.before[i] - 1][1]))
      : null;
    return h('div', { class: 'cando-row' },
      h('div', { class: 'cando-text' }, h('div', { lang: 'vi' }, c.vi), h('div', { class: 'en' }, c.en)), grp, before);
  });
  return card(b, h('div', { class: 'card-body-pad' }, rows), '+' + XP.cando + ' XP');
};

/* clocknow — warm-up: the learner's own time, said in Vietnamese */
R.clocknow = b => {
  const face = h('div', { class: 'clock-wrap' });
  const line = h('span', { lang: 'vi' });
  const btn = sayBtn('');
  function tick() {
    const d = new Date();
    face.innerHTML = clockSVG(d.getHours(), d.getMinutes());
    const txt = 'Bây giờ là ' + timeToVi(d.getHours(), d.getMinutes()) + '.';
    line.textContent = txt;
    btn.dataset.say = txt;
    btn.setAttribute('aria-label', 'Nghe: ' + txt);
  }
  tick();
  setInterval(tick, 20000);
  return card(b, h('div', { class: 'card-body-pad now-row' }, face,
    h('div', { style: 'flex:1;min-width:220px' },
      b.text ? h('p', { class: 'card-instr' }, T(b.text)) : null,
      h('div', { class: 'now-line' }, btn, line))));
};

/* mc — multiple choice with a second try and per-option explanations */
function mcItem(it, key, num) {
  reg(key, XP.first);
  const wrap = h('div', { class: 'q' });
  const q = h('div', { class: 'q-text' },
    num ? num + '. ' : null,
    it.say ? sayBtn(it.say, null, true) : null,
    it.qHtml ? h('span', { lang: 'vi', html: it.qHtml }) : it.q ? h('span', { lang: 'vi' }, it.q) : null,
    it.en ? h('span', { class: 'en q-en' }, '— ' + it.en) : null);
  const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
  const order = it.keepOrder ? it.opts : shuffle(it.opts);
  let tries = 0;
  const btns = order.map(o => {
    const bt = h('button', { class: 'opt', type: 'button', lang: 'vi' }, o);
    bt.addEventListener('click', () => choose(o, bt));
    return bt;
  });
  function lock() { btns.forEach(x => { x.disabled = true; if (x.textContent === it.correct) x.classList.add('correct'); }); }
  function choose(o, bt) {
    tries++;
    if (o === it.correct) {
      bt.classList.add('correct');
      lock();
      setFb(fb, 'ok', (tries === 1 ? '✅ Đúng! ' : '✅ Đúng rồi. ') + (it.explain || ''));
      finish(key, pointsFor(tries), tries);
      return;
    }
    bt.classList.add('wrong');
    bt.disabled = true;
    const why = (it.why && it.why[o]) || '';
    if (tries >= 2) {
      lock();
      setFb(fb, 'bad', '❌ ' + (why ? why + ' ' : '') + 'Đáp án · Answer: ' + it.correct + '. ' + (it.explain || ''));
      finish(key, 0, tries);
    } else {
      setFb(fb, 'bad', '❌ ' + (why || 'Chưa đúng.') + ' Thử lại! · Try again.');
    }
  }
  const done = result(key);
  if (done) { lock(); setFb(fb, done.pts ? 'ok' : 'info', (done.pts ? '✅ ' : 'Đáp án · Answer: ') + it.correct + (it.explain ? ' — ' + it.explain : '')); }
  wrap.append(q, h('div', { class: 'opt-row' }, btns), fb);
  return wrap;
}
R.mc = b => list(b, mcItem, '+10 XP');

/* tf — true / false, one try, always explained */
R.tf = b => list(b, (it, key, num) => {
  reg(key, XP.first);
  const wrap = h('div', { class: 'q' });
  const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
  const right = it.ans ? 'Đúng' : 'Sai';
  const btns = ['Đúng', 'Sai'].map(lbl => {
    const bt = h('button', { class: 'opt', type: 'button', lang: 'vi' }, lbl, h('span', { class: 'en' }, lbl === 'Đúng' ? ' · True' : ' · False'));
    bt.addEventListener('click', () => {
      const ok = lbl === right;
      lock(lbl);
      setFb(fb, ok ? 'ok' : 'bad', (ok ? '✅ Đúng! ' : '❌ Chưa đúng — ' + right + '. ') + (it.why || ''));
      finish(key, ok ? XP.first : 0, 1);
    });
    return bt;
  });
  function lock(chosen) {
    btns.forEach((x, i) => {
      x.disabled = true;
      const lbl = i === 0 ? 'Đúng' : 'Sai';
      if (lbl === right) x.classList.add('correct');
      else if (lbl === chosen) x.classList.add('wrong');
    });
  }
  if (result(key)) { lock(null); setFb(fb, result(key).pts ? 'ok' : 'info', right + '. ' + (it.why || '')); }
  wrap.append(h('div', { class: 'q-text' }, num + '. ', h('span', { lang: 'vi' }, it.q), it.en ? h('span', { class: 'en q-en' }, '— ' + it.en) : null),
    h('div', { class: 'opt-row' }, btns), fb);
  return wrap;
}, '+10 XP');

/* match — click a left item, then its partner; both sides shuffled */
R.match = b => {
  b.pairs.forEach((_, i) => reg(b.id + '-' + (i + 1), XP.first));
  const left = h('div', { class: 'match-col' }), right = h('div', { class: 'match-col' });
  const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
  const missed = new Set();
  let sel = null;
  function mk(side, i, text) {
    const el = h('button', { class: 'match-item', type: 'button', lang: 'vi', 'aria-pressed': 'false' }, text);
    if (result(b.id + '-' + (i + 1))) { el.classList.add('matched'); el.disabled = true; }
    el.addEventListener('click', () => pick(side, i, el));
    return el;
  }
  function pick(side, i, el) {
    if (!sel || sel.side === side) {
      if (sel) { sel.el.classList.remove('selected'); sel.el.setAttribute('aria-pressed', 'false'); }
      sel = { side, i, el };
      el.classList.add('selected');
      el.setAttribute('aria-pressed', 'true');
      return;
    }
    const a = sel;
    sel = null;
    a.el.classList.remove('selected');
    a.el.setAttribute('aria-pressed', 'false');
    if (a.i === i) {
      [a.el, el].forEach(x => { x.classList.add('matched'); x.disabled = true; });
      finish(b.id + '-' + (i + 1), missed.has(i) ? XP.retry : XP.first, missed.has(i) ? 2 : 1);
      setFb(fb, 'ok', '✅ ' + b.pairs[i].a + ' = ' + b.pairs[i].b);
    } else {
      missed.add(side === 'a' ? i : a.i);
      [a.el, el].forEach(x => { x.classList.add('wrong'); setTimeout(() => x.classList.remove('wrong'), 600); });
      setFb(fb, 'bad', '❌ Chưa khớp · Not a match — try again.');
    }
  }
  const lo = shuffle(b.pairs.map((_, i) => i));
  const ro = shuffleMixed(lo);
  lo.forEach(i => left.append(mk('a', i, b.pairs[i].a)));
  ro.forEach(i => right.append(mk('b', i, b.pairs[i].b)));
  return card(b, h('div', { class: 'card-body-pad' }, h('div', { class: 'match-grid' }, left, right), fb), '+10 XP');
};

/* builder — put word tiles in order */
R.builder = b => list(b, (it, key, num) => {
  reg(key, XP.first);
  const wrap = h('div', { class: 'q' + (it.vertical ? ' vertical' : '') });
  const line = h('div', { class: 'build-line', role: 'group', 'aria-label': 'Câu của bạn · Your sentence' });
  const bank = h('div', { class: 'build-bank', role: 'group', 'aria-label': 'Các từ · Word tiles' });
  const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
  const pool = it.tiles.concat(it.extra || []);
  let tries = 0;
  const tiles = shuffleMixed(pool.map((_, i) => i)).map(i => {
    const t = h('button', { class: 'tile', type: 'button', lang: 'vi' }, pool[i]);
    t.addEventListener('click', () => (t.parentNode === bank ? line : bank).append(t));
    return t;
  });
  bank.append(...tiles);
  const check = h('button', { class: 'check-btn', type: 'button' }, L('Kiểm tra', 'Check'));
  const reset = h('button', { class: 'ghost-btn', type: 'button' }, L('Làm lại', 'Reset'));
  reset.addEventListener('click', () => tiles.forEach(t => bank.append(t)));
  function lockB() { tiles.forEach(t => (t.disabled = true)); check.disabled = reset.disabled = true; }
  check.addEventListener('click', () => {
    const got = [...line.children].map(t => t.textContent);
    if (!got.length) return;
    tries++;
    const alt = (it.alts || []).findIndex(a => a.join(' ') === got.join(' '));   // DV pass 3: other accepted orders
    if (got.join(' ') === it.tiles.join(' ') || alt >= 0) {
      lockB();
      const said = alt >= 0 ? (it.altAnswers && it.altAnswers[alt]) || it.alts[alt].join(' ') : it.answer;
      setFb(fb, 'ok', '✅ ' + said + (alt >= 0 && it.altNote ? ' — ' + it.altNote : ''));
      speak(said);
      finish(key, pointsFor(tries), tries);
    } else if (tries >= 3) {
      lockB();
      setFb(fb, 'bad', 'Đáp án · Answer: ' + it.answer);
      finish(key, 0, tries);
    } else {
      setFb(fb, 'bad', '❌ ' + (it.hint || 'Chưa đúng thứ tự.') + ' Thử lại! · Try again.');
    }
  });
  if (result(key)) {
    it.tiles.forEach(txt => { const t = tiles.find(x => x.parentNode === bank && x.textContent === txt); if (t) line.append(t); });
    lockB();
    setFb(fb, result(key).pts ? 'ok' : 'info', '✅ ' + it.answer);
  }
  wrap.append(h('div', { class: 'q-text' }, num + '. ', h('span', { class: 'prompt-en' }, it.en)), line, bank, h('div', { class: 'btn-row' }, check, reset), fb);
  return wrap;
}, '+10 XP');

/* type / dictation — typed answers with tone-mark-aware feedback */
/* Telex → Vietnamese (VIET 100; ported from the VIET 101 Module 1 trainer): aa â, aw ă, ee ê, oo ô, ow ơ, uw ư, dd đ;
   a final s f r x j adds sắc huyền hỏi ngã nặng on the right vowel */
const TELEX_TONES = { a: 'áàảãạ', ă: 'ắằẳẵặ', â: 'ấầẩẫậ', e: 'éèẻẽẹ', ê: 'ếềểễệ', i: 'íìỉĩị', o: 'óòỏõọ', ô: 'ốồổỗộ', ơ: 'ớờởỡợ', u: 'úùủũụ', ư: 'ứừửữự', y: 'ýỳỷỹỵ' };
const TELEX_KEYS = { s: 0, f: 1, r: 2, x: 3, j: 4 };
function telexWord(raw) {
  let w = raw.toLowerCase();
  let tone = -1;
  if (w.length > 1 && w.slice(-1) in TELEX_KEYS) { tone = TELEX_KEYS[w.slice(-1)]; w = w.slice(0, -1); }
  w = w.replace(/dd/g, 'đ').replace(/aa/g, 'â').replace(/aw/g, 'ă').replace(/ee/g, 'ê').replace(/oo/g, 'ô').replace(/ow/g, 'ơ').replace(/uw/g, 'ư');
  if (tone < 0) return w;
  const ch = [...w];
  let vs = ch.map((c, i) => (TELEX_TONES[c] ? i : -1)).filter(i => i >= 0);
  if (ch[0] === 'q' && ch[1] === 'u') vs = vs.filter(i => i !== 1);
  if (ch[0] === 'g' && ch[1] === 'i' && vs.length > 1) vs = vs.filter(i => i !== 1);
  if (!vs.length) return w;
  const pri = ['ê', 'ơ', 'â', 'ă', 'ô', 'ư'].map(c => ch.indexOf(c)).find(i => i >= 0 && vs.includes(i));
  const t = pri !== undefined ? pri : vs.length === 1 ? vs[0] : vs[vs.length - 1] !== ch.length - 1 ? vs[vs.length - 1] : vs[vs.length - 2];
  ch[t] = TELEX_TONES[ch[t]][tone];
  return ch.join('');
}
function telexLine(s) { return s.trim().split(/\s+/).map(telexWord).join(' '); }
function typeItem(it, key, num) {
  reg(key, XP.first);
  const wrap = h('div', { class: 'q' });
  const input = h('input', { class: 'type-in', type: 'text', lang: 'vi', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': it.prompt || 'Viết điều bạn nghe · Type what you hear' });
  const check = h('button', { class: 'check-btn', type: 'button' }, L('Kiểm tra', 'Check'));
  const pal = palette(input);
  const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
  const show = it.show || it.answers[0];
  const preview = it.telex ? h('div', { class: 'telex-preview', lang: 'vi', 'aria-live': 'polite' }) : null;
  if (preview) input.addEventListener('input', () => { preview.textContent = input.value.trim() ? '→ ' + telexLine(input.value) : ''; });
  let tries = 0;
  function lockT() { input.disabled = check.disabled = true; pal.querySelectorAll('button').forEach(x => (x.disabled = true)); }
  function go() {
    if (!input.value.trim()) return;
    if (it.telex) input.value = telexLine(input.value);
    if (it.words && /\d/.test(input.value)) { setFb(fb, 'near', '✍️ Viết bằng chữ, không dùng số · Write the number in words, not digits.'); return; }
    tries++;
    const r = checkTyped(input.value, it.answers, it.frame);
    if (r.kind === 'ok') {
      lockT();
      setFb(fb, 'ok', '✅ Đúng! ' + show);
      finish(key, pointsFor(tries), tries);
    } else if (tries >= 3) {
      lockT();
      setFb(fb, 'bad', 'Đáp án · Answer: ' + show);
      finish(key, 0, tries);
    } else if (r.kind === 'tone') {
      setFb(fb, 'near', '🟡 Gần đúng! Right letters — check the tone marks (dấu) on: ' + r.words.join(', '));
    } else {
      setFb(fb, 'bad', '❌ Chưa đúng. Thử lại! · Try again.' + (it.hint ? ' 💡 ' + it.hint : ''));
    }
  }
  check.addEventListener('click', go);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  if (result(key)) { input.value = show; lockT(); setFb(fb, result(key).pts ? 'ok' : 'info', (result(key).pts ? '✅ ' : 'Đáp án · Answer: ') + show); }
  wrap.append(h('div', { class: 'q-text' },
      num ? num + '. ' : null,
      it.say ? sayBtn(it.say, 'Nghe', true) : null,
      it.prompt ? h('span', { class: 'prompt-en' }, it.prompt) : null),
    h('div', { class: 'type-row' }, input, check), ...(preview ? [preview] : []), pal, fb);   // append(null) would print "null"
  return wrap;
}
R.type = b => {
  const c = list(b, typeItem, '+10 XP');
  c.querySelector('.q-list').before(paletteHelp());
  return c;
};

/* flashcards — both directions, "know it / not yet", unknown cards come back */
function deckBody(key, cards) {
  let dir = 'vi', queue = [], cur = null, flipped = false;
  const info = h('div', { class: 'deck-info', 'aria-live': 'polite' });
  const face = h('button', { class: 'flashcard', type: 'button' });
  const yes = h('button', { class: 'know-btn yes', type: 'button', disabled: true }, '✓ ', L('Biết rồi', 'I know it'));
  const no = h('button', { class: 'know-btn no', type: 'button', disabled: true }, '↻ ', L('Chưa thuộc', 'Not yet'));
  const hear = h('button', { class: 'ghost-btn', type: 'button' }, '🔊 ', L('Nghe', 'Listen'));
  const dirBtn = h('button', { class: 'ghost-btn', type: 'button', 'aria-pressed': 'false' }, '⇄ ', L('Anh → Việt', 'English first'));
  const restart = h('button', { class: 'ghost-btn', type: 'button' }, '↺ ', L('Học lại cả bộ', 'Whole deck again'));
  function build(all) {
    const ids = cards.map((_, i) => i);
    queue = shuffle(all ? ids : ids.filter(i => !S.cards[cards[i].vi]));
    if (!queue.length) queue = shuffle(ids);
    next();
  }
  function next() { flipped = false; cur = queue.length ? queue[0] : null; yes.disabled = no.disabled = true; draw(); }
  function draw() {
    const known = cards.filter(c => S.cards[c.vi]).length;
    info.textContent = 'Đã thuộc ' + known + '/' + cards.length + ' · Known — còn ' + queue.length + ' thẻ trong lượt này · ' + queue.length + ' left this round';
    face.classList.toggle('flipped', flipped);
    if (cur == null) { face.innerHTML = '<div class="fc-done">🎉 Xong lượt này! · Round complete</div>'; return; }
    const c = cards[cur];
    if (!flipped) {
      face.innerHTML = (dir === 'vi' ? '<div class="fc-vi" lang="vi">' + esc(c.vi) + '</div>' : '<div class="fc-en">' + esc(c.en) + '</div>')
        + '<div class="fc-hint">Chạm để lật · Tap to flip</div>';
      face.setAttribute('aria-label', (dir === 'vi' ? c.vi : c.en) + ' — lật thẻ · flip card');
    } else {
      face.innerHTML = '<div class="fc-vi" lang="vi">' + esc(c.vi) + '</div><div class="fc-en">' + esc(c.en) + '</div>'
        + (c.ex ? '<div class="fc-ex" lang="vi">' + esc(c.ex) + '</div>' : '')
        + (c.exEn ? '<div class="fc-ex-en">' + esc(c.exEn) + '</div>' : '');
      face.setAttribute('aria-label', c.vi + ' = ' + c.en + (c.ex ? '. ' + c.ex : ''));
    }
  }
  face.addEventListener('click', () => {
    if (cur == null) return;
    flipped = !flipped;
    draw();
    if (flipped) { yes.disabled = no.disabled = false; speak(cards[cur].vi); }
  });
  hear.addEventListener('click', () => { if (cur != null) speak(cards[cur].vi); });
  function answered() {
    if (cards.every(c => S.cards[c.vi])) finish(key, XP.deck, 1);
    if (!queue.length) { cur = null; yes.disabled = no.disabled = true; draw(); } else next();
  }
  yes.addEventListener('click', () => { S.cards[cards[cur].vi] = 1; save(); queue.shift(); answered(); });
  no.addEventListener('click', () => { delete S.cards[cards[cur].vi]; save(); queue.push(queue.shift()); answered(); });
  dirBtn.addEventListener('click', () => { dir = dir === 'vi' ? 'en' : 'vi'; dirBtn.setAttribute('aria-pressed', String(dir === 'en')); flipped = false; draw(); });
  restart.addEventListener('click', () => build(true));
  build(false);
  return h('div', { class: 'deck' }, info, face,
    h('div', { class: 'btn-row center' }, no, yes),
    h('div', { class: 'btn-row center' }, hear, dirBtn, restart));
}
R.flashcards = b => {
  const key = b.id + '-deck';
  reg(key, XP.deck, 'deck');
  return card(b, h('div', { class: 'card-body-pad' }, deckBody(key, b.cards)), '+' + XP.deck + ' XP');
};

/* dialogue — listen first, gist question, then the transcript */
R.dialogue = b => {
  const spoken = b.lines.filter(l => l.vi != null);   // DV pass 3: { panel } rows are headings, not spoken
  const speakers = [...new Set(spoken.map(l => l.spk))];
  const rows = [], allRows = b.lines.map(ln => {
    if (ln.vi == null) return h('div', { class: 'dlg-panel' }, ln.panel != null ? T(ln.panel) : null);
    const r = h('div', { class: 'dlg-line' + (ln.thought ? ' dlg-thought' : '') },
      h('span', { class: 'spk' }, ln.spk, ln.thought ? h('span', { title: 'nghĩ · thinking (whisper track)' }, ' 💭') : null),   // DV pass 2: thought: true → whisper track
      h('div', { class: 'dlg-text' }, h('div', { lang: 'vi' }, ln.dir ? h('span', { class: 'dlg-dir' }, '(' + ln.dir + ') ') : null, ln.vi), ln.en ? h('div', { class: 'en dlg-en' }, ln.en) : null),
      sayBtn(ln.vi));
    rows.push(r);
    return r;
  });
  const txId = b.id + '-tx';
  const transcript = h('div', { class: 'transcript', id: txId }, allRows,
    b.gloss ? h('div', { class: 'story-gloss' }, b.gloss.map(([v, e]) => h('span', { class: 'gloss-chip' }, h('strong', { lang: 'vi' }, v), ' ' + e))) : null);
  const showBtn = h('button', { class: 'ghost-btn', type: 'button', 'aria-controls': txId }, '📄 ', L('Hiện lời thoại', 'Show transcript'));
  /* DV pass 2 (D26): listen: "first" keeps the transcript (and its button) hidden until the audio has played once to the end;
     listen: "along" shows it from the start, to read while listening (lines light up with the browser voice / per-line files) */
  const along = b.listen === 'along';
  const waitItems = () => !!b.revealAfter && !b.revealAfter.every(k => result(k));   // DV pass 3: e.g. T1 voice notes
  const gated = () => (b.listen === 'first' && !isHeard(b.id)) || waitItems();
  function reveal() { if (gated()) return; transcript.hidden = false; showBtn.hidden = true; S.seen[txId] = 1; save(); }
  (b.revealAfter || []).forEach(k => { const prev = HOOKS[k]; HOOKS[k] = () => { if (prev) prev(); if (!gated() && !S.seen[txId]) showBtn.hidden = along; if (!gated() && along) transcript.hidden = false; }; });
  transcript.hidden = !(S.seen[txId] || along) || gated();
  showBtn.hidden = !!S.seen[txId] || along || gated();
  showBtn.addEventListener('click', reveal);
  onHeard(b.id, () => { if (waitItems()) return; if (!S.seen[txId] && !along) showBtn.hidden = false; if (b.gist && result(b.id + '-gist')) reveal(); });
  const syl = sylCount(spoken.map(l => l.vi).join(' '));
  let playing = false;
  const play = h('button', { class: 'play-btn', type: 'button' }, '▶ ', L('Nghe cả bài', 'Play all'));
  async function ttsPlay() {
    if (playing) { stopSpeech(); return; }
    playing = true;
    play.classList.add('on');
    const ok = await speakAll(spoken.map(l => ({ text: l.vi, pitch: speakers.indexOf(l.spk) % 2 ? 1.25 : 0.95 })),
      (i, on) => rows[i].classList.toggle('speaking', on));
    rows.forEach(r => r.classList.remove('speaking'));
    playing = false;
    play.classList.remove('on');
    if (ok) markHeard(b.id);   // the browser voice counts as played (D26)
  }
  /* DV pass 2: fluency — relisten: true adds "re-listen at 1.0×": the slow switch is ignored, and the time from start to the
     end of the audio is logged in S.fluency[id] = { kind: 'listen', n, last, best (seconds), spm (syllables per minute) } */
  let rel = null;
  const relLabel = h('span', { class: 'rec-status', 'aria-live': 'polite' });
  const relText = () => L('Nghe lại 1.0× (bấm giờ)', 'Re-listen at 1.0× (timed)');
  const relShow = () => { const f = (S.fluency || {})[b.id]; relLabel.textContent = f ? '⏱ ' + fmtSec(f.last) + ' · ' + f.spm + ' âm tiết/phút · syllables/min · ' + f.n + ' lần · time(s)' : ''; };
  const relBtn = b.relisten ? h('button', { class: 'ghost-btn fl-relisten', type: 'button' }, '⏱ ', relText()) : null;
  function relDone(ok) {
    if (!rel) return;
    const secs = (Date.now() - rel.t0) / 1000;
    rel = null;
    relBtn.replaceChildren('⏱ ', relText());
    if (ok && secs >= 1) {
      const F = S.fluency = S.fluency || {}, prev = F[b.id] || { n: 0 };
      F[b.id] = { kind: 'listen', n: prev.n + 1, last: Math.round(secs), best: Math.round(Math.min(prev.best || Infinity, secs)), spm: Math.round(syl / (secs / 60)), ts: Date.now() };
      save();
    }
    relShow();
  }
  const relTts = () => speakAll(spoken.map(l => ({ text: l.vi, pitch: speakers.indexOf(l.spk) % 2 ? 1.25 : 0.95 })), (i, on) => rows[i].classList.toggle('speaking', on), { rate: 1 })
    .then(ok => { rows.forEach(r => r.classList.remove('speaking')); if (ok) markHeard(b.id); relDone(ok); });
  const VOICE = { NF: 'Bắc · nữ', NM: 'Bắc · nam', SF: 'Nam · nữ', SM: 'Nam · nam' };
  const pickSrc = () => (b.voices ? b.voices[prefs.voice] || b.voices[Object.keys(b.voices)[0]] : b.audio);
  const src0 = pickSrc();
  const au = src0 ? h('audio', { preload: 'none', src: src0 }) : null;
  const voiceNote = h('span', { class: 'rec-status', 'aria-live': 'polite' });
  let wantPlay = false;
  if (au) {
    play.replaceChildren('▶ ', ...L('Nghe bản ghi', 'Play recording'));
    au.addEventListener('play', () => play.classList.add('on'));
    ['pause', 'ended'].forEach(ev => au.addEventListener(ev, () => play.classList.remove('on')));
    au.addEventListener('ended', () => { markHeard(b.id); if (rel) relDone(true); });   // DV pass 2: played to the end
    au.addEventListener('error', () => {
      au.dataset.failed = '1';
      play.replaceChildren('▶ ', ...L('Nghe (giọng máy)', 'Play (browser voice)'));
      voiceNote.textContent = '🎙 Bản ghi này chưa có — đang dùng giọng máy · Recording not available yet — using the browser voice.';
      if (rel) { relTts(); return; }
      if (wantPlay) { wantPlay = false; ttsPlay(); }
    });
  }
  play.addEventListener('click', () => {
    if (rel) { rel = null; relShow(); relBtn.replaceChildren('⏱ ', relText()); }
    if (au && !au.dataset.failed) { delete au.dataset.rate; wantPlay = true; if (au.paused) au.play().catch(() => {}); else au.pause(); return; }
    ttsPlay();
  });
  if (relBtn) relBtn.addEventListener('click', () => {
    if (rel) { rel = null; stopSpeech(); if (au) au.pause(); relBtn.replaceChildren('⏱ ', relText()); relShow(); return; }
    stopSpeech();
    rel = { t0: Date.now() };
    relBtn.replaceChildren('⏹ ', ...L('Dừng', 'Stop'));
    if (au && !au.dataset.failed) { au.dataset.rate = '1'; au.playbackRate = 1; try { au.currentTime = 0; } catch (e) { /* not loaded yet */ } au.play().catch(() => {}); }
    else relTts();
  });
  relShow();
  const voicePicker = b.voices ? h('div', { class: 'voice-pick', role: 'radiogroup', 'aria-label': 'Giọng · Voice' },
    Object.keys(b.voices).map(v => {
      const bt = h('button', { class: 'cando-btn', type: 'button', role: 'radio', 'data-voice': v, 'aria-checked': String((prefs.voice || Object.keys(b.voices)[0]) === v) }, '🎙 ' + (VOICE[v] || v));
      bt.addEventListener('click', () => setVoice(v));   // DV: the transcript follows the voice (D13); every dialogue updates on "bv-voice"
      return bt;
    })) : null;
  if (voicePicker) document.addEventListener('bv-voice', () => {
    const want = b.voices[prefs.voice] ? prefs.voice : Object.keys(b.voices)[0];
    voicePicker.querySelectorAll('button').forEach(x => x.setAttribute('aria-checked', String(x.dataset.voice === want)));
    if (au.getAttribute('src') === pickSrc()) return;
    au.pause(); delete au.dataset.failed; au.src = pickSrc(); voiceNote.textContent = '';
    play.replaceChildren('▶ ', ...L('Nghe bản ghi', 'Play recording'));
  });
  const body = h('div', { class: 'dlg' },
    h('div', { class: 'listen-first' },
      h('p', { class: 'card-instr' }, b.gist ? L('Nghe trước và trả lời câu hỏi, rồi đọc lời thoại.', 'Listen first and answer the question, then read the transcript.') : L('Nghe trước, rồi xem chữ và nói theo.', 'Listen first, then show the words and repeat.')),
      play, au),
    relBtn ? h('div', { class: 'fl-row' }, relBtn, relLabel, h('span', { class: 'palette-help' }, ...L('Bài bạn đã biết: nghe ở tốc độ thường, không dừng.', 'A dialogue you know: listen at normal speed without stopping.'))) : null,
    voicePicker ? h('div', { class: 'voice-row' }, h('span', { class: 'drama-label' }, L('Chọn giọng', 'Choose a voice')), voicePicker, voiceNote) : null,
    b.audioCredit ? h('p', { class: 'audio-credit' }, '🎧 ', b.audioCredit) : null);
  if (b.gist) {
    const key = b.id + '-gist';
    body.append(h('div', { class: 'gist' }, mcItem(b.gist, key, null)));
    HOOKS[key] = reveal;
  }
  body.append(...[listenNote(b, 'Nghe hết bài một lần để mở lời thoại.', 'Listen to the whole dialogue once to unlock the transcript.'), showBtn, transcript].filter(Boolean));   // append(null) would print "null"
  return card(b, body);
};

/* reading — passage with listen + translation toggle.
   DV pass 2: sentences light up while they are read aloud; listen: "first" hides the passage until it has been heard to the end,
   listen: "along" asks for a listen-and-read first; a "Done reading" mark (S.seen[id + '-read']) counts the text in the
   report's reading volume. A reading block without an id gets a positional one at load. */
const sentences = p => String(p).split(/(?<=[.!?…])\s+(?=\S)/).filter(Boolean);
R.reading = b => {
  const trans = b.en ? h('div', { class: 'reading-en', hidden: true }, b.en.map(p => h('p', {}, p))) : null;
  const tBtn = trans ? h('button', { class: 'ghost-btn', type: 'button', 'aria-expanded': 'false' }, L('Xem bản dịch', 'Show translation')) : null;
  if (tBtn) tBtn.hidden = b.listen === 'first' && !isHeard(b.id);
  if (tBtn) tBtn.addEventListener('click', () => { trans.hidden = !trans.hidden; tBtn.setAttribute('aria-expanded', String(!trans.hidden)); });
  const sents = [];
  const passage = h('div', { class: 'reading-passage', lang: 'vi' }, b.vi.map((p, pi) => h('p', {}, sentences(p).map((x, i) => {
    const sp = h('span', { class: 'rd-sent' }, x);
    sents.push({ text: x, el: sp, p: pi });
    return i ? [' ', sp] : sp;
  }))));
  /* DV pass 3: a paragraph recorded as one file (recLines) plays as one unit, its sentences lit together */
  const units = [];
  b.vi.forEach((p, pi) => {
    const ss = sents.filter(x => x.p === pi);
    if (ss.length > 1 && fileFor(p)) units.push({ text: p, els: ss.map(x => x.el) });
    else ss.forEach(x => units.push({ text: x.text, els: [x.el] }));
  });
  const gated = () => b.listen === 'first' && !isHeard(b.id);
  passage.hidden = gated();
  const play = h('button', { class: 'play-btn', type: 'button' }, '▶ ', b.listen === 'first' && !isHeard(b.id) ? L('Nghe trước', 'Listen first') : L('Nghe', 'Listen'));
  play.addEventListener('click', async () => {
    const ok = await speakAll(units.map(x => x.text), (i, on) => { units[i].els.forEach(e => e.classList.toggle('speaking', on)); if (on && !passage.hidden) units[i].els[0].scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
    sents.forEach(x => x.el.classList.remove('speaking'));
    if (ok) markHeard(b.id);
  });
  const rk = b.id + '-read';
  const doneBtn = h('button', { class: 'ghost-btn rd-done', type: 'button', 'aria-pressed': String(!!S.seen[rk]), hidden: gated() }, '✓ ', L('Tôi đọc xong', 'Done reading'));
  doneBtn.addEventListener('click', () => { S.seen[rk] = 1; doneBtn.setAttribute('aria-pressed', 'true'); save(); toast('📖 ' + sylCount(b.vi.join(' ')) + ' từ · words'); });
  onHeard(b.id, () => { passage.hidden = false; doneBtn.hidden = false; if (tBtn) tBtn.hidden = false; play.replaceChildren('▶ ', ...L('Nghe', 'Listen')); });
  return card(b, h('div', { class: 'card-body-pad' },
    h('div', { class: 'btn-row', style: 'margin-top:0' }, play, tBtn),
    listenNote(b, 'Nghe hết bài một lần, rồi mới đọc.', 'Listen to the whole text once; then it appears.'),
    passage, trans,
    b.gloss ? h('div', { class: 'story-gloss' }, b.gloss.map(([v, e]) => h('span', { class: 'gloss-chip' }, h('strong', { lang: 'vi' }, v), ' ' + e))) : null,
    h('div', { class: 'btn-row' }, doneBtn)));
};

/* notice — examples first, learner spots the pattern, then the rule */
R.notice = b => {
  const key = b.id;
  const examples = h('table', { class: 'ex-table' }, (b.examples || []).map(e =>
    h('tr', {}, h('td', { lang: 'vi', html: e.vi }), h('td', { class: 'en' }, e.en || ''))));
  if (!b.opts) {   // DV pass 3: notice → rule, no question (the rule opens on a button, or at once with showRule)
    const rule = h('div', { class: 'prose', hidden: !b.showRule && !S.seen[key + '-rule'], html: b.reveal || '', style: 'margin-top:14px' });
    const rb = h('button', { class: 'ghost-btn', type: 'button', hidden: !rule.hidden }, '💡 ', L('Xem quy tắc', 'Show the rule'));
    rb.addEventListener('click', () => { rule.hidden = false; rb.hidden = true; S.seen[key + '-rule'] = 1; save(); });
    return card(b, h('div', { class: 'card-body-pad' },
      b.examples && b.examples.length ? [h('p', { class: 'card-instr' }, L('Đọc các ví dụ. Bạn thấy quy luật gì?', 'Read the examples. What pattern do you notice?')), examples] : null,
      b.reveal ? h('div', { class: 'btn-row' }, rb) : null, rule));
  }
  const rule = h('div', { class: 'prose', hidden: !result(key), html: b.reveal, style: 'margin-top:14px' });
  HOOKS[key] = () => { rule.hidden = false; };
  const q = mcItem({ q: b.q, en: b.qEn, opts: b.opts, correct: b.correct, why: b.why, explain: b.explain, keepOrder: true }, key, null);
  q.style.padding = '12px 0 0';
  q.style.borderBottom = 'none';
  return card(b, h('div', { class: 'card-body-pad' },
    h('p', { class: 'card-instr' }, L('Đọc các ví dụ. Bạn thấy quy luật gì?', 'Read the examples. What pattern do you notice?')),
    examples, q, rule), '+10 XP');
};

/* clock face */
function clockSVG(H, M) {
  const ha = ((H % 12) + M / 60) * 30, ma = M * 6;
  const f = n => n.toFixed(1);
  let ticks = '', nums = '';
  for (let i = 0; i < 60; i++) {
    const a = i * Math.PI / 30, r1 = i % 5 ? 84 : 77;
    ticks += '<line x1="' + f(100 + r1 * Math.sin(a)) + '" y1="' + f(100 - r1 * Math.cos(a)) + '" x2="' + f(100 + 89 * Math.sin(a)) + '" y2="' + f(100 - 89 * Math.cos(a))
      + '" stroke="currentColor" stroke-width="' + (i % 5 ? 1 : 3) + '" opacity="' + (i % 5 ? 0.35 : 0.8) + '"/>';
  }
  for (let n = 1; n <= 12; n++) {
    const a = n * Math.PI / 6;
    nums += '<text x="' + f(100 + 64 * Math.sin(a)) + '" y="' + f(106 - 64 * Math.cos(a)) + '" text-anchor="middle" font-family="Manrope, sans-serif" font-size="17" font-weight="700" fill="currentColor">' + n + '</text>';
  }
  return '<svg class="clock" viewBox="0 0 200 200" role="img" aria-label="' + H + ':' + String(M).padStart(2, '0') + '">'
    + '<circle cx="100" cy="100" r="94" fill="#fff" stroke="currentColor" stroke-width="5"/>' + ticks + nums
    + '<line x1="100" y1="100" x2="100" y2="54" stroke="currentColor" stroke-width="7" stroke-linecap="round" transform="rotate(' + f(ha) + ' 100 100)"/>'
    + '<line x1="100" y1="100" x2="100" y2="26" stroke="var(--ch)" stroke-width="4" stroke-linecap="round" transform="rotate(' + f(ma) + ' 100 100)"/>'
    + '<circle cx="100" cy="100" r="6" fill="currentColor"/></svg>';
}

/* clockread — look at the clock, type the time */
R.clockread = b => {
  const c = list(b, (it, key, num) => {
    const row = typeItem({ answers: timeVariants(it.h, it.m), show: timeShow(it.h, it.m), frame: true, hint: 'Giờ → phút. Có thể dùng “rưỡi” hoặc “kém”.' }, key, num);
    const face = h('div', { class: 'clock-wrap', html: clockSVG(it.h, it.m) });
    const body = h('div', { class: 'clock-body' }, ...row.childNodes);
    row.append(h('div', { class: 'clock-q' }, face, body));
    return row;
  }, '+10 XP');
  c.querySelector('.q-list').before(paletteHelp());
  return c;
};

/* clockset — hear a time, set the clock */
R.clockset = b => list(b, (it, key, num) => {
  reg(key, XP.first);
  let hh = 12, mm = 0, tries = 0;
  const face = h('div', { class: 'clock-wrap' });
  const readout = h('div', { class: 'clock-readout', 'aria-live': 'polite' });
  const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
  const textLine = h('span', { lang: 'vi', hidden: true }, it.say);
  const peek = h('button', { class: 'ghost-btn', type: 'button' }, L('Xem chữ', 'Show text'));
  peek.addEventListener('click', () => { textLine.hidden = false; peek.hidden = true; });
  function draw() { face.innerHTML = clockSVG(hh, mm); readout.textContent = hh + ':' + String(mm).padStart(2, '0'); }
  const step = (dh, dm) => () => {
    if (dh) hh = ((hh - 1 + dh + 12) % 12) + 1;
    if (dm) mm = (mm + dm + 60) % 60;
    draw();
  };
  const ctl = (lbl, aria, fn) => h('button', { class: 'ghost-btn', type: 'button', 'aria-label': aria, onclick: fn }, lbl);
  const controls = h('div', { class: 'clock-set-controls' },
    h('span', {}, 'Giờ'), ctl('−', 'Giờ trừ một · hour back', step(-1, 0)), ctl('+', 'Giờ thêm một · hour forward', step(1, 0)), h('span'),
    h('span', {}, 'Phút'), ctl('−5', 'Phút trừ năm · minus 5 minutes', step(0, -5)), ctl('+5', 'Phút thêm năm · plus 5 minutes', step(0, 5)), h('span'));
  const check = h('button', { class: 'check-btn', type: 'button' }, L('Kiểm tra', 'Check'));
  function lockS() { controls.querySelectorAll('button').forEach(x => (x.disabled = true)); check.disabled = true; }
  check.addEventListener('click', () => {
    tries++;
    if (hh === it.h && mm === it.m) {
      lockS();
      setFb(fb, 'ok', '✅ Đúng! ' + it.say);
      finish(key, pointsFor(tries), tries);
    } else if (tries >= 3) {
      hh = it.h; mm = it.m; draw(); lockS();
      setFb(fb, 'bad', 'Đáp án · Answer: ' + it.h + ':' + String(it.m).padStart(2, '0') + ' — ' + it.say);
      finish(key, 0, tries);
    } else {
      setFb(fb, 'bad', '❌ Chưa đúng. Nghe lại nhé! · Listen again.');
    }
  });
  if (result(key)) { hh = it.h; mm = it.m; lockS(); textLine.hidden = false; peek.hidden = true; setFb(fb, 'ok', '✅ ' + it.say); }
  draw();
  return h('div', { class: 'q' }, h('div', { class: 'clock-q' }, face,
    h('div', { class: 'clock-body' },
      h('div', { class: 'q-text' }, num + '. ', sayBtn(it.say, 'Nghe', true), peek, textLine),
      readout, controls, h('div', { class: 'btn-row' }, check), fb)));
}, '+10 XP');

/* record — speak and keep the recording for the chapter report */
R.record = b => {
  const body = h('div', { class: 'q-list' });
  if (!recSupported()) body.append(h('p', { class: 'fb bad', style: 'margin:14px 18px' }, 'Trình duyệt này không ghi âm được · Recording is not supported in this browser.'));
  b.prompts.forEach((p, i) => {
    const key = b.id + '-' + (i + 1);
    if (b.fourThreeTwo) { body.append(fttItem(p, key, i + 1, b)); return; }   // DV: 4/3/2 fluency recorder
    reg(key, XP.record, 'record');
    body.append(recItem(p, key, i + 1, b));
  });
  return card(b, body, '+' + XP.record + ' XP' + (b.fourThreeTwo ? ' × 3' : ''));
};
/* DV: 4/3/2 — the same talk three times with shrinking time limits (fluency strand).
   fourThreeTwo: true → 4′ / 3′ / 2′ · a number → those limits scaled (0.5 → 2′ / 1′30 / 1′) · an array → limits in seconds.
   Take 1 keeps the prompt’s normal key (id-N); takes 2 and 3 are id-N-t2, id-N-t3. */
function fttLimits(b) {
  const f = b.fourThreeTwo;
  if (Array.isArray(f)) return f.slice(0, 3);
  const k = typeof f === 'number' && f > 0 ? f : 1;
  return [240, 180, 120].map(x => Math.round(x * k));
}
const takeKey = (key, t) => (t ? key + '-t' + (t + 1) : key);
function fttItem(p, key, num, b) {
  const takes = fttLimits(b).map((lim, t) => {
    const k = takeKey(key, t);
    reg(k, XP.record, 'record');
    return recItem({ vi: 'Lần ' + (t + 1) + ' · ' + fmtSec(lim), en: 'Take ' + (t + 1) + ' — stop at ' + fmtSec(lim), model: false, ask: false, maxSec: lim, countdown: true,
      saveAs: () => plain(p.vi) + ' · Lần ' + (t + 1) + ' (' + fmtSec(lim) + ')' }, k, '⏱', b);
  });
  return h('div', { class: 'q ftt' },
    h('div', { class: 'q-text' }, num + '. ', p.model === false && !isAsk(p) ? null : sayBtn(p.vi), h('span', { lang: 'vi' }, p.vi), p.en ? h('span', { class: 'en q-en' }, '— ' + p.en) : null),
    h('p', { class: 'palette-help' }, ...L('Nói về cùng một chủ đề ba lần, mỗi lần ít thời gian hơn. Lần sau nói nhanh hơn, trôi chảy hơn.', 'Give the same talk three times, each with less time. Each take, aim to say it all faster and more smoothly.')),
    h('div', { class: 'ftt-takes' }, takes));
}
// free-answer prompt that is a question: 🔊 plays the question (to answer), not a model to copy
const isAsk = p => p.ask !== false && /\?\s*$/.test(p.vi);
function recItem(p, key, num, b) {
  const recBtn = h('button', { class: 'rec-btn', type: 'button', disabled: !recSupported() }, '● ', L('Ghi âm', 'Record'));
  const playBtn = h('button', { class: 'ghost-btn', type: 'button', hidden: true }, '▶ ', L('Nghe lại', 'Play mine'));
  const delBtn = h('button', { class: 'ghost-btn', type: 'button', hidden: true, 'aria-label': 'Xóa bản ghi · Delete recording' }, '🗑');
  const status = h('span', { class: 'rec-status', 'aria-live': 'polite' });
  let rec = null, url = null, timer = null;
  async function refresh() {
    const r = await DB.get(recKey(key));
    if (url) URL.revokeObjectURL(url);
    url = r ? URL.createObjectURL(r.blob) : null;
    playBtn.hidden = delBtn.hidden = !r;
    status.textContent = r ? '✔ ' + fmtSec(r.dur) : '';
    recBtn.replaceChildren('● ', ...L(r ? 'Ghi lại' : 'Ghi âm', r ? 'Re-record' : 'Record'));
  }
  recBtn.addEventListener('click', async () => {
    if (rec) {
      const r = rec;
      rec = null;
      clearInterval(timer);
      recBtn.classList.remove('on');
      const out = await r.stop();
      await DB.put(recKey(key), { blob: out.blob, dur: out.dur, ts: Date.now(), prompt: p.saveAs ? p.saveAs() : p.vi, block: (b.title && (b.title.vi || b.title)) || '' });
      finish(key, XP.record, 1);
      refresh();
      return;
    }
    stopSpeech();
    try { rec = await startRecording(); } catch (e) { status.textContent = '🎙 Không dùng được micro · Microphone blocked or unavailable.'; return; }
    recBtn.classList.add('on');
    recBtn.replaceChildren('■ ', ...L('Dừng', 'Stop'));
    const t0 = Date.now();
    timer = setInterval(() => {
      const s = (Date.now() - t0) / 1000;
      status.textContent = '● ' + fmtSec(s) + (p.countdown ? ' / ' + fmtSec(p.maxSec || 90) : '');
      if (s >= (p.maxSec || 90)) recBtn.click();
    }, 250);
  });
  playBtn.addEventListener('click', () => { if (url) { stopSpeech(); new Audio(url).play(); } });
  delBtn.addEventListener('click', async () => { await DB.del(recKey(key)); refresh(); });
  refresh();
  return h('div', { class: 'q' },
    h('div', { class: 'q-text' }, num + '. ', p.model === false && !isAsk(p) ? null : sayBtn(p.vi), h('span', { lang: 'vi' }, p.vi), p.en ? h('span', { class: 'en q-en' }, '— ' + p.en) : null),
    h('div', { class: 'btn-row', style: 'margin-top:0' }, recBtn, playBtn, delBtn, status));
}

/* VIET 101 homework: readaloud — the learner reads a story on this page aloud; the take goes into the report */
const storyOf = b => C.tabs.flatMap(t => t.blocks).find(x => x.type === 'story' && x.id === b.story);
const readPrompt = (b, st) => ({ vi: 'Đọc to: ' + st.titleVi, en: 'Read the whole story aloud — ' + st.titleEn, model: false, ask: false, maxSec: b.maxSec || 300 });   // a story title ending in “?” is not a question to answer
R.readaloud = b => {
  const st = storyOf(b), key = b.id + '-1';
  reg(key, XP.record, 'record');
  const lines = st.body.map(x => x.t === 'd'
    ? h('div', { class: 'dlg-line st-line' }, h('span', { class: 'spk' }, x.sp), h('div', { class: 'dlg-text' }, h('div', { lang: 'vi' }, x.s)))
    : h('div', { class: 'st-line st-narr' }, h('div', { lang: 'vi' }, x.s)));
  return card(b, h('div', { class: 'q-list' },
    h('div', { class: 'card-body-pad' }, h('div', { class: 'transcript story-text' }, lines)),
    recItem(readPrompt(b, st), key, 1, b)), '+' + XP.record + ' XP');
};

/* DV: retrieve — retrieval warm-up: try to recall, reveal, rate yourself. No pressure: a small XP per item, not in mastery.
   { type: 'retrieve', id, title, items: [{ q: string | {vi, en}, say?, answer, en?, hint? }] } */
const RECALL = [[3, 'Nhớ ngay', 'Got it'], [2, 'Nhớ một phần', 'Partly'], [1, 'Chưa nhớ', 'Not yet']];
R.retrieve = b => {
  S.recall = S.recall || {};
  const body = h('div', { class: 'q-list' });
  b.items.forEach((it, i) => {
    const key = b.id + '-' + (i + 1);
    reg(key, XP.recall, 'practice');
    const ans = h('div', { class: 'recall-ans', hidden: true },
      h('div', {}, sayBtn(it.answer), ' ', h('strong', { lang: 'vi' }, it.answer), it.en ? h('span', { class: 'en' }, ' — ' + it.en) : null),
      h('div', { class: 'recall-rate', role: 'group', 'aria-label': 'Bạn nhớ thế nào? · How well did you recall it?' },
        RECALL.map(([n, vi, en]) => {
          const bt = h('button', { class: 'cando-btn', type: 'button', 'data-rate': String(n), 'aria-pressed': String(S.recall[key] === n) }, L(vi, en));
          bt.addEventListener('click', () => {
            S.recall[key] = n;
            bt.parentNode.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === bt)));
            save();
            finish(key, XP.recall, 1);
          });
          return bt;
        })));
    const show = h('button', { class: 'ghost-btn', type: 'button' }, '👁 ', L('Xem đáp án', 'Reveal'));
    show.addEventListener('click', () => { ans.hidden = false; show.hidden = true; speak(it.answer); });
    if (S.recall[key]) { ans.hidden = false; show.hidden = true; }
    body.append(h('div', { class: 'q' },
      h('div', { class: 'q-text' }, (i + 1) + '. ', it.say ? sayBtn(it.say, null, true) : null, T(it.q)),
      it.hint ? h('p', { class: 'palette-help' }, '💡 ', it.hint) : null,
      h('p', { class: 'palette-help' }, ...L('Nghĩ hoặc nói to câu trả lời trước, rồi mới xem.', 'Think or say your answer first, then reveal.')),
      h('div', { class: 'btn-row', style: 'margin-top:0' }, show), ans));
  });
  return card(b, body, '+' + XP.recall + ' XP');
};

/* DV: tonelab — high-variability phonetic training (HVPT) for tones: hear a syllable or word, each replay in another voice,
   and pick its tone. Scored like mc (10 first try / 5 second / 0); an item missed on the first try comes back at the
   end of the list in another voice (unscored) until it is heard right (up to 3 times).
   { type: 'tonelab', id, title, tones?: ['ngang', …] (default all six), show?: true (show the word before answering),
     items: [{ word, tone, en?, voices?: { NF: url, NM: url, SF: url, SM: url } }] } — no files → browser voice, varied pitch
   DV pass 2: minimal pairs — an item with set: ['mười', 'mươi'] (words that differ only in tone, the heard word among them)
   asks "which word did you hear?" instead of "which tone?"; scored the same way. A block may mix both kinds. */
const TONE_NAMES = [['ngang', 'a'], ['huyền', 'à'], ['sắc', 'á'], ['hỏi', 'ả'], ['ngã', 'ã'], ['nặng', 'ạ']];
const VOICE_LABEL = { NF: 'Bắc · nữ', NM: 'Bắc · nam', SF: 'Nam · nữ', SM: 'Nam · nam' };
function toneOf(syl) {   // tone of one syllable from its marks (null if more than one syllable)
  if (/\s/.test(String(syl).trim())) return null;
  const m = String(syl).normalize('NFD').match(/[\u0300\u0301\u0303\u0309\u0323]/);
  return !m ? 'ngang' : { '\u0300': 'huyền', '\u0301': 'sắc', '\u0309': 'hỏi', '\u0303': 'ngã', '\u0323': 'nặng' }[m[0]];
}
/* DV pass 3: tonelab from: ['h1-6', …] draws its items from earlier tonelab blocks: n items (missed first), or per items from each.
   The draw is kept in S.draw[id] so the item list (and its progress keys) stays the same on every visit. */
function drawTones(b) {
  S.draw = S.draw || {};
  const pool = [].concat(b.from).flatMap(id => { const s = byId(id); return s && s.items ? s.items.map((it, i) => ({ id, i, it, miss: !!(result(id + '-' + (i + 1)) && (result(id + '-' + (i + 1)).tries > 1 || !result(id + '-' + (i + 1)).pts)) })) : []; });
  let pick = S.draw[b.id];
  if (!pick || !pick.every(([id, i]) => pool.some(x => x.id === id && x.i === i))) {
    const order = xs => shuffle(xs.filter(x => x.miss)).concat(shuffle(xs.filter(x => !x.miss)));
    pick = (b.per ? [].concat(b.from).flatMap(id => order(pool.filter(x => x.id === id)).slice(0, b.per)) : order(pool).slice(0, b.n || 16)).map(x => [x.id, x.i]);
    S.draw[b.id] = pick;
  }
  b.items = pick.map(([id, i]) => JSON.parse(JSON.stringify(pool.find(x => x.id === id && x.i === i).it)));
}
R.tonelab = b => {
  if (b.from && !b.items) drawTones(b);
  const names = TONE_NAMES.filter(([n]) => !b.tones || b.tones.includes(n));
  b.items.forEach(it => { if (!it.tone) it.tone = toneOf(it.word); });   // a one-syllable item may leave out `tone`
  const body = h('div', { class: 'q-list' });
  const again = new Map();   // item index → times it came back
  function player(it, n0) {
    let n = n0 || 0;
    const label = h('span', { class: 'rec-status' });
    const bt = h('button', { class: 'play-btn tl-play', type: 'button', 'aria-label': 'Nghe · Listen' }, '▶ ', L('Nghe', 'Listen'));
    bt.addEventListener('click', () => {
      stopSpeech();
      const gen = AUDIO[audioKey(it.word)], vmap = it.voices || (gen && typeof gen === 'object' ? gen : null);   // DV pass 2: generated per-voice files
      const vs = Object.keys(vmap || {});
      if (vs.length) { const v = vs[n % vs.length]; label.textContent = '🎙 ' + (VOICE_LABEL[v] || v); playLine(vmap[v], it.word); }
      else { const k = n % 4; label.textContent = '🎙 ' + (k + 1) + '/4'; speak(it.word, { tts: true, pitch: [1, 0.8, 1.3, 1.1][k] }); }
      n++;
    });
    return [bt, label];
  }
  function item(it, idx, key, num) {
    const scored = !!key;
    if (scored) reg(key, XP.first);
    let tries = 0;
    const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
    const pair = Array.isArray(it.set) && it.set.length > 1;
    const right = pair ? it.word : it.tone;
    const word = h('span', { class: 'tl-word', lang: 'vi', hidden: pair || !b.show }, it.word, it.en ? h('span', { class: 'en' }, ' — ' + it.en) : null);
    const btns = pair
      ? (b.keepOrder ? it.set : shuffle(it.set)).map(w => {
        const x = h('button', { class: 'opt pair-opt', type: 'button', lang: 'vi', 'data-word': w }, w);
        x.addEventListener('click', () => choose(w, x));
        return x;
      })
      : names.map(([nm, sample]) => {
        const x = h('button', { class: 'opt tone-opt', type: 'button', 'data-tone': nm }, h('span', { lang: 'vi' }, nm), h('span', { class: 'tone-sample', 'aria-hidden': 'true' }, ' ' + sample));
        x.addEventListener('click', () => choose(nm, x));
        return x;
      });
    const ansText = pair ? '“' + it.word + '”' + (it.tone ? ' (thanh ' + it.tone + ')' : '') : 'thanh ' + it.tone;
    function lock() { btns.forEach(x => { x.disabled = true; if ((pair ? x.dataset.word : x.dataset.tone) === right) x.classList.add('correct'); }); if (!pair) word.hidden = false; }
    function comeBack() {
      const k = again.get(idx) || 0;
      if (k >= 3) return;
      again.set(idx, k + 1);
      body.append(item(it, idx, null, '🔁'));
    }
    function choose(nm, x) {
      tries++;
      if (nm === right) {
        x.classList.add('correct'); lock();
        setFb(fb, 'ok', (tries === 1 ? '✅ Đúng! ' : '✅ Đúng rồi. ') + (pair ? ansText + (it.en ? ' — ' + it.en : '') + '.' : 'Thanh ' + it.tone + '.'));
        if (scored) finish(key, pointsFor(tries), tries);
        if (tries > 1) comeBack();
        return;
      }
      x.classList.add('wrong'); x.disabled = true;
      if (tries >= 2) {
        lock();
        setFb(fb, 'bad', '❌ Đáp án · Answer: ' + ansText + '. Nghe lại nhé · Listen again.');
        if (scored) finish(key, 0, tries);
        comeBack();
      } else setFb(fb, 'bad', '❌ Chưa đúng. Nghe lại rồi thử lần nữa · Listen again and try once more.');
    }
    if (scored && result(key)) { lock(); setFb(fb, result(key).pts ? 'ok' : 'info', (result(key).pts ? '✅ ' : 'Đáp án · Answer: ') + ansText); }
    return h('div', { class: 'q' + (scored ? '' : ' tl-again') },
      h('div', { class: 'q-text' }, num + '. ', player(it, scored ? 0 : 1 + (again.get(idx) || 0)), ' ', word),
      h('div', { class: 'opt-row' }, btns), fb);
  }
  b.items.forEach((it, i) => body.append(item(it, i, b.id + '-' + (i + 1), i + 1)));
  return card(b, h('div', {},
    b.instr ? null : b.items.some(it => it.contrast) ? h('p', { class: 'card-instr' }, L('Nghe — mỗi lần nghe là một giọng khác. Bạn nghe thấy từ nào?', 'Listen — every replay is a different voice. Which word do you hear?'))
      : b.items.every(it => Array.isArray(it.set)) ? h('p', { class: 'card-instr' }, L('Nghe — mỗi lần nghe là một giọng khác. Bạn nghe thấy từ nào? Các từ chỉ khác nhau ở thanh điệu.', 'Listen — every replay is a different voice. Which word do you hear? The words differ only in tone.'))
      : h('p', { class: 'card-instr' }, L('Nghe — mỗi lần nghe là một giọng khác. Chọn thanh điệu.', 'Listen — every replay is a different voice. Pick the tone.')),
    body), '+10 XP');
};

/* writing — short text, self-checklist, goes into the report */
R.writing = b => {
  const key = b.id;
  reg(key, XP.write, 'write');
  const ta = h('textarea', { class: 'write-in', lang: 'vi', rows: '7', 'aria-label': 'Bài viết của bạn · Your writing' });
  ta.value = S.text[key] || '';
  const count = h('span', { class: 'word-count' });
  const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
  const words = () => (ta.value.trim().match(/\S+/g) || []).length;
  const upd = () => { count.textContent = words() + ' từ · words (≥ ' + b.minWords + ')'; };
  ta.addEventListener('input', () => { upd(); S.text[key] = ta.value; saveSoon(); });
  upd();
  const checks = (b.checklist || []).map((c, i) => {
    const id = key + '-c' + i;
    const cb = h('input', { type: 'checkbox', id });
    cb.checked = !!S.seen[id];
    cb.addEventListener('change', () => { S.seen[id] = cb.checked ? 1 : 0; save(); });
    return h('label', { class: 'check-item', for: id }, cb, h('span', {}, L(c.vi, c.en)));
  });
  const saveBtn = h('button', { class: 'check-btn', type: 'button' }, L('Lưu bài', 'Save'));
  saveBtn.addEventListener('click', () => {
    S.text[key] = ta.value;
    save();
    if (words() >= b.minWords) { finish(key, XP.write, 1); setFb(fb, 'ok', '✅ Đã lưu · Saved — it will appear in your chapter report.'); if (model) model.hidden = false; }
    else setFb(fb, 'near', 'Viết thêm một chút · Please write at least ' + b.minWords + ' words.');
  });
  /* DV pass 3: a model answer that opens after the learner has saved */
  const model = b.model ? h('details', { class: 'dv-key', hidden: !result(key) }, h('summary', {}, ...L('Bài mẫu', 'Model answer')), h('div', { class: 'prose', html: b.model })) : null;
  return card(b, h('div', { class: 'card-body-pad' },
    b.prompt ? h('p', { class: 'card-instr' }, T(b.prompt)) : null,
    palette(ta), h('div', { style: 'margin-top:8px' }, ta), count,
    checks.length ? h('div', { class: 'checklist' }, h('strong', { class: 'prompt-en' }, L('Tự kiểm tra', 'Self-check')), checks) : null,
    h('div', { class: 'btn-row' }, saveBtn), fb, model), '+' + XP.write + ' XP');
};

/* report — scores, can-do, writing, recordings; print or download */
function sectionRows() {
  return C.tabs.map(t => {
    let got = 0, max = 0;
    for (const [k, r] of REG) { if (r.tab !== t.id || r.kind !== 'score' || !shown(r.blk)) continue; max += r.max; got += S.items[k] ? S.items[k].pts : 0; }
    return { t, got, max };
  }).filter(s => s.max);
}
/* DV: Four Strands meter — planned minutes per strand from block tags (strand + mins, or a split strand
   "input:8,output:4"), over the blocks in the learner's view; plus first-try success and reading volume */
function strandParts(b) {
  if (!b.strand) return [];
  if (b.strand.indexOf(':') < 0) return STRANDS[b.strand] ? [[b.strand, b.mins || 0]] : [];
  return b.strand.split(',').map(x => x.split(':')).filter(([st]) => STRANDS[st.trim()]).map(([st, m]) => [st.trim(), +m || 0]);
}
function strandStats() {
  const m = { input: 0, output: 0, language: 0, fluency: 0 };
  C.tabs.forEach(t => t.blocks.forEach(b => { if (shown(b)) strandParts(b).forEach(([st, n]) => { m[st] += n; }); }));
  const total = Object.values(m).reduce((a, x) => a + x, 0);
  let n = 0, first = 0;
  for (const [k, r] of REG) {
    if (r.kind !== 'score' || !shown(r.blk) || !S.items[k]) continue;
    n++;
    if (S.items[k].tries === 1 && S.items[k].pts > 0) first++;
  }
  const stories = C.tabs.flatMap(t => t.blocks).filter(b => b.type === 'story' && b.body && shown(b));   // DV pass 3: slots have no body
  const read = stories.filter(b => (b.pairs ? b.pairs.every((_, i) => result(b.id + '-pairs-' + (i + 1))) && result(b.id + '-order-1') && result(b.id + '-fill-1') : S.seen[b.id + '-read']));
  const wordsIn = b => plain(b.body.map(x => x.s).join(' ')).split(/\s+/).filter(Boolean).length;
  // DV pass 2: reading blocks count too (marked "Done reading"); volume = finished stories + read texts
  const readings = C.tabs.flatMap(t => t.blocks).filter(b => b.type === 'reading' && shown(b));
  const rdone = readings.filter(b => S.seen[b.id + '-read']);
  const rwords = rdone.reduce((a, b) => a + plain(b.vi.join(' ')).split(/\s+/).filter(Boolean).length, 0);
  const words = read.reduce((a, b) => a + wordsIn(b), 0);
  return { m, total, n, first, stories: stories.length, read: read.length, words, readings: readings.length, rdone: rdone.length, rwords, volume: words + rwords, fluency: fluencyRows() };
}
/* DV pass 2: fluency log rows — [block title, text] for every timed re-listen and speed read in the learner's view */
function fluencyRows() {
  const F = S.fluency || {};
  return C.tabs.flatMap(t => t.blocks).filter(b => F[b.id] && shown(b)).map(b => {
    const f = F[b.id], name = plain(b.titleVi || (b.title && (b.title.vi || b.title)) || b.id);
    return f.kind === 'read'
      ? ['📖 ' + name, 'Đọc nhanh · Speed read: kỷ lục · best ' + f.best + ' âm tiết/phút · syllables/min (lần cuối · last ' + f.last + ', ' + f.n + ' lần · time(s))']
      : ['🎧 ' + name, 'Nghe lại 1.0× · Re-listen: ' + fmtSec(f.last) + ' (nhanh nhất · best ' + fmtSec(f.best) + ', ' + f.n + ' lần · time(s)) · ' + f.spm + ' âm tiết/phút · syllables/min'];
  });
}
function strandBox() {
  const st = strandStats();
  const pct = (a, b) => (b ? Math.round(100 * a / b) : 0);
  return [
    st.total ? [h('h3', {}, L('Bốn mạch', 'Four Strands')),
      h('div', { class: 'strand-meter' }, Object.keys(STRANDS).map(k => h('div', { class: 'strand-row' },
        h('span', { class: 'strand-name' }, STRANDS[k].icon + ' ', L(STRANDS[k].vi, STRANDS[k].en)),
        h('span', { class: 'strand-track' }, h('span', { class: 'strand-fill strand-' + k, style: 'width:' + pct(st.m[k], st.total) + '%' })),
        h('span', { class: 'strand-val' }, st.m[k] + '′ · ' + pct(st.m[k], st.total) + '%')))),
      h('p', { class: 'report-note' }, ...L('Thời gian dự kiến theo các hoạt động trong bài (' + st.total + ' phút).', 'Planned minutes from this unit’s activities (' + st.total + ' min in your view).'))] : null,
    h('table', {},
      h('tr', {}, h('td', {}, L('Đúng ngay lần đầu', 'First-try success')), h('td', {}, st.n ? pct(st.first, st.n) + '% (' + st.first + ' / ' + st.n + ')' : '—')),
      st.stories ? h('tr', {}, h('td', {}, L('Truyện đã đọc xong', 'Stories finished')), h('td', {}, st.read + ' / ' + st.stories + ' · ' + st.words + ' từ · words')) : null,
      st.readings ? h('tr', {}, h('td', {}, L('Bài đọc đã đọc', 'Readings read')), h('td', {}, st.rdone + ' / ' + st.readings + ' · ' + st.rwords + ' từ · words')) : null,
      st.stories || st.readings ? h('tr', { class: 'rd-volume' }, h('td', {}, L('Lượng đọc', 'Reading volume')), h('td', {}, h('strong', {}, st.volume + ' từ · words'))) : null,
      st.fluency.map(([k, v]) => h('tr', { class: 'fl-log' }, h('td', {}, '⚡ ', k), h('td', {}, v))),
      HAS_SERIES ? (d => h('tr', {}, h('td', {}, L('Bộ thẻ ôn của cả sách', 'Series review deck')), h('td', {}, d.n + ' từ · words · ' + d.due + ' đến hạn · due · hộp · boxes ' + d.boxes.join(' / '))))(deckStats()) : null,
      HAS_VIEW ? h('tr', {}, h('td', {}, L('Chế độ xem', 'View')), h('td', {}, viewLabel())) : null)];
}
function strandHtml() {
  const st = strandStats();
  const pct = (a, b) => (b ? Math.round(100 * a / b) : 0);
  return (st.total ? '<h2>Bốn mạch · Four Strands</h2><table>' + Object.keys(STRANDS).map(k => '<tr><td>' + STRANDS[k].vi + ' · ' + STRANDS[k].en + '</td><td>' + st.m[k] + ' min</td><td>' + pct(st.m[k], st.total) + '%</td></tr>').join('') + '</table>' : '')
    + '<table><tr><td>Đúng ngay lần đầu · First-try success</td><td><strong>' + (st.n ? pct(st.first, st.n) + '% (' + st.first + ' / ' + st.n + ')' : '—') + '</strong></td></tr>'
    + (st.stories ? '<tr><td>Truyện đã đọc xong · Stories finished</td><td><strong>' + st.read + ' / ' + st.stories + ' · ' + st.words + ' words</strong></td></tr>' : '')
    + (st.readings ? '<tr><td>Bài đọc đã đọc · Readings read</td><td><strong>' + st.rdone + ' / ' + st.readings + ' · ' + st.rwords + ' words</strong></td></tr>' : '')
    + (st.stories || st.readings ? '<tr><td>Lượng đọc · Reading volume</td><td><strong>' + st.volume + ' words</strong></td></tr>' : '')
    + st.fluency.map(([k, v]) => '<tr><td>⚡ ' + esc(k) + '</td><td><strong>' + esc(v) + '</strong></td></tr>').join('')
    + '<tr><td>Chế độ xem · View</td><td>' + esc(viewLabel()) + '</td></tr></table>';
}
async function recordings() {
  const keys = (await DB.keys()).filter(k => String(k).startsWith('ch' + C.id + ':'));
  const out = [];
  for (const k of keys) { const r = await DB.get(k); if (r) out.push(Object.assign({ key: k }, r)); }
  return out.sort((a, b) => a.ts - b.ts);
}
/* VIET 101 homework: every recording the page asks for, in page order, with the learner's take (or null) */
async function recordingSlots() {
  const have = new Map((await recordings()).map(r => [r.key, r]));
  const out = [];
  C.tabs.forEach(t => t.blocks.forEach(bl => {
    if (bl.type === 'readaloud') out.push({ block: (bl.title && (bl.title.vi || bl.title)) || '', prompt: readPrompt(bl, storyOf(bl)).vi, rec: have.get(recKey(bl.id + '-1')) || null });
    if (bl.type !== 'record') return;
    bl.prompts.forEach((p, i) => {
      if (bl.fourThreeTwo) fttLimits(bl).forEach((lim, t) => out.push({ block: (bl.title && (bl.title.vi || bl.title)) || '', prompt: plain(p.vi) + ' · Lần ' + (t + 1) + ' (' + fmtSec(lim) + ')', rec: have.get(recKey(takeKey(bl.id + '-' + (i + 1), t))) || null }));
      else out.push({ block: (bl.title && (bl.title.vi || bl.title)) || '', prompt: p.vi, rec: have.get(recKey(bl.id + '-' + (i + 1))) || null });
    });
  }));
  return out;
}
/* VIET 101 homework: time on task + Quick Feedback (English only) — opt-in on the report block (timing: true, survey: true | { nps, open }) */
const REPORT = C.tabs.flatMap(t => t.blocks).find(b => b.type === 'report') || {};
const SURVEY = {
  nps: 'How likely are you to recommend this learning experience to a friend or future students?',
  open: 'What could I change to improve your experience?',
};
const surveyQs = () => Object.assign({}, SURVEY, REPORT.survey === true ? {} : REPORT.survey);
function fmtWhen(ts) { return ts ? new Date(ts).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) : '—'; }
function fmtDur(sec) { const m = Math.round(sec / 60); return m < 60 ? m + ' phút · min' : Math.floor(m / 60) + ' giờ ' + (m % 60) + ' phút · ' + Math.floor(m / 60) + ' h ' + (m % 60) + ' min'; }
function timeRows() {   // [label, value] pairs for the report and the download
  const t = S.time;
  return [['Bắt đầu · Started', fmtWhen(t.start)],
    ['Kết thúc · Finished', t.end ? fmtWhen(t.end) : 'khi bạn tải báo cáo · when you download the report'],
    ['Thời gian làm bài · Time on task', fmtDur(t.active)],
    ['Từ đầu đến cuối · Start to finish', fmtDur(((t.end || Date.now()) - t.start) / 1000)]];
}
/* survey: { title, note, sections: [{ title, intro, items: [{ id, type: 'scale' | 'short' | 'long', q, hint, min, max, low, high }] }] }
   replaces the Quick Feedback with an English exit ticket / reflection (answers in S.survey.answers, in the report and the download) */
const isReflect = () => !!(REPORT.survey && REPORT.survey.sections);
const words = t => ((t || '').trim().match(/\S+/g) || []).length;
function reflectBox() {
  const R = REPORT.survey, A = (S.survey = S.survey || {}).answers = S.survey.answers || {};
  const item = it => {
    const q = h('p', { class: 'survey-q', lang: 'en' }, h('strong', {}, it.q), it.hint ? h('span', { class: 'survey-hint' }, it.hint) : null);
    if (it.type === 'scale') {
      const lo = it.min == null ? 1 : it.min, hi = it.max || 5;
      const btns = [];
      for (let n = lo; n <= hi; n++) {
        const bt = h('button', { class: 'nps-btn', type: 'button', 'aria-pressed': String(A[it.id] === n) }, String(n));
        bt.addEventListener('click', () => { A[it.id] = n; save(); btns.forEach((x, i) => x.setAttribute('aria-pressed', String(i + lo === n))); });
        btns.push(bt);
      }
      return [q, h('div', { class: 'nps', role: 'group', 'aria-label': it.q, style: 'grid-template-columns:repeat(' + btns.length + ',minmax(0,1fr))' }, btns),
        h('div', { class: 'nps-ends', lang: 'en' }, h('span', {}, lo + ' · ' + (it.low || '')), h('span', {}, (it.high || '') + ' · ' + hi))];
    }
    const ta = h('textarea', { class: 'write-in', rows: it.type === 'long' ? '5' : '2', lang: 'en', 'aria-label': it.q });
    ta.value = A[it.id] || '';
    const count = it.type === 'long' ? h('span', { class: 'word-count' }) : null;
    const upd = () => { if (count) count.textContent = words(ta.value) + ' words'; };
    ta.addEventListener('input', () => { A[it.id] = ta.value; upd(); saveSoon(); });
    upd();
    return [q, ta, count];
  };
  return [h('h3', { lang: 'en' }, R.title || 'Reflection'), R.note ? h('p', { class: 'report-note', lang: 'en' }, R.note) : null,
    R.sections.map(sec => h('div', { class: 'reflect-sec', lang: 'en' }, h('h4', {}, sec.title), sec.intro ? h('p', { class: 'report-note' }, sec.intro) : null, sec.items.map(item)))];
}
function reflectHtml() {
  const R = REPORT.survey, A = (S.survey || {}).answers || {};
  return '<h2>' + esc(R.title || 'Reflection') + '</h2>' + R.sections.map(sec => '<h3>' + esc(sec.title) + '</h3><table>' + sec.items.map(it => {
    const v = A[it.id];
    return it.type === 'scale'
      ? '<tr><td>' + esc(it.q) + '</td><td><strong>' + (v != null ? v + ' / ' + (it.max || 5) : '—') + '</strong></td></tr>'
      : '<tr><td colspan="2"><strong>' + esc(it.q) + '</strong>' + (it.hint ? '<br><small>' + esc(it.hint) + '</small>' : '') + '<div class="text">' + esc((v || '').trim() || '—') + '</div>' + (it.type === 'long' ? '<small>' + words(v) + ' words</small>' : '') + '</td></tr>';
  }).join('') + '</table>').join('');
}
function surveyBox() {
  if (isReflect()) return reflectBox();
  const q = surveyQs();
  S.survey = S.survey || {};
  const btns = Array.from({ length: 11 }, (_, n) => {
    const bt = h('button', { class: 'nps-btn', type: 'button', 'aria-pressed': String(S.survey.nps === n) }, String(n));
    bt.addEventListener('click', () => { S.survey.nps = n; save(); btns.forEach((x, i) => x.setAttribute('aria-pressed', String(i === n))); });
    return bt;
  });
  const ta = h('textarea', { class: 'write-in', rows: '4', lang: 'en', 'aria-label': q.open });
  ta.value = S.survey.open || '';
  ta.addEventListener('input', () => { S.survey.open = ta.value; saveSoon(); });
  return [h('h3', { lang: 'en' }, 'Quick Feedback'),
    h('p', { class: 'report-note', lang: 'en' }, 'Not graded — your answers help me improve the homework.'),
    h('p', { class: 'survey-q', lang: 'en' }, q.nps),
    h('div', { class: 'nps', role: 'group', 'aria-label': q.nps }, btns),
    h('div', { class: 'nps-ends', lang: 'en' }, h('span', {}, '0 · Not at all likely'), h('span', {}, 'Extremely likely · 10')),
    h('p', { class: 'survey-q', lang: 'en' }, q.open), ta];
}
R.report = b => {
  const box = h('div', { class: 'card-body-pad report' });
  const name = h('input', { class: 'type-in', type: 'text', placeholder: 'Họ và tên · Your name', 'aria-label': 'Họ và tên · Your name' });
  name.value = prefs.name || '';
  name.addEventListener('input', () => { prefs.name = name.value; savePrefs(); const cv = box.querySelector('.code-val'); if (cv) cv.textContent = completionCode(); });
  const stat = (label, val) => h('div', { class: 'stat' }, h('div', { class: 'stat-label' }, label), h('div', { class: 'stat-val' }, val));
  const secTable = h('table', {},
    h('tr', {}, h('th', {}, 'Phần · Section'), h('th', {}, 'Điểm · Points'), h('th', {}, '%')),
    sectionRows().map(s => h('tr', {}, h('td', {}, s.t.label), h('td', {}, s.got + ' / ' + s.max), h('td', {}, Math.round(100 * s.got / s.max) + '%'))));
  const lvl = n => (n ? LEVELS[n - 1][0] : '—');
  const candoTable = h('table', {},
    h('tr', {}, h('th', {}, 'Tôi có thể… · I can…'), h('th', {}, 'Lúc đầu · Start'), h('th', {}, 'Bây giờ · Now')),
    C.cando.map((c, i) => h('tr', {}, h('td', {}, h('div', { lang: 'vi' }, c.vi), h('div', { class: 'en' }, c.en)), h('td', {}, lvl(S.cando.before[i])), h('td', {}, lvl(S.cando.after[i])))));
  const writingBlocks = [];
  C.tabs.forEach(t => t.blocks.forEach(bl => { if (bl.type === 'writing' && (S.text[bl.id] || '').trim()) writingBlocks.push(h('div', {}, h('div', { class: 'report-note' }, T(bl.title)), h('div', { class: 'report-text', lang: 'vi' }, S.text[bl.id]))); }));
  const recBox = h('div', {}, h('p', { class: 'report-note' }, '…'));
  recordingSlots().then(slots => {
    const missing = slots.filter(x => !x.rec).length;
    recBox.replaceChildren(
      h('table', {}, slots.map(x => h('tr', {},
        h('td', { lang: 'vi' }, h('small', {}, x.block), h('br'), x.prompt),
        x.rec ? h('td', {}, fmtSec(x.rec.dur)) : h('td', {}, '—'),
        h('td', {}, x.rec ? h('audio', { controls: true, preload: 'none', src: URL.createObjectURL(x.rec.blob) }) : h('span', { class: 'fb bad', style: 'display:inline-block;margin:0' }, '⚠ Chưa ghi âm · Not recorded'))))),
      h('p', { class: 'report-note' }, ...(missing
        ? L('Còn ' + missing + ' bản ghi âm chưa làm.', missing + ' recording(s) still missing — go back to the 🎙 activities before you download.')
        : L('✓ Đủ bản ghi âm.', '✓ All recordings done — they will be inside the downloaded file.'))));
  });
  const dlBtn = h('button', { class: 'check-btn', type: 'button' }, '⬇ Tải báo cáo · Download Report (.html)');   // always bilingual, even with English hidden
  const dlFb = h('div', { class: 'fb', 'aria-live': 'polite' });
  dlBtn.addEventListener('click', () => {
    if (!(prefs.name || '').trim()) { setFb(dlFb, 'bad', '✍️ Nhập họ và tên trước khi tải · Type your name first.'); name.focus(); return; }
    setFb(dlFb, 'info', '⬇ Đang tạo tệp… · Preparing your file (with recordings)…');
    downloadReport().then(n => setFb(dlFb, 'ok', '✅ Đã tải · Downloaded — ' + n + ' recording(s) inside. Upload this .html file to Canvas.'));
  });
  const resetBtn = h('button', { class: 'ghost-btn danger-btn', type: 'button' }, L('Làm lại chương này', 'Reset this chapter'));
  resetBtn.addEventListener('click', async () => {
    if (!confirm('Xóa toàn bộ tiến độ và bản ghi âm của chương này? · Delete all progress and recordings for this chapter?')) return;
    for (const r of await recordings()) await DB.del(r.key);
    S = freshState();
    save();
    location.hash = '';
    location.reload();
  });
  box.append(...[
    h('div', { class: 'report-head' },
      h('div', {}, h('div', { class: 'report-ch' }, BOOK.unit.vi + ' ' + C.id + ' · ' + C.titleVi + ' — ' + C.titleEn), h('div', { class: 'report-date' }, new Date().toLocaleDateString('vi-VN'))),
      name),
    h('div', { class: 'report-stats' },
      stat('XP', S.xp + ' / ' + totals().all), stat('Thành thạo · Mastery', S.mastery + '%'),
      stat('Sao · Stars', starStr(S.stars)), stat('Huy hiệu · Badge', S.badge ? C.badge.icon + ' ' + C.badge.name : '—'),
      completionCode() ? stat('Mã hoàn thành · Completion code', h('span', { class: 'code-val' }, completionCode())) : null),
    completionCode() ? h('p', { class: 'report-note' }, ...L('Nhập tên của bạn ở trên, rồi chép mã này vào Canvas.', 'Type your name above, then copy this code into Canvas.')) : null,
    b.timing ? [h('h3', {}, L('Thời gian', 'Time on task')), h('table', {}, timeRows().map(([k, v]) => h('tr', {}, h('td', {}, k), h('td', {}, v))))] : null,
    h('h3', {}, L('Kết quả từng phần', 'Results by section')), secTable,
    strandBox(),   // DV: Four Strands meter, first-try success, reading volume
    h('h3', {}, L('Tự đánh giá', 'Can-do self-check')), candoTable,
    rubricRows().map(rb => [h('h3', {}, T(rb.title)), h('table', {}, h('tr', {}, h('th', {}, 'Tiêu chí · Criterion'), h('th', {}, 'Mức · Level')), rb.rows.map(x => h('tr', {}, h('td', { lang: 'vi' }, x.c), h('td', {}, x.lv))), h('tr', {}, h('td', {}, h('strong', {}, 'Tổng · Total')), h('td', {}, h('strong', {}, rb.total))))]),
    writingBlocks.length ? [h('h3', {}, L('Bài viết', 'Writing')), writingBlocks] : null,
    h('h3', {}, L('Bài ghi âm', 'Recordings')), recBox,
    b.survey ? surveyBox() : null,
    h('div', { class: 'btn-row no-print', style: 'margin-top:20px' }, dlBtn, resetBtn), dlFb,   // VIET 101 homework: HTML download only (it carries the recordings), no print/PDF
    h('p', { class: 'report-note no-print' }, L(
      'Bản ghi âm chỉ lưu trên thiết bị này. Tải báo cáo để gửi cho giáo viên — tệp có kèm bản ghi âm.',
      'Recordings are stored only on this device. Download the report to send to your teacher — the file includes your recordings.'))].flat(2).filter(Boolean));
  return card(b, box);
};
async function downloadReport() {
  if (REPORT.timing) { S.time.end = Date.now(); save(); }
  const slots = await recordingSlots();
  const audio = [];
  for (const x of slots) audio.push({ block: x.block, prompt: x.prompt, dur: x.rec ? x.rec.dur : 0, src: x.rec ? await blobToDataURL(x.rec.blob) : '' });
  const nRec = audio.filter(a => a.src).length;
  const lvl = n => (n ? LEVELS[n - 1][0] + ' · ' + LEVELS[n - 1][1] : '—');
  const rows = sectionRows().map(s => '<tr><td>' + esc(s.t.label) + '</td><td>' + s.got + ' / ' + s.max + '</td><td>' + Math.round(100 * s.got / s.max) + '%</td></tr>').join('');
  const cando = C.cando.map((c, i) => '<tr><td>' + esc(c.vi) + '<br><small>' + esc(c.en) + '</small></td><td>' + lvl(S.cando.before[i]) + '</td><td>' + lvl(S.cando.after[i]) + '</td></tr>').join('');
  let writing = '';
  C.tabs.forEach(t => t.blocks.forEach(bl => {
    if (bl.type === 'writing' && (S.text[bl.id] || '').trim()) writing += '<h2>' + esc(bl.title.vi || bl.title) + '</h2><div class="text">' + esc(S.text[bl.id]) + '</div>';
  }));
  const recHtml = audio.length
    ? '<p class="meta">' + nRec + ' / ' + audio.length + ' bản ghi âm · recordings</p><table>' + audio.map(a => '<tr><td><small>' + esc(a.block) + '</small><br>' + esc(a.prompt) + '</td><td>' + (a.src ? fmtSec(a.dur) : '—') + '</td><td>'
      + (a.src ? '<audio controls preload="metadata" src="' + a.src + '"></audio>' : '<span class="miss">Chưa ghi âm · Not recorded</span>') + '</td></tr>').join('') + '</table>'
      + '<p class="meta">If a recording will not play, open this file in Chrome or Firefox.</p>'
    : '<p>—</p>';
  const who = prefs.name || '—';
  const date = new Date();
  const html = '<!doctype html>' + (BOOK.credit ? '\n<!-- ' + BOOK.credit.replace(/--/g, '—') + ' -->\n' : '') + '<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
    + '<title>Báo cáo ' + BOOK.unit.vi + ' ' + C.id + ' — ' + esc(who) + '</title><style>'
    + 'body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:820px;margin:24px auto;padding:0 16px;color:#1a1410;background:#fff}'
    + 'h1{font-size:1.4rem;color:#14213D;margin-bottom:4px}h2{font-size:1rem;color:#14213D;margin:24px 0 8px;text-transform:uppercase;letter-spacing:.05em}'
    + 'table{width:100%;border-collapse:collapse}td,th{padding:6px 8px;border-bottom:1px solid #e0dbd0;text-align:left;vertical-align:top}'
    + '.stats{display:flex;gap:12px;flex-wrap:wrap}.stat{background:#f0ede6;border-radius:8px;padding:10px 14px}.stat b{display:block;font-size:1.2rem}'
    + '.miss{color:#b3261e;font-weight:600}audio{max-width:100%}.code{font-size:1.1rem;background:#e8f1fa;border-left:4px solid #4B9CD3;padding:10px 14px;border-radius:6px}'
    + '.text{white-space:pre-wrap;background:#f0ede6;border-radius:8px;padding:12px;line-height:1.6}small,.meta{color:#6b6560}'
    + '</style></head><body>'
    + (BOOK.draft ? '<p class="code">BẢN NHÁP · DRAFT</p>' : '')
    + '<h1>' + esc(BOOK.title) + ' — ' + BOOK.unit.vi + ' ' + C.id + ': ' + esc(C.titleVi) + ' (' + esc(C.titleEn) + ')</h1>'
    + '<p class="meta">Học viên · Learner: <strong>' + esc(who) + '</strong> · ' + date.toLocaleString('vi-VN') + '</p>'
    + (completionCode() ? '<p class="code">Mã hoàn thành · Completion code: <strong>' + esc(completionCode()) + '</strong></p>' : '')
    + '<div class="stats"><div class="stat">XP<b>' + S.xp + ' / ' + totals().all + '</b></div><div class="stat">Thành thạo · Mastery<b>' + S.mastery + '%</b></div>'
    + '<div class="stat">Sao · Stars<b>' + starStr(S.stars) + '</b></div><div class="stat">Huy hiệu · Badge<b>' + (S.badge ? esc(C.badge.icon + ' ' + C.badge.name) : '—') + '</b></div></div>'
    + (REPORT.timing ? '<h2>Thời gian · Time on task</h2><table>' + timeRows().map(([k, v]) => '<tr><td>' + esc(k) + '</td><td><strong>' + esc(v) + '</strong></td></tr>').join('') + '</table>'
      + '<p class="meta">Time on task counts only while this page was open and in use (idle over 2 minutes is not counted).</p>' : '')
    + '<h2>Kết quả từng phần · Results by section</h2><table><tr><th>Phần</th><th>Điểm</th><th>%</th></tr>' + rows + '</table>'
    + strandHtml()
    + (completionCode() ? '<p class="meta">Mã hoàn thành · Completion code: <strong>' + esc(completionCode()) + '</strong></p>' : '')
    + '<h2>Tự đánh giá · Can-do self-check</h2><table><tr><th>Tôi có thể… · I can…</th><th>Lúc đầu · Start</th><th>Bây giờ · Now</th></tr>' + cando + '</table>'
    + rubricRows().map(rb => '<h2>' + esc(rb.title.vi || rb.title) + '</h2><table><tr><th>Tiêu chí</th><th>Mức</th></tr>' + rb.rows.map(x => '<tr><td>' + esc(x.c) + '</td><td>' + esc(x.lv) + '</td></tr>').join('') + '<tr><td><strong>Tổng · Total</strong></td><td><strong>' + esc(rb.total) + '</strong></td></tr></table>').join('')
    + writing
    + '<h2>Bài ghi âm · Recordings</h2>' + recHtml
    + (isReflect() ? reflectHtml() : REPORT.survey ? (q => '<h2>Quick Feedback</h2><table><tr><td>' + esc(q.nps) + '</td><td><strong>' + ((S.survey || {}).nps != null ? S.survey.nps + ' / 10' : '—') + '</strong></td></tr>'
      + '<tr><td colspan="2">' + esc(q.open) + '<div class="text">' + esc(((S.survey || {}).open || '').trim() || '—') + '</div></td></tr></table>')(surveyQs()) : '')
    + '</body></html>';
  const slug = (prefs.name || 'hoc-vien').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
  const a = h('a', { href: URL.createObjectURL(new Blob([html], { type: 'text/html' })), download: BOOK.filePrefix + String(C.id).padStart(2, '0') + '-' + slug + '-' + date.toISOString().slice(0, 10) + '.html' });
  document.body.append(a);
  a.click();
  a.remove();
  return nRec;
}

/* audio — real recordings (e.g. textbook audio), with credit */
R.audio = b => card(b, h('div', { class: 'card-body-pad' },
  b.tracks.map(t => h('div', { class: 'track' },
    h('div', { class: 'track-label' }, T(t.label)),
    h('audio', { controls: true, preload: 'none', src: t.src }))),
  b.credit ? h('p', { class: 'audio-credit' }, '🎧 ', b.credit) : null));

/* DV: series deck — Leitner boxes per word for the whole book, stored under BV_BOOK.key + "-deck":
   { v: 1, w: { [vi]: { en, box: 1–5, due: day number, unit } } }. A unit's vocab block with deck: "series" adds its words
   (box 1, due today). Review shows due cards first (oldest due, lowest box); "I know it" moves a card up a box
   (next review in 1 / 2 / 4 / 8 / 16 days), "Not yet" sends it back to box 1 and it comes back this session. */
const DECK_KEY = BOOK.key + '-deck';
const BOX_DAYS = [1, 2, 4, 8, 16];
function today() { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
function deckRead() { const d = readJSON(DECK_KEY); d.v = 1; d.w = d.w || {}; return d; }
function deckAdd(words) {
  const d = deckRead(), t = today();
  let added = false;
  words.forEach(w => { if (!d.w[w.vi]) { d.w[w.vi] = { en: w.en, box: 1, due: t, unit: C.id }; added = true; } });
  if (added) writeJSON(DECK_KEY, d);
}
function deckStats() {
  const d = deckRead(), t = today(), all = Object.values(d.w);
  return { n: all.length, due: all.filter(x => x.due <= t).length, boxes: [1, 2, 3, 4, 5].map(k => all.filter(x => x.box === k).length) };
}
function seriesReview(onDone) {
  const box = h('div', {});
  const d = deckRead(), t = today();
  let queue = Object.keys(d.w).filter(k => d.w[k].due <= t).sort((a, c) => d.w[a].due - d.w[c].due || d.w[a].box - d.w[c].box);
  const boxes = h('div', { class: 'leitner', 'aria-label': 'Hộp thẻ · Leitner boxes' });
  const info = h('div', { class: 'deck-info', 'aria-live': 'polite' });
  const face = h('button', { class: 'flashcard', type: 'button' });
  const yes = h('button', { class: 'know-btn yes', type: 'button', disabled: true }, '✓ ', L('Biết rồi', 'I know it'));
  const no = h('button', { class: 'know-btn no', type: 'button', disabled: true }, '↻ ', L('Chưa thuộc', 'Not yet'));
  let flipped = false;
  function draw() {
    const st = deckStats();
    boxes.replaceChildren(...st.boxes.map((n, i) => h('span', { class: 'leitner-box', title: 'Hộp ' + (i + 1) + ' · ôn sau ' + BOX_DAYS[i] + ' ngày · next review in ' + BOX_DAYS[i] + ' day(s)' }, h('b', {}, String(n)), ' ', 'Hộp ' + (i + 1))));
    info.textContent = 'Còn ' + queue.length + ' thẻ đến hạn · ' + queue.length + ' due — bộ thẻ có ' + st.n + ' từ · ' + st.n + ' words in the series deck';
    face.classList.toggle('flipped', flipped);
    yes.disabled = no.disabled = !flipped || !queue.length;
    if (!queue.length) { face.innerHTML = '<div class="fc-done">🎉 Hết thẻ đến hạn hôm nay! · Nothing else due today</div>'; return; }
    const k = queue[0], w = d.w[k];
    face.innerHTML = '<div class="fc-vi" lang="vi">' + esc(k) + '</div>' + (flipped ? '<div class="fc-en">' + esc(w.en) + '</div><div class="fc-ex-en">Hộp · Box ' + w.box + (w.unit !== C.id ? ' · ' + esc(BOOK.unit.vi + ' ' + w.unit) : '') + '</div>' : '<div class="fc-hint">Chạm để lật · Tap to flip</div>');
    face.setAttribute('aria-label', k + (flipped ? ' = ' + w.en : ' — lật thẻ · flip card'));
  }
  face.addEventListener('click', () => { if (!queue.length) return; flipped = !flipped; draw(); if (flipped) speak(queue[0]); });
  function rate(known) {
    const k = queue.shift(), w = d.w[k];
    if (known) { w.box = Math.min(5, w.box + 1); w.due = today() + BOX_DAYS[w.box - 1]; }
    else { w.box = 1; w.due = today(); queue.push(k); }
    writeJSON(DECK_KEY, d);
    flipped = false;
    draw();
    if (!queue.length) onDone();
  }
  yes.addEventListener('click', () => rate(true));
  no.addEventListener('click', () => rate(false));
  draw();
  if (!queue.length) onDone();
  return h('div', { class: 'deck' }, boxes, info, face, h('div', { class: 'btn-row center' }, no, yes));
}
/* vocab — six practice modes on one word list (flashcards, list, learn, match, write, spell) */
function uniqueBy(arr, f) { const seen = new Set(); return arr.filter(x => { const k = f(x); if (seen.has(k)) return false; seen.add(k); return true; }); }
R.vocab = b => {
  const words = b.words;
  const MODES = [['cards', '🃏', 'Thẻ', 'Flashcards'], ['list', '📋', 'Danh sách', 'Word list'], ['learn', '🧠', 'Học', 'Learn'],
                 ['match', '⚡', 'Ghép', 'Match'], ['write', '✍️', 'Viết', 'Write'], ['spell', '🔤', 'Ghép âm tiết', 'Spell']];
  const scored = ['cards', 'learn', 'match', 'write', 'spell'];
  const series = b.deck === 'series';   // DV: series spaced-review deck (Leitner boxes, shared by every unit of the book)
  if (series) { MODES.unshift(['review', '🔁', 'Ôn thẻ đến hạn', 'Due review']); scored.unshift('review'); deckAdd(words); }
  scored.forEach(m => reg(b.id + '-' + m, XP.deck, 'practice'));
  const stage = h('div', { class: 'vstage' });
  const tabs = h('div', { class: 'vmode-tabs', role: 'tablist', 'aria-label': 'Cách học · Practice modes' });
  const btns = MODES.map(([m, ic, vi, en]) => {
    const bt = h('button', { class: 'vmode', type: 'button', role: 'tab', 'aria-selected': 'false', 'data-mode': m }, ic + ' ', L(vi, en), h('span', { class: 'vdone' }));
    bt.addEventListener('click', () => open(m));
    tabs.append(bt);
    return bt;
  });
  function mark() { MODES.forEach(([m], i) => { btns[i].querySelector('.vdone').textContent = result(b.id + '-' + m) ? ' ✓' : ''; }); }
  scored.forEach(m => { HOOKS[b.id + '-' + m] = mark; });
  const award = m => finish(b.id + '-' + m, XP.deck, 1);
  let stop = null;
  function open(m) {
    if (stop) stop();
    stop = null;
    btns.forEach((x, i) => x.setAttribute('aria-selected', String(MODES[i][0] === m)));
    stage.replaceChildren(MODE[m]());
  }
  const roundOf = (n, pool) => shuffle(pool).slice(0, Math.min(n, pool.length));
  const MODE = {
    cards: () => deckBody(b.id + '-cards', words),
    review: () => seriesReview(() => award('review')),

    list: () => {
      const q = h('input', { class: 'type-in', type: 'search', placeholder: 'Tìm từ… · Search', 'aria-label': 'Tìm từ · Search words', lang: 'vi' });
      const hb = h('button', { class: 'ghost-btn', type: 'button', 'aria-pressed': 'false' }, L('Ẩn tiếng Anh', 'Hide English'));
      const rows = h('div', { class: 'wlist' });
      let hide = false;
      function draw() {
        const t = bare(norm(q.value || ''));
        rows.replaceChildren(...words.filter(w => !t || bare(norm(w.vi)).includes(t) || w.en.toLowerCase().includes(q.value.toLowerCase().trim()))
          .map(w => {
            const en = h('span', { class: 'wen' + (hide ? ' wen-hidden' : ''), title: hide ? 'Chạm để xem · Tap to reveal' : null }, w.en);
            en.addEventListener('click', () => en.classList.remove('wen-hidden'));
            return h('div', { class: 'wrow' }, sayBtn(w.vi), h('span', { class: 'wvi', lang: 'vi' }, w.vi), en, S.cards[w.vi] ? h('span', { class: 'wknown', title: 'Đã thuộc · Known' }, '✓') : null);
          }));
      }
      q.addEventListener('input', draw);
      hb.addEventListener('click', () => { hide = !hide; hb.setAttribute('aria-pressed', String(hide)); draw(); });
      draw();
      return h('div', {}, h('div', { class: 'btn-row', style: 'margin-top:0' }, q, hb), rows);
    },

    learn: () => {
      const box = h('div', {});
      const N = Math.min(10, words.length);
      let deck, i, right;
      function start() { deck = roundOf(N, words); i = 0; right = 0; ask(); }
      function ask() {
        if (i >= deck.length) return end();
        const w = deck[i], toEn = i % 2 === 0;
        const others = shuffle(words.filter(x => x.en !== w.en && x.vi !== w.vi)).slice(0, 3);
        const opts = shuffle([w].concat(others));
        const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
        const row = h('div', { class: 'opt-row' });
        opts.forEach(o => {
          const bt = h('button', { class: 'opt', type: 'button', lang: toEn ? null : 'vi' }, toEn ? o.en : o.vi);
          bt.addEventListener('click', () => {
            row.querySelectorAll('button').forEach((x, j) => { x.disabled = true; if (opts[j] === w) x.classList.add('correct'); });
            const ok = o === w;
            if (ok) { right++; setFb(fb, 'ok', '✅ ' + w.vi + ' = ' + w.en); } else { bt.classList.add('wrong'); setFb(fb, 'bad', '❌ ' + w.vi + ' = ' + w.en); }
            speak(w.vi);
            setTimeout(() => { i++; if (box.isConnected) ask(); }, ok ? 700 : 1600);
          });
          row.append(bt);
        });
        box.replaceChildren(
          h('div', { class: 'deck-info' }, 'Câu ' + (i + 1) + ' / ' + deck.length + ' · ✓ ' + right),
          h('div', { class: 'lq-q' }, toEn ? [sayBtn(w.vi), h('span', { lang: 'vi' }, w.vi)] : h('span', {}, w.en)),
          row, fb);
      }
      function end() {
        const pass = right >= Math.ceil(deck.length * 0.8);
        if (pass) award('learn');
        box.replaceChildren(h('div', { class: 'vresult' },
          h('div', { class: 'stat-val' }, right + ' / ' + deck.length),
          h('p', {}, pass ? '🎉 Giỏi lắm! · Great job!' : 'Cần 80% để hoàn thành · 80% completes this mode'),
          h('button', { class: 'check-btn', type: 'button', onclick: start }, L('Chơi lại', 'Play again'))));
      }
      start();
      return box;
    },

    match: () => {
      const box = h('div', {});
      let iv = null;
      stop = () => clearInterval(iv);
      function round() {
        clearInterval(iv);
        const set = roundOf(6, uniqueBy(uniqueBy(words, w => w.en), w => w.vi));
        const items = shuffle(set.map((w, k) => ({ k, t: w.vi, vi: true })).concat(set.map((w, k) => ({ k, t: w.en }))));
        let sel = null, left = set.length;
        const t0 = Date.now();
        const timer = h('span', { class: 'vtimer' }, '0.0s');
        iv = setInterval(() => { timer.textContent = ((Date.now() - t0) / 1000).toFixed(1) + 's'; }, 100);
        const grid = h('div', { class: 'vmatch-grid' });
        items.forEach(it => {
          const bt = h('button', { class: 'match-item', type: 'button', lang: it.vi ? 'vi' : null }, it.t);
          bt.addEventListener('click', () => {
            if (!sel) { sel = { it, bt }; bt.classList.add('selected'); if (it.vi) speak(it.t); return; }
            if (sel.bt === bt) { bt.classList.remove('selected'); sel = null; return; }
            const a = sel; sel = null;
            if (a.it.k === it.k && a.it.vi !== it.vi) {
              [a.bt, bt].forEach(x => { x.classList.remove('selected'); x.classList.add('matched'); x.disabled = true; });
              if (--left === 0) {
                clearInterval(iv);
                const secs = +((Date.now() - t0) / 1000).toFixed(1);
                const bk = b.id + '-best';
                if (!S.seen[bk] || secs < S.seen[bk]) { S.seen[bk] = secs; save(); }
                award('match');
                box.append(h('div', { class: 'fb ok' }, '🎉 ' + secs + 's · Kỷ lục · Best: ' + S.seen[bk] + 's'),
                  h('div', { class: 'btn-row' }, h('button', { class: 'check-btn', type: 'button', onclick: round }, L('Ván mới', 'New round'))));
              }
            } else {
              [a.bt, bt].forEach(x => { x.classList.add('wrong'); setTimeout(() => x.classList.remove('wrong', 'selected'), 500); });
            }
          });
          grid.append(bt);
        });
        box.replaceChildren(h('div', { class: 'deck-info' }, 'Chạm một từ, rồi nghĩa của nó · Tap a word, then its meaning · ⏱ ', timer), grid);
      }
      round();
      return box;
    },

    write: () => {
      const box = h('div', {});
      let deck, i, right;
      function start() { deck = roundOf(8, words); i = 0; right = 0; ask(); }
      function ask() {
        if (i >= deck.length) return end();
        const w = deck[i];
        let tries = 0;
        const input = h('input', { class: 'type-in', type: 'text', lang: 'vi', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Viết tiếng Việt · Type the Vietnamese' });
        const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
        const check = h('button', { class: 'check-btn', type: 'button' }, L('Kiểm tra', 'Check'));
        const next = h('button', { class: 'ghost-btn', type: 'button', hidden: true }, L('Tiếp', 'Next'), ' →');
        next.addEventListener('click', () => { i++; ask(); });
        function done(ok, msg) { input.disabled = check.disabled = true; if (ok) right++; setFb(fb, ok ? 'ok' : 'bad', msg); speak(w.vi); next.hidden = false; next.focus(); }
        function go() {
          if (!input.value.trim() || input.disabled) return;
          tries++;
          const r = checkTyped(input.value, [w.vi]);
          if (r.kind === 'ok') done(true, '✅ ' + w.vi);
          else if (r.kind === 'tone' && tries < 2) setFb(fb, 'near', '🟡 Gần đúng — kiểm tra dấu · check the tone marks: ' + r.words.join(', '));
          else done(false, 'Đáp án · Answer: ' + w.vi);
        }
        check.addEventListener('click', go);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') { if (next.hidden) go(); else next.click(); } });
        box.replaceChildren(
          h('div', { class: 'deck-info' }, (i + 1) + ' / ' + deck.length + ' · ✓ ' + right),
          h('div', { class: 'lq-q' }, w.en),
          h('div', { class: 'type-row' }, input, check), palette(input), fb, h('div', { class: 'btn-row' }, next));
        input.focus();
      }
      function end() {
        const pass = right >= Math.ceil(deck.length * 0.75);
        if (pass) award('write');
        box.replaceChildren(h('div', { class: 'vresult' }, h('div', { class: 'stat-val' }, right + ' / ' + deck.length),
          h('p', {}, pass ? '🎉 Giỏi lắm! · Great job!' : 'Cần 75% để hoàn thành · 75% completes this mode'),
          h('button', { class: 'check-btn', type: 'button', onclick: start }, L('Làm lại', 'Again'))));
      }
      start();
      return box;
    },

    spell: () => {
      const box = h('div', {});
      const multi = words.filter(w => w.vi.trim().split(/\s+/).length > 1);
      const pool = multi.length >= 4 ? multi : words;
      const allSyl = [...new Set(words.flatMap(w => w.vi.toLowerCase().replace(/[!?.,]/g, '').split(/\s+/)))];
      let deck, i, right;
      function start() { deck = roundOf(8, pool); i = 0; right = 0; ask(); }
      function ask() {
        if (i >= deck.length) return end();
        const w = deck[i];
        const syl = w.vi.replace(/[!?.,]/g, '').split(/\s+/);
        const extra = shuffle(allSyl.filter(x => !syl.map(y => y.toLowerCase()).includes(x))).slice(0, 2);
        const placed = h('div', { class: 'build-line', role: 'group', 'aria-label': 'Từ của bạn · Your word' });
        const bank = h('div', { class: 'build-bank' });
        const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
        const tiles = shuffle(syl.concat(extra)).map(t => {
          const bt = h('button', { class: 'tile', type: 'button', lang: 'vi' }, t);
          bt.addEventListener('click', () => (bt.parentNode === bank ? placed : bank).append(bt));
          return bt;
        });
        bank.append(...tiles);
        const check = h('button', { class: 'check-btn', type: 'button' }, L('Kiểm tra', 'Check'));
        const next = h('button', { class: 'ghost-btn', type: 'button', hidden: true }, L('Tiếp', 'Next'), ' →');
        next.addEventListener('click', () => { i++; ask(); });
        check.addEventListener('click', () => {
          const got = [...placed.children].map(x => x.textContent).join(' ');
          if (!got) return;
          const ok = got.toLowerCase() === syl.join(' ').toLowerCase();
          if (ok) right++;
          tiles.forEach(x => { x.disabled = true; });
          check.disabled = true;
          setFb(fb, ok ? 'ok' : 'bad', (ok ? '✅ ' : 'Đáp án · Answer: ') + w.vi);
          speak(w.vi);
          next.hidden = false;
        });
        box.replaceChildren(
          h('div', { class: 'deck-info' }, (i + 1) + ' / ' + deck.length + ' · ✓ ' + right),
          h('div', { class: 'lq-q' }, w.en, ' ', sayBtn(w.vi, null, true)),
          placed, bank, h('div', { class: 'btn-row' }, check, next), fb);
      }
      function end() {
        const pass = right >= Math.ceil(deck.length * 0.75);
        if (pass) award('spell');
        box.replaceChildren(h('div', { class: 'vresult' }, h('div', { class: 'stat-val' }, right + ' / ' + deck.length),
          h('p', {}, pass ? '🎉 Giỏi lắm! · Great job!' : 'Cần 75% để hoàn thành · 75% completes this mode'),
          h('button', { class: 'check-btn', type: 'button', onclick: start }, L('Làm lại', 'Again'))));
      }
      start();
      return box;
    },
  };
  mark();
  open(series ? 'review' : 'cards');
  return card(b, h('div', { class: 'card-body-pad' },
    h('p', { class: 'card-instr' }, L('Chọn một cách học. Hoàn thành mỗi cách được +20 XP.', 'Pick a mode. Each mode you complete earns +20 XP.')),
    tabs, stage), '+' + XP.deck + ' XP × ' + scored.length);
};

/* drama — process drama studio: pronoun-pair switching, feeling cards, situations, twists.
   Script lines use tokens filled from the chosen pronoun pair:
     {A} what others call role A · {a} what A calls themself · {ap} A's "we"
     {B} {b} {bp} the same for role B
     [[ … ]] only when the speaker of the line is the junior (polite: thưa, ạ, dạ)
     (( … )) only between peers (no hierarchy)
     <<peer version|hierarchy version>> when the wording itself changes */
function fillScript(t, roles, junior, vars) {
  return (lineRole) => {
    let s = vars ? t.replace(/\{(\w{2,})\}/g, (m, k) => (!/^(ap|bp)$/.test(k) && Object.prototype.hasOwnProperty.call(vars, k) ? vars[k] : m)) : t;   // DV pass 3: pair vars
    s = s.replace(/<<(.*?)\|(.*?)>>/g, (m, x, y) => (junior ? y : x))
             .replace(/\[\[(.*?)\]\]/g, (m, x) => (junior && lineRole === junior ? x : ''))
             .replace(/\(\((.*?)\)\)/g, (m, x) => (junior ? '' : x));
    s = s.replace(/\{(A|a|ap|B|b|bp)\}/g, (m, k) => {
      const r = roles[k[0].toUpperCase()];
      return k === k.toUpperCase() ? r.call : k.length === 2 ? r.selfPl : r.self;
    });
    s = s.replace(/\s+([,.!?…])/g, '$1').replace(/\s{2,}/g, ' ').replace(/,([.!?])/g, '$1').trim();
    return s.replace(/(^|[.!?…]\s+)(\p{Ll})/gu, (m, p1, p2) => p1 + p2.toUpperCase());
  };
}
function cap(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }
R.drama = b => {
  const D = Object.assign({}, C.drama || {}, b.cards || {});
  const pairs = (b.pairs || Object.keys(D.pairs)).map(id => Object.assign({ id }, D.pairs[id]));
  const senior = b.senior || 'A';
  const other = senior === 'A' ? 'B' : 'A';
  const FEEL = D.feelings || [], CTX = D.contexts || [];   // DV pass 3: feelings / contexts optional
  const st = { pair: pairs.find(p => p.id === b.start) || pairs[0], fa: FEEL[0], fb: FEEL[0], ctx: CTX[0], twist: null };
  const pairRow = h('div', { class: 'pair-row', role: 'radiogroup', 'aria-label': 'Cặp đại từ · Pronoun pair' });
  const pairBtns = pairs.map(p => {
    const bt = h('button', { class: 'cando-btn', type: 'button', role: 'radio', 'aria-checked': 'false', 'data-pair': p.id }, p.label);
    bt.addEventListener('click', () => { st.pair = p; draw(); });
    pairRow.append(bt);
    return bt;
  });
  const cardsBox = h('div', { class: 'scene-cards' });
  const scriptBox = h('div', { class: 'transcript drama-script', 'aria-live': 'polite' });
  const note = h('p', { class: 'report-note' });
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const drawBtn = h('button', { class: 'play-btn', type: 'button' }, '🎲 ', L('Bốc thẻ', 'Draw cards'));
  drawBtn.addEventListener('click', () => {
    if (FEEL.length) { st.fa = pick(FEEL); st.fb = pick(FEEL); }
    if (CTX.length) st.ctx = pick(CTX);
    st.twist = D.twists && D.twists.length && (Math.random() < 0.6 || !FEEL.length) ? pick(D.twists) : null;
    draw();
  });
  if (!FEEL.length && !CTX.length && !(D.twists && D.twists.length)) drawBtn.hidden = true;
  const rndPair = h('button', { class: 'ghost-btn', type: 'button' }, '🔀 ', L('Đổi cặp', 'Random pair'));
  rndPair.addEventListener('click', () => { st.pair = pick(pairs.filter(p => p !== st.pair)) || st.pair; draw(); });
  let lines = [];
  const playBtn = h('button', { class: 'ghost-btn', type: 'button' }, '🔊 ', L('Nghe kịch bản', 'Hear the script'));
  playBtn.addEventListener('click', () => speakAll(lines.map(l => ({ text: l.text, pitch: l.r === 'A' ? 0.95 : 1.25 })), (i, on) => scriptBox.children[i] && scriptBox.children[i].classList.toggle('speaking', on)));
  const seniorOf = p => p.senior || senior;   // DV pass 3: a pair may flip who is older
  const otherOf = p => (seniorOf(p) === 'A' ? 'B' : 'A');
  function rolesFor(p) {
    if (p.peer) return { A: p.peer, B: p.peer };
    return { [seniorOf(p)]: p.older, [otherOf(p)]: p.younger };
  }
  function draw() {
    const p = st.pair, roles = rolesFor(p), junior = p.peer ? null : otherOf(p);
    pairBtns.forEach((x, i) => x.setAttribute('aria-checked', String(pairs[i] === p)));
    lines = b.script.map(l => ({ r: l.r, text: fillScript(l.t, roles, junior, p.vars)(l.r) }));
    scriptBox.replaceChildren(...lines.map(l => h('div', { class: 'dlg-line' }, h('span', { class: 'spk' }, p.peer ? l.r : l.r + ' · ' + cap(roles[l.r].call)), h('div', { class: 'dlg-text', lang: 'vi' }, l.text), sayBtn(l.text))));
    const fcard = (who, f) => h('div', { class: 'scene-card' }, h('div', { class: 'scene-emoji', 'aria-hidden': 'true' }, f.e), h('div', { class: 'scene-k' }, who), h('div', { class: 'scene-v', lang: 'vi' }, f.vi), h('div', { class: 'en' }, f.en), f.tip ? h('div', { class: 'scene-tip' }, '🎬 ', T(f.tip)) : null);
    cardsBox.replaceChildren(...[
      st.fa ? fcard(p.peer ? 'A' : 'A · ' + cap(roles.A.call), st.fa) : null,
      st.fb ? fcard(p.peer ? 'B' : 'B · ' + cap(roles.B.call), st.fb) : null,
      st.ctx && h('div', { class: 'scene-card scene-ctx' }, h('div', { class: 'scene-emoji', 'aria-hidden': 'true' }, st.ctx.e || '📍'), h('div', { class: 'scene-k' }, 'Bối cảnh · Situation'), h('div', { class: 'scene-v', lang: 'vi' }, st.ctx.vi), h('div', { class: 'en' }, st.ctx.en)),
      st.twist ? h('div', { class: 'scene-card scene-twist' }, h('div', { class: 'scene-emoji', 'aria-hidden': 'true' }, '🌶️'), h('div', { class: 'scene-k' }, 'Thêm gia vị · Spice it up'), h('div', { class: 'scene-v', lang: 'vi' }, st.twist.vi), h('div', { class: 'en' }, st.twist.en)) : null].filter(Boolean));
    note.replaceChildren(...[p.note ? L(p.note.vi, p.note.en) : [], ' · ', junior ? L('Người nhỏ tuổi hơn dùng “thưa”, “ạ”, “dạ”.', 'The younger speaker adds thưa / ạ / dạ.') : L('Bạn bè ngang hàng: không cần “thưa”, “ạ”.', 'Peers: no thưa / ạ needed.')].flat(2).filter(Boolean));
    if (rec) rec.title.textContent = plain(scene());
  }
  const scene = () => cap(st.pair.label) + (st.fa ? ' · A ' + st.fa.vi + ', B ' + st.fb.vi : '') + (st.ctx ? ' · ' + st.ctx.vi : '') + (st.twist ? ' · ' + st.twist.vi : '');
  let rec = null;
  const recKeyId = b.id + '-perf';
  reg(recKeyId, XP.record, 'record');
  const recP = { vi: 'Ghi âm phần diễn của nhóm bạn · Record your group’s performance', model: false, saveAs: () => '🎭 ' + scene() };
  const recEl = recItem(recP, recKeyId, '🎭', b);
  rec = { title: h('div', { class: 'report-note' }) };
  const steps = h('ol', { class: 'drama-steps' },
    h('li', {}, ...L('Chọn cặp đại từ — kịch bản tự đổi theo.', 'Choose a pronoun pair — the script changes with it.')),
    h('li', {}, ...L('Bốc thẻ: cảm xúc cho mỗi vai, bối cảnh, và có thể một “gia vị”.', 'Draw cards: a feeling for each role, a situation, maybe a twist.')),
    h('li', {}, ...L('Diễn với bạn cùng nhóm — giọng, mặt, tay đều phải theo cảm xúc!', 'Act it out with your partner — voice, face and hands all follow the feeling!')),
    h('li', {}, ...L('Đổi vai, đổi cặp, diễn lại. Ghi âm lần hay nhất.', 'Swap roles, switch pairs, act again. Record your best take.')));
  const extra = (b.hotseat || D.hotseat) ? h('details', { class: 'drama-more' },
    h('summary', {}, '🪑 ', ...L('Ghế nóng & tiếng nói bên trong', 'Hot seat & thought-tracking')),
    h('ul', {}, (b.hotseat || D.hotseat).map(q => h('li', {}, h('span', { lang: 'vi' }, q.vi), q.en ? h('span', { class: 'en' }, ' — ' + q.en) : null)))) : null;
  draw();
  return card(b, h('div', { class: 'card-body-pad drama' },
    b.instr || !(D.feelings && D.feelings.length) ? null : steps,   // DV pass 3: no card steps without feeling cards
    h('div', { class: 'drama-label' }, L('Cặp đại từ', 'Pronoun pair')), pairRow, note,
    h('div', { class: 'btn-row' }, drawBtn, rndPair, playBtn),
    cardsBox, scriptBox, extra,
    h('div', { class: 'drama-rec' }, rec.title, recEl)), '+' + XP.record + ' XP');
};

/* cloze — fill the gaps from a word bank */
function clozeItem(it, key, num) {
  reg(key, XP.first);
  const wrap = h('div', { class: 'q' });
  const textEl = h('div', { class: 'cloze-text', lang: 'vi' });
  const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
  const gaps = [];
  let bankBtns = [], tries = 0;
  it.text.split(/\{(\d+)\}/).forEach((part, i) => {
    if (i % 2 === 0) { textEl.append(vtext(part)); return; }
    const g = h('button', { class: 'gap', type: 'button', 'aria-label': 'Chỗ trống ' + (+part + 1) + ' · Blank ' + (+part + 1) }, '_____');
    g.addEventListener('click', () => {
      if (!g.dataset.v || g.disabled) return;
      const bt = bankBtns.find(x => x.disabled && x.textContent === g.dataset.v);
      if (bt) bt.disabled = false;
      delete g.dataset.v; g.textContent = '_____'; g.classList.remove('filled', 'wrong');
    });
    gaps[+part] = g;
    textEl.append(g);
  });
  const bank = h('div', { class: 'build-bank' });
  bankBtns = shuffle(it.bank).map(w => {
    const bt = h('button', { class: 'tile', type: 'button', lang: 'vi' }, w);
    bt.addEventListener('click', () => {
      const g = gaps.find(x => !x.dataset.v);
      if (!g) return;
      g.dataset.v = w; g.textContent = w; g.classList.add('filled'); g.classList.remove('wrong');
      bt.disabled = true;
    });
    return bt;
  });
  bank.append(...bankBtns);
  const check = h('button', { class: 'check-btn', type: 'button' }, L('Kiểm tra', 'Check'));
  function showAnswers() { gaps.forEach((g, i) => { g.dataset.v = it.answers[i]; g.textContent = it.answers[i]; g.classList.add('filled'); g.classList.remove('wrong'); g.disabled = true; }); bankBtns.forEach(x => (x.disabled = true)); check.disabled = true; }
  check.addEventListener('click', () => {
    if (gaps.some(g => !g.dataset.v)) { setFb(fb, 'info', 'Điền hết chỗ trống trước · Fill every blank first.'); return; }
    tries++;
    const wrong = gaps.filter((g, i) => g.dataset.v !== it.answers[i]);
    if (!wrong.length) { showAnswers(); setFb(fb, 'ok', '✅ Đúng hết!'); finish(key, pointsFor(tries), tries); return; }
    if (tries >= 3) { showAnswers(); setFb(fb, 'bad', 'Đáp án đúng ở trên · The answers are filled in above.'); finish(key, 0, tries); return; }
    wrong.forEach(g => g.classList.add('wrong'));
    setFb(fb, 'bad', '❌ ' + wrong.length + ' chỗ chưa đúng — chạm để đổi · ' + wrong.length + ' wrong — tap a red blank to change it.');
  });
  if (result(key)) { showAnswers(); setFb(fb, result(key).pts ? 'ok' : 'info', '✅'); }
  wrap.append(h('div', { class: 'q-text' }, num ? num + '. ' : null, it.prompt ? h('span', { class: 'prompt-en' }, it.prompt) : null), textEl, bank, h('div', { class: 'btn-row' }, check), fb);
  return wrap;
}
R.cloze = b => list(b, clozeItem, '+10 XP');

/* story — extensive reading / listening: read-along, reading timer, then match · order · fill */
/* DV pass 3: a reader slot — a story block without a body points to library readers (story ids); with fluency (or strand
   "fluency") it also times a speed read of the reader the learner picks: S.fluency[slot id] = { kind: 'read', … } */
function storySlot(b) {
  const readers = (b.readers || []).map(byId).filter(x => x && x.body);
  const open = r => {
    const el = BLOCK_EL.get(r);
    const tab = C.tabs.find(t => t.blocks.includes(r));
    if (tab && currentTab !== tab.id) showTab(tab.id, false);
    if (el) { el.open = true; el.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
  };
  const list = readers.length ? h('div', { class: 'dv-slot-list' }, readers.map(r => h('button', { class: 'ghost-btn dv-slot-reader', type: 'button', onclick: () => open(r) },
    (r.emoji || '📖') + ' ', h('span', { lang: 'vi' }, r.titleVi), r.titleEn ? h('span', { class: 'en' }, ' · ' + r.titleEn) : null,
    r.unlock ? h('span', { class: 'story-level' }, '🔓 ' + r.unlock) : null))) : null;
  let timer = null;
  if (b.fluency === true || b.strand === 'fluency') {
    const pick = h('select', { class: 'dv-slot-pick', 'aria-label': 'Chọn truyện · Choose a reader' }, readers.map(r => h('option', { value: r.id }, plain(r.titleVi))));
    const best0 = ((S.fluency || {})[b.id] || {}).best;
    const tLabel = h('span', { class: 'rec-status', 'aria-live': 'polite' }, best0 ? '⏱ ' + best0 + ' âm tiết/phút · syllables/min' : '');
    let t0 = null;
    const tb = h('button', { class: 'ghost-btn st-timer', type: 'button' }, '⏱ ', L('Đọc nhanh: bấm giờ', 'Speed read: start the timer'));
    tb.addEventListener('click', () => {
      if (!t0) { t0 = Date.now(); tb.replaceChildren('⏹ ', ...L('Đọc xong', 'Done reading')); tLabel.textContent = '…'; return; }
      const secs = (Date.now() - t0) / 1000;
      t0 = null;
      tb.replaceChildren('⏱ ', ...L('Bấm giờ lại', 'Time again'));
      const r = byId(pick.value);
      if (secs < 1 || !r) { tLabel.textContent = '⏱ —'; return; }
      const spm = Math.round(sylCount(r.body.map(x => x.s).join(' ')) / (secs / 60));
      const F = S.fluency = S.fluency || {}, prev = F[b.id] || { n: 0, best: 0 };
      F[b.id] = { kind: 'read', n: prev.n + 1, last: spm, best: Math.max(prev.best || 0, spm), secs: Math.round(secs), story: r.id, ts: Date.now() };
      save();
      tLabel.textContent = '⏱ ' + spm + ' âm tiết/phút · syllables/min (kỷ lục · best ' + F[b.id].best + ')';
    });
    timer = h('div', { class: 'btn-row' }, pick, tb, tLabel);
  }
  return card(Object.assign({}, b, { title: b.title || { vi: b.titleVi, en: b.titleEn } }), h('div', { class: 'card-body-pad' },
    list ? h('p', { class: 'drama-label' }, L('Chọn một truyện', 'Choose a reader')) : null, list, timer));
}
R.story = b => {
  if (!b.body) return storySlot(b);
  const audio = b.audio || (b.body.some(x => fileFor(x.s)) ? b.body.map(x => fileFor(x.s)) : null);
  const speakers = [...new Set(b.body.filter(x => x.t === 'd').map(x => x.sp))];
  const lineBtn = i => {
    if (!audio) return null;
    const bt = h('button', { class: 'tts line-play', type: 'button', 'aria-label': 'Nghe · Listen' }, '🔊');
    bt.addEventListener('click', () => { stopSpeech(); playLine(audio[i], b.body[i].s); });
    return bt;
  };
  const lines = b.body.map((x, i) => x.t === 'd'
    ? h('div', { class: 'dlg-line st-line' }, h('span', { class: 'spk' }, x.sp), h('div', { class: 'dlg-text' }, h('div', { lang: 'vi' }, x.s), x.en ? h('div', { class: 'en dlg-en' }, x.en) : null), lineBtn(i))
    : h('div', { class: 'st-line st-narr' }, h('div', { lang: 'vi' }, lineBtn(i), ' ', x.s), x.en ? h('div', { class: 'en dlg-en' }, x.en) : null));
  const play = h('button', { class: 'play-btn', type: 'button' }, '▶ ', audio ? L('Nghe bản ghi và đọc theo', 'Read along with the recording') : L('Nghe và đọc theo', 'Read along'));
  const mark = (i, on) => { lines[i].classList.toggle('speaking', on); if (on) lines[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
  play.addEventListener('click', async () => {
    if (!audio) {
      const ok = await speakAll(b.body.map(x => ({ text: x.s, pitch: x.t === 'd' ? (speakers.indexOf(x.sp) % 2 ? 1.25 : 0.95) : 1.05 })), mark);
      if (ok) markHeard(b.id);   // DV pass 2: the browser voice counts as played
      return;
    }
    stopSpeech();
    const token = speechToken;
    for (let i = 0; i < b.body.length; i++) {
      if (token !== speechToken) return;
      mark(i, true);
      await playLine(audio[i], b.body[i].s);
      mark(i, false);
      await wait(250);
    }
    if (token === speechToken) markHeard(b.id);
  });
  /* DV pass 2: fluency: true (or strand "fluency") → speed reading of a known story: syllables per minute, best kept in
     S.fluency[id] = { kind: 'read', n, last, best } and shown in the report. Other stories keep the words-per-minute timer. */
  const speedRead = b.fluency === true || b.strand === 'fluency';
  const nWords = speedRead ? sylCount(b.body.map(x => x.s).join(' ')) : b.body.map(x => x.s).join(' ').split(/\s+/).length;
  const wpmKey = b.id + '-wpm';
  const unit = speedRead ? ' âm tiết/phút · syllables/min' : ' từ/phút · wpm';
  const best0 = speedRead ? ((S.fluency || {})[b.id] || {}).best : S.seen[wpmKey];
  const tLabel = h('span', { class: 'rec-status', 'aria-live': 'polite' }, best0 ? '⏱ ' + best0 + unit : '');
  let t0 = null;
  const timerBtn = h('button', { class: 'ghost-btn st-timer', type: 'button' }, '⏱ ', speedRead ? L('Đọc nhanh: bấm giờ', 'Speed read: start the timer') : L('Bấm giờ đọc', 'Time my reading'));
  timerBtn.addEventListener('click', () => {
    if (!t0) { t0 = Date.now(); timerBtn.replaceChildren('⏹ ', ...L('Đọc xong', 'Done reading')); tLabel.textContent = '…'; return; }
    const secs = (Date.now() - t0) / 1000;
    t0 = null;
    timerBtn.replaceChildren('⏱ ', ...L('Bấm giờ lại', 'Time again'));
    if (secs < 1) { tLabel.textContent = '⏱ —'; return; }   // a double tap, not a reading
    const wpm = Math.round(nWords / (secs / 60));
    let best;
    if (speedRead) {
      const F = S.fluency = S.fluency || {}, prev = F[b.id] || { n: 0, best: 0 };
      best = Math.max(prev.best || 0, wpm);
      F[b.id] = { kind: 'read', n: prev.n + 1, last: wpm, best, secs: Math.round(secs), ts: Date.now() };
    } else best = S.seen[wpmKey] = Math.max(S.seen[wpmKey] || 0, wpm);
    save();
    tLabel.textContent = '⏱ ' + wpm + unit + ' (kỷ lục · best ' + best + ')';
  });
  /* DV pass 2 (D26): listen: "first" hides the text until it has been heard to the end; "along" = listen-and-read first.
     Either way the reading timer waits until the story has been heard once (later re-reads may be silent). */
  const gated = () => b.listen === 'first' && !isHeard(b.id);
  const timerWait = () => (b.listen === 'first' || b.listen === 'along') && !isHeard(b.id);
  timerBtn.hidden = timerWait();
  onHeard(b.id, () => { timerBtn.hidden = false; storyText.hidden = false; });
  const storyText = h('div', { class: 'transcript story-text', hidden: gated() }, lines);
  const keys = b.pairs ? b.pairs.map((_, i) => b.id + '-pairs-' + (i + 1)).concat([b.id + '-order-1', b.id + '-fill-1']) : [];
  const status = h('span', { class: 'story-status' });
  const upd = () => { const n = keys.filter(k => result(k)).length; status.textContent = n === keys.length ? '✓' : n ? n + '/' + keys.length : ''; };
  keys.forEach(k => { HOOKS[k] = upd; });
  const tasks = b.pairs ? [
    R.match({ id: b.id + '-pairs', title: { vi: 'Ghép từ', en: 'Match the words' }, pairs: b.pairs.map(([a, c]) => ({ a, b: c })) }),
    R.builder({ id: b.id + '-order', title: { vi: 'Sắp xếp câu chuyện', en: 'Put the story in order' }, items: [{ en: 'Tap the sentences in story order.', tiles: b.order, answer: b.order.join(' '), vertical: true }] }),
    R.cloze({ id: b.id + '-fill', title: { vi: 'Điền từ', en: 'Fill in the blanks' }, items: [b.fill] }),
  ] : [];
  /* DV pass 3: a story without match / order / fill gets a "Done reading" mark (reading volume) */
  const rk = b.id + '-read';
  const doneBtn = b.pairs ? null : h('button', { class: 'ghost-btn rd-done', type: 'button', 'aria-pressed': String(!!S.seen[rk]) }, '✓ ', L('Tôi đọc xong', 'Done reading'));
  if (doneBtn) doneBtn.addEventListener('click', () => { S.seen[rk] = 1; doneBtn.setAttribute('aria-pressed', 'true'); status.textContent = '✓'; save(); toast('📖 ' + sylCount(b.body.map(x => x.s).join(' ')) + ' từ · words'); });
  if (doneBtn && S.seen[rk]) status.textContent = '✓';
  upd();
  const det = h('details', { class: 'story-item card' },
    h('summary', { class: 'story-sum' }, h('span', { class: 'story-emoji', 'aria-hidden': 'true' }, b.emoji || '📖'),
      h('span', { class: 'story-titles' }, h('span', { class: 'story-vi', lang: 'vi' }, b.titleVi), h('span', { class: 'en' }, ' · ' + b.titleEn)),
      b.level ? h('span', { class: 'story-level' }, b.level) : null, b.mins ? h('span', { class: 'story-level' }, '⏱ ' + b.mins + '′') : null,
      b.unlock ? h('span', { class: 'story-level', title: 'Mở từ buổi · Opens at session ' + b.unlock }, '🔓 ' + b.unlock) : null, viewChips(b), status),
    b.lead ? h('div', { class: 'card-body-pad prose dv-lead', html: b.lead }) : null,
    h('div', { class: 'card-body-pad' },
      h('div', { class: 'btn-row', style: 'margin-top:0' }, play, timerBtn, tLabel),
      b.gloss ? h('div', { class: 'story-gloss' }, b.gloss.map(([v, e]) => h('span', { class: 'gloss-chip' }, h('strong', { lang: 'vi' }, v), ' ' + e))) : null,
      listenNote(b, 'Nghe hết truyện một lần, rồi mới đọc.', 'Listen to the whole story once; then the text appears.'),
      storyText,
      doneBtn ? h('div', { class: 'btn-row' }, doneBtn) : null,
      b.credit ? h('p', { class: 'audio-credit', html: b.credit }) : null),
    b.after ? h('div', { class: 'card-body-pad prose dv-after', html: b.after }) : null,
    h('div', { class: 'story-tasks' }, tasks));
  if (b.strand) det.dataset.strand = b.strand;
  return det;
};


/* infogap — pair work: Student A and Student B see different information */
R.infogap = b => {
  const box = h('div', { class: 'infogap' });
  const roles = ['A', 'B'];
  const pick = roles.map(rl => {
    const bt = h('button', { class: 'cando-btn', type: 'button', 'aria-pressed': 'false', 'data-role': rl }, L('Bạn ' + rl, 'Student ' + rl));
    bt.addEventListener('click', () => { pick.forEach((x, i) => x.setAttribute('aria-pressed', String(roles[i] === rl))); draw(rl); });
    return bt;
  });
  function draw(rl) {
    box.replaceChildren(...[
      b.task ? h('p', { class: 'card-instr' }, T(b.task[rl] || b.task)) : null,
      h('div', { class: 'gap-grid' }, b.people.map(p => h('div', { class: 'gap-card' + (p.holder === rl || p.holder === 'both' ? ' gap-known' : '') },   // DV pass 3: holder "both"
        h('div', { class: 'scene-emoji', 'aria-hidden': 'true' }, p.e),
        h('div', { class: 'scene-v', lang: 'vi' }, p.name),
        p.holder === rl || p.holder === 'both'
          ? h('div', { class: 'gap-info', lang: 'vi' }, p.info)
          : h('div', { class: 'gap-ask' }, '❓ ', ...L('Hỏi bạn của bạn', 'Ask your partner'))))),
      b.phrases ? h('div', { class: 'story-gloss' }, b.phrases.map(x => h('span', { class: 'gloss-chip', lang: 'vi' }, x))) : null].filter(Boolean));   // replaceChildren(null) would print "null"
  }
  return card(b, h('div', { class: 'card-body-pad' },
    b.intro ? h('p', { class: 'card-instr' }, T(b.intro)) : null,
    h('div', { class: 'btn-row', style: 'margin-top:0' }, pick),
    box,
    h('p', { class: 'report-note' }, ...L('Không nhìn màn hình của bạn kia! Hỏi và trả lời bằng tiếng Việt.', 'Don’t look at your partner’s screen — ask and answer in Vietnamese.'))));
};

/* rubric — learner self-assessment against a task rubric (shown in the report) */
/* DV pass 3: level scores and weights — levels[k].n is the score shown (a zero line is n: 0; default k + 1);
   with criteria[].weight the total is Σ weight × n ÷ (max n), e.g. out of 100 */
const lvScore = (levels, sel) => (levels[sel - 1] && levels[sel - 1].n != null ? levels[sel - 1].n : sel);
function rubricTotal(bl, sel, levels) {
  const top = Math.max(...levels.map((l, k) => (l.n != null ? l.n : k + 1)));
  if (bl.criteria.some(c => c.weight)) {
    const pts = bl.criteria.reduce((a, c, i) => a + (c.weight || 0) * lvScore(levels, sel[i]) / top, 0);
    return Math.round(pts * 10) / 10 + ' / ' + bl.criteria.reduce((a, c) => a + (c.weight || 0), 0);
  }
  return sel.reduce((a, x) => a + lvScore(levels, x), 0) + ' / ' + top * bl.criteria.length;
}
R.rubric = b => {
  const key = b.id;
  if (!b.criteria) {   // DV pass 3: shared: the same rubric as another block (rated there)
    const src = b.shared && byId(b.shared);
    return card(b, h('div', { class: 'card-body-pad' }, src ? h('p', { class: 'report-note' }, ...L('Cùng bảng tiêu chí như phần trên: ', 'Same rubric as above: '), T(src.title)) : null));
  }
  reg(key, XP.cando, 'cando');
  const sel = S.rubric[key] = S.rubric[key] || [];
  const levels = b.levels || C.rubricLevels;
  const total = h('div', { class: 'report-note', 'aria-live': 'polite' });
  const upd = () => {
    const n = sel.filter(Boolean).length;
    total.textContent = n === b.criteria.length
      ? 'Tổng · Total: ' + rubricTotal(b, sel, levels)
      : n + ' / ' + b.criteria.length + ' tiêu chí · criteria rated';
  };
  const rows = b.criteria.map((c, i) => {
    const grp = h('div', { class: 'rub-levels', role: 'radiogroup', 'aria-label': c.en || c.vi });
    levels.forEach((lv, n) => {
      const bt = h('button', { class: 'rub-btn', type: 'button', role: 'radio', 'aria-checked': String(sel[i] === n + 1) },
        h('span', { class: 'rub-lv' }, (lv.n != null ? lv.n : n + 1) + ' · ' + lv.vi, lv.en ? h('span', { class: 'en' }, ' · ' + lv.en) : null), c.desc && c.desc[n] ? h('span', { class: 'rub-desc' }, c.desc[n]) : null);
      bt.addEventListener('click', () => {
        sel[i] = n + 1;
        grp.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-checked', String(j === n)));
        save(); upd();
        if (b.criteria.every((_, k) => sel[k])) finish(key, XP.cando, 1);
      });
      grp.append(bt);
    });
    return h('div', { class: 'rub-row' }, h('div', { class: 'rub-crit' }, h('strong', { lang: 'vi' }, c.vi), c.en ? h('span', { class: 'en' }, ' · ' + c.en) : null, c.weight ? h('span', { class: 'rub-w' }, ' (' + c.weight + ')') : null), grp);
  });
  upd();
  return card(b, h('div', { class: 'card-body-pad' }, b.task ? h('p', { class: 'card-instr' }, T(b.task)) : null, rows, total), '+' + XP.cando + ' XP');
};
function rubricRows() {
  const out = [];
  allBlocks().forEach(bl => {   // DV pass 3: nested rubrics too; shared rubrics are rated in their source block
    if (bl.type !== 'rubric' || !bl.criteria) return;
    const sel = S.rubric[bl.id] || [], levels = bl.levels || C.rubricLevels;
    out.push({ title: bl.title, rows: bl.criteria.map((c, i) => ({ c: c.vi, lv: sel[i] ? lvScore(levels, sel[i]) + ' · ' + levels[sel[i] - 1].vi : '—' })),
      total: sel.filter(Boolean).length === bl.criteria.length ? rubricTotal(bl, sel, levels) : '—' });
  });
  return out;
}
/* completion code for the LMS: short, deterministic from name + lesson + XP + mastery */
function completionCode() {
  if (!BOOK.codePrefix) return null;
  const str = (prefs.name || '').trim().toLowerCase() + '|' + C.id + '|' + S.xp + '|' + S.mastery;
  let x = 2166136261;
  for (const ch of str) { x ^= ch.codePointAt(0); x = Math.imul(x, 16777619) >>> 0; }
  return BOOK.codePrefix + '-' + String(C.id).padStart(2, '0') + '-' + S.mastery + '-' + x.toString(36).toUpperCase().slice(-5);
}
function renderBlock(b) {
  const f = R[b.type];
  if (!f) { console.warn('[bv] unknown block type:', b.type); return null; }
  const el = f(b);
  /* DV pass 3: nested tasks — rendered after the block body, registered under the task (view filter), hidden with it */
  if (el && b.tasks && b.tasks.length) {
    const parent = currentBlock;
    const wrap = h('div', { class: 'dv-tasks' });
    b.tasks.forEach(t => {
      currentBlock = t;
      const tel = renderBlock(t);
      currentBlock = parent;
      if (!tel) return;
      tel.classList.add('dv-task');
      if (t.route) tel.dataset.route = t.route;
      BLOCK_EL.set(t, tel);
      tel.hidden = !shown(t);
      wrap.append(tel);
    });
    (el.querySelector(':scope > .story-tasks') || el).append(wrap);
  }
  return el;
}
const allBlocks = () => C.tabs.flatMap(t => t.blocks.flatMap(b => [b].concat(b.tasks || [])));   // DV pass 3: with nested tasks

/* ═══════════════════════════════════════
   PAGE: hero, tabs, toast
═══════════════════════════════════════ */
function toggleBtn(label, aria, on, cb) {
  const b = h('button', { class: 'tool-btn', type: 'button', 'aria-pressed': String(!!on), 'aria-label': aria, title: aria }, label);
  b.addEventListener('click', () => { const v = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(v)); cb(v); });
  return b;
}
function applyPrefs() { document.body.classList.toggle('hide-en', !prefs.showEn); }
function buildHero() {
  return h('div', { class: 'chapter-hero' },
    THEME.brand || THEME.logo ? h('div', { class: 'dv-brand' },
      THEME.logo ? h('img', { class: 'dv-logo', src: THEME.logo, alt: '', width: '28', height: '28' }) : null,
      THEME.brand ? h('span', { class: 'dv-brand-name' }, THEME.brand) : null) : null,
    BOOK.home ?h('a', { class: 'breadcrumb', href: BOOK.home.href }, '← ', L(BOOK.home.vi, BOOK.home.en)) : null,
    h('div', { class: 'ch-label' }, BOOK.unit.vi + ' ' + C.id + ' · ' + BOOK.unit.en + ' ' + C.id,
      BOOK.draft ? h('span', { class: 'draft-badge', title: 'Bản nháp chưa được duyệt — đừng dùng với học viên · Unreviewed draft — not for learners yet' }, 'BẢN NHÁP · DRAFT') : null),
    h('h1', { class: 'ch-title' }, h('span', { lang: 'vi' }, C.titleVi), h('span', { class: 'en', style: 'display:block;font-size:.55em;font-weight:600;color:rgba(255,255,255,.7);margin-top:6px' }, C.titleEn)),
    h('div', { class: 'hero-row' },
      h('div', { class: 'xp-bar-wrap' },
        h('div', { class: 'xp-bar-track', id: 'bvXpTrack', role: 'progressbar', 'aria-label': 'XP', 'aria-valuemin': '0', 'aria-valuemax': '100' }, h('div', { class: 'xp-bar-fill', id: 'bvXpFill' })),
        h('div', { class: 'xp-count', id: 'bvXpCount' }),
        h('div', { class: 'xp-stars', id: 'bvStars', 'aria-label': 'Stars' })),
      h('div', { class: 'hero-tools' },
        toggleBtn('EN', 'Hiện tiếng Anh · Show English', prefs.showEn, v => { prefs.showEn = v; savePrefs(); applyPrefs(); }),
        toggleBtn('🐢', 'Đọc chậm · Slow speech', prefs.slow, v => { prefs.slow = v; savePrefs(); }),
        BOOK.askVoice ? h('button', { class: 'tool-btn', type: 'button', id: 'bvVoice', title: 'Giọng đọc · Voice', 'aria-label': 'Chọn giọng đọc · Choose a voice', 'aria-haspopup': 'dialog',
          onclick: () => voiceDialog(false) }, '🎙 ' + VOICE_NAMES[prefs.voice || defaultVoice()][0]) : null,   // DV pass 2: change the voice later
        HAS_VV ? h('button', { class: 'tool-btn', type: 'button', id: 'bvDialect', title: 'Giọng Bắc / Nam · Northern / Southern forms', 'aria-label': 'Đổi Bắc / Nam · Switch Northern / Southern forms',
          onclick: () => { prefs.dialect = dia() === 'S' ? 'N' : 'S'; savePrefs(); applyDialect(); } }, '🗺 ' + DIALECTS[dia()].vi) : null)));
}
function updateHero() {
  const fill = document.getElementById('bvXpFill');
  if (!fill) return;
  const t = totals();
  const pct = t.all ? Math.min(100, Math.round(100 * S.xp / t.all)) : 0;
  fill.style.width = pct + '%';
  document.getElementById('bvXpTrack').setAttribute('aria-valuenow', String(pct));
  document.getElementById('bvXpCount').textContent = S.xp + ' / ' + t.all + ' XP';
  document.getElementById('bvStars').textContent = starStr(S.stars);
}
let toastTimer = null;
function toast(msg) {
  const t = document.getElementById('bvToast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1600);
}

const panels = {};
function fillPanel(t) {
  const wrap = panels[t.id].firstChild;
  wrap.replaceChildren();
  currentTab = t.id;
  if (t.intro) wrap.append(h('p', { class: 'tab-intro' }, T(t.intro)));
  if (t.introHtml) wrap.append(h('div', { class: 'tab-intro prose', html: t.introHtml }));   // DV pass 3
  t.blocks.forEach(b => {
    currentBlock = b;
    const el = renderBlock(b);
    currentBlock = null;
    if (!el) return;
    if (b.tier) el.dataset.tier = b.tier;     // DV: view filter
    if (b.route) el.dataset.route = b.route;
    if (b.session) el.dataset.session = b.session;   // DV pass 2: session filter
    if (b.part) el.dataset.part = b.part;
    BLOCK_EL.set(b, el);
    el.hidden = !shown(b);
    wrap.append(el);
  });
  const i = C.tabs.indexOf(t), next = C.tabs[i + 1];
  if (next) wrap.append(h('div', { class: 'next-wrap' },
    h('button', { class: 'next-btn', type: 'button', onclick: () => { showTab(next.id, true); window.scrollTo({ top: document.getElementById('bvTabs').offsetTop, behavior: 'smooth' }); } },
      'Tiếp theo: ' + next.icon + ' ' + next.label + ' →')));
  currentTab = null;
}
function showTab(id, focus) {
  stopSpeech();
  document.querySelectorAll('audio').forEach(a => a.pause());
  const t = C.tabs.find(x => x.id === id);
  if (t && t.live) fillPanel(t);      // live tabs (the report) re-render on every visit
  document.querySelectorAll('.tab-btn').forEach(b => {
    const on = b.id === 'tab-' + id;
    b.setAttribute('aria-selected', String(on));
    b.tabIndex = on ? 0 : -1;
    if (on && focus) b.focus({ preventScroll: true });
  });
  Object.entries(panels).forEach(([k, p]) => { p.hidden = k !== id; });
  try { history.replaceState(null, '', '#' + id); } catch (e) { /* file:// */ }
}
function buildTabs() {
  const bar = h('div', { class: 'tab-bar', id: 'bvTabs', role: 'tablist', 'aria-label': 'Các phần của chương · Chapter sections' });
  const out = [];
  C.tabs.forEach(t => {
    bar.append(h('button', { class: 'tab-btn', role: 'tab', type: 'button', id: 'tab-' + t.id, 'aria-controls': 'panel-' + t.id, 'aria-selected': 'false', tabindex: '-1', onclick: () => showTab(t.id, false) },
      h('span', { 'aria-hidden': 'true' }, t.icon + ' '), h('span', { lang: 'vi' }, t.label)));
    panels[t.id] = h('section', { class: 'tab-panel', role: 'tabpanel', id: 'panel-' + t.id, 'aria-labelledby': 'tab-' + t.id, hidden: true }, h('div', { class: 'content-wrap' }));
    out.push(panels[t.id]);
  });
  bar.addEventListener('keydown', e => {
    const tabs = [...bar.querySelectorAll('.tab-btn')];
    const i = tabs.indexOf(e.target.closest('.tab-btn'));
    if (i < 0) return;
    const j = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i - 1 + tabs.length) % tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : -1;
    if (j < 0) return;
    e.preventDefault();
    showTab(C.tabs[j].id, true);
  });
  return [bar, out];
}

/* VIET 101 homework: time on task — first open, then 15-s ticks while the page is visible and in use
   (input in the last 2 min, or a recording / audio / voice running) */
if (REPORT.timing) {
  S.time = S.time || { start: Date.now(), active: 0 };
  let lastInput = Date.now();
  ['pointerdown', 'keydown', 'input', 'scroll'].forEach(ev => addEventListener(ev, () => { lastInput = Date.now(); }, { capture: true, passive: true }));
  setInterval(() => {
    const busy = document.querySelector('.rec-btn.on') || (TTS.ok && speechSynthesis.speaking) || (lineAudio && !lineAudio.paused) || [...document.querySelectorAll('audio')].some(a => !a.paused);
    if (document.visibilityState !== 'visible' || (!busy && Date.now() - lastInput > 120000)) return;
    S.time.active += 15;
    saveSoon();
  }, 15000);
}

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
(function init() {
  window.BV_ENGINE = { name: 'dv', forked: '2026-10-29', markHeard };   // lets the autotest know this engine has the DV features (+ test hook)
  if (BOOK.draft) {   // DV: drafts are marked and never indexed (PIPELINE §7.4)
    document.body.classList.add('bv-draft');
    if (!document.querySelector('meta[name="robots"]')) document.head.append(h('meta', { name: 'robots', content: 'noindex' }));
  }
  const root = document.documentElement.style;
  const accent = C.color || THEME.accent;
  if (accent) root.setProperty('--ch', accent);
  if (THEME.navy) root.setProperty('--navy', THEME.navy);
  if (THEME.gold) root.setProperty('--gold', THEME.gold);
  applyPrefs();
  const [bar, panelEls] = buildTabs();
  const slot = BOOK.tabsSlot && document.getElementById(BOOK.tabsSlot);
  if (slot) slot.append(bar);
  app.append(...[buildHero(), viewBar(), voiceBanner(), slot ? null : bar, ...panelEls, h('div', { class: 'xp-toast', id: 'bvToast', role: 'status' })].filter(Boolean));
  C.tabs.forEach(fillPanel);
  recompute();
  save();
  updateVoiceBanner();
  const want = location.hash.slice(1);
  showTab(C.tabs.some(t => t.id === want) ? want : C.tabs[0].id, false);
  if (BOOK.askVoice && !prefs.voiceAsked) voiceDialog(true);   // DV pass 2: first visit → ask for the default voice (D13)
})();

})();
