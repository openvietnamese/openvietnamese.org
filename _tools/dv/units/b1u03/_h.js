/* Shared patterns for the b1u03 map (generic enough to reuse for later units). */
'use strict';
const say = H => s => { const m = String(s).match(/🔊\s*\*([^*]+)\*/); return m ? H.txt(m[1]) : null; };
const noSay = (H, q) => H.txt(String(q).replace(/🔊\s*\*[^*]+\*\s*(→\s*)?/, '')).replace(/^→\s*/, '').trim();

module.exports = H => {
  const X = {};
  /* numbered fence questions + one "→ 1 **a** · 2 **b**" line → retrieve items (or mc where a segment lists ✗ options) */
  X.fenceArrows = (B, fi, o) => {
    o = o || {};
    const qs = H.fence(B, fi || 0).lines.map(l => H.vi(l, { speakers: false }));
    const segs = H.linesMatching(B, /^→\s*\d+\s/).flatMap(e => H.numArrows(e.text));
    return qs.map((q, i) => {
      const s = segs.find(x => x.n === (q.num || i + 1));
      if (!s) return null;
      if (o.mc && s.wrongs.length) return H.mc({ q: q.vi, key: s.key, wrongs: s.wrongs, extra: s.extra });
      return { q: q.vi, answer: s.key || s.extra, en: s.key ? [s.extra, ...s.wrongs.map(w => '✗ ' + w.opt + (w.why ? ' · ' + w.why : ''))].filter(Boolean).join(' ') : '' };
    }).filter(Boolean);
  };
  /* "N. … → **key** …" lines → retrieve items ({ q, say?, answer, en }) */
  X.listRetrieve = B => H.linesMatching(B, /^\d+\.\s.*→/).map(e => {
    const a = H.arrowItem(e.text);
    const it = { q: noSay(H, a.q) || a.q, answer: a.key, en: [a.extra, ...a.wrongs.map(w => '✗ ' + w.opt + (w.why ? ' · ' + w.why : ''))].filter(Boolean).join(' ') };
    const sy = say(H)(e.text);
    if (sy) it.say = sy;
    if (!it.en) delete it.en;
    return it;
  });
  /* "N. … → **key** ✗ x · why" lines → mc items when ✗ options exist, else retrieve items; returns { mc: [], rt: [] } */
  X.listMixed = (B, re) => {
    const out = { mc: [], rt: [] };
    H.linesMatching(B, re || /^\d+\.\s.*→/).forEach(e => {
      const a = H.arrowItem(e.text);
      const sy = say(H)(e.text);
      const q = noSay(H, a.q) || a.q;
      if (a.wrongs.length) out.mc.push(H.mc({ q, say: sy, key: a.key, wrongs: a.wrongs, extra: a.extra }));
      else out.rt.push(Object.assign({ q, answer: a.key }, a.extra ? { en: a.extra } : {}, sy ? { say: sy } : {}));
    });
    return out;
  };
  /* inline-option fence ("N. stem ① a ② b") + "→ all **①**" + "N ✗ ② · why" lines → mc items */
  X.inlineMc = (B, fi, keys) => {
    const f = H.fence(B, fi || 0);
    const all = H.line(B, /^→ all \*\*/);
    const kAll = all ? H.circ(H.bolds(all.text)[0]) : null;
    const whys = H.linesMatching(B, /^\d+\s+✗/).map(e => H.whyLine(e.text));
    return f.lines.map((l, i) => {
      const o = H.inlineOpts(l);
      const k = keys && keys[o.n] != null ? keys[o.n] : kAll;
      const it = { q: o.stem, opts: o.opts, correct: o.opts[k] };
      const w = whys.find(x => x.n === o.n);
      if (w) { const why = {}; Object.entries(w.why).forEach(([c, t]) => { if (o.opts[H.circ(c)]) why[o.opts[H.circ(c)]] = t; }); if (Object.keys(why).length) it.why = why; }
      return it;
    });
  };
  X.say = say(H);
  X.noSay = q => noSay(H, q);
  return X;
};
