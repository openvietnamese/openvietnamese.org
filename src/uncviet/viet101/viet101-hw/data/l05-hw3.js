/* VIET 101 (UNC Viet) — Bài 5 homework 3 of 3 (Friday): Sinh nhật & lời mời · Birthdays & invitations
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lesson 5. ≈ 50 minutes at home.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world: see l05-hw1.js (Emma, Minh, chị Linh). "Today" = Friday 30/10/2026; the party is
   Saturday evening 31/10 (Halloween), Minh turns 21 (born 2005).
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: 5,
  titleVi: "Bài tập thứ Sáu · Sinh nhật & lời mời",
  titleEn: "Friday homework: birthdays and invitations",
  description: "VIET 101, Lesson 5 homework 3: birthday words, inviting someone, answering with có / ừ / vâng / dạ, and a review of dates and numbers — vocabulary, grammar, spelling, writing, speaking and a short story. About 50 minutes.",
  color: "#be185d",
  badge: { icon: "🎂", name: "Chúc mừng sinh nhật! · Party planner" },

  cando: [
    { vi: "Tôi có thể mời một người đến sinh nhật: thứ mấy, ngày nào, buổi nào.", en: "I can invite someone to a birthday: which weekday, which date, what part of the day." },
    { vi: "Tôi có thể trả lời “có / ừ / vâng / dạ” đúng với người nghe.", en: "I can answer yes with có / ừ / vâng / dạ to suit the person I’m talking to." },
    { vi: "Tôi có thể nói “Chúc mừng sinh nhật!” và nói tuổi, ngày sinh.", en: "I can say Happy Birthday and talk about age and birth dates." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập về nhà 3/3 · Bài 5 · khoảng 50 phút.", en: "Homework 3 of 3 · Lesson 5 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Work through the tabs in order. Each card shows its time (⏱). Your progress is saved in this browser.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Birthday and invitation phrases</td><td>7′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td><em>có / ừ / vâng / dạ</em> · an invitation text · Lesson 5 review</td><td>14′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>chúc / chức and other look-alikes · dictation</td><td>6′</td></tr>
            <tr><td>4️⃣ Viết & nói</td><td>Write your own invitation, then record it</td><td>12′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Sinh nhật ngày Halloween</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lesson 5</strong> — re-read the birthday dialogue and the notes on <em>có</em> and <em>ừ</em> before you start.</p>
          <p><small>In this homework, <strong>today is Friday, October 30</strong>. Tomorrow is Minh’s birthday!</small></p>` },

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
        { type: "flashcards", id: "cards-bday", strand: "language", mins: 7,
          title: { vi: "Thẻ từ · Sinh nhật và lời mời", en: "Flashcards: birthdays and invitations" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "sinh nhật", en: "birthday", ex: "Sinh nhật Minh là ngày ba mươi mốt.", exEn: "Minh’s birthday is on the 31st." },
            { vi: "Chúc mừng sinh nhật!", en: "Happy birthday!", ex: "Chúc mừng sinh nhật Minh!", exEn: "Happy birthday, Minh!" },
            { vi: "tổ chức sinh nhật", en: "to throw a birthday party", ex: "Chị Linh tổ chức sinh nhật cho Minh.", exEn: "Chị Linh is throwing Minh a party." },
            { vi: "ăn sinh nhật", en: "to celebrate a birthday", ex: "Năm nay Minh ăn sinh nhật ở nhà chị Linh.", exEn: "This year Minh celebrates at chị Linh’s." },
            { vi: "mời", en: "to invite", ex: "Chị mời em đến nhà chị.", exEn: "I’m inviting you to my place." },
            { vi: "đến", en: "to come", ex: "Em có đến không?", exEn: "Are you coming?" },
            { vi: "lại chơi", en: "to come over (to visit)", ex: "Tối mai bạn lại chơi nhé!", exEn: "Come over tomorrow evening!" },
            { vi: "… có rảnh không?", en: "Are you free …?", ex: "Tối thứ bảy bạn có rảnh không?", exEn: "Are you free Saturday evening?" },
            { vi: "sinh năm …", en: "born in (year)", ex: "Minh sinh năm 2005.", exEn: "Minh was born in 2005." },
            { vi: "quà", en: "present, gift", ex: "Emma mua quà cho Minh.", exEn: "Emma buys Minh a present." },
            { vi: "Ừ.", en: "Yeah. (casual, to a friend or someone younger)", ex: "Ừ, mình đến.", exEn: "Yeah, I’ll come." },
            { vi: "Vâng. / Dạ.", en: "Yes. (polite, to someone older)", ex: "Dạ, em đến ạ.", exEn: "Yes, I’ll come." },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Nói “có” với ai cũng được — nhưng “ừ” thì không!", en: "Có is fine with anyone — but ừ is not!" },
      blocks: [
        { type: "notice", id: "notice-yes", strand: "language", mins: 4,
          title: { vi: "Khám phá · Có, ừ, vâng, dạ", en: "Discover: four ways to say yes" },
          examples: [
            { vi: "Minh: Tối mai bạn có rảnh không? — Emma: <strong>Có</strong>, mình rảnh.", en: "Are you free tomorrow evening? — Yes, I am." },
            { vi: "Minh: Bạn đến nhé? — Emma: <strong>Ừ</strong>, mình đến.", en: "You’ll come, right? — Yeah, I’ll come." },
            { vi: "Chị Linh: Em có đến không? — Emma: <strong>Dạ</strong>, em đến <strong>ạ</strong>.", en: "Are you coming? — Yes, I am." },
            { vi: "Chị Linh: Em mang bánh nhé? — Emma: <strong>Vâng</strong>, em mang ạ.", en: "Will you bring a cake? — Yes, I will." },
          ],
          q: "Emma nói “ừ” với Minh, nhưng nói “dạ / vâng” với chị Linh. Vì sao?", qEn: "Emma says ừ to Minh but dạ / vâng to chị Linh. Why?",
          opts: ["Chị Linh nhiều tuổi hơn Emma", "Chị Linh là bạn cùng lớp", "Minh nhiều tuổi hơn chị Linh"], correct: "Chị Linh nhiều tuổi hơn Emma",
          why: { "Chị Linh là bạn cùng lớp": "Chị Linh works in Raleigh — she’s Minh’s older sister, not a classmate.", "Minh nhiều tuổi hơn chị Linh": "Chị Linh is Minh’s older sister." },
          explain: "Ừ is casual — for friends and people younger than you. To someone older, say dạ or vâng (+ ạ).",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>Có</strong> — answers a <em>có … không?</em> question · fine with anyone; add <em>ạ</em> for older people: <em>Có ạ.</em></td><td>Yes (I do / I am)</td></tr>
              <tr><td><strong>Ừ</strong> — casual: friends, siblings, people younger than you. Never to a teacher or an older person!</td><td>Yeah</td></tr>
              <tr><td><strong>Vâng</strong> (more Northern) · <strong>Dạ</strong> (everywhere, very common in the South) — polite, to someone older, usually with <em>ạ</em>.</td><td>Yes (polite)</td></tr>
              <tr><td><strong>Không</strong> — no: <em>Không, mình bận.</em> · politely: <em>Dạ không, em bận ạ.</em></td><td>No</td></tr>
            </table>
            <p><strong>Inviting:</strong> <em>Mời</em> + person + <em>đến</em> / <em>lại chơi</em> + time: <em>Chị mời em tối mai đến nhà chị ăn sinh nhật Minh.</em> End with <em>nhé</em> to sound friendly: <em>Bạn đến nhé!</em> <button class="tts" data-say="Bạn đến nhé! Tối mai bạn lại chơi nhé!">🔊</button></p>` },

        { type: "mc", id: "yes-who", strand: "language", mins: 4,
          title: { vi: "Trả lời cho đúng", en: "Answer the right way" },
          items: [
            { q: "Minh (bạn của Emma): “Bạn có đến không?” — Emma:", opts: ["Ừ, mình đến.", "Vâng ạ, cháu đến."], correct: "Ừ, mình đến.", why: { "Vâng ạ, cháu đến.": "Too formal for a friend — and cháu is for talking to someone your grandparents’ or parents’ age." } },
            { q: "Chị Linh: “Em có rảnh không?” — Emma:", opts: ["Dạ, em rảnh ạ.", "Ừ, mình rảnh."], correct: "Dạ, em rảnh ạ.", why: { "Ừ, mình rảnh.": "Ừ is too casual for an older person." } },
            { q: "Cô giáo: “Thứ sáu em có lớp toán không?” — Emma:", opts: ["Dạ, có ạ.", "Ừ, có."], correct: "Dạ, có ạ." },
            { q: "“Bạn có thích bánh sinh nhật không?” — “___, mình thích lắm!”", opts: ["Có", "Là", "Không"], correct: "Có", why: { "Là": "Là links nouns (A là B) — it never means “yes”.", "Không": "Không = no — but then mình thích lắm doesn’t fit!" } },
          ] },

        { type: "cloze", id: "invite-text", strand: "input", mins: 3,
          title: { vi: "Tin nhắn của chị Linh", en: "Chị Linh’s text message" },
          instr: { vi: "Hôm nay là thứ sáu, 30/10. Chị Linh nhắn tin cho Emma. Điền từ.", en: "Today is Friday 30/10. Chị Linh texts Emma. Fill in the blanks. (tròn … tuổi = to turn … years old)" },
          items: [
            { text: "Emma ơi, tối mai, thứ {0}, chị tổ {1} sinh nhật cho Minh. Minh tròn hai mươi {2} tuổi. Em có {3} không? Chị mời em {4} nhà chị ăn sinh nhật nhé!", answers: ["bảy", "chức", "mốt", "rảnh", "đến"], bank: ["bảy", "chức", "mốt", "rảnh", "đến", "chúc", "một", "ba"] },
          ] },

        { type: "mc", id: "review", strand: "fluency", mins: 3,
          title: { vi: "Ôn tập Bài 5", en: "Lesson 5 review" },
          items: [
            { q: "Hôm nay là thứ sáu, ngày ba mươi. Ngày mai là …", opts: ["thứ bảy, ngày ba mươi mốt", "chủ nhật, ngày ba mươi mốt", "thứ bảy, ngày mười ba"], correct: "thứ bảy, ngày ba mươi mốt" },
            { q: "Minh sinh năm 2005. Đọc là …", opts: ["hai nghìn không trăm linh năm", "hai nghìn linh năm", "hai mươi không năm"], correct: "hai nghìn không trăm linh năm", why: { "hai nghìn linh năm": "The hundreds place is empty — say không trăm.", "hai mươi không năm": "That’s the English way (“twenty-oh-five”) — Vietnamese reads the whole number." } },
            { q: "Trả lời: “Hôm kia.” — Câu hỏi?", opts: ["Chị Linh gọi điện cho Emma bao giờ?", "Bao giờ chị Linh gọi điện cho Emma?"], correct: "Chị Linh gọi điện cho Emma bao giờ?", keepOrder: true, why: { "Bao giờ chị Linh gọi điện cho Emma?": "Bao giờ at the start asks about the future — hôm kia is past." } },
            { q: "125 = ?", say: "một trăm hai mươi lăm", opts: ["một trăm hai mươi lăm", "một trăm năm mươi hai", "một trăm hai mươi"], correct: "một trăm hai mươi lăm" },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Chúc hay chức? Mừng hay mững? Nghe kỹ nhé!", en: "Chúc or chức? Listen closely!" },
      blocks: [
        { type: "mc", id: "look-alike", strand: "language", mins: 2,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "chúc mừng", q: "", opts: ["chúc mừng", "chức mừng", "chúc mững"], correct: "chúc mừng", explain: "chúc (u) = to wish · chức (ư) is in tổ chức (to organise)." },
            { say: "tổ chức", q: "", opts: ["tổ chức", "tố chúc", "tổ chúc"], correct: "tổ chức" },
            { say: "sinh nhật", q: "", opts: ["sinh nhật", "xinh nhật", "sinh nhất"], correct: "sinh nhật", explain: "s, not x — and nhật has the heavy tone (dot below). Nhất = the most." },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: chucs muwngf → chúc mừng.", en: "Tap Listen, then type. Telex works: chucs muwngf → chúc mừng." },
          items: [
            { say: "chúc mừng sinh nhật", telex: true, answers: ["chúc mừng sinh nhật"], show: "Chúc mừng sinh nhật!" },
            { say: "tối thứ bảy", telex: true, answers: ["tối thứ bảy"] },
            { say: "bạn có rảnh không", telex: true, answers: ["bạn có rảnh không"], show: "Bạn có rảnh không?" },
            { say: "mời bạn lại chơi", telex: true, answers: ["mời bạn lại chơi"] },
          ] },
      ],
    },

    /* ═══════════════ VIẾT & NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Viết & nói",
      intro: { vi: "Viết tin nhắn mời của bạn, rồi đọc to và ghi âm.", en: "Write your own invitation text, then read it aloud and record it." },
      blocks: [
        { type: "writing", id: "my-invite", strand: "output", mins: 7,
          title: { vi: "Viết · Tin nhắn mời", en: "Write: an invitation text" },
          prompt: { vi: "Mời một người bạn (hoặc một người nhiều tuổi hơn) đến sinh nhật của bạn hoặc một buổi tiệc. Viết 3–5 câu.", en: "Invite a friend (or someone older) to your birthday or a party. Write 3–5 sentences." },
          minWords: 20,
          checklist: [
            { vi: "Thứ mấy, ngày nào, tháng mấy", en: "Weekday, date and month" },
            { vi: "Buổi nào (sáng / chiều / tối)", en: "Part of the day" },
            { vi: "Câu hỏi “… có rảnh không?”", en: "Ask if they’re free" },
            { vi: "Xưng hô đúng (bạn / mình hoặc anh, chị / em)", en: "The right pronouns (bạn / mình or anh, chị / em)" },
          ] },

        { type: "record", id: "voice", strand: "output", mins: 5,
          title: { vi: "Nói · Tin nhắn thoại", en: "Speak: a voice message" },
          instr: { vi: "Nói theo hai câu mẫu, rồi đọc to tin nhắn của bạn như một tin nhắn thoại.", en: "Shadow the two model lines, then read your invitation aloud as a voice message." },
          prompts: [
            { vi: "Chúc mừng sinh nhật Minh!", en: "Happy birthday, Minh!" },
            { vi: "Tối thứ bảy bạn có rảnh không? Mời bạn lại chơi nhé!", en: "Are you free Saturday evening? Come over!" },
            { vi: "Tin nhắn mời của tôi", en: "My invitation (read your text above)", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st3", strand: "input", emoji: "🎃", level: "Cấp 1", mins: 8,
          titleVi: "Sinh nhật ngày Halloween", titleEn: "A Halloween birthday",
          gloss: [["hóa trang thành", "to dress up as"], ["cái bánh", "a cake"], ["cây nến", "candle"], ["mọi người", "everyone"], ["cười", "to laugh"], ["hát", "to sing"], ["một mình", "alone"]],
          body: [
            { t: "n", s: "Thứ bảy, ngày ba mươi mốt tháng mười. Hôm nay là Halloween, và cũng là sinh nhật Minh." },
            { t: "n", s: "Chị Linh tổ chức sinh nhật cho Minh ở nhà chị. Chị mời mười lăm người bạn." },
            { t: "n", s: "Buổi tối, Emma đến nhà chị Linh. Emma hóa trang thành một cái bánh sinh nhật!" },
            { t: "d", sp: "Emma", s: "Chúc mừng sinh nhật Minh!" },
            { t: "d", sp: "Minh", s: "Cảm ơn bạn! Ôi, bạn hóa trang thành cái gì thế?" },
            { t: "d", sp: "Emma", s: "Mình là bánh sinh nhật! Bạn hai mươi mốt tuổi, nên mình có hai mươi mốt cây nến." },
            { t: "d", sp: "Chị Linh", s: "Hay quá! Em vào nhà đi. Bánh của em đẹp quá!" },
            { t: "n", s: "Mọi người cười và hát “Chúc mừng sinh nhật”." },
            { t: "d", sp: "Minh", s: "Năm ngoái mình ăn sinh nhật một mình. Năm nay vui quá!" },
          ],
          pairs: [["hóa trang", "to dress up (in costume)"], ["cây nến", "candle"], ["hát", "to sing"], ["một mình", "alone"]],
          order: ["Chị Linh mời mười lăm người bạn.", "Emma đến nhà chị Linh.", "Emma chúc mừng sinh nhật Minh.", "Mọi người cười và hát."],
          fill: { text: "Hôm nay là thứ {0}, ngày ba mươi mốt tháng mười. Minh hai mươi {1} tuổi. Chị Linh tổ {2} sinh nhật cho Minh. Năm {3} Minh ăn sinh nhật một mình.", answers: ["bảy", "mốt", "chức", "ngoái"], bank: ["bảy", "mốt", "chức", "ngoái", "một", "chúc"] } },

        { type: "readaloud", id: "read-aloud", story: "st3", strand: "fluency", mins: 4,
          title: { vi: "Đọc to", en: "Read aloud" },
          instr: { vi: "Nghe lại câu chuyện ở trên một lần. Rồi bấm ● Ghi âm và đọc to cả câu chuyện — rõ ràng, không cần nhanh. Bản ghi âm sẽ có trong báo cáo bạn nộp.", en: "Listen to the story above once more. Then tap ● Record and read the whole story aloud — clearly, no need to rush. Your recording goes into the report you submit." } },

        { type: "html", title: { vi: "Văn hóa · Sinh nhật ở Việt Nam", en: "Culture: birthdays in Vietnam" }, strand: "input", mins: 0, html: `
          <ul>
            <li>Young people celebrate with a cake, candles (<em>thổi nến</em> = blow out the candles) and the song <em>“Chúc mừng sinh nhật”</em> — the Vietnamese “Happy Birthday”.</li>
            <li>Many older Vietnamese people know their birthday by the <strong>lunar calendar</strong> (<em>âm lịch</em>), so it falls on a different solar date every year. Traditionally everyone also “turned a year older” together at <strong>Tết</strong>.</li>
            <li>Ask a Vietnamese friend or relative this weekend: <em>Sinh nhật … là ngày nào? Theo âm lịch hay dương lịch?</em> (lunar or solar?) — bring the answer to class on Monday!</li>
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
