/* VIET 203 (UNC Viet) — M4 T3 “Viết thư cho người thân” · Bài tập 2/3 (after Wednesday's class) · ≈ 30 minutes
   Wed class (slides 2) taught how to answer a letter: opening moves, Về / Còn … thì … to move between topics,
   answering advice (Con sẽ nhớ … / Con hứa …), register; students planned and started their reply to Mom.
   This page: match Mom's questions to answers, build reply sentences, notice Về / Còn … thì …, a cloze reply,
   register check, dictation, then the full reply draft (150–250 words) with a checklist and a self-rubric.
   The draft is the one classmates review in Friday's class. All content original (Huy Phung / Open Vietnamese).
   Engine: ../assets/bv.js. */
(function () {

window.BV_CHAPTER = {
  id: 4,
  titleVi: "Viết thư cho người thân · Bài tập 2: Viết thư trả lời mẹ",
  titleEn: "Write a letter to a family member · Homework 2: reply to Mom",
  description: "VIET 203, Module 4 Task 3, homework 2 of 3 (after Wednesday’s class): answering a letter, Về / Còn … thì …, the right register for a letter to Mom, dictation, and your full reply draft (150–250 words). About 30 minutes.",
  color: "#9a3412",
  badge: { icon: "✍️", name: "Thư trả lời · The reply" },
  rubricLevels: [
    { vi: "Cần cố gắng", en: "Developing" },
    { vi: "Đạt", en: "Meets" },
    { vi: "Xuất sắc", en: "Exceeds" },
  ],

  cando: [
    { vi: "Tôi có thể trả lời từng câu hỏi trong một lá thư.", en: "I can answer each question in a letter." },
    { vi: "Tôi có thể chuyển ý bằng Về … thì … / Còn … thì ….", en: "I can move from topic to topic with Về … thì … / Còn … thì …." },
    { vi: "Tôi có thể viết thư cho mẹ với lời chào, xưng hô và lời kết thân mật.", en: "I can write to Mom with a warm salutation, the right pronouns and a warm ending." },
    { vi: "Tôi có thể viết một lá thư trả lời 150–250 từ có đầu thư, phần chính và cuối thư.", en: "I can write a 150–250 word reply with an opening, a body and a closing." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập 2 · sau buổi học thứ Tư · khoảng 30 phút.", en: "Homework 2 · after Wednesday’s class · about 30 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>In class you planned your reply to Mom and wrote the first lines. Today you finish it. On <strong>Friday</strong> a classmate reads your draft and gives you feedback — so bring your best version.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Lên ý</td><td>Mom’s questions → answers · build reply sentences</td><td>5′</td></tr>
            <tr><td>2️⃣ Ngôn ngữ</td><td><em>Về … thì … / Còn … thì …</em> · a reply to complete · right for Mom?</td><td>8′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>Dictation: letter phrases</td><td>3′</td></tr>
            <tr><td>4️⃣ Viết</td><td>✍️ Your reply to Mom (150–250 words) · rate your draft</td><td>14′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · download the report (it includes your letter) and upload it to Canvas</td><td>3′</td></tr>
          </table></div>
          <p><small>Your letter must be typed here, by you — pasting is turned off in the writing box. No Vietnamese keyboard? Use the letter buttons above the box, or Telex in the dictation.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ LÊN Ý ═══════════════ */
    {
      id: "plan", icon: "1️⃣", label: "Lên ý",
      intro: { vi: "Mẹ hỏi gì? Con trả lời thế nào?", en: "What did Mom ask? How do you answer?" },
      blocks: [
        { type: "match", id: "ask-answer", strand: "language", mins: 3,
          title: { vi: "Ghép · Mẹ hỏi — con trả lời", en: "Match: Mom asks — you answer" },
          instr: { vi: "Ghép câu hỏi trong thư của mẹ với câu trả lời hợp nhất.", en: "Match each question in Mom’s letter with the best answer." },
          pairs: [
            { a: "Con đang ở ký túc xá hay thuê nhà ngoài?", b: "Con đang ở ký túc xá với một bạn cùng phòng." },
            { a: "Phòng của con có đầy đủ tiện nghi không?", b: "Phòng con hơi nhỏ nhưng có đủ bàn, giường và tủ." },
            { a: "Con có ăn uống và nghỉ ngơi đủ không?", b: "Con ăn ở nhà ăn của trường, ngày ba bữa." },
            { a: "Môn nào khó nhất?", b: "Môn hóa học khó nhất, nhưng con đang cố gắng." },
            { a: "Lễ Tạ Ơn năm nay con có về nhà không?", b: "Lễ Tạ Ơn này con sẽ bay về nhà vào thứ Tư." },
          ] },

        { type: "builder", id: "build", strand: "language", mins: 2,
          title: { vi: "Xếp câu trả lời", en: "Build reply sentences" },
          items: [
            { en: "As for my studies, this semester I’m taking four classes.", tiles: ["Về", "việc học", "thì", "học kỳ này", "con", "học", "bốn môn"], answer: "Về việc học thì học kỳ này con học bốn môn." },
            { en: "And as for food, Mom, don’t worry.", tiles: ["Còn", "chuyện ăn uống", "thì", "mẹ", "đừng", "lo", "nhé"], answer: "Còn chuyện ăn uống thì mẹ đừng lo nhé." },
            { en: "I will remember to keep in touch with you often.", tiles: ["Con", "sẽ", "nhớ", "giữ liên lạc", "với", "mẹ", "thường xuyên"], answer: "Con sẽ nhớ giữ liên lạc với mẹ thường xuyên." },
          ] },
      ],
    },

    /* ═══════════════ NGÔN NGỮ ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngôn ngữ",
      intro: { vi: "Một lá thư hay trả lời từng câu hỏi, chuyển ý rõ ràng, và đúng giọng.", en: "A good reply answers each question, moves clearly from topic to topic, and gets the tone right." },
      blocks: [
        { type: "notice", id: "notice-thi", strand: "language", mins: 3,
          title: { vi: "Khám phá · Về … thì … / Còn … thì …", en: "Discover: Về … thì … / Còn … thì …" },
          examples: [
            { vi: "<strong>Về</strong> chỗ ở <strong>thì</strong> con đang ở ký túc xá.", en: "As for where I live, I’m in a dorm." },
            { vi: "<strong>Còn</strong> việc học <strong>thì</strong> con thấy hơi khó.", en: "And as for school, I find it a bit hard." },
            { vi: "<strong>Còn</strong> Lễ Tạ Ơn <strong>thì</strong> chắc chắn con sẽ về.", en: "And Thanksgiving — I’ll definitely come home." },
          ],
          q: "Bạn đã kể về chỗ ở. Bây giờ bạn chuyển sang việc học. Bạn viết:", qEn: "You’ve written about where you live. Now you move on to school. You write:",
          opts: ["Còn việc học thì con học bốn môn.", "Việc học về thì con học bốn môn.", "Thì việc học, con học bốn môn."], correct: "Còn việc học thì con học bốn môn.",
          why: { "Việc học về thì con học bốn môn.": "Về comes before the topic: Về việc học thì …", "Thì việc học, con học bốn môn.": "Thì comes after the topic, before what you say about it: (Về / Còn) việc học thì …" },
          explain: "(Về / Còn) + topic + thì + what you say about it. Về opens a topic; Còn moves on to the next one (“and as for …”).",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>Open the reply</strong>: <em>Con đã nhận được thư của mẹ rồi.</em> · <em>Con rất vui khi đọc thư mẹ.</em> · <em>Con xin lỗi vì lâu rồi con chưa viết thư cho mẹ.</em> <button class="tts" data-say="Con đã nhận được thư của mẹ rồi. Con rất vui khi đọc thư mẹ.">🔊</button></td><td>đầu thư</td></tr>
              <tr><td><strong>Answer, topic by topic</strong>: <em>Mẹ hỏi con … Về … thì … · Còn … thì …</em> <button class="tts" data-say="Mẹ hỏi con có ăn uống đủ không. Về chuyện ăn uống thì mẹ đừng lo.">🔊</button></td><td>phần chính</td></tr>
              <tr><td><strong>Answer advice</strong>: <em>Con sẽ nhớ …</em> · <em>Con hứa sẽ không …</em> · <em>Mẹ yên tâm nhé.</em> <button class="tts" data-say="Con hứa sẽ không lái xe khi đã uống rượu bia. Mẹ yên tâm nhé.">🔊</button></td><td>phần chính</td></tr>
              <tr><td><strong>Close</strong>: <em>Con dừng bút đây.</em> · <em>Con chúc bố mẹ luôn mạnh khỏe và vui vẻ.</em> · <em>Con nhớ mẹ nhiều lắm.</em> <button class="tts" data-say="Con dừng bút đây. Con chúc bố mẹ luôn mạnh khỏe và vui vẻ.">🔊</button></td><td>cuối thư</td></tr>
            </table>` },

        { type: "cloze", id: "reply-cloze", strand: "input", mins: 3,
          title: { vi: "Thư trả lời của Emma", en: "Emma’s reply" },
          instr: { vi: "Emma viết thư trả lời mẹ. Điền từ.", en: "Emma writes back to her mom. Fill in the blanks." },
          items: [
            { text: "Mẹ kính yêu, con đã {0} được thư của mẹ rồi. Con rất vui {1} đọc thư mẹ. {2} chỗ ở thì con đang ở ký túc xá. {3} việc học thì học kỳ này con học bốn môn, {4} là môn hóa học rất khó. Con {5} bút đây.", answers: ["nhận", "khi", "Về", "Còn", "đặc biệt", "dừng"], bank: ["nhận", "khi", "Về", "Còn", "đặc biệt", "dừng", "gửi", "nếu", "hết"] },
          ] },

        { type: "mc", id: "register", strand: "language", mins: 2,
          title: { vi: "Hợp với thư gửi mẹ không?", en: "Right for a letter to Mom?" },
          items: [
            { q: "Kính gửi mẹ,", opts: ["✓ hợp", "✗ trang trọng quá"], correct: "✗ trang trọng quá", keepOrder: true, explain: "Try Mẹ kính yêu, or Mẹ yêu quý, instead." },
            { q: "Mẹ ơi, con nhớ mẹ lắm!", opts: ["✓ hợp", "✗ trang trọng quá"], correct: "✓ hợp", keepOrder: true },
            { q: "Trân trọng, Emma Nguyễn", opts: ["✓ hợp", "✗ trang trọng quá"], correct: "✗ trang trọng quá", keepOrder: true, explain: "End with Con của mẹ, or Yêu mẹ nhiều, + your name." },
            { q: "Con chúc bố mẹ luôn mạnh khỏe và vui vẻ.", opts: ["✓ hợp", "✗ trang trọng quá"], correct: "✓ hợp", keepOrder: true },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Những cụm từ bạn sẽ viết trong thư.", en: "Phrases you’ll write in your letter." },
      blocks: [
        { type: "type", id: "dict", strand: "language", mins: 3,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: kisnh yeeu → kính yêu, nhows → nhớ.", en: "Tap Listen, then type. Telex works: kisnh yeeu → kính yêu, nhows → nhớ." },
          items: [
            { say: "mẹ kính yêu", telex: true, answers: ["mẹ kính yêu"], show: "Mẹ kính yêu," },
            { say: "con nhớ mẹ nhiều lắm", telex: true, answers: ["con nhớ mẹ nhiều lắm"] },
            { say: "ký túc xá", telex: true, answers: ["ký túc xá", "kí túc xá"] },
            { say: "Lễ Tạ Ơn", telex: true, answers: ["lễ tạ ơn"], show: "Lễ Tạ Ơn" },
            { say: "giữ gìn sức khỏe", telex: true, answers: ["giữ gìn sức khỏe", "giữ gìn sức khoẻ"] },
          ] },
      ],
    },

    /* ═══════════════ VIẾT ═══════════════ */
    {
      id: "write", icon: "4️⃣", label: "Viết",
      intro: { vi: "Viết thư trả lời mẹ. Dùng kế hoạch bạn làm ở lớp hôm thứ Tư.", en: "Write your reply to Mom. Use the plan you made in Wednesday’s class." },
      blocks: [
        { type: "writing", id: "reply-mom", strand: "output", mins: 12,
          title: { vi: "Viết · Thư trả lời mẹ", en: "Write: your reply to Mom" },
          prompt: { vi: "Bạn là người con trong thư. Viết thư trả lời mẹ (150–250 từ). Trả lời các câu hỏi của mẹ, kể thêm một điều thú vị ở trường, và trả lời lời dặn của mẹ.", en: "You are the child in Mom’s letter. Write back (150–250 words): answer her questions, tell her one interesting thing about school, and answer her advice." },
          minWords: 150,
          checklist: [
            { vi: "Nơi viết, ngày … tháng … năm … (góc phải)", en: "Place and date, top right" },
            { vi: "Lời chào thân mật: Mẹ kính yêu, / Mẹ yêu quý,", en: "A warm salutation" },
            { vi: "Đầu thư: con đã nhận được thư, hỏi thăm bố mẹ", en: "Opening: you got the letter; ask how your parents are" },
            { vi: "Chỗ ở, phòng, ăn uống, nghỉ ngơi", en: "Where you live, your room, food and rest" },
            { vi: "Khó khăn (nếu có) và một điều thú vị ở trường", en: "Any difficulties, and one interesting thing at school" },
            { vi: "Các môn học, môn nào khó nhất", en: "Your classes, and the hardest one" },
            { vi: "Lễ Tạ Ơn: con có về nhà không", en: "Thanksgiving: are you coming home?" },
            { vi: "Trả lời lời dặn của mẹ: Con sẽ nhớ … / Con hứa …", en: "Answer Mom’s advice" },
            { vi: "Về … thì … / Còn … thì … (ít nhất hai lần)", en: "Về / Còn … thì … at least twice" },
            { vi: "Lời kết và chữ ký thân mật: Con của mẹ, / Yêu mẹ nhiều,", en: "A warm ending and your name" },
          ] },

        { type: "rubric", id: "self-rubric", strand: "output", mins: 2,
          title: { vi: "Tự chấm bản nháp", en: "Rate your draft" },
          task: { vi: "Đọc lại thư của bạn một lần, rồi chọn một mức cho mỗi tiêu chí. Thứ Sáu, một bạn cùng lớp sẽ chấm lại.", en: "Read your letter through once, then pick a level for each criterion. On Friday a classmate rates it too." },
          criteria: [
            { vi: "Nội dung", en: "Content", desc: ["Answers some of Mom’s questions", "Answers all her questions", "Answers all, plus details and feelings"] },
            { vi: "Bố cục", en: "Organisation", desc: ["Parts of the letter missing", "Date, salutation, opening, body, ending", "Clear paragraphs; Về / Còn … thì … guide the reader"] },
            { vi: "Xưng hô và giọng văn", en: "Pronouns and tone", desc: ["Mixed pronouns or too formal", "con – mẹ throughout, warm tone", "Warm and natural, like a real letter home"] },
            { vi: "Ngôn ngữ", en: "Language", desc: ["Errors often get in the way", "Some errors, meaning is clear", "Few errors, varied sentences and letter phrases"] },
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
