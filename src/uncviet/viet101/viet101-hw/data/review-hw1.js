/* VIET 101 (UNC Viet) — Ôn tập (review week after Lesson 7) homework 1 of 3 (Monday): Ngày và giờ · Dates and time (Lessons 5–6)
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lessons 5–6. ≈ 50 minutes at home. No new grammar.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world continues from Bài 7 (l07-hw1..3, l07-reading). "Today" = Monday 16/11/2026.
   New this week: Emma’s family lives in Richmond, Virginia (about 3 hours by car); they invite Minh for Thanksgiving
   (Lễ Tạ ơn, Thursday 26/11). Emma’s father picks them up Wed 25/11 at 2 p.m.; back in Chapel Hill Sunday 29/11 ≈ 3:30 p.m.
   Jake flies in from Boston ($240 ticket). Minh goes home to Hà Nội in June (by plane, more than 20 hours).
   Class deck: _source/viet101/slides/VIET101-Review-C1-dates-time-slides.html.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {
window.BV_CHAPTER = {
  id: "5-7",
  titleVi: "Ôn tập thứ Hai · Ngày và giờ",
  titleEn: "Review homework, Monday: dates and time (Lessons 5–6)",
  description: "VIET 101 review week, homework 1: dates in Vietnamese order, big numbers and years, bao giờ / khi nào, telling the time, lúc / vào / từ … đến, bao lâu and giờ vs tiếng — vocabulary, grammar, spelling, speaking and a short story. About 50 minutes.",
  color: "#0369a1",
  badge: { icon: "🗓️", name: "Ôn tập · Ngày và giờ" },
  cando: [
    { vi: "Tôi có thể nói và viết thứ, ngày, tháng, năm.", en: "I can say and write the weekday, date, month and year." },
    { vi: "Tôi có thể hỏi “bao giờ / khi nào” về quá khứ và tương lai.", en: "I can ask “when?” about the past and the future." },
    { vi: "Tôi có thể nói giờ và dùng lúc, vào, từ … đến.", en: "I can tell the time and use lúc, vào, từ … đến." },
    { vi: "Tôi có thể hỏi và nói “mất bao lâu” với tiếng và phút.", en: "I can ask and say how long something takes, with tiếng and phút." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Ôn tập 1/3 · Bài 5–6 · khoảng 50 phút.", en: "Review homework 1 of 3 · Lessons 5–6 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>This week has no new grammar: we review the whole course before the final exam. Today is <strong>Lessons 5–6</strong> — dates, numbers and time. Work through the tabs in order; each card shows its time (⏱).</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Time and travel words from the story</td><td>6′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td>Dates, <em>bao giờ</em>, the clock, <em>lúc / vào</em>, <em>giờ / tiếng</em></td><td>15′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>Dates and big numbers in words · dictation</td><td>8′</td></tr>
            <tr><td>4️⃣ Nói</td><td>Shadow two lines, answer two questions</td><td>6′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Bạn có muốn đi Richmond không?</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lessons 5 and 6</strong> — the grammar notes on dates, <em>bao giờ / khi nào</em>, numbers from 100, telling the time and <em>bao lâu</em>.</p>
          <p><small>In this homework, <strong>today is Monday, November 16</strong>. Thanksgiving (<em>Lễ Tạ ơn</em>) is next week, and Emma has an invitation for Minh.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Từ cũ và vài từ mới cho câu chuyện hôm nay.", en: "Old words, plus a few new ones for today’s story." },
      blocks: [
        { type: "flashcards", id: "cards-time", strand: "language", mins: 6,
          title: { vi: "Thẻ từ · Ngày, giờ, đi lại", en: "Flashcards: dates, time, travel" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "Lễ Tạ ơn", en: "Thanksgiving", ex: "Lễ Tạ ơn là thứ năm, ngày hai mươi sáu tháng mười một.", exEn: "Thanksgiving is Thursday, November 26." },
            { vi: "tuần sau · tuần trước", en: "next week · last week", ex: "Thứ năm tuần sau là Lễ Tạ ơn.", exEn: "Thanksgiving is next Thursday." },
            { vi: "ngày mai · ngày kia", en: "tomorrow · the day after tomorrow", ex: "Ngày kia là thứ tư.", exEn: "The day after tomorrow is Wednesday." },
            { vi: "mời", en: "to invite", ex: "Gia đình Emma mời Minh ăn Lễ Tạ ơn.", exEn: "Emma’s family invites Minh for Thanksgiving." },
            { vi: "đón", en: "to pick (someone) up", ex: "Bố Emma đến đón lúc hai giờ chiều.", exEn: "Emma’s father comes to pick them up at 2 p.m." },
            { vi: "xe hơi · xe buýt · máy bay", en: "car · bus · airplane", ex: "Anh Jake đi máy bay từ Boston.", exEn: "Jake flies from Boston." },
            { vi: "mất + time", en: "it takes …", ex: "Đi xe hơi mất khoảng ba tiếng.", exEn: "It takes about three hours by car." },
            { vi: "khoảng", en: "about, around", ex: "khoảng ba giờ rưỡi chiều", exEn: "around 3:30 p.m." },
            { vi: "vé · đắt · rẻ", en: "ticket · expensive · cheap", ex: "Vé máy bay đắt quá!", exEn: "The plane ticket is so expensive!" },
            { vi: "tiếng · phút", en: "hour (how long) · minute", ex: "một tiếng rưỡi", exEn: "an hour and a half" },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Bài 5 và Bài 6 trong một trang — xem ví dụ, rồi luyện tập.", en: "Lessons 5 and 6 on one page — examples first, then practice." },
      blocks: [
        { type: "notice", id: "notice-review", strand: "language", mins: 4,
          title: { vi: "Ôn lại · Ngày và giờ", en: "Look again: dates and time" },
          examples: [
            { vi: "Hôm nay là <strong>thứ hai, ngày mười sáu tháng mười một</strong> năm 2026.", en: "Today is Monday, November 16, 2026." },
            { vi: "<strong>Bao giờ</strong> bạn về Richmond? — <strong>Thứ tư tuần sau</strong>.", en: "When will you go to Richmond? — Next Wednesday." },
            { vi: "Bạn đến Chapel Hill <strong>bao giờ</strong>? — <strong>Tháng tám năm ngoái</strong>.", en: "When did you come to Chapel Hill? — Last August." },
            { vi: "Bố Emma đến đón <strong>lúc</strong> hai giờ chiều. Đi xe hơi <strong>mất</strong> khoảng ba <strong>tiếng</strong>.", en: "Emma’s father picks them up at 2 p.m. The car ride takes about three hours." },
          ],
          q: "“Bạn về nhà bao giờ?” hỏi về …", qEn: "“Bạn về nhà bao giờ?” asks about …",
          opts: ["the past", "the future", "every day"], correct: "the past",
          why: { "the future": "For the future, bao giờ goes first: Bao giờ bạn về nhà?" },
          explain: "bao giờ / khi nào at the start = future · at the end = past.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>Date order</strong>: thứ → ngày → tháng → năm: <em>thứ năm, ngày hai mươi sáu tháng mười một</em> · written 26/11/2026 · <em>mồng / mùng</em> for the 1st–10th · April = <em>tháng tư</em> <button class="tts" data-say="thứ năm, ngày hai mươi sáu tháng mười một">🔊</button></td><td>dates</td></tr>
              <tr><td><strong>Big numbers</strong>: 105 <em>một trăm linh (lẻ) năm</em> · 240 <em>hai trăm bốn mươi</em> · 2026 <em>hai nghìn (ngàn) không trăm hai mươi sáu</em> <button class="tts" data-say="một trăm linh năm, hai trăm bốn mươi, hai nghìn không trăm hai mươi sáu">🔊</button></td><td>numbers from 100</td></tr>
              <tr><td><strong>bao giờ / khi nào</strong>: at the start = future, at the end = past.</td><td>when?</td></tr>
              <tr><td><strong>Time</strong>: <em>hai giờ</em> · <em>hai giờ rưỡi</em> · <em>ba giờ kém mười</em> (2:50) + <em>sáng / trưa / chiều / tối</em> · <em>Mấy giờ rồi?</em></td><td>telling the time</td></tr>
              <tr><td><strong>lúc</strong> + clock time · <strong>vào</strong> + day, date, month (often dropped) · <strong>từ … đến …</strong> · <strong>trước / sau</strong> + time or event</td><td>at, on, from … to</td></tr>
              <tr><td><strong>giờ</strong> = o’clock · <strong>tiếng</strong> = hours long · <strong>mất bao lâu?</strong> → <em>mất</em> + time · <strong>bao lâu rồi?</strong> → <em>ba tháng rồi</em> · <strong>có hay … không?</strong> = often?</td><td>how long, how often</td></tr>
            </table>` },

        { type: "mc", id: "dates-when", strand: "language", mins: 3,
          title: { vi: "Ngày tháng và bao giờ", en: "Dates and “when?”" },
          items: [
            { q: "Thanksgiving, Thursday 26/11:", opts: ["thứ năm, ngày hai mươi sáu tháng mười một", "tháng mười một, ngày hai mươi sáu, thứ năm", "ngày thứ năm hai mươi sáu mười một"], correct: "thứ năm, ngày hai mươi sáu tháng mười một" },
            { q: "Hôm nay là thứ hai. Ngày kia là …", opts: ["thứ tư", "thứ ba", "chủ nhật"], correct: "thứ tư", why: { "thứ ba": "Thứ ba is ngày mai (tomorrow). Ngày kia is two days from today." } },
            { q: "Ask when Minh will go back to Hà Nội:", opts: ["Bao giờ bạn về Hà Nội?", "Bạn về Hà Nội bao giờ?", "Bạn về Hà Nội bao lâu?"], correct: "Bao giờ bạn về Hà Nội?", why: { "Bạn về Hà Nội bao giờ?": "At the end, bao giờ asks about the past.", "Bạn về Hà Nội bao lâu?": "Bao lâu = how long, not when." } },
            { q: "Minh đến Mỹ ___? — Cách đây hai năm.", opts: ["bao giờ", "bao lâu", "mấy giờ"], correct: "bao giờ", why: { "bao lâu": "Bao lâu = how long. The answer “two years ago” tells you when.", "mấy giờ": "Mấy giờ asks for a clock time." }, explain: "Past → bao giờ at the end." },
            { q: "2027:", opts: ["hai nghìn không trăm hai mươi bảy", "hai nghìn hai mươi bảy", "hai mươi hai mươi bảy"], correct: "hai nghìn không trăm hai mươi bảy" },
            { q: "Sinh nhật mình là ___ (April 12).", opts: ["ngày mười hai tháng tư", "ngày mười hai tháng bốn", "tháng tư ngày mười hai"], correct: "ngày mười hai tháng tư", why: { "ngày mười hai tháng bốn": "April is tháng tư." } },
          ] },

        { type: "clockread", id: "clock", strand: "fluency", mins: 3,
          title: { vi: "Đọc đồng hồ", en: "Read the clock" },
          instr: { vi: "Viết giờ bằng tiếng Việt.", en: "Type the time in Vietnamese." },
          items: [ { h: 2, m: 0 }, { h: 3, m: 30 }, { h: 9, m: 45 } ] },

        { type: "mc", id: "luc-vao", strand: "language", mins: 3,
          title: { vi: "Lúc, vào, giờ hay tiếng?", en: "lúc, vào, giờ or tiếng?" },
          items: [
            { q: "Bố Emma đến đón ___ hai giờ chiều.", opts: ["lúc", "vào", "mất"], correct: "lúc", why: { "vào": "Vào goes with days, dates and months; clock time takes lúc." } },
            { q: "Emma về Richmond ___ thứ tư.", opts: ["vào", "lúc", "từ"], correct: "vào" },
            { q: "Đi xe hơi đến Richmond mất khoảng ba ___.", opts: ["tiếng", "giờ", "phút rưỡi"], correct: "tiếng", why: { "giờ": "Giờ is clock time (o’clock). For how long, say tiếng." } },
            { q: "Emma có lớp tiếng Việt ___ mười giờ mười ___ mười một giờ.", opts: ["từ … đến", "lúc … vào", "trước … sau"], correct: "từ … đến" },
            { q: "Minh: “Mình không ___ đi xe buýt.” (I don’t often …)", opts: ["hay", "hay quá", "bao lâu"], correct: "hay" },
          ] },

        { type: "builder", id: "build", strand: "language", mins: 2,
          title: { vi: "Xếp câu", en: "Build the sentence" },
          items: [
            { en: "When will you go back to Richmond?", tiles: ["Bao giờ", "bạn", "về", "Richmond?"], answer: "Bao giờ bạn về Richmond?" },
            { en: "How long does it take by car?", tiles: ["Đi", "xe hơi", "mất", "bao lâu?"], answer: "Đi xe hơi mất bao lâu?" },
            { en: "Emma’s father comes to pick her up at two in the afternoon.", tiles: ["Bố Emma", "đến đón", "lúc", "hai giờ", "chiều."], answer: "Bố Emma đến đón lúc hai giờ chiều." },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Viết số bằng chữ — mười hay mươi? một hay mốt?", en: "Numbers in words — mười or mươi? một or mốt?" },
      blocks: [
        { type: "type", id: "words", strand: "language", mins: 4,
          title: { vi: "Viết bằng chữ", en: "Write it in words" },
          instr: { vi: "Viết ngày và số bằng chữ (không dùng chữ số). Bạn có thể gõ Telex.", en: "Write the date or number in words (no digits). Telex works: muwowif → mười." },
          items: [
            { prompt: "16/11", telex: true, words: true, answers: ["ngày mười sáu tháng mười một", "mười sáu tháng mười một"] },
            { prompt: "1/12 (December 1)", telex: true, words: true, answers: ["ngày mồng một tháng mười hai", "ngày mùng một tháng mười hai", "ngày một tháng mười hai", "mồng một tháng mười hai", "mùng một tháng mười hai"] },
            { prompt: "240 (đô)", telex: true, words: true, answers: ["hai trăm bốn mươi đô", "hai trăm bốn mươi"] },
            { prompt: "2027 (năm)", telex: true, words: true, answers: ["năm hai nghìn không trăm hai mươi bảy", "hai nghìn không trăm hai mươi bảy", "năm hai ngàn không trăm hai mươi bảy", "hai ngàn không trăm hai mươi bảy"] },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: tieengs → tiếng.", en: "Tap Listen, then type. Telex works: tieengs → tiếng." },
          items: [
            { say: "thứ năm tuần sau", telex: true, answers: ["thứ năm tuần sau"] },
            { say: "lúc hai giờ chiều", telex: true, answers: ["lúc hai giờ chiều"] },
            { say: "mất khoảng ba tiếng", telex: true, answers: ["mất khoảng ba tiếng"] },
            { say: "một trăm linh năm", telex: true, words: true, answers: ["một trăm linh năm", "một trăm lẻ năm"] },
          ] },
      ],
    },

    /* ═══════════════ NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Nói",
      intro: { vi: "Nói theo hai câu mẫu, rồi trả lời hai câu hỏi về bạn.", en: "Shadow two model lines, then answer two questions about you." },
      blocks: [
        { type: "record", id: "voice", strand: "output", mins: 6,
          title: { vi: "Nói · Ngày và giờ của bạn", en: "Speak: your dates and times" },
          instr: { vi: "Câu 1–2: nghe rồi nói theo. Câu 3–4: nghe câu hỏi, rồi trả lời bằng 2–3 câu đầy đủ.", en: "1–2: listen, then repeat. 3–4: listen to the question, then answer in 2–3 full sentences." },
          prompts: [
            { vi: "Thứ năm tuần sau là Lễ Tạ ơn.", en: "Next Thursday is Thanksgiving." },
            { vi: "Từ Chapel Hill đến Richmond mất khoảng ba tiếng.", en: "It takes about three hours from Chapel Hill to Richmond." },
            { vi: "Sinh nhật của bạn là ngày nào? Bạn sinh năm nào?", en: "When is your birthday? What year were you born?", model: false, maxSec: 40 },
            { vi: "Thứ hai bạn thường làm gì? Từ mấy giờ đến mấy giờ?", en: "What do you usually do on Mondays? From when to when?", model: false, maxSec: 45 },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st-r1", strand: "input", emoji: "🦃", level: "Cấp 1", mins: 8,
          titleVi: "Bạn có muốn đi Richmond không?", titleEn: "Do you want to come to Richmond?",
          gloss: [["Lễ Tạ ơn", "Thanksgiving"], ["mời", "to invite"], ["đón", "to pick up"], ["máy bay", "airplane"], ["hơn", "more than"], ["vé", "ticket"], ["đắt", "expensive"], ["về đến", "to arrive back at"]],
          body: [
            { t: "n", s: "Thứ hai, ngày mười sáu tháng mười một, Emma và Minh ăn trưa ở nhà ăn." },
            { t: "d", sp: "Emma", s: "Minh ơi, thứ năm tuần sau là Lễ Tạ ơn. Bạn có về Hà Nội không?" },
            { t: "d", sp: "Minh", s: "Không. Hà Nội xa lắm! Đi máy bay mất hơn hai mươi tiếng. Tháng sáu mình mới về." },
            { t: "d", sp: "Emma", s: "Thế bạn có muốn đi Richmond với mình không? Gia đình mình mời bạn ăn Lễ Tạ ơn." },
            { t: "d", sp: "Minh", s: "Ôi, cảm ơn bạn! Mình rất muốn đi. Bao giờ bạn về?" },
            { t: "d", sp: "Emma", s: "Thứ tư, ngày hai mươi lăm. Bố mình đến đón lúc hai giờ chiều." },
            { t: "d", sp: "Minh", s: "Từ đây đến Richmond có xa không?" },
            { t: "d", sp: "Emma", s: "Không xa lắm. Đi xe hơi mất khoảng ba tiếng." },
            { t: "d", sp: "Minh", s: "Còn anh Jake? Anh ấy cũng về à?" },
            { t: "d", sp: "Emma", s: "Ừ. Anh ấy đi máy bay từ Boston. Vé máy bay hai trăm bốn mươi đô!" },
            { t: "d", sp: "Minh", s: "Đắt quá! Thế bao giờ chúng mình về Chapel Hill?" },
            { t: "d", sp: "Emma", s: "Chủ nhật, ngày hai mươi chín. Chúng mình về đến Chapel Hill khoảng ba giờ rưỡi chiều." },
          ],
          pairs: [["mời", "to invite"], ["đón", "to pick up"], ["vé", "ticket"], ["đắt", "expensive"]],
          order: ["Emma hỏi Minh có về Hà Nội không.", "Emma mời Minh đi Richmond.", "Emma nói bố Emma đến đón lúc hai giờ chiều.", "Emma nói về vé máy bay của anh Jake."],
          fill: { text: "Lễ Tạ ơn là thứ {0}, ngày hai mươi sáu. Đi xe hơi đến Richmond mất khoảng ba {1}. Bố Emma đến đón {2} hai giờ chiều. Vé máy bay của anh Jake là hai {3} bốn mươi đô.", answers: ["năm", "tiếng", "lúc", "trăm"], bank: ["năm", "tiếng", "lúc", "trăm", "giờ", "vào", "nghìn"] } },

        { type: "readaloud", id: "read-aloud", story: "st-r1", strand: "fluency", mins: 4,
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
