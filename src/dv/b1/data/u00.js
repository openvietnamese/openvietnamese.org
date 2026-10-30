/* Doing Vietnamese 1 · Bài 0 — Bản mẫu · Engine fixture (test page, not learner content)
   Uses every block type the DV engine supports, including the DV additions: theme + locale tokens ({campus}, {city}),
   {{N|S}} variant chips, tier / route view filter, retrieve, tonelab, strand meter (strand + mins, split strands),
   record fourThreeTwo, vocab deck: "series".
   Pass 2 (2026-10-30): first-visit voice picker (shell: askVoice), audio: "first" (d1, the content.md spelling) and
   listen: "along" (st1, r2), thought line (whisper track), cast (recording manifest: one voice per character, a guest actor),
   timed re-listen at 1.0× (d2 relisten), speed read (st2 fluency), tonelab minimal pairs (tl2 set), reading volume
   (reading blocks + "Done reading"), session / part / prep chips and the session filter.
   All sentences are original, short and neutral (written for this fixture, 2026-10-29). No textbook text.
   Test: cd site && BOOK=dv/b1 bash _tools/basicvnm/check.sh 0
   Engine: ../../assets/bv.js (DV copy of the viet101-hw engine). */
(function () {

const V = id => ({ NF: "audio/u00-" + id + "-NF.mp3", NM: "audio/u00-" + id + "-NM.mp3", SF: "audio/u00-" + id + "-SF.mp3", SM: "audio/u00-" + id + "-SM.mp3" });

window.BV_CHAPTER = {
  id: 0,
  titleVi: "Bản mẫu · Engine fixture",
  titleEn: "Engine fixture (test page)",
  description: "Doing Vietnamese engine fixture: every block type, for the automatic test. Not learner content.",
  color: "#B4442C",
  badge: { icon: "🧪", name: "Bản mẫu · Fixture" },

  cando: [
    { vi: "Tôi có thể chào hỏi và nói tên mình.", en: "I can greet people and say my name." },
    { vi: "Tôi có thể nói mình học ở đâu.", en: "I can say where I study." },
    { vi: "Tôi có thể nghe và nhận ra thanh điệu của một từ.", en: "I can hear a word and tell its tone." },
  ],

  /* recording manifest (_tools/dv/make-recording-list.js): who voices each character; unlisted speakers and narrators → all four voices */
  cast: { "Cô Lan": "NF", "An": { actor: "G-AN", dialect: "S", note: "Sinh viên trẻ, giọng Nam · young adult, Southern" } },

  rubricLevels: [{ vi: "Chưa đạt", en: "Not yet" }, { vi: "Đạt", en: "Meets" }, { vi: "Tốt", en: "Strong" }],

  drama: {
    pairs: {
      anh_em:  { label: "anh ↔ em", older: { call: "anh", self: "anh", selfPl: "các anh" }, younger: { call: "em", self: "em", selfPl: "chúng em" }, note: { vi: "Minh lớn tuổi hơn An.", en: "Minh is older than An." } },
      ban_toi: { label: "bạn ↔ tôi", peer: { call: "bạn", self: "tôi", selfPl: "chúng tôi" }, note: { vi: "Mới quen, lịch sự.", en: "Just met, polite." } },
    },
    feelings: [
      { e: "😊", vi: "vui vẻ", en: "cheerful", tip: { vi: "Cười, nói nhanh.", en: "Smile, speak quickly." } },
      { e: "😳", vi: "ngại ngùng", en: "shy", tip: { vi: "Nói nhỏ.", en: "Speak quietly." } },
    ],
    contexts: [
      { e: "📚", vi: "Ở thư viện", en: "In the library" },
      { e: "☕", vi: "Ở quán cà phê", en: "At a café" },
    ],
    twists: [{ vi: "Điện thoại reo.", en: "A phone rings." }],
    hotseat: [{ vi: "Bạn học ở đâu?", en: "Where do you study?" }],
  },

  tabs: [
    /* ── 1 · start: html (locale + variant in html), cando before, retrieve, clocknow ── */
    { id: "start", icon: "🎯", label: "Khởi động", intro: { vi: "Đây là trang thử máy, không phải bài học.", en: "This is an engine test page, not a lesson." },
      blocks: [
        { type: "html", title: { vi: "Chào mừng", en: "Welcome" }, strand: "input", mins: 2, tier: "core", html: `
          <p>Chào mừng bạn đến với {campus}! <button class="tts" data-say="{{Bố|Ba}} mẹ em ở {city}.">🔊</button> {{Bố|Ba}} mẹ em ở {city}.</p>
          <p class="en">Welcome to {campus}! (The underlined word has a Northern / Southern variant: tap it.)</p>` },
        { type: "cando", phase: "before", title: { vi: "Trước khi học", en: "Before you start" } },
        { type: "retrieve", id: "rt1", title: { vi: "Nhớ lại", en: "Recall" }, strand: "language", mins: 3, tier: "core", items: [
          { q: { vi: "“Student” tiếng Việt là gì?", en: "What is “student” in Vietnamese?" }, answer: "sinh viên", en: "student" },
          { q: { vi: "Chào cô giáo thế nào?", en: "How do you greet a female teacher?" }, say: "Chào cô giáo thế nào?", answer: "Em chào cô ạ.", hint: "em … ạ" },
        ] },
        { type: "clocknow", title: { vi: "Bây giờ là mấy giờ?", en: "What time is it now?" }, text: { vi: "Nghe và nói theo.", en: "Listen and repeat." }, tier: "optional" },
      ] },

    /* ── 2 · input: dialogue (voices, gist, variants), mc (listening, qHtml, why), tf ── */
    { id: "input", icon: "🎧", label: "Nghe & xem",
      blocks: [
        { type: "dialogue", id: "d1", title: { vi: "Hội thoại: Sinh viên mới", en: "Dialogue: A new student" }, strand: "input", where: "home", mins: 5, tier: "core",
          audio: "first", session: "h1", prep: true,
          voices: V("d1"),
          gist: { q: "An là ai?", en: "Who is An?", opts: ["Sinh viên năm thứ nhất", "Giáo viên", "Em của cô Lan"], correct: "Sinh viên năm thứ nhất",
                  why: { "Giáo viên": "Cô Lan là giáo viên, An là sinh viên.", "Em của cô Lan": "An không phải là em của cô Lan." }, explain: "An là sinh viên năm thứ nhất." },
          lines: [
            { spk: "An", vi: "Em chào cô ạ.", en: "Hello (to a female teacher)." },
            { spk: "Cô Lan", vi: "Chào em. Em là sinh viên mới à?", en: "Hello. Are you a new student?" },
            { spk: "An", vi: "{{Vâng|Dạ}}, em là sinh viên năm thứ nhất ạ. Em tên là An.", en: "Yes, I’m a first-year student. My name is An." },
            { spk: "Cô Lan", vi: "Rất vui được gặp em. {{Bố|Ba}} mẹ em ở đâu?", en: "Nice to meet you. Where do your parents live?" },
            { spk: "An", vi: "{{Bố|Ba}} mẹ em ở {city} ạ.", en: "My parents live in {city}." },
            { spk: "Cô Lan", vi: "Học tốt {{nhé|nha}}, An!", en: "Study well, An!" },
            { spk: "An", vi: "Cô Lan vui quá.", en: "(thinks) Cô Lan is so cheerful.", thought: true },
          ] },
        { type: "mc", id: "mc1", title: { vi: "Nghe và chọn", en: "Listen and choose" }, strand: "input", mins: 3, tier: "core", session: "h1", prep: true, items: [
          { say: "Em chào cô ạ.", q: "Bạn nghe thấy câu nào?", en: "Which sentence did you hear?", opts: ["Em chào cô ạ.", "Em chào anh ạ.", "Chào em."], correct: "Em chào cô ạ.",
            why: { "Em chào anh ạ.": "Nghe lại: “cô”, không phải “anh”.", "Chào em.": "Câu này cô Lan nói với An." } },
          { qHtml: "<strong>{{Bố|Ba}} mẹ</strong> em ở {city}. — Ai ở {city}?", en: "Who lives in {city}?", opts: ["{{Bố|Ba}} mẹ An", "Cô Lan", "Bạn của An"], correct: "{{Bố|Ba}} mẹ An" },
        ] },
        { type: "tf", id: "tf1", title: { vi: "Đúng hay sai?", en: "True or false?" }, strand: "input", mins: 2, tier: "extend", session: "h2", part: "B", items: [
          { q: "An là giáo viên.", en: "An is a teacher.", ans: false, why: "An là sinh viên năm thứ nhất." },
          { q: "Cô Lan nói chuyện với An.", en: "Cô Lan talks with An.", ans: true, why: "Cô Lan và An nói chuyện với nhau." },
        ] },
      ] },

    /* ── 3 · story: reading (HL route), story, readaloud, audio ── */
    { id: "story", icon: "📖", label: "Đọc & kể",
      blocks: [
        { type: "reading", title: { vi: "Đọc thêm: Thư viện", en: "Extra reading: the library" }, strand: "input", mins: 3, tier: "optional", route: "hl",
          vi: ["Thư viện của {campus} rất lớn. Sinh viên thường đọc sách ở tầng hai.", "Buổi tối, thư viện mở cửa đến mười giờ."],
          en: ["The {campus} library is very big. Students usually read on the second floor.", "In the evening the library is open until ten."] },
        { type: "reading", id: "r2", title: { vi: "Đọc và nghe: Buổi tối của An", en: "Read and listen: An’s evening" }, strand: "input", mins: 3, tier: "core", listen: "along", session: "h2", part: "B",
          vi: ["Buổi tối, An đi đến thư viện. Thư viện mở cửa đến mười giờ.", "An đọc sách ở tầng hai. {{Bố|Ba}} mẹ An gọi điện từ {city}."],
          en: ["In the evening An goes to the library. The library is open until ten.", "An reads on the second floor. An’s parents call from {city}."] },
        { type: "story", id: "st1", emoji: "📚", level: "A1", titleVi: "Ngày đầu ở trường", titleEn: "First day at school", mins: 4, strand: "input:3,fluency:1", tier: "core", listen: "along", session: "h2", part: "B",
          gloss: [["thư viện", "library"], ["bên trái", "on the left"]],
          body: [
            { t: "n", s: "Hôm nay là ngày đầu tiên An đến {campus}." },
            { t: "d", sp: "An", s: "Thưa cô, thư viện ở đâu ạ?" },
            { t: "d", sp: "Cô Lan", s: "Thư viện ở bên trái, em ạ." },
            { t: "n", s: "An cảm ơn cô và đi đến thư viện." },
          ],
          pairs: [["thư viện", "library"], ["bên trái", "on the left"], ["cảm ơn", "thank"]],
          order: ["Hôm nay là ngày đầu tiên An đến {campus}.", "An hỏi cô Lan: thư viện ở đâu?", "An cảm ơn cô và đi đến thư viện."],
          fill: { text: "Thư viện ở bên {0}.", answers: ["trái"], bank: ["trái", "phải"] } },
        { type: "readaloud", id: "ra1", story: "st1", title: { vi: "Đọc to", en: "Read aloud" }, strand: "fluency", mins: 2, tier: "extend", maxSec: 120 },
        { type: "audio", title: { vi: "Bản ghi mẫu", en: "Sample track" }, tier: "optional",
          tracks: [{ label: { vi: "Lời chào", en: "Greeting" }, src: "audio/u00-sample.mp3" }], credit: "Fixture only — no file yet." },
      ] },

    /* ── 4 · notice: notice, flashcards, match ── */
    { id: "notice", icon: "🔍", label: "Khám phá",
      blocks: [
        { type: "notice", id: "n1", title: { vi: "Từ “là”", en: "The word “là”" }, strand: "language", mins: 4, tier: "core",
          examples: [{ vi: "Em <strong>là</strong> sinh viên.", en: "I am a student." }, { vi: "Cô Lan <strong>là</strong> giáo viên.", en: "Cô Lan is a teacher." }],
          q: "Từ nào nối người với nghề hoặc vai trò?", qEn: "Which word links a person to a job or role?", opts: ["là", "ở", "tên"], correct: "là",
          why: { "ở": "“ở” nói về nơi chốn (at / in).", "tên": "“tên” nghĩa là “name”." }, explain: "là + danh từ.",
          reveal: "<p><strong>là</strong> + danh từ: <em>Em là sinh viên.</em> Với nơi chốn, dùng <strong>ở</strong>: <em>{{Bố|Ba}} mẹ em ở {city}.</em></p>" },
        { type: "flashcards", id: "fc1", title: { vi: "Cụm từ", en: "Phrases" }, strand: "language", mins: 3, tier: "core", cards: [
          { vi: "Em chào cô ạ.", en: "Hello (to a female teacher)." },
          { vi: "Rất vui được gặp em.", en: "Nice to meet you." },
          { vi: "{{Bố|Ba}} mẹ", en: "parents" },
        ] },
        { type: "match", id: "m1", title: { vi: "Ghép", en: "Match" }, strand: "language", mins: 2, tier: "extend", pairs: [
          { a: "sinh viên", b: "student" }, { a: "giáo viên", b: "teacher" }, { a: "thư viện", b: "library" },
        ] },
      ] },

    /* ── 5 · lab: vocab (series deck), builder, cloze, type, tonelab, clockread, clockset ── */
    { id: "lab", icon: "🛠️", label: "Luyện",
      blocks: [
        { type: "vocab", id: "v1", deck: "series", title: { vi: "Từ vựng", en: "Words" }, strand: "language", mins: 6, tier: "core", words: [
          { vi: "sinh viên", en: "student" }, { vi: "giáo viên", en: "teacher" }, { vi: "thư viện", en: "library" }, { vi: "năm thứ nhất", en: "first year" },
          { vi: "bên trái", en: "on the left" }, { vi: "cảm ơn", en: "thank you" }, { vi: "{{bố|ba}}", en: "father" },
        ] },
        { type: "builder", id: "b1", title: { vi: "Sắp xếp câu", en: "Build the sentence" }, strand: "language", mins: 2, tier: "core", items: [
          { en: "My name is An.", tiles: ["Em", "tên", "là", "An"], answer: "Em tên là An.", extra: ["gì"] },
          { en: "My parents live in {city}.", tiles: ["{{Bố|Ba}}", "mẹ", "em", "ở", "{city}"], answer: "{{Bố|Ba}} mẹ em ở {city}." },
        ] },
        { type: "cloze", id: "c1", title: { vi: "Điền từ", en: "Fill the gaps" }, strand: "language", mins: 2, tier: "extend", items: [
          { text: "Em {0} An. Em là sinh viên năm {1} nhất.", answers: ["tên là", "thứ"], bank: ["tên là", "thứ", "mấy"] },
        ] },
        { type: "type", id: "t1", title: { vi: "Nghe và viết", en: "Listen and type" }, strand: "language", mins: 3, tier: "core", items: [
          { say: "{{Bố|Ba}} mẹ em ở {city}.", answers: ["{{Bố|Ba}} mẹ em ở {city}."] },
          { prompt: "Gõ Telex: chaof coo → chào cô", answers: ["chào cô"], telex: true },
          { prompt: "Viết số 15 bằng chữ · Write 15 in words", answers: ["mười lăm"], words: true },
        ] },
        { type: "tonelab", id: "tl1", title: { vi: "Phòng thanh điệu", en: "Tone lab" }, strand: "language", mins: 5, tier: "core", items: [
          { word: "ma", tone: "ngang", voices: V("tl-ma") }, { word: "mà", tone: "huyền" }, { word: "má", tone: "sắc" },
          { word: "mả", tone: "hỏi" }, { word: "mã", tone: "ngã" }, { word: "mạ" },
        ] },
        { type: "tonelab", id: "tl2", title: { vi: "Cặp tối thiểu", en: "Minimal pairs" }, strand: "language", mins: 3, tier: "core", items: [
          { word: "mười", set: ["mười", "mươi"], en: "ten" },
          { word: "mốt", set: ["một", "mốt"], en: "(the day after tomorrow; …-one after twenty)" },
          { word: "bà", set: ["ba", "bà"], en: "grandmother", recVoices: ["NF", "SF"] },
        ] },
        { type: "clockread", id: "cr1", title: { vi: "Đọc giờ", en: "Read the clock" }, strand: "language", mins: 2, tier: "optional", items: [{ h: 7, m: 30 }] },
        { type: "clockset", id: "cs1", title: { vi: "Chỉnh đồng hồ", en: "Set the clock" }, strand: "language", mins: 2, tier: "optional", items: [{ h: 9, m: 15, say: "Chín giờ mười lăm." }] },
      ] },

    /* ── 6 · talk: infogap, drama, record, writing ── */
    { id: "talk", icon: "💬", label: "Nói chuyện",
      blocks: [
        { type: "infogap", id: "g1", title: { vi: "Hỏi bạn", en: "Ask your partner" }, strand: "output", where: "class", mins: 5, tier: "core",
          intro: { vi: "Hỏi và trả lời.", en: "Ask and answer." }, phrases: ["Bạn ấy tên là gì?", "Bạn ấy học ở đâu?"],
          people: [{ e: "🧑", name: "Minh", info: "học ở {campus}", holder: "A" }, { e: "👩", name: "Hoa", info: "học ở {city}", holder: "B" }] },
        { type: "drama", id: "dr1", title: { vi: "Kịch ngắn", en: "Mini drama" }, strand: "output", where: "class", mins: 5, tier: "extend", route: "l2", senior: "A",
          pairs: ["anh_em", "ban_toi"],
          script: [
            { r: "A", t: "Chào {B}! {a} tên là Minh." },
            { r: "B", t: "<<Chào {A}!|Dạ, {b} chào {A} ạ.>> {b} tên là An." },
            { r: "A", t: "{B} học ở đâu?" },
            { r: "B", t: "[[Dạ, ]]{b} học ở {campus}[[ ạ]]." },
          ] },
        { type: "record", id: "r1", title: { vi: "Nói", en: "Speak" }, strand: "output", mins: 3, tier: "core", prompts: [
          { vi: "Em chào cô ạ.", en: "Repeat after the model." },
          { vi: "Bạn tên là gì?", en: "Answer the question.", model: false },
        ] },
        { type: "writing", id: "w1", title: { vi: "Viết", en: "Write" }, strand: "output", mins: 6, tier: "extend", minWords: 15,
          prompt: { vi: "Viết 2–3 câu giới thiệu bản thân.", en: "Write 2–3 sentences about yourself." },
          checklist: [{ vi: "Tôi viết tên của tôi.", en: "I wrote my name." }, { vi: "Tôi viết tôi học ở đâu.", en: "I wrote where I study." }] },
      ] },

    /* ── 7 · fluency: timed re-listen at 1.0× (known dialogue), speed read (known story), record fourThreeTwo (scaled) ── */
    { id: "fluency", icon: "⚡", label: "Nhanh hơn",
      blocks: [
        { type: "dialogue", id: "d2", title: { vi: "Nghe lại nhanh", en: "Re-listen at normal speed" }, strand: "fluency", mins: 2, tier: "core", relisten: true, session: "h3",
          voices: V("d2"),
          lines: [
            { spk: "An", vi: "Em chào cô ạ.", en: "Hello (to a female teacher)." },
            { spk: "Cô Lan", vi: "Chào em. Em là sinh viên mới à?", en: "Hello. Are you a new student?" },
            { spk: "An", vi: "{{Vâng|Dạ}}, em là sinh viên năm thứ nhất ạ.", en: "Yes, I’m a first-year student." },
          ] },
        { type: "story", id: "st2", emoji: "⚡", level: "A1", titleVi: "Lại là ngày đầu", titleEn: "The first day again", mins: 2, strand: "fluency", tier: "core", fluency: true, session: "h3",
          body: [
            { t: "n", s: "An là sinh viên năm thứ nhất ở {campus}." },
            { t: "d", sp: "An", s: "Em chào cô ạ." },
            { t: "d", sp: "Cô Lan", s: "Chào em. Thư viện ở bên trái." },
            { t: "n", s: "An cảm ơn cô." },
          ],
          pairs: [["sinh viên", "student"], ["thư viện", "library"]],
          order: ["An là sinh viên năm thứ nhất ở {campus}.", "An chào cô Lan.", "An cảm ơn cô."],
          fill: { text: "An {0} cô.", answers: ["cảm ơn"], bank: ["cảm ơn", "chào"] } },
        { type: "record", id: "f1", fourThreeTwo: 0.5, title: { vi: "Nói 4/3/2", en: "4/3/2 talk" }, strand: "fluency", mins: 6, tier: "core", prompts: [
          { vi: "Giới thiệu bản thân: tên, trường, gia đình.", en: "Introduce yourself: name, school, family.", model: false },
        ] },
      ] },

    /* ── 8 · report: cando after, rubric, report (timing + survey) ── */
    { id: "report", icon: "📊", label: "Báo cáo", live: true,
      blocks: [
        { type: "cando", phase: "after", title: { vi: "Sau khi học", en: "After the unit" } },
        { type: "rubric", id: "rb1", title: { vi: "Tự chấm: Giới thiệu", en: "Self-check: introduction" }, task: { vi: "Bài nói 4/3/2.", en: "Your 4/3/2 talk." }, criteria: [
          { vi: "Phát âm", en: "Pronunciation", desc: ["Khó hiểu", "Hiểu được", "Rõ ràng"] },
          { vi: "Xưng hô", en: "Address terms", desc: ["Chưa đúng", "Phần lớn đúng", "Luôn đúng"] },
        ] },
        { type: "report", timing: true, survey: true },
      ] },
  ],
};

})();
