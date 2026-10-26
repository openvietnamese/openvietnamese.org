/* VIET 101 (UNC Viet) — Bài 7 homework 3 of 3 (Friday): Gia đình tôi · My family
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lesson 7. ≈ 50 minutes at home.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world: see l07-hw1.js (Emma’s family). "Today" = Friday 13/11/2026. Jake graduated in 2024 and works
   for a company in Boston, not married; Lily (16) is in high school and wants to study biology.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: 7,
  titleVi: "Bài tập thứ Sáu · Gia đình tôi",
  titleEn: "Friday homework: my family",
  description: "VIET 101, Lesson 7 homework 3: vẫn / còn (still), cách đây (ago), tốt nghiệp, the particles đấy and thế, school subjects and jobs, a Lesson 7 review, and writing about your family — vocabulary, grammar, spelling, writing, speaking and a short story. About 50 minutes.",
  color: "#4338ca",
  badge: { icon: "👪", name: "Gia đình tôi · My family" },

  cando: [
    { vi: "Tôi có thể dùng vẫn / còn / vẫn còn (still) và cách đây (ago).", en: "I can use vẫn / còn / vẫn còn (still) and cách đây (ago)." },
    { vi: "Tôi có thể nói ai đang học gì, ai làm việc ở đâu, ai đã tốt nghiệp.", en: "I can say who studies what, who works where, and who has graduated." },
    { vi: "Tôi có thể viết và nói 5–6 câu về gia đình tôi.", en: "I can write and say 5–6 sentences about my family." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập về nhà 3/3 · Bài 7 · khoảng 50 phút.", en: "Homework 3 of 3 · Lesson 7 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Work through the tabs in order. Each card shows its time (⏱). Your progress is saved in this browser.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>School, work and graduation</td><td>6′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td><em>vẫn / còn</em>, <em>cách đây</em>, <em>đấy / thế</em> · Lesson 7 review</td><td>14′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>nghiệp, vẫn, sử, trung · dictation</td><td>6′</td></tr>
            <tr><td>4️⃣ Viết & nói</td><td>Write about your family, then record it</td><td>11′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Ảnh gia đình Emma</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings and writing) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lesson 7</strong> — the notes on <em>vẫn / còn / vẫn còn</em>, the particles <em>đấy, thế</em>, and the word <em>tốt nghiệp</em>, plus the Narrative.</p>
          <p><small>In this homework, <strong>today is Friday, November 13</strong>. After class, Minh looks at Emma’s family photo.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Học gì? Làm gì? Học cả cụm từ — dùng được ngay!", en: "What do they study? What do they do? Learn whole phrases." },
      blocks: [
        { type: "flashcards", id: "cards-study", strand: "language", mins: 6,
          title: { vi: "Thẻ từ · Học và làm", en: "Flashcards: studying and working" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "tốt nghiệp", en: "to graduate", ex: "Anh ấy tốt nghiệp đại học năm 2024.", exEn: "He graduated from college in 2024." },
            { vi: "cách đây", en: "… ago", ex: "cách đây hai năm", exEn: "two years ago" },
            { vi: "vẫn / vẫn còn", en: "still", ex: "Em gái mình vẫn còn học trung học.", exEn: "My younger sister is still in high school." },
            { vi: "trường trung học", en: "high school", ex: "học ở trường trung học", exEn: "go to high school" },
            { vi: "công ty", en: "company", ex: "làm việc ở một công ty", exEn: "work for a company" },
            { vi: "giáo viên", en: "teacher (school)", ex: "Mẹ mình là giáo viên.", exEn: "My mother is a teacher." },
            { vi: "lịch sử", en: "history", ex: "giáo viên lịch sử", exEn: "a history teacher" },
            { vi: "sinh học", en: "biology", ex: "Lily muốn học sinh học.", exEn: "Lily wants to study biology." },
            { vi: "văn học", en: "literature", ex: "văn học Việt Nam", exEn: "Vietnamese literature" },
            { vi: "kỹ thuật", en: "engineering, technology", ex: "trường đại học kỹ thuật", exEn: "a technical university" },
            { vi: "hiện giờ", en: "now, currently", ex: "Hiện giờ anh ấy làm việc ở Boston.", exEn: "He currently works in Boston." },
            { vi: "sau này", en: "later on, in the future", ex: "Sau này bạn muốn làm gì?", exEn: "What do you want to do in the future?" },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Vẫn, còn, cách đây — xem ví dụ trước, rồi tìm quy luật.", en: "Vẫn, còn, cách đây — examples first, then the rule." },
      blocks: [
        { type: "notice", id: "notice-still", strand: "language", mins: 4,
          title: { vi: "Khám phá · Vẫn và còn", en: "Discover: vẫn and còn" },
          examples: [
            { vi: "Em gái Emma <strong>vẫn còn</strong> học trung học.", en: "Emma’s younger sister is still in high school." },
            { vi: "Bố Minh <strong>vẫn</strong> làm việc. Bố chưa về hưu.", en: "Minh’s father still works. He hasn’t retired yet." },
            { vi: "Mười giờ tối rồi, nhưng Minh <strong>còn</strong> ở thư viện.", en: "It’s already ten at night, but Minh is still at the library." },
            { vi: "Anh Jake tốt nghiệp <strong>cách đây</strong> hai năm.", en: "Jake graduated two years ago." },
          ],
          q: "Vẫn / còn / vẫn còn nghĩa là …", qEn: "Vẫn / còn / vẫn còn means …",
          opts: ["still", "already", "not yet"], correct: "still",
          why: { "already": "“Already” is rồi.", "not yet": "“Not yet” is chưa." },
          explain: "vẫn / còn / vẫn còn + verb = still · cách đây + time = … ago.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>vẫn / còn / vẫn còn</strong> + verb = still (<em>vẫn còn</em> is a little stronger): <em>Bố Minh vẫn (còn) làm việc.</em> · <strong>vẫn chưa</strong> = still not: <em>Anh Jake vẫn chưa có vợ.</em> <button class="tts" data-say="Bố Minh vẫn còn làm việc. Anh Jake vẫn chưa có vợ.">🔊</button></td><td>still · still not</td></tr>
              <tr><td><strong>cách đây</strong> + time = … ago: <em>Emma bắt đầu học tiếng Việt cách đây ba tháng.</em> <button class="tts" data-say="Emma bắt đầu học tiếng Việt cách đây ba tháng.">🔊</button></td><td>… ago</td></tr>
              <tr><td><strong>tốt nghiệp</strong> (+ school): <em>tốt nghiệp đại học</em> (college) · <em>tốt nghiệp trung học</em> (high school) — no “from” needed.</td><td>to graduate</td></tr>
              <tr><td><strong>thế</strong> at the end of a question makes it friendly and curious: <em>Tin gì thế?</em> · <em>Thế còn bạn?</em> = And what about you? <button class="tts" data-say="Tin gì thế? Thế còn bạn?">🔊</button></td><td>so …?</td></tr>
              <tr><td><strong>đấy</strong> at the end of a statement draws attention — “you know!”: <em>Mình sẽ học tiếng Việt bốn năm đấy!</em> <button class="tts" data-say="Mình sẽ học tiếng Việt bốn năm đấy!">🔊</button></td><td>… you know!</td></tr>
            </table>` },

        { type: "mc", id: "still-ago", strand: "language", mins: 4,
          title: { vi: "Vẫn, cách đây, đấy, thế", en: "Still, ago, đấy and thế" },
          items: [
            { q: "Lily mười sáu tuổi. Lily ___ học trung học.", opts: ["vẫn còn", "đã tốt nghiệp", "sắp về hưu"], correct: "vẫn còn" },
            { q: "Anh Jake tốt nghiệp năm 2024. Bây giờ là năm 2026. Anh ấy tốt nghiệp ___ hai năm.", opts: ["cách đây", "sau", "từ"], correct: "cách đây" },
            { q: "Mười giờ tối rồi, nhưng Minh ___ ở thư viện.", opts: ["vẫn", "chưa", "sẽ"], correct: "vẫn" },
            { q: "Anh Jake chưa có vợ. Anh ấy ___ chưa có gia đình.", opts: ["vẫn", "đã", "sắp"], correct: "vẫn" },
            { q: "Bạn muốn hỏi một cách thân thiện, tò mò: “Tin gì ___?”", en: "You want to ask in a friendly, curious way.", opts: ["thế", "đấy", "rồi"], correct: "thế", why: { "đấy": "đấy goes at the end of a statement (… đấy!). For a curious question, use thế." } },
          ] },

        { type: "mc", id: "study", strand: "language", mins: 3,
          title: { vi: "Học gì? Làm gì?", en: "What do they study? What do they do?" },
          items: [
            { q: "Mẹ Emma dạy lịch sử ở trường trung học. Mẹ Emma là ___.", opts: ["giáo viên", "sinh viên", "tiến sĩ"], correct: "giáo viên" },
            { q: "Lily muốn làm bác sĩ, nên sau này Lily muốn học ___.", opts: ["sinh học", "văn học", "lịch sử"], correct: "sinh học" },
            { q: "“Hiện giờ anh ấy làm việc ở một công ty.” — hiện giờ nghĩa là …", opts: ["now, currently", "in the future", "two years ago"], correct: "now, currently" },
            { q: "“Sau này bạn muốn làm gì?” hỏi về …", opts: ["the future", "the past", "right now"], correct: "the future" },
          ] },

        { type: "cloze", id: "review", strand: "language", mins: 3,
          title: { vi: "Ôn tập · Bài 7", en: "Lesson 7 review" },
          instr: { vi: "Emma nhắn tin cho Minh. Điền từ.", en: "Emma texts Minh. Fill in the blanks." },
          items: [
            { text: "Minh ơi, hôm qua mình {0} gọi điện cho mẹ. Bây giờ mình {1} làm bài tập. Tháng mười hai mình {2} về nhà. Còn bạn, bạn ăn tối {3}?", answers: ["đã", "đang", "sẽ", "chưa"], bank: ["đã", "đang", "sẽ", "chưa", "tuổi", "lắm"] },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Vẫn hay vấn? Sử hay xử? Nghe kỹ nhé!", en: "Vẫn or vấn? Sử or xử? Listen closely!" },
      blocks: [
        { type: "mc", id: "look-alike", strand: "language", mins: 2,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "nghiệp", q: "", opts: ["nghiệp", "nghiếp", "nghiêp"], correct: "nghiệp", explain: "ngh + iê + p, with the heavy tone (nặng) under ê: tốt nghiệp." },
            { say: "vẫn", q: "", opts: ["vẫn", "vấn", "vận"], correct: "vẫn", explain: "vẫn has the ngã tone (~) = still." },
            { say: "sử", q: "", opts: ["sử", "sữ", "xử"], correct: "sử", explain: "lịch sử: s- and the hỏi tone on ư." },
            { say: "trung", q: "", opts: ["trung", "chung", "trưng"], correct: "trung", explain: "tr- in trung học (high school) · chung = shared." },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: nghieepj → nghiệp, vaanx → vẫn.", en: "Tap Listen, then type. Telex works: nghieepj → nghiệp, vaanx → vẫn." },
          items: [
            { say: "tốt nghiệp", telex: true, answers: ["tốt nghiệp"] },
            { say: "cách đây hai năm", telex: true, answers: ["cách đây hai năm"] },
            { say: "vẫn còn học", telex: true, answers: ["vẫn còn học"] },
            { say: "sau này bạn muốn làm gì", telex: true, answers: ["sau này bạn muốn làm gì"], show: "Sau này bạn muốn làm gì?" },
          ] },
      ],
    },

    /* ═══════════════ VIẾT & NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Viết & nói",
      intro: { vi: "Viết về gia đình bạn, rồi đọc to và ghi âm.", en: "Write about your family, then read it aloud and record it." },
      blocks: [
        { type: "writing", id: "my-family", strand: "output", mins: 7,
          title: { vi: "Viết · Gia đình tôi", en: "Write: my family" },
          prompt: { vi: "Viết 5–6 câu về gia đình bạn: gia đình bạn có mấy người, họ bao nhiêu tuổi, họ làm gì hoặc học gì, ai vẫn còn đi học, ai đã tốt nghiệp.", en: "Write 5–6 sentences about your family: how many people, their ages, what they do or study, who is still in school, who has graduated. (You may invent a family if you prefer.)" },
          minWords: 30,
          checklist: [
            { vi: "Gia đình … có … người", en: "how many people are in your family" },
            { vi: "… tuổi", en: "someone’s age" },
            { vi: "đã, đang hoặc sẽ", en: "đã, đang or sẽ (at least one)" },
            { vi: "vẫn (còn) hoặc cách đây", en: "vẫn (còn) or cách đây" },
          ] },

        { type: "record", id: "voice", strand: "output", mins: 4,
          title: { vi: "Nói · Gia đình tôi", en: "Speak: my family" },
          instr: { vi: "Nói theo hai câu mẫu, rồi đọc to bài viết của bạn.", en: "Shadow the two model lines, then read your writing aloud." },
          prompts: [
            { vi: "Anh trai mình tốt nghiệp cách đây hai năm.", en: "My older brother graduated two years ago." },
            { vi: "Em gái mình vẫn còn học trung học.", en: "My younger sister is still in high school." },
            { vi: "Gia đình tôi", en: "My family (read your text above)", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st3", strand: "input", emoji: "🖼️", level: "Cấp 1", mins: 8,
          titleVi: "Ảnh gia đình Emma", titleEn: "Emma’s family photo",
          gloss: [["kỹ sư", "engineer"], ["về hưu", "to retire"], ["tốt nghiệp", "to graduate"], ["cách đây", "… ago"], ["hiện giờ", "now, currently"], ["vẫn (còn)", "still"], ["sau này", "in the future"]],
          body: [
            { t: "n", s: "Thứ sáu, sau lớp tiếng Việt, Minh xem ảnh gia đình của Emma." },
            { t: "d", sp: "Minh", s: "Đây là bố mẹ bạn à? Bố mẹ bạn làm gì?" },
            { t: "d", sp: "Emma", s: "Mẹ mình là giáo viên lịch sử. Bố mình là kỹ sư, nhưng bố mình về hưu rồi." },
            { t: "d", sp: "Minh", s: "Còn đây là anh trai bạn à?" },
            { t: "d", sp: "Emma", s: "Ừ, anh Jake. Anh ấy tốt nghiệp đại học cách đây hai năm. Hiện giờ anh ấy làm việc ở một công ty ở Boston." },
            { t: "d", sp: "Minh", s: "Anh ấy có gia đình chưa?" },
            { t: "d", sp: "Emma", s: "Chưa. Anh ấy vẫn chưa có vợ đấy!" },
            { t: "d", sp: "Minh", s: "Thế còn em gái bạn? Em ấy bao nhiêu tuổi?" },
            { t: "d", sp: "Emma", s: "Lily mười sáu tuổi. Em ấy vẫn còn học trung học. Sau này em ấy muốn học sinh học." },
            { t: "d", sp: "Minh", s: "Còn bạn? Sau này bạn muốn làm gì?" },
            { t: "d", sp: "Emma", s: "Mình chưa biết! Nhưng mình sẽ học tiếng Việt bốn năm đấy!" },
          ],
          pairs: [["giáo viên", "teacher"], ["công ty", "company"], ["trung học", "high school"], ["sinh học", "biology"]],
          order: ["Minh xem ảnh gia đình của Emma.", "Emma nói mẹ Emma là giáo viên lịch sử.", "Emma nói anh Jake làm việc ở Boston.", "Emma nói Lily vẫn còn học trung học."],
          fill: { text: "Anh Jake tốt nghiệp đại học {0} hai năm. Anh ấy {1} chưa có vợ. Lily mười sáu {2}. Sau {3}, Lily muốn học sinh học.", answers: ["cách đây", "vẫn", "tuổi", "này"], bank: ["cách đây", "vẫn", "tuổi", "này", "sẽ", "đã"] } },

        { type: "readaloud", id: "read-aloud", story: "st3", strand: "fluency", mins: 4,
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
