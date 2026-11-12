/* VIET 203 (UNC Viet) — Bài 3 “Sức khỏe & cân bằng cuộc sống” · Kiểm tra Bài 3 · Module 3 quiz · online make-up · ≈ 50 minutes
   Online version (2026-11-11) of the in-class GROUP paper quiz _source/viet203/VIET203_Module3_Quiz.docx (60 pts),
   for students who missed it. Same items, same points; changes for online and solo work:
     · individual, not groups of 3 — the group-talk box and the A/B/C sign-off are gone; Part VI is written alone;
     · Part I and Part II play on the page (🔊) instead of the teacher reading — Huy's recordings replace the browser
       voice once recorded (rerun _source/viet203/make-recording-script.js);
     · fill-in-the-box items (III C, IV A) are tap-to-choose from the same box; find-and-fix (IV B), Bắc ↔ Nam (III B)
       and find-in-the-text (V C) are typed and auto-checked (punctuation and capitals ignored, tone marks count).
   Scoring (paper points, out of 60):
     auto-scored (34): I 6 · III 12 · IV 10 · V A 4 · V C 2 — 1 pt per item; the report shows first-try accuracy
       (first try = full credit; a second try earns partial engine credit, then the answer is shown).
     teacher-graded (26) from the report: II dictogloss 10 · V B short answers 4 · VI letter 12 — rubrics and key in the
       Notes for Teachers of the .docx (unchanged).
   Exam mode (exam: { minutes: 50 }, 2026-11-11): name + pledge, then a 50-min countdown that survives reloads; answers lock
   at 0:00; copy / cut / paste / drop / right-click blocked; the report's Exam log shows start, end, time used, blocked
   attempts and time away from the page.
   Engine: ../assets/bv.js. */
(function () {

const DICTO = "Tối thứ Năm, Khánh gọi điện cho Hiếu vì Hiếu đã nghỉ học ba ngày liền. Hiếu kể dạo này bị deadline dí, đêm nào cũng thức đến 3 giờ sáng. Thức khuya khiến cho Hiếu bị đau đầu, và càng thiếu ngủ, Hiếu càng kém tập trung. Khánh khuyên: Nếu tớ là cậu thì tớ sẽ tắt điện thoại trước 11 giờ đêm. Cuối cùng, hai bạn hẹn nhau sáng Chủ nhật đi chạy bộ quanh hồ.";

const PAPER = 'background:#fffaf2;border:1px solid #ead9c2;border-radius:12px;padding:18px 22px;font-family:Newsreader,serif;font-size:18px;line-height:1.7';

const BLOG = `
  <div lang="vi" style="${PAPER}">
    <p style="margin:0 0 8px;font-weight:600;font-size:20px">Học Kỳ Đầu Tiên Của Tôi</p>
    <p>Tôi tên là Thảo, sinh viên năm nhất ngành Kế toán. Tháng Chín năm ngoái, tôi rời Huế ra Hà Nội học đại học. Lúc đầu tôi rất háo hức, nhưng chỉ sau hai tháng, tôi bắt đầu thấy căng thẳng. Bài tập ngày càng nhiều, còn tôi lại đi làm thêm ở một quán cà phê đến 10 giờ tối. Về đến phòng, tôi thường ngồi học đến 2 giờ sáng.</p>
    <p>Càng thiếu ngủ, tôi càng kém tập trung. Tôi hay bị đau đầu, ăn không ngon, và có tuần tôi bỏ bữa sáng cả bảy ngày. Bố mẹ gọi điện hỏi thăm, tôi chỉ nói “Con khỏe ạ” vì sợ bố mẹ lo lắng.</p>
    <p>Người giúp tôi là chị Hằng, bạn cùng phòng. Một tối, thấy tôi ngồi khóc trước máy tính, chị không nói nhiều mà chỉ rủ tôi đi bộ quanh hồ. Chị kể năm nhất chị cũng từng bị như vậy. Chị khuyên tôi: “Nếu chị là em thì chị sẽ bớt giờ làm thêm. Sức khỏe là vàng mà!”</p>
    <p>Tôi đã nghe lời chị. Tôi xin chủ quán cho tôi chỉ làm ba buổi một tuần, tối nào cũng tắt điện thoại lúc 11 giờ, và sáng thứ Bảy đi chơi cầu lông với các bạn trong lớp. Tôi cũng đến phòng tư vấn tâm lý của trường. Nói chuyện với chuyên gia khiến cho tôi nhẹ nhõm hơn nhiều. Kết quả là đến cuối học kỳ, điểm của tôi không cao lắm, nhưng tôi ngủ đủ 7 tiếng mỗi đêm và cảm thấy lạc quan hơn một cách rõ rệt.</p>
    <p style="margin:0">Bây giờ, mỗi lần gọi về nhà, tôi đều kể thật cho bố mẹ nghe. Tôi hiểu rằng điểm số quan trọng, nhưng không quan trọng bằng sức khỏe. Học thế nào cũng được, miễn mình cố gắng là được.</p>
  </div>
  <p class="report-note" style="margin-top:10px">Từ mới · New words: <em>nhẹ nhõm</em> relieved · <em>rõ rệt</em> clearly, noticeably</p>`;

const VY = `
  <div lang="vi" style="${PAPER}">
    <p style="margin:0">Chào chuyên mục Sống Khỏe, em tên là Vy, 19 tuổi, sinh viên năm thứ hai. Em vừa đi học vừa làm thêm 25 tiếng một tuần. Đêm nào em cũng chỉ ngủ 5 tiếng, và mỗi ngày em uống 3 ly trà sữa để tỉnh táo. Cuối tuần em chỉ nằm ở nhà xem phim, không tập thể dục. Em ở xa nhà nên hay thấy cô đơn. Em nên làm gì ạ?</p>
  </div>
  <h4>Thư trả lời của bạn phải · Your reply must</h4>
  <ul>
    <li>open with a greeting and show <strong>sự đồng cảm</strong> (empathy) for Vy;</li>
    <li>name <strong>two</strong> causes of Vy’s problems and how they affect her health;</li>
    <li>give <strong>three</strong> pieces of advice, including <strong>one</strong> that follows <em>“Vận động nhiều, ngồi ít”</em>;</li>
    <li>close with encouragement.</li>
  </ul>
  <h4>Dùng ít nhất bốn cấu trúc · Use at least four of these</h4>
  <p lang="vi"><em>Nếu tôi là em thì …</em> · <em>Theo tôi, …</em> · <em>khiến cho / dẫn đến</em> · <em>càng … càng</em> · <em>đủ / thiếu / thừa</em> · <em>miễn là</em> · <em>một cách</em> + adjective · <em>kết quả là / nhờ vào / do</em></p>`;

const BOX3 = ["duy trì", "hạn chế", "kiểm tra", "giảm", "cải thiện"];
const BOX4 = ["khiến cho", "dẫn đến", "nhờ vào", "do", "mặc dù vậy", "một cách", "miễn là"];
const tone = (say, a, b) => ({ say, opts: [a, b], correct: say, keepOrder: true });
const fixIt = (q, answers, show) => ({ prompt: "❌ " + q, answers, show });

window.BV_CHAPTER = {
  id: 3,
  titleVi: "Sức khỏe & cân bằng cuộc sống · Kiểm tra Bài 3",
  titleEn: "Health & life balance · Module 3 quiz (online make-up)",
  description: "VIET 203, Module 3 quiz — online make-up for the in-class paper quiz: tone listening, dictogloss, vocabulary, grammar, reading, and a reply to a reader’s letter. About 50 minutes, on your own.",
  color: "#0f766e",
  badge: { icon: "📝", name: "Kiểm tra Bài 3 · Module 3 quiz" },
  exam: { minutes: 50 },   // exam mode (assets/bv.js EXAM): 50-min countdown from Start, start gate + pledge, no copy/paste, exam log in the report

  cando: [
    { vi: "Tôi có thể nghe và phân biệt thanh điệu trong từ về sức khỏe.", en: "I can hear the tone differences in health words." },
    { vi: "Tôi có thể dùng từ vựng về cảm xúc, triệu chứng và thói quen sống.", en: "I can use words for emotions, symptoms and habits." },
    { vi: "Tôi có thể nói nguyên nhân, kết quả và cho lời khuyên.", en: "I can talk about causes and results, and give advice." },
    { vi: "Tôi có thể đọc một bài blog và viết thư trả lời một bạn đọc.", en: "I can read a blog post and write a reply to a reader’s letter." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Kiểm tra Bài 3 · bản trực tuyến · khoảng 50 phút · làm một mình.", en: "Module 3 quiz · online make-up · about 50 minutes · on your own." },
      blocks: [
        { type: "html", title: { vi: "Hướng dẫn", en: "Instructions" }, html: `
          <p>You missed the in-class quiz, so this is the same quiz <strong>online</strong>. In class it was a group quiz; here you work <strong>alone</strong>, in a quiet place, with headphones.</p>
          <p><strong>⏱ 50 minutes, one sitting.</strong> The timer starts when you tap <em>Bắt đầu làm bài</em> below and keeps running even if you close or reload the page. At 0:00 your answers lock and the report opens — answers you have not checked or saved by then are not counted.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Nội dung · What</th><th>⏱</th><th>Điểm · Points</th></tr>
            <tr><td>1️⃣ Nghe</td><td>I · Listen for the tone · 6 words</td><td>3′</td><td>6 · auto</td></tr>
            <tr><td></td><td>II · Dictogloss: listen twice, then rewrite the text</td><td>10′</td><td>10 · teacher</td></tr>
            <tr><td>2️⃣ Từ vựng</td><td>III · Odd one out · Bắc ↔ Nam · verb + noun</td><td>7′</td><td>12 · auto</td></tr>
            <tr><td>3️⃣ Ngữ pháp</td><td>IV · Fill in from the box · find and fix the error</td><td>7′</td><td>10 · auto</td></tr>
            <tr><td>4️⃣ Đọc hiểu</td><td>V · A blog post: true/false · short answers · find in the text</td><td>10′</td><td>6 auto + 4 teacher</td></tr>
            <tr><td>5️⃣ Viết</td><td>VI · Reply to a reader’s letter (6–8 sentences)</td><td>12′</td><td>12 · teacher</td></tr>
            <tr><td>📊 Nộp bài</td><td>Type your name · download the report · upload it to Canvas</td><td>1′</td><td><strong>/ 60</strong></td></tr>
          </table></div>
          <ul>
            <li>No notes, dictionaries, translators or AI tools. <strong>Copy, paste and right-click are turned off</strong>, and leaving this page is recorded in your report.</li>
            <li>Answer in Vietnamese unless the question says otherwise. <strong>Include all tone marks</strong>: spelling and tones count. Use the letter buttons under a box if you have no Vietnamese keyboard.</li>
            <li>Your <strong>first answer</strong> counts. If it is wrong you get another try for partial credit, then the answer is shown.</li>
            <li>Listening: play each item <strong>at most twice</strong> and keep 🐢 (slow voice) off — in class your teacher read everything twice at normal speed.</li>
            <li>Your work is saved in this browser, so use the same device and browser until you submit.</li>
          </ul>` },

        { type: "examstart", title: { vi: "Bắt đầu làm bài", en: "Start the quiz" } },
      ],
    },

    /* ═══════════════ NGHE ═══════════════ */
    {
      id: "listen", icon: "1️⃣", label: "Nghe",
      intro: { vi: "Phần I và Phần II. Đeo tai nghe.", en: "Parts I and II. Put on your headphones." },
      blocks: [
        { type: "mc", id: "tones", strand: "input", mins: 3,
          title: { vi: "Phần I · Nghe thanh điệu (6 điểm)", en: "Part I · Listen for the tone (6 pts)" },
          instr: { vi: "Bấm 🔊 (tối đa hai lần). Chọn từ bạn nghe.", en: "Tap 🔊 (twice at most). Choose the word you hear." },
          items: [
            tone("đau", "đau", "đâu"),
            tone("họ", "ho", "họ"),
            tone("sốt", "sốt", "sót"),
            tone("cám", "cảm", "cám"),
            tone("ngủ", "ngủ", "ngụ"),
            tone("thuộc", "thuốc", "thuộc"),
          ] },

        { type: "html", title: { vi: "Phần II · Nghe và viết lại (10 điểm)", en: "Part II · Dictogloss (10 pts)" }, strand: "input", mins: 10, html: `
          <p>You will hear a short text about two friends. Listen <strong>twice</strong> at normal speed.</p>
          <ol>
            <li><strong>1st listening:</strong> just listen. Don’t write.</li>
            <li><strong>2nd listening:</strong> jot down key words on scrap paper.</li>
            <li><strong>Then (about 6 minutes):</strong> rebuild the text in the box below in full Vietnamese sentences. You don’t need the exact words — keep the <strong>meaning</strong>, and use correct grammar and spelling.</li>
          </ol>
          <p style="text-align:center;margin:16px 0"><button class="tts" type="button" data-say="${DICTO}" aria-label="Nghe đoạn văn · Play the text" style="font-size:18px;padding:10px 18px">🔊 Nghe đoạn văn · Play the text</button></p>` },

        { type: "writing", id: "dictogloss", strand: "output", mins: 6,
          title: { vi: "Viết lại đoạn văn", en: "Rebuild the text" },
          prompt: { vi: "Viết lại câu chuyện bằng câu đầy đủ: ai, khi nào, chuyện gì xảy ra, lời khuyên, và kết thúc ra sao.", en: "Rewrite the story in full sentences: who, when, what happened, the advice, and how it ends." },
          minWords: 40,
          checklist: [
            { vi: "Tôi chỉ nghe hai lần", en: "I listened only twice" },
            { vi: "Câu đầy đủ, đúng thứ tự câu chuyện", en: "Full sentences, in the story’s order" },
            { vi: "Tôi đã kiểm tra dấu thanh", en: "I checked the tone marks" },
          ] },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "2️⃣", label: "Từ vựng",
      intro: { vi: "Phần III · Từ vựng (12 điểm).", en: "Part III · Vocabulary (12 pts)." },
      blocks: [
        { type: "mc", id: "odd", strand: "language", mins: 2,
          title: { vi: "A · Từ nào khác loại? (4 điểm)", en: "A · Odd one out (4 pts)" },
          instr: { vi: "Chọn từ không cùng nhóm với ba từ còn lại.", en: "Choose the word that does not belong with the other three." },
          items: [
            { q: "Từ nào khác loại?", opts: ["lo lắng", "buồn bã", "thất vọng", "lạc quan"], correct: "lạc quan", keepOrder: true, explain: "lạc quan is positive; the others are negative emotions." },
            { q: "Từ nào khác loại?", opts: ["đau đầu", "sổ mũi", "chóng mặt", "cạnh tranh"], correct: "cạnh tranh", keepOrder: true, explain: "cạnh tranh (to compete) is not a symptom." },
            { q: "Từ nào khác loại?", opts: ["nhà thuốc", "dược sĩ", "đơn thuốc", "đồ ăn vặt"], correct: "đồ ăn vặt", keepOrder: true, explain: "đồ ăn vặt (snacks) doesn’t belong to the pharmacy." },
            { q: "Từ nào khác loại?", opts: ["chăm chỉ", "siêng năng", "năng động", "làm biếng"], correct: "làm biếng", keepOrder: true, explain: "làm biếng is negative; the others are positive traits." },
          ] },

        { type: "type", id: "bac-nam", strand: "language", mins: 2,
          title: { vi: "B · Bắc ↔ Nam (4 điểm)", en: "B · North ↔ South (4 pts)" },
          instr: { vi: "Viết từ của miền kia.", en: "Type the other region’s word." },
          items: [
            { prompt: "lười (Bắc) → … (Nam)", answers: ["làm biếng"] },
            { prompt: "khùng (Nam) → … (Bắc)", answers: ["điên"] },
            { prompt: "chăm chỉ (Bắc) → … (Nam)", answers: ["siêng năng", "siêng"] , show: "siêng năng" },
            { prompt: "bệnh (Nam) → … (Bắc)", answers: ["ốm"] },
          ] },

        { type: "mc", id: "collocations", strand: "language", mins: 3,
          title: { vi: "C · Động từ + danh từ (4 điểm)", en: "C · Verb + noun (4 pts)" },
          instr: { vi: "Chọn động từ trong khung: duy trì · hạn chế · kiểm tra · giảm · cải thiện. Mỗi từ dùng một lần; thừa một từ.", en: "Choose a verb from the box. Each verb is used once; one is extra." },
          items: [
            { q: "Mỗi năm, tôi đi ___ sức khỏe định kỳ hai lần.", opts: BOX3, correct: "kiểm tra", keepOrder: true },
            { q: "Bác sĩ khuyên anh ấy nên ___ thói quen xấu như hút thuốc và thức khuya.", opts: BOX3, correct: "hạn chế", keepOrder: true },
            { q: "Ăn nhiều rau xanh và trái cây giúp chúng ta ___ chế độ ăn uống lành mạnh.", opts: BOX3, correct: "duy trì", keepOrder: true },
            { q: "Nghe nhạc nhẹ trước khi ngủ có thể giúp bạn ___ căng thẳng.", opts: BOX3, correct: "giảm", keepOrder: true },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "3️⃣", label: "Ngữ pháp",
      intro: { vi: "Phần IV · Ngữ pháp (10 điểm).", en: "Part IV · Grammar (10 pts)." },
      blocks: [
        { type: "mc", id: "connectors", strand: "language", mins: 4,
          title: { vi: "A · Điền từ trong khung (6 điểm)", en: "A · Fill in from the box (6 pts)" },
          instr: { vi: "Khung: khiến cho · dẫn đến · nhờ vào · do · mặc dù vậy · một cách · miễn là. Mỗi từ dùng một lần; thừa một từ.", en: "Each word or phrase is used once; one is extra." },
          items: [
            { q: "Ngồi trước máy tính cả ngày ___ tôi bị mỏi mắt và đau lưng.", opts: BOX4, correct: "khiến cho", keepOrder: true },
            { q: "Căng thẳng kéo dài có thể ___ tình trạng mất ngủ.", opts: BOX4, correct: "dẫn đến", keepOrder: true },
            { q: "___ việc đi bộ 30 phút mỗi tối, bố tôi đã giảm được 5 cân.", opts: BOX4, correct: "nhờ vào", keepOrder: true },
            { q: "Chị Hoa bị đau lưng ___ ngồi làm việc quá lâu.", opts: BOX4, correct: "do", keepOrder: true },
            { q: "Tôi biết cà phê không tốt cho giấc ngủ. ___, tôi vẫn uống một ly lúc 9 giờ tối.", opts: BOX4, correct: "mặc dù vậy", keepOrder: true },
            { q: "Từ khi tập yoga, em ngủ ngon hơn ___ đáng kể.", opts: BOX4, correct: "một cách", keepOrder: true },
          ] },

        { type: "type", id: "fix", strand: "language", mins: 3,
          title: { vi: "B · Tìm và sửa lỗi (4 điểm)", en: "B · Find and fix the error (4 pts)" },
          instr: { vi: "Mỗi câu có một lỗi. Viết lại cả câu cho đúng.", en: "Each sentence has one mistake. Type the whole sentence correctly." },
          items: [
            fixIt("Cuộc sống càng ngày càng khó khăn hơn.",
              ["Cuộc sống càng ngày càng khó khăn", "Cuộc sống ngày càng khó khăn"],
              "Cuộc sống càng ngày càng khó khăn. (no hơn after càng ngày càng)"),
            fixIt("Nếu tôi là bạn, tôi đi ngủ sớm hơn.",
              ["Nếu tôi là bạn thì tôi sẽ đi ngủ sớm hơn", "Nếu tôi là bạn, tôi sẽ đi ngủ sớm hơn", "Nếu tôi là bạn thì tôi đi ngủ sớm hơn", "Nếu là bạn thì tôi sẽ đi ngủ sớm hơn"],
              "Nếu tôi là bạn thì tôi sẽ đi ngủ sớm hơn."),
            fixIt("Càng tôi tập thể dục, tôi càng khỏe.",
              ["Tôi càng tập thể dục càng khỏe", "Càng tập thể dục, tôi càng khỏe", "Tôi càng tập thể dục, tôi càng khỏe", "Tôi càng tập thể dục thì càng khỏe", "Tôi càng tập thể dục thì tôi càng khỏe", "Càng tập thể dục tôi càng khỏe"],
              "Tôi càng tập thể dục càng khỏe. / Càng tập thể dục, tôi càng khỏe."),
            fixIt("Bạn có thể ăn bánh ngọt, miễn là không ăn quá nhiều là được.",
              ["Bạn có thể ăn bánh ngọt, miễn là không ăn quá nhiều", "Bạn có thể ăn bánh ngọt, miễn là bạn không ăn quá nhiều"],
              "Bạn có thể ăn bánh ngọt, miễn là không ăn quá nhiều. (miễn là + clause takes no là được)"),
          ] },
      ],
    },

    /* ═══════════════ ĐỌC HIỂU ═══════════════ */
    {
      id: "read", icon: "4️⃣", label: "Đọc hiểu",
      intro: { vi: "Phần V · Đọc hiểu (10 điểm). Đọc câu hỏi trước, rồi đọc bài.", en: "Part V · Reading (10 pts). Tip: read the questions first, then the text." },
      blocks: [
        { type: "html", title: { vi: "Bài blog", en: "The blog post" }, strand: "input", mins: 0, html: BLOG },

        { type: "tf", id: "read-tf", strand: "input", mins: 2,
          title: { vi: "A · Đúng hay sai? (4 điểm)", en: "A · True or false? (4 pts)" },
          instr: { vi: "Chỉ một lần chọn.", en: "One try only." },
          items: [
            { q: "Thảo đi làm thêm ở một quán cà phê đến 10 giờ tối.", ans: true },
            { q: "Ngay từ đầu, Thảo đã kể thật với bố mẹ về tình trạng của mình.", ans: false, why: "Lúc đầu Thảo chỉ nói “Con khỏe ạ”." },
            { q: "Chị Hằng cũng từng bị căng thẳng khi học năm nhất.", ans: true },
            { q: "Đến cuối học kỳ, Thảo được điểm rất cao.", ans: false, why: "Điểm của Thảo không cao lắm." },
          ] },

        { type: "writing", id: "read-q5", strand: "output", mins: 1,
          title: { vi: "B5 · Vì sao Thảo bị thiếu ngủ?", en: "B5 · Why didn’t Thảo get enough sleep?" },
          prompt: { vi: "Trả lời bằng một câu tiếng Việt đầy đủ.", en: "Answer in a complete Vietnamese sentence." },
          minWords: 6, checklist: [{ vi: "Câu đầy đủ, có dấu", en: "Complete sentence, with tone marks" }] },
        { type: "writing", id: "read-q6", strand: "output", mins: 1,
          title: { vi: "B6 · Khi bị căng thẳng, Thảo có những triệu chứng gì?", en: "B6 · What symptoms did Thảo have? (name two)" },
          prompt: { vi: "Nêu hai triệu chứng, bằng một câu đầy đủ.", en: "Name two, in a complete sentence." },
          minWords: 6, checklist: [{ vi: "Hai triệu chứng", en: "Two symptoms" }] },
        { type: "writing", id: "read-q7", strand: "output", mins: 1,
          title: { vi: "B7 · Chị Hằng khuyên Thảo điều gì?", en: "B7 · What did Hằng advise Thảo?" },
          prompt: { vi: "Trả lời bằng một câu tiếng Việt đầy đủ.", en: "Answer in a complete Vietnamese sentence." },
          minWords: 6, checklist: [{ vi: "Câu đầy đủ, có dấu", en: "Complete sentence, with tone marks" }] },
        { type: "writing", id: "read-q8", strand: "output", mins: 2,
          title: { vi: "B8 · Thảo đã thay đổi những thói quen nào?", en: "B8 · Which habits did Thảo change? (name two)" },
          prompt: { vi: "Nêu hai thói quen, bằng một câu đầy đủ.", en: "Name two, in a complete sentence." },
          minWords: 6, checklist: [{ vi: "Hai thói quen", en: "Two habits" }] },

        { type: "type", id: "read-find", strand: "input", mins: 2,
          title: { vi: "C · Tìm trong bài (2 điểm)", en: "C · Find in the text (2 pts)" },
          instr: { vi: "Gõ đúng cụm từ trong bài.", en: "Type the exact words from the text." },
          items: [
            { prompt: "The saying that means “Health is the most precious thing”:", answers: ["Sức khỏe là vàng", "Sức khỏe là vàng mà", "Sức khoẻ là vàng", "Sức khoẻ là vàng mà"], show: "Sức khỏe là vàng" },
            { prompt: "The phrase that shows how much Thảo’s mood improved (một cách + adj.):", answers: ["một cách rõ rệt", "lạc quan hơn một cách rõ rệt", "cảm thấy lạc quan hơn một cách rõ rệt"], show: "(lạc quan hơn) một cách rõ rệt" },
          ] },
      ],
    },

    /* ═══════════════ VIẾT ═══════════════ */
    {
      id: "write", icon: "5️⃣", label: "Viết",
      intro: { vi: "Phần VI · Trả lời thư bạn đọc (12 điểm).", en: "Part VI · Reply to a reader’s letter (12 pts)." },
      blocks: [
        { type: "html", title: { vi: "Thư của Vy gửi chuyên mục “Sống Khỏe”", en: "Vy’s letter to the “Sống Khỏe” column" }, strand: "input", mins: 0, html: `
          <p>You write the advice column <em>“Sống Khỏe”</em> for a student magazine. Read Vy’s letter, then write a reply of <strong>6–8 sentences</strong>.</p>${VY}` },

        { type: "writing", id: "reply-vy", strand: "output", mins: 12,
          title: { vi: "Viết · Thư trả lời Vy", en: "Write: your reply to Vy" },
          prompt: { vi: "Viết 6–8 câu. Xưng hô chị/anh – em hoặc chuyên mục – bạn, dùng thống nhất.", en: "Write 6–8 sentences. Address her as chị/anh → em or chuyên mục → bạn — just be consistent." },
          minWords: 80,
          checklist: [
            { vi: "Lời chào và sự đồng cảm", en: "Greeting and empathy" },
            { vi: "Hai nguyên nhân và ảnh hưởng đến sức khỏe", en: "Two causes and their effect on her health" },
            { vi: "Ba lời khuyên (một lời khuyên “Vận động nhiều, ngồi ít”)", en: "Three pieces of advice (one about moving more, sitting less)" },
            { vi: "Lời động viên ở cuối", en: "Encouragement at the end" },
            { vi: "Ít nhất bốn cấu trúc trong danh sách", en: "At least four structures from the list" },
          ] },
      ],
    },

    /* ═══════════════ NỘP BÀI ═══════════════ */
    {
      id: "report", icon: "📊", label: "Nộp bài", live: true,
      blocks: [
        { type: "report", timing: true, title: { vi: "Báo cáo · tải về và nộp trên Canvas", en: "Report · download it and submit on Canvas" } },
      ],
    },
  ],
};
})();
