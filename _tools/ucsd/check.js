#!/usr/bin/env node
/* UCSD consistency check — run from site/:  node _tools/ucsd/check.js
 * Builds the site into a temp folder, then checks every page under /ucsd/:
 *   credit comment (Content by Hoan Nguyen · Design by HUY · Open Vietnamese), UCSD bar + footer,
 *   fonts (Roboto / Roboto Slab only), <html lang>, <title>, no leftover template tags, NFC text,
 *   local audio/image files exist; warns on colours outside the UCSD palette + shared neutrals.
 * Exit code 1 if anything fails.
 */
const fs = require('fs'), path = require('path'), os = require('os'), { execSync } = require('child_process');

const SITE = path.join(__dirname, '../..');
const OUT = fs.mkdtempSync(path.join(os.tmpdir(), 'ucsd-check-'));
execSync(`npx @11ty/eleventy --output="${OUT}" --quiet`, { cwd: SITE, stdio: ['ignore', 'ignore', 'inherit'] });

// UCSD palette, the neutrals the reference page (134/family-customs-vocabulary) uses, and feedback colours.
const OK_COLOURS = new Set(`#182B49 #00629B #C69214 #FFCD00 #FFFFFF #FFF #000000
  #F5F7FA #F2F6F9 #E6EFF5 #CCE0EB #D5E0E8 #DDE3E8 #DDE2EA #EEF1F5 #EEF3F8 #F7F8FA #FBFCFD #9AA9B5 #5B6770 #5B6575 #3D4A57 #1F2A37
  #15803D #16A34A #22C55E #DCFCE7 #E3F4EA #F0FDF4 #BBF7D0 #86EFAC #B91C1C #991B1B #DC2626 #EF4444 #FEE2E2
  #B45309 #8A6400 #A67910 #F5C200 #FFE8A8 #FFF4D6 #FFF8E1`.split(/\s+/).filter(Boolean));
const FONTS = /^(Roboto|Roboto Slab|Helvetica Neue|Helvetica|Arial|Georgia|serif|sans-serif|system-ui|ui-monospace|Menlo|monospace|inherit)$/;

const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && files.push(p); } })(path.join(OUT, 'ucsd'));

let fails = 0, warns = 0;
for (const file of files.sort()) {
  const rel = '/' + path.relative(OUT, file), s = fs.readFileSync(file, 'utf8');
  const isRedirect = /http-equiv="refresh"/.test(s), isRecorder = rel.startsWith('/ucsd/recorder/');
  const bad = [], warn = [];
  if (!/Content by Hoan Nguyen · Design by HUY · Supported by the Open Vietnamese Initiative/.test(s)) bad.push('credit comment missing');
  if (!/<html lang="(vi|en)"/.test(s)) bad.push('<html lang> missing');
  if (!/<title>[^<]+<\/title>/.test(s) || /<title>\s*·/.test(s)) bad.push('<title> missing or empty');
  if (/\{\{|\{%/.test(s.replace(/<script[\s\S]*?<\/script>/g, ''))) bad.push('leftover template tag');
  if (s !== s.normalize('NFC')) bad.push('text is not NFC (tone marks may render badly)');
  if (!isRedirect) {
    const gf = [...s.matchAll(/fonts\.googleapis\.com\/css2\?([^"]+)/g)].map(m => m[1]);
    if (gf.some(q => /family=(?!Roboto)/.test(q))) bad.push('Google font other than Roboto: ' + gf.join(' '));
    const fams = new Set([...s.matchAll(/font-family:\s*([^;}"]+)/g)].flatMap(m => m[1].split(',').map(x => x.trim().replace(/^['"]|['"]$/g, ''))));
    const odd = [...fams].filter(f => f && !FONTS.test(f));
    if (odd.length) bad.push('fonts outside the UCSD set: ' + odd.join(', '));
    if (!isRecorder) {
      if ((s.match(/class="ucsd-bar"/g) || []).length !== 1) bad.push('UCSD top bar missing or doubled');
      if ((s.match(/class="ucsd-footer"/g) || []).length !== 1) bad.push('UCSD footer missing or doubled');
      if (!/Powered by <a[^>]*>Open Vietnamese<\/a>/.test(s)) bad.push('footer credit text changed');
    }
    for (const m of s.matchAll(/(?:src|href)="([^"#?:]+\.(?:mp3|png|jpe?g|svg|webp|wav|m4a))"/g)) {
      const target = m[1].startsWith('/') ? path.join(OUT, m[1]) : path.join(path.dirname(file), m[1]);
      if (!fs.existsSync(target)) bad.push('missing file ' + m[1]);
    }
    const light = s.replace(/@media \(prefers-color-scheme: dark\)\s*\{[^{}]*\{[^{}]*\}\s*\}/g, '');   // dark-mode colours are a separate theme
    const off = [...new Set([...light.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-fA-F-])/g)].map(m => m[0].toUpperCase()))].filter(c => !OK_COLOURS.has(c));
    if (off.length) warn.push('colours outside the UCSD set: ' + off.join(' '));
  }
  fails += bad.length; warns += warn.length;
  console.log((bad.length ? '✗ ' : warn.length ? '△ ' : '✓ ') + rel + (isRedirect ? '  (redirect)' : ''));
  bad.forEach(b => console.log('    ✗ ' + b)); warn.forEach(w => console.log('    △ ' + w));
}
fs.rmSync(OUT, { recursive: true, force: true });
console.log(`\n${files.length} pages · ${fails} problem(s) · ${warns} warning(s)`);
process.exit(fails ? 1 : 0);
