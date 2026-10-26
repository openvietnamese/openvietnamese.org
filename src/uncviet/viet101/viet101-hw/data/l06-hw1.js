/* VIET 101 (UNC Viet) — Bài 6 homework 1 of 3 (Monday): Mấy giờ rồi? · Telling the time
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lesson 6. ≈ 50 minutes at home.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world continues from Bài 5 (l05-hw1.js): Emma, Minh, chị Linh. "Today" = Monday 2/11/2026.
   Emma: Vietnamese Mon/Wed/Fri 10:10–11:00, math with Minh Tue/Thu, library job on Saturdays.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: 6,
  titleVi: "Bài tập thứ Hai · Mấy giờ rồi?",
  titleEn: "Monday homework: telling the time",
  description: "VIET 101, Lesson 6 homework 1: asking and telling the time — giờ, phút, rưỡi, kém, sáng / trưa / chiều / tối, watches that are fast, slow or stopped — vocabulary, grammar, spelling, speaking and a short story. About 50 minutes.",
  color: "#0e7490",
  badge: { icon: "🕗", name: "Đúng giờ · On the dot" },

  cando: [
    { vi: "Tôi có thể hỏi “Mấy giờ rồi?” và nói giờ.", en: "I can ask “What time is it?” and tell the time." },
    { vi: "Tôi có thể dùng rưỡi, kém và sáng / trưa / chiều / tối.", en: "I can use rưỡi (half past), kém (to) and morning / noon / afternoon / evening." },
    { vi: "Tôi có thể nói đồng hồ chạy nhanh, chậm hay chết.", en: "I can say a watch is fast, slow or has stopped." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập về nhà 1/3 · Bài 6 · khoảng 50 phút.", en: "Homework 1 of 3 · Lesson 6 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Work through the tabs in order. Each card shows its time (⏱). Your progress is saved in this browser.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Clock words · watches</td><td>7′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td>How to say the time · read and set clocks</td><td>15′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>rưỡi, kém, giờ, phút · dictation</td><td>7′</td></tr>
            <tr><td>4️⃣ Nói</td><td>Ask and tell the time</td><td>6′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Đồng hồ của Minh</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lesson 6</strong> — re-read the first dialogue and the grammar notes on telling time.</p>
          <p><small>Tip: tap <strong>EN</strong> in the blue header to show English · 🐢 slows the voice down. Dictation boxes accept <strong>Telex</strong> (e.g. <em>giowf</em> → giờ).</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Các từ để nói giờ.", en: "Words for telling the time." },
      blocks: [
        { type: "flashcards", id: "cards-clock", strand: "language", mins: 7,
          title: { vi: "Thẻ từ · Giờ giấc", en: "Flashcards: clock time" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "Mấy giờ rồi?", en: "What time is it?", ex: "Minh ơi, mấy giờ rồi?", exEn: "Minh, what time is it?" },
            { vi: "Bây giờ là … giờ.", en: "It’s … o’clock now.", ex: "Bây giờ là chín giờ.", exEn: "It’s nine o’clock." },
            { vi: "giờ", en: "hour; o’clock", ex: "bảy giờ sáng", exEn: "7 a.m." },
            { vi: "phút", en: "minute", ex: "tám giờ mười lăm phút", exEn: "8:15" },
            { vi: "giây", en: "second", ex: "ba mươi giây", exEn: "thirty seconds" },
            { vi: "rưỡi", en: "half (past)", ex: "chín giờ rưỡi", exEn: "half past nine" },
            { vi: "kém", en: "to (before the hour)", ex: "mười giờ kém mười", exEn: "ten to ten (9:50)" },
            { vi: "đúng", en: "exactly, sharp", ex: "chín giờ đúng", exEn: "nine o’clock sharp" },
            { vi: "đồng hồ", en: "watch, clock", ex: "Đồng hồ của mình", exEn: "my watch" },
            { vi: "nhanh", en: "fast", ex: "Đồng hồ chạy nhanh năm phút.", exEn: "The clock is five minutes fast." },
            { vi: "chậm", en: "slow", ex: "Đồng hồ chạy chậm.", exEn: "The clock is slow." },
            { vi: "chết", en: "to stop (of a watch); to die", ex: "Đồng hồ của Minh chết rồi.", exEn: "Minh’s watch has stopped." },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Nói giờ thế nào? Xem ví dụ trước, rồi tìm quy luật.", en: "How do you say the time? Examples first, then the rule." },
      blocks: [
        { type: "notice", id: "notice-time", strand: "language", mins: 4,
          title: { vi: "Khám phá · Giờ, rưỡi, kém", en: "Discover: giờ, rưỡi, kém" },
          examples: [
            { vi: "Bây giờ là <strong>bảy giờ</strong> sáng.", en: "It’s 7:00 a.m." },
            { vi: "Lớp toán bắt đầu lúc <strong>chín giờ</strong>.", en: "Math class starts at 9:00." },
            { vi: "<strong>Chín giờ rưỡi</strong> rồi!", en: "It’s already 9:30!" },
            { vi: "Bây giờ là <strong>mười giờ kém mười</strong>.", en: "It’s 9:50 (ten to ten)." },
          ],
          q: "“Mười giờ kém mười” là mấy giờ?", qEn: "What time is “mười giờ kém mười”?",
          opts: ["9:50", "10:10", "10:50"], correct: "9:50",
          why: { "10:10": "That would be mười giờ mười. Kém = “lacking”: ten o’clock minus ten minutes.", "10:50": "Kém takes minutes away from the hour: 10:00 − 10 minutes." },
          explain: "Kém = “short of”: ten o’clock, ten minutes short → 9:50.",
          reveal: `
            <ul>
              <li><strong>hour + giờ + minutes (+ phút):</strong> <em>tám giờ mười lăm (phút)</em> = 8:15. <button class="tts" data-say="tám giờ mười lăm phút">🔊</button></li>
              <li><strong>rưỡi</strong> = half past: <em>chín giờ rưỡi</em> = 9:30 (you can also say <em>chín giờ ba mươi</em>). <button class="tts" data-say="chín giờ rưỡi">🔊</button></li>
              <li><strong>next hour + giờ kém + minutes</strong> = minutes to the hour: <em>mười giờ kém mười</em> = 9:50, <em>ba giờ kém mười lăm</em> = 2:45. Many Southern speakers prefer <em>chín giờ năm mươi</em> — both are correct. <button class="tts" data-say="mười giờ kém mười, ba giờ kém mười lăm">🔊</button></li>
              <li><strong>Part of the day goes after the time:</strong> <em>bảy giờ <strong>sáng</strong></em> · <em>mười hai giờ <strong>trưa</strong></em> · <em>bốn giờ <strong>chiều</strong></em> · <em>tám giờ <strong>tối</strong></em> · <em>mười một giờ <strong>đêm</strong></em>.</li>
              <li><strong>Asking:</strong> <em>Mấy giờ rồi?</em> or <em>Bây giờ là mấy giờ?</em> — <em>rồi</em> here means “already”. <button class="tts" data-say="Mấy giờ rồi? Bây giờ là mấy giờ?">🔊</button></li>
              <li><strong>Watches:</strong> <em>Đồng hồ (chạy) nhanh / chậm năm phút</em> = five minutes fast / slow · <em>Đồng hồ chết rồi</em> = it has stopped.</li>
              <li>Train and bus times, TV and official notices use the <strong>24-hour clock</strong>: <em>16 giờ 30</em> = 4:30 p.m.</li>
            </ul>` },

        { type: "clockread", id: "clock-read", strand: "fluency", mins: 6,
          title: { vi: "Đọc đồng hồ", en: "Read the clock" },
          instr: { vi: "Viết giờ bằng tiếng Việt. Có thể viết số: “8 giờ 15”, hoặc chữ: “tám giờ mười lăm”.", en: "Type the time in Vietnamese — digits or words both work." },
          items: [ { h: 7, m: 0 }, { h: 8, m: 15 }, { h: 9, m: 30 }, { h: 12, m: 0 }, { h: 2, m: 45 }, { h: 5, m: 50 } ] },

        { type: "clockset", id: "clock-set", strand: "fluency", mins: 5,
          title: { vi: "Nghe và chỉnh đồng hồ", en: "Listen and set the clock" },
          instr: { vi: "Bấm 🔊, rồi chỉnh kim đồng hồ.", en: "Tap 🔊, then set the hands." },
          items: [
            { h: 7, m: 30, say: "Bảy giờ rưỡi sáng" },
            { h: 11, m: 45, say: "Mười hai giờ kém mười lăm" },
            { h: 4, m: 10, say: "Bốn giờ mười phút chiều" },
            { h: 9, m: 0, say: "Chín giờ tối" },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Kém hay kem? Rưỡi hay rưởi? Nghe kỹ nhé!", en: "Kém or kem? Listen closely!" },
      blocks: [
        { type: "mc", id: "tone-pick", strand: "language", mins: 3,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "kém", q: "", opts: ["kém", "kem", "kèm"], correct: "kém", explain: "kém (rising) = to, before the hour · kem (level) = ice cream!" },
            { say: "rưỡi", q: "", opts: ["rưỡi", "rưởi", "ruỗi"], correct: "rưỡi", explain: "rưỡi has a ngã tone (rising with a break) and ư." },
            { say: "giờ", q: "", opts: ["giờ", "giớ", "dờ"], correct: "giờ", explain: "giờ has a falling tone; it starts with gi (sounds like z in the North, y in the South)." },
            { say: "phút", q: "", opts: ["phút", "phúc", "fút"], correct: "phút", explain: "Final -t, not -c · Vietnamese writes the f-sound as ph." },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: ruwowix → rưỡi, kems → kém.", en: "Tap Listen, then type. Telex works: ruwowix → rưỡi, kems → kém." },
          items: [
            { say: "mấy giờ rồi", telex: true, answers: ["mấy giờ rồi"], show: "Mấy giờ rồi?" },
            { say: "bảy giờ rưỡi", telex: true, answers: ["bảy giờ rưỡi"] },
            { say: "mười giờ kém năm", telex: true, answers: ["mười giờ kém năm"] },
            { say: "đồng hồ chết rồi", telex: true, answers: ["đồng hồ chết rồi"] },
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
            { vi: "Xin lỗi, bây giờ là mấy giờ?", en: "Excuse me, what time is it?" },
            { vi: "Bây giờ là chín giờ kém mười lăm.", en: "It’s a quarter to nine." },
            { vi: "Đồng hồ của mình chạy chậm năm phút.", en: "My watch is five minutes slow." },
          ] },

        { type: "record", id: "my-time", strand: "output", mins: 3,
          title: { vi: "Nói về bạn", en: "Your turn" },
          instr: { vi: "Nhìn đồng hồ của bạn và trả lời. Không có mẫu — đây là câu của bạn!", en: "Look at your own clock and answer. No model — it’s your sentence!" },
          prompts: [
            { vi: "Bây giờ là mấy giờ?", en: "e.g. Bây giờ là tám giờ rưỡi tối.", model: false },
            { vi: "Hôm nay bạn có lớp tiếng Việt mấy giờ?", en: "e.g. Mình có lớp tiếng Việt mười giờ mười sáng.", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st1", strand: "input", emoji: "⌚", level: "Cấp 1", mins: 8,
          titleVi: "Đồng hồ của Minh", titleEn: "Minh’s watch",
          gloss: [["đợi", "to wait for"], ["chưa", "not yet"], ["vẫn", "still"], ["mới", "only (just)"], ["nhanh lên", "hurry up"], ["muộn", "late"]],
          body: [
            { t: "n", s: "Sáng thứ ba, Emma đợi Minh ở thư viện. Lớp toán bắt đầu lúc chín giờ." },
            { t: "n", s: "Chín giờ kém mười lăm. Minh chưa đến." },
            { t: "n", s: "Chín giờ. Minh vẫn chưa đến. Emma gọi điện cho Minh." },
            { t: "d", sp: "Emma", s: "Minh ơi, bạn ở đâu? Chín giờ rồi!" },
            { t: "d", sp: "Minh", s: "Chín giờ à? Đồng hồ của mình mới bảy giờ rưỡi!" },
            { t: "d", sp: "Emma", s: "Đồng hồ của bạn chết rồi! Nhanh lên!" },
            { t: "n", s: "Chín giờ hai mươi, Minh đến lớp. Minh đến muộn hai mươi phút." },
            { t: "d", sp: "Minh", s: "Chiều nay mình đi mua đồng hồ mới!" },
          ],
          pairs: [["đợi", "to wait for"], ["chưa", "not yet"], ["chết", "stopped (of a watch)"], ["muộn", "late"]],
          order: ["Emma đợi Minh ở thư viện.", "Emma gọi điện cho Minh.", "Minh nói đồng hồ của Minh mới bảy giờ rưỡi.", "Minh đến lớp lúc chín giờ hai mươi."],
          fill: { text: "Lớp toán bắt đầu lúc chín {0}. Đồng hồ của Minh {1} rồi. Minh đến lớp lúc chín giờ hai {2}, muộn hai mươi {3}.", answers: ["giờ", "chết", "mươi", "phút"], bank: ["giờ", "chết", "mươi", "phút", "rưỡi", "kém"] } },

        { type: "readaloud", id: "read-aloud", story: "st1", strand: "fluency", mins: 4,
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
