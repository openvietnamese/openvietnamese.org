/* VIET 101 (UNC Viet) — Bài 6 homework 2 of 3 (Wednesday): Lúc, vào, từ … đến, trước, sau · A daily schedule
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lesson 6. ≈ 50 minutes at home.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world: see l05-hw1.js / l06-hw1.js. "Today" = Wednesday 4/11/2026.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

const SCHEDULE = `
  <div class="table-scroll"><table class="culture-table">
    <tr><th colspan="2" style="text-align:center">📅 THỨ TƯ CỦA EMMA · 4/11</th></tr>
    <tr><td>7:00</td><td>dậy</td></tr>
    <tr><td>7:30</td><td>ăn sáng</td></tr>
    <tr><td>10:10 – 11:00</td><td>lớp tiếng Việt</td></tr>
    <tr><td>12:00</td><td>ăn trưa với Minh</td></tr>
    <tr><td>1:00 – 3:00</td><td>học ở thư viện</td></tr>
    <tr><td>3:30 – 4:30</td><td>chạy bộ</td></tr>
    <tr><td>6:30</td><td>ăn tối</td></tr>
    <tr><td>11:00</td><td>đi ngủ</td></tr>
  </table></div>`;

window.BV_CHAPTER = {
  id: 6,
  titleVi: "Bài tập thứ Tư · Lúc, vào, từ … đến",
  titleEn: "Wednesday homework: at, on, from … to, before, after",
  description: "VIET 101, Lesson 6 homework 2: time prepositions lúc, vào, từ … đến, trước, sau and a daily schedule — vocabulary, grammar, spelling, speaking and a short story. About 50 minutes.",
  color: "#7c3aed",
  badge: { icon: "🗓️", name: "Lịch trong ngày · Day planner" },

  cando: [
    { vi: "Tôi có thể dùng lúc + giờ và vào + thứ, ngày.", en: "I can use lúc + clock time and vào + day or date." },
    { vi: "Tôi có thể nói từ … đến …, trước và sau.", en: "I can say from … to …, before and after." },
    { vi: "Tôi có thể đọc một thời khóa biểu và nói về một ngày của tôi.", en: "I can read a schedule and talk about my day." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập về nhà 2/3 · Bài 6 · khoảng 50 phút.", en: "Homework 2 of 3 · Lesson 6 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Work through the tabs in order. Each card shows its time (⏱). Your progress is saved in this browser.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Time prepositions · daily routine</td><td>7′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td>lúc, vào, từ … đến, trước, sau · read Emma’s schedule</td><td>16′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>sau / sáu, lúc, trước · dictation</td><td>7′</td></tr>
            <tr><td>4️⃣ Nói</td><td>Talk about your day</td><td>6′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Thứ bảy em có rảnh không?</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lesson 6</strong> — the grammar notes on <em>từ, đến, vào, trong, lúc, trước, sau</em>.</p>
          <p><small>In this homework, <strong>today is Wednesday, November 4</strong> (thứ tư, ngày bốn tháng mười một).</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Giới từ thời gian và các việc trong ngày.", en: "Time prepositions and everyday activities." },
      blocks: [
        { type: "flashcards", id: "cards-day", strand: "language", mins: 7,
          title: { vi: "Thẻ từ · Một ngày", en: "Flashcards: a day" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "lúc", en: "at (a clock time)", ex: "lúc bảy giờ", exEn: "at seven o’clock" },
            { vi: "vào", en: "on, in (a day, date, part of the day)", ex: "vào thứ tư", exEn: "on Wednesday" },
            { vi: "từ … đến …", en: "from … to / until …", ex: "từ một giờ đến ba giờ", exEn: "from one to three" },
            { vi: "trước", en: "before", ex: "trước tám giờ", exEn: "before eight" },
            { vi: "sau", en: "after", ex: "sau lớp tiếng Việt", exEn: "after Vietnamese class" },
            { vi: "bắt đầu", en: "to start", ex: "Lớp học bắt đầu lúc mười giờ mười.", exEn: "Class starts at 10:10." },
            { vi: "dậy", en: "to get up", ex: "Emma dậy lúc bảy giờ.", exEn: "Emma gets up at seven." },
            { vi: "ăn sáng", en: "to have breakfast", ex: "ăn sáng lúc bảy giờ rưỡi", exEn: "have breakfast at 7:30" },
            { vi: "ăn trưa", en: "to have lunch", ex: "ăn trưa với Minh", exEn: "have lunch with Minh" },
            { vi: "ăn tối", en: "to have dinner", ex: "ăn tối lúc sáu giờ rưỡi", exEn: "have dinner at 6:30" },
            { vi: "chạy bộ", en: "to go jogging", ex: "Emma chạy bộ vào buổi chiều.", exEn: "Emma jogs in the afternoon." },
            { vi: "đi ngủ", en: "to go to bed", ex: "đi ngủ lúc mười một giờ", exEn: "go to bed at eleven" },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Lúc hay vào? Xem ví dụ trước, rồi tìm quy luật.", en: "Lúc or vào? Examples first, then the rule." },
      blocks: [
        { type: "notice", id: "notice-prep", strand: "language", mins: 4,
          title: { vi: "Khám phá · Lúc hay vào?", en: "Discover: lúc or vào?" },
          examples: [
            { vi: "Emma dậy <strong>lúc</strong> bảy giờ.", en: "Emma gets up at seven." },
            { vi: "Lớp tiếng Việt bắt đầu <strong>lúc</strong> mười giờ mười.", en: "Vietnamese class starts at 10:10." },
            { vi: "Emma có lớp tiếng Việt <strong>vào</strong> thứ hai, thứ tư và thứ sáu.", en: "Emma has Vietnamese on Mondays, Wednesdays and Fridays." },
            { vi: "Sinh nhật Minh <strong>vào</strong> ngày ba mươi mốt tháng mười.", en: "Minh’s birthday is on October 31." },
          ],
          q: "Trước giờ (7:00, 10:10), người Việt dùng …", qEn: "Before a clock time (7:00, 10:10), Vietnamese uses …",
          opts: ["lúc", "vào"], correct: "lúc",
          why: { "vào": "Look again: vào goes with thứ hai, ngày ba mươi mốt — days and dates." },
          explain: "lúc + clock time · vào + day, date or part of the day.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>lúc</strong> + clock time: <em>lúc bảy giờ</em> · <em>lúc mười giờ mười</em> · question: <em>lúc mấy giờ?</em> <button class="tts" data-say="lúc bảy giờ, lúc mấy giờ?">🔊</button></td><td>at</td></tr>
              <tr><td><strong>vào</strong> + day / date / part of the day: <em>vào thứ tư</em> · <em>vào ngày mười bốn</em> · <em>vào buổi chiều</em> (often left out: <em>Thứ tư mình có lớp.</em>)</td><td>on, in</td></tr>
              <tr><td><strong>từ … đến …</strong>: <em>Emma học ở thư viện từ một giờ đến ba giờ.</em> <button class="tts" data-say="từ một giờ đến ba giờ">🔊</button></td><td>from … to</td></tr>
              <tr><td><strong>trước</strong> / <strong>sau</strong> + time or event: <em>trước tám giờ</em> · <em>sau lớp tiếng Việt</em></td><td>before / after</td></tr>
              <tr><td>The time phrase can start the sentence: <em><strong>Lúc bảy giờ</strong>, Emma dậy.</em> · <em><strong>Sau lớp tiếng Việt</strong>, Emma đi ăn trưa.</em></td><td></td></tr>
            </table>` },

        { type: "html", title: { vi: "Thời khóa biểu của Emma", en: "Emma’s schedule" }, strand: "input", mins: 2, html: SCHEDULE },

        { type: "mc", id: "sched", strand: "input", mins: 5,
          title: { vi: "Xem thời khóa biểu", en: "Read the schedule" },
          instr: { vi: "Dùng thời khóa biểu ở trên.", en: "Use the schedule above." },
          items: [
            { q: "Emma dậy lúc mấy giờ?", opts: ["lúc bảy giờ", "lúc bảy giờ rưỡi", "lúc sáu giờ"], correct: "lúc bảy giờ" },
            { q: "Lớp tiếng Việt từ mấy giờ đến mấy giờ?", opts: ["từ mười giờ mười đến mười một giờ", "từ mười giờ đến mười một giờ mười", "từ một giờ đến ba giờ"], correct: "từ mười giờ mười đến mười một giờ" },
            { q: "Emma ăn trưa với ai, lúc mấy giờ?", opts: ["với Minh, lúc mười hai giờ trưa", "với Minh, lúc một giờ chiều", "với chị Linh, lúc mười hai giờ trưa"], correct: "với Minh, lúc mười hai giờ trưa" },
            { q: "Trước lớp tiếng Việt, Emma làm gì?", opts: ["ăn sáng", "chạy bộ", "ăn tối"], correct: "ăn sáng" },
            { q: "Sau lớp tiếng Việt, Emma làm gì?", opts: ["ăn trưa với Minh", "dậy", "ăn sáng"], correct: "ăn trưa với Minh" },
          ] },

        { type: "mc", id: "prep", strand: "language", mins: 4,
          title: { vi: "Chọn từ đúng", en: "Choose the right word" },
          items: [
            { q: "Emma dậy ___ bảy giờ.", opts: ["lúc", "vào", "từ"], correct: "lúc" },
            { q: "Emma có lớp tiếng Việt ___ thứ hai, thứ tư và thứ sáu.", opts: ["vào", "lúc", "đến"], correct: "vào", why: { "lúc": "Lúc goes with clock times — days take vào." } },
            { q: "Emma học ở thư viện ___ một giờ ___ ba giờ.", opts: ["từ … đến", "lúc … vào", "trước … sau"], correct: "từ … đến" },
            { q: "Thư viện mở cửa lúc tám giờ. ___ tám giờ, thư viện chưa mở cửa.", opts: ["Trước", "Sau", "Vào"], correct: "Trước", why: { "Sau": "After eight it’s open — the library is still closed before eight." } },
            { q: "___ lớp tiếng Việt, Emma đi ăn trưa với Minh.", opts: ["Sau", "Trước", "Lúc"], correct: "Sau", why: { "Trước": "Class ends at 11:00 and lunch is at 12:00 — lunch comes after class." } },
          ] },

        { type: "builder", id: "build", strand: "language", mins: 3,
          title: { vi: "Xếp câu", en: "Build the sentence" },
          items: [
            { en: "I get up at seven o’clock.", tiles: ["Mình", "dậy", "lúc", "bảy giờ"], answer: "Mình dậy lúc bảy giờ." },
            { en: "I have class from ten to eleven.", tiles: ["Mình", "có lớp", "từ", "mười giờ", "đến", "mười một giờ"], answer: "Mình có lớp từ mười giờ đến mười một giờ." },
            { en: "What time does the class start?", tiles: ["Lớp học", "bắt đầu", "lúc", "mấy giờ"], answer: "Lớp học bắt đầu lúc mấy giờ?" },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Sau hay sáu? Một dấu khác — nghĩa khác!", en: "Sau or sáu? One tone mark, a different word!" },
      blocks: [
        { type: "mc", id: "tone-pick", strand: "language", mins: 3,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "sau", q: "", opts: ["sau", "sáu", "xau"], correct: "sau", explain: "sau (level) = after · sáu (rising) = six!" },
            { say: "lúc", q: "", opts: ["lúc", "lục", "luc"], correct: "lúc", explain: "lúc (rising) = at · lục (heavy) is a different word." },
            { say: "trước", q: "", opts: ["trước", "trức", "trườc"], correct: "trước", explain: "trước = tr + ươ + c, rising tone on ơ." },
            { say: "dậy", q: "", opts: ["dậy", "dạy", "dây"], correct: "dậy", explain: "dậy (â, heavy) = to get up · dạy (a, heavy) = to teach!" },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: truwowcs → trước, luscs → lúc.", en: "Tap Listen, then type. Telex works: truwowcs → trước." },
          items: [
            { say: "lúc mấy giờ", telex: true, answers: ["lúc mấy giờ"] },
            { say: "vào thứ tư", telex: true, answers: ["vào thứ tư"] },
            { say: "từ tám giờ đến mười giờ", telex: true, answers: ["từ tám giờ đến mười giờ"] },
            { say: "trước chín giờ", telex: true, answers: ["trước chín giờ"] },
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
            { vi: "Lớp tiếng Việt bắt đầu lúc mấy giờ?", en: "What time does Vietnamese class start?" },
            { vi: "Mình học ở thư viện từ một giờ đến ba giờ.", en: "I study at the library from one to three." },
            { vi: "Sau lớp học, mình đi ăn trưa.", en: "After class, I go to lunch." },
          ] },

        { type: "record", id: "my-day", strand: "output", mins: 3,
          title: { vi: "Nói về bạn", en: "Your turn" },
          instr: { vi: "Trả lời bằng một hoặc hai câu. Không có mẫu — đây là câu của bạn!", en: "Answer in one or two sentences. No model — it’s your sentence!" },
          prompts: [
            { vi: "Hôm nay bạn dậy lúc mấy giờ? Bạn ăn sáng lúc mấy giờ?", en: "e.g. Hôm nay mình dậy lúc …", model: false },
            { vi: "Thứ tư bạn có lớp từ mấy giờ đến mấy giờ?", en: "e.g. Thứ tư mình có lớp từ … đến …", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st2", strand: "input", emoji: "📞", level: "Cấp 1", mins: 8,
          titleVi: "Thứ bảy em có rảnh không?", titleEn: "Are you free on Saturday?",
          gloss: [["chơi", "to visit (for fun)"], ["đến đón", "to come and pick up"], ["phở", "phở (noodle soup)"], ["rồi", "then"], ["xem phim", "to see a movie"], ["hẹn", "see you (at an agreed time)"]],
          body: [
            { t: "n", s: "Tối thứ tư, chị Linh gọi điện cho Emma." },
            { t: "d", sp: "Chị Linh", s: "Emma ơi, thứ bảy này em có rảnh không? Chị mời em đến Raleigh chơi." },
            { t: "d", sp: "Emma", s: "Dạ, thứ bảy em làm việc ở thư viện từ chín giờ sáng đến một giờ chiều." },
            { t: "d", sp: "Chị Linh", s: "Sau một giờ em rảnh à?" },
            { t: "d", sp: "Emma", s: "Dạ, sau một giờ em rảnh ạ." },
            { t: "d", sp: "Chị Linh", s: "Vậy hai giờ chiều chị đến đón em nhé. Mình đi ăn phở, rồi đi xem phim lúc năm giờ." },
            { t: "d", sp: "Emma", s: "Hay quá! Trước hai giờ em về nhà và đợi chị." },
            { t: "d", sp: "Chị Linh", s: "Ừ. Hẹn em thứ bảy nhé!" },
          ],
          pairs: [["đến đón", "to come and pick up"], ["xem phim", "to see a movie"], ["trước", "before"], ["sau", "after"]],
          order: ["Chị Linh gọi điện cho Emma.", "Emma nói thứ bảy Emma làm việc ở thư viện.", "Chị Linh nói hai giờ chiều chị đến đón Emma.", "Emma nói trước hai giờ Emma về nhà."],
          fill: { text: "Thứ bảy Emma làm việc {0} chín giờ sáng {1} một giờ chiều. Chị Linh đến đón Emma {2} hai giờ chiều. Hai người đi xem phim lúc năm {3}.", answers: ["từ", "đến", "lúc", "giờ"], bank: ["từ", "đến", "lúc", "giờ", "vào", "tiếng"] } },

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
