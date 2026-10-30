#!/usr/bin/env node
/* Doing Vietnamese recordings — run from site/:  node _tools/dv/make-recording-list.js
 *
 * The DV twin of _tools/ucsd/make-recording-list.js (same recorder workflow: generate items → record in the
 * recorder → download a .zip → unzip into src/dv/ → run this script again → pages play the files).
 *
 * Reads every unit src/dv/b<N>/data/u<NN>.js (window.BV_CHAPTER) with its shell u<NN>.html (window.BV_BOOK, for the
 * {campus} / {city} locale tokens), lists every recordable line, and writes
 *   src/dv/recorder/items.js         — the DV recorder's item list (published unlisted at /dv/recorder/, noindex, draft)
 *   src/dv/b<N>/data/audio/u<NN>.js  — window.BV_AUDIO for that unit: spoken text → { NF|NM|SF|SM|guest → URL },
 *                                      only files that exist; the engine plays these instead of the browser voice.
 *                                      Shells load it before bv.js: <script src="data/audio/u<NN>.js"></script>
 *
 * Recordable lines (in page order):
 *   dialogue  every line (ln.vi); thought: true lines are the whisper track, numbered t1, t2 … (other numbers unchanged)
 *   story     every body line (x.s)
 *   reading   every sentence of every paragraph (sentence = the engine's split at . ! ? …)
 *   tonelab   every item word (and every word of a minimal-pair set), as HVPT files
 * File names (unit-template §3, recording-script.md of b1u03):
 *   <unit>-<block>-<NN>-<V>.mp3       NN = 01, 02 … counting the block's recorded lines; V = NF | NM | SF | SM | guest
 *   <unit>-<block>-t<k>-<V>.mp3       whisper track (thought lines)
 *   <unit>-hvpt-<word><tone>-<V>.mp3  tonelab words: word without diacritics + tone digit
 *                                     (1 ngang, 2 huyền, 3 sắc, 4 hỏi, 5 ngã, 6 nặng: muoi2 = mười, muoi1 = mươi)
 *   unit = b<N>u<NN> (b1u03). Files live in src/dv/b<N>/audio/ (URL audio/<file> from the unit page).
 * Who records a line (first match wins):
 *   line.voice → block.cast[speaker] → BV_CHAPTER.cast[speaker] → item / block recVoices → all four voices.
 *   A voice is "NF" | "NM" | "SF" | "SM", or a guest actor { actor: "G-BA", dialect: "S", note? } (file suffix "guest";
 *   a plain string that is not one of the four is a guest actor tag with dialect N).
 *   recVoices: ["NF", "NM"] limits a block (or a tonelab item) to those voices (e.g. hỏi/ngã tone ID: NF NM only).
 *   Lines with one fixed voice (a cast member) play for every learner, whatever their dialect; four-voice lines play the
 *   learner's own voice (else the same dialect, else any).
 * {{N|S}} variants are resolved for the voice's dialect, so every item shows exactly what that voice says.
 *
 * The recorder (src/dv/recorder/index.html, copy of src/ucsd/recorder/index.html) makes the speaker pick a voice —
 * one of the four, or a guest actor tag — and lists only that voice's lines; each take is saved as <item>-<V>.mp3.
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const SITE = path.join(__dirname, '../..');
const ROOT = path.join(SITE, 'src/dv');
const VOICES = ['NF', 'NM', 'SF', 'SM'];
const VOICE_NAME = { NF: 'Bắc · nữ', NM: 'Bắc · nam', SF: 'Nam · nữ', SM: 'Nam · nam' };
const TONE_DIGIT = { ngang: 1, 'huyền': 2, 'sắc': 3, 'hỏi': 4, 'ngã': 5, 'nặng': 6 };

const VV = /\{\{([^{}|]*)\|([^{}|]*)\}\}/g;
const resolve = (s, d) => String(s).replace(VV, (m, n, so) => (d === 'S' ? so : n));
const strip = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';
const sentences = p => String(p).split(/(?<=[.!?…])\s+(?=\S)/).filter(Boolean);   // same split as the engine's reading block
function toneOf(w) {
  if (/\s/.test(String(w).trim())) return null;
  const m = String(w).normalize('NFD').match(/[\u0300\u0301\u0303\u0309\u0323]/);
  return !m ? 'ngang' : { '\u0300': 'huyền', '\u0301': 'sắc', '\u0309': 'hỏi', '\u0303': 'ngã', '\u0323': 'nặng' }[m[0]];
}
const two = n => String(n).padStart(2, '0');

// a voice spec → { tag, suffix, dialect, actor }
function voiceOf(v, fallbackDialect) {
  if (VOICES.includes(v)) return { tag: v, suffix: v, dialect: v[0], actor: '' };
  if (v && typeof v === 'object') return { tag: v.actor || 'guest', suffix: 'guest', dialect: v.dialect === 'S' ? 'S' : 'N', actor: v.actor || 'guest', note: v.note || '' };
  if (typeof v === 'string' && v) return { tag: v, suffix: 'guest', dialect: fallbackDialect || 'N', actor: v };
  return null;
}

// run a unit's data file (and its shell's BV_BOOK script) in a sandbox
function loadUnit(dataFile, shellFile) {
  const win = {};
  const ctx = vm.createContext({ window: win, console });
  if (fs.existsSync(shellFile)) {
    const html = fs.readFileSync(shellFile, 'utf8');
    for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) if (/BV_BOOK/.test(m[1])) vm.runInContext(m[1], ctx);
  }
  vm.runInContext(fs.readFileSync(dataFile, 'utf8'), ctx, { filename: dataFile });
  const C = win.BV_CHAPTER, locale = (win.BV_BOOK && win.BV_BOOK.locale) || {};
  const loc = s => String(s).replace(/\{(\w+)\}/g, (m, k) => (Object.prototype.hasOwnProperty.call(locale, k) ? String(locale[k]) : m));
  return { C, book: win.BV_BOOK || {}, loc };
}

const items = [], report = [];
const books = fs.readdirSync(ROOT).filter(d => /^b\d+$/.test(d) && fs.existsSync(path.join(ROOT, d, 'data'))).sort();
for (const bk of books) {
  const dataDir = path.join(ROOT, bk, 'data');
  for (const f of fs.readdirSync(dataDir).filter(f => /^u\d+\.js$/.test(f)).sort()) {
    const page = f.replace(/\.js$/, '');                       // u03
    const unit = bk + page;                                     // b1u03
    const { C, loc } = loadUnit(path.join(dataDir, f), path.join(ROOT, bk, page + '.html'));
    if (!C || !C.tabs) { console.warn('skip ' + bk + '/' + f + ': no BV_CHAPTER'); continue; }
    const title = (C.titleVi || page) + (C.titleEn ? ' · ' + C.titleEn : '');
    const day = 'DV' + bk.slice(1) + ' · Bài ' + Number(page.slice(1));
    const audio = {};   // text → { suffix → url }
    const unitItems = [];
    // one recorded line: text (with variants), the voices that record it, its file stem
    const add = (o) => {
      const fixed = o.voices.length === 1;
      for (const v of o.voices) {
        const text = strip(loc(resolve(o.text, v.dialect)));
        if (!text) continue;
        const stem = bk + '/audio/' + o.stem;
        const file = stem + '-' + v.suffix + '.mp3';
        const have = fs.existsSync(path.join(ROOT, file));
        unitItems.push({ page: unit, day, title, section: o.section, note: o.note || (v.note ? v.note : 'Đọc rõ ràng, tự nhiên · Read clearly and naturally.'),
          file: stem, speaker: o.speaker || '', actor: v.actor || '', text, say: text, want: [v.tag], suffix: v.suffix,
          dialect: v.dialect, voices: have ? [v.tag] : [] });
        if (!have) continue;
        const url = 'audio/' + o.stem + '-' + v.suffix + '.mp3';
        // a fixed-voice line plays for every learner: register its text in both dialects
        const texts = fixed ? [...new Set(['N', 'S'].map(d => strip(loc(resolve(o.text, d)))))] : [text];
        for (const t of texts) (audio[t] = audio[t] || {})[v.suffix] = audio[t][v.suffix] || url;
      }
    };
    const cast0 = C.cast || {};
    const castVoice = (b, spk, line) => voiceOf(line && line.voice) || voiceOf((b.cast || {})[spk]) || voiceOf(cast0[spk]);
    const allVoices = (b, it) => ((it && it.recVoices) || b.recVoices || VOICES).map(v => voiceOf(v)).filter(Boolean);
    const sec = b => plain(b) + ' — ' + (b.id || b.type);
    function plain(b) { const t = b.titleVi || (b.title && (b.title.vi || b.title)) || b.type; return strip(loc(resolve(t, 'N'))); }
    const hvptSeen = new Set();
    C.tabs.forEach((t, ti) => (t.blocks || []).forEach((b, bi) => {
      if (b.record === false) return;
      if (b.type === 'reading' && !b.id) b.id = 'rd' + (ti + 1) + '-' + (bi + 1);   // the engine's positional id for a reading without one   // a block can opt out (e.g. it replays another block's files)
      if (b.type === 'dialogue') {
        let n = 0, k = 0;
        b.lines.forEach(ln => {
          const cv = castVoice(b, ln.spk, ln);
          const id = ln.thought ? 't' + (++k) : two(++n);
          add({ stem: unit + '-' + b.id + '-' + id, text: ln.vi, voices: cv ? [cv] : allVoices(b), section: sec(b), speaker: ln.spk + (ln.thought ? ' (nghĩ · thought, whisper)' : ''),
            note: ln.thought ? 'Thì thầm, như đang nghĩ · Whisper, as a thought.' : null });
        });
      }
      if (b.type === 'story') {
        let n = 0;
        b.body.forEach(x => {
          const cv = x.t === 'd' ? castVoice(b, x.sp, x) : voiceOf(x.voice);
          add({ stem: unit + '-' + b.id + '-' + two(++n), text: x.s, voices: cv ? [cv] : allVoices(b), section: sec(b), speaker: x.t === 'd' ? x.sp : 'narrator' });
        });
      }
      if (b.type === 'reading') {
        let n = 0;
        b.vi.forEach(p => sentences(p).forEach(s => add({ stem: unit + '-' + b.id + '-' + two(++n), text: s, voices: allVoices(b), section: sec(b), speaker: 'narrator' })));
      }
      if (b.type === 'tonelab') b.items.forEach(it => {
        const words = [it.word].concat(Array.isArray(it.set) ? it.set : []);
        words.forEach(w0 => {
          const w = strip(resolve(w0, 'N'));
          const tn = w === strip(resolve(it.word, 'N')) && it.tone ? it.tone : toneOf(w);
          const stem = unit + '-hvpt-' + slug(w).replace(/-/g, '') + (TONE_DIGIT[tn] || '');
          if (hvptSeen.has(stem)) return;
          hvptSeen.add(stem);
          add({ stem, text: w0, voices: allVoices(b, it), section: 'Thanh điệu · HVPT — ' + (b.id || 'tonelab'), speaker: '',
            note: 'Đọc một từ, rõ, tự nhiên, không kéo dài · Say the single word clearly and naturally.' });
        });
      });
    }));
    items.push(...unitItems);
    const aDir = path.join(dataDir, 'audio');
    fs.mkdirSync(aDir, { recursive: true });
    fs.writeFileSync(path.join(aDir, page + '.js'),
      '/* GENERATED by _tools/dv/make-recording-list.js — do not edit by hand.\n   Doing Vietnamese ' + unit + ': recorded files by spoken text (only files that exist); the engine plays the learner’s voice,\n   else one of the same dialect, else any, instead of the browser voice. */\nwindow.BV_AUDIO = ' + JSON.stringify(audio, null, 1) + ';\n');
    const tags = [...new Set(unitItems.map(x => x.want[0]))];
    report.push('  ' + unit + ': ' + unitItems.length + ' takes · ' + tags.map(tg => tg + ' ' + unitItems.filter(x => x.want[0] === tg && x.voices.length).length + '/' + unitItems.filter(x => x.want[0] === tg).length).join(' · '));
  }
}
const out = path.join(ROOT, 'recorder');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'items.js'),
  '/* GENERATED by _tools/dv/make-recording-list.js — do not edit by hand.\n   Doing Vietnamese · Open Vietnamese Initiative — content CC BY-NC-SA 4.0 · code MIT. Draft: not for learners yet. */\nwindow.REC_ITEMS = ' + JSON.stringify(items, null, 1) + ';\n');
console.log(items.length + ' takes in ' + report.length + ' unit(s) → src/dv/recorder/items.js');
report.forEach(r => console.log(r));
