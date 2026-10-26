/* VIET 101 (UNC Viet) — Bài 5 homework 2 of 3 (Wednesday): Hôm qua, ngày mai · Bao giờ? · Số từ 100
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lesson 5. ≈ 50 minutes at home.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world: see l05-hw1.js (Emma, Minh, chị Linh). "Today" = Wednesday 28/10/2026.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: 5,
  titleVi: "Bài tập thứ Tư · Hôm qua, ngày mai & số lớn",
  titleEn: "Wednesday homework: yesterday, tomorrow, “when?” and big numbers",
  description: "VIET 101, Lesson 5 homework 2: past and future time words, parts of the day, bao giờ / khi nào, numbers from 100 — vocabulary, grammar, spelling, speaking and a short story. About 50 minutes.",
  color: "#1d4ed8",
  badge: { icon: "⏳", name: "Hôm qua & ngày mai · Past & future" },

  cando: [
    { vi: "Tôi có thể dùng hôm qua, ngày mai, tuần sau, năm ngoái… và sáng, trưa, chiều, tối.", en: "I can use yesterday, tomorrow, next week, last year… and morning, noon, afternoon, evening." },
    { vi: "Tôi có thể hỏi “bao giờ / khi nào” cho quá khứ và tương lai.", en: "I can ask “when?” about the past and the future." },
    { vi: "Tôi có thể đọc và viết số từ 100 (năm, giá vé…).", en: "I can read and write numbers from 100 (years, ticket prices…)." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập về nhà 2/3 · Bài 5 · khoảng 50 phút.", en: "Homework 2 of 3 · Lesson 5 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Work through the tabs in order. Each card shows its time (⏱). Your progress is saved in this browser.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Yesterday, tomorrow, next week… · parts of the day</td><td>11′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td><em>Bao giờ / khi nào</em>: past or future? · numbers from 100</td><td>16′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>mười / mươi, một / mốt, năm / lăm · dictation</td><td>8′</td></tr>
            <tr><td>4️⃣ Nói</td><td>Talk about yesterday and the future</td><td>6′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Bao giờ Minh về Hà Nội?</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lesson 5</strong> — the grammar notes on numbers from 100, time expressions and the question words <em>bao giờ, khi nào, ngày nào, thứ mấy, hôm nào</em>.</p>
          <p><small>In this homework, <strong>today is Wednesday, October 28</strong> (thứ tư, ngày hai mươi tám tháng mười).</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Quá khứ, hiện tại, tương lai — và các buổi trong ngày.", en: "Past, present, future — and the parts of the day." },
      blocks: [
        { type: "flashcards", id: "cards-time", strand: "language", mins: 7,
          title: { vi: "Thẻ từ · Thời gian", en: "Flashcards: time words" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "hôm kia", en: "the day before yesterday", ex: "Hôm kia là thứ hai.", exEn: "The day before yesterday was Monday." },
            { vi: "hôm qua", en: "yesterday", ex: "Hôm qua Minh bận.", exEn: "Minh was busy yesterday." },
            { vi: "ngày mai", en: "tomorrow", ex: "Ngày mai là thứ năm.", exEn: "Tomorrow is Thursday." },
            { vi: "ngày kia", en: "the day after tomorrow", ex: "Ngày kia là thứ sáu.", exEn: "The day after tomorrow is Friday." },
            { vi: "tuần trước", en: "last week", ex: "Tuần trước chị Linh đến Chapel Hill.", exEn: "Chị Linh came to Chapel Hill last week." },
            { vi: "tuần sau", en: "next week", ex: "Tuần sau có bài kiểm tra.", exEn: "There’s a quiz next week." },
            { vi: "tháng sau", en: "next month", ex: "Tháng sau là tháng mười một.", exEn: "Next month is November." },
            { vi: "năm ngoái", en: "last year", ex: "Năm ngoái Minh không về Hà Nội.", exEn: "Minh didn’t go home to Hà Nội last year." },
            { vi: "sang năm", en: "next year", ex: "Sang năm Emma muốn đi Việt Nam.", exEn: "Next year Emma wants to go to Vietnam." },
            { vi: "bây giờ", en: "now", ex: "Bây giờ mình rảnh.", exEn: "I’m free now." },
            { vi: "buổi sáng", en: "(in the) morning", ex: "Buổi sáng Emma có lớp.", exEn: "Emma has class in the morning." },
            { vi: "buổi trưa", en: "(at) noon, midday", ex: "Buổi trưa mình ăn ở nhà ăn.", exEn: "I eat at the dining hall at noon." },
            { vi: "buổi chiều", en: "(in the) afternoon", ex: "chiều mai", exEn: "tomorrow afternoon" },
            { vi: "buổi tối", en: "(in the) evening", ex: "tối thứ bảy", exEn: "Saturday evening" },
            { vi: "ban đêm", en: "(at) night", ex: "Ban đêm thư viện đóng cửa.", exEn: "The library is closed at night." },
          ] },

        { type: "mc", id: "timeline", strand: "language", mins: 4,
          title: { vi: "Hôm nay là thứ tư, 28/10", en: "Today is Wednesday, October 28" },
          instr: { vi: "Hôm nay là thứ tư, ngày hai mươi tám tháng mười. Chọn câu trả lời đúng.", en: "Today is Wednesday the 28th. Choose the right answer." },
          items: [
            { q: "Hôm qua là thứ mấy?", opts: ["thứ ba", "thứ năm", "thứ hai"], correct: "thứ ba" },
            { q: "Ngày kia là ngày bao nhiêu?", opts: ["ngày ba mươi", "ngày hai mươi chín", "ngày hai mươi sáu"], correct: "ngày ba mươi", explain: "Ngày kia = two days from today: 28 → 30." },
            { q: "Thứ hai, ngày hai mươi sáu, là …", opts: ["hôm kia", "hôm qua", "ngày kia"], correct: "hôm kia" },
            { q: "Bây giờ là tháng mười. Tháng sau là tháng mấy?", opts: ["tháng mười một", "tháng chín", "tháng mười hai"], correct: "tháng mười một" },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "“Bao giờ” ở đầu câu hay cuối câu? Và cách đọc số lớn.", en: "Bao giờ at the start or the end? And how to read big numbers." },
      blocks: [
        { type: "notice", id: "notice-baogio", strand: "language", mins: 4,
          title: { vi: "Khám phá · “Bao giờ” ở đầu hay ở cuối?", en: "Discover: bao giờ at the start or the end?" },
          examples: [
            { vi: "<strong>Bao giờ</strong> bạn về Hà Nội? — Tháng mười hai.", en: "When will you go home to Hà Nội? — In December." },
            { vi: "Bạn mua vé <strong>bao giờ</strong>? — Hôm qua.", en: "When did you buy the ticket? — Yesterday." },
            { vi: "<strong>Khi nào</strong> chị Linh đến? — Ngày mai.", en: "When will chị Linh come? — Tomorrow." },
            { vi: "Chị Linh đến Chapel Hill <strong>khi nào</strong>? — Tuần trước.", en: "When did chị Linh come to Chapel Hill? — Last week." },
          ],
          q: "Khi “bao giờ / khi nào” đứng ở đầu câu, câu hỏi nói về …", qEn: "When bao giờ / khi nào starts the question, it asks about …",
          opts: ["tương lai (future)", "quá khứ (past)"], correct: "tương lai (future)",
          why: { "quá khứ (past)": "Look at the answers: tháng mười hai, ngày mai — those haven’t happened yet." },
          explain: "Start of the question → future. End of the question → past.",
          reveal: `
            <ul>
              <li><strong>Bao giờ / Khi nào + …?</strong> → the future: <em>Bao giờ bạn đi?</em> (When will you go?) · <strong>… + bao giờ / khi nào?</strong> → the past: <em>Bạn đi bao giờ?</em> (When did you go?) <button class="tts" data-say="Bao giờ bạn đi? Bạn đi bao giờ?">🔊</button></li>
              <li>The answer is a time word: <em>hôm qua, ngày mai, tuần sau, năm ngoái, chiều mai…</em> — no tense marker needed; the time word tells you past or future.</li>
              <li><strong>Time words</strong> usually go at the start (or end) of the sentence: <em><strong>Chiều mai</strong> mình rảnh.</em> · <em>Mình rảnh <strong>chiều mai</strong>.</em></li>
              <li><strong>Parts of the day</strong> + <em>nay / qua / mai</em>: <em>sáng nay</em> (this morning) · <em>tối qua</em> (last night) · <em>chiều mai</em> (tomorrow afternoon). With a day: <em>tối thứ bảy</em> (Saturday evening).</li>
              <li>Need the exact day? Ask <strong>ngày nào?</strong> (which date) · <strong>thứ mấy?</strong> (which weekday) · <strong>hôm nào?</strong> (which day).</li>
            </ul>` },

        { type: "mc", id: "when-q", strand: "language", mins: 4,
          title: { vi: "Hỏi “bao giờ” cho đúng", en: "Ask “when” the right way" },
          instr: { vi: "Đọc câu trả lời, rồi chọn câu hỏi đúng.", en: "Read the answer, then choose the question that fits." },
          items: [
            { q: "Trả lời: “Ngày mai.” — Câu hỏi?", en: "Answer: “Tomorrow.”", opts: ["Bao giờ bạn đi mua quà?", "Bạn đi mua quà bao giờ?"], correct: "Bao giờ bạn đi mua quà?", keepOrder: true,
              why: { "Bạn đi mua quà bao giờ?": "Bao giờ at the end asks about the past — but ngày mai is the future." } },
            { q: "Trả lời: “Tuần trước.” — Câu hỏi?", en: "Answer: “Last week.”", opts: ["Khi nào chị Linh gọi điện cho Minh?", "Chị Linh gọi điện cho Minh khi nào?"], correct: "Chị Linh gọi điện cho Minh khi nào?", keepOrder: true,
              why: { "Khi nào chị Linh gọi điện cho Minh?": "Khi nào at the start asks about the future — tuần trước is past." } },
            { q: "Trả lời: “Năm ngoái.” — Câu hỏi?", en: "Answer: “Last year.”", opts: ["Bao giờ Emma bắt đầu học tiếng Việt?", "Emma bắt đầu học tiếng Việt bao giờ?"], correct: "Emma bắt đầu học tiếng Việt bao giờ?", keepOrder: true },
            { q: "Trả lời: “Thứ năm.” — Câu hỏi?", en: "Answer: “Thursday.”", opts: ["Bài kiểm tra là thứ mấy?", "Bài kiểm tra là tháng mấy?", "Bài kiểm tra là năm nào?"], correct: "Bài kiểm tra là thứ mấy?" },
          ] },

        { type: "builder", id: "build", strand: "language", mins: 3,
          title: { vi: "Xếp câu", en: "Build the sentence" },
          items: [
            { en: "When will you go back to Hà Nội?", tiles: ["Bao giờ", "bạn", "về", "Hà Nội"], answer: "Bao giờ bạn về Hà Nội?" },
            { en: "When did you buy the ticket?", tiles: ["Bạn", "mua", "vé", "bao giờ"], answer: "Bạn mua vé bao giờ?" },
            { en: "I’m free tomorrow afternoon.", tiles: ["Chiều mai", "mình", "rảnh"], answer: "Chiều mai mình rảnh." },
          ] },

        { type: "html", title: { vi: "Số từ 100", en: "Numbers from 100" }, strand: "language", mins: 2, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><td>100 · 200</td><td>một <strong>trăm</strong> · hai trăm</td><td><button class="tts" data-say="một trăm, hai trăm">🔊</button></td></tr>
            <tr><td>105</td><td>một trăm <strong>linh</strong> năm (North) · một trăm <strong>lẻ</strong> năm (South)</td><td><button class="tts" data-say="một trăm linh năm">🔊</button></td></tr>
            <tr><td>115 · 125</td><td>một trăm mười <strong>lăm</strong> · một trăm hai mươi <strong>lăm</strong></td><td><button class="tts" data-say="một trăm mười lăm, một trăm hai mươi lăm">🔊</button></td></tr>
            <tr><td>121</td><td>một trăm hai mươi <strong>mốt</strong></td><td><button class="tts" data-say="một trăm hai mươi mốt">🔊</button></td></tr>
            <tr><td>1.000</td><td>một <strong>nghìn</strong> (North) · một <strong>ngàn</strong> (South)</td><td><button class="tts" data-say="một nghìn">🔊</button></td></tr>
            <tr><td>1.200</td><td>một nghìn hai trăm</td><td><button class="tts" data-say="một nghìn hai trăm">🔊</button></td></tr>
            <tr><td>2026</td><td>hai nghìn <strong>không trăm</strong> hai mươi sáu</td><td><button class="tts" data-say="hai nghìn không trăm hai mươi sáu">🔊</button></td></tr>
            <tr><td>1.000.000 · 1.000.000.000</td><td>một <strong>triệu</strong> · một <strong>tỷ</strong></td><td><button class="tts" data-say="một triệu, một tỷ">🔊</button></td></tr>
          </table></div>
          <ul>
            <li>An empty tens place → <strong>linh / lẻ</strong> (105); an empty hundreds place → <strong>không trăm</strong> (2026).</li>
            <li>Vietnamese writes thousands with a <strong>dot</strong>: 1.200 = one thousand two hundred.</li>
            <li>Years are read as full numbers: <em>năm 2026</em> = năm hai nghìn không trăm hai mươi sáu.</li>
          </ul>` },

        { type: "type", id: "num-words", strand: "language", mins: 3,
          title: { vi: "Viết số bằng chữ", en: "Write the number in words" },
          instr: { vi: "Viết bằng chữ, không dùng số.", en: "Words, not digits." },
          items: [
            { prompt: "115", words: true, answers: ["một trăm mười lăm"] },
            { prompt: "205", words: true, answers: ["hai trăm linh năm", "hai trăm lẻ năm"], hint: "Empty tens place → linh / lẻ." },
            { prompt: "1.200 (giá vé · ticket price, $)", words: true, answers: ["một nghìn hai trăm", "một ngàn hai trăm", "một nghìn hai trăm đô la", "một ngàn hai trăm đô la", "một nghìn hai trăm đô-la", "một ngàn hai trăm đô-la"] },
            { prompt: "2026 (năm nay · this year)", words: true, answers: ["hai nghìn không trăm hai mươi sáu", "hai ngàn không trăm hai mươi sáu", "năm hai nghìn không trăm hai mươi sáu", "năm hai ngàn không trăm hai mươi sáu"], hint: "Empty hundreds place → không trăm." },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Số đếm đổi cách viết: mười → mươi, một → mốt, năm → lăm.", en: "Numbers change their spelling: mười → mươi, một → mốt, năm → lăm." },
      blocks: [
        { type: "mc", id: "num-spell", strand: "language", mins: 4,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "mười lăm", q: "15", opts: ["mười lăm", "mười năm", "mươi lăm"], correct: "mười lăm", explain: "10–19 use mười (falling tone); 5 after mười / mươi becomes lăm." },
            { say: "hai mươi mốt", q: "21", opts: ["hai mươi mốt", "hai mươi một", "hai mười mốt"], correct: "hai mươi mốt", explain: "20, 30 … use mươi (no mark); 1 after mươi becomes mốt (rising). But 11 = mười một." },
            { say: "một trăm linh năm", q: "105", opts: ["một trăm linh năm", "một trăm linh lăm", "một trăm lính năm"], correct: "một trăm linh năm", explain: "After linh / lẻ, five stays năm — lăm only comes after mười / mươi." },
            { say: "năm ngoái", q: "last year", opts: ["năm ngoái", "năm ngoài", "nằm ngoái"], correct: "năm ngoái", explain: "ngoái (rising) = last (year) · ngoài (falling) = outside." },
            { say: "hôm qua", q: "yesterday", opts: ["hôm qua", "hôm quá", "hồm qua"], correct: "hôm qua", explain: "Both syllables are level tone — no tone mark." },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: ngoais → ngoái, nghinf → nghìn.", en: "Tap Listen, then type. Telex works: ngoais → ngoái, nghinf → nghìn." },
          items: [
            { say: "buổi chiều", telex: true, answers: ["buổi chiều"] },
            { say: "sang năm", telex: true, answers: ["sang năm"] },
            { say: "hai mươi lăm", telex: true, answers: ["hai mươi lăm"] },
            { say: "một nghìn", telex: true, answers: ["một nghìn", "một ngàn"] },
            { say: "bao giờ bạn về", telex: true, answers: ["bao giờ bạn về"], show: "Bao giờ bạn về?" },
          ] },
      ],
    },

    /* ═══════════════ NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Nói",
      intro: { vi: "Nghe, rồi nói. Ghi âm và nghe lại giọng của bạn.", en: "Listen, then speak. Record and listen back to yourself." },
      blocks: [
        { type: "record", id: "shadow", strand: "fluency", mins: 3,
          title: { vi: "Nói theo", en: "Shadowing" },
          instr: { vi: "Bấm 🔊, nghe hai lần, rồi ghi âm và nói lại thật giống.", en: "Tap 🔊, listen twice, then record yourself saying it the same way." },
          prompts: [
            { vi: "Bao giờ bạn về Hà Nội?", en: "When will you go home to Hà Nội?" },
            { vi: "Hôm qua mình đi mua vé máy bay.", en: "Yesterday I went to buy a plane ticket." },
            { vi: "Vé một nghìn hai trăm đô-la.", en: "The ticket is 1,200 dollars." },
          ] },

        { type: "record", id: "my-time", strand: "output", mins: 3,
          title: { vi: "Nói về bạn", en: "Your turn" },
          instr: { vi: "Trả lời bằng một hoặc hai câu. Không có mẫu — đây là câu của bạn!", en: "Answer in one or two sentences. No model — it’s your sentence!" },
          prompts: [
            { vi: "Hôm qua bạn làm gì? Buổi sáng? Buổi tối?", en: "e.g. Hôm qua buổi sáng mình …", model: false },
            { vi: "Bao giờ bạn về nhà thăm gia đình?", en: "When will you go home to see your family? e.g. Tháng mười hai mình về …", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st2", strand: "input", emoji: "✈️", level: "Cấp 1", mins: 8,
          titleVi: "Bao giờ Minh về Hà Nội?", titleEn: "When is Minh going home?",
          gloss: [["nhà ăn", "dining hall"], ["không thấy", "didn’t see"], ["vé máy bay", "plane ticket"], ["vì", "because"], ["đắt", "expensive"], ["nhớ", "to miss"]],
          body: [
            { t: "n", s: "Hôm nay là thứ tư. Buổi trưa, Emma và Minh ăn trưa ở nhà ăn." },
            { t: "d", sp: "Emma", s: "Minh ơi, hôm qua bạn ở đâu? Mình không thấy bạn ở lớp toán." },
            { t: "d", sp: "Minh", s: "Hôm qua mình bận. Mình đi mua vé máy bay về Hà Nội." },
            { t: "d", sp: "Emma", s: "Hay quá! Bao giờ bạn về?" },
            { t: "d", sp: "Minh", s: "Ngày mười chín tháng mười hai. Năm ngoái mình không về, vì vé đắt quá." },
            { t: "d", sp: "Emma", s: "Năm nay vé bao nhiêu tiền?" },
            { t: "d", sp: "Minh", s: "Một nghìn hai trăm đô-la. Đắt lắm! Nhưng mình nhớ bố mẹ." },
            { t: "d", sp: "Emma", s: "Sang năm mình cũng muốn đi Việt Nam!" },
            { t: "d", sp: "Minh", s: "Thật à? Khi nào bạn đi, bạn ở nhà mình nhé!" },
          ],
          pairs: [["hôm qua", "yesterday"], ["năm ngoái", "last year"], ["sang năm", "next year"], ["bao nhiêu tiền", "how much (money)"]],
          order: ["Emma hỏi hôm qua Minh ở đâu.", "Minh nói Minh đi mua vé máy bay.", "Minh nói Minh về Hà Nội vào tháng mười hai.", "Minh nói vé một nghìn hai trăm đô-la.", "Emma nói sang năm Emma muốn đi Việt Nam."],
          fill: { text: "Hôm {0} Minh đi mua vé. Ngày mười chín tháng mười {1} Minh về Hà Nội. Năm {2} Minh không về. Năm nay vé một {3} hai trăm đô-la.", answers: ["qua", "hai", "ngoái", "nghìn"], bank: ["qua", "hai", "ngoái", "nghìn", "kia", "triệu"] } },

        { type: "readaloud", id: "read-aloud", story: "st2", strand: "fluency", mins: 4,
          title: { vi: "Đọc to", en: "Read aloud" },
          instr: { vi: "Nghe lại câu chuyện ở trên một lần. Rồi bấm ● Ghi âm và đọc to cả câu chuyện — rõ ràng, không cần nhanh. Bản ghi âm sẽ có trong báo cáo bạn nộp.", en: "Listen to the story above once more. Then tap ● Record and read the whole story aloud — clearly, no need to rush. Your recording goes into the report you submit." } },
      ],
    },

    /* ═══════════════ NỘP BÀI ═══════════════ */
    {
      id: "report", icon: "📊", label: "Nộp bài", live: true,
      blocks: [
        { type: "cando", phase: "after",
          title: { vi: "Bây giờ bạn tự tin đến đâu?", en: "Now: how confident are you?" } },
        { type: "report", timing: true, survey: true, title: { vi: "Báo cáo · tải về và nộp trên Canvas", en: "Report · download it and submit on Canvas" } },
      ],
    },
  ],
};
})();
