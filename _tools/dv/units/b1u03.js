/* Unit map for Doing Vietnamese 1 · Bài 3 (b1u03) — used by _tools/dv/content-to-unit.js.
   One function per content.md block id: (B, ctx, base) → engine fields. Helpers: ctx.H (see content-to-unit.js).
   The map only decides structure; every learner-facing string comes from content.md. Split in parts by tab:
   b1u03/start-input.js · b1u03/story-notice.js · b1u03/lab-talk.js · b1u03/rest.js. Template for later units. */
'use strict';
const P = ['start-input', 'story-notice', 'lab-talk', 'rest'].map(f => require('./b1u03/' + f + '.js'));
const blocks = Object.assign({}, ...P.map(p => p.blocks));
const tabs = Object.assign({}, ...P.map(p => p.tabs || {}));

const titles = {
  'h6-1': { vi: 'Nhớ lại', en: 'Cụm từ, English → Vietnamese' },
  'c8-1': { vi: 'Nhớ lại', en: 'Bài 1–3 mixed: greet, age, origin (C8)' },
  'h9-1': { vi: 'Nhớ lại', en: 'Bài 0–3 core words' },
  'c9-3': { vi: 'Tin nhắn thoại của bà nội', en: 'Bà nội’s voice message to the class' },
  'lib-r8': { vi: 'Sách 8 · Lô tô đêm Trung thu', en: 'Lô tô on Trung thu night' },
  'c1-4': { vi: 'Lô tô vòng 1', en: 'Lô tô round 1 (structured input for numbers)' },
  'h6-5': { vi: 'Từ vựng 3 · Đến chơi nhà', en: 'deck (21 visit and meal words, 6 modes, recall first)' },
  'h6-11': { vi: 'Thử thách HL · Lễ phép và xưng hô', en: 'HL register challenge (optional)' },
  'h6-8': { vi: '4/3/2 ở nhà', en: '4/3/2 at home: Gia đình Vy (scaled; feeds class 7)' },
  'h8-2': { vi: 'Tập nhóm', en: 'T2 group rehearsal by voice or video (feeds the T2 performances)' },
  'c4-3': { vi: 'Ai nói với ai?', en: '→ the pairing rule (class)' },
};

function chapter(ctx) {
  const { H, all } = ctx;
  const B = all['h1-1'];
  const vi = H.fences(B)[0].lines.map(l => H.vi(l).vi);
  const en = H.lines(B).filter(e => /^- I can/.test(e.text)).map(e => H.txt(e.text.slice(2)));
  return {
    titleVi: 'Xưng hô và tuổi', titleEn: 'Address and Age',
    description: 'Doing Vietnamese 1 · Bài 3: numbers 1–100, asking and saying ages, choosing forms of address in a family, talking politely with elders.',
    color: '#B4442C',
    badge: { icon: '👵', name: 'Xưng hô · Address' },
    levels: { actfl: 'NM', cefr: 'A1', knltv: 1, reader: 1 },
    cando: vi.map((v, i) => ({ vi: v, en: en[i] || '' })),
    /* recording manifest (recording-script.md §1, D14, D25): one actor per character; real speakers by tag */
    cast: {
      'Vy': 'SF', 'Chú Lộc': 'SM', 'Đức Anh': 'NM', 'Hannah': 'NF', 'Khách': 'NF', 'Bác Tư': 'SM',
      'Bà nội': { actor: 'G-BA', dialect: 'S', note: 'Bà nội · older Southern woman; slow, warm' },
      'Cô Hằng': { actor: 'G-HANG', dialect: 'S', note: 'Cô Hằng · second Southern woman (not the SF actor)' },
      'Tín': { actor: 'G-TIN', dialect: 'S', note: 'Tín · teen (guardian consent) or young adult male; no pitch-shifting; English lines in a US teen accent' },
      'Marcus': { actor: 'G-MAR', dialect: 'N', note: 'Marcus · L2 male learner 1, careful Northern-leaning' },
      'Daniel': { actor: 'G-DAN', dialect: 'N', note: 'Daniel · L2 male learner 2 (ideally Korean-American)' },
      'Mọi người': { actor: 'GROUP', dialect: 'N', note: 'the four guest actors together' },
      'Hà Nội': { actor: 'REAL-HN', dialect: 'N', note: 'real speaker, Hà Nội (consent form, credit line); speaks in their own words' },
      'Sài Gòn': { actor: 'REAL-SG', dialect: 'S', note: 'real speaker, Sài Gòn; own words' },
      'Huế': { actor: 'REAL-HUE', dialect: 'N', note: 'real speaker, Huế (Central); own words' },
      'San Jose': { actor: 'REAL-SJ', dialect: 'S', note: 'US-born heritage speaker; own words' },
      'Cần Thơ': { actor: 'REAL-CT', dialect: 'S', note: 'real speaker, Cần Thơ; own words' },
      'Đống Đa': { actor: 'REAL-DD', dialect: 'N', note: 'real speaker, Hà Nội; own words' },
      'Los Angeles': { actor: 'REAL-LA', dialect: 'S', note: 'diaspora speaker; own words' },
    },
    /* Drama Studio pair cards (talk-tab table in content.md). Older person = the elder card. */
    drama: {
      pairs: {
        ba_chau: { label: 'bà ↔ cháu', older: { call: 'bà', self: 'bà' }, younger: { call: 'cháu', self: 'cháu' }, note: { vi: 'bà nội (81) và một vị khách', en: 'bà nội (81) and a guest' },
          vars: { askAge: 'Thưa bà, bà năm nay bao nhiêu tuổi ạ?', age: 'Bà tám mươi mốt tuổi rồi.' } },
        chu_chau: { label: 'chú ↔ cháu', older: { call: 'chú', self: 'chú' }, younger: { call: 'cháu', self: 'cháu' }, note: { vi: 'chú Lộc (52) và một vị khách · chú (bác OK) / cháu (con OK)', en: 'chú Lộc (52) and a guest · older says con or cháu' },
          vars: { askAge: 'Chú năm nay bao nhiêu tuổi ạ?', age: 'Chú năm mươi hai tuổi rồi.' } },
        co_chau: { label: 'cô ↔ cháu', older: { call: 'cô', self: 'cô' }, younger: { call: 'cháu', self: 'cháu' }, note: { vi: 'cô Hằng (49) và một vị khách · cô (dì, bác OK) / cháu (con OK)', en: 'cô Hằng (49) and a guest · older says con or cháu' },
          vars: { askAge: 'Còn cô, cô là người ở đâu ạ?', age: 'Cô là người Cần Thơ.' } },
        ong_chau: { label: 'ông ↔ cháu', older: { call: 'ông', self: 'ông' }, younger: { call: 'cháu', self: 'cháu' }, note: { vi: 'ông hàng xóm (khoảng 70)', en: 'the neighbour (about 70; T2 complication card)' } },
      },
    },
  };
}
module.exports = { chapter, titles, tabs, blocks };
