/* VIET 203 (UNC Viet) — M4 T3 “Viết thư cho người thân” · Bài tập 1/3 (after Monday's class) · ≈ 25 minutes
   Week package for the presentational task M10T3 (taskbook/m10t3.html, Huy Phung 2024), adapted 2026-11-03:
     Mon class (slides 1: read a letter) → HW1 (this page) → Wed class (slides 2: write a reply) → HW2 (draft)
     → Fri class (slides 3: peer review + letter exchange + task quiz) → HW3 (final letter, the exit task).
   This page: letter words and parts of a letter, salutations and endings by formality, Mom's letter (re-read, check
   details), and a 30-second voicemail to Mom — the bridge to the written reply in HW2.
   Mom's letter is Huy's taskbook letter, adapted: the child studies at UNC Chapel Hill, the letter is dated
   8/11/2026 and adds a Thanksgiving question. Everything else is original.
   Engine: ../assets/bv.js (copy of the VIET 101 homework engine, re-copied 2026-11-03). */
(function () {

window.BV_CHAPTER = {
  id: 4,
  titleVi: "Viết thư cho người thân · Bài tập 1: Đọc thư của mẹ",
  titleEn: "Write a letter to a family member · Homework 1: Mom’s letter",
  description: "VIET 203, Module 4 Task 3, homework 1 of 3 (after Monday’s class): letter words, the parts of a letter, formal and informal salutations and endings, Mom’s letter, and a voicemail reply. About 25 minutes.",
  color: "#9a3412",
  badge: { icon: "✉️", name: "Thư của mẹ · Mom’s letter" },

  cando: [
    { vi: "Tôi có thể gọi tên các phần của một lá thư.", en: "I can name the parts of a letter." },
    { vi: "Tôi có thể chọn lời chào và lời kết hợp với người nhận (trang trọng hay thân mật).", en: "I can choose a salutation and an ending that fit the reader (formal or informal)." },
    { vi: "Tôi có thể đọc một lá thư của người thân và tìm thông tin chính.", en: "I can read a letter from a family member and find the main information." },
    { vi: "Tôi có thể gửi một tin nhắn thoại ngắn để trả lời lá thư.", en: "I can send a short voicemail in reply to the letter." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập 1 · sau buổi học thứ Hai · khoảng 25 phút.", en: "Homework 1 · after Monday’s class · about 25 minutes." },
      blocks: [
        { type: "html", title: { vi: "Tuần này: Viết thư cho người thân", en: "This week: write a letter to a family member" }, html: `
          <p>This week’s task is <strong>presentational</strong>: by Sunday you write a real letter in Vietnamese to a family member or friend who lives in another city or country. Each class and each homework is one step towards it.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Khi nào · When</th><th>Bạn làm gì · What you do</th></tr>
            <tr><td>Thứ Hai · in class</td><td>Parts of a letter · formal or informal? · read Mom’s letter</td></tr>
            <tr><td><strong>Bài tập 1 · this page</strong></td><td><strong>Letter words · salutations and endings · Mom’s letter again · a voicemail to Mom</strong></td></tr>
            <tr><td>Thứ Tư · in class</td><td>How to answer a letter · plan and start your reply</td></tr>
            <tr><td>Bài tập 2</td><td>Finish your reply to Mom (150–250 words)</td></tr>
            <tr><td>Thứ Sáu · in class</td><td>Peer review · write to a classmate in role · task quiz</td></tr>
            <tr><td>Bài tập 3 · by Sunday</td><td>🏆 Your own letter to a family member (250+ words)</td></tr>
          </table></div>
          <h4>Today’s plan</h4>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Letter words · the parts of a letter</td><td>6′</td></tr>
            <tr><td>2️⃣ Ngôn ngữ</td><td>Formal or informal? Salutations and endings · useful letter phrases</td><td>7′</td></tr>
            <tr><td>3️⃣ Đọc</td><td>Mom’s letter: read along, check the details, read it aloud</td><td>9′</td></tr>
            <tr><td>4️⃣ Nói</td><td>A 30-second voicemail to Mom</td><td>3′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · Quick Feedback · download the report and upload it to Canvas</td><td>3′</td></tr>
          </table></div>
          <p><small>Tip: tap <strong>EN</strong> in the header to show or hide English · 🐢 slows the voice down. Your progress is saved in this browser.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Từ về thư từ, và các phần của một lá thư.", en: "Letter words, and the parts of a letter." },
      blocks: [
        { type: "flashcards", id: "cards-letter", strand: "language", mins: 3,
          title: { vi: "Thẻ từ · Thư từ", en: "Flashcards: letters" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "lá thư · bức thư", en: "a letter", ex: "Hôm qua con nhận được lá thư của mẹ.", exEn: "Yesterday I got Mom’s letter." },
            { vi: "phong bì · bao thư", en: "envelope (bao thư: more Southern)", ex: "Bà viết địa chỉ lên phong bì.", exEn: "Grandma writes the address on the envelope." },
            { vi: "hộp thư · thùng thư", en: "mailbox", ex: "Sáng nào mẹ cũng mở hộp thư.", exEn: "Mom checks the mailbox every morning." },
            { vi: "người gửi", en: "sender", ex: "Người gửi là bà nội.", exEn: "The sender is Grandma." },
            { vi: "người nhận", en: "recipient", ex: "Người nhận phải viết thư trả lời.", exEn: "The recipient has to write back." },
            { vi: "viết thư trả lời", en: "to write back, to reply", ex: "Cuối tuần này con sẽ viết thư trả lời mẹ.", exEn: "This weekend I’ll write back to Mom." },
            { vi: "lời chào", en: "greeting, salutation", ex: "“Mẹ kính yêu” là lời chào.", exEn: "“Mẹ kính yêu” is the salutation." },
            { vi: "chữ ký", en: "signature", ex: "Cuối thư có chữ ký của bố.", exEn: "Dad’s signature is at the end of the letter." },
            { vi: "trang trọng", en: "formal", ex: "Thư gửi thầy cô thường trang trọng.", exEn: "Letters to teachers are usually formal." },
            { vi: "thân mật", en: "informal, warm and close", ex: "Thư gửi gia đình thường thân mật.", exEn: "Letters to family are usually informal." },
            { vi: "hỏi thăm", en: "to ask after (someone), to check in on", ex: "Mẹ viết thư để hỏi thăm con.", exEn: "Mom writes to check in on me." },
            { vi: "giữ liên lạc", en: "to keep in touch", ex: "Nhớ giữ liên lạc với mẹ nhé!", exEn: "Remember to keep in touch with Mom!" },
          ] },

        { type: "match", id: "match-parts", strand: "language", mins: 3,
          title: { vi: "Ghép · Các phần của lá thư", en: "Match: the parts of a letter" },
          instr: { vi: "Mỗi dòng ở bên trái là phần nào của lá thư?", en: "Which part of a letter is each line on the left?" },
          pairs: [
            { a: "San Jose, ngày 8 tháng 11 năm 2026", b: "nơi viết, thời gian" },
            { a: "Con yêu quý của mẹ,", b: "lời chào" },
            { a: "Mẹ viết thư này để hỏi thăm con.", b: "đầu thư" },
            { a: "Học kỳ này con học những môn gì?", b: "phần chính" },
            { a: "Mẹ yêu con nhiều lắm. Con nhớ chăm sóc bản thân nhé!", b: "cuối thư" },
            { a: "Yêu con nhiều, Mẹ", b: "lời kết và chữ ký" },
          ] },
      ],
    },

    /* ═══════════════ NGÔN NGỮ ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngôn ngữ",
      intro: { vi: "Trang trọng hay thân mật? Lời chào và lời kết phải hợp với người nhận.", en: "Formal or informal? The salutation and the ending must fit the reader." },
      blocks: [
        { type: "notice", id: "notice-salute", strand: "language", mins: 3,
          title: { vi: "Khám phá · Lời chào trong thư", en: "Discover: salutations" },
          examples: [
            { vi: "<strong>Kính gửi</strong> thầy Huy, … <strong>Trân trọng,</strong>", en: "Email to a teacher — formal" },
            { vi: "Minh <strong>thân mến</strong>, … <strong>Thân,</strong> Emma", en: "Letter to a friend — semi-formal" },
            { vi: "Mẹ <strong>kính yêu</strong>, … <strong>Con của mẹ,</strong> Emma", en: "Child to mother — family, younger to older" },
            { vi: "Con <strong>yêu quý</strong> của mẹ, … <strong>Yêu con nhiều,</strong> Mẹ", en: "Mother to child — family, older to younger" },
          ],
          q: "Bạn viết thư cho bà ngoại. Bạn bắt đầu:", qEn: "You are writing to your grandmother. You start with:",
          opts: ["Bà ngoại kính yêu,", "Kính gửi bà ngoại,", "Bà ngoại thân mến,"], correct: "Bà ngoại kính yêu,",
          why: { "Kính gửi bà ngoại,": "Kính gửi opens formal letters and emails (a teacher, an office, a company). To your grandmother it sounds cold.", "Bà ngoại thân mến,": "Thân mến is what friends write to each other. For a grandparent, show love and respect: kính yêu." },
          explain: "kính gửi = formal · thân mến = friends · kính yêu = love + respect, to an older family member · yêu quý (của …) = warm; older to younger often adds của + me: Con yêu quý của mẹ.",
          reveal: `
            <table class="ex-table">
              <tr><td><strong>Formal</strong> · teacher, office, company: <em>Kính gửi + thầy / cô / ông / bà + tên,</em> → ends with <em>Trân trọng,</em> · <em>Chân thành cảm ơn,</em> <button class="tts" data-say="Kính gửi cô Lan.">🔊</button></td><td>trang trọng</td></tr>
              <tr><td><strong>Semi-formal</strong> · friends, classmates: <em>Tên + thân mến,</em> · <em>Thân gửi + tên,</em> → ends with <em>Thân,</em> · <em>Thân mến,</em> <button class="tts" data-say="Minh thân mến.">🔊</button></td><td>bán trang trọng</td></tr>
              <tr><td><strong>Informal</strong> · family: <em>Mẹ kính yêu, · Bà nội kính yêu,</em> (to older) · <em>Con yêu quý của mẹ, · Em yêu,</em> (to younger) → ends with <em>Yêu mẹ nhiều, · Thương cháu nhiều, · Con của mẹ,</em> <button class="tts" data-say="Mẹ kính yêu.">🔊</button></td><td>thân mật</td></tr>
              <tr><td><strong>The date line</strong> goes top right: <em>Nơi viết, ngày … tháng … năm …</em> — <em>Chapel Hill, ngày 15 tháng 11 năm 2026</em> <button class="tts" data-say="Chapel Hill, ngày mười lăm tháng mười một năm hai nghìn không trăm hai mươi sáu.">🔊</button></td><td>nơi viết, thời gian</td></tr>
            </table>` },

        { type: "mc", id: "who-salute", strand: "language", mins: 2,
          title: { vi: "Bạn viết cho ai?", en: "Who are you writing to?" },
          instr: { vi: "Chọn lời chào hoặc lời kết hợp nhất.", en: "Choose the salutation or ending that fits best." },
          items: [
            { q: "Bạn viết email cho thầy giáo tiếng Việt để xin nộp bài muộn.", opts: ["Kính gửi thầy Huy,", "Huy thân mến,", "Thầy yêu,"], correct: "Kính gửi thầy Huy," },
            { q: "Một công ty Internet gửi thư chúc Tết cho khách hàng.", opts: ["Kính gửi Quý khách hàng,", "Khách hàng thân yêu của em,", "Chào khách,"], correct: "Kính gửi Quý khách hàng," },
            { q: "Emma viết thư cho Minh, một người bạn cũ.", opts: ["Minh thân mến,", "Kính gửi anh Minh,", "Minh yêu quý của chị,"], correct: "Minh thân mến," },
            { q: "Ông nội viết thư cho cháu gái.", opts: ["Cháu yêu quý của ông,", "Kính gửi cháu,", "Thưa cháu,"], correct: "Cháu yêu quý của ông," },
            { q: "Lời kết cho email gửi cô giáo:", opts: ["Trân trọng,", "Yêu cô nhiều,", "Thương,"], correct: "Trân trọng," },
            { q: "Lời kết cho thư gửi mẹ:", opts: ["Con của mẹ,", "Trân trọng,", "Kính thư,"], correct: "Con của mẹ,", why: { "Trân trọng,": "Trân trọng is for formal letters. To Mom it sounds like a business letter!", "Kính thư,": "Kính thư is very formal and old-fashioned — not for a letter to Mom." } },
          ] },

        { type: "mc", id: "phrases", strand: "language", mins: 2,
          title: { vi: "Cụm từ trong thư", en: "Letter phrases" },
          instr: { vi: "Chọn từ đúng để hoàn thành câu.", en: "Choose the right words to complete the sentence." },
          items: [
            { q: "Con hy vọng bố mẹ ở nhà vẫn ___ và vui vẻ.", opts: ["mạnh khỏe", "trải nghiệm", "tận tâm"], correct: "mạnh khỏe" },
            { q: "Mẹ viết thư này để ___ con.", opts: ["hỏi thăm", "nghe tin", "dừng bút"], correct: "hỏi thăm" },
            { q: "Lâu rồi bà không ___ gì của cháu, nên nhận được thư cháu bà vui lắm.", opts: ["nghe tin", "nghe nói", "quyết định"], correct: "nghe tin", why: { "nghe nói": "Nghe nói = “I heard that …” (a rumour, news about something). Nghe tin (của ai) = to hear from someone." } },
            { q: "Ở Chapel Hill, con có nhiều ___ thú vị.", opts: ["trải nghiệm", "sức khỏe", "liên lạc"], correct: "trải nghiệm" },
            { q: "Mẹ ___ đây. Con nhớ ăn uống đầy đủ nhé!", opts: ["dừng bút", "dừng lại", "hết bút"], correct: "dừng bút", explain: "Dừng bút (đây) = “I’ll stop (writing) here” — a set phrase near the end of a letter." },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "3️⃣", label: "Đọc",
      intro: { vi: "Đọc lại thư của mẹ. Bấm “Nghe và đọc theo”, rồi làm các bài tập nhỏ. Cuối cùng, đọc to lá thư và ghi âm.", en: "Read Mom’s letter again. Tap Read along, then do the short tasks. Last, read the letter aloud and record it." },
      blocks: [
        { type: "story", id: "st1", strand: "input", emoji: "✉️", level: "Trung cấp", mins: 4,
          titleVi: "Thư của mẹ", titleEn: "Mom’s letter",
          gloss: [["hỏi thăm", "to ask after you"], ["trải nghiệm", "experiences"], ["ký túc xá", "dorm"], ["thuê nhà ngoài", "to rent off campus"], ["đầy đủ tiện nghi", "well equipped"], ["nghỉ ngơi", "to rest"], ["khó khăn", "difficulties"], ["kiến thức", "knowledge"], ["Lễ Tạ Ơn", "Thanksgiving"], ["mong", "to long for, to look forward to"], ["nhắn", "to send word, to remind"], ["rượu bia", "alcohol (wine and beer)"], ["giữ liên lạc", "to keep in touch"], ["tình hình", "how things are going"], ["chăm sóc bản thân", "to take care of yourself"]],
          body: [
            { t: "n", s: "San Jose, ngày 8 tháng 11 năm 2026." },
            { t: "n", s: "Con yêu quý của mẹ," },
            { t: "n", s: "Mẹ viết thư này để hỏi thăm con và cuộc sống của con ở trường đại học. Mẹ rất muốn biết con đang sống thế nào và có những trải nghiệm thú vị gì ở Chapel Hill." },
            { t: "n", s: "Con đang ở ký túc xá hay thuê nhà ngoài? Phòng của con có đầy đủ tiện nghi và sạch sẽ không? Con có ăn uống và nghỉ ngơi đủ không?" },
            { t: "n", s: "Cuộc sống của con có khó khăn gì không? Nếu có, con hãy nói với mẹ. Mẹ sẽ luôn ở bên con và giúp đỡ con." },
            { t: "n", s: "Còn về việc học tập thì sao? Học kỳ này con học những môn gì? Môn nào khó nhất? Mẹ hy vọng con học tốt và luôn cố gắng học hỏi thêm nhiều kiến thức mới." },
            { t: "n", s: "Lễ Tạ Ơn năm nay con có về nhà không? Cả nhà mong con lắm." },
            { t: "n", s: "Cuối cùng, mẹ muốn nhắn con rằng hãy cẩn thận khi ra đường, đừng lái xe khi đã uống rượu bia, và nhớ giữ liên lạc với mẹ thường xuyên để mẹ biết tình hình của con." },
            { t: "n", s: "Mẹ yêu con nhiều lắm. Con nhớ chăm sóc bản thân và học tập chăm chỉ nhé!" },
            { t: "n", s: "Yêu con nhiều, Mẹ." },
          ],
          pairs: [["ký túc xá", "dorm"], ["thuê nhà", "to rent a place"], ["Lễ Tạ Ơn", "Thanksgiving"], ["giữ liên lạc", "to keep in touch"]],
          order: ["Mẹ hỏi thăm cuộc sống của con ở trường.", "Mẹ hỏi về chỗ ở và việc ăn uống của con.", "Mẹ hỏi về việc học tập.", "Mẹ hỏi con có về nhà vào Lễ Tạ Ơn không.", "Mẹ dặn con cẩn thận khi ra đường."],
          fill: { text: "Mẹ viết thư ở {0}. Mẹ muốn biết con ở ký túc xá hay {1} nhà ngoài. Mẹ hỏi học kỳ này môn nào {2} nhất. Mẹ dặn con đừng lái xe khi đã uống {3}.", answers: ["San Jose", "thuê", "khó", "rượu bia"], bank: ["San Jose", "Chapel Hill", "thuê", "mua", "khó", "dễ", "rượu bia", "cà phê"] } },

        { type: "mc", id: "letter-facts", strand: "input", mins: 2,
          title: { vi: "Phân tích lá thư", en: "Analyse the letter" },
          instr: { vi: "Như bảng ở lớp hôm thứ Hai: thời gian, người gửi, mục đích, mức độ.", en: "Like the table in Monday’s class: time, sender, purpose, formality." },
          items: [
            { q: "Ai viết lá thư này, và gửi cho ai?", opts: ["Mẹ viết cho con đang học đại học.", "Con viết cho mẹ ở San Jose.", "Bà viết cho cháu ở Chapel Hill."], correct: "Mẹ viết cho con đang học đại học." },
            { q: "Mục đích chính của lá thư là gì?", opts: ["hỏi thăm và dặn dò con", "mời con đi du lịch", "thông báo một tin buồn"], correct: "hỏi thăm và dặn dò con", explain: "dặn dò = to give someone advice and reminders (what parents do!)." },
            { q: "Lá thư trang trọng hay thân mật?", opts: ["thân mật", "trang trọng"], correct: "thân mật", keepOrder: true },
            { q: "Từ nào cho bạn biết lá thư thân mật?", opts: ["Con yêu quý của mẹ · Yêu con nhiều", "Mẹ viết thư này để … · Cuối cùng", "Học kỳ này · Lễ Tạ Ơn"], correct: "Con yêu quý của mẹ · Yêu con nhiều" },
          ] },

        { type: "readaloud", id: "read-aloud", story: "st1", strand: "fluency", mins: 3,
          title: { vi: "Đọc to", en: "Read aloud" },
          instr: { vi: "Nghe lại lá thư một lần. Rồi bấm ● Ghi âm và đọc to cả lá thư như bạn đang đọc thư mẹ cho em của bạn nghe. Bản ghi âm sẽ có trong báo cáo.", en: "Listen to the letter once more. Then tap ● Record and read the whole letter aloud, as if reading Mom’s letter to your younger sibling. Your recording goes into the report." } },
      ],
    },

    /* ═══════════════ NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Nói",
      intro: { vi: "Mẹ viết thư, nhưng bạn bận. Bạn gửi cho mẹ một tin nhắn thoại trước.", en: "Mom wrote you a letter, but you’re busy. Send her a voicemail first." },
      blocks: [
        { type: "record", id: "voicemail", strand: "output", mins: 3,
          title: { vi: "Tin nhắn thoại cho mẹ", en: "A voicemail to Mom" },
          instr: { vi: "Nói theo hai câu mẫu. Rồi ghi âm tin nhắn của bạn (20–30 giây).", en: "Shadow the two model lines. Then record your own message (20–30 seconds)." },
          prompts: [
            { vi: "Mẹ ơi, con đã nhận được thư của mẹ rồi.", en: "Mom, I got your letter." },
            { vi: "Con cảm ơn mẹ nhiều lắm. Mẹ đừng lo cho con nhé!", en: "Thank you so much, Mom. Don’t worry about me!" },
            { vi: "Tin nhắn của bạn: cảm ơn mẹ, trả lời hai câu hỏi trong thư của mẹ, và hứa sẽ viết thư trả lời.", en: "Your message: thank Mom, answer two of her questions, and promise to write back. e.g. Con đang ở ký túc xá … · Lễ Tạ Ơn con … · Cuối tuần này con sẽ viết thư cho mẹ nhé!", model: false },
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
