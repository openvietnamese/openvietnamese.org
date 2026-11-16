/* VIET 101 (UNC Viet) — Bài 5 · Nhiệm vụ giao tiếp · Communicative tasks for the week of 26–30/10/2026
   Five in-class tasks on Lesson 5 (days, dates, months, birthdays, invitations), one per tab:
     1 Đọc — interpretive reading (a club’s November events board → plan which events to go to)
     2 Nghe — interpretive listening (three voicemails → update Emma’s planner)
     3 Nói với bạn — interpersonal info gap (classmates’ birthdays, A and B know different halves)
     4 Nghe – viết lại — dictogloss (Minh’s November, rebuilt with a partner)
     5 Nói một mình — presentational speaking (my November, 60–90 s recording)
   Calendar: real 2026 weekdays (1/11 = Chủ nhật, 13/11 = Thứ sáu = Vietnamese Learning Fest, 26/11 = Lễ Tạ ơn).
   The club (Câu lạc bộ tiếng Việt) and all people are fictional; story world = Emma, Minh, chị Linh.
   All content original (Huy Phung). Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

window.BV_CHAPTER = {
  id: 5,
  titleVi: "Nhiệm vụ giao tiếp · Bài 5",
  titleEn: "Communicative tasks: Lesson 5",
  description: "VIET 101, Lesson 5 communicative tasks: read an events board, listen to voicemails, find classmates’ birthdays with a partner (info gap), rebuild a text (dictogloss) and talk about your November — days, dates, months and invitations.",
  color: "#0369a1",
  badge: { icon: "🗓️", name: "Lịch của tôi · My calendar" },
  rubricLevels: [
    { vi: "Cần cố gắng", en: "Developing" },
    { vi: "Đạt", en: "Meets" },
    { vi: "Xuất sắc", en: "Exceeds" },
  ],

  cando: [
    { vi: "Tôi có thể đọc một lịch sự kiện và chọn sự kiện theo ngày, thứ.", en: "I can read an events calendar and choose events by day and date." },
    { vi: "Tôi có thể nghe một tin nhắn thoại ngắn và ghi lại ai gọi, việc gì, ngày nào.", en: "I can understand a short voicemail and note who called, what for and which day." },
    { vi: "Tôi có thể hỏi và trả lời về sinh nhật với một bạn cùng lớp.", en: "I can ask and answer about birthdays with a classmate." },
    { vi: "Tôi có thể nói một phút về tháng của tôi: ngày, thứ và sự kiện.", en: "I can talk for a minute about my month: dates, days and events." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Năm nhiệm vụ cho tuần này · Bài 5 · làm trên lớp, từng nhiệm vụ một.", en: "Five tasks for this week · Lesson 5 · done in class, one task at a time." },
      blocks: [
        { type: "html", title: { vi: "Tuần này bạn làm gì?", en: "This week’s tasks" }, html: `
          <p>Each task has a <strong>real goal</strong> — plan your weekend, update a calendar, find a birthday twin, tell the class about your month. Use Vietnamese to get it done; it’s OK to make mistakes. Your teacher will tell you which task you are doing today.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Nhiệm vụ · Task</th><th>Bạn làm gì · What you do</th><th>Hình thức · Mode</th><th>⏱</th></tr>
            <tr><td>1️⃣ Đọc</td><td>Read a club’s November events board and choose which events to go to</td><td>📖 Interpretive · alone, then pairs</td><td>15′</td></tr>
            <tr><td>2️⃣ Nghe</td><td>Listen to three voicemails and update Emma’s planner</td><td>🎧 Interpretive · alone</td><td>15′</td></tr>
            <tr><td>3️⃣ Nói với bạn</td><td>Info gap: you and your partner each know half of the class birthdays — find them all</td><td>👥 Interpersonal · pairs</td><td>15′</td></tr>
            <tr><td>4️⃣ Nghe – viết lại</td><td>Dictogloss: listen to Minh’s November, take notes, rebuild the text with a partner</td><td>🎧✍️ Pairs</td><td>20′</td></tr>
            <tr><td>5️⃣ Nói một mình</td><td>Talk for 60–90 seconds about your November and invite the class to one event</td><td>🎙 Presentational · alone</td><td>15′</td></tr>
          </table></div>
          <p><small>Everything you write and record goes into the report in 📊 Nộp bài. Progress is saved in this browser, so use the same device all week.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối tuần bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end of the week." } },
      ],
    },

    /* ═══════════════ 1 · ĐỌC ═══════════════ */
    {
      id: "read", icon: "1️⃣", label: "Đọc",
      intro: { vi: "Đọc bảng tin, rồi lên kế hoạch tháng mười một.", en: "Read the events board, then plan your November." },
      blocks: [
        { type: "html", title: { vi: "Bước 1 · Trước khi đọc", en: "Step 1 · Before you read" }, strand: "input", where: "class", mins: 2, html: `
          <p>Talk with a partner for one minute: <em>Bạn thích làm gì vào cuối tuần?</em> What kind of event would you go to — food, a film, music, sports?</p>
          <p>Then skim the board below in <strong>30 seconds</strong>: how many events are there? Which one looks the most fun?</p>` },

        { type: "html", title: { vi: "📌 Câu lạc bộ tiếng Việt · Lịch tháng mười một", en: "Vietnamese Club · November events" }, strand: "input", where: "class", mins: 5, html: `
          <div class="table-scroll"><table class="culture-table" lang="vi">
            <tr><th colspan="3" style="text-align:center">🍂 CÂU LẠC BỘ TIẾNG VIỆT · THÁNG MƯỜI MỘT 2026 🍂<br><small>Mời tất cả các bạn! · Everyone welcome!</small></th></tr>
            <tr><th>Ngày</th><th>Sự kiện</th><th>Ghi chú</th></tr>
            <tr><td><strong>Chủ nhật, 1/11</strong><br>buổi trưa</td><td>🍜 Ăn phở cùng nhau</td><td>Mười đô-la. Mang theo bạn bè!</td></tr>
            <tr><td><strong>Thứ tư, 4/11</strong><br>buổi tối</td><td>🎬 Xem phim Việt Nam</td><td>Miễn phí. Phim có phụ đề tiếng Anh.</td></tr>
            <tr><td><strong>Thứ bảy, 7/11</strong><br>buổi chiều</td><td>🥢 Học làm chả giò</td><td>Năm đô-la. Chỉ có hai mươi chỗ.</td></tr>
            <tr><td><strong>Thứ sáu, 13/11</strong><br>buổi chiều</td><td>🎭 Vietnamese Learning Fest — sinh viên VIET 101 diễn kịch!</td><td>Miễn phí. Mời gia đình và bạn bè.</td></tr>
            <tr><td><strong>Thứ năm, 19/11</strong><br>buổi tối</td><td>🎤 Hát karaoke tiếng Việt</td><td>Miễn phí. Có trà sữa.</td></tr>
            <tr><td><strong>Thứ bảy, 28/11</strong></td><td>❌ Không có sự kiện — nghỉ lễ Tạ ơn</td><td>Chúc mọi người lễ Tạ ơn vui vẻ!</td></tr>
          </table></div>
          <p class="report-note">Từ mới · New words: <em>sự kiện</em> event · <em>miễn phí</em> free (no cost) · <em>phụ đề</em> subtitles · <em>chỗ</em> seat, spot · <em>chả giò</em> fried spring rolls · <em>lễ Tạ ơn</em> Thanksgiving</p>` },

        { type: "mc", id: "board", strand: "input", where: "class", mins: 4,
          title: { vi: "Bước 2 · Tìm thông tin", en: "Step 2 · Find the information" },
          instr: { vi: "Dùng bảng tin ở trên.", en: "Use the events board above." },
          items: [
            { q: "Học làm chả giò vào thứ mấy, ngày bao nhiêu?", opts: ["thứ bảy, ngày bảy tháng mười một", "chủ nhật, ngày một tháng mười một", "thứ năm, ngày mười chín tháng mười một"], correct: "thứ bảy, ngày bảy tháng mười một" },
            { q: "Sự kiện nào miễn phí?", opts: ["xem phim, Learning Fest và karaoke", "ăn phở và học làm chả giò", "chỉ có karaoke"], correct: "xem phim, Learning Fest và karaoke" },
            { q: "Bạn không nói tiếng Việt giỏi. Sự kiện nào có tiếng Anh giúp bạn?", en: "Which event helps with some English?", opts: ["xem phim Việt Nam", "hát karaoke", "ăn phở"], correct: "xem phim Việt Nam", explain: "Phim có phụ đề tiếng Anh — the film has English subtitles." },
            { q: "Emma làm việc ở thư viện vào thứ bảy, buổi chiều. Emma không đi được sự kiện nào?", opts: ["học làm chả giò", "xem phim Việt Nam", "ăn phở cùng nhau"], correct: "học làm chả giò", explain: "Học làm chả giò is on Saturday 7/11 in the afternoon — Emma is at work." },
            { q: "Ngày hai mươi tám tháng mười một có gì?", opts: ["không có sự kiện, vì nghỉ lễ Tạ ơn", "tiệc lễ Tạ ơn", "hát karaoke"], correct: "không có sự kiện, vì nghỉ lễ Tạ ơn" },
          ] },

        { type: "writing", id: "read-plan", strand: "output", where: "class", mins: 4,
          title: { vi: "Bước 3 · Kế hoạch của bạn", en: "Step 3 · Your plan" },
          prompt: { vi: "Chọn hai sự kiện bạn muốn đi. Viết thứ, ngày và vì sao. Rồi hỏi bạn bên cạnh: “Bạn muốn đi sự kiện nào?” — hai bạn có đi cùng nhau được không?", en: "Choose two events you want to go to. Write the day, the date and why. Then ask your neighbour “Bạn muốn đi sự kiện nào?” — can you go together? e.g. Mình muốn đi xem phim vào thứ tư, ngày bốn tháng mười một, vì phim miễn phí." },
          minWords: 20,
          checklist: [
            { vi: "Hai sự kiện, mỗi sự kiện có thứ và ngày", en: "two events, each with a day and a date" },
            { vi: "ngày … tháng … (đúng thứ tự)", en: "ngày … tháng … in the right order" },
            { vi: "vì … (lý do)", en: "a reason with vì (because)" },
          ] },
      ],
    },

    /* ═══════════════ 2 · NGHE ═══════════════ */
    {
      id: "listen", icon: "2️⃣", label: "Nghe",
      intro: { vi: "Tối thứ hai, 26/10. Điện thoại của Emma có ba tin nhắn thoại.", en: "Monday evening, 26/10. Emma’s phone has three voicemails." },
      blocks: [
        { type: "html", title: { vi: "Trước khi nghe", en: "Before you listen" }, strand: "input", where: "class", mins: 1, html: `
          <p>When you listen to a voicemail, you only need three things: <strong>Ai gọi?</strong> (who called) · <strong>Việc gì?</strong> (what for) · <strong>Ngày nào?</strong> (which day). Listen for those — you don’t need every word.</p>
          <p>Listen <strong>twice</strong>. The first time, just answer the question; the second time, catch the details. Show the transcript only at the end.</p>` },

        { type: "dialogue", id: "vm1", strand: "input", where: "class", mins: 4,
          title: { vi: "Tin nhắn 1", en: "Voicemail 1" },
          lines: [
            { spk: "📞", vi: "Emma ơi, chị Linh đây." },
            { spk: "📞", vi: "Thứ bảy này, ngày ba mươi mốt tháng mười, là sinh nhật Minh." },
            { spk: "📞", vi: "Buổi tối, chị tổ chức sinh nhật cho Minh ở nhà chị. Em có rảnh không?" },
            { spk: "📞", vi: "Gọi lại cho chị nhé. Cảm ơn em!" },
          ],
          gist: { q: "Chị Linh gọi để làm gì?", en: "Why did chị Linh call?", opts: ["mời Emma đến sinh nhật Minh", "hỏi Emma về bài tập", "nói chị Linh bận"], correct: "mời Emma đến sinh nhật Minh" } },

        { type: "dialogue", id: "vm2", strand: "input", where: "class", mins: 3,
          title: { vi: "Tin nhắn 2", en: "Voicemail 2" },
          lines: [
            { spk: "📞", vi: "Emma ơi, Minh đây." },
            { spk: "📞", vi: "Ngày mai, thứ ba, mình không học toán với bạn được. Mình bận." },
            { spk: "📞", vi: "Thứ năm mình học nhé? Cảm ơn bạn!" },
          ],
          gist: { q: "Minh muốn học toán với Emma vào ngày nào?", en: "When does Minh want to study math now?", opts: ["thứ năm", "thứ ba", "thứ bảy"], correct: "thứ năm", why: { "thứ ba": "Minh says he can’t on Tuesday (thứ ba) — he’s busy." } } },

        { type: "dialogue", id: "vm3", strand: "input", where: "class", mins: 3,
          title: { vi: "Tin nhắn 3", en: "Voicemail 3" },
          lines: [
            { spk: "📞", vi: "Chào Emma, chị là Mai, ở thư viện." },
            { spk: "📞", vi: "Thứ bảy tuần sau, ngày bảy tháng mười một, thư viện nghỉ." },
            { spk: "📞", vi: "Hôm đó em không đi làm. Cảm ơn em nhé!" },
          ],
          gist: { q: "Ngày bảy tháng mười một, Emma làm gì?", en: "What about Saturday, November 7?", opts: ["Emma không đi làm, vì thư viện nghỉ", "Emma làm việc ở thư viện", "Emma đi sinh nhật Minh"], correct: "Emma không đi làm, vì thư viện nghỉ" } },

        { type: "mc", id: "planner", strand: "input", where: "class", mins: 4,
          title: { vi: "Cập nhật lịch của Emma", en: "Update Emma’s planner" },
          instr: { vi: "Dùng cả ba tin nhắn.", en: "Use all three voicemails." },
          items: [
            { q: "Thứ ba, 27/10, Emma làm gì?", opts: ["Emma không học toán với Minh", "Emma học toán với Minh", "Emma đi sinh nhật Minh"], correct: "Emma không học toán với Minh" },
            { q: "Thứ bảy, 31/10, buổi tối, Emma ở đâu?", opts: ["ở nhà chị Linh, ăn sinh nhật Minh", "ở thư viện", "ở lớp toán"], correct: "ở nhà chị Linh, ăn sinh nhật Minh" },
            { q: "Bây giờ Emma có thể đi sự kiện nào ở bảng tin (tab Đọc)?", en: "Now that the library is closed on 7/11, which event from the board can Emma go to?", opts: ["học làm chả giò, thứ bảy 7/11", "hát karaoke, thứ bảy 7/11", "không có sự kiện nào"], correct: "học làm chả giò, thứ bảy 7/11", explain: "The library is closed on Saturday 7/11, so Emma is free that afternoon." },
          ] },

        { type: "record", id: "callback", strand: "output", where: "class", mins: 2,
          title: { vi: "Gọi lại cho chị Linh", en: "Call chị Linh back" },
          instr: { vi: "Để lại một tin nhắn thoại ngắn (3–4 câu) cho chị Linh: chào, cảm ơn, nói bạn có đến không, chào tạm biệt.", en: "Leave chị Linh a short voicemail (3–4 sentences): greet her, thank her, say whether you’re coming, say goodbye. Remember: Emma calls herself em." },
          prompts: [
            { vi: "Tin nhắn của tôi cho chị Linh", en: "My voicemail to chị Linh (up to 1 minute)", model: false, maxSec: 60 },
          ] },
      ],
    },

    /* ═══════════════ 3 · NÓI VỚI BẠN ═══════════════ */
    {
      id: "pair", icon: "3️⃣", label: "Nói với bạn",
      intro: { vi: "Làm với một bạn. Một người là A, một người là B. Không nhìn màn hình của bạn kia!", en: "Work with a partner. One of you is A, the other B. Don’t look at each other’s screens!" },
      blocks: [
        { type: "infogap", id: "birthdays", strand: "output", where: "class", mins: 10,
          title: { vi: "Sinh nhật cả lớp", en: "The class birthday hunt" },
          intro: { vi: "Bạn biết sinh nhật của bốn người. Bạn của bạn biết sinh nhật của bốn người khác. Hỏi và trả lời bằng tiếng Việt, rồi viết lại tất cả.", en: "You know four people’s birthdays; your partner knows the other four. Ask and answer in Vietnamese, and write all eight down (paper is fine)." },
          task: {
            A: { vi: "Bạn là A. Hỏi B về Giang, Hải, Hà và Khoa.", en: "You are A. Ask B about Giang, Hải, Hà and Khoa." },
            B: { vi: "Bạn là B. Hỏi A về An, Bình, Châu và Dũng.", en: "You are B. Ask A about An, Bình, Châu and Dũng." },
          },
          people: [
            { e: "🧑", name: "An", holder: "A", info: "Sinh nhật: ngày mười hai tháng một" },
            { e: "👩", name: "Bình", holder: "A", info: "Sinh nhật: thứ sáu này, ngày ba mươi tháng mười!" },
            { e: "🧑‍🦱", name: "Châu", holder: "A", info: "Sinh nhật: ngày hai mươi lăm tháng mười hai" },
            { e: "👨", name: "Dũng", holder: "A", info: "Sinh nhật: ngày mồng một tháng năm" },
            { e: "👩‍🦰", name: "Giang", holder: "B", info: "Sinh nhật: ngày mười bốn tháng hai" },
            { e: "🧑", name: "Hải", holder: "B", info: "Sinh nhật: thứ ba, ngày ba tháng mười một" },
            { e: "👧", name: "Hà", holder: "B", info: "Sinh nhật: ngày hai mươi lăm tháng mười hai" },
            { e: "🧔", name: "Khoa", holder: "B", info: "Sinh nhật: ngày mười chín tháng bảy" },
          ],
          phrases: ["Sinh nhật … là ngày nào?", "Sinh nhật … là ngày … tháng …", "Tháng mấy?", "Ngày bao nhiêu?", "Bạn nói lại được không?", "Thật à? Cùng một ngày!"] },

        { type: "mc", id: "gap-check", strand: "output", where: "class", mins: 3,
          title: { vi: "Hai bạn đã tìm ra chưa?", en: "Did you find everything?" },
          instr: { vi: "Bạn cần thông tin của bạn kia để trả lời.", en: "You need your partner’s information to answer these." },
          items: [
            { q: "Ai có sinh nhật trong tuần này?", opts: ["Bình", "Hải", "An"], correct: "Bình", explain: "Bình: thứ sáu này, 30/10." },
            { q: "Hai bạn nào có sinh nhật cùng một ngày?", opts: ["Châu và Hà", "An và Giang", "Dũng và Khoa"], correct: "Châu và Hà", explain: "Both on 25/12 — Christmas Day!" },
            { q: "Sinh nhật ai vào tháng mười một?", opts: ["Hải", "Khoa", "Dũng"], correct: "Hải" },
            { q: "Sinh nhật Dũng là ngày nào?", opts: ["ngày mồng một tháng năm", "ngày mười lăm tháng một", "ngày năm tháng một"], correct: "ngày mồng một tháng năm" },
          ] },

        { type: "record", id: "pair-talk", strand: "output", where: "class", mins: 2,
          title: { vi: "Bây giờ đến lượt hai bạn", en: "Now it’s your turn" },
          instr: { vi: "Hỏi bạn của bạn: “Sinh nhật bạn là ngày nào?” và “Bạn thường làm gì vào sinh nhật?”. Một người ghi âm cuộc nói chuyện (khoảng một phút).", en: "Ask each other “Sinh nhật bạn là ngày nào?” and “Bạn thường làm gì vào sinh nhật?” (What do you usually do on your birthday?). Record the conversation (about a minute) — both of you should record it on your own page." },
          prompts: [
            { vi: "Cuộc nói chuyện của hai chúng tôi", en: "Our conversation (up to 2 minutes)", model: false, maxSec: 120 },
          ] },
      ],
    },

    /* ═══════════════ 4 · DICTOGLOSS ═══════════════ */
    {
      id: "dictogloss", icon: "4️⃣", label: "Nghe – viết lại",
      intro: { vi: "Nghe hai lần, ghi từ khoá, rồi cùng bạn viết lại cả bài.", en: "Listen twice, note key words, then rebuild the whole text with a partner." },
      blocks: [
        { type: "html", title: { vi: "Bốn bước", en: "Four steps" }, strand: "input", where: "class", mins: 1, html: `
          <ol>
            <li><strong>Nghe · Listen</strong> — the first time, <em>don’t write</em>. Just listen for the main idea.</li>
            <li><strong>Ghi · Note</strong> — listen again and write only key words: days, dates, places, verbs.</li>
            <li><strong>Viết lại · Rebuild</strong> — with a partner, put your notes together and write the text again in full sentences. It doesn’t have to be word for word — it has to make sense and use good Vietnamese.</li>
            <li><strong>So sánh · Compare</strong> — now open the transcript. What’s different? What did you miss?</li>
          </ol>` },

        { type: "dialogue", id: "dg", strand: "input", where: "class", mins: 4,
          title: { vi: "Tháng mười một của Minh", en: "Minh’s November" },
          lines: [
            { spk: "🗓️", vi: "Tháng mười một là một tháng rất bận của Minh." },
            { spk: "🗓️", vi: "Thứ hai, ngày hai, Minh có bài thi toán." },
            { spk: "🗓️", vi: "Thứ bảy, ngày bảy, Minh và Emma đi học làm chả giò ở câu lạc bộ tiếng Việt." },
            { spk: "🗓️", vi: "Thứ sáu, ngày mười ba, Minh đi xem kịch của lớp VIET 101." },
            { spk: "🗓️", vi: "Ngày hai mươi sáu là lễ Tạ ơn. Minh về Raleigh ăn tối với chị Linh." },
          ] },

        { type: "writing", id: "dg-notes", strand: "input", where: "class", mins: 3,
          title: { vi: "Từ khoá của bạn", en: "Your key words" },
          prompt: { vi: "Lần nghe thứ hai: ghi từ khoá — thứ, ngày, nơi, việc.", en: "Second listening: write key words only — days, dates, places, activities." },
          minWords: 8,
          checklist: [{ vi: "Tôi nghe hai lần và không mở lời thoại", en: "I listened twice without opening the transcript" }] },

        { type: "writing", id: "dg-rebuild", strand: "output", where: "class", mins: 8,
          title: { vi: "Cùng bạn viết lại", en: "Rebuild it with your partner" },
          prompt: { vi: "Cùng bạn viết lại cả bài bằng câu đầy đủ (5 câu). Rồi mới mở lời thoại và so sánh.", en: "Together, write the whole text again in full sentences (5 sentences). Only then open the transcript and compare." },
          minWords: 35,
          checklist: [
            { vi: "Bốn sự kiện, đúng thứ tự", en: "four events, in order" },
            { vi: "Thứ và ngày cho mỗi sự kiện", en: "a day and a date for each event" },
            { vi: "Câu đầy đủ: ai + làm gì + ở đâu / với ai", en: "full sentences: who + does what + where / with whom" },
          ] },

        { type: "mc", id: "dg-check", strand: "input", where: "class", mins: 3,
          title: { vi: "So sánh", en: "Compare" },
          items: [
            { q: "Minh có bài thi toán vào ngày nào?", opts: ["thứ hai, ngày hai", "thứ sáu, ngày mười ba", "thứ bảy, ngày bảy"], correct: "thứ hai, ngày hai" },
            { q: "Ngày bảy tháng mười một, Minh đi với ai?", opts: ["với Emma", "với chị Linh", "một mình"], correct: "với Emma" },
            { q: "Vì sao Minh về Raleigh vào ngày hai mươi sáu?", opts: ["vì đó là lễ Tạ ơn", "vì đó là sinh nhật chị Linh", "vì Minh có bài thi"], correct: "vì đó là lễ Tạ ơn" },
          ] },
      ],
    },

    /* ═══════════════ 5 · NÓI MỘT MÌNH ═══════════════ */
    {
      id: "present", icon: "5️⃣", label: "Nói một mình",
      intro: { vi: "Một phút về tháng mười một của bạn — và mời cả lớp!", en: "One minute about your November — and invite the class!" },
      blocks: [
        { type: "html", title: { vi: "Chuẩn bị", en: "Get ready" }, strand: "output", where: "both", mins: 3, html: `
          <p>Talk for <strong>60–90 seconds</strong> about your November. Say:</p>
          <ol>
            <li><strong>Three things</strong> you will do this month, each with its day and date — <em>Thứ tư, ngày bốn tháng mười một, mình đi xem phim.</em></li>
            <li><strong>One birthday</strong> — yours, or a friend’s or family member’s — <em>Sinh nhật mẹ mình là ngày …</em></li>
            <li><strong>An invitation</strong> to the class — <em>Thứ năm, ngày mười chín, các bạn có rảnh không? Mời các bạn đi hát karaoke với mình!</em></li>
          </ol>
          <p><small>Speak from your notes, not a full script. Pause, fix a mistake, keep going — that’s normal speaking.</small></p>` },

        { type: "writing", id: "talk-notes", strand: "output", where: "both", mins: 4,
          title: { vi: "Ghi chú của bạn", en: "Your notes" },
          prompt: { vi: "Ghi từ khoá cho ba sự kiện, một sinh nhật và một lời mời — không viết cả bài.", en: "Key words for three events, one birthday and one invitation — not a full script." },
          minWords: 12,
          checklist: [
            { vi: "Ba sự kiện có thứ và ngày", en: "three events with days and dates" },
            { vi: "Một sinh nhật", en: "one birthday" },
            { vi: "Một lời mời", en: "one invitation" },
          ] },

        { type: "record", id: "talk", strand: "output", where: "both", mins: 4,
          title: { vi: "Ghi âm · Tháng mười một của tôi", en: "Record: my November" },
          instr: { vi: "Nói 60–90 giây. Bạn có thể ghi lại nhiều lần — báo cáo giữ lần cuối.", en: "Speak for 60–90 seconds. Re-record as often as you like — the report keeps the last take." },
          prompts: [
            { vi: "Tháng mười một của tôi", en: "My November (up to 2 minutes)", model: false, maxSec: 120 },
          ] },

        { type: "rubric", id: "talk-rubric", strand: "output", where: "both", mins: 2,
          title: { vi: "Tự đánh giá", en: "Check your recording" },
          task: { vi: "Nghe lại bản ghi âm của bạn, rồi chọn một mức cho mỗi tiêu chí.", en: "Listen to your recording, then pick a level for each criterion." },
          criteria: [
            { vi: "Nội dung", en: "Content", desc: ["Fewer than three events, or no invitation", "Three events, a birthday and an invitation", "All of it, with extra details (vì …, với ai, ở đâu)"] },
            { vi: "Ngày tháng", en: "Days and dates", desc: ["Dates often in the wrong order", "Mostly thứ … ngày … tháng …", "Always right, including mồng / mười / mươi"] },
            { vi: "Lưu loát", en: "Fluency", desc: ["Read from a script", "Spoke from notes with some long pauses", "Spoke from notes, smoothly"] },
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
