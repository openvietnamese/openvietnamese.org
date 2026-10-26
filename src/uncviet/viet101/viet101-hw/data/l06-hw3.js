/* VIET 101 (UNC Viet) — Bài 6 homework 3 of 3 (Friday): Bao lâu? · How long, how often, is it far?
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lesson 6. ≈ 50 minutes at home.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world: see l05-hw1.js / l06-hw2.js (Saturday trip to Raleigh with chị Linh). "Today" = Friday 6/11/2026.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: 6,
  titleVi: "Bài tập thứ Sáu · Bao lâu?",
  titleEn: "Friday homework: how long, how often, is it far?",
  description: "VIET 101, Lesson 6 homework 3: bao lâu (rồi), giờ vs tiếng, mất + time, hay (often), có … không with adjectives, and a Lesson 6 review — vocabulary, grammar, spelling, writing, speaking and a short story. About 50 minutes.",
  color: "#c2410c",
  badge: { icon: "⏳", name: "Bao lâu? · Time keeper" },

  cando: [
    { vi: "Tôi có thể hỏi và trả lời “… mất bao lâu?” và “… bao lâu rồi?”.", en: "I can ask and answer “How long does … take?” and “How long have you …?”" },
    { vi: "Tôi biết khi nào dùng giờ và khi nào dùng tiếng.", en: "I know when to use giờ (clock time) and tiếng (hours of duration)." },
    { vi: "Tôi có thể hỏi “… có xa không?”, “… có hay … không?” và viết về một ngày của tôi.", en: "I can ask “Is … far?”, “Do you often …?” and write about my day." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập về nhà 3/3 · Bài 6 · khoảng 50 phút.", en: "Homework 3 of 3 · Lesson 6 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Work through the tabs in order. Each card shows its time (⏱). Your progress is saved in this browser.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>How long, how often, near / far</td><td>6′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td><em>giờ</em> or <em>tiếng</em>? · <em>bao lâu</em> · <em>hay</em> · Lesson 6 review</td><td>14′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>tiếng, lâu, muộn · dictation</td><td>6′</td></tr>
            <tr><td>4️⃣ Viết & nói</td><td>Write about your day, then record it</td><td>11′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Từ Chapel Hill đến Raleigh</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings and writing) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lesson 6</strong> — the notes on <em>bao lâu</em>, <em>có … không</em> with adjectives, and <em>hay</em> (often).</p>
          <p><small>In this homework, <strong>today is Friday, November 6</strong>. Tomorrow Emma visits chị Linh in Raleigh!</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Học cả cụm từ — dùng được ngay!", en: "Learn whole phrases — ready to use!" },
      blocks: [
        { type: "flashcards", id: "cards-long", strand: "language", mins: 6,
          title: { vi: "Thẻ từ · Bao lâu?", en: "Flashcards: how long?" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "bao lâu?", en: "how long?", ex: "Bạn học bao lâu?", exEn: "How long do you study?" },
            { vi: "… mất bao lâu?", en: "How long does … take?", ex: "Đi xe buýt mất bao lâu?", exEn: "How long does the bus take?" },
            { vi: "… bao lâu rồi?", en: "How long have you … (so far)?", ex: "Bạn học tiếng Việt bao lâu rồi?", exEn: "How long have you been learning Vietnamese?" },
            { vi: "tiếng", en: "hour (of duration)", ex: "mất hai tiếng", exEn: "takes two hours" },
            { vi: "nửa tiếng", en: "half an hour", ex: "Mình đợi nửa tiếng rồi!", exEn: "I’ve waited half an hour!" },
            { vi: "khoảng", en: "about, approximately", ex: "khoảng bốn mươi phút", exEn: "about forty minutes" },
            { vi: "hay", en: "often", ex: "Chị không hay đi xe buýt.", exEn: "I don’t often take the bus." },
            { vi: "xa", en: "far", ex: "Raleigh có xa không?", exEn: "Is Raleigh far?" },
            { vi: "gần", en: "near, close", ex: "Thư viện rất gần.", exEn: "The library is very close." },
            { vi: "xe hơi", en: "car", ex: "đi xe hơi", exEn: "go by car" },
            { vi: "xe buýt", en: "bus", ex: "đi xe buýt", exEn: "take the bus" },
            { vi: "sớm", en: "early", ex: "Hôm nay Emma dậy sớm.", exEn: "Emma got up early today." },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "“Hai giờ” hay “hai tiếng”? Xem ví dụ trước, rồi tìm quy luật.", en: "“Hai giờ” or “hai tiếng”? Examples first, then the rule." },
      blocks: [
        { type: "notice", id: "notice-long", strand: "language", mins: 4,
          title: { vi: "Khám phá · Giờ hay tiếng?", en: "Discover: giờ or tiếng?" },
          examples: [
            { vi: "Phim bắt đầu lúc <strong>năm giờ</strong>.", en: "The movie starts at five o’clock." },
            { vi: "Phim dài <strong>hai tiếng</strong>.", en: "The movie is two hours long." },
            { vi: "Đi xe hơi đến Raleigh mất <strong>bốn mươi phút</strong>.", en: "It takes forty minutes to drive to Raleigh." },
            { vi: "Đi xe buýt mất <strong>một tiếng rưỡi</strong>.", en: "The bus takes an hour and a half." },
          ],
          q: "Từ nào nói thời gian bao lâu (một khoảng thời gian), không phải giờ trên đồng hồ?", qEn: "Which word gives a length of time (duration), not a time on the clock?",
          opts: ["tiếng", "giờ"], correct: "tiếng",
          why: { "giờ": "Năm giờ is a point on the clock (5:00). Look at hai tiếng, một tiếng rưỡi — those are lengths of time." },
          explain: "giờ = o’clock (a point in time) · tiếng = hours of duration.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>giờ</strong> = clock time: <em>lúc hai giờ</em> (at 2:00) · <strong>tiếng</strong> = hours of duration: <em>hai tiếng</em> (two hours). In the South, <em>hai giờ</em> can also mean “two hours” — context tells you which. <button class="tts" data-say="lúc hai giờ, hai tiếng">🔊</button></td><td>o’clock / hours</td></tr>
              <tr><td><strong>… mất + time</strong>: <em>Đi xe buýt mất một tiếng rưỡi.</em> · question: <em>… mất bao lâu?</em> <button class="tts" data-say="Đi xe buýt mất bao lâu?">🔊</button></td><td>it takes …</td></tr>
              <tr><td><strong>… bao lâu rồi?</strong> = how long so far: <em>Bạn học tiếng Việt bao lâu rồi? — Ba tháng rồi.</em> <button class="tts" data-say="Bạn học tiếng Việt bao lâu rồi? Ba tháng rồi.">🔊</button></td><td>how long (already)?</td></tr>
              <tr><td><strong>có + adjective + không?</strong>: <em>Raleigh có xa không? — Không xa lắm.</em> · <em>Phở có ngon không? — Ngon lắm!</em></td><td>Is it …?</td></tr>
              <tr><td><strong>hay + verb</strong> = often: <em>Bạn có hay đến muộn không? — Không, mình không hay đến muộn.</em> (Not the <em>hay</em> = “or”, or <em>hay quá!</em> = “great!”)</td><td>often</td></tr>
            </table>` },

        { type: "mc", id: "gio-tieng", strand: "language", mins: 4,
          title: { vi: "Giờ hay tiếng? Hỏi cho đúng", en: "Giờ or tiếng? Ask the right way" },
          items: [
            { q: "Emma học ở thư viện từ một giờ đến ba giờ. Emma học hai ___.", opts: ["tiếng", "giờ đúng", "lúc"], correct: "tiếng", explain: "Two hours of duration → hai tiếng." },
            { q: "Phim bắt đầu lúc năm ___.", opts: ["giờ", "tiếng", "bao lâu"], correct: "giờ" },
            { q: "Trả lời: “Khoảng bốn mươi phút.” — Câu hỏi?", opts: ["Đi xe hơi đến Raleigh mất bao lâu?", "Mấy giờ bạn đi Raleigh?", "Bạn có hay đi Raleigh không?"], correct: "Đi xe hơi đến Raleigh mất bao lâu?" },
            { q: "Trả lời: “Ba tháng rồi.” — Câu hỏi?", opts: ["Bạn học tiếng Việt bao lâu rồi?", "Bạn học tiếng Việt lúc mấy giờ?", "Bao giờ bạn học tiếng Việt?"], correct: "Bạn học tiếng Việt bao lâu rồi?", why: { "Bao giờ bạn học tiếng Việt?": "Bao giờ asks when, not how long." } },
          ] },

        { type: "mc", id: "hay-adj", strand: "language", mins: 3,
          title: { vi: "Hay và có … không", en: "hay (often) and có … không" },
          items: [
            { q: "“Bạn có ___ đến muộn không?” — “Không, mình không hay đến muộn.”", opts: ["hay", "lâu", "xa"], correct: "hay" },
            { q: "“Raleigh có xa không?” — “___, đi xe hơi chỉ mất bốn mươi phút.”", opts: ["Không xa lắm", "Có, xa lắm", "Hay lắm"], correct: "Không xa lắm", why: { "Có, xa lắm": "Forty minutes by car isn’t very far!" } },
            { q: "Câu nào hỏi “Is the phở good?”", opts: ["Phở có ngon không?", "Phở có hay không?", "Phở ngon bao lâu?"], correct: "Phở có ngon không?" },
          ] },

        { type: "clockread", id: "review-clock", strand: "fluency", mins: 3,
          title: { vi: "Ôn tập · Đọc đồng hồ", en: "Review: read the clock" },
          instr: { vi: "Viết giờ bằng tiếng Việt.", en: "Type the time in Vietnamese." },
          items: [ { h: 2, m: 0 }, { h: 3, m: 30 }, { h: 4, m: 50 } ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Tiếng hay tiến? Lâu hay lầu? Nghe kỹ nhé!", en: "Tiếng or tiến? Listen closely!" },
      blocks: [
        { type: "mc", id: "look-alike", strand: "language", mins: 2,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "tiếng", q: "", opts: ["tiếng", "tiến", "tiêng"], correct: "tiếng", explain: "Final -ng and a rising tone: tiếng (hour; language)." },
            { say: "lâu", q: "", opts: ["lâu", "lầu", "lau"], correct: "lâu", explain: "lâu (level) = long (time) · lầu = upstairs floor · lau = to wipe." },
            { say: "muộn", q: "", opts: ["muộn", "muốn", "muôn"], correct: "muộn", explain: "muộn (heavy) = late · muốn (rising) = to want!" },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: tieengs → tiếng, laau → lâu.", en: "Tap Listen, then type. Telex works: tieengs → tiếng, laau → lâu." },
          items: [
            { say: "mất bao lâu", telex: true, answers: ["mất bao lâu"] },
            { say: "một tiếng rưỡi", telex: true, answers: ["một tiếng rưỡi"] },
            { say: "nửa tiếng", telex: true, answers: ["nửa tiếng"] },
            { say: "bạn có hay đến muộn không", telex: true, answers: ["bạn có hay đến muộn không"], show: "Bạn có hay đến muộn không?" },
          ] },
      ],
    },

    /* ═══════════════ VIẾT & NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Viết & nói",
      intro: { vi: "Viết về một ngày của bạn, rồi đọc to và ghi âm.", en: "Write about your day, then read it aloud and record it." },
      blocks: [
        { type: "writing", id: "my-day", strand: "output", mins: 7,
          title: { vi: "Viết · Một ngày của tôi", en: "Write: my day" },
          prompt: { vi: "Viết 5–6 câu về một ngày thường của bạn: bạn dậy lúc mấy giờ, học / làm việc từ mấy giờ đến mấy giờ, đi đến trường mất bao lâu, bạn có hay … không.", en: "Write 5–6 sentences about a typical day: when you get up, when you study or work (from … to …), how long it takes to get to campus, something you often (or don’t often) do." },
          minWords: 30,
          checklist: [
            { vi: "lúc + giờ", en: "lúc + a clock time" },
            { vi: "từ … đến …", en: "from … to …" },
            { vi: "mất + bao lâu (phút / tiếng)", en: "how long something takes (phút / tiếng)" },
            { vi: "hay hoặc không hay + động từ", en: "hay (often) or không hay + verb" },
          ] },

        { type: "record", id: "voice", strand: "output", mins: 4,
          title: { vi: "Nói · Một ngày của tôi", en: "Speak: my day" },
          instr: { vi: "Nói theo hai câu mẫu, rồi đọc to bài viết của bạn.", en: "Shadow the two model lines, then read your writing aloud." },
          prompts: [
            { vi: "Đi xe buýt đến trường mất khoảng hai mươi phút.", en: "The bus to campus takes about twenty minutes." },
            { vi: "Mình không hay đến muộn.", en: "I’m not often late." },
            { vi: "Một ngày của tôi", en: "My day (read your text above)", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st3", strand: "input", emoji: "🚗", level: "Cấp 1", mins: 8,
          titleVi: "Từ Chapel Hill đến Raleigh", titleEn: "From Chapel Hill to Raleigh",
          gloss: [["đến đón", "to come and pick up"], ["khoảng", "about"], ["đường", "road"], ["đông", "crowded, busy"], ["như", "like, the same as"], ["đói", "hungry"]],
          body: [
            { t: "n", s: "Thứ bảy, hai giờ chiều, chị Linh đến đón Emma." },
            { t: "d", sp: "Emma", s: "Chị ơi, từ đây đến Raleigh có xa không ạ?" },
            { t: "d", sp: "Chị Linh", s: "Không xa lắm. Đi xe hơi mất khoảng bốn mươi phút." },
            { t: "d", sp: "Emma", s: "Còn đi xe buýt thì mất bao lâu ạ?" },
            { t: "d", sp: "Chị Linh", s: "Khoảng một tiếng rưỡi. Chị không hay đi xe buýt." },
            { t: "n", s: "Nhưng hôm nay đường rất đông. Hai người đến Raleigh lúc ba giờ rưỡi." },
            { t: "d", sp: "Emma", s: "Ôi, mất một tiếng rưỡi! Như đi xe buýt!" },
            { t: "d", sp: "Chị Linh", s: "Ừ! Thôi, mình đi ăn phở nhé. Em có đói không?" },
            { t: "d", sp: "Emma", s: "Dạ, em đói lắm ạ!" },
          ],
          pairs: [["xe hơi", "car"], ["mất", "to take (time)"], ["đông", "crowded, busy"], ["đói", "hungry"]],
          order: ["Chị Linh đến đón Emma lúc hai giờ.", "Emma hỏi Raleigh có xa không.", "Chị Linh nói đi xe hơi mất bốn mươi phút.", "Hai người đến Raleigh lúc ba giờ rưỡi."],
          fill: { text: "Đi xe hơi đến Raleigh {0} khoảng bốn mươi phút. Đi xe buýt mất một {1} rưỡi. Hôm nay đường rất {2}, nên hai người đến Raleigh lúc ba giờ {3}.", answers: ["mất", "tiếng", "đông", "rưỡi"], bank: ["mất", "tiếng", "đông", "rưỡi", "giờ", "xa"] } },

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
