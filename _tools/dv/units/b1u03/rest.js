/* b1u03 map · tabs fluency + tasks + review + report (and the talk / fluency tab intros) */
'use strict';
const XH = require('./_h.js');
const { glossDeck } = require('./lab-talk.js');
const blocks = {}, tabs = {};
const slideType = (B, ctx, why) => { ctx.H.note(B.a.id, why); return { type: 'html' }; };
const LIBS = ['lib-r1', 'lib-r2', 'lib-r5', 'lib-r3', 'lib-r6', 'lib-r4', 'lib-r8', 'lib-r7'];

tabs.talk = (t, { H }) => ({ introHtml: H.slide(H.L.elements(t.intro)) });
tabs.report = () => ({ live: true });   // re-rendered on every visit (unit-template §1.1)
tabs.fluency = (t, { H }) => ({ intro: { vi: '', en: H.txt(t.intro.filter(x => x.trim()).join(' ')) } });

/* ── fluency ── */
blocks['h1-2'] = (B, ctx) => slideType(B, ctx, 'replays the Bài 0–2 episodes, which are not in this unit’s data → instructions and key only (no player)');
blocks['h3-7'] = (B, ctx) => slideType(B, ctx, 'replays the Bài 1–2 episodes, which are not in this unit’s data → question and key only (no player)');
['c2-5', 'c4-4'].forEach(id => { blocks[id] = (B, ctx) => slideType(B, ctx, 'class lô tô with printable cards → the calls as a slide with 🔊 buttons'); });
['h5-9', 'h7-8', 'h9-10'].forEach(id => { blocks[id] = (B, ctx) => slideType(B, ctx, 'online lô tô card with a timed caller is not an engine block → instructions (and the call list) only'); });
blocks['h2-7'] = (B, { H }) => {
  /* digits from content.md; the words are the unit's number rule (rule card c1-5) */
  const W = { 11: 'mười một', 21: 'hai mươi mốt', 15: 'mười lăm', 25: 'hai mươi lăm', 14: 'mười bốn', 24: 'hai mươi tư', 40: 'bốn mươi', 50: 'năm mươi', 71: 'bảy mươi mốt', 81: 'tám mươi mốt', 99: 'chín mươi chín', 100: 'một trăm' };
  const l = H.use(H.lines(B)[0]);
  const ds = H.txt(l.text).replace(/^.*?time\.\s*/, '').split(/\s*·\s*/).map(Number);
  return { words: ds.map(d => ({ vi: W[d], en: String(d) })), lead: '<p>' + H.md(l.text.replace(/\s*11 · 21.*$/, '')) + '</p>', after: '' };
};
blocks['c3-4'] = (B, { H }) => {
  const D = { 'năm mươi hai': '52', 'bốn mươi chín': '49', 'tám mươi mốt': '81', 'mười bốn': '14', 'mười chín': '19', 'hai mươi tư': '24', '{{hai trăm linh tư|hai trăm lẻ bốn}}': '204', 'bốn trăm mười tám': '418', 'ba trăm mười lăm': '315', 'sáu mươi': '60' };
  const ws = H.fence(B, 0).lines[0].split(' · ').map(s => s.trim());
  return { items: ws.map(w => ({ say: w, prompt: 'Viết số · Write the digits', answers: [D[w]] })) };
};
blocks['h3-6'] = (B, { H }) => ({ from: 'h1-3', relisten: true, record: false, tasks: [{ type: 'retrieve', id: 'h3-6-q', title: { vi: 'Ai nói?', en: 'Who said it?' }, items: XH(H).fenceArrows(B, 0).map(x => (x.en ? x : (delete x.en, x))) }] });
blocks['h6-7'] = (B, { H }) => {
  const l = H.lines(B)[0];
  const a = H.arrowItem(l.text);
  H.use(l);
  return { from: 'h4-2', relisten: true, record: false, lead: '<p>' + H.md(l.text.replace(/\s*→.*$/, '')) + '</p>', tasks: [{ type: 'retrieve', id: 'h6-7-q', title: { vi: 'Bức tranh nào?', en: 'Which panel?' }, items: [{ q: H.txt(l.text.replace(/^.*?\)\.\s*/, '').replace(/\s*→.*$/, '')).replace(/^\*|\*$/g, ''), answer: a.key }] }] };
};
blocks['h8-12'] = () => ({ from: ['h1-3', 'h4-2'], relisten: true, record: false });
blocks['h9-6'] = () => ({ from: 'h2-2', relisten: true, record: false });
blocks['c8-2'] = (B, { H }) => {
  const f = H.fence(B, 0).lines;
  const ks = H.bolds(H.line(B, /^→ \*\*Marcus/).text)[0].split('·').map(s => s.trim());
  return { from: ['h1-3', 'h4-2'], panels: { 'h1-3': [6, 7, 8], 'h4-2': [3, 4, 5, 6, 7] }, relisten: true, record: false,
    tasks: [{ type: 'retrieve', id: 'c8-2-q', title: { vi: 'Ai nói?', en: 'Who said it?' }, items: f.map((l, i) => ({ q: H.vi(l).vi, say: H.vi(l).vi, answer: ks[i] })) }] };
};
blocks['c8-5'] = (B, { H }) => {
  const f = H.fence(B, 0).lines;
  const ks = H.bolds(H.line(B, /^→ \*\*Đức Anh/).text)[0].split(' · ').map(s => s.trim());
  return { type: 'retrieve', items: f.map((l, i) => ({ q: H.vi(l).vi, say: H.vi(l).vi, answer: ks[i] })) };
};
blocks['h4-7'] = (B, { H }) => {
  const g = w => (H.glossary.find(r => r.word === w) || {}).en;
  const ws = ['bà nội', 'ông ngoại', 'chú', 'dì', 'bác', 'cháu', 'con', 'anh', 'chị', 'em'];
  H.note('h4-7', 'content.md names the ten kin words but not their English; the English comes from glossary.csv (bà nội = bà + nội, ông ngoại = ông + ngoại)');
  return { words: ws.map(w => ({ vi: w, en: g(w) || [g(w.split(' ')[0]), g(w.split(' ')[1])].filter(Boolean).map(x => x.split(';')[0]).join(', ') })) };
};
blocks['c5-5'] = () => ({});
blocks['c6-4'] = (B, ctx) => slideType(B, ctx, 'team card match with two rounds (guest speaking, then Vy speaking); content.md lists the cards but not the pairing → slide');
blocks['h8-5'] = (B, { H }) => ({ words: glossDeck(H, 'một', 'nói chuyện') });
blocks['h8-11'] = (B, ctx) => slideType(B, ctx, 'the twelve speaker → listener cards are not listed in content.md → instructions only');
blocks['h8-8'] = (B, ctx) => {
  const { H } = ctx;
  const f = H.fence(B, 0).lines;
  const ks = H.bolds(H.line(B, /^→ \*\*204/).text)[0].split('·').map(s => s.trim());
  H.note('h8-8', 'hear-and-tap with a 4-s pace and 15 more bank items is not an engine block; the 5 keyed items are hear-and-type (digits)');
  return { type: 'type', items: f.map((l, i) => ({ say: H.vi(l).vi, prompt: 'Nghe và viết số · Hear and type the number', answers: [ks[i], ks[i].replace(/-/g, '')] })) };
};
blocks['h8-9'] = (B, ctx) => { ctx.H.note('h8-9', 'the flashing-number display (2 s, then 1.5 s) is not an engine feature → two recording slots'); return { prompts: [{ vi: 'Lần 1 · 2 giây', en: 'Run 1 · 2 seconds', model: false, ask: false, maxSec: 90 }, { vi: 'Lần 2 · 1,5 giây', en: 'Run 2 · 1.5 seconds', model: false, ask: false, maxSec: 75 }] }; };
blocks['h6-8'] = (B, { H }) => ({ fourThreeTwo: [90, 60, 45], prompts: [{ vi: H.vi(H.fence(B, 0).lines[0], { speakers: false }).vi, en: 'Gia đình Vy', model: false, ask: false }] });
blocks['c7-2'] = () => ({ fourThreeTwo: [120, 90, 60], prompts: [{ vi: 'Gia đình Vy', en: 'who, how old, who calls whom', model: false, ask: false }] });
['h5-7', 'c7-4', 'h9-5', 'h9-5b'].forEach(id => { blocks[id] = () => ({ readers: LIBS, fluency: true }); });
blocks['h8-6'] = () => ({ from: 'h2-5', fluency: true, record: false, emoji: '⚡' });
blocks['h7-5'] = (B, { H }) => {
  const l = H.lines(B)[0];
  const ks = H.bolds(l.text).pop().split('·').map(s => s.trim());
  H.use(l);
  return { from: ['h4-6', 'h5-2'], fluency: true, record: false, emoji: '⚡', lead: '<p>' + H.md(l.text.replace(/\s*→.*$/, '')) + '</p>',
    tasks: [{ type: 'retrieve', id: 'h7-5-who', title: { vi: 'Ai đang nói?', en: 'Who is talking?' }, items: ks.map((k, i) => ({ q: 'Text ' + (i + 1), answer: k })) }] };
};

/* ── tasks ── */
const LV = [{ n: 0, vi: 'Không có', en: 'Zero line' }, { n: 1, vi: 'Chưa đạt', en: 'Not yet' }, { n: 2, vi: 'Đang phát triển', en: 'Developing' }, { n: 3, vi: 'Đạt', en: 'Meets' }, { n: 4, vi: 'Tốt', en: 'Strong' }];
function rubricFrom(H, rows, zero) {
  return rows.slice(1).map(r => {
    const m = H.txt(r[0]).match(/^(.*?)\s*\((\d+)(?:,\s*([^)]*))?\)$/);
    return { vi: m[1] + (m[3] ? ' (' + m[3] + ')' : ''), en: '', weight: +m[2], desc: [zero].concat(r.slice(1, 5).map(H.txt)) };
  });
}
blocks['h6-4a'] = (B, { H }) => {
  const f = H.fence(B, 0).lines;
  const labels = H.bolds(H.line(B, /^→ \*\*address/).text)[0].split('·').map(s => s.trim());
  return { examples: [], tasks: [{ type: 'match', id: 'h6-4a-moves', title: { vi: 'Bốn bước', en: 'Match each sentence to its move' }, pairs: f.map((l, i) => ({ a: H.vi(l).vi, b: labels[i] })) }] };
};
blocks['h6-4'] = (B, { H }) => {
  const chk = H.line(B, /^\*\*Checklist/);
  const checklist = H.txt(chk.text).replace(/^Checklist\s*/, '').split('☐').map(s => s.trim()).filter(Boolean).map(s => ({ vi: s, en: '' }));
  return { minWords: 50, checklist };
};
blocks['h7-3'] = (B, ctx) => {
  const { H } = ctx;
  const head = H.line(B, /^\*\*T3 rubric/);
  const tbl = H.table(B, 0);
  const zl = H.line(B, /^\*Points per criterion/);
  const zero = 'Không có · Zero line: nothing to score (no message; no recording, for Comprehensibility) = 0';
  return {
    prompts: [{ vi: 'Lời cảm ơn gửi nhà Vy', en: 'Record your message (30–60 seconds)', model: false, ask: false, maxSec: 60 }],
    tasks: [{ type: 'rubric', id: 'h7-3-rubric', title: { vi: 'T3 · Bảng tiêu chí', en: 'T3 rubric' }, levels: LV, criteria: rubricFrom(H, tbl.rows, zero),
      lead: '<p>' + H.md(head.text) + '</p>', after: '<p>' + H.md(zl.text) + '</p>' }],
  };
};
blocks['h8-7'] = (B, ctx) => slideType(B, ctx, 'the words to fix are flagged per learner by the teacher (or the auto-check), so there are no fixed items → instructions and the in-role replies (🔊) as a card');
blocks['h7-2'] = (B, { H }) => {
  const chat = H.fence(B, 0).lines, chat2 = H.fence(B, 1).lines, vn = H.fence(B, 2);
  const items = H.fence(B, 3).lines;
  const keyT = H.table(B, 0).rows.slice(1);
  const age = H.line(B, /^\*\*Product 1/), chart = H.line(B, /^\*\*Product 2/);
  H.line(B, /^\*\*Items/); H.line(B, /^🎤/); H.line(B, /^\*Voice-note transcripts/);
  const ord = H.bolds(age.text)[1].split('·').map(s => s.trim().replace(/\s+\d+$/, ''));
  const tiles = ['bà nội', 'chú Lộc (ba)', 'cô Hằng (má)', 'anh Đức Anh', 'Marcus', 'Vy', 'Daniel', 'Hannah', 'Tín'];
  const tf = [], mc = [];
  items.forEach((l, i) => {
    const r = keyT[i], key = H.txt(r[1]), whyT = H.txt(r[3]);
    if (/Đúng hay sai/.test(l)) { tf.push({ q: H.vi(l).vi, ans: key === 'Đúng', why: whyT.replace(/^"[^"]*"\s*·\s*/, '') }); return; }
    const o = H.inlineOpts(l);
    const why = {};
    whyT.split(/\s(?=[②③]\s·)/).forEach(seg => { const m = seg.match(/^([②③])\s*·\s*(.*)$/); if (m) why[o.opts[H.circ(m[1])]] = m[2].trim(); });
    mc.push({ q: o.stem, opts: o.opts, correct: o.opts[H.circ(key)], why, explain: 'Can-do ' + H.txt(r[2]) });
  });
  const mcKeys = mc.map((_, i) => 'h7-2-mc-' + (i + 1)).concat(tf.map((_, i) => 'h7-2-tf-' + (i + 1)));
  const d = { lines: vn.lines.map(l => { const v = H.vi(l); return { spk: v.spk, vi: v.vi }; }) };
  const gloss = [];
  const clean = l => { const v = H.vi(l); v.gloss.forEach(g => gloss.push(g)); return (v.spk ? v.spk + ': ' : '') + v.vi; };
  return {
    vi: chat.map(clean).concat(['🎤 Bà nội · voice note 1 (0:12) · 🎤 Bà nội · voice note 2 (0:08)']).concat(chat2.map(clean)), gloss, record: false,
    tasks: [
      { type: 'dialogue', id: 'h7-2-vn', title: { vi: 'Tin nhắn thoại của bà nội', en: 'Bà nội’s two voice notes (transcripts open after the 12 items)' }, lines: d.lines, revealAfter: mcKeys, recAs: 'h7-2' },
      { type: 'builder', id: 'h7-2-age', title: { vi: 'Sản phẩm 1 · Đường tuổi', en: 'Product 1 · Age line (9 people, oldest → youngest)' },
        items: [{ en: 'Oldest → youngest (Vy and Daniel are the same age: either order).', tiles, answer: tiles.join(', '), alts: [tiles.map(x => (x === 'Vy' ? 'Daniel' : x === 'Daniel' ? 'Vy' : x))], vertical: true }] },
      { type: 'html', id: 'h7-2-chart', title: { vi: 'Sản phẩm 2 · Ai gọi ai?', en: 'Product 2 · Who calls whom (chart)' }, html: H.keyBox('<p>' + H.md(chart.text.replace(/^\*\*Product 2 · Who calls whom \(chart\)\.\*\*\s*/, '')) + '</p>') },
      { type: 'tf', id: 'h7-2-tf', title: { vi: 'Câu 1–3', en: 'Items 1–3' }, items: tf },
      { type: 'mc', id: 'h7-2-mc', title: { vi: 'Câu 4–12', en: 'Items 4–12' }, items: mc },
    ],

  };
};
const T2_ZERO = 'Không có · Zero line: absent from the scene, or nothing in Vietnamese for this criterion = 0';
blocks['c9-2a'] = (B, ctx) => {
  const { H } = ctx;
  const rubT = H.tables(B)[1];
  H.use(rubT);
  H.line(B, /^\*\*Guest rubric/);
  return { levels: LV, criteria: rubricFrom(H, rubT.rows, T2_ZERO), task: { vi: 'T2 · Đến nhà Vy', en: 'Guest rubric (per guest; total 100)' } };
};
blocks['c9-2b'] = () => ({ shared: 'c9-2a' });
blocks['c9-2c'] = () => ({ shared: 'c9-2a' });

/* ── review ── */
const SERIES = { 'h1-10': ['một', 'phòng'], 'h4-10': ['tuổi', 'cả'], 'h7-9': ['một', 'nói chuyện'], 'h9-4': ['một', 'nói chuyện'] };
Object.entries(SERIES).forEach(([id, [a, b]]) => { blocks[id] = (B, { H }) => ({ deck: 'series', words: glossDeck(H, a, b) }); });
function recap(B, H, keyRe) {
  const f = H.fence(B, 0).lines;
  const segs = H.numArrows(H.line(B, keyRe || /^→ 1\s/).text);
  const mc = [], rt = [];
  f.forEach(l => {
    const v = H.vi(l, { speakers: false });
    const s = segs.find(x => x.n === v.num);
    if (!s) return;
    if (/[①②③]/.test(l)) {
      const o = H.inlineOpts(l);
      const why = {};
      s.wrongs.forEach(w => [...w.opt.replace(/[,\s]/g, '')].forEach(c => { if (o.opts[H.circ(c)]) why[o.opts[H.circ(c)]] = w.why.replace(/[);\s]+$/, ''); }));
      const xm = s.extra.match(/✗\s*([②③])\s*·\s*([^✗]*)/g);
      (xm || []).forEach(x => { const m = x.match(/✗\s*([②③])\s*·\s*(.*)$/); why[o.opts[H.circ(m[1])]] = m[2].replace(/\)$/, '').trim(); });
      mc.push(Object.assign({ q: o.stem, opts: o.opts, correct: o.opts[H.circ(s.key)] }, Object.keys(why).length ? { why } : {}, s.extra ? { explain: s.extra.replace(/✗[\s\S]*$/, '').replace(/[(;\s]+$/, '').replace(/^\(/, '') } : {}));
    } else rt.push(Object.assign({ q: v.vi, answer: s.key || s.extra }, s.key && s.extra ? { en: s.extra } : {}));
  });
  return { mc, rt };
}
['h3-10', 'h6-10', 'h8-10', 'h9-3'].forEach(id => {
  blocks[id] = (B, { H }) => {
    const r = recap(B, H);
    return { type: 'retrieve', kind: 'mc', items: r.rt, tasks: r.mc.length ? [{ type: 'mc', id: id + '-mc', title: { vi: 'Chọn', en: 'Choose' }, items: r.mc }] : undefined };
  };
});

/* ── report ── */
blocks['c9-4'] = (B, { H }) => { H.fence(B, 0); return { phase: 'after' }; };
blocks['h9-2'] = () => ({ timing: true, survey: { title: 'Quick Feedback', sections: [{ title: 'Quick Feedback (3 questions)', items: [
  { id: 'helped', type: 'short', q: 'Which block helped most?' },
  { id: 'long', type: 'short', q: 'Which was too long?' },
  { id: 'mins', type: 'short', q: 'How many minutes did each homework session take you?', hint: 'timing data that helps us size the homework' }] }] } });

module.exports = { blocks, tabs };
