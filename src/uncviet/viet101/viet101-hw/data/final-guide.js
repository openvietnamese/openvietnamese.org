/* VIET 101 (UNC Viet) — Ôn thi cuối kỳ · Final exam study guide and practice, Lessons 1–7
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lessons 1–7:
     Bài 1–4 (see midterm-guide.js): greetings, là / có … không / có phải là … không, gì / nào / ở đâu, classifiers,
       rất / lắm / quá, cũng, và / còn, các / những, hay “or”, thế nào, numbers to 99, mấy / bao nhiêu, address terms, thưa / ạ
     Bài 5 thứ, ngày, tháng, năm · numbers from 100 · bao giờ / khi nào (start = future, end = past) · có / ừ / vâng / dạ
     Bài 6 telling the time (rưỡi, kém, sáng / trưa / chiều / tối) · lúc, vào, từ … đến, trước, sau · bao lâu, mất, giờ vs tiếng, hay (often)
     Bài 7 family · age (bao nhiêu tuổi / mấy tuổi, no là) · đã, đang, sẽ, sắp, vừa / mới · … chưa? — rồi / chưa · vẫn / còn · cách đây · tốt nghiệp
   Exam format ASSUMED to match the midterm (written A15 B40 C20 D25 + speaking 30) — edit the overview table if the final differs.
   All sentences, drills, the dialogue and the reading are original (Huy Phung); no textbook text or audio is reproduced.
   Story world as in the homework: Emma, Minh, chị Linh, anh Nam, Sofia, Emma’s family in Richmond (review-hw1..3).
   The reading tells Thanksgiving (25–29/11/2026) in the past, from Minh’s point of view.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: "1-7",
  titleVi: "Ôn thi cuối kỳ · Bài 1–7",
  titleEn: "Final exam study guide and practice: Lessons 1–7",
  description: "VIET 101 final exam review for Lessons 1–7: greetings, nationality, classifiers, numbers, address terms, dates, time, the family and đã / đang / sẽ — vocabulary, grammar, listening, speaking, reading and writing practice in the format of the exam. About 90 minutes; do it in two sittings.",
  color: "#13294B",
  badge: { icon: "🎓", name: "Sẵn sàng thi cuối kỳ · Final ready" },

  cando: [
    { vi: "Tôi có thể chào hỏi, giới thiệu mình và người khác, và xưng hô đúng.", en: "I can greet people, introduce myself and others, and use the right address terms." },
    { vi: "Tôi có thể đặt câu hỏi với ai, gì, nào, ở đâu, thế nào, mấy, bao nhiêu, bao giờ, bao lâu, chưa.", en: "I can ask questions with ai, gì, nào, ở đâu, thế nào, mấy, bao nhiêu, bao giờ, bao lâu and chưa." },
    { vi: "Tôi có thể nghe, nói và viết số, ngày tháng và giờ.", en: "I can understand, say and write numbers, dates and clock times." },
    { vi: "Tôi có thể nói về một ngày của tôi: lúc mấy giờ, từ … đến, mất bao lâu.", en: "I can talk about my day: at what time, from … to, how long it takes." },
    { vi: "Tôi có thể nói về gia đình tôi: ai, bao nhiêu tuổi, làm gì.", en: "I can talk about my family: who, how old, what they do." },
    { vi: "Tôi có thể nói về quá khứ, hiện tại và tương lai với đã, đang, sẽ, sắp, vừa, chưa.", en: "I can talk about past, present and future with đã, đang, sẽ, sắp, vừa and chưa." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Ôn thi cuối kỳ · Bài 1–7 · khoảng 90 phút (nên làm hai lần).", en: "Final review · Lessons 1–7 · about 90 minutes (best in two sittings)." },
      blocks: [
        { type: "html", title: { vi: "Bài thi cuối kỳ có gì?", en: "What’s on the final?" }, html: `
          <p>The VIET 101 final covers <strong>Lessons 1–7</strong> of <em>Elementary Vietnamese</em> (Ngô Như Bình), with more weight on <strong>Lessons 5–7</strong> (after the midterm). It has two parts:</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn làm gì · What you do</th><th>Điểm · Points</th></tr>
            <tr><td>✍️ <strong>Bài thi viết</strong> · Written exam (50 min)</td><td>A. Nghe — numbers, dates, clock times and a short phone call<br>B. Từ vựng &amp; ngữ pháp — question words, classifiers, <em>rất / lắm / quá</em>, <em>lúc / vào</em>, <em>giờ / tiếng</em>, <em>đã / đang / sẽ</em>, <em>chưa</em>, address terms<br>C. Đọc — a short text about a person and their family, true / false and questions<br>D. Viết — questions and negatives, a date or time in words, a short paragraph</td><td>15<br>40<br><br>20<br>25</td></tr>
            <tr><td>🎙️ <strong>Bài thi nói</strong> · Speaking exam (≈ 10 min)</td><td>Spoken questions on the computer, like the midterm: warm-up, you, your day, your family, past and future, a polite role play, wind-down. Each question plays once.</td><td>30</td></tr>
          </table></div>
          <p><strong>How to use this guide:</strong> sitting 1 = tabs 1️⃣–4️⃣ (one per lesson group, ≈ 45′); sitting 2 = 🎧 listening, 5️⃣ speaking and writing, 6️⃣ reading (≈ 40′). If a tab is hard, go back to that week’s homework.</p>
          <p><small>Your teacher will confirm the exam date, room and points.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ BÀI 1–4 ═══════════════ */
    {
      id: "l1-4", icon: "1️⃣", label: "Bài 1–4",
      intro: { vi: "Bài 1–4 · Chào hỏi, làm quen, ngôn ngữ, xưng hô — ôn nhanh.", en: "Lessons 1–4 · greetings, getting acquainted, languages, address terms — a quick review." },
      blocks: [
        { type: "notice", id: "notice-l14", strand: "language", mins: 4,
          title: { vi: "Ôn lại · Bài 1–4 trong một bảng", en: "Look again: Lessons 1–4 in one table" },
          examples: [
            { vi: "Sofia <strong>có phải là</strong> sinh viên <strong>không</strong>? — Vâng, Sofia là sinh viên.", en: "Is Sofia a student? — Yes." },
            { vi: "Tiếng Việt <strong>có</strong> khó <strong>không</strong>? — Khó <strong>lắm</strong>, nhưng mình <strong>rất</strong> thích.", en: "Is Vietnamese hard? — Very, but I really like it." },
            { vi: "Sofia mua hai <strong>quyển</strong> sách và ba <strong>tờ</strong> báo.", en: "Sofia buys two books and three newspapers." },
            { vi: "<strong>Thưa bà</strong>, <strong>cháu</strong> là Minh <strong>ạ</strong>.", en: "Ma’am (to a grandmother), I’m Minh." },
          ],
          q: "Which question is right for “Is Minh an engineer?”", qEn: "Which question is right?",
          opts: ["Minh có phải là kỹ sư không?", "Minh có kỹ sư không?", "Minh là kỹ sư không?"], correct: "Minh có phải là kỹ sư không?",
          why: { "Minh có kỹ sư không?": "That means “Does Minh have engineers?”", "Minh là kỹ sư không?": "With là + noun, ask có phải là … không?" },
          explain: "là + noun → có phải là … không? · adjective / verb → có … không?",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>Questions</strong>: <em>có … không?</em> (verb, adjective) · <em>có phải là … không?</em> (là + noun) · <em>…, phải không?</em> (checking) · <em>… à?</em> (almost sure) · <em>A hay B?</em> (or)</td><td>yes / no, or</td></tr>
              <tr><td><strong>Question words</strong>: <em>ai</em> who · <em>gì</em> what · <em>nào</em> which (keep the classifier: <em>quyển nào</em>) · <em>ở đâu</em> where (at the end) · <em>thế nào</em> how</td><td>wh-</td></tr>
              <tr><td><strong>No là before adjectives</strong>: <em>Tôi khoẻ.</em> · adjective after the noun: <em>nhà đẹp</em> · <strong>rất</strong> + adj · adj + <strong>lắm</strong> / <strong>quá</strong> · <em>không … lắm</em></td><td>adjectives</td></tr>
              <tr><td><strong>cũng</strong> before the verb · <strong>và</strong> lists · <strong>còn</strong> switches the topic · <strong>các</strong> all of / before pronouns · <strong>những</strong> some</td><td>small words</td></tr>
              <tr><td><strong>Classifiers</strong>: number + classifier + noun + <em>này / kia / ấy</em>: <em>quyển</em> books · <em>tờ</em> paper · <em>con</em> animals · <em>quả</em> fruit · <em>cái / chiếc</em> things · <em>toà</em> buildings</td><td>classifiers</td></tr>
              <tr><td><strong>Numbers</strong>: <em>mười</em> 10 · <em>hai mươi</em> 20 · <em>mốt</em> 21 · <em>tư</em> 24 · <em>lăm</em> 15, 25 · <strong>mấy</strong> (under 10) / <strong>bao nhiêu</strong> (10+) · <em>thứ nhất, thứ hai, thứ tư</em></td><td>numbers</td></tr>
              <tr><td><strong>Address</strong>: <em>bác / bà / cô / chú ↔ cháu</em> · <em>anh / chị ↔ em</em> · <em>bạn ↔ mình</em> · <em>thưa</em> … <em>ạ</em> to elders · <em>nó</em> never for adults · <em>chúng tôi</em> (not you) / <em>chúng ta</em> (you too)</td><td>xưng hô</td></tr>
            </table>` },

        { type: "mc", id: "l14-mc", strand: "language", mins: 5,
          title: { vi: "Chọn câu đúng", en: "Choose the correct answer" },
          items: [
            { q: "“I’m fine, thanks.”", opts: ["Cảm ơn bạn, mình khoẻ.", "Cảm ơn bạn, mình là khoẻ.", "Cảm ơn bạn, mình có khoẻ."], correct: "Cảm ơn bạn, mình khoẻ.", why: { "Cảm ơn bạn, mình là khoẻ.": "No là before an adjective." } },
            { q: "Bạn thích quyển sách ___? — Quyển màu xanh kia.", opts: ["nào", "gì", "ai"], correct: "nào" },
            { q: "Tiếng Nhật có khó ___ không?", opts: ["lắm", "rất", "quá"], correct: "lắm", why: { "rất": "In có … không questions use lắm." } },
            { q: "Tôi là sinh viên. ___ chị, chị làm gì?", opts: ["Còn", "Và", "Cũng"], correct: "Còn" },
            { q: "Sofia mua ba ___ cam.", opts: ["quả", "con", "tờ"], correct: "quả" },
            { q: "Bạn học ___ môn? — Bốn môn.", opts: ["mấy", "bao nhiêu", "nào"], correct: "mấy" },
            { q: "A student to a male teacher: “___ thầy, em không hiểu ạ.”", opts: ["Thưa", "Ạ", "Này"], correct: "Thưa" },
            { q: "Minh about his sister: “___ là kỹ sư.”", opts: ["Chị ấy", "Nó", "Họ"], correct: "Chị ấy", why: { "Nó": "Nó is rude for an adult.", "Họ": "Họ = they." } },
          ] },

        { type: "type", id: "l14-num", strand: "language", mins: 3,
          title: { vi: "Nghe và viết số bằng chữ", en: "Listen and write the number in words" },
          instr: { vi: "Bấm “Nghe”, rồi viết số bằng chữ (không dùng chữ số).", en: "Tap Listen, then write the number in words (no digits). Telex works: muwowif → mười." },
          items: [
            { say: "mười lăm", telex: true, words: true, answers: ["mười lăm"] },
            { say: "hai mươi mốt", telex: true, words: true, answers: ["hai mươi mốt"] },
            { say: "tám mươi tư", telex: true, words: true, answers: ["tám mươi tư", "tám mươi bốn"] },
          ] },
      ],
    },

    /* ═══════════════ BÀI 5 ═══════════════ */
    {
      id: "l5", icon: "2️⃣", label: "Bài 5",
      intro: { vi: "Bài 5 · Thứ, ngày, tháng, năm · số từ 100 · bao giờ / khi nào · có / ừ / vâng / dạ.", en: "Lesson 5 · weekdays, dates, years · numbers from 100 · when? · yes words." },
      blocks: [
        { type: "html", title: { vi: "Nhớ nhanh · Bài 5", en: "Quick reminder: Lesson 5" }, strand: "language", mins: 2, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><td>Date order</td><td><em>thứ sáu, ngày mồng bốn tháng mười hai năm 2026</em> · 4/12/2026 · April = <em>tháng tư</em></td><td><button class="tts" data-say="thứ sáu, ngày mồng bốn tháng mười hai năm hai nghìn không trăm hai mươi sáu">🔊</button></td></tr>
            <tr><td>Big numbers</td><td><em>một trăm linh năm</em> (lẻ) · <em>hai nghìn</em> (ngàn) · 2006 = <em>hai nghìn không trăm linh sáu</em></td><td><button class="tts" data-say="một trăm linh năm, hai nghìn không trăm linh sáu">🔊</button></td></tr>
            <tr><td>When?</td><td><em><u>Bao giờ</u> bạn về?</em> (future) · <em>Bạn về <u>bao giờ</u>?</em> (past)</td><td></td></tr>
            <tr><td>Yes</td><td><em>có</em> (to có … không) · <em>ừ</em> (friends, younger) · <em>vâng / dạ</em> (+ <em>ạ</em>, to elders)</td><td></td></tr>
          </table></div>` },

        { type: "mc", id: "l5-mc", strand: "language", mins: 4,
          title: { vi: "Ngày tháng, bao giờ, có / dạ", en: "Dates, when, yes" },
          items: [
            { q: "Christmas, Friday 25/12:", opts: ["thứ sáu, ngày hai mươi lăm tháng mười hai", "tháng mười hai, ngày hai mươi lăm", "ngày thứ sáu hai mươi lăm"], correct: "thứ sáu, ngày hai mươi lăm tháng mười hai" },
            { q: "Ask a friend when she will go home for winter break:", opts: ["Bao giờ bạn về nhà?", "Bạn về nhà bao giờ?", "Bạn về nhà bao lâu?"], correct: "Bao giờ bạn về nhà?", why: { "Bạn về nhà bao giờ?": "At the end, bao giờ asks about the past." } },
            { q: "Hôm nay là thứ năm. Hôm kia là …", opts: ["thứ ba", "thứ bảy", "thứ tư"], correct: "thứ ba", explain: "hôm kia = the day before yesterday." },
            { q: "1975:", opts: ["một nghìn chín trăm bảy mươi lăm", "mười chín bảy mươi lăm", "một nghìn chín trăm bảy lăm mươi"], correct: "một nghìn chín trăm bảy mươi lăm" },
            { q: "Your teacher: “Em có rảnh không?” You:", opts: ["Dạ, em rảnh ạ.", "Ừ, rảnh.", "Có, mình rảnh."], correct: "Dạ, em rảnh ạ.", why: { "Ừ, rảnh.": "Ừ is too casual for a teacher.", "Có, mình rảnh.": "Mình is for friends — to a teacher you are em." } },
          ] },

        { type: "type", id: "l5-write", strand: "language", mins: 3,
          title: { vi: "Viết ngày bằng chữ", en: "Write the date in words" },
          instr: { vi: "Viết bằng chữ (không dùng chữ số).", en: "Write it in words (no digits)." },
          items: [
            { prompt: "25/12", telex: true, words: true, answers: ["ngày hai mươi lăm tháng mười hai", "hai mươi lăm tháng mười hai"] },
            { prompt: "3/4 (April 3)", telex: true, words: true, answers: ["ngày mồng ba tháng tư", "ngày mùng ba tháng tư", "ngày ba tháng tư", "mồng ba tháng tư", "mùng ba tháng tư", "ba tháng tư"], hint: "April = tháng tư; mồng for the 1st–10th." },
            { prompt: "2006 (năm)", telex: true, words: true, answers: ["năm hai nghìn không trăm linh sáu", "hai nghìn không trăm linh sáu", "năm hai ngàn không trăm lẻ sáu", "hai ngàn không trăm lẻ sáu", "năm hai nghìn không trăm lẻ sáu", "hai nghìn không trăm lẻ sáu", "năm hai ngàn không trăm linh sáu", "hai ngàn không trăm linh sáu"] },
          ] },
      ],
    },

    /* ═══════════════ BÀI 6 ═══════════════ */
    {
      id: "l6", icon: "3️⃣", label: "Bài 6",
      intro: { vi: "Bài 6 · Mấy giờ rồi? · lúc, vào, từ … đến, trước, sau · bao lâu, mất, giờ / tiếng, hay.", en: "Lesson 6 · telling the time · at, on, from … to · how long, giờ vs tiếng, often." },
      blocks: [
        { type: "html", title: { vi: "Nhớ nhanh · Bài 6", en: "Quick reminder: Lesson 6" }, strand: "language", mins: 2, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><td>Time</td><td><em>bảy giờ</em> · <em>bảy giờ rưỡi</em> · <em>tám giờ kém mười</em> (7:50) + <em>sáng / trưa / chiều / tối</em> · <em>Mấy giờ rồi?</em></td><td><button class="tts" data-say="bảy giờ rưỡi sáng, tám giờ kém mười">🔊</button></td></tr>
            <tr><td>At, on</td><td><em>lúc</em> + clock time · <em>vào</em> + day / date / month · <em>từ … đến …</em> · <em>trước / sau</em> + time or event</td><td></td></tr>
            <tr><td>How long</td><td><em>giờ</em> = o’clock · <em>tiếng</em> = hours long · <em>… mất bao lâu?</em> → <em>mất hai tiếng</em> · <em>… bao lâu rồi?</em> → <em>ba tháng rồi</em></td><td><button class="tts" data-say="Đi xe buýt mất bao lâu? Mất hai tiếng.">🔊</button></td></tr>
            <tr><td>Often · far?</td><td><em>Bạn có hay … không?</em> · <em>… có xa không? — Không xa lắm.</em></td><td></td></tr>
          </table></div>` },

        { type: "clockset", id: "l6-set", strand: "fluency", mins: 3,
          title: { vi: "Nghe và chỉnh đồng hồ", en: "Listen and set the clock" },
          instr: { vi: "Bấm “Nghe”, rồi chỉnh kim đồng hồ.", en: "Tap Listen, then set the hands." },
          items: [
            { say: "bảy giờ rưỡi", h: 7, m: 30 },
            { say: "sáu giờ bốn mươi", h: 6, m: 40 },
            { say: "mười một giờ kém mười", h: 10, m: 50 },
          ] },

        { type: "mc", id: "l6-mc", strand: "language", mins: 4,
          title: { vi: "Lúc, vào, giờ, tiếng, bao lâu", en: "lúc, vào, giờ, tiếng, bao lâu" },
          items: [
            { q: "Lớp tiếng Việt bắt đầu ___ mười giờ mười.", opts: ["lúc", "vào", "từ"], correct: "lúc" },
            { q: "Mẹ Minh sang Mỹ ___ tháng mười hai.", opts: ["vào", "lúc", "mất"], correct: "vào" },
            { q: "Bài thi viết dài năm mươi ___.", opts: ["phút", "giờ", "lúc"], correct: "phút" },
            { q: "Từ Chapel Hill đến Richmond mất khoảng ba ___.", opts: ["tiếng", "giờ", "phút rưỡi"], correct: "tiếng", why: { "giờ": "For how long, say tiếng." } },
            { q: "Bạn học tiếng Việt ___? — Bốn tháng rồi.", opts: ["bao lâu rồi", "bao giờ", "mấy giờ"], correct: "bao lâu rồi" },
            { q: "___ ăn sáng, Emma chạy bộ. (Before breakfast)", opts: ["Trước", "Sau", "Từ"], correct: "Trước" },
          ] },
      ],
    },

    /* ═══════════════ BÀI 7 ═══════════════ */
    {
      id: "l7", icon: "4️⃣", label: "Bài 7",
      intro: { vi: "Bài 7 · Gia đình · tuổi · đã, đang, sẽ, sắp, vừa · chưa / rồi · vẫn · cách đây.", en: "Lesson 7 · the family · age · time markers · yet / already · still · ago." },
      blocks: [
        { type: "notice", id: "notice-l7", strand: "language", mins: 4,
          title: { vi: "Ôn lại · Bài 7", en: "Look again: Lesson 7" },
          examples: [
            { vi: "Minh <strong>đã</strong> đi Richmond. Bây giờ Minh <strong>đang</strong> ôn thi. Tháng mười hai mẹ Minh <strong>sẽ</strong> sang Mỹ.", en: "Minh went to Richmond. Now he’s studying for exams. His mother will come in December." },
            { vi: "Chị Linh <strong>sắp</strong> sinh em bé. Minh <strong>vừa</strong> gọi điện cho mẹ.", en: "Linh will have her baby soon. Minh just called his mother." },
            { vi: "Anh Jake có vợ <strong>chưa</strong>? — <strong>Chưa</strong>, anh ấy <strong>vẫn chưa</strong> có vợ.", en: "Is Jake married yet? — No, he still isn’t." },
            { vi: "Bà ngoại Emma <strong>tám mươi hai tuổi</strong>. Bà về hưu <strong>cách đây</strong> hai mươi năm.", en: "Emma’s grandmother is 82. She retired twenty years ago." },
          ],
          q: "Where do đã, đang, sẽ, sắp, vừa, vẫn and chưa go?", qEn: "Where do the markers go?",
          opts: ["right before the verb", "at the end of the sentence", "before the subject"], correct: "right before the verb",
          explain: "Subject + marker + verb: Minh đang học. · Only rồi and the question chưa? go at the end.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>đã</strong> past · <strong>vừa / mới</strong> just · <strong>đang</strong> now · <strong>sắp</strong> very soon · <strong>sẽ</strong> future — before the verb; <em>đã / sẽ</em> can drop when a time word says it</td><td>time markers</td></tr>
              <tr><td><strong>… chưa?</strong> → <em>… rồi</em> (already) / <em>Chưa, … chưa …</em> (not yet) — never answer with <em>không</em> <button class="tts" data-say="Bạn ăn tối chưa? Mình ăn rồi. Chưa, mình chưa ăn.">🔊</button></td><td>yet?</td></tr>
              <tr><td><strong>vẫn / còn / vẫn còn</strong> + verb = still · <strong>vẫn chưa</strong> = still not · <strong>cách đây</strong> + time = ago · <strong>tốt nghiệp</strong> + school</td><td>still, ago</td></tr>
              <tr><td><strong>Age</strong>: (<em>năm nay</em>) + number + <em>tuổi</em>, no <em>là</em> · <em>bao nhiêu tuổi?</em> / <em>mấy tuổi?</em> (small children) · <strong>job</strong>: <em>là</em> + job</td><td>age, job</td></tr>
              <tr><td><strong>Family</strong>: <em>ông bà nội / ngoại</em> · <em>bố mẹ</em> · <em>anh trai, chị gái, em trai, em gái</em> · <em>vợ, chồng</em> · <em>con trai, con gái</em> · <em>cháu</em> · <em>lấy vợ / lấy chồng</em>, <em>có gia đình</em></td><td>family words</td></tr>
              <tr><td><strong>Introducing</strong>: <em>Mình giới thiệu với bạn, đây là …</em> → <em>Rất vui được làm quen với …</em> · <strong>đấy / thế</strong> make questions friendly: <em>Bạn làm gì đấy?</em></td><td>introductions</td></tr>
            </table>` },

        { type: "mc", id: "l7-mc", strand: "language", mins: 4,
          title: { vi: "Chọn từ đúng", en: "Choose the right word" },
          items: [
            { q: "Suỵt! Em bé ___ ngủ.", opts: ["đang", "đã", "sẽ"], correct: "đang" },
            { q: "Bạn đọc bài này ___? — Mình đọc rồi.", opts: ["chưa", "không", "rồi"], correct: "chưa" },
            { q: "Bạn gọi cho bà chưa? — ___", opts: ["Chưa, mình chưa gọi.", "Không, mình không gọi.", "Chưa, mình gọi rồi."], correct: "Chưa, mình chưa gọi.", why: { "Không, mình không gọi.": "Answer chưa questions with chưa (not yet)." } },
            { q: "“Lily is sixteen this year.”", opts: ["Năm nay Lily mười sáu tuổi.", "Năm nay Lily là mười sáu tuổi.", "Năm nay Lily có mười sáu tuổi."], correct: "Năm nay Lily mười sáu tuổi." },
            { q: "Ask a six-year-old his age:", opts: ["Cháu mấy tuổi?", "Cháu bao nhiêu tuổi ạ?", "Bác mấy tuổi?"], correct: "Cháu mấy tuổi?" },
            { q: "Anh Jake tốt nghiệp đại học ___ hai năm.", opts: ["cách đây", "sau", "trước khi"], correct: "cách đây" },
            { q: "Mẹ chị Linh là ___ của em bé.", opts: ["bà ngoại", "bà nội", "mẹ"], correct: "bà ngoại", explain: "Linh is the baby’s mother, so Linh’s mother is the grandmother on the mother’s side: bà ngoại." },
          ] },

        { type: "cloze", id: "l7-cloze", strand: "language", mins: 3,
          title: { vi: "Gia đình chị Linh", en: "Linh’s family" },
          instr: { vi: "Điền từ.", en: "Fill in the blanks." },
          items: [
            { text: "Chị Linh năm nay hai mươi tám {0}. Chị ấy {1} lấy chồng. Chồng chị Linh là anh Nam. Tháng mười hai, mẹ chị Linh {2} sang Mỹ, vì chị Linh {3} sinh em bé. Bố chị Linh {4} đi làm, sang năm mới về hưu.", answers: ["tuổi", "đã", "sẽ", "sắp", "vẫn"], bank: ["tuổi", "đã", "sẽ", "sắp", "vẫn", "chưa", "là"] },
          ] },
      ],
    },

    /* ═══════════════ NGHE ═══════════════ */
    {
      id: "listen", icon: "🎧", label: "Nghe",
      intro: { vi: "Như phần A của bài thi: nghe số, ngày, giờ và một cuộc điện thoại.", en: "Like Part A of the exam: numbers, dates, times and a phone call." },
      blocks: [
        { type: "mc", id: "listen-num", strand: "input", mins: 3,
          title: { vi: "Nghe và chọn", en: "Listen and choose" },
          instr: { vi: "Bấm 🔊, rồi chọn đáp án đúng.", en: "Tap 🔊, then choose." },
          items: [
            { say: "hai trăm linh năm", q: "", opts: ["205", "250", "215"], correct: "205" },
            { say: "mười một giờ kém mười lăm", q: "", opts: ["10:45", "11:15", "11:45"], correct: "10:45" },
            { say: "ngày mồng tám tháng ba", q: "", opts: ["8/3", "3/8", "18/3"], correct: "8/3" },
            { say: "năm hai nghìn không trăm linh sáu", q: "", opts: ["2006", "2016", "2060"], correct: "2006" },
          ] },

        { type: "dialogue", id: "call", strand: "input", mins: 3,
          title: { vi: "Cuộc điện thoại", en: "A phone call" },
          lines: [
            { spk: "Chị Linh", vi: "Alô, Emma à? Chị Linh đây." },
            { spk: "Emma", vi: "Dạ, em chào chị ạ." },
            { spk: "Chị Linh", vi: "Em ơi, tháng mười hai mẹ chị sẽ sang Mỹ. Thứ bảy, ngày mười chín tháng mười hai, em có rảnh không?" },
            { spk: "Emma", vi: "Dạ, ngày mười chín em rảnh ạ." },
            { spk: "Chị Linh", vi: "Chị muốn mời em đến nhà chị ăn tối, gặp mẹ chị." },
            { spk: "Emma", vi: "Ôi, vui quá! Mấy giờ ạ?" },
            { spk: "Chị Linh", vi: "Sáu giờ rưỡi tối. Minh sẽ đến đón em lúc năm giờ bốn mươi lăm." },
            { spk: "Emma", vi: "Dạ, cảm ơn chị. Em sẽ mua hoa cho bác ạ." },
            { spk: "Chị Linh", vi: "Ừ, cảm ơn em. Hẹn gặp em thứ bảy nhé!" },
          ],
          gist: { q: "Chị Linh gọi để làm gì?", en: "Why does Linh call?", opts: ["mời Emma đến ăn tối", "hỏi Emma về bài thi", "nói chị Linh bận"], correct: "mời Emma đến ăn tối" } },

        { type: "mc", id: "call-detail", strand: "input", mins: 2,
          title: { vi: "Nghe lại và trả lời", en: "Listen again and answer" },
          instr: { vi: "Nghe cuộc điện thoại ở trên lần nữa nếu cần.", en: "Play the phone call above again if you need to." },
          items: [
            { q: "Bữa tối là ngày nào?", opts: ["thứ bảy, 19/12", "thứ sáu, 19/12", "thứ bảy, 15/12"], correct: "thứ bảy, 19/12" },
            { q: "Bữa tối bắt đầu lúc mấy giờ?", opts: ["6:30 tối", "5:45 chiều", "7:30 tối"], correct: "6:30 tối" },
            { q: "Ai sẽ đến đón Emma?", opts: ["Minh", "chị Linh", "mẹ chị Linh"], correct: "Minh" },
            { q: "Emma sẽ mua gì?", opts: ["hoa", "trà", "bánh"], correct: "hoa" },
          ] },
      ],
    },

    /* ═══════════════ VIẾT & NÓI ═══════════════ */
    {
      id: "speak", icon: "5️⃣", label: "Viết & nói",
      intro: { vi: "Luyện như bài thi thật: trả lời câu hỏi bằng câu đầy đủ, rồi viết một đoạn ngắn.", en: "Practise like the real exam: answer in full sentences, then write a short paragraph." },
      blocks: [
        { type: "record", id: "opi-prac", strand: "output", mins: 10,
          title: { vi: "Nói · Luyện thi nói", en: "Speak: speaking exam practice" },
          instr: { vi: "Bấm 🔊 để nghe câu hỏi, rồi ghi âm câu trả lời. Nói 2–4 câu cho mỗi câu hỏi. Trong bài thi thật, câu hỏi chỉ phát một lần!", en: "Tap 🔊 to hear the question, then record your answer — 2–4 sentences each. In the real exam each question plays only once, so practise without notes." },
          prompts: [
            { vi: "Chào bạn! Bạn tên là gì? Dạo này bạn có khoẻ không?", en: "Hello! What’s your name? How have you been?", maxSec: 40, model: false },
            { vi: "Bạn là người nước nào? Bạn học ở đâu, năm thứ mấy?", en: "Where are you from? Where do you study, and what year are you in?", maxSec: 45, model: false },
            { vi: "Hôm nay là thứ mấy, ngày bao nhiêu? Sinh nhật của bạn là ngày nào?", en: "What day and date is it today? When is your birthday?", maxSec: 40, model: false },
            { vi: "Mỗi ngày bạn thường dậy lúc mấy giờ? Bạn có lớp từ mấy giờ đến mấy giờ?", en: "What time do you usually get up? When are your classes?", maxSec: 45, model: false },
            { vi: "Từ nhà bạn đến trường có xa không? Đi mất bao lâu?", en: "Is it far from your home to campus? How long does it take?", maxSec: 40, model: false },
            { vi: "Gia đình bạn có mấy người? Họ bao nhiêu tuổi và làm gì?", en: "How many people are in your family? How old are they, and what do they do?", maxSec: 60, model: false },
            { vi: "Cuối tuần trước bạn đã làm gì? Kỳ nghỉ đông này bạn sẽ làm gì?", en: "What did you do last weekend? What will you do this winter break?", maxSec: 60, model: false },
            { vi: "Bạn gọi điện đến nhà một người bạn. Bà của bạn ấy nghe máy. Hãy chào bà, nói bạn là ai, và hỏi bạn của bạn có nhà không.", en: "Role play: you phone a friend’s home and their grandmother answers. Greet her politely, say who you are, and ask if your friend is home.", model: false, ask: false, maxSec: 60 },
            { vi: "Bạn học tiếng Việt bao lâu rồi? Tiếng Việt có khó không?", en: "How long have you been learning Vietnamese? Is it hard?", maxSec: 45, model: false },
          ] },

        { type: "writing", id: "paragraph", strand: "output", mins: 8,
          title: { vi: "Viết · Tôi và gia đình tôi", en: "Write: me and my family" },
          prompt: { vi: "Viết 8–10 câu: giới thiệu bạn (tên, người nước nào, học ở đâu), một ngày của bạn (lúc mấy giờ, từ … đến …), gia đình bạn (mấy người, bao nhiêu tuổi, làm gì), và một việc bạn đã làm, một việc bạn sẽ làm.", en: "Write 8–10 sentences: introduce yourself (name, nationality, school), your day (times, from … to …), your family (how many, ages, jobs), and one thing you did and one thing you will do. You may invent details." },
          minWords: 60,
          checklist: [
            { vi: "Tên, quốc tịch, trường", en: "Name, nationality, school" },
            { vi: "lúc + giờ hoặc từ … đến …", en: "lúc + a time, or từ … đến …" },
            { vi: "Gia đình: … người, … tuổi, là + nghề", en: "Family: how many, an age, là + a job" },
            { vi: "đã và sẽ (một câu mỗi từ)", en: "đã and sẽ (one sentence each)" },
            { vi: "rất / lắm / quá hoặc cũng, đúng chỗ", en: "rất / lắm / quá or cũng in the right place" },
            { vi: "Dấu (tone marks) đầy đủ", en: "All tone marks written" },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "6️⃣", label: "Đọc",
      intro: { vi: "Như phần C của bài thi. Mở bài đọc, bấm “Nghe và đọc theo”, làm bài tập, rồi đọc to và ghi âm.", en: "Like Part C of the exam. Open the reading, tap Read along, do the tasks, then read it aloud and record it." },
      blocks: [
        { type: "story", id: "st-final", strand: "input", emoji: "🦃", level: "Cấp 1", mins: 8,
          titleVi: "Lễ Tạ ơn ở Richmond", titleEn: "Thanksgiving in Richmond",
          gloss: [["Lễ Tạ ơn", "Thanksgiving"], ["đón", "to pick up"], ["vì", "because"], ["đường", "road"], ["đông", "crowded"], ["dạy", "to teach"], ["bữa tối", "dinner"], ["tặng", "to give (a gift)"], ["hộp", "box"]],
          body: [
            { t: "n", s: "Tôi tên là Minh. Năm nay tôi hai mươi mốt tuổi. Tôi là sinh viên năm thứ ba ở UNC." },
            { t: "n", s: "Thứ tư, ngày hai mươi lăm tháng mười một, tôi đã đi Richmond với Emma. Bố Emma đến đón chúng tôi lúc hai giờ chiều. Đi xe hơi mất ba tiếng rưỡi, vì đường rất đông." },
            { t: "n", s: "Gia đình Emma rất vui. Bà ngoại Emma năm nay tám mươi hai tuổi. Bà về hưu rồi, nhưng bà vẫn dạy tiếng Pháp cho Lily." },
            { t: "n", s: "Mẹ Emma là giáo viên lịch sử. Bố Emma là kỹ sư, nhưng bác ấy về hưu rồi. Anh Jake đến từ Boston lúc mười giờ tối. Anh ấy hai mươi bốn tuổi và chưa có vợ." },
            { t: "n", s: "Thứ năm, cả nhà ăn tối lúc năm giờ chiều. Trước bữa tối, tôi chào bà và hai bác, rồi tặng gia đình Emma một hộp trà Việt Nam." },
            { t: "d", sp: "Bà ngoại Emma", s: "Cảm ơn cháu. Trà ngon lắm!" },
            { t: "n", s: "Chủ nhật, chúng tôi về Chapel Hill. Tháng mười hai, mẹ tôi sẽ sang Mỹ, và tôi sẽ giới thiệu mẹ với Emma." },
          ],
          pairs: [["đón", "to pick up"], ["tặng", "to give (a gift)"], ["bữa tối", "dinner"], ["dạy", "to teach"]],
          order: ["Bố Emma đến đón Minh và Emma.", "Anh Jake đến từ Boston.", "Minh tặng gia đình Emma một hộp trà.", "Minh và Emma về Chapel Hill."],
          fill: { text: "Đi xe hơi đến Richmond mất ba tiếng {0}. Bà ngoại Emma về hưu rồi, nhưng bà {1} dạy tiếng Pháp. Anh Jake {2} có vợ. Cả nhà ăn tối {3} năm giờ chiều.", answers: ["rưỡi", "vẫn", "chưa", "lúc"], bank: ["rưỡi", "vẫn", "chưa", "lúc", "giờ", "đã", "vào"] } },

        { type: "tf", id: "read-tf", strand: "input", mins: 2,
          title: { vi: "Đúng hay sai?", en: "True or false?" },
          instr: { vi: "Đọc lại bài “Lễ Tạ ơn ở Richmond”.", en: "Read “Thanksgiving in Richmond” again." },
          items: [
            { q: "Minh và Emma đi Richmond vào thứ năm.", ans: false, why: "Thứ tư, ngày hai mươi lăm." },
            { q: "Đi xe hơi mất ba tiếng rưỡi.", ans: true, why: "… vì đường rất đông." },
            { q: "Bố Emma vẫn đi làm.", ans: false, why: "Bác ấy về hưu rồi." },
            { q: "Anh Jake chưa có vợ.", ans: true, why: "Anh ấy hai mươi bốn tuổi và chưa có vợ." },
            { q: "Mẹ Minh đã gặp Emma.", ans: false, why: "Tháng mười hai mẹ Minh sẽ sang Mỹ — not yet." },
          ] },

        { type: "readaloud", id: "read-aloud", story: "st-final", strand: "fluency", mins: 4,
          title: { vi: "Đọc to", en: "Read aloud" },
          instr: { vi: "Nghe lại bài đọc ở trên một lần. Rồi bấm ● Ghi âm và đọc to cả bài — rõ ràng, không cần nhanh.", en: "Listen to the reading above once more. Then tap ● Record and read it all aloud — clearly, no need to rush. Your recording goes into the report." } },

        { type: "html", title: { vi: "Mẹo làm bài thi · Exam tips", en: "Exam tips" }, strand: "input", mins: 0, html: `
          <ul>
            <li><strong>Answer in full sentences</strong>, in both exams: not <em>“Ba tiếng.”</em> but <em>“Đi xe buýt mất ba tiếng.”</em></li>
            <li><strong>Listen for the question word and answer in its place</strong>: <em>Bạn dậy <u>lúc mấy giờ</u>? — Tôi dậy <u>lúc bảy giờ</u>.</em></li>
            <li><strong>Watch the small words in reading</strong>: <em>nhưng, chưa, vẫn, rồi, sẽ</em> often decide true or false.</li>
            <li><strong>Write every tone mark</strong>: <em>mươi / mười</em>, <em>giờ / tiếng</em>, <em>chưa / chua</em>, <em>ngoại / ngoài</em>.</li>
            <li><strong>Speaking role play:</strong> greet first, use <em>thưa … ạ</em> and <em>cháu / bà / bác</em>, say thank you and goodbye (<em>Cháu chào bà ạ.</em>).</li>
          </ul>` },
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
