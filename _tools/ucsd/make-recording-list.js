#!/usr/bin/env node
/* UCSD recordings — run from site/:  node _tools/ucsd/make-recording-list.js
 *
 * For every page under src/ucsd/<course>/ whose front matter has
 *     recordFrom: VOCAB_DATA.word            (one or more ARRAY.field, comma-separated)
 * it reads that array from the page's own script and lists each text to record.
 * Writes
 *   src/ucsd/recorder/items.js   — the recorder's item list (published at /ucsd/recorder/)
 *   src/_data/ucsdAudio.json     — page URL → { spoken text → { VOICE → mp3 URL } }, only for files that exist;
 *                                  _includes/ucsd/audio.njk plays these instead of text-to-speech.
 * Audio lives at src/ucsd/<course>/audio/<page>/<text-slug>-<VOICE>.mp3, VOICE = NF / NM / SF / SM
 * (Bắc·nữ, Bắc·nam, Nam·nữ, Nam·nam, as in VIET 100) — the recorder's .zip already has
 * that layout, so a zip from the instructor unzips straight into src/ucsd/.
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '../../src/ucsd');
const COURSES = require('../../src/_data/ucsd.js').byCode;

const slug0 = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';
// Long texts (reading passages) would exceed the 255-byte file-name limit: keep 80 chars + a 6-char hash of the full slug.
const slug = s => { const f = slug0(s); return f.length <= 80 ? f : f.slice(0, 80).replace(/-$/, '') + '-' + require('crypto').createHash('md5').update(f).digest('hex').slice(0, 6); };
const VOICES = ['NF', 'NM', 'SF', 'SM'];
const key = s => String(s).normalize('NFC').toLowerCase().replace(/[.,!?;:…"“”]/g, '').replace(/\s+/g, ' ').trim();

// The array literal after "const NAME =" (string-aware bracket matching), evaluated in a sandbox.
function readArray(src, name) {
  const m = new RegExp('(?:const|let|var)\\s+' + name + '\\s*=\\s*\\[').exec(src);
  if (!m) throw new Error('array ' + name + ' not found');
  let i = m.index + m[0].length - 1, depth = 0, q = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') q = c;
    else if (c === '[') depth++;
    else if (c === ']' && --depth === 0) return vm.runInNewContext('(' + src.slice(i, j + 1) + ')');
  }
  throw new Error('array ' + name + ' not closed');
}

// recordFrom: SG — study-guide pages (see _includes/ucsd/sg-engine.njk). The page holds window.SG = {...}; the spoken texts are
// the words, every data-say="…" in the page HTML, the word-order answers, the readings and the model essays / letters.
function readObject(src, marker) {
  const at = src.indexOf(marker); if (at < 0) throw new Error(marker + ' not found');
  let i = src.indexOf('{', at), depth = 0, q = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') q = c;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return vm.runInNewContext('(' + src.slice(i, j + 1) + ')');
  }
  throw new Error(marker + ' not closed');
}
function sgTexts(src) {
  const SG = readObject(src, 'window.SG ='), out = [];
  SG.words.forEach(r => out.push(r[3] || r[1]));
  for (const m of src.matchAll(/ data-say="([^"]+)"/g)) out.push(m[1]);
  SG.arrange.forEach(x => { out.push(x.a); (x.alt || []).forEach(t => out.push(t)); });
  SG.reads.forEach(r => out.push(r.say));
  Object.values(SG.topics).forEach(t => { out.push(t.model.join(' ')); if (t.letter) out.push(t.letter); });
  return out;
}

const items = [], audio = {}, listed = new Set();   // listed: a recording shared by two pages is offered once in the recorder
// The recorder tells pages apart by this id. Two courses can have a page with the same file name (the 114 and 124 midterm guides),
// so a name used in more than one course gets the course as a prefix: 114-midterm-written-study-guide.
const nameCount = {};
for (const course of Object.keys(COURSES)) {
  const dir = path.join(ROOT, course);
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.html')))
    if (/^recordFrom:/m.test(fs.readFileSync(path.join(dir, f), 'utf8'))) nameCount[f] = (nameCount[f] || 0) + 1;
}
for (const course of Object.keys(COURSES).sort()) {
  const dir = path.join(ROOT, course);
  if (!fs.existsSync(dir)) continue;
  const ord = f => +((/^order:\s*(\d+)/m.exec(fs.readFileSync(path.join(dir, f), 'utf8')) || [])[1] || 99);   // hub order: the main version of a page lists shared recordings
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.html')).sort((a, b) => ord(a) - ord(b) || a.localeCompare(b))) {
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = (/^---\n([\s\S]*?)\n---/.exec(src) || [])[1] || '';
    const rf = (/^recordFrom:\s*(.+)$/m.exec(fm) || [])[1];
    if (!rf) continue;
    const page = f.replace(/\.html$/, ''), url = `/ucsd/${course}/${f}`;
    const adir = ((/^audioDir:\s*([\w-]+)/m.exec(fm) || [])[1]) || page;   // audioDir: lets two versions of a page share recordings
    const title = ((/^title:\s*"?(.*?)"?$/m.exec(fm) || [])[1]) || page;
    const seen = new Set(), used = new Set();
    const texts = [];
    if (rf.trim() === 'SG') sgTexts(src).forEach(t => texts.push(t));
    else for (const spec of rf.split(',').map(s => s.trim()).filter(Boolean)) {
      const [arr, field] = spec.split('.');
      for (const row of readArray(src, arr)) texts.push(row[field]);
    }
    {
      for (const raw of texts) {
        const text = String(raw || '').trim();
        if (!text || seen.has(key(text))) continue;
        seen.add(key(text));
        let name = slug(text), n = 2; while (used.has(name)) name = slug(text) + '-' + n++;
        used.add(name);
        const file = `${course}/audio/${adir}/${name}`;   // item id; the recorder adds -<VOICE>.mp3
        const voices = VOICES.filter(v => fs.existsSync(path.join(ROOT, `${file}-${v}.mp3`)));
        if (!listed.has(file)) listed.add(file), items.push({ page: nameCount[f] > 1 ? course + '-' + page : page, day: COURSES[course].name, title, section: 'Từ vựng · Vocabulary',
          note: 'Đọc rõ ràng, tự nhiên · Read clearly and naturally.', file, speaker: '', text, say: text, voices });
        if (voices.length) (audio[url] = audio[url] || {})[key(text)] = Object.fromEntries(voices.map(v => [v, `/ucsd/${file}-${v}.mp3`]));
      }
    }
  }
}
fs.writeFileSync(path.join(ROOT, 'recorder/items.js'),
  '/* GENERATED by _tools/ucsd/make-recording-list.js — do not edit by hand.\n   Words: content by Hoan Nguyen (UC San Diego) — © Hoan Nguyen, reuse needs her permission. Tool: design by HUY · Open Vietnamese Initiative. */\nwindow.REC_ITEMS = ' + JSON.stringify(items, null, 1) + ';\n');
fs.writeFileSync(path.join(__dirname, '../../src/_data/ucsdAudio.json'), JSON.stringify(audio, null, 1) + '\n');
const pages = [...new Set(items.map(x => x.page))];
console.log(`${items.length} items on ${pages.length} page(s).`);
pages.forEach(p => { const its = items.filter(x => x.page === p);
  console.log('  ' + p + ': ' + VOICES.map(v => v + ' ' + its.filter(x => x.voices.includes(v)).length + '/' + its.length).join(' · ')); });
