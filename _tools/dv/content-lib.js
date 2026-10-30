/* Doing Vietnamese — content.md parsing library (used by _tools/dv/content-to-unit.js and the per-unit maps in _tools/dv/units/).
 *
 * content.md (unit-template §3): tabs "# Tab N · ICON Label · `id`", blocks "<!-- block id=… tab=… type=… … -->" + "### title",
 * ```vi fences (speaker lines "Name: text", variants {{N|S}}, glosses |word|gloss|), tables, "→ **key**" and "✗ option · why" lines.
 * Nothing here knows a particular unit; the unit map decides which engine block each content block becomes.
 */
'use strict';
const fs = require('fs');

const NFC = s => String(s).normalize('NFC');
const VV = /\{\{([^{}|]*)\|([^{}|]*)\}\}/g;

/* ── protect {{N|S}} variants while splitting on "|" ── */
function protect(s) {
  const keep = [];
  const out = String(s).replace(VV, m => { keep.push(m); return '\u0001' + (keep.length - 1) + '\u0002'; });
  return { s: out, back: x => String(x).replace(/\u0001(\d+)\u0002/g, (m, i) => keep[+i]) };
}

/* ── typography: ASCII apostrophe between letters → ’ (style rule; avoids JS escaping pitfalls) ── */
const typo = s => String(s).replace(/(\p{L})'(\p{L})/gu, '$1’$2');

/* ── inline markdown ── */
const escHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = s => escHtml(s).replace(/"/g, '&quot;');
const stripComments = s => String(s).replace(/<!--[\s\S]*?-->/g, '');
// glosses |word|gloss| → callback(word, gloss)
function glossReplace(s, f) {
  const p = protect(s);
  return p.back(p.s.replace(/\|([^|\n]+?)\|([^|\n]+?)\|/g, (m, w, g) => f(p.back(w), p.back(g))));
}
// markdown → plain text (keeps {{N|S}})
function txt(s) {
  let t = stripComments(s);
  t = glossReplace(t, w => w);
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/`([^`]+)`/g, '$1');
  return typo(t.replace(/\s+/g, ' ').trim());
}
// markdown → html (keeps {{N|S}}; glosses become word + small gloss)
function md(s) {
  let t = escHtml(stripComments(s));
  t = glossReplace(t, (w, g) => '<span class="gl" lang="vi">' + w + '</span> <span class="gl-g">(' + g + ')</span>');
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, a, u) => '<a href="' + u.replace(/&amp;/g, '&') + '" target="_blank" rel="noopener">' + a + '</a>');
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
  return typo(t.trim());
}
const bolds = s => [...stripComments(s).matchAll(/\*\*(.+?)\*\*/g)].map(m => txt(m[1]));

/* ── a Vietnamese line: "Name: (dir) text with |w|g| glosses" ── */
function viLine(raw, opts) {
  opts = opts || {};
  let s = NFC(stripComments(raw)).trim();
  let spk = null, dir = null, thought = false, num = null;
  const nm = s.match(/^(\d+)\.\s+(.*)$/);
  if (nm && opts.numbered !== false) { num = +nm[1]; s = nm[2]; }
  if (opts.speakers !== false) {
    const m = s.match(/^([^:"“0-9]{1,30}?):\s+(.*)$/u);
    if (m) { spk = m[1].trim(); s = m[2]; }
  }
  const d = s.match(/^\(([^)]{1,20})\)\s*(.*)$/u);
  if (d) { if (d[1] === 'nghĩ') thought = true; else dir = d[1]; s = d[2]; }
  const gloss = [];
  s = glossReplace(s, (w, g) => { gloss.push([w.trim(), g.trim()]); return w; });
  return { num, spk, vi: typo(s.trim()), dir, thought, gloss };
}

/* ── content.md → { front, tabs: [{ id, icon, label, intro: [lines], blocks: [block] }] }
   block = { a: {attrs}, title, els: [element], section: [lines of a "## " section heading that precedes it] }
   element = { k: 'fence', lang, attrs, lines } | { k: 'table', rows } | { k: 'line', text } ── */
function parseAttrs(s) {
  const a = {};
  for (const m of s.matchAll(/([\w-]+)=("[^"]*"|\S+)/g)) a[m[1]] = m[2].replace(/^"|"$/g, '');
  return a;
}
function parseContent(file) {
  const src = NFC(fs.readFileSync(file, 'utf8'));
  const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
  const front = {};
  if (fm) for (const l of fm[1].split('\n')) { const m = l.match(/^(\w+):\s*(.*)$/); if (m) front[m[1]] = m[2].replace(/^"|"$/g, ''); }
  const lines = src.slice(fm ? fm[0].length : 0).split('\n');
  const tabs = [];
  let tab = null, blk = null, section = null, inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^```/.test(l)) inFence = !inFence;
    if (!inFence) {
      const tm = l.match(/^# Tab \d+ · (\S+) (.+?) · `([\w-]+)`/u);
      if (tm) { tab = { icon: tm[1], label: tm[2], id: tm[3], intro: [], blocks: [] }; tabs.push(tab); blk = null; section = null; continue; }
      const bm = l.match(/^<!-- block (.*?) -->\s*$/);
      if (bm && tab) { blk = { a: parseAttrs(bm[1]), title: null, raw: [], section }; section = null; tab.blocks.push(blk); continue; }
      if (/^## /.test(l) && tab) { blk = null; section = [l.replace(/^##\s+/, '')]; continue; }
      if (/^---\s*$/.test(l)) { blk = null; continue; }
      if (/^# /.test(l)) { blk = null; continue; }
      if (/^### /.test(l) && blk && !blk.title) { blk.title = l.replace(/^###\s+/, ''); continue; }
    }
    if (blk) blk.raw.push(l);
    else if (section) section.push(l);
    else if (tab && !tab.blocks.length) tab.intro.push(l);
  }
  for (const t of tabs) for (const b of t.blocks) { b.els = elements(b.raw); delete b.raw; }
  return { front, tabs };
}
function elements(raw) {
  const els = [];
  for (let i = 0; i < raw.length; i++) {
    let l = raw[i];
    const f = l.match(/^```(\S*)\s*(.*)$/);
    if (f) {
      const out = [];
      for (i++; i < raw.length && !/^```/.test(raw[i]); i++) out.push(raw[i]);
      els.push({ k: 'fence', lang: f[1], attrs: parseAttrs(f[2] || ''), lines: out.filter(x => x.trim()) });
      continue;
    }
    if (/^\s*\|/.test(l)) {
      const rows = [];
      for (; i < raw.length && /^\s*\|/.test(raw[i]); i++) {
        if (/^\s*\|[\s|:-]+\|\s*$/.test(raw[i])) continue;
        const p = protect(raw[i].trim().replace(/^\||\|$/g, ''));
        rows.push(p.s.split('|').map(c => p.back(c).trim()));
      }
      i--;
      els.push({ k: 'table', rows });
      continue;
    }
    if (/<!--/.test(l) && !/-->/.test(l)) { while (i + 1 < raw.length && !/-->/.test(l)) l += ' ' + raw[++i]; }
    const t = stripComments(l).trim();
    if (!t) continue;
    els.push({ k: 'line', text: t });
  }
  return els;
}

/* ── titles: "Vietnamese · English" (the English part starts at the first segment that reads as English) ── */
const VI_ASCII = new Set(['Ai', 'Con', 'Em', 'Anh', 'Ba', 'Hai', 'Tin', 'Vy', 'Cha', 'Sau', 'Nam', 'Lan', 'Minh', 'T1', 'T2', 'T3', 'HL']);
function splitTitle(t) {
  const parts = String(t).split(' · ');
  for (let i = 1; i < parts.length; i++) {
    const w = txt(parts[i]).split(/\s+/)[0] || '';
    if (/^[\x20-\x7E’]+$/.test(w) && !VI_ASCII.has(w.replace(/[^\w]/g, '')) && /[A-Za-z]/.test(w)) return { vi: txt(parts.slice(0, i).join(' · ')), en: txt(parts.slice(i).join(' · ')) };
  }
  return { vi: txt(t), en: '' };
}

/* ── glossary.csv ── */
function parseCSV(file) {
  const rows = [];
  let row = [], cell = '', q = false;
  const s = NFC(fs.readFileSync(file, 'utf8'));
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '"' && s[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; continue; }
    if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const head = rows.shift();
  return rows.filter(r => r.length > 1).map(r => Object.fromEntries(head.map((h, i) => [h, r[i] || ''])));
}

/* ── recording-script.md → { blockId: [{ file, n, suffix, speaker, actor, dialect, text }] } ── */
function parseRecording(file) {
  const out = {};
  const s = NFC(fs.readFileSync(file, 'utf8'));
  for (const m of s.matchAll(/^\| `((b\d+u\d+)-(.+?)-(t?\d+)-(NF|NM|SF|SM|guest)\.mp3)` \| ([^|]*) \| ([^|]*) \| ([^|]*) \| (.*) \|\s*$/gmu)) {
    const [, stem, , block, n, suffix, speaker, actorCol, dialect, text] = m;
    const actor = suffix === 'guest' ? (actorCol.trim().match(/^([A-Z][\w-]+)/) || [, 'guest'])[1] : '';
    (out[block] = out[block] || []).push({ file: stem, n, suffix, speaker: speaker.trim(), actor, dialect: dialect.trim(), text: text.trim() });
  }
  return out;
}

module.exports = { NFC, VV, protect, typo, escHtml, escAttr, stripComments, glossReplace, txt, md, bolds, viLine, parseContent, elements, splitTitle, parseCSV, parseRecording };
