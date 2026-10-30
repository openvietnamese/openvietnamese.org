#!/usr/bin/env node
/* Doing Vietnamese — content.md → unit data.   Run from site/:  node _tools/dv/content-to-unit.js b1u03
 *
 * Reads instruction/doing-vietnamese/units/<id>/draft/{content.md, glossary.csv, recording-script.md} and writes
 * src/dv/b<N>/data/u<NN>.js (window.BV_CHAPTER) for the DV engine (src/dv/assets/bv.js).
 *
 * How it works
 *   1. content-lib.js parses content.md into tabs → blocks (header attributes, title, elements: ```vi fences, tables, lines).
 *   2. Every block gets the common fields straight from its header: id, type, strand, mins, where, tier, icap, session,
 *      part / prep, listen (audio=first|along), unlock, route, genre, due, segments, phases, level.
 *   3. The unit map (_tools/dv/units/<id>.js) turns each block's elements into engine fields (items, lines, body, words …)
 *      with the helpers below. Elements a map function does not consume are kept, in order, as html: those before the
 *      first consumed element become `lead`, the rest `after` — so nothing in content.md is dropped silently.
 *      "→ key" and "✗ option · why" lines always land in a collapsed "Đáp án · Key" box when they are not turned into items.
 *   4. Blocks whose engine type differs from the content type keep the content type in `kind`; the map's notes
 *      (blocks the engine cannot express as written) are printed and kept in the data file's header comment.
 *   5. Recording-script rows for blocks the recording generator does not read natively (anything but dialogue, story,
 *      reading, tonelab) are attached as `rec` (see _tools/dv/make-recording-list.js), so recorder items keep the
 *      script's file names and voices.
 * Later units: copy units/b1u03.js as a template; the library and this file stay generic.
 */
'use strict';
const fs = require('fs'), path = require('path');
const L = require('./content-lib.js');

const SITE = path.join(__dirname, '../..');
const REPO = path.join(SITE, '..');
const id = process.argv[2];
if (!/^b\d+u\d+$/.test(id || '')) { console.error('usage: node _tools/dv/content-to-unit.js b1u03'); process.exit(1); }
const book = +id.match(/^b(\d+)/)[1], unitN = +id.match(/u(\d+)$/)[1], nn = String(unitN).padStart(2, '0');
const DRAFT = path.join(REPO, 'instruction/doing-vietnamese/units', id, 'draft');
const content = L.parseContent(path.join(DRAFT, 'content.md'));
const glossary = L.parseCSV(path.join(DRAFT, 'glossary.csv'));
const recScript = L.parseRecording(path.join(DRAFT, 'recording-script.md'));
const MAP = require('./units/' + id + '.js');

/* ═══════════ helpers handed to the unit map ═══════════ */
const H = {};
H.L = L; H.txt = L.txt; H.md = L.md; H.vi = L.viLine; H.bolds = L.bolds; H.typo = L.typo;
H.glossary = glossary;
H.use = el => { if (el) el.used = true; return el; };
H.fences = B => B.els.filter(e => e.k === 'fence');
H.tables = B => B.els.filter(e => e.k === 'table');
H.lines = B => B.els.filter(e => e.k === 'line');
H.fence = (B, i) => H.use(H.fences(B)[i || 0]);
H.table = (B, i) => H.use(H.tables(B)[i || 0]);
H.line = (B, re) => H.use(H.lines(B).find(e => re.test(e.text)));
H.linesMatching = (B, re) => H.lines(B).filter(e => re.test(e.text)).map(H.use);
H.say = raw => { const v = L.viLine(raw); return v.vi; };
H.strip = s => L.txt(s).replace(/^\d+\.\s+/, '');
const CIRC = '①②③④⑤⑥⑦⑧⑨';
H.circ = c => CIRC.indexOf(c);

/* "N. stem ① a ② b ③ c" → { n, stem, opts } (options run to the next circled digit / end of line) */
H.inlineOpts = raw => {
  const t = L.txt(raw);
  const m = t.match(/^(\d+)\.\s+(.*)$/);
  const body = m ? m[2] : t;
  const parts = body.split(/\s*[①②③④⑤]\s*/);
  return { n: m ? +m[1] : null, stem: parts[0].trim(), opts: parts.slice(1).map(x => x.trim()) };
};
/* "N ✗ ② · why ✗ ③ · why" (or "✗ ②, ③ · why") → { n, why: { '②': why } } */
H.whyLine = raw => {
  const t = L.txt(raw);
  const m = t.match(/^(\d+)\s+(✗.*)$/);
  if (!m) return null;
  const why = {};
  m[2].split('✗').map(x => x.trim()).filter(Boolean).forEach(seg => {
    const s = seg.match(/^([①②③④⑤,\s]+?)\s*·\s*(.*)$/);
    if (s) [...s[1].replace(/[,\s]/g, '')].forEach(c => { why[c] = s[2].trim(); });
  });
  return { n: +m[1], why };
};
/* "q → **key** (extra) ✗ wrong · why ✗ wrong2 · why" → { q, key, extra, wrongs: [{ opt, why }] } */
H.arrowItem = raw => {
  const s = L.stripComments(raw).replace(/^\d+\.\s+/, '');
  const m = s.match(/^(.*)→\s*(\*\*.+)$/);
  if (!m) return null;
  const [main, ...wr] = m[2].split('✗');
  const key = L.bolds(main).join(' ').replace(/\s*·\s*$/, '').replace(/^·\s*/, '').trim();
  const extra = L.txt(main.replace(/\*\*(.+?)\*\*/g, '')).replace(/^[·\s]+|[·\s]+$/g, '');
  const wrongs = wr.map(x => { const p = x.split(' · '); return { opt: L.txt(p[0]).replace(/^"|"$/g, '').trim(), why: L.txt(p.slice(1).join(' · ')).trim() }; });
  return { q: L.txt(m[1]).replace(/\s*→\s*$/, '').trim(), key, extra, wrongs };
};
/* "→ 1 **a** (x) · 2 **b** ✗ y · why · 3 …" → [{ n, key, extra, wrongs }] */
H.numArrows = raw => {
  const s = L.stripComments(raw).replace(/^→\s*/, '');
  return s.split(/\s·\s(?=\d+\s+(?:\*|[①②③]))/).map(seg => {
    const m = seg.match(/^(\d+)\s+(.*)$/);
    if (!m) return null;
    const [main, ...wr] = m[2].split('✗');
    const key = L.bolds(main).join(' ').replace(/\s+·\s*$/, '').replace(/^·\s*/, '').replace(/\s·\s·\s/g, ' · ').trim();
    const extra = L.txt(main.replace(/\*\*(.+?)\*\*/g, ' ')).replace(/^[·\s]+|[·\s]+$/g, '').replace(/\s{2,}/g, ' ');
    const wrongs = wr.map(x => { const p = x.split(' · '); return { opt: L.txt(p[0]).replace(/^"|"$/g, '').trim(), why: L.txt(p.slice(1).join(' · ')).trim() }; });
    return { n: +m[1], key: key.replace(/\s{2,}/g, ' '), extra, wrongs, raw: seg };
  }).filter(Boolean);
};
/* multiple choice from a key + its "✗ wrong · why" options; borrow: [options] when the source lists none */
H.mc = (o) => {
  const opts = [o.key].concat(o.wrongs.map(w => w.opt)).concat(o.borrow || []);
  const why = {};
  o.wrongs.forEach(w => { if (w.why) why[w.opt] = w.why; });
  const it = { q: o.q, opts: [...new Set(opts)], correct: o.key };
  if (o.say) it.say = o.say;
  if (o.en) it.en = o.en;
  if (Object.keys(why).length) it.why = why;
  if (o.extra) it.explain = o.extra;
  return it;
};

/* ── html for unused elements (lead / after / slides) ── */
function viLinesHtml(lines, o) {
  o = o || {};
  return '<ul class="vi-lines" lang="vi">' + lines.map(raw => {
    const v = L.viLine(raw, { speakers: o.speakers !== false });
    let rest = L.stripComments(raw).trim();
    if (v.num != null) rest = rest.replace(/^\d+\.\s+/, '');
    if (v.spk) rest = rest.slice(rest.indexOf(':') + 1).trim();
    const dm = rest.match(/^\(([^)]{1,20})\)\s*/u);
    if (dm && (v.dir || v.thought)) rest = rest.slice(dm[0].length);
    const shown = (v.num != null ? v.num + '. ' : '') + (v.spk ? '<span class="spk-n">' + L.escHtml(v.spk) + ':</span> ' : '') +
      (v.thought ? '<em>(nghĩ)</em> ' : '') + (v.dir ? '<em>(' + L.escHtml(v.dir) + ')</em> ' : '') + L.md(rest);
    const say = v.vi.replace(/_{2,}/g, '…');
    return '<li>' + (/\p{L}/u.test(say) && o.tts !== false ? '<button class="tts" type="button" data-say="' + L.escAttr(say) + '" aria-label="Nghe · Listen">🔊</button> ' : '') + shown + '</li>';
  }).join('') + '</ul>';
}
H.viLinesHtml = viLinesHtml;
function tableHtml(rows, blank) {
  const cell = (c, tag) => '<' + tag + '>' + (blank && /→/.test(c) ? '…' : L.md(c.replace(/^→\s*/, ''))) + '</' + tag + '>';
  return '<div class="dv-table"><table>' + rows.map((r, i) => '<tr>' + r.map(c => cell(c, i ? 'td' : 'th')).join('') + '</tr>').join('') + '</table></div>';
}
H.tableHtml = tableHtml;
const keyBox = inner => '<details class="dv-key"><summary>Đáp án · Key</summary>' + inner + '</details>';
H.keyBox = keyBox;
function slide(els) {
  const out = [];
  let keys = [], list = [];
  const flushK = () => { if (keys.length) { out.push(keyBox(keys.map(k => '<p>' + L.md(k) + '</p>').join(''))); keys = []; } };
  const flushL = () => { if (list.length) { out.push('<ul>' + list.map(x => '<li>' + L.md(x) + '</li>').join('') + '</ul>'); list = []; } };
  for (const e of els) {
    if (e.k === 'line' && /^(→|✗|\d+\s*(→|✗))/.test(e.text)) { flushL(); keys.push(e.text); continue; }
    flushK();
    if (e.k === 'line' && /^- /.test(e.text)) { list.push(e.text.slice(2)); continue; }
    flushL();
    if (e.k === 'fence') out.push(viLinesHtml(e.lines, { speakers: e.speakers }));
    else if (e.k === 'table') out.push(e.rows.some(r => r.some(c => /→/.test(c))) ? tableHtml(e.rows, true) + keyBox(tableHtml(e.rows)) : tableHtml(e.rows));
    else if (/^\*\*[^*]+\*\*\s*$/.test(e.text)) out.push('<p class="dv-h">' + L.md(e.text) + '</p>');
    else out.push('<p>' + L.md(e.text) + '</p>');
  }
  flushK(); flushL();
  return out.join('\n');
}
H.slide = els => slide(els);
H.slideOf = B => slide(B.els.filter(e => !e.used).map(H.use));

/* dialogue lines from a block's fences, with "**Panel N** · *direction*" lines as panel rows */
H.dialogue = (B, o) => {
  o = o || {};
  const lines = [], gloss = [];
  for (const e of B.els) {
    if (e.used) continue;
    if (e.k === 'line' && /^\*\*Panel \d+\*\*/.test(e.text)) { H.use(e); lines.push({ panel: L.txt(e.text) }); continue; }
    if (e.k !== 'fence' || (o.only && !o.only(e)) || e.lang !== 'vi') continue;
    H.use(e);
    for (const raw of e.lines) {
      const v = L.viLine(raw);
      const ln = { spk: v.spk || o.spk || '', vi: v.vi };
      if (v.dir) ln.dir = v.dir;
      if (v.thought) ln.thought = true;
      v.gloss.forEach(g => { if (!gloss.some(x => x[0] === g[0])) gloss.push(g); });
      lines.push(ln);
    }
  }
  return { lines, gloss };
};
/* story body from fences: "Name: text" → dialogue line, else narration */
H.body = (B, fences) => {
  const body = [], gloss = [];
  for (const e of fences || H.fences(B)) {
    H.use(e);
    for (const raw of e.lines) {
      const v = L.viLine(raw);
      v.gloss.forEach(g => { if (!gloss.some(x => x[0] === g[0])) gloss.push(g); });
      body.push(v.spk ? { t: 'd', sp: v.spk, s: v.vi } : { t: 'n', s: v.vi });
    }
  }
  return { body, gloss };
};

/* ═══════════ build ═══════════ */
const NUMERIC = ['mins'];
const COMMON = ['strand', 'mins', 'where', 'tier', 'icap', 'session', 'part', 'route', 'genre', 'due', 'segments', 'phases', 'unlock', 'level', 'deck'];
function common(B) {
  const a = B.a, o = { id: a.id, type: a.type };
  for (const k of COMMON) if (a[k] != null) o[k] = NUMERIC.includes(k) ? +a[k] : a[k];
  if (o.route === 'both') delete o.route;
  if (a.prep === 'true') { o.prep = true; o.part = o.part || 'A'; }
  if (a.audio) o.listen = a.audio;
  if (a.segments) o.segments = +a.segments;
  return o;
}
const notes = [];   // blocks the engine cannot express as written (printed + kept in the data header)
H.note = (bid, msg) => notes.push(bid + ': ' + msg);
const ctx = { unit: id, book, n: unitN, H, all: {}, content, recScript };
content.tabs.forEach(t => t.blocks.forEach(B => { ctx.all[B.a.id] = B; }));

const tabs = [];
const unmapped = [];
for (const t of content.tabs) {
  const tab = { id: t.id, icon: t.icon, label: t.label, blocks: [] };
  if (MAP.tabs && MAP.tabs[t.id]) Object.assign(tab, MAP.tabs[t.id](t, ctx));
  for (const B of t.blocks) {
    const f = MAP.blocks[B.a.id];
    if (!f) { unmapped.push(B.a.id); continue; }
    const base = common(B);
    const title = (MAP.titles && MAP.titles[B.a.id]) || L.splitTitle(B.title);
    const out = f(B, ctx, base) || {};
    const blk = Object.assign(base, out);
    if (blk.type !== B.a.type && !blk.kind) blk.kind = B.a.type;
    if (blk.type === 'story' || (blk.type === undefined)) { blk.titleVi = blk.titleVi || title.vi; blk.titleEn = blk.titleEn || title.en; }
    else if (!blk.title) blk.title = title.en ? { vi: title.vi, en: title.en } : title.vi;
    // section heading ("## T3 · …") that precedes the block
    const sec = B.section ? '<p class="dv-h">' + L.md(B.section[0]) + '</p>' + slide(L.elements(B.section.slice(1))) : '';
    // unused elements → lead (before the first used one) / after
    const els = B.els;
    const first = els.findIndex(e => e.used);
    const before = els.filter((e, i) => !e.used && (first < 0 || i < first)), later = els.filter((e, i) => !e.used && first >= 0 && i > first);
    if (blk.lead === undefined) blk.lead = slide(before.map(H.use));
    if (blk.after === undefined) blk.after = slide(later.map(H.use));
    if (sec) blk.lead = sec + (blk.lead || '');
    if (!blk.lead) delete blk.lead;
    if (!blk.after) delete blk.after;
    if (blk.type === 'html' && blk.html === undefined) { blk.html = [blk.lead, blk.after].filter(Boolean).join('\n'); delete blk.lead; delete blk.after; }
    // recording rows for blocks the generator does not read natively
    const rows = recScript[B.a.id];
    if (rows && !['dialogue', 'story', 'reading'].includes(blk.type) && blk.rec === undefined) {
      const by = {};
      rows.forEach(r => { (by[r.n] = by[r.n] || []).push(r); });
      blk.rec = Object.entries(by).map(([n, rs]) => {
        const o = { n };
        rs.forEach(r => { if (r.suffix === 'guest') { o.guest = { actor: r.actor, dialect: r.dialect === 'S' ? 'S' : 'N', text: r.text }; } else o[r.suffix] = r.text; });
        if (rs[0].speaker && rs[0].speaker !== '—') o.speaker = rs[0].speaker;
        return o;
      });
    }
    tab.blocks.push(blk);
  }
  tabs.push(tab);
}
if (unmapped.length) { console.error('unmapped blocks: ' + unmapped.join(', ')); process.exit(1); }

const C = Object.assign({ id: unitN }, MAP.chapter(ctx), { tabs });
// typography + NFC over every string
const walk = x => (typeof x === 'string' ? L.typo(L.NFC(x)) : Array.isArray(x) ? x.map(walk) : x && typeof x === 'object' ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, walk(v)])) : x);
const data = walk(C);

const outDir = path.join(SITE, 'src/dv/b' + book + '/data');
fs.mkdirSync(outDir, { recursive: true });
const nBlocks = tabs.reduce((a, t) => a + t.blocks.length, 0);
const head = '/* Doing Vietnamese ' + book + ' · Bài ' + unitN + ' — ' + data.titleVi + ' · ' + data.titleEn + '\n' +
  '   GENERATED by _tools/dv/content-to-unit.js ' + id + ' from instruction/doing-vietnamese/units/' + id + '/draft/content.md\n' +
  '   (unit map: _tools/dv/units/' + id + '.js). Do not edit by hand: fix content.md or the map, then regenerate.\n' +
  '   ' + nBlocks + ' blocks in ' + tabs.length + ' tabs. Engine: ../../assets/bv.js (DV). Shell: ../u' + nn + '.html.\n' +
  (notes.length ? '   Not expressible as written (rendered as noted):\n' + notes.map(n => '   · ' + n.replace(/\*\//g, '* /')).join('\n') + '\n' : '') +
  '   Content CC BY-NC-SA 4.0 · code MIT. */\n';
const js = head + 'window.BV_CHAPTER = ' + JSON.stringify(data, null, 1) + ';\n';
fs.writeFileSync(path.join(outDir, 'u' + nn + '.js'), js);
console.log('wrote src/dv/b' + book + '/data/u' + nn + '.js · ' + nBlocks + ' blocks · ' + (js.length / 1024).toFixed(0) + ' KB');
if (notes.length) { console.log('not expressible as written (' + notes.length + '):'); notes.forEach(n => console.log('  · ' + n)); }
