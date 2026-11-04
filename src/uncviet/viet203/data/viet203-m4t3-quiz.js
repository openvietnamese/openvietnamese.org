/* VIET 203 (UNC Viet) — M4 T3 “Viết thư cho người thân” · Kiểm tra cuối nhiệm vụ · End-of-task quiz · ≈ 20 minutes
   Taken in the last 15–20 minutes of Friday's class (slides 3), or at home if class runs over.
   Part 1 reads a NEW letter (bà nội in Huế → cháu at UNC) — the interpretive check of the week's language;
   Part 2 checks salutations, endings, register and letter phrases; Part 3 is a short written reply (60–100 words).
   Scoring: Parts 1–2 are auto-scored — the report's Mastery % is first-try accuracy (an item locks after two tries);
   Part 3 is teacher-graded (suggested: 10 points = content 4 · register and letter form 3 · language 3).
   All content original (Huy Phung / Open Vietnamese). Fact used: Huế is 12 hours ahead of Chapel Hill in winter
   (US standard time, 1/11/2026 – 14/3/2027). Engine: ../assets/bv.js. */
(function () {

const LETTER = `
  <div class="letter" lang="vi" style="background:#fffaf2;border:1px solid #ead9c2;border-radius:12px;padding:18px 22px;font-family:Newsreader,serif;font-size:18px;line-height:1.7">
    <p style="text-align:right;margin:0 0 8px"><em>Huế, ngày 2 tháng 11 năm 2026</em></p>
    <p>Cháu yêu quý của bà,</p>
    <p>Hôm qua bà nhận được tấm thiệp và mấy tấm ảnh cháu gửi về. Bà vui lắm! Cháu lớn quá, bà ngồi nhìn ảnh mãi không chán.</p>
    <p>Dạo này ở Huế mưa nhiều, trời bắt đầu lạnh. Bà vẫn khỏe, sáng nào cũng đi bộ ra chợ với cô Hạnh. Chỉ có cái chân hơi đau khi trời lạnh thôi, cháu đừng lo nhé.</p>
    <p>Tháng trước cả nhà làm giỗ ông. Ai cũng nhắc đến cháu. Bà biết cháu học bận, nhưng mỗi tuần cháu nhớ gọi điện cho bà một lần nhé. Bà không biết nhắn tin, nên cháu cứ gọi vào buổi tối, khoảng tám giờ, lúc bà xem thời sự xong.</p>
    <p>Mùa hè năm sau cháu có về Việt Nam không? Bà sẽ nấu bún bò cho cháu ăn.</p>
    <p>Bà dừng bút đây. Chúc cháu học giỏi, ăn ngon, ngủ ngon.</p>
    <p style="text-align:right;margin:0">Thương cháu nhiều,<br>Bà nội</p>
  </div>
  <p class="report-note" style="margin-top:10px">Từ mới · New words: <em>tấm thiệp</em> a card · <em>mãi không chán</em> never tire of it · <em>giỗ</em> death anniversary (a family remembrance meal) · <em>nhắc đến</em> to mention · <em>thời sự</em> the TV news</p>`;

window.BV_CHAPTER = {
  id: 4,
  titleVi: "Viết thư cho người thân · Kiểm tra cuối nhiệm vụ",
  titleEn: "Write a letter to a family member · End-of-task quiz",
  description: "VIET 203, Module 4 Task 3 — end-of-task quiz: read a new letter from a grandmother, check salutations, endings and letter phrases, and write a short reply. About 20 minutes.",
  color: "#7a2a3a",
  badge: { icon: "📝", name: "Kiểm tra · Task quiz" },

  cando: [
    { vi: "Tôi có thể đọc một lá thư mới và tìm thông tin chính.", en: "I can read a new letter and find the main information." },
    { vi: "Tôi có thể chọn lời chào, lời kết và cụm từ hợp với người nhận.", en: "I can choose salutations, endings and phrases that fit the reader." },
    { vi: "Tôi có thể viết một lá thư trả lời ngắn cho ông bà.", en: "I can write a short reply to a grandparent." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Kiểm tra · khoảng 20 phút · làm một mình.", en: "Quiz · about 20 minutes · on your own." },
      blocks: [
        { type: "html", title: { vi: "Hướng dẫn", en: "Instructions" }, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Nội dung · What</th><th>⏱</th><th>Điểm · Points</th></tr>
            <tr><td>1️⃣ Đọc hiểu</td><td>A new letter: bà nội writes from Huế · 7 questions</td><td>8′</td><td rowspan="2">auto-scored<br>(first try counts)</td></tr>
            <tr><td>2️⃣ Ngôn ngữ</td><td>Salutations, endings, letter phrases · 5 questions + 1 text</td><td>5′</td></tr>
            <tr><td>3️⃣ Viết</td><td>A short reply to bà (60–100 words)</td><td>7′</td><td>teacher-graded</td></tr>
          </table></div>
          <ul>
            <li>Work <strong>on your own</strong>, without notes, a dictionary or a translator.</li>
            <li>Your <strong>first choice</strong> counts. If it is wrong you get one more try for partial credit, then the answer is shown.</li>
            <li>When you finish, type your name in <strong>Nộp bài</strong>, download the report and upload it to Canvas.</li>
          </ul>` },
      ],
    },

    /* ═══════════════ ĐỌC HIỂU ═══════════════ */
    {
      id: "read", icon: "1️⃣", label: "Đọc hiểu",
      intro: { vi: "Đọc thư của bà nội, rồi trả lời câu hỏi.", en: "Read Grandma’s letter, then answer the questions." },
      blocks: [
        { type: "html", title: { vi: "Thư của bà nội", en: "Grandma’s letter" }, strand: "input", mins: 0, html: LETTER },

        { type: "mc", id: "read-q", strand: "input", mins: 8,
          title: { vi: "Câu hỏi đọc hiểu", en: "Reading questions" },
          instr: { vi: "Đọc lại thư ở trên nếu cần.", en: "Look back at the letter as often as you need." },
          items: [
            { q: "Bà viết thư ở đâu, khi nào?", opts: ["Ở Huế, ngày 2 tháng 11 năm 2026", "Ở Chapel Hill, ngày 2 tháng 11 năm 2026", "Ở Huế, ngày 11 tháng 2 năm 2026"], correct: "Ở Huế, ngày 2 tháng 11 năm 2026" },
            { q: "Bà vừa nhận được gì?", opts: ["một tấm thiệp và mấy tấm ảnh", "một tin nhắn và một cuộc gọi", "một món quà và một lá thư dài"], correct: "một tấm thiệp và mấy tấm ảnh" },
            { q: "Sức khỏe của bà thế nào?", opts: ["Bà khỏe, chỉ hơi đau chân khi trời lạnh.", "Bà bị ốm, phải nằm ở nhà.", "Bà khỏe, nhưng không đi chợ được."], correct: "Bà khỏe, chỉ hơi đau chân khi trời lạnh." },
            { q: "Tháng trước, cả nhà làm gì?", opts: ["làm giỗ ông", "đi du lịch ở Huế", "tổ chức sinh nhật bà"], correct: "làm giỗ ông" },
            { q: "Bà muốn cháu làm gì?", opts: ["gọi điện cho bà mỗi tuần một lần", "nhắn tin cho bà mỗi ngày", "viết thư cho bà mỗi tháng"], correct: "gọi điện cho bà mỗi tuần một lần", why: { "nhắn tin cho bà mỗi ngày": "Look again: bà không biết nhắn tin." } },
            { q: "Bà muốn cháu gọi lúc tám giờ tối ở Huế. Huế nhanh hơn Chapel Hill 12 tiếng. Ở Chapel Hill, cháu gọi lúc mấy giờ?", opts: ["tám giờ sáng", "tám giờ tối", "tám giờ đêm"], correct: "tám giờ sáng", keepOrder: true },
            { q: "Lá thư thân mật. Những từ nào cho bạn biết?", opts: ["Cháu yêu quý của bà · Thương cháu nhiều", "Hôm qua · Tháng trước", "Bà dừng bút đây · Mùa hè năm sau"], correct: "Cháu yêu quý của bà · Thương cháu nhiều" },
          ] },
      ],
    },

    /* ═══════════════ NGÔN NGỮ ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngôn ngữ",
      intro: { vi: "Lời chào, lời kết và cụm từ trong thư.", en: "Salutations, endings and letter phrases." },
      blocks: [
        { type: "mc", id: "lang-q", strand: "language", mins: 3,
          title: { vi: "Chọn câu đúng", en: "Choose the best answer" },
          items: [
            { q: "Cháu viết thư trả lời bà. Cháu bắt đầu:", opts: ["Bà nội kính yêu,", "Kính gửi bà nội,", "Bà nội thân mến,"], correct: "Bà nội kính yêu," },
            { q: "Bạn viết email cho văn phòng Chương trình Tiếng Việt. Bạn kết thúc:", opts: ["Trân trọng,", "Thương nhiều,", "Yêu cả nhà,"], correct: "Trân trọng," },
            { q: "Viết cho em trai đang học ở Texas. Câu nào hợp nhất?", opts: ["Em yêu quý của chị,", "Kính gửi em,", "Thưa em,"], correct: "Em yêu quý của chị," },
            { q: "Bà hỏi: “Mùa hè năm sau cháu có về Việt Nam không?” Câu trả lời nào hay nhất?", opts: ["Còn mùa hè năm sau thì cháu chắc chắn sẽ về thăm bà ạ.", "Mùa hè năm sau thì về Việt Nam có.", "Về thì mùa hè năm sau cháu Việt Nam."], correct: "Còn mùa hè năm sau thì cháu chắc chắn sẽ về thăm bà ạ." },
            { q: "Câu nào có lỗi xưng hô trong thư gửi bà?", opts: ["Bạn có khỏe không? Tôi nhớ bạn lắm.", "Bà có khỏe không ạ? Cháu nhớ bà lắm.", "Cháu chúc bà luôn mạnh khỏe."], correct: "Bạn có khỏe không? Tôi nhớ bạn lắm." },
          ] },

        { type: "cloze", id: "lang-cloze", strand: "language", mins: 2,
          title: { vi: "Điền từ · Thư của cháu", en: "Fill in: the grandchild’s reply" },
          items: [
            { text: "Cháu đã nhận được thư của bà rồi. Lâu rồi cháu không {0} tin gì của bà, nên cháu vui lắm. Ở đây cháu có nhiều {1} thú vị. Cháu sẽ nhớ giữ {2} với bà thường xuyên. Cháu {3} bút đây. Cháu chúc bà luôn mạnh {4}.", answers: ["nghe", "trải nghiệm", "liên lạc", "dừng", "khỏe"], bank: ["nghe", "trải nghiệm", "liên lạc", "dừng", "khỏe", "nói", "hỏi thăm", "chia sẻ"] },
          ] },
      ],
    },

    /* ═══════════════ VIẾT ═══════════════ */
    {
      id: "write", icon: "3️⃣", label: "Viết",
      intro: { vi: "Viết thư trả lời bà nội.", en: "Write back to Grandma." },
      blocks: [
        { type: "writing", id: "reply-ba", strand: "output", mins: 7,
          title: { vi: "Viết · Thư trả lời bà", en: "Write: a reply to Grandma" },
          prompt: { vi: "Bạn là cháu. Viết thư ngắn (60–100 từ) trả lời bà nội: cảm ơn bà, hỏi thăm sức khỏe của bà, trả lời câu hỏi của bà, và nói khi nào bạn sẽ gọi điện cho bà (giờ Chapel Hill).", en: "You are the grandchild. Write a short reply (60–100 words): thank Grandma, ask about her health, answer her question, and say when you will call her (Chapel Hill time)." },
          minWords: 60,
          checklist: [
            { vi: "Nơi viết, ngày tháng; lời chào", en: "Place, date and salutation" },
            { vi: "Cảm ơn bà, hỏi thăm sức khỏe", en: "Thank her; ask about her health" },
            { vi: "Trả lời: mùa hè năm sau", en: "Answer: next summer" },
            { vi: "Khi nào gọi điện cho bà", en: "When you will call" },
            { vi: "Xưng hô bà – cháu; lời kết và tên", en: "bà – cháu throughout; ending and name" },
          ] },
      ],
    },

    /* ═══════════════ NỘP BÀI ═══════════════ */
    {
      id: "report", icon: "📊", label: "Nộp bài", live: true,
      blocks: [
        { type: "report", timing: true, title: { vi: "Báo cáo · tải về và nộp trên Canvas", en: "Report · download it and submit on Canvas" } },
      ],
    },
  ],
};
})();
