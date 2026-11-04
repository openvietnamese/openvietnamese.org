/* VIET 203 (UNC Viet) — M4 T3 “Viết thư cho người thân” · Bài tập 3/3 · 🏆 Exit task (after Friday's class, by Sunday) · ≈ 30 minutes
   Fri class (slides 3): peer review of the HW2 reply, Southern merged pronouns (ảnh, chỉ, ổng, bả), a letter
   exchange in role with a classmate, and the task quiz. This page is the exit task from the taskbook (GRASPS):
   a real letter (250+ words) to a family member or friend in another city or country, revised from the feedback,
   self-rated on the task rubric, read aloud for the person it is written to. Optional: post it on the Padlet.
   GRASPS and standards from taskbook/m10t3.html (Huy Phung, 2024); everything else original. Engine: ../assets/bv.js. */
(function () {

window.BV_CHAPTER = {
  id: 4,
  titleVi: "Viết thư cho người thân · Bài tập 3: Lá thư của bạn",
  titleEn: "Write a letter to a family member · Homework 3: your own letter (exit task)",
  description: "VIET 203, Module 4 Task 3, homework 3 of 3 — the exit task: write and send a real letter in Vietnamese (250+ words) to a family member or friend who lives in another city or country, rate it on the task rubric, and record yourself reading it. About 30 minutes.",
  color: "#9a3412",
  badge: { icon: "🏆", name: "Lá thư của bạn · Your letter" },
  rubricLevels: [
    { vi: "Cần cố gắng", en: "Developing" },
    { vi: "Đạt", en: "Meets" },
    { vi: "Xuất sắc", en: "Exceeds" },
  ],

  cando: [
    { vi: "Tôi có thể viết một lá thư 250 từ cho người thân, kể về cuộc sống, suy nghĩ và cảm xúc của tôi.", en: "I can write a 250-word letter to a family member about my life, thoughts and feelings." },
    { vi: "Tôi có thể hỏi thăm cuộc sống của người nhận.", en: "I can ask about the reader’s life." },
    { vi: "Tôi có thể chọn xưng hô, lời chào và lời kết hợp với người nhận.", en: "I can choose pronouns, a salutation and an ending that fit the reader." },
    { vi: "Tôi có thể sửa bài viết của tôi dựa vào góp ý.", en: "I can revise my writing using feedback." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập 3 · bài cuối của nhiệm vụ · nộp trước Chủ Nhật · khoảng 30 phút.", en: "Homework 3 · the exit task · due Sunday · about 30 minutes." },
      blocks: [
        { type: "html", title: { vi: "🏆 Nhiệm vụ cuối · Exit task", en: "Exit task" }, html: `
          <p>This week you read Mom’s letter, answered it and wrote to a classmate in role. Now write a <strong>real</strong> letter — to someone in your own family, or a friend, who lives in another city or country. If you can, send it to them!</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>G</th><td><strong>Goal</strong> · Write a letter sharing your recent experiences, thoughts and feelings, and asking about their life.</td></tr>
            <tr><th>R</th><td><strong>Role</strong> · Yourself — you want to keep a good relationship with someone far away, in Vietnamese.</td></tr>
            <tr><th>A</th><td><strong>Audience</strong> · A family member or friend in another city or country (ông bà, bố mẹ, cô chú, anh chị em, a friend …).</td></tr>
            <tr><th>S</th><td><strong>Situation</strong> · You haven’t seen them for a while and want to catch up.</td></tr>
            <tr><th>P</th><td><strong>Product</strong> · A letter in Vietnamese, 250–400 words, typed below. Optional: share it on the class Padlet.</td></tr>
            <tr><th>S</th><td><strong>Standards</strong> · At least 250 words · the right tone for this reader · an opening, a body and a closing · accurate grammar, vocabulary and letter phrases · evidence of revision (use Friday’s feedback).</td></tr>
          </table></div>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Chuẩn bị</td><td>Check common letter mistakes · Southern pronouns</td><td>4′</td></tr>
            <tr><td>2️⃣ Viết</td><td>✍️ Your letter (250+ words)</td><td>20′</td></tr>
            <tr><td>3️⃣ Đánh giá</td><td>Rate your letter on the task rubric · say what you changed</td><td>3′</td></tr>
            <tr><td>4️⃣ Nói</td><td>Read your letter aloud for the person you wrote to</td><td>3′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Quick Feedback · download the report and upload it to Canvas</td><td>2′</td></tr>
          </table></div>
          <p><small>You may start from your reply to Mom or your Friday letter — but this one goes to a real person, so the content will change. Pasting is turned off in the writing box.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ CHUẨN BỊ ═══════════════ */
    {
      id: "prep", icon: "1️⃣", label: "Chuẩn bị",
      intro: { vi: "Những lỗi hay gặp trong thư, và đại từ miền Nam.", en: "Common letter mistakes, and Southern pronouns." },
      blocks: [
        { type: "mc", id: "fix", strand: "language", mins: 2,
          title: { vi: "Câu nào tốt hơn?", en: "Which is better?" },
          instr: { vi: "Những lỗi các bạn hay gặp trong bản nháp. Chọn câu tốt hơn.", en: "Mistakes that often show up in drafts. Pick the better version." },
          items: [
            { q: "Dòng ngày tháng:", opts: ["Chapel Hill, ngày 15 tháng 11 năm 2026", "Chapel Hill, tháng 11 ngày 15, 2026"], correct: "Chapel Hill, ngày 15 tháng 11 năm 2026", keepOrder: true, why: { "Chapel Hill, tháng 11 ngày 15, 2026": "That’s the English order. Vietnamese goes day → month → year: ngày 15 tháng 11 năm 2026." } },
            { q: "Thư gửi ông nội:", opts: ["Ông có khỏe không ạ? Cháu nhớ ông lắm.", "Bạn có khỏe không? Tôi nhớ bạn lắm."], correct: "Ông có khỏe không ạ? Cháu nhớ ông lắm.", keepOrder: true, why: { "Bạn có khỏe không? Tôi nhớ bạn lắm.": "Keep family pronouns the whole way through: ông – cháu, not bạn – tôi." } },
            { q: "Hỏi thăm người nhận:", opts: ["Dạo này anh thế nào? Công việc của anh có bận không?", "Anh viết thư cho em đi."], correct: "Dạo này anh thế nào? Công việc của anh có bận không?", keepOrder: true, explain: "A letter is a conversation: ask about their life, not just tell about yours." },
            { q: "Cuối thư gửi chị gái:", opts: ["Em dừng bút đây. Chúc chị luôn vui vẻ nhé! Em của chị, Vy", "Trân trọng, Vy"], correct: "Em dừng bút đây. Chúc chị luôn vui vẻ nhé! Em của chị, Vy", keepOrder: true },
          ] },

        { type: "mc", id: "south", strand: "language", mins: 2,
          title: { vi: "Đại từ miền Nam · Ảnh, chỉ, ổng, bả", en: "Southern pronouns: ảnh, chỉ, ổng, bả" },
          instr: { vi: "Như ở lớp hôm thứ Sáu: nhiều người miền Nam nói ảnh = anh ấy, chỉ = chị ấy, ổng = ông ấy, bả = bà ấy. Trong thư, bạn thường viết dạng đầy đủ.", en: "As in Friday’s class: many Southern speakers say ảnh = anh ấy, chỉ = chị ấy, ổng = ông ấy, bả = bà ấy. In a letter you usually write the full form." },
          items: [
            { q: "Má nói: “Ảnh mới đi làm về.” Ảnh là …", say: "Ảnh mới đi làm về.", opts: ["anh ấy", "ảnh (a photo)", "ông ấy"], correct: "anh ấy", explain: "Context tells you: a photo can’t come home from work!" },
            { q: "“Bả nấu ăn ngon lắm.” = …", say: "Bả nấu ăn ngon lắm.", opts: ["Bà ấy nấu ăn ngon lắm.", "Bạn ấy nấu ăn ngon lắm.", "Bác ấy nấu ăn ngon lắm."], correct: "Bà ấy nấu ăn ngon lắm." },
            { q: "“Chỉ học ở Sài Gòn.” = …", say: "Chỉ học ở Sài Gòn.", opts: ["Chị ấy học ở Sài Gòn.", "Chú ấy học ở Sài Gòn.", "Cháu ấy học ở Sài Gòn."], correct: "Chị ấy học ở Sài Gòn.", explain: "Careful: chỉ also means “only” (Tôi chỉ có một chị). Context decides." },
          ] },
      ],
    },

    /* ═══════════════ VIẾT ═══════════════ */
    {
      id: "write", icon: "2️⃣", label: "Viết",
      intro: { vi: "Viết lá thư của bạn. Đọc lại góp ý của bạn cùng lớp trước khi viết.", en: "Write your letter. Read your classmate’s feedback again before you start." },
      blocks: [
        { type: "writing", id: "my-letter", strand: "output", mins: 20,
          title: { vi: "Viết · Lá thư gửi người thân", en: "Write: your letter to a family member" },
          prompt: { vi: "Viết thư (250–400 từ) cho một người thân hoặc một người bạn đang sống ở thành phố hoặc nước khác. Kể về cuộc sống, suy nghĩ và cảm xúc của bạn gần đây, và hỏi thăm cuộc sống của họ.", en: "Write a letter (250–400 words) to a family member or friend who lives in another city or country. Share your recent life, thoughts and feelings, and ask about theirs." },
          minWords: 250,
          checklist: [
            { vi: "Nơi viết, ngày … tháng … năm …", en: "Place and date" },
            { vi: "Lời chào hợp với người nhận", en: "A salutation that fits the reader" },
            { vi: "Đầu thư: lý do viết thư, hỏi thăm sức khỏe", en: "Opening: why you’re writing; ask how they are" },
            { vi: "Kể về việc học, cuộc sống, bạn bè (ít nhất ba ý)", en: "Your studies, life, friends (at least three topics)" },
            { vi: "Suy nghĩ và cảm xúc: nhớ, vui, lo, tự hào …", en: "Thoughts and feelings" },
            { vi: "Hỏi thăm cuộc sống của người nhận (ít nhất hai câu hỏi)", en: "Ask about their life (at least two questions)" },
            { vi: "Về … thì … / Còn … thì … để chuyển ý", en: "Về / Còn … thì … to move between topics" },
            { vi: "Xưng hô đúng từ đầu đến cuối", en: "The right pronouns all the way through" },
            { vi: "Lời chúc, lời kết và chữ ký", en: "Wishes, an ending and your name" },
          ] },
      ],
    },

    /* ═══════════════ ĐÁNH GIÁ ═══════════════ */
    {
      id: "assess", icon: "3️⃣", label: "Đánh giá",
      intro: { vi: "Tự chấm lá thư theo tiêu chí của nhiệm vụ.", en: "Rate your letter on the task rubric." },
      blocks: [
        { type: "rubric", id: "task-rubric", strand: "output", mins: 2,
          title: { vi: "Tự chấm theo tiêu chí", en: "Rate your letter" },
          task: { vi: "Thầy sẽ chấm bằng chính bảng này.", en: "Your teacher grades with this same rubric." },
          criteria: [
            { vi: "Nhiệm vụ và nội dung", en: "Task and content", desc: ["Under 250 words, or little about you / them", "250+ words; your life, feelings, and questions for them", "Rich detail; reads like a real letter to this person"] },
            { vi: "Bố cục", en: "Organisation", desc: ["Parts of the letter missing", "Date, salutation, opening, body, closing", "Clear paragraphs and smooth links between topics"] },
            { vi: "Xưng hô và giọng văn", en: "Pronouns and tone", desc: ["Pronouns or tone don’t fit the reader", "Fits the reader throughout", "Warm, natural and just right for this person"] },
            { vi: "Ngôn ngữ", en: "Language", desc: ["Errors often get in the way", "Some errors, meaning is clear", "Few errors, varied sentences and letter phrases"] },
            { vi: "Sửa bài", en: "Revision", desc: ["Little change from the draft", "Some feedback used", "Feedback used, and you explain what changed"] },
          ] },

        { type: "writing", id: "what-changed", strand: "output", mins: 1, allowPaste: true,
          title: { vi: "Bạn đã sửa gì?", en: "What did you change?" },
          prompt: { vi: "Viết 2–3 câu (tiếng Việt hoặc tiếng Anh): bạn cùng lớp góp ý gì, và bạn đã sửa gì?", en: "Write 2–3 sentences (Vietnamese or English): what feedback did you get, and what did you change?" },
          minWords: 15,
          checklist: [
            { vi: "Một góp ý bạn đã dùng", en: "One piece of feedback you used" },
            { vi: "Một điều bạn tự sửa", en: "One thing you fixed yourself" },
          ] },
      ],
    },

    /* ═══════════════ NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Nói",
      intro: { vi: "Đọc to lá thư như bạn đang gọi video cho người thân.", en: "Read your letter aloud, as if on a video call with the person you wrote to." },
      blocks: [
        { type: "record", id: "read-letter", strand: "fluency", mins: 3,
          title: { vi: "Đọc thư cho người thân nghe", en: "Read it to them" },
          instr: { vi: "Ghi âm phần đầu thư và một đoạn của phần chính (khoảng 1 phút). Đọc rõ, đúng thanh điệu, có cảm xúc. Nếu được, gửi bản ghi âm cho người thân của bạn!", en: "Record the opening and one paragraph of the body (about 1 minute). Clear, careful tones, with feeling. If you can, send the recording to them too!" },
          prompts: [
            { vi: "Đọc to: lời chào, đầu thư và một đoạn trong lá thư của bạn.", en: "Read aloud: the salutation, the opening and one paragraph of your letter.", model: false },
          ] },

        { type: "html", title: { vi: "Chia sẻ (không bắt buộc)", en: "Share it (optional)" }, strand: "output", mins: 0, html: `
          <p>Want others to read your letter? Post it on the <a href="https://padlet.com/asakach/vi-oer_exit-task-m10_t3-write-a-letter-to-your-family-member-5b3x9t27pt6btnor" target="_blank" rel="noopener">Exit Task Exhibition Padlet ↗</a> — only if you and the person you wrote to are happy to share it. Leave out addresses and family details you’d rather keep private.</p>` },
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
