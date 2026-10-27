/* VIET 101 (UNC Viet) — Dự án nhóm · Group project: a skit (kịch ngắn), performed live or recorded
   Small groups (3–4) write and perform a 3–5 minute skit using Lessons 1–6 (Lesson 7 as a bonus) for a PUBLIC audience:
   the Vietnamese Learning Fest, Friday 13/11/2026 (live on stage or video screened). Timeline: weeks of 26/10, 2/11, 9/11.
   Rubric: simplified from the VIET 102 speaking rubric (Tasks & Functions 40 · Text Type 20 · Content/Vocabulary 10 ·
   Context/Register 10 · Accuracy/Comprehensibility 20) → 4 criteria: Task, story & audience 40 · Language 30 ·
   Pronunciation & clarity 20 · Culture & forms of address 10.
   Practice: VIET 100 Drama Studio (pronoun pairs, feeling cards, situations, twists) + process-drama warm-ups
   (freeze frame, hot seat, thought-tracking, emotion switch).
   All content original (Huy Phung). Step due dates are set on Canvas; the Fest date is fixed.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

const LEVELS = [
  { vi: "Cần cố gắng", en: "Developing" },
  { vi: "Đạt", en: "Meets" },
  { vi: "Xuất sắc", en: "Exceeds" },
];

window.BV_CHAPTER = {
  id: 1,
  titleVi: "Kịch ngắn của nhóm",
  titleEn: "Group project: a short skit",
  description: "VIET 101 group project: in groups of 3–4, write and perform a 3–5 minute skit in Vietnamese for the Vietnamese Learning Fest (November 13, 2026) — live on stage or as a video — using Lessons 1–6. Scenes, script guide, Drama Studio practice, rehearsal and the rubric.",
  color: "#9d174d",
  badge: { icon: "🎭", name: "Diễn viên · On stage" },
  rubricLevels: LEVELS,

  cando: [
    { vi: "Tôi có thể cùng nhóm viết một kịch bản ngắn có mở đầu, vấn đề và kết thúc.", en: "I can write a short script with my group: a beginning, a problem and an ending." },
    { vi: "Tôi có thể dùng đúng cách xưng hô (anh, chị, em, bạn, mình …) khi diễn.", en: "I can use the right forms of address (anh, chị, em, bạn, mình …) while acting." },
    { vi: "Tôi có thể diễn các câu thoại của tôi rõ ràng, không đọc kịch bản.", en: "I can perform my lines clearly without reading the script." },
  ],

  drama: {
    pairs: {
      ban_minh: { label: "bạn ↔ mình", peer: { call: "bạn", self: "mình", selfPl: "chúng mình" }, note: { vi: "Như Emma và Minh — bạn cùng lớp.", en: "Like Emma and Minh — classmates." } },
      ban_toi:  { label: "bạn ↔ tôi", peer: { call: "bạn", self: "tôi", selfPl: "chúng tôi" }, note: { vi: "Bạn mới quen, lịch sự.", en: "New acquaintances, polite." } },
      anh_em:   { label: "anh ↔ em", older: { call: "anh", self: "anh", selfPl: "các anh" }, younger: { call: "em", self: "em", selfPl: "chúng em" }, note: { vi: "Như anh Nam và Emma.", en: "Like anh Nam and Emma." } },
      chi_em:   { label: "chị ↔ em", older: { call: "chị", self: "chị", selfPl: "các chị" }, younger: { call: "em", self: "em", selfPl: "chúng em" }, note: { vi: "Như chị Linh và Emma.", en: "Like chị Linh and Emma." } },
      co_chau:  { label: "cô ↔ cháu", older: { call: "cô", self: "cô", selfPl: "các cô" }, younger: { call: "cháu", self: "cháu", selfPl: "chúng cháu" }, note: { vi: "Như mẹ của một người bạn và bạn.", en: "Like a friend’s mother and you." } },
      bac_chau: { label: "bác ↔ cháu", older: { call: "bác", self: "bác", selfPl: "các bác" }, younger: { call: "cháu", self: "cháu", selfPl: "chúng cháu" }, note: { vi: "Như bố của Minh và Emma.", en: "Like Minh’s father and Emma." } },
    },
    feelings: [
      { e: "😊", vi: "vui vẻ", en: "cheerful", tip: { vi: "Cười, giọng cao, nói nhanh.", en: "Smile, higher voice, quicker." } },
      { e: "😴", vi: "mệt", en: "tired", tip: { vi: "Ngáp, nói kéo dài.", en: "Yawn, drag the words out." } },
      { e: "😱", vi: "vội", en: "in a rush", tip: { vi: "Nói rất nhanh, nhìn đồng hồ.", en: "Very fast, keep checking the time." } },
      { e: "🤩", vi: "hào hứng", en: "excited", tip: { vi: "Giọng to, tay vung vẩy.", en: "Loud, hands moving." } },
      { e: "😳", vi: "ngại ngùng", en: "shy", tip: { vi: "Nói nhỏ, ít nhìn người kia.", en: "Quiet, little eye contact." } },
      { e: "🤫", vi: "thì thầm", en: "whispering", tip: { vi: "Nói thì thầm, nhìn xung quanh.", en: "Whisper, glance around." } },
      { e: "😠", vi: "bực mình", en: "annoyed", tip: { vi: "Nói ngắn, mạnh, khoanh tay.", en: "Short, sharp, arms crossed." } },
    ],
    contexts: [
      { e: "📚", vi: "Ở thư viện — phải nói nhỏ", en: "In the library — keep it down" },
      { e: "📱", vi: "Gọi điện, sóng yếu", en: "On the phone, bad signal" },
      { e: "☕", vi: "Ở quán cà phê, rất đông", en: "At a crowded café" },
      { e: "🍜", vi: "Ở nhà ăn, giờ ăn trưa", en: "In the dining hall at lunchtime" },
      { e: "🚌", vi: "Ở bến xe buýt, xe sắp đến", en: "At the bus stop, the bus is coming" },
      { e: "⏰", vi: "Năm phút trước giờ học", en: "Five minutes before class" },
    ],
    twists: [
      { vi: "Một người đến muộn mười lăm phút.", en: "Someone arrives fifteen minutes late." },
      { vi: "Thêm một câu hỏi “… năm nay bao nhiêu tuổi?”.", en: "Add an age question." },
      { vi: "Người B đã có kế hoạch khác — hai người phải đổi ngày.", en: "B already has other plans — find another day." },
      { vi: "Minh đến! Bây giờ phải giữ bí mật.", en: "Minh walks in — keep the secret!" },
      { vi: "Đổi kết thúc: câu cuối phải khác!", en: "Change the ending!" },
    ],
  },

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Dự án nhóm · Kịch ngắn · 3–4 người · 3–5 phút · diễn ở Vietnamese Learning Fest, thứ Sáu 13/11/2026.", en: "Group project · a short skit · 3–4 people · 3–5 minutes · performed for the public at the Vietnamese Learning Fest, Friday, November 13, 2026." },
      blocks: [
        { type: "html", title: { vi: "Dự án này là gì?", en: "What is this project?" }, html: `
          <p>With your group, you <strong>write and perform a short skit (kịch ngắn) in Vietnamese</strong> — an everyday scene with a small problem that your characters solve — and you perform it for a <strong>real, public audience</strong> at the <strong>Vietnamese Learning Fest on Friday, November 13, 2026</strong>. Use what you learned in Lessons 1–6: greetings and introductions, family and forms of address, age, dates, time and invitations (Lesson 7’s <em>đã / đang / sẽ</em> is a bonus).</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Nhóm · Group</th><td>3–4 students</td></tr>
            <tr><th>Thời gian · Length</th><td>3–5 minutes · everyone speaks about the same amount (at least 6 lines each)</td></tr>
            <tr><th>Khán giả · Audience</th><td>🎉 <strong>Vietnamese Learning Fest · thứ Sáu 13/11/2026</strong> — classmates, other Vietnamese learners, families, friends and the community. Many of them don’t speak Vietnamese (yet!).</td></tr>
            <tr><th>Hình thức · Format</th><td>🎤 <strong>Live</strong> on stage at the Fest, <strong>or</strong> 🎬 a <strong>video</strong> screened at the Fest (upload it to Canvas before the Fest) — your group chooses</td></tr>
            <tr><th>Bạn nộp · You submit</th><td>The group script · your lines recorded on this page · your self-check · an exit ticket and reflection (in English) · the report from 📊 Nộp bài</td></tr>
          </table></div>
          <p>Use this page as your guide from start to finish: each tab is one step. Your progress is saved in this browser.</p>
          <p><small>🔒 <strong>Your performance is public.</strong> It is performed or screened at the Fest, and the program may share photos or video of the event. If you would rather not appear on camera, tell your teacher early — you can take a voice-only or off-camera role and still get full credit.</small></p>` },

        { type: "html", title: { vi: "Các bước", en: "The steps" }, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Bước · Step</th><th>Bạn làm gì · What you do</th><th>Tab</th></tr>
            <tr><td>1 · Lập nhóm<br><small>tuần 26/10</small></td><td>Form a group of 3–4, choose a scene, give every member a character. Post your group and scene on Canvas.</td><td>1️⃣</td></tr>
            <tr><td>2 · Viết kịch bản<br><small>tuần 2/11</small></td><td>Write the script together and submit the draft — your teacher sends feedback.</td><td>2️⃣</td></tr>
            <tr><td>3 · Tập luyện<br><small>tuần 9/11</small></td><td>Fix the script, warm up in the Drama Studio, rehearse, record your own lines. Video groups: film and upload before the Fest.</td><td>3️⃣ 4️⃣</td></tr>
            <tr><td>4 · Biểu diễn<br><small><strong>thứ Sáu 13/11</strong></small></td><td>🎉 <strong>Vietnamese Learning Fest</strong>: perform live, or watch your video with the audience. Then rate your group with the rubric, write your exit ticket and reflection, download and submit the report.</td><td>5️⃣ 📊</td></tr>
          </table></div>
          <p><small>Exact due dates for steps 1–3 (and the video upload) are on Canvas. The Fest date is fixed: <strong>Friday, November 13, 2026</strong>.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Sau khi diễn, bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again after the performance." } },
      ],
    },

    /* ═══════════════ CHỌN CẢNH ═══════════════ */
    {
      id: "scene", icon: "1️⃣", label: "Chọn cảnh",
      intro: { vi: "Chọn một cảnh — hoặc tự nghĩ ra cảnh của nhóm bạn.", en: "Pick a scene — or invent your own." },
      blocks: [
        { type: "html", title: { vi: "Năm cảnh để chọn", en: "Five scenes to choose from" }, strand: "output", mins: 10, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Cảnh · Scene</th><th>Chuyện gì xảy ra? · What happens?</th><th>Dùng · Use</th></tr>
            <tr><td>🎂 <strong>Bữa tiệc bất ngờ</strong><br><small>The surprise party</small></td><td>Friends plan a surprise birthday party. Who to invite, which day, what time — and the birthday person almost finds out!</td><td>dates, time, invitations (Bài 5–6)</td></tr>
            <tr><td>🏡 <strong>Đến nhà bạn chơi</strong><br><small>Visiting a friend’s family</small></td><td>A student visits a friend’s home and meets the family. Who’s who, how old, what they do — and someone uses the wrong pronoun.</td><td>introductions, family, age, xưng hô (Bài 4, 7)</td></tr>
            <tr><td>📅 <strong>Cuối tuần này bạn rảnh không?</strong><br><small>Making weekend plans</small></td><td>Everyone is busy. The group tries to find one time to meet — from when to when, how long it takes, who is late.</td><td>schedules, lúc / từ … đến, bao lâu (Bài 6)</td></tr>
            <tr><td>👶 <strong>Tin vui!</strong><br><small>Big news</small></td><td>Someone has news (a new job, a new baby, a trip). Friends ask questions: has it happened yet? when will it happen?</td><td>đã / đang / sẽ / sắp, chưa / rồi (Bài 7 — taught the week of the Fest: a challenge!)</td></tr>
            <tr><td>✨ <strong>Ý tưởng của nhóm</strong><br><small>Your own idea</small></td><td>Any everyday scene with a small problem — check it with your teacher first.</td><td>Lessons 1–6</td></tr>
          </table></div>` },

        { type: "html", title: { vi: "Kịch nào cũng phải có …", en: "Every skit must include …" }, strand: "output", mins: 3, html: `
          <ul>
            <li>👋 <strong>Chào hỏi</strong> and <strong>giới thiệu</strong> — greetings, and introducing at least one person</li>
            <li>🧑‍🤝‍🧑 <strong>Đúng cách xưng hô</strong> — the right pronoun pairs for age and relationship, with <em>ạ / dạ</em> to older people</li>
            <li>🗓️ <strong>Thời gian</strong> — at least one day, date or clock time</li>
            <li>👀 <strong>Khán giả hiểu được</strong> — someone who doesn’t speak Vietnamese can follow the story: clear actions, props, a one-sentence English intro before you start</li>
            <li>⭐ <em>Bonus:</em> <strong>đã, đang, sẽ hoặc sắp</strong> (Lesson 7) — a sentence about the past, now or the future</li>
            <li>❓ <strong>Câu hỏi</strong> — characters ask each other questions (<em>… không? · … chưa? · … bao nhiêu tuổi? · … mấy giờ?</em>)</li>
            <li>🌶️ <strong>Một vấn đề</strong> — a small problem or surprise, and how the characters solve it</li>
            <li>🎙️ <strong>Mọi người cùng nói</strong> — every member speaks at least 6 lines</li>
          </ul>` },

        { type: "mc", id: "check-scene", strand: "language", mins: 3,
          title: { vi: "Bạn đã hiểu chưa?", en: "Quick check" },
          items: [
            { q: "Nhóm của bạn có mấy người?", en: "How many people are in a group?", opts: ["ba hoặc bốn người", "hai người", "năm hoặc sáu người"], correct: "ba hoặc bốn người" },
            { q: "Kịch dài bao lâu?", en: "How long is the skit?", opts: ["từ ba đến năm phút", "một phút", "mười lăm phút"], correct: "từ ba đến năm phút" },
            { q: "Mỗi người nói ít nhất mấy câu?", en: "At least how many lines does each person say?", opts: ["sáu câu", "hai câu", "hai mươi câu"], correct: "sáu câu" },
            { q: "Nhóm có thể diễn thế nào?", en: "How can your group perform?", opts: ["diễn trực tiếp hoặc quay video", "chỉ quay video", "chỉ viết kịch bản"], correct: "diễn trực tiếp hoặc quay video" },
            { q: "Ai sẽ xem kịch của nhóm bạn?", en: "Who will watch your skit?", opts: ["khán giả ở Vietnamese Learning Fest", "chỉ giáo viên", "không ai"], correct: "khán giả ở Vietnamese Learning Fest" },
            { q: "Vietnamese Learning Fest là ngày nào?", en: "When is the Fest?", opts: ["thứ Sáu, ngày mười ba tháng mười một", "thứ Hai, ngày ba tháng mười một", "thứ Sáu, ngày ba mươi tháng mười"], correct: "thứ Sáu, ngày mười ba tháng mười một" },
          ] },
      ],
    },

    /* ═══════════════ VIẾT KỊCH BẢN ═══════════════ */
    {
      id: "script", icon: "2️⃣", label: "Viết kịch bản",
      intro: { vi: "Mở đầu → vấn đề → kết thúc. Câu ngắn, rõ, tự nhiên.", en: "Beginning → problem → ending. Short, clear, natural lines." },
      blocks: [
        { type: "html", title: { vi: "Kịch bản có ba phần", en: "A script has three parts" }, strand: "output", mins: 4, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>1 · Mở đầu</th><td>Where are we? Who are these people? Greet and introduce.</td><td><em>Chào chị ạ! · Đây là Minh, bạn em.</em></td></tr>
            <tr><th>2 · Vấn đề</th><td>Something goes wrong or something surprising happens.</td><td><em>Chết rồi! Thứ bảy mình làm việc.</em></td></tr>
            <tr><th>3 · Kết thúc</th><td>The characters solve it — then say goodbye.</td><td><em>Vậy thì chủ nhật nhé! · Hẹn gặp lại!</em></td></tr>
          </table></div>
          <p><strong>Format:</strong> put the character’s name before each line, like this:</p>
          <div class="transcript" lang="vi">
            <div class="dlg-line"><span class="spk">Emma</span><div class="dlg-text">Minh ơi, thứ bảy này bạn có rảnh không? <button class="tts" data-say="Minh ơi, thứ bảy này bạn có rảnh không?">🔊</button></div></div>
            <div class="dlg-line"><span class="spk">Minh</span><div class="dlg-text">Chết rồi! Thứ bảy mình làm việc từ chín giờ đến năm giờ. <button class="tts" data-say="Chết rồi! Thứ bảy mình làm việc từ chín giờ đến năm giờ.">🔊</button></div></div>
            <div class="dlg-line"><span class="spk">Emma</span><div class="dlg-text">Vậy thì chủ nhật nhé? Mình sẽ mời cả chị Linh. <button class="tts" data-say="Vậy thì chủ nhật nhé? Mình sẽ mời cả chị Linh.">🔊</button></div></div>
            <div class="dlg-line"><span class="spk">Minh</span><div class="dlg-text">Hay quá! Chủ nhật mình rảnh. <button class="tts" data-say="Hay quá! Chủ nhật mình rảnh.">🔊</button></div></div>
          </div>
          <p><small>Tips: write lines you can <em>say</em>, not read — short sentences you already know. Ask your teacher before using a lot of new words.</small></p>` },

        { type: "flashcards", id: "cards-stage", strand: "language", mins: 8,
          title: { vi: "Thẻ từ · Câu nói hay dùng khi diễn", en: "Flashcards: lines that bring a scene to life" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Dùng ít nhất năm câu trong kịch của nhóm bạn.", en: "Flip, listen, say it aloud. Use at least five of these in your skit. The deck goes: reacting → asking → moving the scene → keeping the conversation going." },
          cards: [
            /* reacting */
            { vi: "Thật à?", en: "Really?", ex: "Thật à? Chị Linh sắp sinh em bé à?", exEn: "Really? Chị Linh is having a baby?" },
            { vi: "Thế à?", en: "Is that so? Oh?", ex: "Thế à? Mình không biết.", exEn: "Oh? I didn’t know." },
            { vi: "Ôi!", en: "Oh! Wow!", ex: "Ôi, đẹp quá!", exEn: "Oh, so beautiful!" },
            { vi: "Trời ơi!", en: "Oh my goodness!", ex: "Trời ơi, muộn quá rồi!", exEn: "Oh my, it’s so late!" },
            { vi: "Chết rồi!", en: "Oh no!", ex: "Chết rồi! Mình quên mất!", exEn: "Oh no! I totally forgot!" },
            { vi: "Hay quá!", en: "Great! Awesome!", ex: "Hay quá! Hẹn bạn thứ bảy nhé.", exEn: "Great! See you Saturday." },
            { vi: "Tuyệt vời!", en: "Wonderful!", ex: "Tuyệt vời! Chủ nhật mọi người rảnh.", exEn: "Wonderful! Everyone is free on Sunday." },
            { vi: "Đúng rồi!", en: "That’s right!", ex: "Đúng rồi! Hôm nay là sinh nhật Minh.", exEn: "That’s right! Today is Minh’s birthday." },
            { vi: "Chúc mừng!", en: "Congratulations!", ex: "Chúc mừng chị! Em vui quá!", exEn: "Congratulations! I’m so happy for you!" },
            /* asking */
            { vi: "Sao thế?", en: "What’s wrong? What’s up?", ex: "Sao thế? Bạn mệt à?", exEn: "What’s wrong? Are you tired?" },
            { vi: "Có chuyện gì thế?", en: "What’s going on?", ex: "Có chuyện gì thế? Sao bạn vội thế?", exEn: "What’s going on? Why are you in such a hurry?" },
            { vi: "Ai đấy?", en: "Who’s there? Who is it?", ex: "Ai đấy? — Mình đây, Emma!", exEn: "Who’s there? — It’s me, Emma!" },
            { vi: "Bạn nói lại được không?", en: "Can you say that again?", ex: "Xin lỗi, bạn nói lại được không?", exEn: "Sorry, can you say that again?" },
            /* moving the scene */
            { vi: "Mời vào!", en: "Come in!", ex: "Mời bạn vào nhà!", exEn: "Please come in!" },
            { vi: "Mời ngồi.", en: "Please have a seat.", ex: "Mời bác ngồi ạ.", exEn: "Please have a seat (to an older man)." },
            { vi: "Đợi một chút!", en: "Wait a moment!", ex: "Đợi một chút, mình gọi điện cho Minh.", exEn: "Wait a sec, I’ll call Minh." },
            { vi: "Nhanh lên!", en: "Hurry up!", ex: "Nhanh lên! Xe buýt sắp đến rồi!", exEn: "Hurry! The bus is about to come!" },
            { vi: "Đi thôi!", en: "Let’s go!", ex: "Muộn rồi, đi thôi!", exEn: "It’s late — let’s go!" },
            { vi: "Suỵt!", en: "Shh!", ex: "Suỵt! Nói nhỏ thôi!", exEn: "Shh! Keep your voice down!" },
            { vi: "Bí mật nhé!", en: "It’s a secret, OK?", ex: "Bí mật nhé! Minh chưa biết.", exEn: "It’s a secret! Minh doesn’t know yet." },
            { vi: "Bất ngờ chưa!", en: "Surprise!", ex: "Bất ngờ chưa! Chúc mừng sinh nhật!", exEn: "Surprise! Happy birthday!" },
            /* keeping the conversation going */
            { vi: "Để mình xem …", en: "Let me see …", ex: "Để mình xem … thứ bảy mình rảnh.", exEn: "Let me see … I’m free on Saturday." },
            { vi: "Vậy thì …", en: "In that case … / So …", ex: "Vậy thì chủ nhật nhé.", exEn: "Then let’s do Sunday." },
            { vi: "Mình hiểu rồi.", en: "I get it now.", ex: "À, mình hiểu rồi!", exEn: "Ah, now I get it!" },
            { vi: "Xin lỗi …", en: "Sorry … / Excuse me …", ex: "Xin lỗi, mình đến muộn.", exEn: "Sorry, I’m late." },
            { vi: "Không sao.", en: "No problem. It’s OK.", ex: "Không sao, mình cũng vừa đến.", exEn: "It’s OK, I just got here too." },
            { vi: "Lâu quá không gặp!", en: "Long time no see!", ex: "Chào chị! Lâu quá không gặp!", exEn: "Hi! Long time no see!" },
            { vi: "Hẹn gặp lại!", en: "See you!", ex: "Tạm biệt! Hẹn gặp lại!", exEn: "Bye! See you!" },
          ] },

        { type: "mc", id: "address", strand: "language", mins: 4,
          title: { vi: "Xưng hô cho đúng", en: "Address people the right way" },
          instr: { vi: "Trong kịch, cách xưng hô cho khán giả biết các nhân vật là ai với nhau.", en: "In a skit, pronouns tell the audience how the characters are related." },
          items: [
            { q: "Emma (19 tuổi) nói với chị Linh (28 tuổi): “___ chào chị ạ!”", opts: ["Em", "Mình", "Chị"], correct: "Em", why: { "Mình": "Mình is for friends your age. Chị Linh is older — Emma calls herself em." } },
            { q: "Emma nói với Minh, bạn cùng lớp: “Minh ơi, ___ có rảnh không?”", opts: ["bạn", "em", "anh"], correct: "bạn" },
            { q: "Bạn nói với bố của Minh (62 tuổi): “Cháu chào ___ ạ!”", opts: ["bác", "anh", "bạn"], correct: "bác", why: { "anh": "Anh is for someone a little older than you. As old as your parents → bác." } },
            { q: "Một người nhỏ tuổi hơn trả lời người lớn tuổi: “___, em hiểu rồi ạ.”", opts: ["Dạ", "Ừ", "Ơi"], correct: "Dạ", why: { "Ừ": "Ừ is casual — fine between friends, but too casual to someone older." } },
          ] },

        { type: "writing", id: "group-script", strand: "output", mins: 30,
          title: { vi: "Kịch bản của nhóm", en: "Your group’s script" },
          prompt: { vi: "Viết (hoặc dán) cả kịch bản của nhóm. Viết tên nhân vật trước mỗi câu, ví dụ “Emma: …”. Đánh dấu câu thoại của bạn bằng ⭐.", en: "Write (or paste) your group’s whole script. Put the character’s name before each line, e.g. “Emma: …”. Mark your own lines with ⭐. Every member submits the same script." },
          minWords: 100,
          checklist: [
            { vi: "Mở đầu · vấn đề · kết thúc", en: "beginning · problem · ending" },
            { vi: "Chào hỏi và giới thiệu", en: "greetings and an introduction" },
            { vi: "Xưng hô đúng (anh, chị, em, bạn, mình …) và ạ / dạ", en: "the right pronouns, with ạ / dạ to older people" },
            { vi: "Ngày, thứ hoặc giờ", en: "a day, date or clock time" },
            { vi: "Khán giả hiểu được: hành động rõ, đạo cụ", en: "the audience can follow it: clear actions, props" },
            { vi: "(Thêm) đã, đang, sẽ hoặc sắp", en: "(bonus) đã, đang, sẽ or sắp" },
            { vi: "Mỗi người ít nhất sáu câu", en: "at least six lines for every member" },
          ] },
      ],
    },

    /* ═══════════════ PHÒNG DIỄN ═══════════════ */
    {
      id: "studio", icon: "3️⃣", label: "Phòng diễn",
      intro: { vi: "Khởi động như diễn viên — rồi tập với thẻ cảm xúc.", en: "Warm up like actors — then practise with feeling cards." },
      blocks: [
        { type: "html", title: { vi: "Khởi động · Drama warm-ups", en: "Warm-ups from the VIET 100 Drama Studio" }, strand: "fluency", where: "both", mins: 10, html: `
          <p>Do two or three of these with your group before each rehearsal (2–3 minutes each). They make your characters feel real — and help you remember your lines.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>🗿 Tượng<br><small>Freeze frame</small></th><td>Make a still picture of one moment in your skit (e.g. the moment the surprise is ruined). One person taps a “statue” on the shoulder — that character says one line.</td></tr>
            <tr><th>🪑 Ghế nóng<br><small>Hot seat</small></th><td>One person sits in the “hot seat” as their character. The others ask questions in Vietnamese: <em>Bạn bao nhiêu tuổi? Bạn làm gì? Hôm qua bạn đã làm gì?</em> Answer as the character.</td></tr>
            <tr><th>💭 Tiếng nói bên trong<br><small>Thought-tracking</small></th><td>Stop the scene. A character says out loud what they are <em>thinking</em> but not saying: <em>Ôi, mình quên mất!</em></td></tr>
            <tr><th>🎚️ Đổi cảm xúc<br><small>Emotion switch</small></th><td>Run the same four lines again: tired, then excited, then whispering. Voice, face and hands all change.</td></tr>
            <tr><th>🔁 Đổi vai<br><small>Role swap</small></th><td>Swap characters for one run-through — now you hear your lines from the other side, and you learn everyone’s cues.</td></tr>
          </table></div>` },

        { type: "drama", id: "studio1", strand: "output", where: "both", mins: 15, senior: "A", start: "ban_minh",
          title: { vi: "Phòng diễn · Lời mời bí mật", en: "Drama studio: the secret invitation" },
          pairs: ["ban_minh", "ban_toi", "anh_em", "chi_em", "co_chau", "bac_chau"],
          script: [
            { r: "A", t: "{B} ơi, thứ bảy này {B} có rảnh không?" },
            { r: "B", t: "[[Dạ, ]]thứ bảy {b} làm việc từ chín giờ đến một giờ[[ ạ]]. Có việc gì thế {A}[[ ạ]]?" },
            { r: "A", t: "{a} tổ chức sinh nhật cho Minh. {a} mời {B} đến nhà {a} lúc bảy giờ tối nhé." },
            { r: "B", t: "<<Hay quá!|[[Dạ, ]]{b} cảm ơn {A}[[ ạ]]!>> {b} sẽ đến." },
            { r: "A", t: "Bí mật nhé! Minh chưa biết." },
            { r: "B", t: "<<Ừ, {b} biết rồi!|[[Dạ, ]]{b} biết rồi[[ ạ]].>>" },
          ],
          hotseat: [
            { vi: "Ghế nóng — hỏi A: Bạn mời bao nhiêu người? Tiệc ở đâu? Minh bao nhiêu tuổi?", en: "Hot seat — ask A about the party." },
            { vi: "Tiếng nói bên trong — B nghĩ gì khi nghe “bí mật”?", en: "Thought-tracking — what does B think when they hear “it’s a secret”?" },
            { vi: "Viết tiếp — Minh bất ngờ đi vào. A và B nói gì?", en: "Keep going — Minh suddenly walks in. What do A and B say?" },
          ] },
      ],
    },

    /* ═══════════════ TẬP & DIỄN ═══════════════ */
    {
      id: "rehearse", icon: "4️⃣", label: "Tập & diễn",
      intro: { vi: "Tập nhiều lần, rồi ghi âm câu thoại của bạn.", en: "Rehearse several times, then record your lines." },
      blocks: [
        { type: "html", title: { vi: "Diễn trực tiếp hay quay video?", en: "Live on stage or video?" }, strand: "output", mins: 3, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>🎤 Diễn trực tiếp<br><small>Live at the Fest</small></th><td>
              <ul>
                <li>Know your lines — small cue cards are OK, but don’t read the script.</li>
                <li>Start with a one-sentence English intro (who, where, what happens) — then everything else in Vietnamese.</li>
                <li>Face the audience and speak a little louder and slower than usual — it’s a big room!</li>
                <li>Simple props help: a phone, a cake box, a calendar.</li>
                <li>If you forget a line, stay in character and keep going in Vietnamese.</li>
              </ul></td></tr>
            <tr><th>🎬 Quay video<br><small>Video</small></th><td>
              <ul>
                <li>3–5 minutes; everyone appears on screen and speaks.</li>
                <li>Film horizontally, in a quiet place, close enough that we hear every word.</li>
                <li>You may film in several takes and edit them together — but no reading off-screen.</li>
                <li>It will play on a big screen at the Fest: good light, clear sound, no background music over your voices.</li>
                <li><strong>English subtitles are strongly recommended</strong> so the public can follow; Vietnamese subtitles are a nice extra.</li>
                <li>Upload the video (or a link) to the Canvas assignment <strong>before the Fest</strong> (date on Canvas).</li>
              </ul></td></tr>
          </table></div>` },

        { type: "record", id: "my-lines", strand: "fluency", mins: 8,
          title: { vi: "Ghi âm câu thoại của bạn", en: "Record your lines" },
          instr: { vi: "Tập trước, rồi ghi âm. Bạn có thể ghi lại nhiều lần — báo cáo giữ lần cuối.", en: "Practise first, then record. You can re-record as often as you like — the report keeps the last take." },
          prompts: [
            { vi: "Tất cả câu thoại của tôi, theo thứ tự", en: "All my lines, in order — say the character name before each line if it helps (up to 3 minutes)", model: false, maxSec: 180 },
            { vi: "Buổi tập cả nhóm", en: "A full group run-through — one member records it on their device; others may skip this (up to 6 minutes)", model: false, maxSec: 360 },
          ] },
      ],
    },

    /* ═══════════════ CHẤM ĐIỂM ═══════════════ */
    {
      id: "rubric", icon: "5️⃣", label: "Chấm điểm",
      intro: { vi: "Đọc tiêu chí trước khi viết — rồi tự chấm nhóm bạn sau khi diễn.", en: "Read the criteria before you write — then rate your group after you perform." },
      blocks: [
        { type: "html", title: { vi: "Tiêu chí chấm điểm", en: "How the skit is graded (100 points)" }, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Tiêu chí · Criterion</th><th>Cần cố gắng · Developing</th><th>Đạt · Meets</th><th>Xuất sắc · Exceeds</th></tr>
            <tr><td><strong>Nhiệm vụ, câu chuyện & khán giả</strong><br><small>Task, story & audience · 40</small></td><td>Hard to follow, several elements missing, or one person does most of the talking; the audience is mostly lost. <strong>0–27</strong></td><td>The story is easy to follow; most required elements; everyone speaks; the audience can follow the main idea. <strong>28–35</strong></td><td>A clear story with a beginning, a problem and an ending; every required element; everyone speaks about equally; the Fest audience follows and enjoys it, even without Vietnamese. <strong>36–40</strong></td></tr>
            <tr><td><strong>Ngôn ngữ</strong><br><small>Language · 30</small></td><td>Many single words or memorised phrases; little lesson vocabulary. <strong>0–20</strong></td><td>Mostly full sentences; enough lesson vocabulary; errors don’t stop the story. <strong>21–26</strong></td><td>Full sentences and short connected exchanges; a good range of words and patterns from Lessons 1–7. <strong>27–30</strong></td></tr>
            <tr><td><strong>Phát âm & rõ ràng</strong><br><small>Pronunciation & clarity · 20</small></td><td>Often hard to understand, or read from the script. <strong>0–13</strong></td><td>Understandable with some tone errors; mostly not read. <strong>14–17</strong></td><td>Tones mostly accurate; easy to understand; natural, not read. <strong>18–20</strong></td></tr>
            <tr><td><strong>Văn hóa & xưng hô</strong><br><small>Culture & forms of address · 10</small></td><td>Pronouns often wrong or mixed. <strong>0–6</strong></td><td>Pronouns mostly right; some polite words. <strong>7–8</strong></td><td>Pronouns always fit age and relationship; <em>ạ / dạ</em> and greetings used naturally. <strong>9–10</strong></td></tr>
          </table></div>
          <p><small>Simplified from the VIET 102 speaking rubric. Your teacher grades the performance; your self-check below goes into your report and is not graded.</small></p>` },

        { type: "rubric", id: "self-rubric", strand: "output", mins: 4,
          title: { vi: "Tự chấm nhóm bạn", en: "Rate your group’s performance" },
          task: { vi: "Sau khi diễn (hoặc sau khi quay video), chọn một mức cho mỗi tiêu chí.", en: "After you perform (or finish your video), pick a level for each criterion." },
          criteria: [
            { vi: "Nhiệm vụ, câu chuyện & khán giả", en: "Task, story & audience", desc: ["Hard to follow, or elements missing", "Easy to follow, most elements", "Clear story, everyone speaks, the audience follows"] },
            { vi: "Ngôn ngữ", en: "Language", desc: ["Mostly single words", "Mostly full sentences", "Connected exchanges, wide range"] },
            { vi: "Phát âm & rõ ràng", en: "Pronunciation & clarity", desc: ["Often hard to understand / read", "Understandable, some tone errors", "Clear tones, natural, not read"] },
            { vi: "Văn hóa & xưng hô", en: "Culture & forms of address", desc: ["Pronouns often wrong", "Pronouns mostly right", "Pronouns and ạ / dạ always fit"] },
          ] },
      ],
    },

    /* ═══════════════ NỘP BÀI ═══════════════ */
    {
      id: "report", icon: "📊", label: "Nộp bài", live: true,
      blocks: [
        { type: "cando", phase: "after",
          title: { vi: "Bây giờ bạn tự tin đến đâu?", en: "Now: how confident are you?" } },
        { type: "report", timing: true, title: { vi: "Báo cáo · tải về và nộp trên Canvas", en: "Report · download it and submit on Canvas" },
          survey: {
            title: "Exit Ticket & Reflection",
            note: "Write in English, after the Fest. Be honest and specific — there are no right answers, and this is about your experience, not your Vietnamese. Your teacher reads every one.",
            sections: [
              { title: "Exit ticket · 2 minutes", intro: "Quick answers — your first reaction.", items: [
                { id: "conf-before", type: "scale", q: "Before this project, how confident were you speaking Vietnamese in front of other people?", low: "Not at all", high: "Very" },
                { id: "conf-after", type: "scale", q: "Now, after performing at the Fest, how confident are you?", low: "Not at all", high: "Very" },
                { id: "audience", type: "scale", q: "How much did having a real, public audience change how hard your group prepared?", low: "Not at all", high: "A lot" },
                { id: "keep", type: "short", q: "One Vietnamese word or sentence from your skit you’ll remember — and why that one?" },
                { id: "hard", type: "short", q: "One thing about speaking Vietnamese that still feels hard after this project." },
              ] },
              { title: "Reflection · 10–15 minutes", intro: "Answer each in 3–5 sentences. Give an example: a line from your script, a moment in rehearsal, something someone said.", items: [
                { id: "process", type: "long", q: "1 · Building the skit", hint: "How did your group choose the scene and write the script? What was your role (writer, organizer, actor, editor …)? Describe one decision your group argued about or changed, and how you settled it." },
                { id: "language", type: "long", q: "2 · Language you learned", hint: "What do you understand better now because you had to use it on stage — pronouns and forms of address, tones, dates and time, questions …? Quote one line from your script and explain what you learned from saying it." },
                { id: "practice", type: "long", q: "3 · Practice that helped (or didn’t)", hint: "Which rehearsal activities helped you most — the Drama Studio cards, hot seat, freeze frame, recording your lines, run-throughs? Which one didn’t help, and why? What did you do when you forgot a line?" },
                { id: "performance", type: "long", q: "4 · Performing for the public", hint: "Describe one specific moment at the Fest (on stage or watching your video with the audience). How did you feel before, during and after? How did people who don’t speak Vietnamese react, and how did your group help them follow the story?" },
                { id: "team", type: "long", q: "5 · Working as a group", hint: "What did your group do well together? Was the work shared fairly? If you started again with the same group, what would you do differently?" },
                { id: "change", type: "long", q: "6 · If I ran this project again …", hint: "What should I keep, change or add — the scenes, the timeline, the Drama Studio, the rubric, the Fest itself? What would have helped you most?" },
              ] },
            ],
          } },
      ],
    },
  ],
};
})();
