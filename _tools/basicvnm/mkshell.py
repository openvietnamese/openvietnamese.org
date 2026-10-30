#!/usr/bin/env python3
"""Basic Vietnamese — (re)generate chapter shell pages from their data files.

    python3 _tools/basicvnm/mkshell.py          # every data/chNN.js
    python3 _tools/basicvnm/mkshell.py 1 2 3    # chosen chapters

Each shell is ch04.html's markup (Open Vietnamese header/footer, fonts,
favicon) with the chapter's title, description and data script swapped in.
Titles come from titleVi / titleEn in data/chNN.js.
"""
import re
import sys
from pathlib import Path

BOOK = Path(__file__).resolve().parents[2] / "src" / "basicvnm"
TEMPLATE = (BOOK / "ch04.html").read_text(encoding="utf-8")


def field(js, name):
    m = re.search(name + r':\s*"([^"]*)"', js)
    if not m:
        sys.exit(f"missing {name}")
    return m.group(1)


def build(n):
    js = (BOOK / "data" / f"ch{n:02d}.js").read_text(encoding="utf-8")
    vi, en = field(js, "titleVi"), field(js, "titleEn")
    desc = field(js, "description") if "description:" in js else f"Basic Vietnamese, Chapter {n}: {en}."
    page = TEMPLATE
    page = re.sub(r"permalink: \S+", f"permalink: /basicvnm/ch{n:02d}.html", page, count=1)
    page = re.sub(r"<title>.*?</title>", f"<title>Chương {n}: {vi} · {en} — Basic Vietnamese | Open Vietnamese</title>", page, count=1)
    page = re.sub(r'<meta name="description" content="[^"]*">',
                  f'<meta name="description" content="{desc} An interactive chapter from Open Vietnamese.">', page, count=1)
    page = page.replace('<script src="data/ch04.js"></script>', f'<script src="data/ch{n:02d}.js"></script>', 1)
    (BOOK / f"ch{n:02d}.html").write_text(page, encoding="utf-8")
    print(f"ch{n:02d}.html  {vi} · {en}")


nums = [int(a) for a in sys.argv[1:]] or sorted(int(p.stem[2:]) for p in (BOOK / "data").glob("ch*.js"))
for n in nums:
    if n != 4:          # ch04.html is the template itself
        build(n)
