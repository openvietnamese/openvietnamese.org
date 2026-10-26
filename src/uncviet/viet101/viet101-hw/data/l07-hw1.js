/* VIET 101 (UNC Viet) — Bài 7 homework 1 of 3 (Monday): Gia đình và giới thiệu · Family and introductions
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lesson 7. ≈ 50 minutes at home.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world continues from Bài 6 (l06-hw3.js: Saturday in Raleigh with chị Linh). "Today" = Monday 9/11/2026.
   New: anh Nam (chị Linh’s husband); Minh and Linh’s parents live in Hà Nội (bố 62, mẹ 59).
   Emma’s family (used all week): bố (retired engineer), mẹ (history teacher), anh trai Jake, em gái Lily (16).
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: 7,
  titleVi: "Bài tập thứ Hai · Gia đình và giới thiệu",
  titleEn: "Monday homework: family and introductions",
  description: "VIET 101, Lesson 7 homework 1: family words, introducing people, giới thiệu / làm quen, and asking someone’s age (bao nhiêu tuổi, mấy tuổi) — vocabulary, grammar, spelling, speaking and a short story. About 50 minutes.",
  color: "#15803d",
  badge: { icon: "🤝", name: "Làm quen · Nice to meet you" },

  cando: [
    { vi: "Tôi có thể giới thiệu một người và nói “Rất vui được làm quen”.", en: "I can introduce someone and say “Nice to meet you”." },
    { vi: "Tôi có thể nói gia đình tôi có mấy người và đó là ai.", en: "I can say how many people are in my family and who they are." },
    { vi: "Tôi có thể hỏi và nói tuổi: bao nhiêu tuổi, mấy tuổi.", en: "I can ask and say someone’s age: bao nhiêu tuổi, mấy tuổi." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập về nhà 1/3 · Bài 7 · khoảng 50 phút.", en: "Homework 1 of 3 · Lesson 7 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Work through the tabs in order. Each card shows its time (⏱). You can stop and come back — your progress is saved in this browser.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Family words · introducing people</td><td>9′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td>Age: <em>bao nhiêu tuổi</em> or <em>mấy tuổi</em>? · introductions</td><td>15′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>ảnh / anh, gái, tuổi, chồng · dictation</td><td>7′</td></tr>
            <tr><td>4️⃣ Nói</td><td>Introduce someone · talk about your family</td><td>6′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Ở nhà chị Linh</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> this homework goes with <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lesson 7</strong>. If you have time, re-read the Lesson 7 dialogues and the notes on <em>quen, làm quen, giới thiệu</em> and speaking of age first.</p>
          <p><small>In this homework, <strong>today is Monday, November 9</strong>. On Saturday Emma visited chị Linh in Raleigh — and met someone new.</small></p>
          <p><small>Tip: tap <strong>EN</strong> in the blue header to show or hide English · 🐢 slows the voice down. No Vietnamese keyboard? Dictation boxes accept <strong>Telex</strong> (e.g. <em>tuooir</em> → tuổi).</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Người trong gia đình, và cách giới thiệu.", en: "People in the family, and how to introduce someone." },
      blocks: [
        { type: "flashcards", id: "cards-family", strand: "language", mins: 6,
          title: { vi: "Thẻ từ · Gia đình", en: "Flashcards: the family" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "gia đình", en: "family", ex: "Gia đình mình có năm người.", exEn: "My family has five people." },
            { vi: "bố", en: "father (in the South: ba)", ex: "Bố mình sáu mươi tuổi.", exEn: "My father is sixty." },
            { vi: "mẹ", en: "mother (in the South: má)", ex: "Mẹ mình là giáo viên.", exEn: "My mother is a teacher." },
            { vi: "anh trai", en: "older brother", ex: "Mình có một anh trai.", exEn: "I have an older brother." },
            { vi: "chị gái", en: "older sister", ex: "Chị gái Minh tên là Linh.", exEn: "Minh’s older sister is called Linh." },
            { vi: "em trai", en: "younger brother", ex: "Em trai mình mười hai tuổi.", exEn: "My younger brother is twelve." },
            { vi: "em gái", en: "younger sister", ex: "Emma có một em gái.", exEn: "Emma has a younger sister." },
            { vi: "chồng", en: "husband", ex: "Anh Nam là chồng chị Linh.", exEn: "Anh Nam is chị Linh’s husband." },
            { vi: "vợ", en: "wife", ex: "Chị Linh là vợ anh Nam.", exEn: "Chị Linh is anh Nam’s wife." },
            { vi: "con trai", en: "son", ex: "Họ có một con trai.", exEn: "They have a son." },
            { vi: "con gái", en: "daughter", ex: "Con gái chị ấy lên năm.", exEn: "Her daughter is (turning) five." },
            { vi: "ảnh", en: "photo", ex: "ảnh gia đình", exEn: "a family photo" },
          ] },

        { type: "match", id: "match-intro", strand: "language", mins: 3,
          title: { vi: "Ghép · Giới thiệu và làm quen", en: "Match: introducing and meeting people" },
          instr: { vi: "Ghép tiếng Việt với nghĩa tiếng Anh.", en: "Match the Vietnamese to its meaning." },
          pairs: [
            { a: "giới thiệu", b: "to introduce" },
            { a: "làm quen (với)", b: "to get to know, meet" },
            { a: "Rất vui được làm quen với bạn.", b: "Nice to meet you." },
            { a: "hân hạnh", b: "to be honored (formal)" },
            { a: "đây là …", b: "this is …" },
            { a: "cùng", b: "together, the same" },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Bao nhiêu tuổi hay mấy tuổi? Xem ví dụ trước, rồi tìm quy luật.", en: "Bao nhiêu tuổi or mấy tuổi? Examples first, then the rule." },
      blocks: [
        { type: "notice", id: "notice-age", strand: "language", mins: 4,
          title: { vi: "Khám phá · Bao nhiêu tuổi hay mấy tuổi?", en: "Discover: bao nhiêu tuổi or mấy tuổi?" },
          examples: [
            { vi: "Chị Linh năm nay <strong>bao nhiêu tuổi</strong>? — Chị ấy hai mươi tám tuổi.", en: "How old is chị Linh this year? — She’s twenty-eight." },
            { vi: "Bố Minh <strong>bao nhiêu tuổi</strong>? — Bố Minh sáu mươi hai tuổi.", en: "How old is Minh’s father? — He’s sixty-two." },
            { vi: "Cháu <strong>mấy tuổi</strong>? — Cháu lên năm.", en: "(to a small child) How old are you? — I’m five." },
            { vi: "Em trai bạn <strong>mấy tuổi</strong>? — Em ấy lên bảy.", en: "How old is your little brother? — He’s seven." },
          ],
          q: "Bạn hỏi một em bé năm tuổi. Bạn dùng …", qEn: "You’re asking a five-year-old. You use …",
          opts: ["mấy tuổi", "bao nhiêu tuổi"], correct: "mấy tuổi",
          why: { "bao nhiêu tuổi": "Look again: bao nhiêu tuổi is for chị Linh and Minh’s father — adults. The small children get mấy tuổi." },
          explain: "mấy tuổi = small children (under about 10) · bao nhiêu tuổi = everyone else.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>(năm nay) + number + tuổi</strong>: <em>Năm nay mình mười chín tuổi.</em> No <em>là</em> and no <em>có</em> before an age. <button class="tts" data-say="Năm nay mình mười chín tuổi.">🔊</button></td><td>I’m 19 (this year)</td></tr>
              <tr><td><strong>… bao nhiêu tuổi?</strong> — teens and adults: <em>Chị năm nay bao nhiêu tuổi ạ?</em> <button class="tts" data-say="Chị năm nay bao nhiêu tuổi ạ?">🔊</button></td><td>how old?</td></tr>
              <tr><td><strong>… mấy tuổi?</strong> — small children: <em>Cháu mấy tuổi? — Cháu lên năm.</em> (<strong>lên</strong> + age = a child reaching an age) <button class="tts" data-say="Cháu mấy tuổi? Cháu lên năm.">🔊</button></td><td>how old? (child)</td></tr>
              <tr><td><strong>… có mấy người?</strong> <em>Gia đình bạn có mấy người? — Gia đình mình có năm người.</em> <button class="tts" data-say="Gia đình bạn có mấy người? Gia đình mình có năm người.">🔊</button></td><td>how many people?</td></tr>
              <tr><td><strong>Introducing:</strong> <em>(Xin) giới thiệu với bạn, đây là anh Nam.</em> → <em>Rất vui được làm quen với anh.</em> · more formal: <em>Hân hạnh được làm quen với anh.</em> <button class="tts" data-say="Đây là anh Nam. Rất vui được làm quen với anh.">🔊</button></td><td>this is … · nice to meet you</td></tr>
            </table>` },

        { type: "mc", id: "age", strand: "language", mins: 4,
          title: { vi: "Hỏi tuổi cho đúng", en: "Ask about age the right way" },
          items: [
            { q: "Em gái Emma mười sáu tuổi. Bạn hỏi Emma: “Em gái bạn ___?”", opts: ["bao nhiêu tuổi", "mấy tuổi", "mấy giờ"], correct: "bao nhiêu tuổi", why: { "mấy tuổi": "Sixteen isn’t a small child — use bao nhiêu tuổi." } },
            { q: "Bé Na bốn tuổi. Bạn hỏi bé: “Cháu ___?”", opts: ["mấy tuổi", "bao nhiêu tuổi", "bao lâu"], correct: "mấy tuổi" },
            { q: "Câu nào đúng?", opts: ["Năm nay mình hai mươi tuổi.", "Năm nay mình là hai mươi tuổi.", "Năm nay mình có hai mươi tuổi."], correct: "Năm nay mình hai mươi tuổi.", explain: "No là and no có before an age: just number + tuổi." },
            { q: "Gia đình Minh có bố, mẹ, chị Linh và Minh. Gia đình Minh có ___ người.", opts: ["bốn", "ba", "năm"], correct: "bốn" },
            { q: "“Con trai chị ấy lên sáu.” nghĩa là …", opts: ["Her son is (turning) six.", "She has six sons.", "Her son went up six floors."], correct: "Her son is (turning) six." },
          ] },

        { type: "mc", id: "intro", strand: "language", mins: 4,
          title: { vi: "Giới thiệu và làm quen", en: "Introducing and meeting people" },
          items: [
            { q: "Bạn giới thiệu Minh với Emma. Bạn nói:", opts: ["Emma ơi, đây là Minh, bạn mình.", "Emma ơi, Minh là đây.", "Emma ơi, bạn là Minh."], correct: "Emma ơi, đây là Minh, bạn mình." },
            { q: "Bạn gặp anh Nam lần đầu. Bạn nói:", en: "You meet anh Nam for the first time.", opts: ["Rất vui được làm quen với anh.", "Rất vui được làm việc với anh.", "Hẹn anh thứ bảy nhé."], correct: "Rất vui được làm quen với anh." },
            { q: "Anh Nam là chồng chị Linh. Chị Linh là ___ anh Nam.", opts: ["vợ", "chồng", "em gái"], correct: "vợ" },
            { q: "Emma và Minh ___ học toán.", en: "(= together)", opts: ["cùng", "với", "và"], correct: "cùng", why: { "với": "Emma học toán với Minh is right — but here the blank comes right before the verb: cùng + verb = do it together." } },
            { q: "“Hân hạnh được làm quen với chị.” — Câu này …", opts: ["formal and polite", "very casual", "a question"], correct: "formal and polite" },
          ] },

        { type: "builder", id: "build", strand: "language", mins: 3,
          title: { vi: "Xếp câu", en: "Build the sentence" },
          items: [
            { en: "This is my older sister.", tiles: ["Đây là", "chị gái", "mình"], answer: "Đây là chị gái mình." },
            { en: "Nice to meet you (to an older man).", tiles: ["Rất vui", "được", "làm quen", "với", "anh"], answer: "Rất vui được làm quen với anh." },
            { en: "My family has five people.", tiles: ["Gia đình", "mình", "có", "năm", "người"], answer: "Gia đình mình có năm người." },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Ảnh hay anh? Một dấu khác — nghĩa khác!", en: "Ảnh or anh? One tone mark, a different word!" },
      blocks: [
        { type: "mc", id: "tone-pick", strand: "language", mins: 3,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "ảnh", q: "", opts: ["ảnh", "anh", "ánh"], correct: "ảnh", explain: "ảnh (hỏi tone) = photo · anh (level) = older brother!" },
            { say: "gái", q: "", opts: ["gái", "gai", "gải"], correct: "gái", explain: "gái (rising) = female, as in em gái · gai = thorn." },
            { say: "tuổi", q: "", opts: ["tuổi", "tuôi", "tuối"], correct: "tuổi", explain: "tuổi = t + uôi, with the hỏi tone on ô." },
            { say: "chồng", q: "", opts: ["chồng", "chống", "trồng"], correct: "chồng", explain: "chồng (falling) = husband · chống = to resist · trồng (tr-) = to plant." },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: tuooir → tuổi, ddinhf → đình.", en: "Tap Listen, then type. Telex works: tuooir → tuổi, ddinhf → đình." },
          items: [
            { say: "gia đình", telex: true, answers: ["gia đình"] },
            { say: "em gái", telex: true, answers: ["em gái"] },
            { say: "mười chín tuổi", telex: true, answers: ["mười chín tuổi"] },
            { say: "rất vui được làm quen", telex: true, answers: ["rất vui được làm quen"], show: "Rất vui được làm quen." },
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
            { vi: "Xin giới thiệu, đây là em gái mình.", en: "Let me introduce — this is my younger sister." },
            { vi: "Rất vui được làm quen với bạn.", en: "Nice to meet you." },
            { vi: "Năm nay em gái mình mười sáu tuổi.", en: "My younger sister is sixteen this year." },
          ] },

        { type: "record", id: "my-family", strand: "output", mins: 3,
          title: { vi: "Nói về bạn", en: "Your turn" },
          instr: { vi: "Trả lời bằng một hoặc hai câu. Không có mẫu — đây là câu của bạn!", en: "Answer in one or two sentences. No model — it’s your sentence!" },
          prompts: [
            { vi: "Gia đình bạn có mấy người?", en: "e.g. Gia đình mình có … người: bố, mẹ, …", model: false },
            { vi: "Bạn có anh chị em không? Họ bao nhiêu tuổi?", en: "Do you have brothers or sisters (anh chị em)? e.g. Mình có một em trai. Em ấy … tuổi.", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st1", strand: "input", emoji: "🏡", level: "Cấp 1", mins: 8,
          titleVi: "Ở nhà chị Linh", titleEn: "At chị Linh’s house",
          gloss: [["rồi", "then"], ["giới thiệu", "to introduce"], ["chồng", "husband"], ["làm quen", "to get to know"], ["cùng", "together"], ["ảnh gia đình", "family photo"], ["còn em?", "and you?"]],
          body: [
            { t: "n", s: "Thứ bảy, Emma và chị Linh ăn phở, rồi về nhà chị Linh." },
            { t: "d", sp: "Chị Linh", s: "Emma ơi, chị giới thiệu với em, đây là anh Nam, chồng chị." },
            { t: "d", sp: "Emma", s: "Chào anh ạ. Em tên là Emma. Rất vui được làm quen với anh." },
            { t: "d", sp: "Anh Nam", s: "Chào em. Anh cũng rất vui được làm quen với em. Em là bạn Minh à?" },
            { t: "d", sp: "Emma", s: "Dạ vâng. Em và Minh cùng học toán ạ." },
            { t: "n", s: "Emma xem ảnh gia đình của chị Linh." },
            { t: "d", sp: "Emma", s: "Đây là bố mẹ chị ạ? Bố mẹ chị năm nay bao nhiêu tuổi ạ?" },
            { t: "d", sp: "Chị Linh", s: "Ừ. Bố mẹ chị ở Hà Nội. Bố chị sáu mươi hai tuổi, mẹ chị năm mươi chín tuổi." },
            { t: "d", sp: "Anh Nam", s: "Còn em, gia đình em có mấy người?" },
            { t: "d", sp: "Emma", s: "Dạ, gia đình em có năm người: bố mẹ, anh trai, em gái và em." },
          ],
          pairs: [["chồng", "husband"], ["ảnh", "photo"], ["bố mẹ", "parents"], ["em gái", "younger sister"]],
          order: ["Emma và chị Linh ăn phở.", "Chị Linh giới thiệu anh Nam với Emma.", "Emma xem ảnh gia đình của chị Linh.", "Emma nói gia đình Emma có năm người."],
          fill: { text: "Anh Nam là {0} chị Linh. Emma và Minh {1} học toán. Bố chị Linh năm nay sáu mươi hai {2}. Gia đình Emma có năm {3}.", answers: ["chồng", "cùng", "tuổi", "người"], bank: ["chồng", "cùng", "tuổi", "người", "vợ", "với"] } },

        { type: "readaloud", id: "read-aloud", story: "st1", strand: "fluency", mins: 4,
          title: { vi: "Đọc to", en: "Read aloud" },
          instr: { vi: "Nghe lại câu chuyện ở trên một lần. Rồi bấm ● Ghi âm và đọc to cả câu chuyện — rõ ràng, không cần nhanh. Bản ghi âm sẽ có trong báo cáo bạn nộp.", en: "Listen to the story above once more. Then tap ● Record and read the whole story aloud — clearly, no need to rush. Your recording goes into the report you submit." } },

        { type: "html", title: { vi: "Văn hóa · Vì sao người Việt hỏi tuổi?", en: "Culture: why do Vietnamese people ask your age?" }, strand: "input", mins: 0, html: `
          <p>Vietnamese people often ask <em>Bạn bao nhiêu tuổi?</em> soon after they meet you. It isn’t rude: your age tells them <strong>which pronoun to use</strong>.</p>
          <ul>
            <li>Older than you → <em>anh</em> (a man) or <em>chị</em> (a woman), and you call yourself <em>em</em>.</li>
            <li>About your age → <em>bạn</em>, and you say <em>mình</em>.</li>
            <li>As old as your parents → <em>bác, cô, chú</em> …</li>
            <li>A small child → <em>cháu</em> or <em>em</em> — and you ask <em>mấy tuổi?</em></li>
          </ul>
          <p>That’s why Emma says <em>em</em> to chị Linh and anh Nam, but <em>mình</em> to Minh.</p>` },
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
