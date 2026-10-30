#!/usr/bin/env bash
# Interactive books — build the site to a temp folder and autotest lessons.
#   bash _tools/basicvnm/check.sh                       # every Basic Vietnamese chapter
#   bash _tools/basicvnm/check.sh 4 7                   # just these chapters
#   BOOK=uncviet/viet100 bash _tools/basicvnm/check.sh  # every VIET 100 lesson (data/lNN.js)
#   ENGINE=1 bash _tools/basicvnm/check.sh 4            # also run engine-test.js (Basic Vietnamese ch04 regression)
# A lesson page is src/$BOOK/<name>.html for each src/$BOOK/data/<name>.js.
# Needs Google Chrome; runs headless at 500px (Chrome's minimum headless width).
set -euo pipefail
SITE="$(cd "$(dirname "$0")/../.." && pwd)"
TOOLS="$SITE/_tools/basicvnm"
BOOK="${BOOK:-basicvnm}"
OUT="$(mktemp -d)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=${PORT:-8765}
if lsof -ti :"$PORT" >/dev/null 2>&1; then echo "port $PORT is busy (stale server?) — run: kill $(lsof -ti :$PORT)"; exit 1; fi

cd "$SITE"
npx @11ty/eleventy --output="$OUT" --quiet >/dev/null
cp "$TOOLS/autotest.js" "$TOOLS/engine-test.js" "$OUT/"

pages=()
for f in src/$BOOK/data/*.js; do
  name=$(basename "$f" .js)
  num=$(sed -n 's/^[a-z]*0*\([0-9][0-9]*\)$/\1/p' <<<"$name")
  if [ $# -eq 0 ]; then pages+=("$name"); else for n in "$@"; do [ "$n" = "$num" ] && pages+=("$name"); done; fi
done

python3 -m http.server $PORT --directory "$OUT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null; rm -rf "$OUT"' EXIT
sleep 1

fails=0
run() {  # $1 = page name (no .html), $2 = test script
  python3 - "$OUT/$BOOK/$1.html" "$2" <<'PY'
import sys
page, test = sys.argv[1], sys.argv[2]
s = open(page, encoding="utf-8").read()
err = ('<script>localStorage.clear();addEventListener("error",e=>{const p=document.createElement("pre");'
       'p.id="RESULTS";p.textContent="FAIL JS error: "+e.message+" @"+e.filename+":"+e.lineno;document.documentElement.append(p)});</script>')
s = s.replace("<head>", "<head>" + err, 1).replace("</body>", f'<script src="/{test}"></script></body>', 1)
open(page.replace(".html", "-test.html"), "w", encoding="utf-8").write(s)
PY
  "$CHROME" --headless=new --disable-gpu --window-size=500,900 --virtual-time-budget=90000 \
    --dump-dom "http://localhost:$PORT/$BOOK/$1-test.html" 2>/dev/null \
  | python3 -c 'import re,html,sys; s=sys.stdin.read(); print("\n".join(html.unescape(m) for m in re.findall(r"<pre id=\"RESULTS\">([\s\S]*?)</pre>", s)) or "FAIL no results (page did not finish)")'
}
for name in "${pages[@]}"; do
  echo "── $BOOK/$name ─────────────────────────"
  res=$(run "$name" autotest.js); echo "$res"
  if [ "${ENGINE:-}" = 1 ]; then res2=$(run "$name" engine-test.js); echo "$res2"; res="$res"$'\n'"$res2"; fi
  grep -q '^FAIL' <<<"$res" && fails=$((fails+1)) || true
done
echo
[ ${#pages[@]} -gt 0 ] || { echo "no lessons matched"; exit 1; }
[ $fails -eq 0 ] && echo "ALL LESSONS PASS (${#pages[@]})" || { echo "$fails lesson(s) with failures"; exit 1; }
