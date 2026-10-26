/* VIET 101 (UNC Viet) — Bài 7 homework 2 of 3 (Wednesday): Đã, đang, sẽ · Past, now and future
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lesson 7 (tense markers). ≈ 50 minutes at home.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world: see l07-hw1.js. "Today" = Wednesday 11/11/2026. News: chị Linh is expecting a baby girl;
   Minh’s mother comes to the US in December; Minh’s father still works and retires next year.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: 7,
  titleVi: "Bài tập thứ Tư · Đã, đang, sẽ",
  titleEn: "Wednesday homework: past, now and future",
  description: "VIET 101, Lesson 7 homework 2: the tense markers đã, đang, sẽ, sắp and vừa / mới, and “… chưa?” questions answered with rồi or chưa — vocabulary, grammar, spelling, speaking and a short story. About 50 minutes.",
  color: "#b45309",
  badge: { icon: "🕰️", name: "Đã · đang · sẽ — Time traveler" },

  cando: [
    { vi: "Tôi có thể dùng đã, đang và sẽ.", en: "I can use đã (past), đang (now, -ing) and sẽ (future)." },
    { vi: "Tôi có thể dùng vừa / mới (just) và sắp (soon, about to).", en: "I can use vừa / mới (just did) and sắp (soon, about to)." },
    { vi: "Tôi có thể hỏi “… chưa?” và trả lời “… rồi” hoặc “chưa”.", en: "I can ask “… yet?” and answer “already” (rồi) or “not yet” (chưa)." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập về nhà 2/3 · Bài 7 · khoảng 50 phút.", en: "Homework 2 of 3 · Lesson 7 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Work through the tabs in order. Each card shows its time (⏱). Your progress is saved in this browser.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Tense markers · news words</td><td>7′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td><em>đã, đang, sẽ, sắp, vừa</em> · <em>… chưa?</em> — <em>rồi / chưa</em></td><td>16′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>đang, sẽ, sắp, chưa · dictation</td><td>7′</td></tr>
            <tr><td>4️⃣ Nói</td><td>What are you doing now? What will you do this weekend?</td><td>6′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Tin vui</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lesson 7</strong> — the grammar notes on the tense markers <em>đã, vừa / mới, đang, sẽ, sắp, chưa</em> and when they are not used.</p>
          <p><small>In this homework, <strong>today is Wednesday, November 11</strong>. At lunch, Minh has big news.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Những từ nhỏ đứng trước động từ — rất quan trọng!", en: "Little words that go before the verb — very important!" },
      blocks: [
        { type: "flashcards", id: "cards-tense", strand: "language", mins: 7,
          title: { vi: "Thẻ từ · Đã, đang, sẽ", en: "Flashcards: past, now, future" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "đã", en: "(past) did, has done", ex: "Hôm qua Emma đã gọi điện cho mẹ.", exEn: "Yesterday Emma called her mom." },
            { vi: "đang", en: "(now) is …-ing", ex: "Minh đang học ở thư viện.", exEn: "Minh is studying at the library." },
            { vi: "sẽ", en: "will", ex: "Tháng mười hai Minh sẽ về Hà Nội.", exEn: "In December Minh will go home to Hà Nội." },
            { vi: "sắp", en: "soon, about to", ex: "Phim sắp bắt đầu.", exEn: "The movie is about to start." },
            { vi: "vừa / mới", en: "just (a moment ago)", ex: "Mình vừa ăn trưa.", exEn: "I just had lunch." },
            { vi: "… chưa?", en: "… yet?", ex: "Bạn ăn trưa chưa?", exEn: "Have you had lunch yet?" },
            { vi: "… rồi", en: "already", ex: "Mình ăn rồi.", exEn: "I’ve already eaten." },
            { vi: "chưa", en: "not yet", ex: "Chưa, mình chưa ăn.", exEn: "Not yet, I haven’t eaten." },
            { vi: "tin vui", en: "good news", ex: "Mình có tin vui!", exEn: "I have good news!" },
            { vi: "sinh em bé", en: "to have a baby", ex: "Chị Linh sắp sinh em bé.", exEn: "Chị Linh is going to have a baby soon." },
            { vi: "thăm", en: "to visit (someone)", ex: "Mẹ Minh sẽ sang Mỹ thăm chị Linh.", exEn: "Minh’s mom will come to the US to visit chị Linh." },
            { vi: "về hưu", en: "to retire", ex: "Sang năm bố Minh sẽ về hưu.", exEn: "Next year Minh’s dad will retire." },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Động từ tiếng Việt không đổi. Từ nhỏ trước động từ nói thời gian.", en: "Vietnamese verbs never change. A little word before the verb tells the time." },
      blocks: [
        { type: "notice", id: "notice-tense", strand: "language", mins: 4,
          title: { vi: "Khám phá · Đã, đang hay sẽ?", en: "Discover: đã, đang or sẽ?" },
          examples: [
            { vi: "Hôm qua Emma <strong>đã</strong> gọi điện cho mẹ.", en: "Yesterday Emma called her mom." },
            { vi: "Bây giờ Minh <strong>đang</strong> học ở thư viện.", en: "Right now Minh is studying at the library." },
            { vi: "Tháng mười hai Minh <strong>sẽ</strong> về Hà Nội.", en: "In December Minh will go home to Hà Nội." },
            { vi: "Chị Linh <strong>sắp</strong> sinh em bé.", en: "Chị Linh is going to have a baby soon." },
          ],
          q: "Từ nào nghĩa là “is …-ing” (bây giờ)?", qEn: "Which word means “is …-ing” (right now)?",
          opts: ["đang", "đã", "sẽ"], correct: "đang",
          why: { "đã": "đã goes with hôm qua — the past.", "sẽ": "sẽ goes with tháng mười hai — the future." },
          explain: "đã = past · đang = now (-ing) · sẽ = future · sắp = very soon. They all go right before the verb.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>đã</strong> + verb = past, done. Often left out when a time word already says it: <em>Hôm qua mình (đã) đi thư viện.</em> <button class="tts" data-say="Hôm qua mình đã đi thư viện.">🔊</button></td><td>did</td></tr>
              <tr><td><strong>vừa / mới / vừa mới</strong> + verb = just did: <em>Mình vừa ăn trưa.</em> · <em>Minh mới nói chuyện với mẹ.</em> <button class="tts" data-say="Mình vừa ăn trưa.">🔊</button></td><td>just</td></tr>
              <tr><td><strong>đang</strong> + verb = is doing now: <em>Minh đang học.</em></td><td>is …-ing</td></tr>
              <tr><td><strong>sẽ</strong> + verb = will: <em>Sang năm bố Minh sẽ về hưu.</em> · <strong>sắp</strong> + verb = soon, about to: <em>Mình sắp đi.</em> <button class="tts" data-say="Sang năm bố Minh sẽ về hưu. Mình sắp đi.">🔊</button></td><td>will · about to</td></tr>
              <tr><td><strong>(đã) … chưa?</strong> → <strong>… rồi</strong> or <strong>chưa</strong>: <em>Bạn ăn trưa chưa? — Mình ăn rồi. / Chưa, mình chưa ăn.</em> <button class="tts" data-say="Bạn ăn trưa chưa? Mình ăn rồi.">🔊</button></td><td>… yet? — already / not yet</td></tr>
              <tr><td>No marker for habits and facts: <em>Thứ hai Emma học tiếng Việt.</em> (every Monday)</td><td></td></tr>
            </table>` },

        { type: "mc", id: "tense-pick", strand: "language", mins: 5,
          title: { vi: "Chọn từ đúng", en: "Choose the right word" },
          items: [
            { q: "Hôm qua Emma ___ làm bài tập tiếng Việt.", opts: ["đã", "đang", "sẽ"], correct: "đã" },
            { q: "Bây giờ Minh ___ học ở thư viện.", opts: ["đang", "sẽ", "đã"], correct: "đang" },
            { q: "Tháng mười hai mẹ Minh ___ sang Mỹ.", opts: ["sẽ", "đã", "đang"], correct: "sẽ" },
            { q: "Phim bắt đầu lúc năm giờ. Bây giờ là năm giờ kém năm. Phim ___ bắt đầu.", opts: ["sắp", "đã", "vừa"], correct: "sắp", why: { "đã": "It’s 4:55 — the movie hasn’t started yet.", "vừa": "Vừa = it just happened. It’s 4:55 — it hasn’t happened yet." } },
            { q: "Lớp học bắt đầu lúc hai giờ. Bây giờ là hai giờ năm phút. Lớp học ___ bắt đầu.", opts: ["vừa", "sắp", "sẽ"], correct: "vừa", why: { "sắp": "Class started five minutes ago — that’s just (vừa), not soon.", "sẽ": "Class started five minutes ago — it’s not in the future." } },
            { q: "Bạn ăn trưa chưa? — Chưa, mình ___ ăn.", opts: ["chưa", "đã", "rồi"], correct: "chưa" },
          ] },

        { type: "mc", id: "chua-roi", strand: "language", mins: 4,
          title: { vi: "… chưa? — … rồi / chưa", en: "… yet? — already / not yet" },
          items: [
            { q: "“Bạn làm bài tập chưa?” — Bạn đã làm bài tập. Bạn trả lời:", en: "You’ve done it.", opts: ["Mình làm rồi.", "Mình chưa làm.", "Mình làm không."], correct: "Mình làm rồi." },
            { q: "“Anh Nam có gia đình chưa?” — Anh Nam là chồng chị Linh, nên:", opts: ["Anh ấy có gia đình rồi.", "Anh ấy chưa có gia đình.", "Anh ấy sắp có gia đình."], correct: "Anh ấy có gia đình rồi." },
            { q: "Câu hỏi nào đúng?", en: "Have you met Minh yet?", opts: ["Bạn đã gặp Minh chưa?", "Bạn đã gặp Minh không?", "Bạn gặp Minh rồi không?"], correct: "Bạn đã gặp Minh chưa?", why: { "Bạn đã gặp Minh không?": "A “… yet?” question ends with chưa, not không.", "Bạn gặp Minh rồi không?": "A “… yet?” question ends with chưa." } },
            { q: "“Mình vừa ăn trưa.” nghĩa là …", opts: ["I just had lunch.", "I will have lunch.", "I am having lunch."], correct: "I just had lunch." },
          ] },

        { type: "builder", id: "build", strand: "language", mins: 3,
          title: { vi: "Xếp câu", en: "Build the sentence" },
          items: [
            { en: "Minh is studying at the library.", tiles: ["Minh", "đang", "học", "ở", "thư viện"], answer: "Minh đang học ở thư viện." },
            { en: "Have you had dinner yet?", tiles: ["Bạn", "ăn tối", "chưa"], answer: "Bạn ăn tối chưa?" },
            { en: "Next year Minh’s father will retire.", tiles: ["Sang năm", "bố Minh", "sẽ", "về hưu"], answer: "Sang năm bố Minh sẽ về hưu." },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Chưa hay chua? Nghe kỹ nhé!", en: "Chưa or chua? Listen closely!" },
      blocks: [
        { type: "mc", id: "tone-pick", strand: "language", mins: 3,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "đang", q: "", opts: ["đang", "đăng", "đàng"], correct: "đang", explain: "đang (level tone, a) = is …-ing." },
            { say: "sẽ", q: "", opts: ["sẽ", "sẻ", "xẽ"], correct: "sẽ", explain: "sẽ has the ngã tone (~) = will · sẻ (hỏi) = sparrow!" },
            { say: "sắp", q: "", opts: ["sắp", "sấp", "sáp"], correct: "sắp", explain: "sắp = s + ă + p, rising tone." },
            { say: "chưa", q: "", opts: ["chưa", "chua", "chừa"], correct: "chưa", explain: "chưa (ư) = not yet · chua (u) = sour!" },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: ddang → đang, chuwa → chưa.", en: "Tap Listen, then type. Telex works: ddang → đang, chuwa → chưa." },
          items: [
            { say: "đã ăn rồi", telex: true, answers: ["đã ăn rồi"] },
            { say: "đang học", telex: true, answers: ["đang học"] },
            { say: "sắp về hưu", telex: true, answers: ["sắp về hưu"] },
            { say: "bạn ăn trưa chưa", telex: true, answers: ["bạn ăn trưa chưa"], show: "Bạn ăn trưa chưa?" },
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
            { vi: "Bạn ăn trưa chưa?", en: "Have you had lunch yet?" },
            { vi: "Mình vừa ăn trưa với Minh.", en: "I just had lunch with Minh." },
            { vi: "Tháng mười hai mình sẽ về nhà.", en: "In December I’ll go home." },
          ] },

        { type: "record", id: "my-week", strand: "output", mins: 3,
          title: { vi: "Nói về bạn", en: "Your turn" },
          instr: { vi: "Trả lời bằng một hoặc hai câu. Không có mẫu — đây là câu của bạn!", en: "Answer in one or two sentences. No model — it’s your sentence!" },
          prompts: [
            { vi: "Bây giờ bạn đang làm gì?", en: "e.g. Bây giờ mình đang làm bài tập tiếng Việt.", model: false },
            { vi: "Cuối tuần này bạn sẽ làm gì?", en: "This weekend (cuối tuần này)? e.g. Cuối tuần này mình sẽ …", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st2", strand: "input", emoji: "👶", level: "Cấp 1", mins: 8,
          titleVi: "Tin vui", titleEn: "Good news",
          gloss: [["nhà ăn", "dining hall"], ["nói chuyện với", "to talk with"], ["thế", "(makes a question curious)"], ["sang Mỹ", "to come over to the US"], ["vẫn", "still"], ["rồi", "then; already"]],
          body: [
            { t: "n", s: "Thứ tư, mười hai giờ trưa, Emma và Minh ăn trưa ở nhà ăn." },
            { t: "d", sp: "Minh", s: "Emma ơi, mình có tin vui! Mình vừa nói chuyện với mẹ mình." },
            { t: "d", sp: "Emma", s: "Tin gì thế?" },
            { t: "d", sp: "Minh", s: "Chị Linh sắp sinh em bé! Tháng mười hai, mẹ mình sẽ sang Mỹ thăm chị ấy." },
            { t: "d", sp: "Emma", s: "Ôi, vui quá! Chị Linh đã biết em bé là con trai hay con gái chưa?" },
            { t: "d", sp: "Minh", s: "Biết rồi. Con gái!" },
            { t: "d", sp: "Emma", s: "Còn bố bạn? Bố bạn có sang không?" },
            { t: "d", sp: "Minh", s: "Chưa. Bố mình vẫn đang làm việc. Sang năm bố mình về hưu, rồi bố sẽ sang." },
            { t: "d", sp: "Emma", s: "Hay quá! Mình cũng muốn gặp em bé!" },
          ],
          pairs: [["sắp", "soon, about to"], ["sẽ", "will"], ["vừa", "just (now)"], ["thăm", "to visit"]],
          order: ["Minh vừa nói chuyện với mẹ.", "Minh nói chị Linh sắp sinh em bé.", "Emma hỏi em bé là con trai hay con gái.", "Minh nói sang năm bố Minh về hưu."],
          fill: { text: "Chị Linh {0} sinh em bé. Tháng mười hai, mẹ Minh {1} sang Mỹ thăm chị ấy. Em bé là con {2}. Bố Minh {3} về hưu.", answers: ["sắp", "sẽ", "gái", "chưa"], bank: ["sắp", "sẽ", "gái", "chưa", "trai", "đang"] } },

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
