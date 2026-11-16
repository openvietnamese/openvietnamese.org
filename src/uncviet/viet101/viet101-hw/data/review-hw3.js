/* VIET 101 (UNC Viet) — Ôn tập (review week after Lesson 7) homework 3 of 3 (Friday): Tổng ôn Bài 1–7 · The whole course
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lessons 1–7. ≈ 50 minutes at home. No new grammar.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world: see review-hw1.js / review-hw2.js. "Today" = Friday 20/11/2026 (Ngày Nhà giáo Việt Nam).
   Sofia (Emma’s classmate, born 2006 in San Jose, 20, second-year, biology; her bà ngoại is Vietnamese, 83, lives with
   Sofia’s family) — as in l06-zodiac and the Bài 7 Friday deck. Minh bought a box of Vietnamese tea for Emma’s family.
   Class deck: _source/viet101/slides/VIET101-Review-C3-final-prep-slides.html. Next: final-guide.html (final exam study guide).
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {
window.BV_CHAPTER = {
  id: "5-7",
  titleVi: "Ôn tập thứ Sáu · Tổng ôn Bài 1–7",
  titleEn: "Review homework, Friday: the whole course (Lessons 1–7)",
  description: "VIET 101 review week, homework 3: question words, classifiers, rất / lắm / quá, cũng, dates and times, đã / đang / sẽ, chưa and vẫn mixed together, then write and record your Thanksgiving plan, and a story — Lessons 1–7. About 50 minutes.",
  color: "#7c3aed",
  badge: { icon: "🧭", name: "Tổng ôn · Course navigator" },
  cando: [
    { vi: "Tôi có thể dùng đúng các từ để hỏi: ai, gì, nào, ở đâu, thế nào, mấy, bao nhiêu, bao giờ, bao lâu.", en: "I can use the question words: ai, gì, nào, ở đâu, thế nào, mấy, bao nhiêu, bao giờ, bao lâu." },
    { vi: "Tôi biết mỗi từ (rất, lắm, cũng, đã, chưa, vẫn …) đứng ở đâu trong câu.", en: "I know where each little word (rất, lắm, cũng, đã, chưa, vẫn …) goes in a sentence." },
    { vi: "Tôi có thể viết 6–8 câu về kế hoạch của tôi, với ngày, giờ và gia đình.", en: "I can write 6–8 sentences about my plans, with dates, times and family." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Ôn tập 3/3 · Bài 1–7 · khoảng 50 phút.", en: "Review homework 3 of 3 · Lessons 1–7 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Today mixes <strong>the whole course</strong>, like the final exam. Work through the tabs in order; each card shows its time (⏱). After this, use the <strong>final exam study guide</strong> (<em>Ôn thi cuối kỳ</em>) over the break.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Question words · classifiers</td><td>5′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td>Lessons 1–4 and 5–7 mixed · right or wrong? · build sentences</td><td>14′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>Look-alike words · dictation</td><td>6′</td></tr>
            <tr><td>4️⃣ Viết & nói</td><td>Write your Thanksgiving plan, then record it</td><td>10′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Ở quán cà phê</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings and writing) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><small>In this homework, <strong>today is Friday, November 20</strong> — <em>Ngày Nhà giáo Việt Nam</em>. After class, Emma and Sofia have coffee, and Minh joins them.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Từ để hỏi và loại từ — dùng trong cả bảy bài.", en: "Question words and classifiers — used in all seven lessons." },
      blocks: [
        { type: "match", id: "qwords", strand: "language", mins: 3,
          title: { vi: "Ghép · Từ để hỏi", en: "Match: question words" },
          instr: { vi: "Ghép từ để hỏi với nghĩa.", en: "Match each question word to its meaning." },
          pairs: [
            { a: "ai?", b: "who?" },
            { a: "nào?", b: "which?" },
            { a: "ở đâu?", b: "where?" },
            { a: "thế nào?", b: "how? what … like?" },
            { a: "bao nhiêu?", b: "how many / how much? (10 or more)" },
            { a: "bao giờ? khi nào?", b: "when?" },
            { a: "bao lâu?", b: "how long?" },
            { a: "… chưa?", b: "… yet?" },
          ] },

        { type: "mc", id: "classifiers", strand: "language", mins: 2,
          title: { vi: "Chọn loại từ", en: "Choose the classifier" },
          items: [
            { q: "Minh mua một ___ trà Việt Nam cho gia đình Emma.", opts: ["hộp", "con", "tờ"], correct: "hộp", explain: "hộp = box: một hộp trà = a box of tea." },
            { q: "Sofia đọc hai ___ sách tiếng Việt.", opts: ["quyển", "tờ", "quả"], correct: "quyển" },
            { q: "Bà ngoại Sofia có một ___ mèo.", opts: ["con", "cái", "cây"], correct: "con" },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Cả bảy bài trộn lẫn — như bài thi.", en: "All seven lessons mixed — like the exam." },
      blocks: [
        { type: "mc", id: "l1-4", strand: "language", mins: 4,
          title: { vi: "Bài 1–4", en: "Lessons 1–4" },
          items: [
            { q: "Sofia là người nước ___? — Người Mỹ.", opts: ["nào", "gì", "đâu"], correct: "nào" },
            { q: "Ask if Sofia is a student:", opts: ["Sofia có phải là sinh viên không?", "Sofia có sinh viên không?", "Sofia là sinh viên không?"], correct: "Sofia có phải là sinh viên không?" },
            { q: "Tiếng Việt ___ khó, nhưng Sofia rất thích.", opts: ["rất", "lắm", "quá"], correct: "rất", why: { "lắm": "Lắm goes after the adjective: khó lắm.", "quá": "Quá goes after the adjective: khó quá!" } },
            { q: "Emma học tiếng Việt. Sofia ___ học tiếng Việt.", opts: ["cũng", "còn", "và"], correct: "cũng" },
            { q: "Lớp tiếng Việt có ___ sinh viên? — Mười tám.", opts: ["bao nhiêu", "mấy", "nào"], correct: "bao nhiêu", why: { "mấy": "Mấy is for numbers you expect to be under 10." } },
            { q: "Sofia nói tiếng Việt ___? — Khá tốt.", opts: ["thế nào", "ở đâu", "ai"], correct: "thế nào" },
          ] },

        { type: "mc", id: "l5-7", strand: "language", mins: 4,
          title: { vi: "Bài 5–7", en: "Lessons 5–7" },
          items: [
            { q: "Hôm nay là ___, ngày hai mươi tháng mười một.", opts: ["thứ sáu", "tháng sáu", "ngày sáu"], correct: "thứ sáu" },
            { q: "Ask Sofia when she came to Chapel Hill:", opts: ["Bạn đến Chapel Hill bao giờ?", "Bao giờ bạn đến Chapel Hill?", "Bạn đến Chapel Hill bao lâu?"], correct: "Bạn đến Chapel Hill bao giờ?", why: { "Bao giờ bạn đến Chapel Hill?": "At the start, bao giờ asks about the future." } },
            { q: "Sofia học ở thư viện từ hai giờ đến năm giờ — ba ___.", opts: ["tiếng", "giờ", "lúc"], correct: "tiếng" },
            { q: "Minh: “Hôm qua mình ___ mua quà rồi.”", opts: ["đã", "sẽ", "đang"], correct: "đã" },
            { q: "Bạn làm bài tập chưa? — ___", opts: ["Chưa, mình chưa làm.", "Không, mình không làm.", "Rồi, mình chưa làm."], correct: "Chưa, mình chưa làm." },
            { q: "Bà ngoại Sofia tám mươi ba tuổi nhưng ___ khoẻ lắm.", opts: ["vẫn", "sắp", "vừa"], correct: "vẫn" },
          ] },

        { type: "tf", id: "right-wrong", strand: "language", mins: 3,
          title: { vi: "Câu này đúng hay sai?", en: "Is the sentence correct?" },
          instr: { vi: "Đúng = câu đúng ngữ pháp. Sai = câu có lỗi.", en: "Đúng = the sentence is correct. Sai = it has a mistake." },
          items: [
            { q: "Tôi là khoẻ.", ans: false, why: "No là before an adjective: Tôi khoẻ." },
            { q: "Hôm nay là ngày hai mươi tháng mười một.", ans: true, why: "Day before month." },
            { q: "Minh là hai mươi mốt tuổi.", ans: false, why: "No là before an age: Minh hai mươi mốt tuổi." },
            { q: "Đi xe buýt mất một tiếng rưỡi.", ans: true, why: "tiếng for how long." },
            { q: "Sofia nói tiếng Anh giỏi rất.", ans: false, why: "rất goes before: rất giỏi — or giỏi lắm." },
            { q: "Mẹ Emma là giáo viên lịch sử.", ans: true, why: "là + job." },
          ] },

        { type: "builder", id: "build", strand: "language", mins: 3,
          title: { vi: "Xếp câu", en: "Build the sentence" },
          items: [
            { en: "Sofia has been studying Vietnamese for three months.", tiles: ["Sofia", "học", "tiếng Việt", "ba tháng", "rồi."], answer: "Sofia học tiếng Việt ba tháng rồi." },
            { en: "Have you bought the gift yet?", tiles: ["Bạn", "mua", "quà", "chưa?"], answer: "Bạn mua quà chưa?" },
            { en: "Next Wednesday Emma will go to Richmond.", tiles: ["Thứ tư", "tuần sau", "Emma", "sẽ", "đi", "Richmond."], answer: "Thứ tư tuần sau Emma sẽ đi Richmond." },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Những cặp từ hay nhầm trong cả khoá học.", en: "The look-alike pairs from the whole course." },
      blocks: [
        { type: "mc", id: "look-alike", strand: "language", mins: 2,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "mươi", q: "", opts: ["mươi", "mười", "mưới"], correct: "mươi", explain: "mươi (no mark) in 20, 30 … · mười = 10." },
            { say: "tiếng", q: "", opts: ["tiếng", "tiến", "tiềng"], correct: "tiếng", explain: "Final -ng and a rising tone." },
            { say: "chưa", q: "", opts: ["chưa", "chua", "chứa"], correct: "chưa", explain: "chưa = not yet · chua = sour!" },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex.", en: "Tap Listen, then type. Telex works." },
          items: [
            { say: "rất vui được làm quen với bạn", telex: true, answers: ["rất vui được làm quen với bạn"], show: "Rất vui được làm quen với bạn." },
            { say: "bạn là người nước nào", telex: true, answers: ["bạn là người nước nào"], show: "Bạn là người nước nào?" },
            { say: "thứ sáu ngày hai mươi tháng mười một", telex: true, answers: ["thứ sáu ngày hai mươi tháng mười một"], show: "thứ sáu, ngày hai mươi tháng mười một" },
            { say: "bà ngoại vẫn khoẻ lắm", telex: true, answers: ["bà ngoại vẫn khoẻ lắm", "bà ngoại vẫn khỏe lắm"] },
          ] },
      ],
    },

    /* ═══════════════ VIẾT & NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Viết & nói",
      intro: { vi: "Viết kế hoạch nghỉ Lễ Tạ ơn của bạn, rồi đọc to và ghi âm.", en: "Write your Thanksgiving-break plan, then read it aloud and record it." },
      blocks: [
        { type: "writing", id: "my-break", strand: "output", mins: 6,
          title: { vi: "Viết · Kỳ nghỉ Lễ Tạ ơn của tôi", en: "Write: my Thanksgiving break" },
          prompt: { vi: "Viết 6–8 câu: bạn sẽ đi đâu (hoặc ở lại đâu), ngày nào, lúc mấy giờ, đi bằng gì, mất bao lâu, bạn sẽ gặp ai trong gia đình (họ bao nhiêu tuổi, làm gì), và bạn đã chuẩn bị gì chưa.", en: "Write 6–8 sentences: where you’ll go (or stay), which day, what time, how, how long it takes, which family members you’ll see (their age, what they do), and whether you’ve got everything ready. Staying on campus, or an invented trip, is fine." },
          minWords: 45,
          checklist: [
            { vi: "Một ngày viết bằng chữ (thứ …, ngày … tháng …)", en: "A date in words (weekday, day, month)" },
            { vi: "lúc + giờ, và mất … tiếng / phút", en: "lúc + a clock time, and mất … tiếng / phút" },
            { vi: "Một người trong gia đình + tuổi + làm gì", en: "A family member + age + what they do" },
            { vi: "sẽ, và chưa hoặc rồi", en: "sẽ, and chưa or rồi" },
            { vi: "Dấu (tone marks) đầy đủ", en: "All tone marks written" },
          ] },

        { type: "record", id: "voice", strand: "output", mins: 4,
          title: { vi: "Nói · Kỳ nghỉ của tôi", en: "Speak: my break" },
          instr: { vi: "Nói theo câu mẫu, rồi đọc to bài viết của bạn.", en: "Shadow the model line, then read your writing aloud." },
          prompts: [
            { vi: "Thứ tư, ngày hai mươi lăm tháng mười một, tôi sẽ về nhà lúc hai giờ chiều.", en: "On Wednesday, November 25, I’ll go home at two in the afternoon." },
            { vi: "Kỳ nghỉ Lễ Tạ ơn của tôi", en: "My Thanksgiving break (read your text above)", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st-r3", strand: "input", emoji: "☕", level: "Cấp 1", mins: 8,
          titleVi: "Ở quán cà phê", titleEn: "At the café",
          gloss: [["quán cà phê", "café"], ["gần", "near"], ["bạn cùng lớp", "classmate"], ["nấu", "to cook"], ["hộp", "box"], ["ở lại", "to stay (behind)"], ["bài thi cuối kỳ", "final exam"], ["chăm", "hard-working"]],
          body: [
            { t: "n", s: "Thứ sáu, bốn giờ chiều, Emma và Sofia uống cà phê ở một quán cà phê gần trường. Minh đến." },
            { t: "d", sp: "Emma", s: "Minh ơi! Mình giới thiệu với bạn, đây là Sofia, bạn cùng lớp tiếng Việt của mình." },
            { t: "d", sp: "Minh", s: "Chào Sofia! Rất vui được làm quen với bạn. Bạn là người nước nào?" },
            { t: "d", sp: "Sofia", s: "Chào Minh. Mình là người Mỹ, nhưng bà ngoại mình là người Việt." },
            { t: "d", sp: "Minh", s: "Thế à? Bạn nói tiếng Việt hay quá!" },
            { t: "d", sp: "Sofia", s: "Cảm ơn bạn. Mình học tiếng Việt ba tháng rồi. Mình hay nói tiếng Việt với bà." },
            { t: "d", sp: "Minh", s: "Bà ngoại bạn năm nay bao nhiêu tuổi?" },
            { t: "d", sp: "Sofia", s: "Bà mình tám mươi ba tuổi, nhưng bà vẫn khoẻ lắm. Bà vẫn nấu phở cho cả nhà." },
            { t: "d", sp: "Emma", s: "Minh ơi, bạn mua quà cho gia đình mình chưa?" },
            { t: "d", sp: "Minh", s: "Mua rồi! Hôm qua mình đã mua một hộp trà Việt Nam cho bà và hai bác." },
            { t: "d", sp: "Sofia", s: "Các bạn sắp đi Richmond à?" },
            { t: "d", sp: "Emma", s: "Ừ, thứ tư tuần sau. Còn bạn? Nghỉ Lễ Tạ ơn bạn sẽ làm gì?" },
            { t: "d", sp: "Sofia", s: "Mình sẽ ở lại Chapel Hill. Mình đang học cho bài thi cuối kỳ!" },
            { t: "d", sp: "Minh", s: "Chăm quá!" },
          ],
          pairs: [["gần", "near"], ["nấu", "to cook"], ["ở lại", "to stay"], ["bạn cùng lớp", "classmate"]],
          order: ["Emma giới thiệu Sofia với Minh.", "Sofia nói bà ngoại Sofia là người Việt.", "Minh nói Minh đã mua quà.", "Sofia nói Sofia sẽ ở lại Chapel Hill."],
          fill: { text: "Sofia học tiếng Việt ba tháng {0}. Bà ngoại Sofia tám mươi ba {1}, nhưng bà {2} khoẻ lắm. Hôm qua Minh {3} mua một hộp trà.", answers: ["rồi", "tuổi", "vẫn", "đã"], bank: ["rồi", "tuổi", "vẫn", "đã", "chưa", "sẽ", "lắm"] } },

        { type: "readaloud", id: "read-aloud", story: "st-r3", strand: "fluency", mins: 4,
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
