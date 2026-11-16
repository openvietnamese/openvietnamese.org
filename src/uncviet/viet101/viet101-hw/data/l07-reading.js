/* VIET 101 (UNC Viet) — Bài 7 extra homework: Bài đọc · Giới thiệu một người bạn (≈ 25 minutes, the weekend after Lesson 7)
   Goes with the Narrative of Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lesson 7, and the Lesson 7 notes the
   Mon/Wed/Fri homework did not cover: quen / làm quen / giới thiệu (Usage 2), sắp … chưa? and chưa for the future
   (Grammar 5–6), vẫn còn đang (G7), năm nay … with tuổi left out (U3), lấy vợ / lấy chồng / lập gia đình (U6),
   sinh = give birth (U7), word order in ông bà, bố mẹ, vợ chồng (U8), chuyên về, thỉnh thoảng, nghỉ hè / nghỉ đông.
   The reading is original (Emma introduces Minh, modelled on the book's narrative); the book's narrative is not
   reproduced — the “Sách” check asks about it with the book open. Story world facts as in l07-hw1..3.
   Engine: ../assets/bv.js. */
(function () {

window.BV_CHAPTER = {
  id: 7,
  titleVi: "Bài tập thêm · Bài đọc: Giới thiệu một người bạn",
  titleEn: "Extra homework: the reading — introducing a friend",
  description: "VIET 101, Lesson 7 extra homework: read Emma’s introduction of Minh and his family, check the book’s narrative, and practise the last Lesson 7 notes — quen / làm quen / giới thiệu, sắp … chưa?, getting married, vợ chồng, chuyên về — then write about a friend’s family. About 25 minutes.",
  color: "#0f766e",
  badge: { icon: "📖", name: "Bài đọc · Reader" },

  cando: [
    { vi: "Tôi có thể đọc một bài giới thiệu về một người bạn và gia đình người ấy.", en: "I can read a short text introducing a friend and their family." },
    { vi: "Tôi biết khi nào dùng quen, làm quen và giới thiệu.", en: "I know when to use quen, làm quen and giới thiệu." },
    { vi: "Tôi có thể nói ai đã lấy vợ / lấy chồng, ai chưa có gia đình.", en: "I can say who is married and who isn’t." },
    { vi: "Tôi có thể viết vài câu về gia đình một người bạn.", en: "I can write a few sentences about a friend’s family." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập thêm · Bài 7 · khoảng 25 phút.", en: "Extra homework · Lesson 7 · about 25 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Lesson 7 in your book ends with a <strong>narrative</strong>: someone introduces a friend and the friend’s family. This page gives you a reading just like it, about Minh, and the last few Lesson 7 notes.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Words from the reading</td><td>3′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td><em>quen, làm quen, giới thiệu</em> · <em>sắp … chưa?</em> · getting married · <em>vợ chồng</em></td><td>8′</td></tr>
            <tr><td>3️⃣ Đọc</td><td>Emma introduces Minh · read it aloud · 📕 check the narrative in your book</td><td>10′</td></tr>
            <tr><td>4️⃣ Viết</td><td>A friend’s family in 5–6 sentences</td><td>5′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Quick Feedback · download the report and upload it to Canvas</td><td>2′</td></tr>
          </table></div>
          <p><small>Have your book open for the 📕 check in the Đọc tab (Lesson 7, Narrative).</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Từ mới trong bài đọc.", en: "New words in the reading." },
      blocks: [
        { type: "flashcards", id: "cards-reading", strand: "language", mins: 3,
          title: { vi: "Thẻ từ · Bài đọc", en: "Flashcards: the reading" },
          instr: { vi: "Lật thẻ, nghe, nói theo.", en: "Flip, listen, say it aloud." },
          cards: [
            { vi: "quen", en: "to know (someone), be acquainted", ex: "Mình quen Minh hai tháng rồi.", exEn: "I’ve known Minh for two months." },
            { vi: "chuyên về", en: "to specialize in, major in", ex: "Minh chuyên về toán.", exEn: "Minh majors in math." },
            { vi: "năm thứ ba", en: "third year (of college)", ex: "Minh đang học năm thứ ba.", exEn: "Minh is a third-year student." },
            { vi: "lấy chồng · lấy vợ", en: "to get married (a woman · a man)", ex: "Chị Linh lấy chồng cách đây bốn năm.", exEn: "Chị Linh got married four years ago." },
            { vi: "lập gia đình", en: "to get married (anyone)", ex: "Anh Jake chưa lập gia đình.", exEn: "Jake isn’t married yet." },
            { vi: "vợ chồng chị Linh", en: "chị Linh and her husband", ex: "Vợ chồng chị Linh ở Raleigh.", exEn: "Chị Linh and her husband live in Raleigh." },
            { vi: "y tá", en: "nurse", ex: "Mẹ Minh là y tá.", exEn: "Minh’s mother is a nurse." },
            { vi: "nghỉ hè · nghỉ đông", en: "summer break · winter break", ex: "Nghỉ hè Minh về Hà Nội.", exEn: "In the summer break Minh goes home to Hà Nội." },
            { vi: "nhớ nhà", en: "to be homesick", ex: "Minh hay nhớ nhà.", exEn: "Minh often misses home." },
            { vi: "thỉnh thoảng", en: "sometimes, now and then", ex: "Thỉnh thoảng Minh mời mình đi Raleigh.", exEn: "Now and then Minh invites me to Raleigh." },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Những ghi chú cuối của Bài 7.", en: "The last notes of Lesson 7." },
      blocks: [
        { type: "notice", id: "notice-quen", strand: "language", mins: 3,
          title: { vi: "Khám phá · Quen, làm quen, giới thiệu", en: "Discover: quen, làm quen, giới thiệu" },
          examples: [
            { vi: "Emma <strong>quen</strong> Minh hai tháng rồi.", en: "Emma has known Minh for two months." },
            { vi: "Emma <strong>làm quen với</strong> Minh ở lớp toán.", en: "Emma met Minh (for the first time) in math class." },
            { vi: "Chị Linh <strong>giới thiệu</strong> anh Nam <strong>với</strong> Emma.", en: "Chị Linh introduced anh Nam to Emma." },
          ],
          q: "Hai người gặp nhau lần đầu ở lớp. Họ …", qEn: "Two people meet for the first time in class. They …",
          opts: ["làm quen với nhau", "quen nhau", "giới thiệu nhau"], correct: "làm quen với nhau",
          why: { "quen nhau": "quen = already know someone (a state, often with … rồi). Meeting for the first time is làm quen.", "giới thiệu nhau": "giới thiệu needs a third person who introduces two others." },
          explain: "quen = know someone · làm quen (với) = meet, get acquainted · giới thiệu A với B = introduce A to B (three people).",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>quen</strong> + person (+ time + rồi): <em>Mình quen chị ấy ba năm rồi.</em> <button class="tts" data-say="Mình quen chị ấy ba năm rồi.">🔊</button></td><td>have known</td></tr>
              <tr><td><strong>làm quen với</strong> + person — always with <em>với</em>: <em>Mình làm quen với chị ấy cách đây ba năm.</em> <button class="tts" data-say="Mình làm quen với chị ấy cách đây ba năm.">🔊</button></td><td>met</td></tr>
              <tr><td><strong>giới thiệu</strong> A <strong>với</strong> B: <em>Mình giới thiệu bạn mình với anh mình.</em> <button class="tts" data-say="Mình giới thiệu bạn mình với anh mình.">🔊</button></td><td>introduce A to B</td></tr>
            </table>` },

        { type: "mc", id: "sap-chua", strand: "language", mins: 2,
          title: { vi: "Sắp … chưa? · Chưa cho tương lai", en: "Sắp … chưa? · chưa for the future" },
          items: [
            { q: "Hỏi Minh: “Bạn ___ thi ___?”", en: "Are you taking your exams soon?", opts: ["sắp … chưa", "sắp … không", "sẽ … chưa"], correct: "sắp … chưa", why: { "sắp … không": "Sắp is never used with không. A sắp question ends with chưa: Bạn sắp thi chưa?" } },
            { q: "“Bạn sắp thi chưa?” — Not yet, next month. Bạn nói:", opts: ["Chưa, tháng sau mình mới thi.", "Không, mình không sắp thi.", "Không sắp."], correct: "Chưa, tháng sau mình mới thi.", explain: "Say “not yet” with chưa. Mới here = “only then”." },
            { q: "Tomorrow she still won’t be leaving. →", opts: ["Ngày mai cô ấy chưa đi.", "Ngày mai cô ấy không sắp đi.", "Ngày mai cô ấy đã không đi."], correct: "Ngày mai cô ấy chưa đi.", explain: "chưa = not yet — in the past, now or the future." },
            { q: "Bố Minh ___ làm việc. (still — strongest)", opts: ["vẫn còn đang", "đang vẫn còn", "còn vẫn"], correct: "vẫn còn đang", explain: "đang can follow vẫn còn for extra emphasis." },
          ] },

        { type: "mc", id: "usage", strand: "language", mins: 3,
          title: { vi: "Gia đình · Cách nói", en: "Family: how to say it" },
          items: [
            { q: "Anh Nam ___ cách đây bốn năm.", en: "Anh Nam got married four years ago.", opts: ["lấy vợ", "lấy chồng", "có vợ"], correct: "lấy vợ", why: { "lấy chồng": "lấy chồng is for a woman (she “takes a husband”).", "có vợ": "có vợ = to be married (a state); “got married” is lấy vợ." } },
            { q: "Anh Jake chưa ___.", en: "Jake isn’t married.", opts: ["có gia đình", "lấy chồng", "sinh"], correct: "có gia đình" },
            { q: "Chị Linh sắp sinh con gái. Ở đây sinh nghĩa là …", opts: ["to give birth", "to be born", "to visit"], correct: "to give birth", explain: "sinh has two meanings: to give birth (sinh con) and to be born (Minh sinh năm 2005)." },
            { q: "Chị Linh and her husband = ?", opts: ["vợ chồng chị Linh", "chồng vợ chị Linh", "chị Linh vợ chồng"], correct: "vợ chồng chị Linh", explain: "Set order: ông bà, bố mẹ, vợ chồng — never “chồng vợ” or “mẹ bố”." },
            { q: "Năm nay chị Linh ___.", en: "In everyday speech", opts: ["hai mươi tám", "là hai mươi tám", "có hai mươi tám"], correct: "hai mươi tám", explain: "With năm nay, people often drop tuổi: Năm nay chị ấy hai mươi tám." },
            { q: "Anh đang làm gì ___?", en: "a friendly question", opts: ["đấy", "rồi", "lắm"], correct: "đấy", explain: "đấy or thế at the end makes a question friendly. South: đó, vậy — Anh đang làm gì vậy?" },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "3️⃣", label: "Đọc",
      intro: { vi: "Emma giới thiệu Minh với lớp tiếng Việt. Đọc, làm bài tập nhỏ, rồi đọc to và ghi âm.", en: "Emma introduces Minh to her Vietnamese class. Read, do the short tasks, then read it aloud and record it." },
      blocks: [
        { type: "story", id: "st4", strand: "input", emoji: "📖", level: "Cấp 1", mins: 5,
          titleVi: "Giới thiệu một người bạn", titleEn: "Introducing a friend",
          gloss: [["với nhau", "each other"], ["năm thứ ba", "third year"], ["chuyên về", "to major in"], ["y tá", "nurse"], ["lấy chồng", "to get married (a woman)"], ["vợ chồng", "husband and wife"], ["sinh", "to give birth; to be born"], ["con gái", "daughter"], ["nhớ nhà", "homesick"], ["nghỉ hè", "summer break"], ["thỉnh thoảng", "sometimes"]],
          body: [
            { t: "n", s: "Hôm nay tôi muốn giới thiệu với cả lớp một người bạn của tôi: Minh." },
            { t: "n", s: "Minh sinh năm hai nghìn không trăm linh năm ở Hà Nội. Năm nay Minh hai mươi mốt." },
            { t: "n", s: "Tôi quen Minh hai tháng rồi. Chúng tôi làm quen với nhau ở lớp toán." },
            { t: "n", s: "Hiện giờ Minh đang học năm thứ ba ở UNC, chuyên về toán." },
            { t: "n", s: "Gia đình Minh có bốn người: bố mẹ, chị gái và Minh." },
            { t: "n", s: "Bố mẹ Minh vẫn ở Hà Nội. Mẹ Minh là y tá. Bố Minh vẫn còn đi làm, sang năm mới về hưu." },
            { t: "n", s: "Chị Linh, chị gái Minh, năm nay hai mươi tám. Chị ấy đã lấy chồng. Vợ chồng chị Linh ở Raleigh." },
            { t: "n", s: "Chị Linh sắp sinh con gái. Tháng mười hai, mẹ Minh sẽ sang Mỹ thăm con gái." },
            { t: "n", s: "Minh hay nhớ nhà. Nghỉ hè Minh thường về Hà Nội thăm bố mẹ." },
            { t: "n", s: "Thỉnh thoảng Minh mời tôi đi Raleigh ăn phở với vợ chồng chị Linh." },
          ],
          pairs: [["quen", "to know someone"], ["chuyên về", "to major in"], ["vợ chồng", "husband and wife"], ["thỉnh thoảng", "sometimes"]],
          order: ["Emma làm quen với Minh ở lớp toán.", "Minh đang học năm thứ ba ở UNC.", "Chị Linh sắp sinh con gái.", "Tháng mười hai, mẹ Minh sẽ sang Mỹ."],
          fill: { text: "Minh chuyên {0} toán. Mẹ Minh là {1}. Chị Linh đã lấy {2}. {3} chị Linh ở Raleigh.", answers: ["về", "y tá", "chồng", "Vợ chồng"], bank: ["về", "y tá", "chồng", "Vợ chồng", "vợ", "Chồng vợ", "giáo viên"] } },

        { type: "readaloud", id: "read-aloud", story: "st4", strand: "fluency", mins: 3,
          title: { vi: "Đọc to", en: "Read aloud" },
          instr: { vi: "Nghe lại bài đọc một lần, rồi bấm ● Ghi âm và đọc to cả bài như Emma giới thiệu Minh với lớp.", en: "Listen once more, then tap ● Record and read the whole text aloud, as if you were Emma introducing Minh to the class." } },

        { type: "mc", id: "book", strand: "input", mins: 2,
          title: { vi: "📕 Sách · Bài đọc Bài 7", en: "📕 Book check: the Lesson 7 narrative" },
          instr: { vi: "Mở sách, đọc bài đọc (Narrative) của Bài 7 về anh Jeff, rồi trả lời.", en: "Open your book to the Lesson 7 Narrative about Jeff, read it, then answer." },
          items: [
            { q: "Gia đình Jeff có mấy người?", opts: ["năm người", "bốn người", "ba người"], correct: "năm người" },
            { q: "Chị Jeff đã lập gia đình chưa?", opts: ["Rồi, chị ấy đã lấy chồng.", "Chưa, chị ấy chưa có gia đình.", "Chị ấy sắp lấy chồng."], correct: "Rồi, chị ấy đã lấy chồng." },
            { q: "Em trai Jeff sau này muốn chuyên về gì?", opts: ["máy vi tính, như bố", "lịch sử, như mẹ", "toán, như Jeff"], correct: "máy vi tính, như bố" },
            { q: "Bài của Emma và bài trong sách giống nhau ở chỗ nào?", en: "How are Emma’s text and the book’s alike?", opts: ["Both introduce a friend, then the friend’s family", "Both are dialogues", "Both are about Hà Nội"], correct: "Both introduce a friend, then the friend’s family" },
          ] },

        { type: "html", title: { vi: "Văn hóa · Album ảnh gia đình", en: "Culture: the family album" }, strand: "input", mins: 0, html: `
          <ul>
            <li>Families in Vietnamese cities are small now — often one or two children.</li>
            <li>They are still very close. In some homes three generations live together, and grandparents look after the grandchildren while the parents work.</li>
            <li>Family members may live far apart but try to meet at <strong>Tết</strong>.</li>
            <li>If you visit a Vietnamese friend’s family, they may proudly show you the <strong>family photo album</strong> and tell you about each person — and then ask about your family. Now you can answer!</li>
          </ul>
          <p><small>Summarised from <em>Bạn cần biết</em>, EV-NNB Lesson 7.</small></p>` },
      ],
    },

    /* ═══════════════ VIẾT ═══════════════ */
    {
      id: "write", icon: "4️⃣", label: "Viết",
      intro: { vi: "Viết về một người bạn và gia đình người ấy.", en: "Write about a friend and their family." },
      blocks: [
        { type: "writing", id: "my-friend", strand: "output", mins: 5,
          title: { vi: "Viết · Giới thiệu một người bạn", en: "Write: introduce a friend" },
          prompt: { vi: "Giới thiệu một người bạn của bạn và gia đình người ấy (5–6 câu), giống bài của Emma.", en: "Introduce a friend and their family in 5–6 sentences, like Emma’s text." },
          minWords: 40,
          checklist: [
            { vi: "Tên, tuổi, bạn quen người ấy bao lâu rồi / làm quen ở đâu", en: "Name, age, how long you’ve known them / where you met" },
            { vi: "Người ấy học gì, chuyên về gì (hoặc làm gì)", en: "What they study or do" },
            { vi: "Gia đình có mấy người, mỗi người làm gì", en: "How many in the family, what each does" },
            { vi: "Một câu với đã / đang / sẽ / sắp hoặc vẫn", en: "One sentence with a time marker or vẫn" },
          ] },
      ],
    },

    /* ═══════════════ NỘP BÀI ═══════════════ */
    {
      id: "report", icon: "📊", label: "Nộp bài", live: true,
      blocks: [
        { type: "cando", phase: "after",
          title: { vi: "Bây giờ bạn tự tin đến đâu?", en: "Now: how confident are you?" } },
        { type: "report", timing: true, survey: { times: ["under 20 min", "20–30 min", "30–45 min", "over 45 min"] },
          title: { vi: "Báo cáo · tải về và nộp trên Canvas", en: "Report · download it and submit on Canvas" } },
      ],
    },
  ],
};
})();
