/* VIET 101 (UNC Viet) — Bài 6 extra homework (Monday): Sinh nhật và mười hai con giáp · Birthdays and the 12 zodiac animals
   Follows the Mon 2/11/2026 class (teaching note: _source/viet101-hw/Vietnamese-Zodiac.md): Halloween warm-up,
   asking birthdays, the class line-up by birthday, the 12 con giáp and what they mean in Vietnamese life.
   Reviews Lesson 5 (dates, years) — goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lessons 5–6. ≈ 50 minutes at home.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world: see l05-hw1.js / l06-hw1.js. "Today" = Monday 2/11/2026.
   Facts used: Minh born 31/10/2005 (Ất Dậu, con gà) · Emma born 14/3/2006 (Bính Tuất, con chó) · chị Linh 28, tuổi Dần (1998).
   New classmates in Emma's Vietnamese class: Sofia (2/1/2006 — before Tết 29/1/2006, so still con gà), Tuấn, David.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: 6,
  titleVi: "Bài tập thêm · Sinh nhật và mười hai con giáp",
  titleEn: "Extra homework: birthdays and the 12 zodiac animals",
  description: "VIET 101, Lesson 6 extra homework (Monday): Halloween, asking someone’s birthday, saying the year you were born and your zodiac animal (con giáp), and what the 12 con giáp mean in Vietnamese life — vocabulary, grammar, spelling, speaking and a short story. About 50 minutes.",
  color: "#b91c1c",
  badge: { icon: "🐃", name: "Mười hai con giáp · The 12 zodiac animals" },

  cando: [
    { vi: "Tôi có thể hỏi và nói sinh nhật: Sinh nhật của bạn là ngày nào?", en: "I can ask and say a birthday: Sinh nhật của bạn là ngày nào?" },
    { vi: "Tôi có thể nói tôi sinh năm nào và sinh vào năm con gì.", en: "I can say what year I was born and my zodiac animal." },
    { vi: "Tôi có thể nói Halloween của tôi có vui không và tôi làm gì.", en: "I can say whether my Halloween was fun and what I did." },
    { vi: "Tôi có thể nói một chút về mười hai con giáp ở Việt Nam.", en: "I can say a little about the 12 zodiac animals in Vietnamese life." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập thêm · Bài 6 · khoảng 50 phút.", en: "Extra homework · Lesson 6 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Work through the tabs in order. Each card shows its time (⏱). You can stop and come back — your progress is saved in this browser.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>The 12 con giáp · Halloween and birthday words</td><td>8′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td><em>sinh nhật</em> or <em>sinh</em>? · <em>sinh năm nào, năm con gì, tuổi gì</em> · line up by birthday</td><td>14′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>trâu / châu, hổ / hồ, ngựa, rắn · dictation</td><td>7′</td></tr>
            <tr><td>4️⃣ Nói</td><td>Your Halloween · your birthday · your con giáp</td><td>6′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Xếp hàng theo sinh nhật</em> · read it aloud and record it · culture: what the con giáp mean</td><td>13′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · type your name · download the report (it includes your recordings) and upload it to Canvas with the completion code</td><td>4′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> this homework reviews <em>Elementary Vietnamese</em> (Ngô Như Bình) <strong>Lesson 5</strong> — dates, months and years. If you need to, look again at how to read a year (<em>hai nghìn không trăm linh sáu</em>).</p>
          <p><small>In this homework, <strong>today is Monday, November 2</strong> — two days after Halloween and Minh’s birthday. In class today, Emma’s Vietnamese class lined up by birthday and learned the 12 con giáp.</small></p>
          <p><small>Tip: tap <strong>EN</strong> in the blue header to show or hide English · 🐢 slows the voice down. No Vietnamese keyboard? Dictation boxes accept <strong>Telex</strong> (e.g. <em>traau</em> → trâu).</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Mười hai con giáp, và từ về Halloween và sinh nhật.", en: "The 12 zodiac animals, and words for Halloween and birthdays." },
      blocks: [
        { type: "flashcards", id: "cards-zodiac", strand: "language", mins: 5,
          title: { vi: "Thẻ từ · Mười hai con giáp", en: "Flashcards: the 12 zodiac animals" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ. Thứ tự này là thứ tự của con giáp.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it. The cards are in zodiac order." },
          cards: [
            { vi: "con chuột", en: "rat, mouse (Tý)", ex: "Năm 2020 là năm con chuột.", exEn: "2020 was the year of the rat." },
            { vi: "con trâu", en: "water buffalo (Sửu)", ex: "Logo của UNC Viet có con trâu.", exEn: "The UNC Viet logo has a water buffalo." },
            { vi: "con hổ", en: "tiger (Dần) · in the South: con cọp", ex: "Chị Linh tuổi con hổ.", exEn: "Chị Linh was born in a year of the tiger." },
            { vi: "con mèo", en: "cat (Mão, Mẹo) · in the Chinese zodiac: rabbit", ex: "Ở Việt Nam, năm 2023 là năm con mèo.", exEn: "In Vietnam, 2023 was the year of the cat." },
            { vi: "con rồng", en: "dragon (Thìn)", ex: "Năm 2024 là năm con rồng.", exEn: "2024 was the year of the dragon." },
            { vi: "con rắn", en: "snake (Tỵ)", ex: "Năm ngoái là năm con rắn.", exEn: "Last year was the year of the snake." },
            { vi: "con ngựa", en: "horse (Ngọ)", ex: "Năm nay là năm con ngựa.", exEn: "This year is the year of the horse." },
            { vi: "con dê", en: "goat (Mùi)", ex: "Năm sau là năm con dê.", exEn: "Next year is the year of the goat." },
            { vi: "con khỉ", en: "monkey (Thân)", ex: "Tuấn sinh năm 2004, năm con khỉ.", exEn: "Tuấn was born in 2004, the year of the monkey." },
            { vi: "con gà", en: "rooster, chicken (Dậu)", ex: "Minh sinh vào năm con gà.", exEn: "Minh was born in the year of the rooster." },
            { vi: "con chó", en: "dog (Tuất)", ex: "Emma sinh vào năm con chó.", exEn: "Emma was born in the year of the dog." },
            { vi: "con heo", en: "pig (Hợi) · in the North: con lợn", ex: "Năm 2007 là năm con heo.", exEn: "2007 was the year of the pig." },
          ] },

        { type: "match", id: "match-words", strand: "language", mins: 3,
          title: { vi: "Ghép · Halloween và sinh nhật", en: "Match: Halloween and birthdays" },
          instr: { vi: "Ghép tiếng Việt với nghĩa tiếng Anh.", en: "Match the Vietnamese to its meaning." },
          pairs: [
            { a: "vui lắm", b: "lots of fun" },
            { a: "rất sợ", b: "very scared" },
            { a: "đi tiệc", b: "to go to a party" },
            { a: "hóa trang", b: "to dress up (in a costume)" },
            { a: "sinh", b: "to be born" },
            { a: "con giáp", b: "zodiac animal" },
            { a: "xếp hàng", b: "to line up" },
          ] },

        { type: "html", title: { vi: "Bảng con giáp · Tìm năm của bạn", en: "Zodiac table: find your year" }, strand: "input", mins: 0, html: `
          <p>The animals come round every <strong>12 years</strong>. Find your birth year, then say it: <em>Mình sinh vào năm con …</em> <button class="tts" data-say="Mình sinh vào năm con gà.">🔊</button></p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Con giáp</th><th>Tên năm · Name</th><th>Năm · Years</th></tr>
            <tr><td>🐀 con chuột</td><td>Tý</td><td>1996 · 2008 · 2020</td></tr>
            <tr><td>🐃 con trâu</td><td>Sửu</td><td>1997 · 2009 · 2021</td></tr>
            <tr><td>🐅 con hổ (cọp)</td><td>Dần</td><td>1998 · 2010 · 2022</td></tr>
            <tr><td>🐈 con mèo</td><td>Mão (Mẹo)</td><td>1999 · 2011 · 2023</td></tr>
            <tr><td>🐉 con rồng</td><td>Thìn</td><td>2000 · 2012 · 2024</td></tr>
            <tr><td>🐍 con rắn</td><td>Tỵ</td><td>2001 · 2013 · 2025</td></tr>
            <tr><td>🐎 con ngựa</td><td>Ngọ</td><td>2002 · 2014 · <strong>2026</strong></td></tr>
            <tr><td>🐐 con dê</td><td>Mùi</td><td>2003 · 2015 · 2027</td></tr>
            <tr><td>🐒 con khỉ</td><td>Thân</td><td>2004 · 2016 · 2028</td></tr>
            <tr><td>🐓 con gà</td><td>Dậu</td><td>2005 · 2017 · 2029</td></tr>
            <tr><td>🐕 con chó</td><td>Tuất</td><td>2006 · 2018 · 2030</td></tr>
            <tr><td>🐖 con heo (lợn)</td><td>Hợi</td><td>2007 · 2019 · 2031</td></tr>
          </table></div>
          <p>Parents’ or grandparents’ years? Take away 12: 2008 → 1996 → 1984 → 1972 are all <em>năm con chuột</em>.</p>
          <p><strong>⚠️ Born in January or early February?</strong> The zodiac year begins at <strong>Tết</strong> (Lunar New Year, late January to mid-February), not on January 1. If your birthday is before Tết, you belong to the <em>year before</em> — check the Tết date for your birth year.</p>` },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Sinh nhật hay sinh? Năm nào hay năm con gì? Xem ví dụ trước, rồi tìm quy luật.", en: "Sinh nhật or sinh? Which year, or which animal? Examples first, then the rule." },
      blocks: [
        { type: "notice", id: "notice-born", strand: "language", mins: 4,
          title: { vi: "Khám phá · Sinh nhật và sinh", en: "Discover: sinh nhật and sinh" },
          examples: [
            { vi: "<strong>Sinh nhật</strong> của bạn là ngày nào? — <strong>Sinh nhật</strong> của mình là ngày mười bốn tháng ba.", en: "When is your birthday? — My birthday is March 14." },
            { vi: "Bạn <strong>sinh</strong> vào ngày nào? — Mình <strong>sinh</strong> vào ngày mười bốn tháng ba.", en: "What day were you born? — I was born on March 14." },
            { vi: "Bạn <strong>sinh</strong> năm nào? — Mình <strong>sinh</strong> năm hai nghìn không trăm linh sáu.", en: "What year were you born? — I was born in 2006." },
            { vi: "Bạn <strong>sinh</strong> vào năm con gì? — Mình <strong>sinh</strong> vào năm con chó.", en: "What zodiac animal were you born under? — The dog." },
          ],
          q: "Bạn muốn biết một người bạn sinh năm 2005 hay 2006. Bạn hỏi …", qEn: "You want to know if a friend was born in 2005 or 2006. You ask …",
          opts: ["Bạn sinh năm nào?", "Sinh nhật của bạn là ngày nào?"], correct: "Bạn sinh năm nào?",
          why: { "Sinh nhật của bạn là ngày nào?": "Look again: sinh nhật (birthday) is the day and month you celebrate every year. For the year, use the verb sinh: sinh năm nào?" },
          explain: "sinh nhật = birthday (the day you celebrate) · sinh = to be born (+ vào ngày / năm …).",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>Sinh nhật (của) + person + là ngày …</strong>: <em>Sinh nhật của mình là ngày mồng hai tháng một.</em> Colloquial: <em>Bạn sinh nhật ngày nào?</em> <button class="tts" data-say="Sinh nhật của mình là ngày mồng hai tháng một.">🔊</button></td><td>my birthday is …</td></tr>
              <tr><td><strong>sinh vào ngày … tháng …</strong>: <em>Mình sinh vào ngày chín tháng bảy.</em> Day first, then month — like the date. <button class="tts" data-say="Mình sinh vào ngày chín tháng bảy.">🔊</button></td><td>I was born on …</td></tr>
              <tr><td><strong>sinh năm …</strong>: <em>Minh sinh năm hai nghìn không trăm linh năm.</em> Read the whole number. <button class="tts" data-say="Minh sinh năm hai nghìn không trăm linh năm.">🔊</button></td><td>born in (year)</td></tr>
              <tr><td><strong>sinh vào năm con …</strong> or <strong>tuổi + animal / year name</strong>: <em>Bạn tuổi gì? — Mình tuổi Tuất, tuổi con chó.</em> <button class="tts" data-say="Bạn tuổi gì? Mình tuổi Tuất, tuổi con chó.">🔊</button></td><td>zodiac animal</td></tr>
              <tr><td><strong>Còn + you?</strong> — send the question back with the right word for “you”: <em>Còn bạn? · Còn anh? · Còn chị? · Còn thầy? · Còn cô?</em> <button class="tts" data-say="Còn bạn? Còn chị? Còn thầy?">🔊</button></td><td>and you?</td></tr>
            </table>` },

        { type: "mc", id: "dates", strand: "language", mins: 3,
          title: { vi: "Halloween và sinh nhật", en: "Halloween and birthdays" },
          items: [
            { q: "Bạn đi tiệc Halloween. Bạn thích lắm! “Halloween của bạn có vui không?” — Bạn nói:", opts: ["Vui lắm!", "Không vui lắm.", "Rất sợ!"], correct: "Vui lắm!" },
            { q: "Halloween là ngày …", opts: ["ngày ba mươi mốt tháng mười", "ngày mười ba tháng mười một", "ngày ba mươi tháng mười hai"], correct: "ngày ba mươi mốt tháng mười" },
            { q: "Câu nào đúng?", opts: ["Mình sinh vào ngày mười bốn tháng ba.", "Mình sinh vào tháng ba ngày mười bốn.", "Mình sinh nhật là vào mười bốn ngày tháng ba."], correct: "Mình sinh vào ngày mười bốn tháng ba.", why: { "Mình sinh vào tháng ba ngày mười bốn.": "That’s the English order (March 14). In Vietnamese the day comes first: ngày mười bốn tháng ba." } },
            { q: "Bạn hỏi thầy giáo: “Sinh nhật của ___ là ngày nào ạ?”", opts: ["thầy", "bạn", "em"], correct: "thầy", why: { "bạn": "Bạn is for classmates and friends your age. To your teacher, say thầy (or cô) — and end with ạ." } },
            { q: "Sofia: “Mình sinh vào tháng một.” Emma muốn hỏi lại Sofia. Emma nói: “___”", en: "Emma asks Sofia which day.", opts: ["Ngày bao nhiêu?", "Năm con gì?", "Mấy giờ?"], correct: "Ngày bao nhiêu?" },
          ] },

        { type: "mc", id: "zodiac", strand: "language", mins: 4,
          title: { vi: "Năm con gì?", en: "Which zodiac animal?" },
          instr: { vi: "Dùng bảng con giáp ở tab Từ vựng.", en: "Use the zodiac table in the Từ vựng tab." },
          items: [
            { q: "Minh sinh năm 2005. Minh sinh vào năm con gì?", opts: ["con gà", "con khỉ", "con chó"], correct: "con gà" },
            { q: "Năm nay, 2026, là năm con gì?", opts: ["con ngựa", "con rắn", "con dê"], correct: "con ngựa" },
            { q: "Chị Linh năm nay hai mươi tám tuổi. Chị ấy tuổi con hổ. Chị ấy sinh năm …", opts: ["1998", "1997", "2010"], correct: "1998", explain: "Con hổ: 1998, 2010, 2022. 2026 − 28 = 1998." },
            { q: "Năm sau là năm con …", opts: ["dê", "ngựa", "khỉ"], correct: "dê", explain: "Năm sau = 2027, năm con dê (Mùi)." },
            { q: "Ở Trung Quốc, năm 2023 là năm con thỏ (rabbit). Ở Việt Nam, năm 2023 là năm con …", opts: ["mèo", "thỏ", "chuột"], correct: "mèo" },
            { q: "Sofia sinh ngày mồng hai tháng một năm 2006. Tết năm 2006 là ngày hai mươi chín tháng một. Sofia tuổi con gì?", opts: ["con gà", "con chó", "con heo"], correct: "con gà", why: { "con chó": "2006 is the year of the dog — but it only starts at Tết (29/1/2006). Sofia was born before Tết, so she belongs to 2005: con gà." }, explain: "Before Tết → the year before. Sofia is a con gà, like Minh!" },
          ] },

        { type: "builder", id: "build", strand: "language", mins: 3,
          title: { vi: "Xếp câu và xếp hàng", en: "Build the sentence, then line up" },
          items: [
            { en: "I was born on March 14.", tiles: ["Mình", "sinh", "vào", "ngày", "mười bốn", "tháng ba"], answer: "Mình sinh vào ngày mười bốn tháng ba." },
            { en: "What zodiac animal were you born under?", tiles: ["Bạn", "sinh", "vào", "năm", "con", "gì?"], answer: "Bạn sinh vào năm con gì?" },
            { vertical: true, en: "Xếp hàng theo sinh nhật, từ tháng một đến tháng mười hai · Line them up by birthday, January first: David — ngày hai mươi tháng mười hai · Tuấn — ngày chín tháng bảy · Sofia — ngày mồng hai tháng một · Emma — ngày mười bốn tháng ba", tiles: ["Sofia", "Emma", "Tuấn", "David"], answer: "Sofia, Emma, Tuấn, David." },
            { vertical: true, en: "Xếp hàng theo sinh nhật · Line them up by birthday, January first: Mai — ngày mười hai tháng mười · Khoa — ngày mồng ba tháng năm · Vy — ngày mồng một tháng mười hai · Long — ngày hai mươi mốt tháng hai · Hà — ngày ba mươi tháng năm", tiles: ["Long", "Khoa", "Hà", "Mai", "Vy"], answer: "Long, Khoa, Hà, Mai, Vy.", hint: "Khoa and Hà are both in tháng năm — look at the day." },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Con trâu hay con châu? Nghe kỹ phụ âm và dấu.", en: "Trâu or châu? Listen closely to the first sound and the tone mark." },
      blocks: [
        { type: "mc", id: "tone-pick", strand: "language", mins: 3,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "trâu", q: "", opts: ["trâu", "châu", "trầu"], correct: "trâu", explain: "con trâu = water buffalo · châu = continent (châu Á) · trầu = betel leaf. In the North tr- and ch- sound alike — learn the spelling with the word." },
            { say: "hổ", q: "", opts: ["hổ", "hồ", "hố"], correct: "hổ", explain: "hổ (hỏi tone) = tiger · hồ (falling) = lake · hố = a hole." },
            { say: "ngựa", q: "", opts: ["ngựa", "ngừa", "ngưa"], correct: "ngựa", explain: "ngựa = horse: ng + ưa, with the nặng tone under ư." },
            { say: "rắn", q: "", opts: ["rắn", "rán", "dắn"], correct: "rắn", explain: "rắn (short ă) = snake · rán = to fry." },
            { say: "khỉ", q: "", opts: ["khỉ", "khi", "khí"], correct: "khỉ", explain: "khỉ (hỏi) = monkey · khi = when · khí = air, gas." },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 4,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: traau → trâu, nguwja → ngựa, roofng → rồng.", en: "Tap Listen, then type. Telex works: traau → trâu, nguwja → ngựa, roofng → rồng." },
          items: [
            { say: "con trâu", telex: true, answers: ["con trâu"] },
            { say: "con ngựa", telex: true, answers: ["con ngựa"] },
            { say: "sinh nhật", telex: true, answers: ["sinh nhật"] },
            { say: "năm con rồng", telex: true, answers: ["năm con rồng"] },
            { say: "mình sinh vào tháng ba", telex: true, answers: ["mình sinh vào tháng ba"], show: "Mình sinh vào tháng ba." },
          ] },
      ],
    },

    /* ═══════════════ NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Nói",
      intro: { vi: "Nghe, rồi nói. Ghi âm và nghe lại giọng của bạn.", en: "Listen, then speak. Record and listen back to yourself." },
      blocks: [
        { type: "record", id: "shadow", strand: "fluency", mins: 2,
          title: { vi: "Nói theo", en: "Shadowing" },
          instr: { vi: "Bấm 🔊, nghe hai lần, rồi ghi âm và nói lại thật giống.", en: "Tap 🔊, listen twice, then record yourself saying it the same way." },
          prompts: [
            { vi: "Sinh nhật của bạn là ngày nào?", en: "When is your birthday?", ask: false },
            { vi: "Mình sinh vào năm con chó. Còn bạn?", en: "I was born in the year of the dog. And you?", ask: false },
            { vi: "Ở Việt Nam là con mèo, không phải con thỏ.", en: "In Vietnam it’s the cat, not the rabbit." },
          ] },

        { type: "record", id: "about-me", strand: "output", mins: 4,
          title: { vi: "Nói về bạn", en: "Your turn" },
          instr: { vi: "Trả lời bằng một hoặc hai câu. Không có mẫu — đây là câu của bạn!", en: "Answer in one or two sentences. No model — it’s your sentence!" },
          prompts: [
            { vi: "Halloween của bạn có vui không? Bạn làm gì vào dịp Halloween?", en: "e.g. Vui lắm! Mình đi tiệc với bạn. / Không vui lắm. Mình ở nhà.", model: false },
            { vi: "Sinh nhật của bạn là ngày nào?", en: "e.g. Mình sinh vào ngày … tháng …", model: false },
            { vi: "Bạn sinh năm nào? Bạn sinh vào năm con gì?", en: "e.g. Mình sinh năm … , năm con … (check the table in Từ vựng — and Tết!)", model: false },
            { vi: "Bây giờ bạn hỏi thầy giáo về sinh nhật của thầy.", en: "Now ask your teacher when their birthday is — use thầy and ạ.", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Cuối cùng, đọc to cả câu chuyện và ghi âm để nộp.", en: "Open the story, tap Read along, then do the three short tasks under it. Last, read the whole story aloud and record it for your teacher." },
      blocks: [
        { type: "story", id: "st1", strand: "input", emoji: "🐓", level: "Cấp 1", mins: 7,
          titleVi: "Xếp hàng theo sinh nhật", titleEn: "Lining up by birthday",
          gloss: [["xếp hàng", "to line up"], ["theo", "by, according to"], ["đứng", "to stand"], ["trước", "before, in front of"], ["sau", "after, behind"], ["gọi điện", "to phone"], ["con giáp", "zodiac animal"], ["phải không", "right?"]],
          body: [
            { t: "n", s: "Thứ hai, ngày hai tháng mười một. Ở lớp tiếng Việt, thầy giáo nói: “Hôm nay cả lớp xếp hàng theo sinh nhật.”" },
            { t: "d", sp: "Emma", s: "Sofia ơi, sinh nhật của bạn là ngày nào?" },
            { t: "d", sp: "Sofia", s: "Mình sinh vào ngày mồng hai tháng một. Còn bạn?" },
            { t: "d", sp: "Emma", s: "Mình sinh vào ngày mười bốn tháng ba. Vậy bạn đứng trước mình." },
            { t: "d", sp: "Tuấn", s: "Sinh nhật mình là ngày chín tháng bảy. Mình đứng sau Emma." },
            { t: "n", s: "Buổi tối, Emma gọi điện cho Minh." },
            { t: "d", sp: "Emma", s: "Minh ơi, hôm nay lớp mình học mười hai con giáp. Bạn sinh vào năm con gì?" },
            { t: "d", sp: "Minh", s: "Mình sinh năm hai nghìn không trăm linh năm, năm con gà. Còn Emma?" },
            { t: "d", sp: "Emma", s: "Mình sinh năm hai nghìn không trăm linh sáu, năm con chó. Còn chị Linh?" },
            { t: "d", sp: "Minh", s: "Chị Linh tuổi Dần, tuổi con hổ." },
            { t: "d", sp: "Emma", s: "Năm 2023 là năm con thỏ, phải không?" },
            { t: "d", sp: "Minh", s: "Ở Trung Quốc là con thỏ, nhưng ở Việt Nam là con mèo!" },
          ],
          pairs: [["xếp hàng", "to line up"], ["đứng trước", "to stand in front"], ["con gà", "rooster"], ["con mèo", "cat"]],
          order: ["Thầy giáo nói cả lớp xếp hàng theo sinh nhật.", "Sofia nói Sofia sinh vào ngày mồng hai tháng một.", "Emma gọi điện cho Minh.", "Minh nói ở Việt Nam là con mèo."],
          fill: { text: "Sofia đứng {0} Emma. Tuấn đứng {1} Emma. Minh sinh vào năm con {2}. Emma sinh vào năm con {3}.", answers: ["trước", "sau", "gà", "chó"], bank: ["trước", "sau", "gà", "chó", "hổ", "mèo"] } },

        { type: "readaloud", id: "read-aloud", story: "st1", strand: "fluency", mins: 4,
          title: { vi: "Đọc to", en: "Read aloud" },
          instr: { vi: "Nghe lại câu chuyện ở trên một lần. Rồi bấm ● Ghi âm và đọc to cả câu chuyện — rõ ràng, không cần nhanh. Bản ghi âm sẽ có trong báo cáo bạn nộp.", en: "Listen to the story above once more. Then tap ● Record and read the whole story aloud — clearly, no need to rush. Your recording goes into the report you submit." } },

        { type: "html", title: { vi: "Văn hóa · Con giáp trong đời sống người Việt", en: "Culture: the con giáp in Vietnamese life" }, strand: "input", mins: 0, html: `
          <p>You may have seen this already — a calendar on the wall at Tết, a relative asking <em>Cháu tuổi gì?</em>, red envelopes with this year’s animal on them. Here is what is behind it.</p>
          <ul>
            <li><strong>Tuổi gì?</strong> Vietnamese people often ask your <em>tuổi</em> (zodiac year) as well as your age. <em>Mình tuổi Tuất</em> = I was born in a year of the dog.</li>
            <li><strong>The year starts at Tết.</strong> The animal changes at the Lunar New Year, not on January 1. 2026 is <em>năm Bính Ngọ</em> — the horse.</li>
            <li><strong>Big decisions.</strong> Many families check whether two people’s <em>tuổi</em> <strong>hợp</strong> (go well together) before a wedding (<em>đám cưới</em>). People also pick a good year or day to build a house or open a shop, and invite someone with a “good” tuổi to be the first visitor of the new year (<em>xông đất</em>).</li>
            <li><strong>Personality.</strong> People say the animal shows your character: the buffalo is <em>chăm chỉ</em> (hard-working), the tiger is <em>dũng cảm</em> (brave). In class we compared this with personality models such as the Big Five: a way to talk about tendencies, not a rule about who you are.</li>
            <li><strong>Belief or pattern?</strong> Over a short time it can look like superstition. Over many generations, though, people noticed what tended to happen and passed it on — so it works more like a pattern or a probability than a fixed fate.</li>
          </ul>
          <p>🐃 <strong>Con trâu</strong> (Sửu) is also the <strong>UNC Viet mascot</strong> — look at the logo at the bottom of this page. In Vietnam the water buffalo stands for hard work and the farming village: <em>con trâu là đầu cơ nghiệp</em> (“the buffalo is the start of a family’s fortune”). <button class="tts" data-say="Con trâu là đầu cơ nghiệp.">🔊</button></p>
          <p><small>Heritage learners: ask a parent or grandparent <em>Bố/Mẹ tuổi gì?</em> — and what they believe about it. Their answer is a great topic for next class.</small></p>` },

        { type: "mc", id: "culture", strand: "input", mins: 2,
          title: { vi: "Văn hóa · Bạn nhớ không?", en: "Culture: do you remember?" },
          items: [
            { q: "In the Vietnamese zodiac, which animal is different from the Chinese zodiac?", opts: ["con mèo (instead of the rabbit)", "con rồng (instead of the snake)", "con trâu (instead of the horse)"], correct: "con mèo (instead of the rabbit)" },
            { q: "When does a new zodiac year begin?", opts: ["At Tết, the Lunar New Year", "On January 1", "On your birthday"], correct: "At Tết, the Lunar New Year" },
            { q: "“Hai người hợp tuổi” means …", opts: ["their zodiac years go well together", "they are the same age", "they have the same birthday"], correct: "their zodiac years go well together", explain: "Families sometimes check this before a wedding." },
          ] },
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
