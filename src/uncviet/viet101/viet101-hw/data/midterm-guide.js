/* VIET 101 (UNC Viet) — Ôn thi giữa kỳ · Midterm study guide and practice, Lessons 1–4
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lessons 1–4:
     Bài 1 chào hỏi (có … không, là, có phải là … không, đây/đấy/kia, ai, noun + adjective)
     Bài 2 làm quen (gì / nào, phải không, à, ở đâu, classifiers, này/kia/ấy, ở, numbers 0–10, colours)
     Bài 3 ngôn ngữ (ít / nhiều, thứ nhất…, các / những, rất / lắm / quá, hay “or”, thế nào, verb + adjective, cũng, và / còn)
     Bài 4 xưng hô (bao nhiêu / mấy, numbers 11–99, personal pronouns and kinship terms, ạ, thưa, bận)
   Language is kept inside Lessons 1–4 (no dates, clock time or tense markers).
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world: Emma (American, first-year at UNC, VIET 101), Minh (from Hà Nội, studies at UNC),
   chị Linh (Minh’s older sister, an engineer in Raleigh) — same people as the Bài 5–7 homework.
   Exam pages that go with this guide: ../viet101-midterm/ (speaking, practice written exam, paper exam).
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: "1-4",
  titleVi: "Ôn thi giữa kỳ · Bài 1–4",
  titleEn: "Midterm study guide and practice: Lessons 1–4",
  description: "VIET 101 midterm review for Lessons 1–4: greetings, getting acquainted, languages and nationalities, numbers to 99 and the address system — vocabulary, grammar, listening, speaking, reading and writing practice in the format of the midterm. About 80 minutes; you can do it in two sittings.",
  color: "#13294B",
  badge: { icon: "🎓", name: "Sẵn sàng thi · Midterm ready" },

  cando: [
    { vi: "Tôi có thể chào hỏi, nói tên và hỏi “Bạn có khoẻ không?”.", en: "I can greet people, say my name and ask how someone is." },
    { vi: "Tôi có thể nói và hỏi về quốc tịch, trường học và ngôn ngữ.", en: "I can say and ask where someone is from, where they study and what languages they speak." },
    { vi: "Tôi có thể đặt câu hỏi với có … không, có phải là … không, phải không, à, ai, gì, nào, ở đâu, thế nào.", en: "I can ask questions with có … không, có phải là … không, phải không, à, ai, gì, nào, ở đâu and thế nào." },
    { vi: "Tôi có thể dùng loại từ: cái, con, quyển, tờ, quả, ngôi, toà.", en: "I can use classifiers: cái, con, quyển, tờ, quả, ngôi, toà." },
    { vi: "Tôi có thể nghe, nói và viết các số từ 0 đến 99.", en: "I can understand, say and write the numbers 0–99." },
    { vi: "Tôi có thể chọn cách xưng hô đúng và nói lịch sự với thưa, ạ.", en: "I can choose the right address terms and speak politely with thưa and ạ." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Ôn thi giữa kỳ · Bài 1–4 · khoảng 80 phút (bạn có thể làm hai lần).", en: "Midterm review · Lessons 1–4 · about 80 minutes (you can split it into two sittings)." },
      blocks: [
        { type: "html", title: { vi: "Bài thi giữa kỳ có gì?", en: "What’s on the midterm?" }, html: `
          <p>The VIET 101 midterm covers <strong>Lessons 1–4</strong> of <em>Elementary Vietnamese</em> (Ngô Như Bình). It has two parts:</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn làm gì · What you do</th><th>Điểm · Points</th></tr>
            <tr><td>✍️ <strong>Bài thi viết</strong> · Written exam (50 min)</td><td>A. Nghe — numbers and a short dialogue<br>B. Từ vựng &amp; ngữ pháp — classifiers, question words, rất / lắm / quá, cũng, và / còn, các / những, pronouns<br>C. Đọc — a short text, true / false and questions<br>D. Viết — make sentences negative or into questions, write a number in words, write a short paragraph</td><td>15<br>40<br><br>20<br>25</td></tr>
            <tr><td>🎙️ <strong>Bài thi nói</strong> · Speaking exam (≈ 10 min)</td><td>9 spoken questions on the computer, like the VIET 102 OPI exam: warm-up, questions about you, a short talk about a friend, a polite role play, wind-down. Each question plays once; recording starts by itself.</td><td>30</td></tr>
          </table></div>
          <p><strong>How to use this guide:</strong> one tab per lesson (1️⃣–4️⃣), then speaking and writing practice (5️⃣) and a story (6️⃣). Then try the <strong>practice written exam</strong> — it is the same format as the real one:</p>
          <ul>
            <li>✍️ <a href="../viet101-midterm/viet101-midterm-practice.html">Bài thi viết thử · Practice written exam</a> (scored online, with answers)</li>
            <li>🎙️ <a href="../viet101-midterm/viet101-midterm-speaking.html">Bài thi nói · Speaking exam</a> (your teacher will tell you when to take it)</li>
          </ul>
          <p><small>Keep your book open: re-read the dialogues and grammar notes of Lessons 1–4 before each tab.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ BÀI 1 ═══════════════ */
    {
      id: "l1", icon: "1️⃣", label: "Bài 1",
      intro: { vi: "Bài 1 · Chào hỏi: chào, tên, khoẻ không, là, đây / đấy / kia, ai.", en: "Lesson 1 · Greetings: hello, names, how are you, là, here / there, who." },
      blocks: [
        { type: "flashcards", id: "cards-l1", strand: "language", mins: 5,
          title: { vi: "Thẻ từ · Chào hỏi", en: "Flashcards: greetings" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "Chào anh! / Chào chị!", en: "Hello! (to a young man / a young woman)", ex: "Chào chị! — Chào anh!", exEn: "Hello! — Hello!" },
            { vi: "Rất vui được làm quen với bạn.", en: "Nice to meet you.", ex: "Mình cũng rất vui được làm quen với bạn.", exEn: "Nice to meet you too." },
            { vi: "Bạn có khoẻ không?", en: "How are you?", ex: "Cảm ơn bạn, mình khoẻ. Còn bạn thế nào?", exEn: "Fine, thanks. And you?" },
            { vi: "Bạn tên là gì?", en: "What’s your name?", ex: "Mình tên là Emma.", exEn: "My name is Emma." },
            { vi: "Xin lỗi", en: "excuse me; sorry", ex: "Xin lỗi anh, anh tên là gì?", exEn: "Excuse me, what’s your name?" },
            { vi: "Cảm ơn", en: "thank you", ex: "Cảm ơn chị!", exEn: "Thank you!" },
            { vi: "đây · đấy / đó · kia", en: "here · there (near you) · over there", ex: "Đây là Minh. Kia là chị Linh.", exEn: "This is Minh. That’s chị Linh over there." },
            { vi: "ai?", en: "who?", ex: "Kia là ai?", exEn: "Who is that?" },
            { vi: "sinh viên", en: "(college) student", ex: "Emma là sinh viên.", exEn: "Emma is a student." },
            { vi: "kỹ sư · bác sĩ · y tá", en: "engineer · doctor · nurse", ex: "Chị Linh là kỹ sư.", exEn: "Chị Linh is an engineer." },
            { vi: "mới · cũ", en: "new · old (things)", ex: "Minh có từ điển cũ.", exEn: "Minh has an old dictionary." },
            { vi: "đẹp · khó · dễ", en: "beautiful · difficult · easy", ex: "Câu hỏi này dễ.", exEn: "This question is easy." },
          ] },

        { type: "notice", id: "notice-q1", strand: "language", mins: 3,
          title: { vi: "Khám phá · có … không? hay có phải là … không?", en: "Discover: có … không? or có phải là … không?" },
          examples: [
            { vi: "Emma <strong>có</strong> khoẻ <strong>không</strong>? — Vâng, Emma khoẻ.", en: "Is Emma well? — Yes, she is." },
            { vi: "Minh <strong>có</strong> từ điển <strong>không</strong>? — Không, Minh không có từ điển.", en: "Does Minh have a dictionary? — No, he doesn’t." },
            { vi: "Chị Linh <strong>có phải là</strong> kỹ sư <strong>không</strong>? — Vâng, chị Linh là kỹ sư.", en: "Is chị Linh an engineer? — Yes, she is." },
            { vi: "Kia <strong>có phải là</strong> thư viện <strong>không</strong>? — Không phải, kia <strong>không phải là</strong> thư viện.", en: "Is that the library? — No, that’s not the library." },
          ],
          q: "Khi nào dùng “có phải là … không?”", qEn: "When do you use có phải là … không?",
          opts: ["Khi câu trả lời có “là” + danh từ (A là B)", "Khi hỏi về tính từ (khoẻ, đẹp, khó)", "Khi hỏi về động từ “có” (to have)"], correct: "Khi câu trả lời có “là” + danh từ (A là B)",
          why: { "Khi hỏi về tính từ (khoẻ, đẹp, khó)": "Adjectives work like verbs: Emma có khoẻ không? — no là.", "Khi hỏi về động từ “có” (to have)": "With có = to have, only one có: Minh có từ điển không?" },
          explain: "A là B (noun) → A có phải là B không? · Negative: A không phải là B.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>Verb / adjective</strong>: S + <em>có</em> + V/Adj + <em>không</em>? → <em>Vâng, …</em> / <em>Không, S không …</em></td><td>Bạn có hiểu không? · Tiếng Việt có khó không?</td></tr>
              <tr><td><strong>là + noun</strong>: S + <em>có phải là</em> + N + <em>không</em>? → <em>Vâng, S là …</em> / <em>Không (phải), S không phải là …</em></td><td>Minh có phải là sinh viên không?</td></tr>
              <tr><td>No <em>là</em> before an adjective: <em>Tôi khoẻ.</em> (not <s>Tôi là khoẻ</s>)</td><td>I’m fine.</td></tr>
              <tr><td>Adjective <strong>after</strong> the noun: <em>nhà đẹp, báo mới, câu hỏi khó</em></td><td>a beautiful house, a new paper, a hard question</td></tr>
            </table>` },

        { type: "mc", id: "l1-mc", strand: "language", mins: 3,
          title: { vi: "Chọn câu đúng", en: "Choose the correct sentence" },
          items: [
            { q: "Ask if Minh is a student:", opts: ["Minh có phải là sinh viên không?", "Minh có sinh viên không?", "Minh là sinh viên không?"], correct: "Minh có phải là sinh viên không?", why: { "Minh có sinh viên không?": "That means “Does Minh have students?”", "Minh là sinh viên không?": "With là + noun, use có phải là … không." } },
            { q: "“I’m fine.”", opts: ["Tôi khoẻ.", "Tôi là khoẻ.", "Tôi có khoẻ."], correct: "Tôi khoẻ.", why: { "Tôi là khoẻ.": "No là before an adjective.", "Tôi có khoẻ.": "Có + adjective is for questions: Tôi có khoẻ không?" } },
            { q: "Negative: “Chị Linh là bác sĩ.” →", opts: ["Chị Linh không phải là bác sĩ.", "Chị Linh không là bác sĩ.", "Chị Linh là không bác sĩ."], correct: "Chị Linh không phải là bác sĩ." },
            { q: "“a new dictionary”", opts: ["từ điển mới", "mới từ điển", "từ điển là mới"], correct: "từ điển mới", why: { "mới từ điển": "The adjective follows the noun." } },
            { q: "“Who is that (over there)?”", opts: ["Kia là ai?", "Ai là kia?", "Kia ai là?"], correct: "Kia là ai?" },
            { q: "Minh: “Bạn có khoẻ không?” — Emma: “Cảm ơn bạn, mình khoẻ. ___ bạn thế nào?”", opts: ["Còn", "Và", "Cũng"], correct: "Còn", why: { "Và": "Và lists items; còn switches to the other person: “And you?”", "Cũng": "Cũng = also, before the verb." } },
          ] },

        { type: "builder", id: "l1-build", strand: "language", mins: 2,
          title: { vi: "Xếp câu", en: "Build the sentence" },
          items: [
            { en: "Excuse me, what’s your name?", tiles: ["Xin lỗi", "chị,", "chị", "tên", "là", "gì?"], answer: "Xin lỗi chị, chị tên là gì?" },
            { en: "Is that Minh?", tiles: ["Đấy", "có phải là", "Minh", "không?"], answer: "Đấy có phải là Minh không?" },
            { en: "Emma has a beautiful notebook.", tiles: ["Emma", "có", "vở", "đẹp."], answer: "Emma có vở đẹp." },
          ] },
      ],
    },

    /* ═══════════════ BÀI 2 ═══════════════ */
    {
      id: "l2", icon: "2️⃣", label: "Bài 2",
      intro: { vi: "Bài 2 · Làm quen: người nước nào, học ở đâu, gì / nào, phải không / à, loại từ.", en: "Lesson 2 · Getting acquainted: nationality, where you study, gì / nào, phải không / à, classifiers." },
      blocks: [
        { type: "match", id: "l2-countries", strand: "language", mins: 2,
          title: { vi: "Ghép · Nước và tiếng", en: "Match: countries and languages" },
          instr: { vi: "Ghép tiếng Việt với tiếng Anh.", en: "Match the Vietnamese to the English." },
          pairs: [
            { a: "người Mỹ", b: "an American" },
            { a: "người Việt", b: "a Vietnamese person" },
            { a: "tiếng Pháp", b: "French (language)" },
            { a: "tiếng Đức", b: "German (language)" },
            { a: "người Nhật", b: "a Japanese person" },
            { a: "tiếng Trung Quốc", b: "Chinese (language)" },
            { a: "tiếng Tây Ban Nha", b: "Spanish (language)" },
          ] },

        { type: "notice", id: "notice-cl", strand: "language", mins: 3,
          title: { vi: "Khám phá · Loại từ", en: "Discover: classifiers" },
          examples: [
            { vi: "hai <strong>quyển</strong> sách · một <strong>quyển</strong> từ điển", en: "two books · a dictionary" },
            { vi: "ba <strong>tờ</strong> báo · một <strong>tờ</strong> giấy", en: "three newspapers · a sheet of paper" },
            { vi: "một <strong>con</strong> mèo · hai <strong>con</strong> chó", en: "a cat · two dogs" },
            { vi: "năm <strong>quả</strong> cam · <strong>cây</strong> cam", en: "five oranges · an orange tree" },
            { vi: "một <strong>ngôi</strong> nhà · một <strong>toà</strong> nhà cao", en: "a house · a tall building" },
            { vi: "một <strong>cái</strong> bàn · một <strong>chiếc</strong> xe đạp", en: "a table · a bicycle" },
          ],
          q: "Thứ tự đúng là gì?", qEn: "What is the right word order?",
          opts: ["số + loại từ + danh từ + này / kia / ấy", "loại từ + số + danh từ", "danh từ + số + loại từ"], correct: "số + loại từ + danh từ + này / kia / ấy",
          explain: "hai quyển sách này = these two books · cái bàn kia = that table.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>quyển / cuốn</strong> books · <strong>tờ</strong> paper, newspapers, magazines · <strong>con</strong> animals · <strong>quả</strong> fruit · <strong>cây</strong> trees · <strong>ngôi</strong> houses · <strong>toà</strong> tall buildings · <strong>cái / chiếc</strong> most objects</td><td></td></tr>
              <tr><td><strong>gì?</strong> = what (kind)? — open choice: <em>Đây là quyển gì? — Quyển từ điển.</em></td><td>What book is this?</td></tr>
              <tr><td><strong>nào?</strong> = which? — choose from what you see: <em>Bạn thích quyển nào? — Quyển kia.</em> (keep the classifier!)</td><td>Which one do you like?</td></tr>
              <tr><td><strong>… phải không?</strong> checks a guess · <strong>… à?</strong> you’re almost sure: <em>Bạn là người Mỹ, phải không? · Bạn học tiếng Việt à?</em></td><td>…, aren’t you? · …, right?</td></tr>
              <tr><td><strong>ở đâu?</strong> goes at the end: <em>Bạn học ở đâu?</em> · <strong>ở</strong> = to live / in, at: <em>Chị Linh ở Raleigh.</em></td><td>Where do you study?</td></tr>
            </table>` },

        { type: "mc", id: "l2-cl", strand: "language", mins: 3,
          title: { vi: "Chọn loại từ", en: "Choose the classifier" },
          items: [
            { q: "Emma mua hai ___ sách tiếng Việt.", opts: ["quyển", "tờ", "con"], correct: "quyển" },
            { q: "Chị Linh có một ___ chó nhỏ.", opts: ["con", "cái", "quả"], correct: "con" },
            { q: "Minh đọc ba ___ báo.", opts: ["tờ", "quyển", "cây"], correct: "tờ", why: { "quyển": "Quyển is for books; newspapers take tờ." } },
            { q: "Thư viện là ___ nhà cao màu trắng.", opts: ["toà", "con", "tờ"], correct: "toà" },
            { q: "Mẹ mua mười ___ xoài.", opts: ["quả", "cây", "cái"], correct: "quả", why: { "cây": "Cây is the tree; the fruit is quả." } },
            { q: "Kia là ___ xe máy màu đỏ.", opts: ["chiếc", "tờ", "quyển"], correct: "chiếc" },
          ] },

        { type: "mc", id: "l2-q", strand: "language", mins: 3,
          title: { vi: "Hỏi cho đúng", en: "Ask the right question" },
          items: [
            { q: "Bạn là người nước ___? — Mình là người Canada.", opts: ["nào", "gì", "ai"], correct: "nào" },
            { q: "Đây là quả ___? — Quả xoài.", opts: ["gì", "nào", "ai"], correct: "gì", why: { "nào": "Nào asks “which one” from a known set; here it’s “what fruit is this?”" } },
            { q: "Bạn thích cái áo ___? — Mình thích cái áo đỏ kia.", opts: ["nào", "gì", "ở đâu"], correct: "nào" },
            { q: "Minh học tiếng Anh ___? — Ở Hà Nội.", opts: ["ở đâu", "nào", "gì"], correct: "ở đâu" },
            { q: "You are fairly sure Emma studies Vietnamese: “Emma học tiếng Việt ___?”", opts: ["à", "ai", "nào"], correct: "à" },
            { q: "“Bạn là người Mỹ, phải không?” — No: “___, mình là người Anh.”", opts: ["Không phải", "Vâng", "Không có"], correct: "Không phải" },
          ] },

        { type: "type", id: "l2-dict", strand: "language", mins: 2,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: nguwowif → người.", en: "Tap Listen, then type. Telex works: nguwowif → người." },
          items: [
            { say: "người nước nào", telex: true, answers: ["người nước nào"] },
            { say: "ba quyển sách mới", telex: true, answers: ["ba quyển sách mới"] },
            { say: "tờ báo này", telex: true, answers: ["tờ báo này"] },
          ] },
      ],
    },

    /* ═══════════════ BÀI 3 ═══════════════ */
    {
      id: "l3", icon: "3️⃣", label: "Bài 3",
      intro: { vi: "Bài 3 · Ngôn ngữ: rất / lắm / quá, cũng, và / còn, các / những, hay, thế nào, thứ nhất.", en: "Lesson 3 · Languages: rất / lắm / quá, cũng, và / còn, các / những, hay, thế nào, ordinals." },
      blocks: [
        { type: "notice", id: "notice-deg", strand: "language", mins: 3,
          title: { vi: "Khám phá · rất, lắm, quá", en: "Discover: rất, lắm, quá" },
          examples: [
            { vi: "Tiếng Việt <strong>rất</strong> khó.", en: "Vietnamese is very hard." },
            { vi: "Tiếng Việt khó <strong>lắm</strong>.", en: "Vietnamese is really hard." },
            { vi: "Tiếng Việt khó <strong>quá</strong>!", en: "Vietnamese is so hard!" },
            { vi: "Tiếng Tây Ban Nha <strong>không</strong> khó <strong>lắm</strong>.", en: "Spanish isn’t very hard." },
            { vi: "Minh nói tiếng Anh giỏi <strong>lắm</strong>.", en: "Minh speaks English really well." },
          ],
          q: "Từ nào đứng TRƯỚC tính từ?", qEn: "Which word goes BEFORE the adjective?",
          opts: ["rất", "lắm", "quá"], correct: "rất",
          explain: "rất + Adj · Adj + lắm · Adj + quá! · In không … and có … không? questions use lắm: không khó lắm.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>cũng</strong> (also) goes before the verb / adjective: <em>Emma cũng là sinh viên. · Tôi cũng không biết tiếng Nhật.</em></td><td>also · (not) either</td></tr>
              <tr><td><strong>và</strong> lists things: <em>tiếng Anh, tiếng Pháp và tiếng Việt</em> · <strong>còn</strong> switches the topic / person: <em>Tôi là người Mỹ. Còn chị?</em></td><td>and · and / as for</td></tr>
              <tr><td><strong>các</strong> = all of a group, and before pronouns: <em>Chào các bạn!</em> · <strong>những</strong> = some of them, and with người: <em>những người Pháp ấy</em></td><td>plural markers</td></tr>
              <tr><td><strong>hay</strong> = or (in questions): <em>Tiếng Việt khó hay dễ?</em> — no <em>có … không</em> with hay!</td><td>or</td></tr>
              <tr><td><strong>thế nào?</strong> = how / what like: <em>Lớp tiếng Việt thế nào? · Minh nói tiếng Anh thế nào? — Giỏi lắm.</em></td><td>how?</td></tr>
              <tr><td>Verb + adjective: <em>nói giỏi, hát hay, học khá</em> · <strong>thứ</strong> + number: <em>thứ nhất, thứ hai, thứ ba, thứ tư</em> (not <s>thứ một, thứ bốn</s>)</td><td>speak well · first, second…</td></tr>
            </table>` },

        { type: "mc", id: "l3-mc", strand: "language", mins: 4,
          title: { vi: "Chọn từ đúng", en: "Choose the right word" },
          items: [
            { q: "Chị Linh nói tiếng Pháp ___ giỏi.", opts: ["rất", "lắm", "quá"], correct: "rất", why: { "lắm": "Lắm goes after: nói tiếng Pháp giỏi lắm.", "quá": "Quá goes after: giỏi quá!" } },
            { q: "Tiếng Nhật có khó ___ không?", opts: ["lắm", "rất", "quá"], correct: "lắm", why: { "rất": "In có … không questions, rất and quá become lắm." } },
            { q: "Minh biết tiếng Anh. Chị Linh ___ biết tiếng Anh.", opts: ["cũng", "còn", "và"], correct: "cũng" },
            { q: "Emma học tiếng Việt, tiếng Pháp ___ toán.", opts: ["và", "còn", "cũng"], correct: "và" },
            { q: "Tôi là sinh viên. ___ anh là kỹ sư, phải không?", opts: ["Còn", "Và", "Cũng"], correct: "Còn" },
            { q: "Chào ___ bạn!", opts: ["các", "những", "mấy"], correct: "các", why: { "những": "Before a pronoun in a greeting, use các." } },
            { q: "Bạn học tiếng Pháp ___ tiếng Đức?", opts: ["hay", "và", "còn"], correct: "hay" },
            { q: "Emma là sinh viên năm ___ (1st).", opts: ["thứ nhất", "thứ một", "một"], correct: "thứ nhất", why: { "thứ một": "First = thứ nhất.", "một": "Ordinals need thứ." } },
          ] },

        { type: "builder", id: "l3-build", strand: "language", mins: 3,
          title: { vi: "Xếp câu", en: "Build the sentence" },
          items: [
            { en: "Spanish isn’t very difficult.", tiles: ["Tiếng Tây Ban Nha", "không", "khó", "lắm."], answer: "Tiếng Tây Ban Nha không khó lắm." },
            { en: "Is the Vietnamese class hard or easy?", tiles: ["Lớp tiếng Việt", "khó", "hay", "dễ?"], answer: "Lớp tiếng Việt khó hay dễ?" },
            { en: "How does Minh speak English?", tiles: ["Minh", "nói", "tiếng Anh", "thế nào?"], answer: "Minh nói tiếng Anh thế nào?" },
            { en: "I don’t know Japanese either.", tiles: ["Tôi", "cũng", "không", "biết", "tiếng Nhật."], answer: "Tôi cũng không biết tiếng Nhật." },
          ] },
      ],
    },

    /* ═══════════════ BÀI 4 ═══════════════ */
    {
      id: "l4", icon: "4️⃣", label: "Bài 4",
      intro: { vi: "Bài 4 · Xưng hô: số 11–99, mấy / bao nhiêu, anh / chị / em / bác / cô / cháu, thưa, ạ.", en: "Lesson 4 · Address system: numbers 11–99, mấy / bao nhiêu, kinship terms, thưa, ạ." },
      blocks: [
        { type: "html", title: { vi: "Số 11–99", en: "Numbers 11–99" }, strand: "language", mins: 2, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><td>11 · 15</td><td>mười một · mười <strong>lăm</strong> (not <s>mười năm</s>)</td><td><button class="tts" data-say="mười một, mười lăm">🔊</button></td></tr>
            <tr><td>10 · 20 · 30</td><td><strong>mười</strong> · hai <strong>mươi</strong> · ba mươi (mươi has no tone mark)</td><td><button class="tts" data-say="mười, hai mươi, ba mươi">🔊</button></td></tr>
            <tr><td>21 · 31</td><td>hai mươi <strong>mốt</strong> · ba mươi mốt</td><td><button class="tts" data-say="hai mươi mốt, ba mươi mốt">🔊</button></td></tr>
            <tr><td>24 · 34</td><td>hai mươi <strong>tư</strong> / hai mươi bốn</td><td><button class="tts" data-say="hai mươi tư, hai mươi bốn">🔊</button></td></tr>
            <tr><td>25 · 55</td><td>hai mươi <strong>lăm</strong> (North also <em>nhăm</em>) · năm mươi lăm</td><td><button class="tts" data-say="hai mươi lăm, năm mươi lăm">🔊</button></td></tr>
            <tr><td>99</td><td>chín mươi chín</td><td><button class="tts" data-say="chín mươi chín">🔊</button></td></tr>
          </table></div>
          <p><strong>mấy?</strong> when you expect fewer than 10 · <strong>bao nhiêu?</strong> for 10 or more: <em>Bạn học mấy môn? — Bốn môn. · Lớp có bao nhiêu sinh viên? — Hai mươi hai.</em></p>` },

        { type: "type", id: "l4-num", strand: "language", mins: 4,
          title: { vi: "Nghe và viết số bằng chữ", en: "Listen and write the number in words" },
          instr: { vi: "Bấm “Nghe”, rồi viết số bằng chữ (không dùng chữ số).", en: "Tap Listen, then write the number in words (no digits). Telex works: muwowif → mười." },
          items: [
            { say: "mười lăm", telex: true, words: true, answers: ["mười lăm"] },
            { say: "hai mươi mốt", telex: true, words: true, answers: ["hai mươi mốt"] },
            { say: "ba mươi tư", telex: true, words: true, answers: ["ba mươi tư", "ba mươi bốn"] },
            { say: "bốn mươi lăm", telex: true, words: true, answers: ["bốn mươi lăm", "bốn mươi nhăm"] },
            { say: "chín mươi", telex: true, words: true, answers: ["chín mươi"] },
          ] },

        { type: "mc", id: "l4-num-mc", strand: "language", mins: 2,
          title: { vi: "Số nào?", en: "Which number?" },
          items: [
            { say: "sáu mươi mốt", q: "", opts: ["61", "16", "67"], correct: "61" },
            { say: "mười tám", q: "", opts: ["18", "80", "81"], correct: "18" },
            { say: "bảy mươi lăm", q: "", opts: ["75", "57", "70"], correct: "75" },
            { q: "Lớp tiếng Việt có ___ sinh viên? — Mười chín.", opts: ["bao nhiêu", "mấy", "nào"], correct: "bao nhiêu", why: { "mấy": "Mấy is for numbers you expect to be under 10." } },
            { q: "Minh học ___ môn? — Ba môn.", opts: ["mấy", "bao nhiêu", "gì"], correct: "mấy" },
          ] },

        { type: "notice", id: "notice-addr", strand: "language", mins: 3,
          title: { vi: "Khám phá · Xưng hô", en: "Discover: who calls whom what" },
          examples: [
            { vi: "Emma → Minh (bạn): “<strong>Bạn</strong> có khoẻ không?” — Minh: “<strong>Mình</strong> khoẻ.”", en: "friends, same age: bạn / mình" },
            { vi: "Emma → chị Linh: “<strong>Chị</strong> có bận không?” — “<strong>Em</strong> …”", en: "to a young woman a bit older: chị, and Emma is em" },
            { vi: "Emma → bố Minh: “<strong>Cháu</strong> chào <strong>bác</strong> ạ.”", en: "to someone your parents’ age: bác, and you are cháu" },
            { vi: "Emma → cô giáo: “<strong>Thưa cô</strong>, <strong>em</strong> không hiểu <strong>ạ</strong>.”", en: "to a teacher: cô / thầy, you are em, add thưa and ạ" },
          ],
          q: "Emma nói với bố Minh. Câu nào đúng?", qEn: "Emma talks to Minh’s father. Which is right?",
          opts: ["Cháu chào bác ạ.", "Chào bạn!", "Em chào anh."], correct: "Cháu chào bác ạ.",
          why: { "Chào bạn!": "Bạn is for people your age.", "Em chào anh.": "Anh is for a young man; Minh’s father is your parents’ age." },
          explain: "Kinship terms mean both “you” and “I”: bác ↔ cháu, chị ↔ em, cô / thầy ↔ em.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>tôi</strong> (polite, neutral) · <strong>mình</strong> (friendly) · <strong>chúng tôi</strong> we (not you) · <strong>chúng ta</strong> we (you too) · <strong>chúng mình</strong> we (friendly)</td><td>I / we</td></tr>
              <tr><td><strong>anh · chị</strong> young adults · <strong>ông · bà</strong> older man / woman · <strong>bác</strong> your parents’ age · <strong>em · cháu</strong> a child · <strong>cụ</strong> very old · <strong>bạn</strong> polite “you” for peers</td><td>you</td></tr>
              <tr><td>+ <strong>ấy</strong> = he / she: <em>anh ấy, chị ấy, cô ấy</em> · <strong>họ</strong> = they · <strong>nó</strong> = a child, an animal, a thing (rude for adults!)</td><td>he / she / they / it</td></tr>
              <tr><td><strong>thưa</strong> + title at the start · <strong>ạ</strong> at the end — to people older than you: <em>Thưa bác, bố cháu không có nhà ạ.</em></td><td>politeness</td></tr>
              <tr><td><strong>bận</strong> = busy · <strong>bận</strong> + verb: <em>Minh bận chuẩn bị thi.</em></td><td>busy (doing)</td></tr>
            </table>` },

        { type: "mc", id: "l4-addr", strand: "language", mins: 3,
          title: { vi: "Xưng hô cho đúng", en: "Choose the right address term" },
          items: [
            { q: "A student asks the teacher (female): “___ cô, bài này có nhiều từ mới không ạ?”", opts: ["Thưa", "Ạ", "Còn"], correct: "Thưa" },
            { q: "Minh talks about chị Linh: “___ làm việc ở Raleigh.”", opts: ["Chị ấy", "Nó", "Họ"], correct: "Chị ấy", why: { "Nó": "Nó is for children, animals or things — rude for an adult.", "Họ": "Họ = they (more than one person)." } },
            { q: "Emma tells Minh and chị Linh about her class (they are not in it): “___ học tiếng Việt ở UNC.”", opts: ["Chúng tôi", "Chúng ta", "Các bạn"], correct: "Chúng tôi", why: { "Chúng ta": "Chúng ta includes the listeners — but Minh and chị Linh aren’t in the class." } },
            { q: "Chị Linh: “Em có bận không?” — Emma:", opts: ["Dạ, em bận lắm ạ.", "Ừ, mình bận.", "Bận lắm, bạn."], correct: "Dạ, em bận lắm ạ.", why: { "Ừ, mình bận.": "Too casual for an older person.", "Bận lắm, bạn.": "Chị Linh is older — call her chị, not bạn." } },
            { q: "Minh’s grandmother asks Emma something. Emma starts:", opts: ["Thưa bà, …", "Thưa bạn, …", "Này, …"], correct: "Thưa bà, …" },
          ] },

        { type: "cloze", id: "l4-cloze", strand: "input", mins: 3,
          title: { vi: "Ở nhà Minh", en: "At Minh’s place" },
          instr: { vi: "Emma đến nhà Minh. Bác Hùng (bố Minh) mở cửa. Điền từ.", en: "Emma comes to Minh’s place. Bác Hùng (Minh’s father) opens the door. Fill in the blanks. (có nhà = to be at home)" },
          items: [
            { text: "Emma: {0} chào bác ạ. — Bác Hùng: Chào cháu! — Emma: {1} bác, Minh có nhà không {2}? — Bác Hùng: Minh không có nhà. Minh đi thư viện. Minh {3} chuẩn bị thi. — Emma: Dạ, {4} ơn bác ạ.", answers: ["Cháu", "Thưa", "ạ", "bận", "cảm"], bank: ["Cháu", "Thưa", "ạ", "bận", "cảm", "Bạn", "nó", "rất"] },
          ] },
      ],
    },

    /* ═══════════════ VIẾT & NÓI ═══════════════ */
    {
      id: "speak", icon: "5️⃣", label: "Viết & nói",
      intro: { vi: "Luyện như bài thi thật: trả lời câu hỏi bằng câu đầy đủ, viết một đoạn ngắn.", en: "Practise like the real exam: answer in full sentences, then write a short paragraph." },
      blocks: [
        { type: "record", id: "opi-prac", strand: "output", mins: 8,
          title: { vi: "Nói · Luyện thi nói", en: "Speak: speaking exam practice" },
          instr: { vi: "Bấm 🔊 để nghe câu hỏi, rồi ghi âm câu trả lời. Nói 2–4 câu cho mỗi câu hỏi. Trong bài thi thật, câu hỏi chỉ phát một lần!", en: "Tap 🔊 to hear the question, then record your answer — 2–4 sentences each. In the real exam each question plays only once, so practise answering without notes." },
          prompts: [
            { vi: "Chào bạn! Bạn tên là gì? Bạn có khoẻ không?", en: "Hello! What’s your name? How are you?", maxSec: 40, model: false },
            { vi: "Bạn là người nước nào? Bạn học ở đâu? Bạn là sinh viên năm thứ mấy?", en: "Where are you from? Where do you study? What year are you in?", maxSec: 45, model: false },
            { vi: "Bạn biết những tiếng gì? Tiếng Việt khó hay dễ?", en: "What languages do you know? Is Vietnamese hard or easy?", maxSec: 45, model: false },
            { vi: "Học kỳ này bạn học mấy môn? Lớp tiếng Việt có bao nhiêu sinh viên?", en: "How many courses are you taking? How many students are in your Vietnamese class?", maxSec: 45, model: false },
            { vi: "Bạn gặp bố của Minh. Hãy chào bác, hỏi bác có khoẻ không, và nói tên bạn.", en: "Role play: you meet Minh’s father. Greet him politely, ask how he is, and tell him your name.", model: false, ask: false, maxSec: 60 },
          ] },

        { type: "writing", id: "self-intro", strand: "output", mins: 8,
          title: { vi: "Viết · Giới thiệu bạn", en: "Write: introduce yourself" },
          prompt: { vi: "Viết 6–8 câu giới thiệu bạn: tên, người nước nào, học ở đâu, năm thứ mấy, học mấy môn, biết tiếng gì, tiếng Việt thế nào. Dùng ít nhất một câu với “cũng” và một câu với “rất / lắm / quá”.", en: "Write 6–8 sentences about yourself: name, nationality, school and year, how many courses, languages, how Vietnamese is going. Use cũng once and rất / lắm / quá at least once." },
          minWords: 40,
          checklist: [
            { vi: "Tên, quốc tịch, trường, năm thứ mấy", en: "Name, nationality, school, year" },
            { vi: "Số môn học (viết số bằng chữ)", en: "Number of courses (number written in words)" },
            { vi: "Một câu với “cũng”", en: "A sentence with cũng" },
            { vi: "rất / lắm / quá đúng chỗ", en: "rất / lắm / quá in the right place" },
            { vi: "Dấu (tone marks) đầy đủ", en: "All tone marks written" },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "6️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it." },
      blocks: [
        { type: "story", id: "st-mt", strand: "input", emoji: "📚", level: "Cấp 1", mins: 8,
          titleVi: "Ở thư viện", titleEn: "At the library",
          gloss: [["thư viện", "library"], ["gặp", "to meet, run into"], ["mượn", "to borrow"], ["toán", "math"], ["lịch sử", "history"], ["nhưng", "but"]],
          body: [
            { t: "n", s: "Emma là người Mỹ. Emma là sinh viên năm thứ nhất ở Chapel Hill." },
            { t: "n", s: "Thư viện trường là một toà nhà cao màu trắng. Ở thư viện, Emma gặp một anh sinh viên." },
            { t: "d", sp: "Anh sinh viên", s: "Xin lỗi, bạn có phải là sinh viên lớp tiếng Việt không?" },
            { t: "d", sp: "Emma", s: "Vâng, mình học tiếng Việt. Bạn tên là gì?" },
            { t: "d", sp: "Minh", s: "Mình tên là Minh. Mình là người Việt, ở Hà Nội. Tiếng Việt có khó không?" },
            { t: "d", sp: "Emma", s: "Khó lắm, nhưng mình rất thích. Lớp mình có mười tám sinh viên." },
            { t: "d", sp: "Minh", s: "Bạn nói tiếng Việt hay quá! Mình học bốn môn: toán, lịch sử, tiếng Anh và tiếng Pháp. Mình bận lắm." },
            { t: "n", s: "Minh có một quyển từ điển Việt – Anh cũ. Emma mượn quyển từ điển ấy." },
            { t: "d", sp: "Emma", s: "Cảm ơn bạn nhiều! Rất vui được làm quen với bạn." },
          ],
          pairs: [["gặp", "to meet, run into"], ["mượn", "to borrow"], ["thư viện", "library"], ["bận", "busy"]],
          order: ["Emma gặp một anh sinh viên ở thư viện.", "Minh nói tên Minh.", "Minh nói về bốn môn học.", "Emma mượn quyển từ điển."],
          fill: { text: "Thư viện là một {0} nhà cao. Lớp tiếng Việt có mười {1} sinh viên. Minh học bốn {2}. Emma mượn một {3} từ điển cũ.", answers: ["toà", "tám", "môn", "quyển"], bank: ["toà", "tám", "môn", "quyển", "con", "tờ"] } },

        { type: "readaloud", id: "read-aloud", story: "st-mt", strand: "fluency", mins: 4,
          title: { vi: "Đọc to", en: "Read aloud" },
          instr: { vi: "Nghe lại câu chuyện ở trên một lần. Rồi bấm ● Ghi âm và đọc to cả câu chuyện — rõ ràng, không cần nhanh.", en: "Listen to the story above once more. Then tap ● Record and read the whole story aloud — clearly, no need to rush. Your recording goes into the report." } },

        { type: "html", title: { vi: "Mẹo làm bài thi · Exam tips", en: "Exam tips" }, strand: "input", mins: 0, html: `
          <ul>
            <li><strong>Answer in full sentences.</strong> Not just <em>“Mỹ.”</em> but <em>“Tôi là người Mỹ.”</em> — in both the written and the speaking exam.</li>
            <li><strong>Write every tone mark.</strong> <em>mươi</em> (20, 30…) ≠ <em>mười</em> (10); <em>lăm</em> in 15, 25 …; <em>mốt</em> in 21, 31 …</li>
            <li><strong>Listen for the question word</strong> and answer in the same place: <em>Bạn học <u>ở đâu</u>? — Tôi học <u>ở UNC</u>.</em></li>
            <li><strong>Speaking role play:</strong> greet first, use <em>thưa … ạ</em> with older people, and say goodbye at the end (<em>Cháu chào bác ạ.</em>).</li>
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
