/* VIET 101 (UNC Viet) — Ôn tập (review week after Lesson 7) homework 2 of 3 (Wednesday): Gia đình, xưng hô, đã · đang · sẽ (Lessons 4 and 7)
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lessons 4 and 7. ≈ 50 minutes at home. No new grammar.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world: see review-hw1.js. "Today" = Wednesday 18/11/2026. Minh calls his mother at 8 p.m. (8 a.m. Thursday in Hà Nội,
   12 hours ahead in winter). Emma’s family: bố (63, retired engineer), mẹ (58, history teacher), anh Jake (24, Boston),
   Lily (16), and bà ngoại (82, lives in Richmond). Minh came to the US two years ago (2024), third-year student.
   Minh’s mother flies to Raleigh on 15/12, landing at 6:40 p.m.
   Class deck: _source/viet101/slides/VIET101-Review-C2-family-tense-slides.html.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {
window.BV_CHAPTER = {
  id: "5-7",
  titleVi: "Ôn tập thứ Tư · Gia đình và xưng hô",
  titleEn: "Review homework, Wednesday: family, address terms and đã · đang · sẽ (Lessons 4 and 7)",
  description: "VIET 101 review week, homework 2: family words, choosing address terms (bác / cháu, anh / em …), asking age, the markers đã, đang, sẽ, sắp, vừa, … chưa? — rồi / chưa, vẫn and cách đây — vocabulary, grammar, spelling, speaking and a short story. About 50 minutes.",
  color: "#15803d",
  badge: { icon: "📞", name: "Ôn tập · Gia đình và xưng hô" },
  cando: [
    { vi: "Tôi có thể chọn cách xưng hô đúng với người lớn tuổi và người trẻ hơn.", en: "I can choose the right address terms for older and younger people." },
    { vi: "Tôi có thể nói về gia đình: ai, bao nhiêu tuổi, làm gì.", en: "I can talk about a family: who, how old, what they do." },
    { vi: "Tôi có thể dùng đã, đang, sẽ, sắp, vừa.", en: "I can use đã, đang, sẽ, sắp and vừa." },
    { vi: "Tôi có thể hỏi “… chưa?” và trả lời “rồi” hoặc “chưa”.", en: "I can ask “… yet?” and answer rồi or chưa." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Ôn tập 2/3 · Bài 4 và Bài 7 · khoảng 50 phút.", en: "Review homework 2 of 3 · Lessons 4 and 7 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Today we review <strong>Lesson 4</strong> (the address system) and <strong>Lesson 7</strong> (family, age and the time markers). Work through the tabs in order; each card shows its time (⏱).</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Family words · phone phrases</td><td>7′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td>Address terms · age · <em>đã / đang / sẽ / sắp / vừa</em> · <em>chưa</em>, <em>vẫn</em>, <em>cách đây</em></td><td>15′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>ngoại, cháu, chồng, sắp · dictation</td><td>7′</td></tr>
            <tr><td>4️⃣ Nói</td><td>Shadow two lines · a polite role play · your family now</td><td>6′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Gọi điện về Hà Nội</em> · read it aloud and record it</td><td>12′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lesson 4</strong> (personal pronouns, <em>thưa</em>, <em>ạ</em>) and <strong>Lesson 7</strong> (family, age, <em>đã · đang · sẽ</em>, <em>chưa</em>, <em>vẫn</em>).</p>
          <p><small>In this homework, <strong>today is Wednesday, November 18</strong>. Next week Minh meets Emma’s whole family — and his mother has advice.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Gia đình — và vài câu để gọi điện về nhà.", en: "The family — and a few phrases for calling home." },
      blocks: [
        { type: "match", id: "family", strand: "language", mins: 3,
          title: { vi: "Ghép · Gia đình", en: "Match: the family" },
          instr: { vi: "Ghép tiếng Việt với tiếng Anh.", en: "Match the Vietnamese to the English." },
          pairs: [
            { a: "bà ngoại", b: "grandmother (mother’s side)" },
            { a: "ông nội", b: "grandfather (father’s side)" },
            { a: "anh trai", b: "older brother" },
            { a: "em gái", b: "younger sister" },
            { a: "chồng", b: "husband" },
            { a: "con gái", b: "daughter" },
            { a: "cháu", b: "grandchild; niece, nephew" },
          ] },

        { type: "flashcards", id: "cards-call", strand: "language", mins: 4,
          title: { vi: "Thẻ từ · Gọi điện về nhà", en: "Flashcards: calling home" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "gọi điện (về nhà)", en: "to phone (home)", ex: "Minh gọi điện về Hà Nội.", exEn: "Minh phones home to Hà Nội." },
            { vi: "Alô!", en: "Hello? (on the phone)", ex: "Alô, Minh à?", exEn: "Hello, is that Minh?" },
            { vi: "con ↔ bố, mẹ", en: "child ↔ parent (I / you at home)", ex: "Con chào mẹ ạ.", exEn: "Hello, Mum." },
            { vi: "cháu ↔ bác, bà", en: "you ↔ an older person (I / you)", ex: "Cháu chào bà ạ.", exEn: "Hello (to a grandmother)." },
            { vi: "hai bác", en: "both of you (a couple your parents’ age)", ex: "Cháu chào hai bác ạ.", exEn: "Hello to you both." },
            { vi: "nhớ", en: "to remember; to miss", ex: "Con nhớ mẹ lắm!", exEn: "I miss you so much, Mum!" },
            { vi: "quà", en: "gift", ex: "mua quà cho gia đình Emma", exEn: "buy a gift for Emma’s family" },
            { vi: "sống", en: "to live", ex: "Bà ngoại Emma sống ở Richmond.", exEn: "Emma’s grandmother lives in Richmond." },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Xưng hô, tuổi, đã · đang · sẽ — xem ví dụ, rồi luyện tập.", en: "Address terms, age, đã · đang · sẽ — examples first, then practice." },
      blocks: [
        { type: "notice", id: "notice-address", strand: "language", mins: 4,
          title: { vi: "Ôn lại · Xưng hô và tuổi", en: "Look again: address terms and age" },
          examples: [
            { vi: "Minh → bà ngoại Emma: “<strong>Cháu</strong> chào <strong>bà</strong> ạ.”", en: "to a grandmother: bà, and Minh is cháu" },
            { vi: "Minh → bố mẹ Emma: “<strong>Cháu</strong> chào <strong>hai bác</strong> ạ.”", en: "to people your parents’ age: bác, and Minh is cháu" },
            { vi: "Minh → Lily (16): “Chào <strong>em</strong>! <strong>Anh</strong> là Minh.”", en: "to someone younger: em, and Minh is anh" },
            { vi: "Minh → mẹ: “<strong>Con</strong> ăn rồi ạ.”", en: "to his own mother: Minh is con" },
          ],
          q: "Minh nói với anh Jake (24 tuổi). Câu nào đúng?", qEn: "Minh talks to Jake (24). Which is right?",
          opts: ["Em chào anh ạ.", "Cháu chào bác ạ.", "Chào em!"], correct: "Em chào anh ạ.",
          why: { "Cháu chào bác ạ.": "Bác is for people your parents’ age — Jake is only a little older.", "Chào em!": "Jake is older than Minh, so Jake is anh and Minh is em." },
          explain: "Kinship terms work in pairs: bà / bác ↔ cháu · anh / chị ↔ em · bố / mẹ ↔ con · bạn ↔ mình.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>Pairs</strong>: <em>ông / bà ↔ cháu</em> · <em>bác ↔ cháu</em> · <em>cô / chú ↔ cháu</em> · <em>anh / chị ↔ em</em> · <em>thầy / cô ↔ em</em> · <em>bố / mẹ ↔ con</em> · <em>bạn ↔ mình / tôi</em></td><td>I ↔ you</td></tr>
              <tr><td><strong>thưa</strong> … at the start, <strong>ạ</strong> at the end, <strong>dạ / vâng</strong> for yes — to anyone older than you: <em>Dạ, cháu cảm ơn bà ạ.</em> <button class="tts" data-say="Dạ, cháu cảm ơn bà ạ.">🔊</button></td><td>polite</td></tr>
              <tr><td><strong>he / she</strong>: term + <em>ấy</em>: <em>anh ấy, chị ấy, bà ấy, em ấy</em> · <em>nó</em> only for children, animals, things</td><td>he / she</td></tr>
              <tr><td><strong>Age</strong>: (<em>năm nay</em>) + number + <em>tuổi</em> — no <em>là</em>, no <em>có</em>: <em>Bà năm nay tám mươi hai tuổi.</em> · ask <em>bao nhiêu tuổi?</em>, but <em>mấy tuổi?</em> for small children <button class="tts" data-say="Bà năm nay tám mươi hai tuổi.">🔊</button></td><td>age</td></tr>
              <tr><td><strong>Family size</strong>: <em>Gia đình bạn có mấy người?</em> — <em>Gia đình mình có năm người.</em> · <strong>job</strong>: <em>là</em> + job: <em>Mẹ Emma là giáo viên.</em></td><td>family</td></tr>
            </table>` },

        { type: "mc", id: "address", strand: "language", mins: 3,
          title: { vi: "Xưng hô cho đúng", en: "Choose the right address terms" },
          items: [
            { q: "Minh meets Emma’s father (63). Minh says:", opts: ["Cháu chào bác ạ.", "Em chào anh ạ.", "Chào bạn!"], correct: "Cháu chào bác ạ." },
            { q: "Lily (16) asks Minh: “___ là bạn của chị Emma à?”", opts: ["Anh", "Em", "Bác"], correct: "Anh", why: { "Em": "Minh is older than Lily, so she calls him anh.", "Bác": "Bác is for people your parents’ age." } },
            { q: "Bà ngoại Emma offers Minh tea. Minh answers:", opts: ["Dạ, cháu cảm ơn bà ạ.", "Ừ, cảm ơn.", "Cảm ơn bạn!"], correct: "Dạ, cháu cảm ơn bà ạ.", why: { "Ừ, cảm ơn.": "Ừ is for friends and younger people — never to an elder." } },
            { q: "Minh talks about Emma’s grandmother: “___ năm nay tám mươi hai tuổi.”", opts: ["Bà ấy", "Nó", "Chị ấy"], correct: "Bà ấy", why: { "Nó": "Nó is for children, animals or things — very rude for an elder." } },
            { q: "Minh to his mother on the phone: “Mẹ ơi, ___ đây!”", opts: ["con", "cháu", "em"], correct: "con" },
          ] },

        { type: "mc", id: "tense", strand: "language", mins: 3,
          title: { vi: "Đã, đang, sẽ, sắp, vừa", en: "đã, đang, sẽ, sắp, vừa" },
          items: [
            { q: "Bây giờ Minh ___ gọi điện cho mẹ.", opts: ["đang", "đã", "sẽ"], correct: "đang" },
            { q: "Tuần sau Minh ___ đi Richmond.", opts: ["sẽ", "vừa", "đã"], correct: "sẽ" },
            { q: "Bố Minh ___ đi làm (five minutes ago).", opts: ["vừa", "sắp", "đang"], correct: "vừa", explain: "vừa / mới + verb = just did." },
            { q: "Chị Linh ___ sinh em bé (very soon).", opts: ["sắp", "đã", "vừa"], correct: "sắp" },
            { q: "Where does the marker go? “Minh ___ (1) học ___ (2) bài ___ (3).” — đang", opts: ["(1) before the verb", "(2) after the verb", "(3) at the end"], correct: "(1) before the verb" },
          ] },

        { type: "mc", id: "yet-still-ago", strand: "language", mins: 3,
          title: { vi: "Chưa, rồi, vẫn, cách đây, tuổi", en: "chưa, rồi, vẫn, cách đây, age" },
          items: [
            { q: "Mẹ: “Con ăn tối ___?” — Minh: “Con ăn rồi ạ.”", opts: ["chưa", "không", "rồi"], correct: "chưa" },
            { q: "Mẹ: “Con mua quà chưa?” — Minh: “___, con chưa mua ạ.”", opts: ["Chưa", "Không", "Rồi"], correct: "Chưa", why: { "Không": "Answer a chưa question with chưa (not yet), not không." } },
            { q: "Bố Minh sáu mươi hai tuổi nhưng ___ đi làm.", opts: ["vẫn", "đã", "sắp"], correct: "vẫn" },
            { q: "Minh sang Mỹ năm 2024. Minh sang Mỹ ___ hai năm.", opts: ["cách đây", "sau", "từ"], correct: "cách đây" },
            { q: "“Lily is sixteen.”", opts: ["Lily mười sáu tuổi.", "Lily là mười sáu tuổi.", "Lily có mười sáu tuổi."], correct: "Lily mười sáu tuổi.", why: { "Lily là mười sáu tuổi.": "No là before an age.", "Lily có mười sáu tuổi.": "No có before an age." } },
          ] },

        { type: "cloze", id: "msg", strand: "language", mins: 2,
          title: { vi: "Tin nhắn của Minh", en: "Minh’s message" },
          instr: { vi: "Minh nhắn tin cho chị Linh. Điền từ.", en: "Minh texts his sister Linh. Fill in the blanks." },
          items: [
            { text: "Chị ơi, năm phút trước em {0} gọi điện cho mẹ. Mẹ nói tháng mười hai mẹ {1} sang Mỹ. Tuần sau em đi Richmond, nhưng em {2} mua quà cho gia đình Emma. Chị {3} khoẻ không? Bây giờ chị {4} làm gì đấy?", answers: ["vừa", "sẽ", "chưa", "có", "đang"], bank: ["vừa", "sẽ", "chưa", "có", "đang", "rồi", "lắm"] },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Ngoại hay ngoài? Chồng hay trồng? Nghe kỹ nhé!", en: "Ngoại or ngoài? Chồng or trồng? Listen closely!" },
      blocks: [
        { type: "mc", id: "look-alike", strand: "language", mins: 3,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "ngoại", q: "", opts: ["ngoại", "ngoài", "ngoái"], correct: "ngoại", explain: "bà ngoại — heavy tone (dot below). Ngoài = outside." },
            { say: "cháu", q: "", opts: ["cháu", "cháo", "chau"], correct: "cháu", explain: "cháu (grandchild) has -au · cháo = rice porridge!" },
            { say: "chồng", q: "", opts: ["chồng", "trồng", "chông"], correct: "chồng", explain: "ch- and the falling tone: chồng = husband · trồng = to plant." },
            { say: "sắp", q: "", opts: ["sắp", "sập", "xắp"], correct: "sắp", explain: "s-, ă and the rising tone: sắp = about to." },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: chaus → cháu, ngoaij → ngoại.", en: "Tap Listen, then type. Telex works: chaus → cháu, ngoaij → ngoại." },
          items: [
            { say: "cháu chào bà ạ", telex: true, answers: ["cháu chào bà ạ"], show: "Cháu chào bà ạ." },
            { say: "con ăn rồi", telex: true, answers: ["con ăn rồi"] },
            { say: "gia đình bạn có mấy người", telex: true, answers: ["gia đình bạn có mấy người"], show: "Gia đình bạn có mấy người?" },
            { say: "bà ngoại vẫn khoẻ", telex: true, answers: ["bà ngoại vẫn khoẻ", "bà ngoại vẫn khỏe"] },
          ] },
      ],
    },

    /* ═══════════════ NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Nói",
      intro: { vi: "Nói theo, rồi đóng vai và nói về gia đình bạn.", en: "Shadow, then a role play and your own family." },
      blocks: [
        { type: "record", id: "voice", strand: "output", mins: 6,
          title: { vi: "Nói · Xưng hô và gia đình", en: "Speak: address terms and family" },
          instr: { vi: "Câu 1–2: nghe rồi nói theo. Câu 3: đóng vai. Câu 4: trả lời bằng 2–3 câu đầy đủ.", en: "1–2: listen, then repeat. 3: role play. 4: answer in 2–3 full sentences." },
          prompts: [
            { vi: "Cháu chào hai bác ạ. Cháu là Minh, bạn của Emma.", en: "Hello to you both. I’m Minh, Emma’s friend." },
            { vi: "Dạ, bà ngoại cháu năm nay tám mươi tuổi ạ.", en: "My grandmother is eighty this year." },
            { vi: "Bạn gặp bà ngoại của một người bạn. Hãy chào bà, nói tên bạn, và hỏi bà có khoẻ không.", en: "Role play: you meet a friend’s grandmother. Greet her politely, say your name and ask how she is.", model: false, ask: false, maxSec: 45 },
            { vi: "Gia đình bạn có mấy người? Bây giờ họ đang làm gì?", en: "How many people are in your family? What are they doing these days?", model: false, maxSec: 45 },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st-r2", strand: "input", emoji: "📞", level: "Cấp 1", mins: 8,
          titleVi: "Gọi điện về Hà Nội", titleEn: "Calling home to Hà Nội",
          gloss: [["gọi điện", "to phone"], ["Alô", "Hello? (phone)"], ["sống", "to live"], ["nhớ", "to remember; to miss"], ["trước", "first, before"], ["quà", "gift"], ["máy bay", "airplane"]],
          body: [
            { t: "n", s: "Thứ tư, tám giờ tối, Minh gọi điện về Hà Nội. Ở Hà Nội bây giờ là tám giờ sáng thứ năm." },
            { t: "d", sp: "Mẹ Minh", s: "Alô, Minh à? Con ăn tối chưa?" },
            { t: "d", sp: "Minh", s: "Con ăn rồi ạ. Bố mẹ có khoẻ không ạ?" },
            { t: "d", sp: "Mẹ Minh", s: "Bố mẹ khoẻ. Bố vừa đi làm. Con đang làm gì đấy?" },
            { t: "d", sp: "Minh", s: "Con đang học bài. Mẹ ơi, tuần sau con sẽ đi Richmond với Emma. Gia đình Emma mời con ăn Lễ Tạ ơn." },
            { t: "d", sp: "Mẹ Minh", s: "Thế à? Gia đình Emma có mấy người?" },
            { t: "d", sp: "Minh", s: "Dạ, năm người: bố mẹ, anh trai, em gái và Emma. Bà ngoại Emma cũng sống ở Richmond. Bà năm nay tám mươi hai tuổi." },
            { t: "d", sp: "Mẹ Minh", s: "Con nhớ chào bà và hai bác trước nhé. Con gọi bố mẹ Emma là bác, xưng cháu." },
            { t: "d", sp: "Minh", s: "Dạ, con biết rồi ạ." },
            { t: "d", sp: "Mẹ Minh", s: "Con mua quà cho gia đình Emma chưa?" },
            { t: "d", sp: "Minh", s: "Chưa ạ. Ngày mai con sẽ mua." },
            { t: "d", sp: "Mẹ Minh", s: "Ừ. Còn mẹ, ngày mười lăm tháng mười hai mẹ sẽ sang Mỹ. Máy bay đến Raleigh lúc sáu giờ bốn mươi tối." },
            { t: "d", sp: "Minh", s: "Con sẽ đi đón mẹ với chị Linh ạ. Con nhớ mẹ lắm!" },
          ],
          pairs: [["sống", "to live"], ["quà", "gift"], ["nhớ", "to miss"], ["gọi điện", "to phone"]],
          order: ["Mẹ hỏi Minh ăn tối chưa.", "Minh nói tuần sau Minh sẽ đi Richmond.", "Mẹ nói Minh gọi bố mẹ Emma là bác.", "Mẹ nói ngày mẹ sang Mỹ."],
          fill: { text: "Ở Hà Nội bây giờ là tám giờ {0} thứ năm. Bố Minh {1} đi làm. Minh {2} mua quà cho gia đình Emma. Mẹ Minh {3} sang Mỹ ngày mười lăm tháng mười hai.", answers: ["sáng", "vừa", "chưa", "sẽ"], bank: ["sáng", "vừa", "chưa", "sẽ", "tối", "đang", "rồi"] } },

        { type: "readaloud", id: "read-aloud", story: "st-r2", strand: "fluency", mins: 4,
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
