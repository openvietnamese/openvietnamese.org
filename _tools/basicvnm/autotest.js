/* Interactive books — generic lesson autotest.
   Injected into a built lesson page by check.sh. Lints the lesson data,
   then plays every activity with its own answer key and expects 100 %
   mastery / 3 stars, no JS errors, and no sideways scroll on any tab.
   Also exercises the vocab suite modes and the drama studio (every
   pronoun pair must render a script with no leftover template tokens).
   Doing Vietnamese pass 2 checks (only when the page uses them): first-visit voice picker (once), audio=first
   transcript gate, tonelab minimal pairs, reading volume, re-listen / speed-read timers, session / part chips + filter.
   Doing Vietnamese pass 3 (pilot b1u03; backward compatible): nested tasks (block.tasks) are linted, played and scored like
   blocks; reader slots (story without body); stories without match / order / fill ("Done reading"); notices without a
   question; shared rubrics; drama without feeling cards; audio-first passages without a file (marked heard via the
   engine's test hook); infogap holder "both".
   Results are written to <pre id="RESULTS"> for check.sh to print. */
(async function () {
  const out = [];
  const ok = (c, m) => out.push((c ? 'PASS ' : 'FAIL ') + m);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const C = window.BV_CHAPTER;
  const KEY = (window.BV_BOOK && window.BV_BOOK.key) || 'basic-vn';
  const state = () => (JSON.parse(localStorage.getItem(KEY) || '{}'))[C.id] || {};
  const byText = (root, t) => $$('button', root).find(b => b.textContent.trim() === t && !b.disabled);
  const strip = s => s.replace(/[.,!?;:…"“”]/g, '').replace(/\s+/g, ' ').trim();
  // Doing Vietnamese tonelab: tone of one syllable from its marks (null if more than one syllable)
  const TONES6 = ['ngang', 'huyền', 'sắc', 'hỏi', 'ngã', 'nặng'];
  const toneOf = w => { if (/\s/.test(String(w).trim())) return null; const m = String(w).normalize('NFD').match(/[\u0300\u0301\u0303\u0309\u0323]/); return !m ? 'ngang' : { '\u0300': 'huyền', '\u0301': 'sắc', '\u0309': 'hỏi', '\u0303': 'ngã', '\u0323': 'nặng' }[m[0]]; };

  /* players, shared by top-level blocks and story sub-tasks */
  const playMatch = (el, pairs) => {
    const [lc, rc] = $$('.match-col', el);
    pairs.forEach(p => { const l = byText(lc, p.a), r = byText(rc, p.b); if (l && r) { l.click(); r.click(); } });
  };
  const playBuilder = (el, items) => $$('.q', el).slice(0, items.length).forEach((q, i) => {
    const bank = q.querySelector('.build-bank');
    items[i].tiles.forEach(tt => { const x = $$('.tile', bank).find(y => y.textContent === tt); x && x.click(); });
    q.querySelector('.check-btn').click();
  });
  const playCloze = (el, items) => $$('.q', el).slice(0, items.length).forEach((q, i) => {
    const bank = q.querySelector('.build-bank');
    items[i].answers.forEach(a => { const x = $$('.tile', bank).find(y => y.textContent === a && !y.disabled); x && x.click(); });
    q.querySelector('.check-btn').click();
  });

  try {
    /* ── 0 · Doing Vietnamese: the first-visit voice picker (check.sh clears localStorage, so this is a first visit) ── */
    const BB0 = window.BV_BOOK || {};
    const DV = !!(window.BV_ENGINE && window.BV_ENGINE.name === 'dv');
    const pickerAsked = DV && !!BB0.askVoice;
    if (pickerAsked) {
      const dlg = document.querySelector('.dv-voice-dlg');
      const nOpts = dlg ? dlg.querySelectorAll('[data-voice]').length : 0;
      const nf = dlg && dlg.querySelector('[data-voice="NF"]');
      if (nf) nf.click();   // Bắc · nữ keeps the default dialect, so the page does not reload
      await sleep(20);
      const pf = JSON.parse(localStorage.getItem(BB0.prefsKey || (BB0.key + '-prefs')) || '{}');
      ok(!!dlg && nOpts === 4 && !document.querySelector('.dv-voice-dlg') && pf.voice === 'NF' && pf.voiceAsked === true && (!BB0.voiceKey || localStorage.getItem(BB0.voiceKey) === 'NF'),
        'voice picker: shown on the first visit (' + nOpts + ' voices), choice stored' + (BB0.voiceKey ? ' (series key ' + BB0.voiceKey + ')' : ''));
    }
    // audio=first dialogues: transcript and its button must start hidden (checked again after the audio "ends")
    const firstDlg = C.tabs.flatMap(t => t.blocks).filter(b => b.type === 'dialogue' && b.listen === 'first').map(b => {
      const tx = document.getElementById(b.id + '-tx'), btn = document.querySelector('[aria-controls="' + b.id + '-tx"]');
      return { b, tx, btn, startHidden: !!tx && tx.hidden && !!btn && btn.hidden };
    });

    /* ── 1 · lint the data ── */
    const lint = [];
    const ids = new Set();
    const checkMc = (it, w) => {
      if (!it.opts.includes(it.correct)) lint.push(w + ': correct not in opts (' + it.correct + ')');
      if (new Set(it.opts).size !== it.opts.length) lint.push(w + ': duplicate options');
      Object.keys(it.why || {}).forEach(k => { if (!it.opts.includes(k)) lint.push(w + ': why key not an option (' + k + ')'); });
    };
    const checkCloze = (it, w) => {
      const gaps = (it.text.match(/\{\d+\}/g) || []).length;
      if (gaps !== it.answers.length) lint.push(w + ': ' + gaps + ' gaps but ' + it.answers.length + ' answers');
      it.answers.forEach(a => { if (!it.bank.includes(a)) lint.push(w + ': answer not in bank (' + a + ')'); });
    };
    const checkBuilder = (it, w) => { if (strip(it.tiles.join(' ')).toLowerCase() !== strip(it.answer).toLowerCase()) lint.push(w + ': tiles ≠ answer'); };
    C.tabs.forEach(t => t.blocks.flatMap(b => [b].concat(b.tasks || [])).forEach(b => {
      if (b.id) { if (ids.has(b.id)) lint.push('duplicate block id ' + b.id); ids.add(b.id); }
      const where = t.id + '/' + (b.id || b.type);
      if (b.type === 'mc') b.items.forEach((it, i) => checkMc(it, where + '#' + (i + 1)));
      if (b.type === 'notice' && b.opts) checkMc(b, where);
      if (b.type === 'dialogue' && b.gist) checkMc(b.gist, where + ' gist');
      if (b.type === 'builder') b.items.forEach((it, i) => checkBuilder(it, where + '#' + (i + 1)));
      if (b.type === 'cloze') b.items.forEach((it, i) => checkCloze(it, where + '#' + (i + 1)));
      if (b.type === 'story' && b.pairs) {
        checkCloze(b.fill, where + ' fill');
        if (new Set(b.pairs.map(p => p[0])).size !== b.pairs.length || new Set(b.pairs.map(p => p[1])).size !== b.pairs.length) lint.push(where + ': duplicate pair text');
      }
      if (b.type === 'match') { const a = b.pairs.map(p => p.a), r = b.pairs.map(p => p.b); if (new Set(a).size !== a.length || new Set(r).size !== r.length) lint.push(where + ': duplicate match text'); }
      if (b.type === 'flashcards') { const v = b.cards.map(c => c.vi); if (new Set(v).size !== v.length) lint.push(where + ': duplicate card'); }
      if (b.type === 'vocab') { const v = b.words.map(c => c.vi); if (new Set(v).size !== v.length) lint.push(where + ': duplicate word'); }
      if (b.type === 'drama') (b.pairs || []).forEach(p => { if (!C.drama || !C.drama.pairs[p]) lint.push(where + ': unknown pair ' + p); });
      if (b.type === 'tf') b.items.forEach((it, i) => { if (typeof it.ans !== 'boolean') lint.push(where + '#' + (i + 1) + ': ans must be true/false'); });
      if (b.type === 'infogap') ['A', 'B'].forEach(rl => { if (!b.people.some(p => p.holder === rl)) lint.push(where + ': no information for student ' + rl); });
      if (b.type === 'builder') b.items.forEach((it, i) => (it.alts || []).forEach(a => { if (!a.every(x => it.tiles.concat(it.extra || []).includes(x))) lint.push(where + '#' + (i + 1) + ': alt uses a tile that is not in the bank'); }));   // DV pass 3
      if (b.type === 'tonelab') b.items.forEach((it, i) => {   // Doing Vietnamese
        const tn = it.tone || toneOf(it.word), auto = toneOf(it.word), w = where + '#' + (i + 1);
        if (!TONES6.includes(tn)) lint.push(w + ': unknown tone ' + tn);
        if (b.tones && !it.set && !b.tones.includes(tn)) lint.push(w + ': tone ' + tn + ' not in the block’s tones');
        if (it.tone && auto && auto !== it.tone) lint.push(w + ': “' + it.word + '” is ' + auto + ', data says ' + it.tone);
      });
      if (b.type === 'tonelab') b.items.forEach((it, i) => {   // Doing Vietnamese pass 2: minimal pairs
        if (!it.set) return;
        const w = where + '#' + (i + 1), base = x => String(x).normalize('NFD').replace(/[\u0300\u0301\u0303\u0309\u0323]/g, '').normalize('NFC').toLowerCase();
        if (!Array.isArray(it.set) || it.set.length < 2) lint.push(w + ': set needs 2+ words');
        else {
          if (!it.set.includes(it.word)) lint.push(w + ': set does not include ' + it.word);
          if (new Set(it.set).size !== it.set.length) lint.push(w + ': duplicate words in set');
          if (!it.contrast && new Set(it.set.map(base)).size !== 1) lint.push(w + ': set words differ in more than tone (' + it.set.join(' / ') + ')');
        }
      });
      if (b.listen && !['first', 'along', 'yes'].includes(b.listen)) lint.push(where + ': unknown listen ' + b.listen);
      if (b.part && !['A', 'B'].includes(b.part)) lint.push(where + ': unknown part ' + b.part);
      if (b.relisten && b.type !== 'dialogue') lint.push(where + ': relisten is for dialogue blocks');
      if (b.type === 'retrieve') b.items.forEach((it, i) => { if (!it.answer) lint.push(where + '#' + (i + 1) + ': no answer'); });
      if (b.type === 'record' && Array.isArray(b.fourThreeTwo) && b.fourThreeTwo.length !== 3) lint.push(where + ': fourThreeTwo needs 3 limits');
      if (b.type === 'readaloud' && !C.tabs.some(t2 => t2.blocks.some(x => x.type === 'story' && x.id === b.story))) lint.push(where + ': no story ' + b.story);
      if (b.tier && !['core', 'extend', 'optional'].includes(b.tier)) lint.push(where + ': unknown tier ' + b.tier);
      if (b.route && !['hl', 'l2'].includes(b.route)) lint.push(where + ': unknown route ' + b.route);
      if (b.type === 'rubric' && b.criteria) { const n = (b.levels || C.rubricLevels || []).length; if (!n) lint.push(where + ': no rubric levels'); b.criteria.forEach((c, i) => { if (c.desc && c.desc.length !== n) lint.push(where + ' criterion ' + (i + 1) + ': ' + c.desc.length + ' descriptors for ' + n + ' levels'); }); }
    }));
    if (!C.cando || !C.cando.length) lint.push('no cando statements');
    if (!C.tabs.some(t => t.blocks.some(b => b.type === 'report'))) lint.push('no report block');
    ok(!lint.length, 'data lint' + (lint.length ? ': ' + lint.join(' | ') : ' (' + ids.size + ' blocks)'));

    /* ── 2 · play every activity ── */
    const blocksOf = t => [...document.querySelector('#panel-' + t.id + ' .content-wrap').children].filter(el => !el.matches('.tab-intro, .next-wrap'));
    const widths = [], dramaBad = [], vocabBad = [], gapBad = [];
    for (const t of C.tabs) {
      document.getElementById('tab-' + t.id).click();
      await sleep(60);
      widths.push(t.id + ':' + document.documentElement.scrollWidth);
      const els = blocksOf(t);
      if (els.length !== t.blocks.length) { ok(false, t.id + ': rendered ' + els.length + ' of ' + t.blocks.length + ' blocks'); continue; }
      const playBlock = async (b, el) => {
        const qs = $$('.q', el);
        if ((b.listen === 'first' || b.listen === 'along') && window.BV_ENGINE && window.BV_ENGINE.markHeard && ['reading', 'story'].includes(b.type)) { window.BV_ENGINE.markHeard(b.id); await sleep(5); }
        if (b.type === 'mc') b.items.forEach((it, i) => { const x = byText(qs[i], it.correct); x && x.click(); });
        if (b.type === 'notice') { const x = byText(el, b.correct); x && x.click(); }
        if (b.type === 'dialogue' && b.gist) { const x = byText(el.querySelector('.gist'), b.gist.correct); x && x.click(); }
        if (b.type === 'tonelab') b.items.forEach((it, i) => { const x = qs[i].querySelector(Array.isArray(it.set) && it.set.length > 1 ? '[data-word="' + it.word + '"]' : '[data-tone="' + it.tone + '"]'); x && x.click(); });
        if (b.type === 'reading') { const d = el.querySelector('.rd-done'); if (d && !d.hidden) d.click(); }   // Doing Vietnamese pass 2: reading volume
        if (b.type === 'retrieve') qs.forEach(q => { const r = $$('button', q).find(x => x.textContent.includes('Xem đáp án')); r && r.click(); const g = q.querySelector('[data-rate="3"]'); g && g.click(); });
        if (b.type === 'tf') b.items.forEach((it, i) => { const x = $$('button', qs[i]).find(y => y.textContent.startsWith(it.ans ? 'Đúng' : 'Sai')); x && x.click(); });
        if (b.type === 'match') playMatch(el, b.pairs);
        if (b.type === 'builder') playBuilder(el, b.items);
        if (b.type === 'cloze') playCloze(el, b.items);
        if (b.type === 'story' && b.body) {
          el.open = true;
          if (b.pairs) {
            const [m, o, f] = $$(':scope > .story-tasks > .card', el);
            playMatch(m, b.pairs.map(([a, c]) => ({ a, b: c })));
            playBuilder(o, [{ tiles: b.order }]);
            playCloze(f, [b.fill]);
          } else { const d = el.querySelector('.rd-done'); if (d) d.click(); }
        }
        if (b.type === 'type') b.items.forEach((it, i) => { qs[i].querySelector('input').value = it.answers[0]; qs[i].querySelector('.check-btn').click(); });
        if (b.type === 'clockread') b.items.forEach((it, i) => { qs[i].querySelector('input').value = it.m ? it.h + ' giờ ' + it.m : it.h + ' giờ'; qs[i].querySelector('.check-btn').click(); });
        if (b.type === 'clockset') b.items.forEach((it, i) => {
          const q = qs[i];
          for (let k = 0; k < it.h % 12; k++) q.querySelector('[aria-label^="Giờ thêm"]').click();
          for (let k = 0; k < it.m / 5; k++) q.querySelector('[aria-label^="Phút thêm"]').click();
          q.querySelector('.check-btn').click();
        });
        if (b.type === 'flashcards') {
          for (let k = 0; k < b.cards.length * 2; k++) {
            const yes = el.querySelector('.know-btn.yes');
            if (el.querySelector('.fc-done')) break;
            el.querySelector('.flashcard').click();
            if (!yes.disabled) yes.click();
          }
        }
        if (b.type === 'vocab') {
          for (const m of (b.deck === 'series' ? ['review'] : []).concat(['list', 'learn', 'match', 'write', 'spell', 'cards'])) {
            const tab = el.querySelector('[data-mode="' + m + '"]');
            tab.click();
            await sleep(20);
            const stage = el.querySelector('.vstage');
            if (!stage.children.length || /undefined|NaN/.test(stage.textContent) || (m === 'review' && !stage.querySelector('.leitner'))) vocabBad.push(m);
          }
          const rows = el.querySelector('[data-mode="list"]'); rows.click(); await sleep(10);
          if (el.querySelectorAll('.wrow').length !== b.words.length) vocabBad.push('list rows ' + el.querySelectorAll('.wrow').length + '/' + b.words.length);
          el.querySelector('[data-mode="cards"]').click();
        }
        if (b.type === 'drama') {
          for (const pb of $$('.pair-row button', el)) {
            pb.click();
            await sleep(5);
            const txt = el.querySelector('.drama-script').textContent;
            if (/[{}[\]()<>|]/.test(txt) || /\s[,.!?]/.test(txt)) dramaBad.push(b.id + '/' + pb.dataset.pair + ': ' + txt.slice(0, 80));
          }
          const drawB = $$('button', el).find(x => x.textContent.includes('Bốc thẻ') && !x.hidden);
          if (drawB) { drawB.click(); if ($$('.scene-card', el).length < (C.drama && C.drama.feelings ? 3 : 1)) dramaBad.push(b.id + ': cards missing'); }
        }
        if (b.type === 'cando') $$('.cando-opts', el).forEach(g => g.querySelectorAll('button')[2].click());
        if (b.type === 'infogap') {
          for (const rl of ['A', 'B']) {
            el.querySelector('[data-role="' + rl + '"]').click();
            const known = $$('.gap-known', el).length, want = b.people.filter(p => p.holder === rl || p.holder === 'both').length;
            if (known !== want) gapBad.push(b.id + '/' + rl + ': ' + known + ' known cards, want ' + want);
          }
        }
        if (b.type === 'rubric' && b.criteria) $$(':scope > .card-body-pad .rub-levels', el).forEach(g => g.querySelectorAll('button')[2].click());
        if (b.type === 'writing') {
          const ta = el.querySelector('textarea');
          ta.value = Array(b.minWords + 1).fill('từ').join(' ');
          ta.dispatchEvent(new Event('input'));
          $$('button', el).find(x => x.textContent.startsWith('Lưu')).click();
        }
        // DV pass 3: nested tasks, in order
        if (b.tasks && b.tasks.length) {
          const wrap = el.querySelector('.dv-tasks');
          const tels = wrap ? [...wrap.children] : [];
          for (let k = 0; k < b.tasks.length; k++) if (tels[k]) await playBlock(b.tasks[k], tels[k]);
        }
        await sleep(10);
      };
      for (let bi = 0; bi < t.blocks.length; bi++) await playBlock(t.blocks[bi], els[bi]);
    }
    await sleep(150);

    /* ── 3 · results ── */
    const S = state();
    ok(S.mastery === 100, 'mastery ' + S.mastery + '% (want 100)');
    ok(S.stars === 3 && S.badge === true, 'stars ' + S.stars + ', badge ' + S.badge);
    const missing = [];
    const n = k => k;
    C.tabs.forEach(t => t.blocks.flatMap(b => [b].concat(b.tasks || [])).forEach(b => {
      const keys = ['mc', 'tf', 'builder', 'type', 'clockread', 'clockset', 'cloze', 'tonelab'].includes(b.type)
        ? b.items.map((_, i) => b.id + '-' + (i + 1))
        : b.type === 'match' ? b.pairs.map((_, i) => b.id + '-' + (i + 1))
        : b.type === 'story' ? (b.pairs || []).map((_, i) => b.id + '-pairs-' + (i + 1)).concat(b.pairs ? [b.id + '-order-1', b.id + '-fill-1'] : [])
        : b.type === 'notice' ? (b.opts ? [b.id] : []) : b.type === 'dialogue' && b.gist ? [b.id + '-gist'] : [];
      keys.map(n).forEach(k => { if (!S.items[k] || S.items[k].pts !== 10) missing.push(k + '=' + (S.items[k] ? S.items[k].pts : 'none')); });
    }));
    ok(!missing.length, 'every item full marks' + (missing.length ? ': ' + missing.slice(0, 12).join(', ') : ''));
    if (C.tabs.some(t => t.blocks.some(b => b.type === 'drama'))) ok(!dramaBad.length, 'drama scripts clean for every pronoun pair' + (dramaBad.length ? ': ' + dramaBad.slice(0, 4).join(' | ') : ''));
    if (C.tabs.some(t => t.blocks.some(b => b.type === 'infogap'))) ok(!gapBad.length, 'info gap: A and B see different cards' + (gapBad.length ? ': ' + gapBad.join(' | ') : ''));
    if (C.tabs.some(t => t.blocks.some(b => b.type === 'rubric'))) ok(C.tabs.every(t => t.blocks.flatMap(b => [b].concat(b.tasks || [])).every(b => b.type !== 'rubric' || !b.criteria || (S.rubric && S.rubric[b.id] && S.rubric[b.id].filter(Boolean).length === b.criteria.length))), 'rubrics: every criterion rated');
    if (C.tabs.some(t => t.blocks.some(b => b.type === 'vocab'))) ok(!vocabBad.length, 'vocab suite: all 6 modes render' + (vocabBad.length ? ': ' + vocabBad.join(', ') : ''));
    // per text node: a stray null sits flush against neighbours ("Kiểm tranull"), so \b on the joined textContent misses it
    const junk = [], tw = document.createTreeWalker(document.getElementById('bv-app'), NodeFilter.SHOW_TEXT);
    // Doing Vietnamese: also leftover {{N|S}} variants, variant markers, and {locale} tokens the book defines
    const LOC = window.BV_BOOK && window.BV_BOOK.locale ? Object.keys(window.BV_BOOK.locale) : [];
    const JUNK = new RegExp('\\[object \\w+\\]|\\bnull\\b|\\bundefined\\b|\\bNaN\\b|\\{\\{|\\}\\}|[\\uE000-\\uE002]' + (LOC.length ? '|\\{(?:' + LOC.join('|') + ')\\}' : ''), 'g');
    while (tw.nextNode()) for (const m of tw.currentNode.nodeValue.match(JUNK) || []) {
      const at = tw.currentNode.parentElement, blk = at.closest('[id^="b-"], .card');
      junk.push(m + ' in .' + (at.className || at.tagName.toLowerCase()) + (blk && blk.id ? ' #' + blk.id : ''));
    }
    ok(!junk.length, 'no stray [object …] / null / undefined text' + (junk.length ? ': ' + [...new Set(junk)].join(', ') : ''));
    const wide = widths.filter(w => +w.split(':')[1] > innerWidth);
    ok(!wide.length, 'no sideways scroll at ' + innerWidth + 'px' + (wide.length ? ': ' + wide.join(' ') : ''));
    const silent = $$('[data-say]').filter(b => !b.dataset.say.trim() && !b.closest('.now-line'));
    ok(!silent.length, 'no empty 🔊 buttons (' + $$('[data-say]').length + ' total)');
    const audios = $$('audio').filter(a => a.src);
    if (audios.length) ok(audios.every(a => /^https?:/.test(a.src)), 'audio sources (' + audios.length + ')');
    /* ── Doing Vietnamese features (only checked when the page uses them) ── */
    const BB = window.BV_BOOK || {};
    if (BB.draft) ok(/BẢN NHÁP · DRAFT/.test((document.querySelector('.draft-badge') || {}).textContent || '') && !!document.querySelector('meta[name="robots"][content*="noindex"]'), 'draft badge + noindex');
    if (BB.theme && BB.theme.brand) ok(((document.querySelector('.dv-brand') || {}).textContent || '').includes(BB.theme.brand), 'theme brand in hero');
    const dBtn = document.getElementById('bvDialect');
    if (dBtn) {
      const chips = $$('.vv');
      const shows = side => chips.every(c => c.textContent === c.dataset[side]);
      const start = shows('n') ? 'n' : shows('s') ? 's' : null;
      dBtn.click(); await sleep(10);
      const flipped = shows(start === 'n' ? 's' : 'n');
      dBtn.click(); await sleep(10);
      ok(chips.length > 0 && !!start && flipped && shows(start), 'variant chips: ' + chips.length + ', dialect switch Bắc ⇄ Nam');
    }
    const view = document.querySelector('.dv-view');
    if (view) {
      const blk = sel => $$('.content-wrap > ' + sel);   // top-level blocks only (the view bar's own buttons carry data-route too)
      const tagged = (attr, val) => blk('[data-' + attr + ']').filter(el => el.dataset[attr] !== val);
      const coreBtn = view.querySelector('button[aria-pressed]');
      coreBtn.click(); await sleep(20);
      const nonCore = tagged('tier', 'core'), coreOk = nonCore.length > 0 && nonCore.every(el => el.hidden) && blk('[data-tier="core"]').every(el => !el.hidden);
      const mCore = state().mastery;
      coreBtn.click(); await sleep(20);
      view.querySelector('[data-route="hl"]').click(); await sleep(20);
      const rt = sel => $$('.content-wrap ' + sel).filter(el => !el.matches('button'));   // DV pass 3: nested tasks carry routes too
      const routeOk = rt('[data-route="l2"]').length > 0 && rt('[data-route="l2"]').every(el => el.hidden) && rt('[data-route="hl"]').every(el => !el.hidden || el.parentElement.closest('[hidden]'));
      view.querySelector('[data-route="both"]').click(); await sleep(20);
      ok(coreOk && routeOk && mCore === 100 && blk('[data-tier], [data-route]').every(el => !el.hidden) && state().mastery === 100,
        'view filter: core only hides ' + nonCore.length + ' blocks (mastery ' + mCore + '%), HL hides L2, reset shows all');
    }
    /* ── Doing Vietnamese pass 2 ── */
    for (const f of firstDlg) {   // audio=first: still hidden after the gist was answered; shown once the audio has ended
      const stillHidden = f.tx.hidden;
      const au = f.tx.closest('.card').querySelector('audio');
      if (au) au.dispatchEvent(new Event('ended'));
      else if (window.BV_ENGINE && window.BV_ENGINE.markHeard) window.BV_ENGINE.markHeard(f.b.id);   // DV pass 3: per-line files, no episode file
      await sleep(30);
      if (f.tx.hidden && !f.btn.hidden) f.btn.click();
      ok(f.startHidden && stillHidden && (!!au || !!(window.BV_ENGINE && window.BV_ENGINE.markHeard)) && !f.tx.hidden && state().seen[f.b.id + '-heard'] === 1,
        'audio=first: ' + f.b.id + ' transcript hidden until the audio played to the end, then shown');
    }
    const pairItems = C.tabs.flatMap(t => t.blocks).filter(b => b.type === 'tonelab').flatMap(b => b.items.map((it, i) => ({ it, k: b.id + '-' + (i + 1) }))).filter(x => Array.isArray(x.it.set));
    if (pairItems.length) ok(pairItems.every(x => S.items[x.k] && S.items[x.k].pts === 10) && $$('.pair-opt').length === pairItems.reduce((a, x) => a + x.it.set.length, 0),
      'tonelab minimal pairs: ' + pairItems.length + ' items scored (' + $$('.pair-opt').length + ' word buttons)');
    const allB = C.tabs.flatMap(t => t.blocks);
    if (DV && allB.some(b => b.part || b.session)) {
      const nPart = allB.filter(b => b.part).length, chips = $$('#bv-app .part-chip').length;
      const sel = document.querySelector('.dv-session');
      let filt = true, s0 = '';
      if (sel) {
        s0 = sel.options[1].value;
        sel.value = s0; sel.dispatchEvent(new Event('change')); await sleep(20);
        const tagged = $$('.content-wrap > [data-session]');
        filt = tagged.some(el => el.dataset.session !== s0) && tagged.every(el => el.hidden === (el.dataset.session !== s0)) && state().mastery === 100;
        sel.value = ''; sel.dispatchEvent(new Event('change')); await sleep(20);
        filt = filt && tagged.every(el => !el.hidden);
      }
      ok(chips === nPart && filt, 'sessions: ' + chips + ' part chips (want ' + nPart + ')' + (sel ? ', filter “' + s0 + '” hides the other sessions, reset shows all' : ''));
    }
    // fluency: speed read (story fluency: true) and timed re-listen at 1.0× (dialogue relisten: true)
    const speedSt = allB.filter(b => b.type === 'story' && (b.fluency === true || b.strand === 'fluency'));
    const relDl = allB.filter(b => b.type === 'dialogue' && b.relisten);
    const relNoFile = [];
    if (speedSt.length || relDl.length) {
      const tts = window.speechSynthesis, realSpeak = tts && tts.speak;
      if (tts) tts.speak = () => {};   // the browser voice never "ends" here, so only the simulated audio end finishes a re-listen
      const tabOf = b => C.tabs.find(t => t.blocks.includes(b));
      for (const b of speedSt) {
        document.getElementById('tab-' + tabOf(b).id).click(); await sleep(20);
        const el = blocksOf(tabOf(b))[tabOf(b).blocks.indexOf(b)], tb = el.querySelector('.st-timer');
        el.open = true;
        tb.click(); await sleep(1300); tb.click(); await sleep(20);
      }
      for (const b of relDl) {
        document.getElementById('tab-' + tabOf(b).id).click(); await sleep(20);
        const el = blocksOf(tabOf(b))[tabOf(b).blocks.indexOf(b)], rb = el.querySelector('.fl-relisten');
        const au = el.querySelector('audio');
        if (!au) { relNoFile.push(b.id + (rb ? '' : ' (no button)')); continue; }   // DV pass 3: per-line files only; the browser voice is stubbed here
        rb.click(); await sleep(1300);
        au.dispatchEvent(new Event('ended')); await sleep(20);
      }
      if (tts) tts.speak = realSpeak;
      const F = state().fluency || {};
      ok(speedSt.every(b => F[b.id] && F[b.id].kind === 'read' && F[b.id].best > 0) && relDl.every(b => relNoFile.some(x => x === b.id) || (F[b.id] && F[b.id].kind === 'listen' && F[b.id].n === 1 && F[b.id].last >= 1)),
        'fluency timers' + (relNoFile.length ? ' (re-listen button only, no episode file: ' + relNoFile.join(', ') + ')' : '') + ': ' + speedSt.map(b => b.id + ' ' + (F[b.id] ? F[b.id].best + ' syl/min' : 'none')).concat(relDl.map(b => b.id + ' ' + (F[b.id] ? F[b.id].last + ' s' : 'none'))).join(', '));
    }
    const ftt = C.tabs.flatMap(t => t.blocks).filter(b => b.type === 'record' && b.fourThreeTwo);
    if (ftt.length) ok($$('.ftt').length === ftt.reduce((a, b) => a + b.prompts.length, 0) && $$('.ftt').every(q => q.querySelectorAll('.rec-btn').length === 3), '4/3/2 recorder: 3 takes per prompt');
    if (C.tabs.some(t => t.blocks.some(b => b.type === 'vocab' && b.deck === 'series'))) {
      const deck = JSON.parse(localStorage.getItem((BB.key || 'basic-vn') + '-deck') || '{}');
      ok(deck.w && Object.keys(deck.w).length > 0, 'series deck: ' + Object.keys(deck.w || {}).length + ' words stored under ' + (BB.key || 'basic-vn') + '-deck');
    }
    document.getElementById('tab-report').click();
    await sleep(200);
    if (window.BV_ENGINE && window.BV_ENGINE.name === 'dv' && C.tabs.some(t => t.blocks.some(b => b.strand && b.mins))) ok(!!document.querySelector('#panel-report .strand-meter') && /First-try success/.test(document.querySelector('#panel-report').textContent), 'report: strand meter + first-try success');
    ok(/Kết quả từng phần/.test(document.querySelector('#panel-report').textContent), 'report renders');
    if (DV && allB.some(b => b.type === 'reading')) {   // reading volume = finished stories + readings marked done
      const vv = s => String(s).replace(/\uE000([^\uE001]*)\uE001[^\uE002]*\uE002/g, '$1');
      const nw = s => vv(s).split(/\s+/).filter(Boolean).length;
      const want = allB.filter(b => b.type === 'story' && b.body).reduce((a, b) => a + nw(b.body.map(x => x.s).join(' ')), 0) + allB.filter(b => b.type === 'reading').reduce((a, b) => a + nw(b.vi.join(' ')), 0);
      const row = document.querySelector('#panel-report .rd-volume');
      ok(!!row && row.textContent.includes(want + ' từ') && /Reading volume/.test(row.textContent), 'report: reading volume ' + (row ? row.textContent.replace(/\s+/g, ' ').trim() : 'missing') + ' (want ' + want + ')');
    }
    if (DV && (state().fluency && Object.keys(state().fluency).length)) ok($$('#panel-report .fl-log').length === Object.keys(state().fluency).length, 'report: fluency log rows ' + $$('#panel-report .fl-log').length);
    if (window.BV_BOOK && window.BV_BOOK.codePrefix) ok(new RegExp(window.BV_BOOK.codePrefix + '-\\d+-\\d+-[0-9A-Z]+').test(document.querySelector('#panel-report').textContent), 'completion code shown');
    if (C.tabs.some(t => t.blocks.some(b => b.type === 'rubric'))) ok(/Tổng · Total/.test(document.querySelector('#panel-report').textContent), 'rubrics in report');
    ok(true, 'XP ' + S.xp + ' / ' + document.getElementById('bvXpCount').textContent);
    if (pickerAsked) {   // a second visit (the published page, same storage) must not ask again
      const fr = document.createElement('iframe');
      fr.style.cssText = 'width:480px;height:300px;border:0';
      fr.src = location.pathname.replace(/-test\.html$/, '.html');
      document.body.append(fr);
      await new Promise(r => { fr.onload = r; setTimeout(r, 15000); });
      await sleep(300);
      const d = fr.contentDocument;
      ok(!!d && !!d.querySelector('.chapter-hero') && !d.querySelector('.dv-voice-dlg') && /Bắc · nữ/.test((d.getElementById('bvVoice') || {}).textContent || ''),
        'voice picker: not shown again on the next visit (hero 🎙 ' + ((d && d.getElementById('bvVoice') || {}).textContent || '?') + ')');
      fr.remove();
    }
  } catch (e) {
    out.push('FAIL exception ' + e.stack);
  }
  const pre = document.createElement('pre');
  pre.id = 'RESULTS';
  pre.textContent = out.join('\n');
  document.body.prepend(pre);
})();
