/* b1u03 map · tabs story + notice */
'use strict';
const XH = require('./_h.js');
const blocks = {};
const LIB = { 'lib-r1': 'h1', 'lib-r2': 'h1', 'lib-r5': 'h2', 'lib-r3': 'h3', 'lib-r6': 'h3', 'lib-r4': 'h5', 'lib-r8': 'h5', 'lib-r7': 'h6' };
const sn = s => +String(s).slice(1);
const unlocked = sess => Object.keys(LIB).filter(k => sn(LIB[k]) <= sn(sess));
const LEVEL = { '1-': 'Cấp 1−', '1': 'Cấp 1', '1+': 'Cấp 1+' };

/* ── story ── */
['c1-3', 'c2-6', 'c4-6'].forEach(id => {
  blocks[id] = (B, { H }) => { const b = H.body(B, [H.fences(B)[0]]); return { body: b.body, emoji: '🗣️', record: false }; };
});
blocks['h2-5'] = (B, { H }) => {
  const b = H.body(B);
  H.line(B, /^\*\*Job/);
  const l1 = H.line(B, /^1\. Drag/);
  const order = H.bolds(l1.text)[0].split('·').map(s => s.trim());
  const mx = XH(H).listMixed(B, /^[23]\.\s/);
  return { body: b.body, gloss: b.gloss, emoji: '👨‍👩‍👧', recVoices: ['NF', 'SM'],
    tasks: [
      { type: 'builder', id: 'h2-5-line', title: { vi: 'Đường tuổi', en: 'The age line: oldest → youngest' }, items: [{ en: 'Drag the eight members onto the age line, oldest → youngest.', tiles: order, answer: order.join(', '), vertical: true }] },
      { type: 'mc', id: 'h2-5-q', title: { vi: 'Câu hỏi', en: 'Questions' }, items: mx.mc },
    ] };
};
const SLOTS = { 'h1-8': ['lib-r1', 'lib-r2'], 'h2-9': ['lib-r1', 'lib-r2', 'lib-r5'], 'h3-8': ['lib-r1', 'lib-r2', 'lib-r3', 'lib-r5', 'lib-r6'], 'h3-11': ['lib-r1', 'lib-r2', 'lib-r3', 'lib-r5', 'lib-r6'],
  'h5-8': ['lib-r4', 'lib-r8'], 'h6-3': 'any', 'h7-6': 'any', 'h9-7': ['lib-r7', 'lib-r8'] };
Object.entries(SLOTS).forEach(([id, rs]) => {
  blocks[id] = (B, ctx) => ({ slot: true, readers: rs === 'any' ? unlocked(B.a.session) : rs, emoji: '📚' });
});
blocks['h4-6'] = (B, { H }) => {
  const b = H.body(B);
  const mx = XH(H).listMixed(B, /^[123]\.\s/);
  return { body: b.body, gloss: b.gloss, emoji: '🍚', tasks: [
    { type: 'retrieve', id: 'h4-6-r', title: { vi: 'Hannah', en: 'Hannah · answer, then reveal' }, items: mx.rt },
    { type: 'mc', id: 'h4-6-mc', title: { vi: 'Hannah', en: 'Hannah · choose' }, items: mx.mc }] };
};
blocks['h5-2'] = (B, { H }) => {
  const b = H.body(B);
  const mx = XH(H).listMixed(B, /^[123]\.\s/);
  return { body: b.body, gloss: b.gloss, emoji: '🍚', tasks: [
    { type: 'retrieve', id: 'h5-2-r', title: { vi: 'Câu hỏi', en: 'Answer, then reveal' }, items: mx.rt },
    { type: 'mc', id: 'h5-2-mc', title: { vi: 'Chọn', en: 'Choose' }, items: mx.mc }] };
};
blocks['h5-3'] = (B, { H }) => {
  const f = H.fence(B, 0);
  const mx = XH(H).listMixed(B, /^[12]\.\s/);
  return { vi: f.lines.map(l => H.vi(l, { speakers: false }).vi), recVoices: ['NF'], recLines: true,
    tasks: [{ type: 'mc', id: 'h5-3-q', title: { vi: 'Câu hỏi', en: 'Questions' }, items: mx.mc }] };
};
blocks['h9-9'] = (B, { H }) => {
  const b = H.body(B);
  const job = H.line(B, /^\*\*Job\.\*\*/);
  const evs = H.txt(job.text).replace(/^Job\.\s*Put these five events in order:\s*/, '').split(/\s*·\s*/).map(s => s.replace(/^[①②③④⑤]\s*/, '').trim());
  const key = H.line(B, /^→ \*\*②/);
  const ord = H.bolds(key.text)[0].split('·').map(s => evs[H.circ(s.trim())]);
  const q2 = H.line(B, /^\*\*What does Vy now know/);
  const a = H.arrowItem(q2.text);
  return { body: b.body, gloss: b.gloss, emoji: '📔', tasks: [
    { type: 'builder', id: 'h9-9-order', title: { vi: 'Sắp xếp', en: 'Put the five events in order' }, items: [{ en: 'Put these five events in order.', tiles: ord, answer: ord.join(' '), vertical: true }] },
    { type: 'mc', id: 'h9-9-q', title: { vi: 'Câu hỏi', en: 'Question' }, items: [H.mc({ q: a.q, key: a.key, wrongs: a.wrongs })] }] };
};

/* library readers: body + the job (match / builder / mc / retrieve, as each job is written) */
function reader(B, H, jobs) {
  const b = H.body(B);
  const out = { body: b.body, gloss: b.gloss, emoji: '📖', level: LEVEL[B.a.level] || B.a.level };
  if (B.a.id === 'lib-r3') out.recVoices = ['NF', 'NM'];
  const job = H.line(B, /^\*\*Job\.\*\*/);
  const t = job.text.replace(/^\*\*Job\.\*\*\s*/, '');
  const parts = t.split(/\s·\s(?=\d\.\s)|^(?=\d\.\s)/).filter(Boolean).map(s => s.replace(/^\d\.\s*/, ''));
  out.tasks = jobs(parts, t);
  return out;
}
const segItem = (H, s) => H.arrowItem(s);
const asTasks = (H, id, items) => {
  const mc = [], rt = [];
  items.forEach(a => { if (a.wrongs.length) mc.push(H.mc({ q: a.q, key: a.key, wrongs: a.wrongs, extra: a.extra })); else rt.push(Object.assign({ q: a.q, answer: a.key }, a.extra ? { en: a.extra } : {})); });
  return [rt.length && { type: 'retrieve', id: id + '-r', title: { vi: 'Việc cần làm', en: 'The job · answer, then reveal' }, items: rt },
    mc.length && { type: 'mc', id: id + '-mc', title: { vi: 'Việc cần làm', en: 'The job · choose' }, items: mc }].filter(Boolean);
};
['lib-r1', 'lib-r2', 'lib-r7', 'lib-r8'].forEach(id => {
  blocks[id] = (B, { H }) => reader(B, H, parts => asTasks(H, id, parts.map(p => segItem(H, p)).filter(Boolean)));
});
blocks['lib-r5'] = (B, { H }) => reader(B, H, parts => {
  const items = parts.slice(0, 2).map(p => segItem(H, p));
  const ord = parts[2].replace(/^Order:\s*/, '').split('→')[0].split('·').map(s => H.txt(s).trim());
  return asTasks(H, 'lib-r5', items).concat([{ type: 'builder', id: 'lib-r5-order', title: { vi: 'Sắp xếp', en: 'Order' }, items: [{ en: 'Put the events in order.', tiles: ord, answer: ord.join(' '), vertical: true }] }]);
});
blocks['lib-r3'] = (B, { H }) => reader(B, H, (parts, t) => {
  const pairs = [...t.matchAll(/\*([^*]+)\*\s*→\s*\*\*([^*]+)\*\*/g)].map(m => ({ a: m[1].trim(), b: m[2].trim() }));
  const why = t.split('✗')[1];
  return [{ type: 'match', id: 'lib-r3-match', title: { vi: 'Ghép', en: 'Match the person to what they call cụ' }, pairs }].concat(why ? [] : []);
});
blocks['lib-r6'] = (B, { H }) => reader(B, H, parts => {
  const a1 = segItem(H, parts[0]);
  const tiles = a1.key.split('·').map(s => s.trim());
  return [{ type: 'builder', id: 'lib-r6-order', title: { vi: 'Thứ tự của Cam', en: 'Number the people in Cam’s order' }, items: [{ en: a1.q, tiles, answer: tiles.join(', ') }] }]
    .concat(asTasks(H, 'lib-r6', parts.slice(1).map(p => segItem(H, p))));
});
blocks['lib-r4'] = (B, { H }) => reader(B, H, (parts, t) => {
  const [fill, whyQ] = t.split(/\s·\s(?=Why does)/);
  const its = [...fill.matchAll(/\*([^*]+)\*\s*→\s*\*\*([^*]+)\*\*(?:\s*✗\s*([^·]+)·\s*([^*]+?)(?=\s·\s\*|$))?/g)].map(m => ({ q: 'Fill Marcus’s pronouns · ' + m[1].trim(), answer: m[2].trim(), en: m[3] ? '✗ ' + H.txt(m[3]).trim() + ' · ' + H.txt(m[4]).trim() : undefined }));
  its.forEach(x => { if (!x.en) delete x.en; });
  const w = segItem(H, whyQ);
  its.push(Object.assign({ q: w.q, answer: w.key }, w.extra ? { en: w.extra } : {}));
  return [{ type: 'retrieve', id: 'lib-r4-r', title: { vi: 'Việc cần làm', en: 'The job · answer, then reveal' }, items: its }];
});
Object.keys(LIB).forEach(id => { const f = blocks[id]; blocks[id] = (B, ctx, base) => Object.assign(f(B, ctx, base), { unlock: LIB[id] }); });

/* ── notice ── */
blocks['c1-4'] = (B, { H }) => {
  H.fences(B).forEach(H.use);
  H.line(B, /^\*\*Items/);
  const its = H.linesMatching(B, /^\d+\.\s🔊/).map(e => ({ a: H.arrowItem(e.text), say: XH(H).say(e.text) }));
  return { items: its.map(({ a, say }) => {
    let borrow = [];
    if (!a.wrongs.length) { const o = its.find(x => x.a.wrongs.some(w => w.opt === a.key)); if (o) borrow = [o.a.key]; }
    return H.mc({ q: 'Bạn nghe số nào?', en: 'Tap the number you hear', say, key: a.key, wrongs: a.wrongs, borrow });
  }) };
};
blocks['c1-5'] = (B, { H }) => {
  const f = H.fence(B, 0);
  const tbl = H.table(B, 0);
  const note = H.line(B, /^\*Southern speech also says/);
  H.line(B, /^\*\*Rule card/);
  return { examples: f.lines.map(l => ({ vi: l })), reveal: H.tableHtml(tbl.rows) + '<p>' + H.md(note.text) + '</p>' };
};
blocks['h1-5'] = (B, { H }) => {
  const frame = H.vi(H.fence(B, 0).lines[0]).vi;
  const its = H.linesMatching(B, /^\d+\.\s🔊/).map(e => ({ a: H.arrowItem(e.text), say: XH(H).say(e.text) }));
  const num = s => (String(s).match(/\d+/) || [])[0];
  const label = n => { const k = its.find(x => num(x.a.key) === n); return k ? k.a.key : null; };
  return { items: its.map(({ a, say }) => {
    const wrongs = a.wrongs.map(w => ({ opt: label(num(w.opt)) || w.opt, why: w.why }));
    let borrow = [];
    if (!wrongs.length) { const o = its.find(x => x.a.wrongs.some(w => num(w.opt) === num(a.key))); if (o) borrow = [o.a.key]; }
    return H.mc({ q: 'Ai?', en: 'Who is it?', say: frame.replace('___', say), key: a.key, wrongs, borrow });
  }), rec: undefined };
};
blocks['c2-3'] = (B, { H }) => {
  const fa = H.fence(B, 0).lines, fb = H.fence(B, 1).lines;
  H.linesMatching(B, /^\*\*Part [AB]/);
  const A = H.linesMatching(B, /^\d\.\s/).map(e => {
    const n = +e.text.match(/^(\d)/)[1];
    const t = H.txt(e.text);
    const pics = t.match(/pictures:\s*(.+?)\s*→/)[1].split('·').map(s => s.trim());
    const a = H.arrowItem(e.text);
    const why = {};
    a.wrongs.forEach(w => w.opt.split(/\s*\/\s*|,\s*/).forEach(o => { if (pics.includes(o)) why[o] = w.why; }));
    const pre = (t.match(/^\d\.\s*(\([^)]*\))/) || [])[1];
    const it = { q: H.vi(fa[n - 1]).vi, say: H.vi(fa[n - 1]).vi, opts: pics, correct: a.key };
    if (pre) it.en = pre;
    if (Object.keys(why).length) it.why = why;
    return it;
  });
  const keys = H.linesMatching(B, /^(7|8|9|10|11|12) →/).map(e => ({ n: +e.text.match(/^\d+/)[0], k: H.bolds(e.text)[0], rest: H.txt(e.text.replace(/^\d+ → \*\*.+?\*\*/, '')).trim() }));
  const Bi = fb.map(l => {
    const v = H.vi(l);
    const k = keys.find(x => x.n === v.num);
    if (/[①②]/.test(l)) {
      const o = H.inlineOpts(l);
      const opts = o.opts.map(x => x.replace(/\s*Câu nào lịch sự\?$/, ''));
      const why = {};
      const m = k.rest.match(/^✗\s*([①②])\s*·\s*(.*)$/);
      if (m) why[opts[H.circ(m[1])]] = m[2];
      return { q: o.stem + ' Câu nào lịch sự?', opts, correct: opts[H.circ(k.k)], why };
    }
    const correct = /^Không được/.test(k.k) ? 'Không được' : 'Được';
    return { q: v.vi, opts: ['Được', 'Không được'], correct, explain: (k.k !== correct ? k.k + ' · ' : '') + k.rest.replace(/^·\s*/, '') };
  });
  return { items: A.concat(Bi) };
};
blocks['h2-4'] = (B, { H }) => {
  const f = H.fence(B, 0).lines;
  const its = H.linesMatching(B, /^\d →/).map(e => ({ n: +e.text[0], a: H.arrowItem(e.text.replace(/^\d /, '1. ')) }));
  return { items: its.map(({ n, a }) => {
    let borrow = [];
    if (!a.wrongs.length) { const o = its.find(x => x.a.wrongs.some(w => w.opt === a.key)); if (o) borrow = [o.a.key]; }
    const v = H.vi(f[n - 1]).vi;
    return H.mc({ q: v, say: v, key: a.key, wrongs: a.wrongs, borrow, extra: a.extra });
  }) };
};
blocks['c3-2'] = (B, { H }) => {
  const f = H.fence(B, 0);
  const rule = H.line(B, /^\*\*Rule/), chk = H.line(B, /^\*\*Check/);
  return { examples: f.lines.map(l => ({ vi: l })), reveal: '<p>' + H.md(rule.text) + '</p>' + H.keyBox('<p>' + H.md(chk.text) + '</p>') };
};
blocks['h3-5'] = (B, { H }) => {
  H.fence(B, 0);
  const rows = H.table(B, 0).rows.slice(1);
  return { cards: rows.map(r => ({ vi: H.txt(r[0]), en: H.txt(r[1]), exEn: '→ ' + H.txt(r[2]) })) };
};
blocks['c4-3'] = (B, { H }) => {
  const f = H.fence(B, 0).lines;
  const segs = H.numArrows(H.line(B, /^→ 1\s/).text);
  return { type: 'retrieve', items: f.map((l, i) => ({ q: H.vi(l).vi, say: H.vi(l).vi, answer: segs[i].key, en: segs[i].extra || undefined })).map(x => (x.en ? x : (delete x.en, x))) };
};
blocks['h4-3'] = (B, { H }) => {
  H.line(B, /^\*\*Rule/);
  const rules = H.linesMatching(B, /^- /);
  const f = H.fence(B, 0);
  H.line(B, /^\*\*Check/);
  const mc = H.linesMatching(B, /^[1-4]\.\s/).map(e => {
    const a = H.arrowItem(e.text);
    const inl = H.inlineOpts(a.q);
    if (inl.opts.length) { const opts = inl.opts.map(o => o.replace(/\.$/, '.')); return { q: inl.stem, opts, correct: opts[H.circ(a.key)], why: a.wrongs.length ? { [opts[H.circ(a.wrongs[0].opt)]]: a.wrongs[0].why } : undefined }; }
    return a.wrongs.length ? H.mc({ q: a.q, key: a.key, wrongs: a.wrongs, extra: a.extra }) : { q: a.q, answer: a.key, en: a.extra };
  });
  return { showRule: true, examples: f.lines.map(l => ({ vi: l })), reveal: '<p class="dv-h">Rule</p><ul>' + rules.map(e => '<li>' + H.md(e.text.slice(2)) + '</li>').join('') + '</ul>',
    tasks: [{ type: 'mc', id: 'h4-3-mc', title: { vi: 'Kiểm tra', en: 'Check · choose' }, items: mc.filter(x => x.opts) },
      { type: 'retrieve', id: 'h4-3-r', title: { vi: 'Kiểm tra', en: 'Check · answer, then reveal' }, items: mc.filter(x => !x.opts) }] };
};
blocks['h4-5'] = (B, { H }) => {
  const f = H.fence(B, 0).lines;
  const segs = H.numArrows(H.line(B, /^→ 1\s/).text);
  const w = H.line(B, /^✗ for 2, 4, 6, 8/);
  const why = H.txt(w.text).split(' · ').slice(1).join(' · ');
  const O = { 'bà nội': '👵 bà nội', classmate: '🧑 a classmate' };
  return { items: f.map((l, i) => { const v = H.vi(l).vi; const k = O[segs[i].key]; return { q: v, say: v, opts: Object.values(O), correct: k, why: k === O.classmate ? { [O['bà nội']]: why } : undefined }; }) };
};

module.exports = { blocks };
