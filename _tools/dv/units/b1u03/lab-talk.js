/* b1u03 map · tabs lab + talk */
'use strict';
const XH = require('./_h.js');
const blocks = {};
const slideType = (B, ctx, why) => { ctx.H.note(B.a.id, why); return { type: 'html' }; };
const deck = (H, B) => H.table(B, 0).rows.slice(1).map(r => ({ vi: H.txt(r[0]), en: H.txt(r[1]), ex: H.txt(r[2]) }));
const glossDeck = (H, from, to) => {
  const g = H.glossary.filter(r => r.status === 'new');
  const i = g.findIndex(r => r.word === from), j = g.findIndex(r => r.word === to);
  return g.slice(i, j + 1).map(r => ({ vi: r.variant_n && r.variant_s && r.variant_n !== r.variant_s ? '{{' + r.variant_n + '|' + r.variant_s + '}}' : r.word, en: r.en }));
};

/* ── lab ── */
blocks['h1-4'] = (B, { H }) => ({ words: deck(H, B) });
blocks['h2-3'] = (B, { H }) => ({ words: deck(H, B) });
blocks['h6-5'] = (B, { H }) => ({ words: deck(H, B) });
/* tonelab tables: "1–4 | mười or mươi? | NF NM SF SM | as played" → items */
function toneItems(H, rows) {
  const out = [];
  rows.slice(1).forEach(r => {
    const m = r[0].match(/^(\d+)[–-](\d+)$/);
    if (!m) return;
    const n = +m[2] - +m[1] + 1;
    const voices = H.txt(r[2]).split(/\s+/);
    const words = [...r[1].replace(/\(.*\)/, '').matchAll(/\*([^*]+)\*/g)].map(x => x[1].trim());
    const key = H.txt(r[3]);
    const rec = voices.length < 4 ? { recVoices: voices } : {};
    if (/or/.test(r[1]) && /as played/.test(key) && words.length === 2) {
      const contrast = words[0].normalize('NFD').replace(/[̣̀́̃̉]/g, '') !== words[1].normalize('NFD').replace(/[̣̀́̃̉]/g, '') ? { contrast: 'vowel' } : {};
      for (let k = 0; k < n; k++) out.push(Object.assign({ word: words[k % 2], set: words.slice() }, contrast, rec));
    } else {
      const ws = words.join(' · ').split(/\s*·\s*/);
      for (let k = 0; k < n; k++) { const w = ws[k % ws.length]; out.push(Object.assign({ word: w }, ['ngang', 'huyền', 'sắc', 'hỏi', 'ngã', 'nặng'].includes(key) ? { tone: key } : {}, rec)); }
    }
  });
  return out;
}
blocks['h1-6'] = (B, { H }) => ({ items: toneItems(H, H.table(B, 0).rows) });
blocks['h3-3'] = (B, { H }) => {
  const rows = H.table(B, 0).rows;
  const items = toneItems(H, rows);
  const panel = rows.find(r => r[0] === 'Panel');
  return { items, tones: ['hỏi', 'ngã'],
    after: '<p>' + H.md(panel[1]) + ' (' + H.txt(panel[2]) + ')</p>' + H.viLinesHtml(['bảy', 'lẻ', 'cả', 'cũng', 'những']) + H.viLinesHtml(H.fence(B, 0).lines) };
};
blocks['h4-8'] = (B, { H }) => ({ items: toneItems(H, H.table(B, 0).rows) });
blocks['h6-6'] = () => ({ from: ['h1-6', 'h3-3', 'h4-8'], n: 16 });
blocks['h7-7'] = (B, ctx) => { ctx.H.note('h7-7', 'draws 4 items from each earlier set (missed items first); "in the voices you got wrong least often" is not tracked by the engine'); return { from: ['h1-6', 'h3-3', 'h4-8'], per: 4 }; };
blocks['h1-7'] = (B, ctx) => slideType(B, ctx, 'online lô tô card (5×5 grid, timed caller) is not an engine block → the call list with 🔊 buttons');
blocks['h2-6'] = (B, { H }) => {
  const l = H.line(B, /^1\.\s🔊/);
  const parts = l.text.split(/\s·\s(?=\d+\.\s)/);
  return { items: parts.map(p => {
    const m = p.replace(/^\d+\.\s*(🔊\s*)?/, '');
    const main = H.txt((m.match(/^\*([^*]+)\*/) || [, ''])[1]);
    const acc = [...(m.match(/\(accept ([^)]*)\)/) || [, ''])[1].matchAll(/\*([^*]+)\*/g)].flatMap(x => x[1].split(/,\s*/));
    const fb = (m.match(/\*bẩy\* gets the feedback "([^"]+)"/) || [])[1];
    const it = { say: main, prompt: 'Nghe và viết · Hear and type in words', answers: [main].concat(acc.map(H.txt)) };
    if (fb) it.hint = 'bẩy: ' + fb;
    return it;
  }) };
};
blocks['h3-4'] = (B, { H }) => {
  const rows = H.table(B, 0).rows.slice(1);
  const items = rows.map(r => {
    const tilesAll = H.txt(r[2]).split(/\s*·\s*/);
    const keys = H.bolds(r[3]);
    const answer = keys[0];
    const alts = [...r[3].replace(/\*\*(.+?)\*\*/g, '').matchAll(/\*([^*]+)\*/g)].map(x => x[1]).filter(x => !/^\*/.test(x) && x !== answer && /\?$/.test(x));
    const tok = s => { const t = []; let rest = s.replace(/[,?]/g, ' ').replace(/\s+/g, ' ').trim(); const pool = tilesAll.slice().sort((a, b) => b.length - a.length);
      while (rest) { const lo = rest.toLowerCase(); const p = pool.find(x => lo === x.toLowerCase() || lo.startsWith(x.toLowerCase() + ' ')); if (!p) return null; t.push(p); rest = rest.slice(p.length).trim(); } return t; };
    const tiles = tok(answer);
    const extra = tilesAll.filter(x => !tiles.includes(x));
    const altT = alts.map(tok).filter(Boolean);
    const it = { en: 'Ask: ' + H.txt(r[1]), tiles, answer, extra };
    if (altT.length) { it.alts = altT; it.altAnswers = alts.filter((a, i) => tok(a)); }
    const fb = (H.txt(r[3]).match(/with the feedback "([^"]+)"/) || [])[1];
    if (fb) it.altNote = fb;
    const why = H.txt(r[4]);
    if (why && why !== '—' && !/^—/.test(why)) it.hint = why.startsWith('as ') ? H.txt(rows[0][4]) : why;
    return it;
  });
  const f = H.fence(B, 0).lines;
  const segs = H.numArrows(H.line(B, /^→ 7\s/).text.replace(/^→ 7/, '→ 1').replace(/· 8 /, '· 2 ').replace(/· 9 /, '· 3 ').replace(/· 10 /, '· 4 '));
  const fill = f.map((l, i) => {
    const v = H.vi(l).vi, s = segs[i];
    const acc = [...s.raw.matchAll(/\(\*([^*]+)\*\s*accepted\)/g)].map(x => x[1].replace(/\s*…$/, ''));
    return { prompt: v, answers: [s.key].concat(acc), hint: s.wrongs.map(w => '✗ ' + w.opt + ' · ' + w.why).join(' ') || undefined };
  });
  return { items, tasks: [{ type: 'type', id: 'h3-4-fill', title: { vi: 'Hoàn thành câu trả lời', en: 'Finish the answer' }, items: fill }] };
};
blocks['h4-4'] = (B, { H }) => ({ items: XH(H).inlineMc(B, 0) });
blocks['h5-4'] = (B, { H }) => ({ items: XH(H).inlineMc(B, 0) });
blocks['h7-4'] = (B, { H }) => ({ items: XH(H).inlineMc(B, 0) });
blocks['h4-11'] = (B, { H }) => ({ prompts: H.fence(B, 0).lines.map(l => ({ vi: H.vi(l).vi })) });
blocks['h5-6'] = (B, { H }) => {
  H.linesMatching(B, /^\*\*(HL|L2) set/);
  const set = (fi, route, sid) => ({ type: 'type', id: sid, route, title: route === 'hl' ? { vi: 'Bộ HL', en: 'HL set (also the T3 hỏi/ngã list)' } : { vi: 'Bộ L2', en: 'L2 set (tone marks on the most frequent words)' },
    items: H.fence(B, fi).lines.map(l => { const v = H.vi(l, { speakers: false }); const m = v.vi.match(/^(.*?)\s*\(([^)]+)\)\s*$/); return { say: m[1].replace('___', m[2]), prompt: m[1], answers: [m[2]] }; }) });
  return { type: 'html', kind: 'type', tasks: [set(0, 'hl', 'h5-6-hl'), set(1, 'l2', 'h5-6-l2')] };
};
blocks['c6-3'] = () => ({});
blocks['h6-9'] = (B, { H }) => ({ items: H.fence(B, 0).lines.map(l => ({ say: H.vi(l).vi, prompt: 'Nghe và viết · Hear and type', answers: [H.vi(l).vi] })) });
blocks['h6-11'] = (B, { H }) => {
  const text = H.fence(B, 0);
  const qs = H.fence(B, 1).lines;
  const keys = H.linesMatching(B, /^→ [123]\s/);
  const q3 = H.inlineOpts(qs[2]);
  const why3 = H.txt(keys[2].text).split('✗')[1].replace(/^\s*①\s*·\s*/, '');
  return {
    lead: H.slideOf({ els: B.els.filter(e => e.k === 'line' && !e.used && /^\*For heritage/.test(e.text)) }) + H.viLinesHtml(text.lines),
    prompt: H.vi(qs[0]).vi + ' ' + H.vi(qs[1]).vi,
    minWords: 10,
    model: keys.slice(0, 2).map(k => '<p>' + H.md(k.text.replace(/^→\s*/, '')) + '</p>').join(''),
    tasks: [{ type: 'mc', id: 'h6-11-q3', title: { vi: 'Câu 3', en: 'Question 3' }, items: [{ q: q3.stem, opts: q3.opts, correct: q3.opts[1], why: { [q3.opts[0]]: why3 } }] }],
  };
};
blocks['c8-4'] = () => ({});

/* ── talk ── */
blocks['c1-6'] = () => ({});
blocks['h1-9'] = (B, { H }) => ({ prompts: H.fence(B, 0).lines.map(l => ({ vi: H.vi(l).vi, model: false, ask: false, maxSec: 30 })) });
blocks['c2-4'] = (B, { H }) => {
  const parse = fi => H.fence(B, fi).lines.map(l => l.split(' · ').map(s => s.trim()));
  const A = parse(0), Bc = parse(1);
  H.linesMatching(B, /^\*\*Card [AB]/);
  const people = [];
  A.forEach((ra, i) => {
    const rb = Bc[i], name = ra[0];
    [['📞', 'số điện thoại', 1], ['🚪', 'phòng', 2]].forEach(([e, what, k]) => {
      const a = ra[k], b = rb[k], unk = x => /\?/.test(x);
      if (a === 'không có' && b === 'không có') people.push({ e, name: name + ' · ' + what, info: 'không có', holder: 'both' });
      else if (!unk(a) && unk(b)) people.push({ e, name: name + ' · ' + what, info: a, holder: 'A' });
      else if (!unk(b) && unk(a)) people.push({ e, name: name + ' · ' + what, info: b, holder: 'B' });
      else people.push({ e, name: name + ' · ' + what, info: a, holder: 'both' });
    });
  });
  H.line(B, /^\*\*Language you need/);
  return { people, phrases: H.fence(B, 2).lines.map(l => H.vi(l).vi) };
};
blocks['h2-8'] = (B, { H }) => ({ prompts: H.fence(B, 0).lines.map(l => { const v = H.vi(l); return { vi: v.vi, en: v.spk + ' hỏi · asks' }; }) });
blocks['c3-3'] = (B, { H }) => {
  const parse = fi => H.fence(B, fi).lines.map(l => l.split(' · ').map(s => H.vi(s).vi)).flat();
  const A = parse(0), Bc = parse(1);
  H.linesMatching(B, /^\*\*Card [AB]/);
  const people = [];
  const add = (arr, holder) => { for (let i = 0; i < arr.length; i += 2) if (arr[i + 1] !== '?') people.push({ e: '🎂', name: arr[i], info: arr[i + 1], holder }); };
  add(A, 'A'); add(Bc, 'B');
  H.line(B, /^\*\*Language you need/);
  return { people, phrases: H.fence(B, 2).lines.map(l => H.vi(l).vi) };
};
['c3-6', 'c6-2', 'c7-3', 'c8-3'].forEach(id => { blocks[id] = (B, ctx) => slideType(B, ctx, 'group improvisation (3–5 roles, cards, prompts only) is not the engine’s two-role scripted Drama Studio → cards and lines as a slide'); });
blocks['h3-9'] = (B, { H }) => ({ prompts: H.fence(B, 0).lines.map(l => ({ vi: H.vi(l).vi, model: false, ask: false })) });
blocks['c4-5'] = () => ({});
blocks['c5-3'] = (B, ctx) => slideType(B, ctx, 'guess-who (both partners hold the same 12 cards; A picks one secretly) is not an information gap the engine models → portrait table and questions as a slide');
blocks['c5-4'] = (B, { H }) => {
  H.fence(B, 0);
  /* the scene as written (bà ↔ cháu), tokenised: {A}/{a} the elder, {B}/{b} the guest; askAge / age per pair card */
  const script = [
    { r: 'B', t: '{b} chào {A} ạ.' },
    { r: 'A', t: 'Ừ, {a} chào {B}. {B} tên gì?' },
    { r: 'B', t: 'Dạ, {b} tên là ___ ạ.' },
    { r: 'A', t: 'Ừ, {B} ngồi đi. {B} mấy tuổi rồi?' },
    { r: 'B', t: 'Dạ, năm nay {b} ___ tuổi ạ.' },
    { r: 'A', t: '{B} là người ở đâu?' },
    { r: 'B', t: 'Dạ, {b} là người ___ ạ. {askAge}' },
    { r: 'A', t: '{age}' },
    { r: 'B', t: 'Dạ. {b} mời {A} ăn cơm ạ.' },
    { r: 'A', t: 'Ừ, {B} ăn đi.' },
    { r: 'B', t: 'Dạ thưa {A}, {b} xin phép về ạ.' },
    { r: 'A', t: 'Ừ, lần sau {{đến|tới}} chơi {{nhé|nha}}.' },
  ];
  H.note('c5-4', 'engine Drama Studio with pair cards bà / chú / cô (the script switches pronouns; the cô card swaps the age question as the key says). The Tín and anh Đức Anh cards (guest is the older one) need elder lines content.md does not write → they stay as cards with the teacher key');
  return { script, pairs: ['ba_chau', 'chu_chau', 'co_chau'], senior: 'A' };
};
blocks['h4-9'] = (B, { H }) => ({ prompts: H.fence(B, 0).lines.map(l => ({ vi: H.vi(l).vi, model: false, ask: false, maxSec: 30 })) });
blocks['h5-5'] = (B, ctx) => { ctx.H.note('h5-5', 'the app does not play the elder’s lines between the learner’s turns → two recording slots for the whole scene; the script is in Drama Studio 1'); return { prompts: [{ vi: 'Lần 1 · cả cảnh', en: 'Take 1 · the whole scene', model: false, ask: false, maxSec: 180 }, { vi: 'Lần 2 · cả cảnh', en: 'Take 2 · the whole scene', model: false, ask: false, maxSec: 180 }] }; };
blocks['h5-10'] = (B, { H }) => {
  const ex = H.fence(B, 0);
  const rub = H.line(B, /^\*Rubric \(formative/);
  const checklist = H.txt(rub.text).replace(/^Rubric \(formative, not scored\):\s*/, '').split('☐').map(s => s.trim()).filter(Boolean).map(s => ({ vi: s, en: '' }));
  return { minWords: 12, checklist,
    after: '<p class="dv-h">Ví dụ · Examples</p>' + H.viLinesHtml(ex.lines) };
};
blocks['c6-5'] = (B, { H }) => {
  H.fence(B, 0);
  return { script: [
    { r: 'B', t: '{b} mời {A} ăn cơm ạ.' },
    { r: 'B', t: 'Ngon lắm ạ!' },
    { r: 'B', t: 'Dạ thưa {A}, {b} xin phép về ạ.' },
    { r: 'B', t: '{b} cảm ơn cả nhà nhiều ạ.' },
    { r: 'A', t: 'Lần sau mấy đứa {{đến|tới}} chơi {{nhé|nha}}!' },
  ], pairs: ['ba_chau', 'chu_chau', 'co_chau'], senior: 'A' };
};
blocks['h8-2'] = (B, { H }) => {
  const cues = H.fence(B, 0).lines.map(l => H.vi(l, { speakers: false }).vi).join(' ');
  H.line(B, /^\*\*Cue cards/);
  return { prompts: [{ vi: cues, en: 'Take 1 · with the cue cards', model: false, ask: false, maxSec: 240 }, { vi: 'Lần 2', en: 'Take 2 · without the cue cards', model: false, ask: false, maxSec: 240 }] };
};
blocks['h9-8'] = (B, { H }) => {
  const ex = H.fence(B, 0);
  const chk = H.line(B, /^\*Check before you post/);
  return { minWords: 12,
    checklist: [{ vi: H.txt(chk.text).replace(/^Check before you post:\s*/, ''), en: '' }], after: '<p class="dv-h">Ví dụ · Examples</p>' + H.viLinesHtml(ex.lines) };
};

module.exports = { blocks, glossDeck };
