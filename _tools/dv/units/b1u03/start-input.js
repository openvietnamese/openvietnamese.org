/* b1u03 map · tabs start + input */
'use strict';
const XH = require('./_h.js');
const blocks = {};
const slideType = (B, ctx, why) => { ctx.H.note(B.a.id, why); return { type: 'html' }; };

/* ── start ── */
blocks['c1-1'] = (B, { H }) => {
  const q = H.fence(B, 0).lines.map(l => H.vi(l).vi), a = H.fence(B, 1).lines.map(l => H.vi(l).vi);
  H.line(B, /^Reveal:/);
  return { items: q.map((x, i) => ({ q: x, answer: a[i] })) };
};
blocks['c1-2'] = () => ({});
blocks['h1-0'] = (B, { H }) => ({ items: XH(H).listRetrieve(B) });
blocks['h1-1'] = (B, { H }) => { H.fence(B, 0); H.linesMatching(B, /^- I can/); return { phase: 'before' }; };
blocks['c2-1'] = (B, { H }) => {
  const l = H.line(B, /^Round 2/);
  const [digits, words] = H.txt(l.text).replace(/^Round 2 \(digits on the slide\):\s*/, '').split('→').map(s => s.split('·').map(x => x.trim()));
  return { items: digits.map((d, i) => ({ q: d, answer: words[i] })), after: H.slide([H.use(Object.assign({}, l))]) };
};
['h2-1', 'c3-1', 'h3-1', 'h4-1', 'c5-1', 'h7-1', 'h8-1'].forEach(id => { blocks[id] = (B, { H }) => ({ items: XH(H).fenceArrows(B, 0) }); });
blocks['c4-1'] = (B, { H }) => ({ items: H.fence(B, 0).lines.map(l => { const t = H.vi(l, { speakers: false }).vi; const [q, a] = t.split(' → '); return { q: q.trim(), answer: a.trim() }; }) });
blocks['h5-1'] = (B, { H }) => {
  const rows = H.table(B, 0).rows.slice(1);
  return { items: rows.map(r => ({ q: H.txt(r[0]), answer: H.txt(r[1]) + ' · ' + H.txt(r[2]) })) };
};
blocks['h6-1'] = (B, { H }) => ({ items: XH(H).listRetrieve(B) });
blocks['h9-1'] = (B, { H }) => ({ items: XH(H).listRetrieve(B) });
['c6-1', 'c7-1', 'c8-1', 'c9-1'].forEach(id => { blocks[id] = (B, ctx) => slideType(B, ctx, 'class retrieval with no per-item key in content.md → shown as a slide (html), not recall-then-reveal'); });

/* ── input ── */
blocks['h1-3'] = (B, ctx) => {
  const { H } = ctx;
  const d = H.dialogue(B);
  // panel 8 thought line: L2 English from the note under the panel
  const tl = H.line(B, /^\*Thought bubble/);
  const th = d.lines.find(l => l.thought);
  if (th && tl) th.en = H.txt(tl.text).replace(/^Thought bubble · L2 route shows English:\s*/, '').replace(/^"|"$/g, '');
  const order = H.line(B, /^→ \*\*cô Hằng/);
  const ow = H.linesMatching(B, /^✗ (chú Lộc first|bà nội first)/);
  const tiles = H.bolds(order.text)[0].split('→').map(s => s.trim());
  const ages = H.table(B, 0).rows.slice(1);
  const aw = H.linesMatching(B, /^✗ (25|41|94)/);
  const hint = who => { const w = aw.find(e => e.text.includes(who)); return w ? H.txt(w.text).replace(/^✗\s*/, '') : undefined; };
  return {
    lines: d.lines, gloss: d.gloss,
    tasks: [
      { type: 'builder', id: 'h1-3-order', title: { vi: 'Đoán và nghe ý chính', en: 'Put the people in the order the guests meet them' },
        items: [{ en: 'In the order the guests meet them (panels 1–6).', tiles, answer: tiles.join(', '), hint: ow.map(e => H.txt(e.text).replace(/^✗\s*/, '')).join(' ') }] },
      { type: 'type', id: 'h1-3-ages', title: { vi: 'Nghe chi tiết', en: 'Write each person’s age in digits' },
        items: ages.map(r => ({ prompt: H.txt(r[0]), answers: [H.bolds(r[1])[0]], hint: hint(H.txt(r[0]) === 'chú Lộc' ? '25 for chú Lộc' : H.txt(r[0]) === 'bà nội' ? '41 or 18' : H.txt(r[0]) === 'cô Hằng' ? '94' : '§§') })) },
    ],
  };
};
blocks['c2-2'] = (B, { H }) => {
  const f = H.fence(B, 0);
  const q1 = H.inlineOpts(f.lines.slice(0, 4).join(' '));
  const k = H.linesMatching(B, /^→ [123]\s/);
  const why1 = {};
  H.txt(k[0].text).split('✗').slice(1).forEach(s => { const m = s.trim().match(/^([①②③])\s*·\s*(.*)$/); if (m) why1[q1.opts[H.circ(m[1])]] = m[2]; });
  const rt = [2, 3].map(n => ({ q: H.vi(f.lines.find(l => l.startsWith(n + '.'))).vi, answer: H.bolds(k[n - 1].text).join(' '), en: H.txt(k[n - 1].text.replace(/^→ \d\s*/, '').replace(/\*\*(.+?)\*\*/g, '')).trim() || undefined }));
  return {
    from: 'h1-3', panels: [2, 3, 4], record: false,
    tasks: [
      { type: 'mc', id: 'c2-2-q', title: { vi: 'Câu hỏi', en: 'Questions' }, items: [{ q: H.vi(f.lines[0]).vi, opts: q1.opts, correct: q1.opts[0], why: why1 }] },
      { type: 'retrieve', id: 'c2-2-r', title: { vi: 'Trả lời', en: 'Answer, then reveal' }, items: rt },
    ],
  };
};
blocks['h2-2'] = (B, { H }) => {
  const d = H.dialogue(B, { only: e => /^(Hà Nội|Sài Gòn|Huế|San Jose):/.test(e.lines[0]) });
  return { lines: d.lines, gloss: d.gloss };
};
blocks['h3-2'] = (B, { H }) => {
  const f = H.fence(B, 0);
  const keys = H.linesMatching(B, /^→ [12]\s/);
  return {
    from: 'h1-3', record: false,
    tasks: [{ type: 'retrieve', id: 'h3-2-check', title: { vi: 'Kiểm tra', en: 'Check · two quick questions' },
      items: f.lines.map((l, i) => ({ q: H.vi(l).vi, answer: H.bolds(keys[i].text)[0], en: H.txt(keys[i].text.replace(/^→ \d\s*\*\*.+?\*\*/, '')).trim() })) }],
  };
};
blocks['c3-5'] = (B, { H }) => { const d = H.dialogue(B); return { lines: d.lines, gloss: d.gloss }; };
blocks['c4-2'] = (B, { H }) => ({ from: 'h2-2', record: false, tasks: [{ type: 'retrieve', id: 'c4-2-q', title: { vi: 'Câu hỏi', en: 'Questions' }, items: XH(H).fenceArrows(B, 0) }] });
blocks['h4-2'] = (B, { H }) => {
  const gl = H.line(B, /^→ \*\*bà nội at twenty/);
  const gi = H.arrowItem(gl.text);
  const seg2 = XH(H).listMixed(B, /^[123]\.\s.*→/);
  const d = H.dialogue(B, { only: e => !/^Cô bé là ai\?/.test(e.lines[0]) });
  const th = d.lines.find(l => l.thought);
  const tl = H.line(B, /^\*L2 route shows English/);
  if (th && tl) th.en = H.txt(tl.text).replace(/^L2 route shows English:\s*/, '').replace(/^"|"$/g, '');
  return {
    lines: d.lines, gloss: d.gloss,
    gist: H.mc({ q: 'Who is in the photo?', key: gi.key, wrongs: gi.wrongs }),
    tasks: [{ type: 'mc', id: 'h4-2-seg2', title: { vi: 'Đoán tuổi với các bạn', en: 'Guess with the friends' }, items: seg2.mc }],
  };
};
blocks['c5-2'] = (B, { H }) => {
  const f = H.fence(B, 0);
  const segs = H.numArrows(H.line(B, /^→ 1\s/).text);
  return { from: 'h4-2', panels: [4, 5, 6, 7], record: false,
    tasks: [{ type: 'retrieve', id: 'c5-2-q', title: { vi: 'Câu hỏi', en: 'Questions' }, items: f.lines.map((l, i) => ({ q: H.vi(l).vi, answer: segs[i].key || segs[i].extra, en: segs[i].key ? segs[i].extra : '' })).map(x => (x.en ? x : (delete x.en, x))) }] };
};
blocks['h6-2'] = (B, { H }) => {
  const items = XH(H).fenceArrows(B, 0, { mc: true });
  return { from: ['h1-3', 'h4-2'], record: false,
    tasks: [{ type: 'mc', id: 'h6-2-mc', title: { vi: 'Chọn', en: 'Choose' }, items: items.filter(x => x.opts) },
      { type: 'retrieve', id: 'h6-2-r', title: { vi: 'Trả lời', en: 'Answer, then reveal' }, items: items.filter(x => !x.opts).map(x => (x.en ? x : (delete x.en, x))) }] };
};
blocks['h8-4'] = (B, { H }) => {
  const d = H.dialogue(B);
  const sq = H.line(B, /^\*Surprise question/);
  const a = H.arrowItem(sq.text);
  return { lines: d.lines, gloss: d.gloss, tasks: [{ type: 'retrieve', id: 'h8-4-q', title: { vi: 'Câu hỏi bất ngờ', en: 'Surprise question' }, items: [{ q: a.q.replace(/^Surprise question:\s*/, ''), answer: a.key, en: a.extra }] }] };
};
blocks['h8-3'] = () => ({});
blocks['c9-3'] = (B, { H }) => { const d = H.dialogue(B); return { lines: d.lines, gloss: d.gloss }; };

module.exports = { blocks };
