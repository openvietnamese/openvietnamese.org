/* VIET 203 (UNC Viet) — Bài 3 · Sức khỏe & Cân bằng · T3 “Vận Động Nhiều, Ngồi Ít”
   Group video task: “Phóng viên Cuộc Sống Năng Động — Bản tin từ vườn Coker”.
   Groups of 3 plan for 20 minutes in class, then walk to UNC Coker Arboretum and film a 45–60 second advice clip
   (all in class, Wed 28/10/2026) that gets Gen Z moving,
   using four drawn cards (Kênh · Áp lực · Ngữ pháp · Thiên nhiên); subtitles + hashtags in post; screened at the
   “Liên Hoan Phim Năng Động” (Fri 30/10/2026) with a viewing sheet, press questions, awards and the 24-hour challenge.
   Source: site/_source/VIET203-M3-T3-Phong-Vien-Arboretum.md (Huy Phung). The teacher notes in that file stay off this page,
   except the 10-point grading suggestion, shown to students as the rubric.
   Engine: ../assets/bv.js (copy of the VIET 101 homework engine, 2026-10-28). No recordings yet: 🔊 uses the browser voice. */
(function () {

const LEVELS = [
  { vi: "Cần cố gắng", en: "Developing" },
  { vi: "Đạt", en: "Meets" },
  { vi: "Xuất sắc", en: "Exceeds" },
];

/* ── card draw: four decks, one card each; the draw is kept in this browser ── */
const DECKS = {
  kenh: { e: "📺", vi: "Kênh", en: "Channel", cards: ["📺 Bản Tin Thời Sự", "📱 Vlog TikTok", "🛒 Quảng Cáo", "🎭 Trước & Sau", "🎤 Phỏng Vấn Dạo", "🏋️ Huấn Luyện Viên"] },
  apluc: { e: "😩", vi: "Áp lực", en: "Pressure", cards: ["Áp lực học tập, thi cử", "Áp lực từ mạng xã hội", "Áp lực từ công việc làm thêm", "Kỳ vọng của gia đình", "Cảm thấy cô đơn, xa nhà", "Mất ngủ, thức khuya"] },
  nguphap: { e: "🧩", vi: "Ngữ pháp", en: "Grammar", cards: ["miễn là …", "một cách + tính từ", "… , kết quả là …", "Nhờ vào … , …", "Mặc dù … nhưng …", "… dẫn đến …"] },
  thiennhien: { e: "🍂", vi: "Thiên nhiên", en: "Nature", cards: ["Lá vàng / lá đỏ mùa thu", "Một cái cây thật to", "Giàn hoa (the arbor)", "Con đường đi bộ", "Ghế đá / ghế băng (không ai được ngồi! 😄)", "Bầu trời / ánh nắng"] },
};
/* what the 🔊 says for each card (Huy’s recordings, by exact text); grammar cards get an example sentence */
DECKS.apluc.say = DECKS.apluc.cards;
DECKS.thiennhien.say = ["Lá vàng, lá đỏ mùa thu", "Một cái cây thật to", "Giàn hoa", "Con đường đi bộ", "Ghế đá, ghế băng", "Bầu trời, ánh nắng"];
DECKS.nguphap.ex = [
  "Bạn không cần đến phòng tập, miễn là bạn đi bộ mỗi ngày.",
  "Đi bộ giúp bạn học tập một cách hiệu quả.",
  "Mình đi bộ mỗi sáng, kết quả là mình ngủ ngon hơn.",
  "Nhờ vào mười lăm phút đi bộ, bạn sẽ bớt căng thẳng.",
  "Mặc dù ôn thi rất bận nhưng bạn vẫn nên đứng dậy mỗi giờ.",
  "Ngồi quá lâu dẫn đến đau lưng và mệt mỏi.",
];
const DRAW_KEY = "uncviet-viet203-m3-t3-draw";
const loadDraw = () => { try { return JSON.parse(localStorage.getItem(DRAW_KEY)) || {}; } catch (e) { return {}; } };
function showDraw() {
  const d = loadDraw();
  Object.keys(DECKS).forEach(k => {
    const el = document.getElementById("v203-draw-" + k);
    if (el) el.textContent = d[k] != null ? (d[k] + 1) + " · " + DECKS[k].cards[d[k]] : "—";
  });
}
window.V203draw = function (which) {
  const d = loadDraw();
  (which ? [which] : Object.keys(DECKS)).forEach(k => { d[k] = Math.floor(Math.random() * DECKS[k].cards.length); });
  try { localStorage.setItem(DRAW_KEY, JSON.stringify(d)); } catch (e) { /* private mode */ }
  showDraw();
};
if (window.addEventListener) window.addEventListener("DOMContentLoaded", showDraw);   // bv.js has built the page by then (no-op in the recording-script generator)

const deckTable = k => `
  <h4>${DECKS[k].e} Thẻ ${DECKS[k].vi.toUpperCase()} <small>· ${DECKS[k].en}</small></h4>
  <div class="table-scroll"><table class="culture-table">
    ${DECKS[k].cards.map((c, i) => `<tr><th>${i + 1}</th><td>${c}${DECKS[k].say ? " " + btn(DECKS[k].say[i]) : ""}</td>${DECKS[k].ex ? `<td lang="vi"><em>${say(DECKS[k].ex[i])}</em></td>` : ""}</tr>`).join("")}
  </table></div>`;

const btn = s => `<button class="tts" data-say="${s}">🔊</button>`;
const say = s => `${s} ${btn(s)}`;
const line = (spk, s) => `<div class="dlg-line"><span class="spk">${spk}</span><div class="dlg-text">${say(s)}</div></div>`;

window.BV_CHAPTER = {
  id: 3,
  titleVi: "Phóng viên “Cuộc Sống Năng Động”",
  titleEn: "T3 · Active Life reporters: a video from Coker Arboretum",
  description: "VIET 203 Module 3, T3 “Vận Động Nhiều, Ngồi Ít”: in groups of 3, film a 45–60 second advice video at UNC Coker Arboretum that convinces Gen Z to get up and move — card draw, storyboard, script, filming rules, subtitles, film festival and the 24-hour challenge.",
  color: "#15803d",
  badge: { icon: "🎬", name: "Phóng viên · On assignment" },
  rubricLevels: LEVELS,

  cando: [
    { vi: "Tôi có thể cùng nhóm viết một kịch bản lời khuyên 80–110 từ có mở đầu, thân bài và kết thúc.", en: "I can write an 80–110 word advice script with my group, with an opening, a body and an ending." },
    { vi: "Tôi có thể đưa ra lời khuyên bằng câu nếu… thì / khi… thì và các cấu trúc như miễn là, kết quả là, mặc dù… nhưng….", en: "I can give advice with nếu… thì / khi… thì and patterns like miễn là, kết quả là, mặc dù… nhưng…." },
    { vi: "Tôi có thể nói trước máy quay rõ ràng, nhìn vào máy quay, không đọc kịch bản.", en: "I can speak clearly on camera, looking at the camera, without reading the script." },
    { vi: "Tôi có thể nghe video của nhóm khác, ghi lại lời khuyên chính và đặt câu hỏi cho nhóm.", en: "I can follow another group’s video, note its main advice and ask the group a question." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Nhóm 3 người · video 45–60 giây · hôm nay, thứ Tư 28/10: lập kế hoạch 20 phút trên lớp, rồi đi bộ đến vườn Coker quay phim · Liên Hoan Phim thứ Sáu 30/10.", en: "Groups of 3 · a 45–60 second video · today, Wednesday, October 28: plan for 20 minutes in class, then walk to Coker Arboretum and film · film festival Friday, October 30." },
      blocks: [
        { type: "html", title: { vi: "Nhiệm vụ của bạn", en: "Your mission" }, html: `
          <p lang="vi">Tạp chí <strong>“Cuộc Sống Năng Động”</strong> cần một <strong>video lời khuyên 45–60 giây</strong> cho trang mạng xã hội của tạp chí. Nhóm bạn (3 người) là đội phóng viên được cử đến <strong>vườn Coker</strong> để quay video. Mục tiêu: thuyết phục các bạn Gen Z <strong>đứng dậy, ra ngoài và vận động nhiều hơn</strong>. ${btn("Tạp chí “Cuộc Sống Năng Động” cần một video lời khuyên bốn mươi lăm đến sáu mươi giây cho trang mạng xã hội của tạp chí. Nhóm bạn, ba người, là đội phóng viên được cử đến vườn Coker để quay video. Mục tiêu: thuyết phục các bạn Gen Z đứng dậy, ra ngoài và vận động nhiều hơn.")}</p>
          <p class="en"><em>The magazine needs a 45–60 second advice clip for its social media. Your group of 3 is the reporting team sent to Coker Arboretum. Goal: convince Gen Z to get up, go outside and move more.</em></p>
          <p lang="vi">Mỗi nhóm <strong>bốc thăm 4 thẻ</strong>: 1 thẻ <strong>Kênh</strong>, 1 thẻ <strong>Áp lực</strong>, 1 thẻ <strong>Ngữ pháp</strong>, 1 thẻ <strong>Thiên nhiên</strong>. Video của nhóm bạn phải dùng <strong>cả 4 thẻ</strong>. ${btn("Mỗi nhóm bốc thăm bốn thẻ: một thẻ Kênh, một thẻ Áp lực, một thẻ Ngữ pháp, một thẻ Thiên nhiên. Video của nhóm bạn phải dùng cả bốn thẻ.")}</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Nhóm · Group</th><td>3 người · MC, đạo diễn, biên tập viên ngôn ngữ</td></tr>
            <tr><th>Video</th><td>45–60 giây · kịch bản 80–110 từ · phụ đề tiếng Việt</td></tr>
            <tr><th>Lập kế hoạch · Planning</th><td>✍️ <strong>Thứ Tư 28/10</strong> · 20 phút trên lớp</td></tr>
            <tr><th>Quay phim · Filming</th><td>🍂 <strong>Thứ Tư 28/10</strong>, ngay sau đó · cả lớp đi bộ đến UNC Coker Arboretum · 10 phút quay</td></tr>
            <tr><th>Chiếu phim · Screening</th><td>🏆 <strong>Liên Hoan Phim Năng Động · thứ Sáu 30/10</strong>, trên lớp</td></tr>
            <tr><th>Bạn nộp · You submit</th><td>Video + tiêu đề + hashtag (Padlet / Canvas) · báo cáo từ tab 📊 Nộp bài: kịch bản, ghi âm, phiếu xem phim, Thử Thách 24 Giờ</td></tr>
          </table></div>` },

        { type: "html", title: { vi: "Các bước", en: "The steps" }, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Bước · Step</th><th>Bạn làm gì · What you do</th><th>Tab</th></tr>
            <tr><td>1 · Lập kế hoạch<br><small>thứ Tư 28/10 · 20 phút trên lớp</small></td><td>Phân vai, bốc thăm 4 thẻ, vẽ bảng phân cảnh, viết kịch bản 80–110 từ. Câu thoại của bạn ở trong điện thoại hoặc trên thẻ nhỏ.</td><td>1️⃣ 2️⃣</td></tr>
            <tr><td>2 · Ở vườn Coker<br><small>thứ Tư 28/10 · ngay sau đó · 10 phút</small></td><td>Cả lớp đi bộ đến vườn Coker (vừa đi vừa tập thoại!). Quay tối đa 3 lần. Hết 10 phút, video phải nằm trong điện thoại của đạo diễn.</td><td>3️⃣</td></tr>
            <tr><td>3 · Hậu kỳ<br><small>trước buổi học thứ Sáu 30/10</small></td><td>Phụ đề tiếng Việt có dấu, tiêu đề, 3 hashtag. Nộp lên Padlet / Canvas (giờ nộp trên Canvas).</td><td>4️⃣</td></tr>
            <tr><td>4 · Liên Hoan Phim<br><small><strong>thứ Sáu 30/10</strong> · ~25 phút</small></td><td>Xem video, điền phiếu xem phim, hỏi phóng viên, bình chọn giải thưởng. Rồi làm Thử Thách 24 Giờ và báo cáo vào thứ Hai 2/11.</td><td>5️⃣</td></tr>
          </table></div>
          <p><small>🔒 Video <strong>chỉ chia sẻ trong lớp</strong>. Không quay rõ mặt người lạ. Nếu bạn không muốn xuất hiện trên hình, hãy chọn vai <strong>đạo diễn</strong> hoặc <strong>lồng tiếng</strong> (voice-over) — bạn vẫn được đủ điểm.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Sau Liên Hoan Phim (thứ Sáu 30/10), bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again after the film festival on Friday." } },
      ],
    },

    /* ═══════════════ PHÂN VAI & BỐC THĂM ═══════════════ */
    {
      id: "cards", icon: "1️⃣", label: "Phân vai & bốc thăm",
      intro: { vi: "Bước 1a · Trên lớp hôm nay (phút 0–5): ai làm gì? Rồi bốc thăm 4 thẻ của nhóm.", en: "Step 1a · In class today (minutes 0–5): who does what? Then draw your group’s four cards." },
      blocks: [
        { type: "html", title: { vi: "Phân vai", en: "Roles" }, strand: "output", mins: 3, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Vai · Role</th><th>Việc làm · Job</th></tr>
            <tr><td>🎤 <strong>Phóng viên chính / MC</strong></td><td>Mở đầu và kết thúc video, giữ nhịp (keeps the pace).</td></tr>
            <tr><td>🎥 <strong>Đạo diễn / Quay phim</strong></td><td>Chọn góc quay, quay video, nói <em>“Diễn!”</em> và <em>“Cắt!”</em>. Đạo diễn cũng phải <strong>nói ít nhất 1 câu</strong> (có thể nói từ sau máy quay).</td></tr>
            <tr><td>✍️ <strong>Biên tập viên ngôn ngữ</strong></td><td>Kiểm tra kịch bản: thanh điệu, liên từ, ngữ pháp trên thẻ. Là người “bắt lỗi” khi tập.</td></tr>
          </table></div>
          <p class="en"><small>Everyone speaks, on camera or off camera. If you prefer not to appear on screen, choose the Director role or do a voice-over.</small></p>` },

        { type: "html", title: { vi: "Bốc thăm 4 thẻ", en: "Draw your four cards" }, strand: "output", mins: 4, html: `
          <p>Giáo viên có thể cho bốc thăm thẻ giấy trên lớp. Nếu không, <strong>một bạn trong nhóm</strong> bấm nút dưới đây (chỉ bấm một lần!) rồi chụp màn hình gửi cả nhóm. <span class="en">If your teacher doesn’t hand out paper cards, one member draws here — once — and shares a screenshot.</span></p>
          <div class="table-scroll"><table class="culture-table">
            ${Object.keys(DECKS).map(k => `<tr><th>${DECKS[k].e} ${DECKS[k].vi}<br><small>${DECKS[k].en}</small></th><td><strong id="v203-draw-${k}" lang="vi">—</strong></td><td><button class="ghost-btn" type="button" onclick="V203draw('${k}')">🎲 Đổi · Redraw</button></td></tr>`).join("")}
          </table></div>
          <div class="btn-row center"><button class="check-btn" type="button" onclick="V203draw()">🎲 Bốc thăm cả 4 thẻ · Draw all four</button></div>
          <p><small>Mỗi bộ có 6 thẻ: tối đa 6 nhóm, mỗi nhóm một Kênh khác nhau. Trùng Kênh với nhóm khác? Đổi thẻ Kênh.</small></p>` },

        { type: "html", title: { vi: "Các bộ thẻ", en: "All the cards" }, strand: "input", mins: 4, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Kênh · Channel</th><th>Phong cách · Style</th></tr>
            <tr><td>1 · 📺 <strong>Bản Tin Thời Sự</strong> ${btn("Bản Tin Thời Sự")}</td><td>MC nghiêm túc + “phóng viên hiện trường” đưa tin từ vườn Coker.</td></tr>
            <tr><td>2 · 📱 <strong>Vlog TikTok</strong> ${btn("Vlog TikTok")}</td><td>Quay selfie (được quay dọc!), nói nhanh, vui, “Một ngày năng động của mình”.</td></tr>
            <tr><td>3 · 🛒 <strong>Quảng Cáo</strong> ${btn("Quảng Cáo")}</td><td>Bán một “sản phẩm thần kỳ”, hoàn toàn miễn phí: ĐI BỘ! “Gọi ngay hôm nay!”</td></tr>
            <tr><td>4 · 🎭 <strong>Trước & Sau</strong> ${btn("Trước và Sau")}</td><td>Tiểu phẩm: một bạn “ngồi cả ngày” mệt mỏi → nghe lời khuyên → năng động, vui vẻ.</td></tr>
            <tr><td>5 · 🎤 <strong>Phỏng Vấn Dạo</strong> ${btn("Phỏng Vấn Dạo")}</td><td>Phóng viên phỏng vấn “người đi dạo” (thành viên trong nhóm đóng vai) về thói quen vận động.</td></tr>
            <tr><td>6 · 🏋️ <strong>Huấn Luyện Viên</strong> ${btn("Huấn Luyện Viên")}</td><td>Hướng dẫn 2 động tác giãn cơ đơn giản (đứng, không cần dụng cụ) + lời khuyên.</td></tr>
          </table></div>
          ${deckTable("apluc")}
          ${deckTable("nguphap")}
          <p><small>Thẻ Ngữ pháp: phải dùng <strong>ít nhất 1 lần</strong>.</small></p>
          ${deckTable("thiennhien")}
          <p><small>Thẻ Thiên nhiên: phải xuất hiện <strong>trong video VÀ trong lời thoại</strong>.</small></p>` },

        { type: "mc", id: "check-mission", strand: "language", mins: 3,
          title: { vi: "Bạn đã hiểu chưa?", en: "Quick check" },
          items: [
            { q: "Video của nhóm dài bao lâu?", en: "How long is the video?", opts: ["từ 45 đến 60 giây", "từ 3 đến 5 phút", "khoảng 10 giây"], correct: "từ 45 đến 60 giây" },
            { q: "Mỗi nhóm bốc thăm mấy thẻ?", en: "How many cards does each group draw?", opts: ["bốn thẻ, mỗi bộ một thẻ", "một thẻ", "sáu thẻ Kênh"], correct: "bốn thẻ, mỗi bộ một thẻ" },
            { q: "Ai phải nói trong video?", en: "Who has to speak?", opts: ["cả ba thành viên, kể cả đạo diễn", "chỉ MC", "chỉ người xuất hiện trên hình"], correct: "cả ba thành viên, kể cả đạo diễn", why: { "chỉ MC": "Mọi người đều nói — đạo diễn ít nhất 1 câu, có thể từ sau máy quay." } },
            { q: "Bạn không muốn xuất hiện trên hình. Bạn có thể làm gì?", en: "You don’t want to appear on screen. What can you do?", opts: ["làm đạo diễn hoặc lồng tiếng", "không tham gia", "chỉ viết phụ đề"], correct: "làm đạo diễn hoặc lồng tiếng" },
            { q: "Vật hoặc cảnh trên thẻ Thiên nhiên phải xuất hiện ở đâu?", en: "Where must your Nature card appear?", opts: ["trong video và trong lời thoại", "chỉ trong tiêu đề", "chỉ trong hashtag"], correct: "trong video và trong lời thoại" },
            { q: "Ai kiểm tra thanh điệu và ngữ pháp trong kịch bản?", en: "Who checks tones and grammar in the script?", opts: ["biên tập viên ngôn ngữ", "đạo diễn", "khán giả"], correct: "biên tập viên ngôn ngữ" },
          ] },

        { type: "writing", id: "group-cards", strand: "output", mins: 3,
          title: { vi: "Nhóm của bạn", en: "Your group" },
          prompt: { vi: "Ghi tên các thành viên và vai của từng người, rồi ghi 4 thẻ của nhóm. Ví dụ: “MC: Lan · Đạo diễn: Tom · Biên tập viên: Mai · Kênh: Quảng Cáo · Áp lực: …”", en: "Write each member’s name and role, then your four cards." },
          minWords: 12,
          checklist: [
            { vi: "MC, đạo diễn, biên tập viên ngôn ngữ", en: "MC, director, language editor" },
            { vi: "Thẻ Kênh", en: "Channel card" },
            { vi: "Thẻ Áp lực", en: "Pressure card" },
            { vi: "Thẻ Ngữ pháp", en: "Grammar card" },
            { vi: "Thẻ Thiên nhiên", en: "Nature card" },
          ] },
      ],
    },

    /* ═══════════════ KỊCH BẢN ═══════════════ */
    {
      id: "script", icon: "2️⃣", label: "Kịch bản",
      intro: { vi: "Bước 1b–1c · Trên lớp hôm nay (phút 5–20): bảng phân cảnh 3 khung → kịch bản 80–110 từ. Các bài luyện (ngữ pháp, ngân hàng ngôn ngữ, từ vựng) làm thêm ở nhà trước thứ Sáu.", en: "Steps 1b–1c · In class today (minutes 5–20): a three-frame storyboard → an 80–110 word script. The practice activities (grammar, language bank, vocabulary) are for home before Friday." },
      blocks: [
        { type: "html", title: { vi: "Bảng phân cảnh 3 khung", en: "Three-frame storyboard" }, strand: "output", mins: 5, html: `
          <p>Vẽ nhanh trên giấy hoặc điện thoại (hình que là được! <span class="en">stick figures are fine!</span>) và ghi lời thoại cho từng khung.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Khung 1 · MỞ<br><small>≈ 10 giây</small></th><td><em>“Chào các bạn Gen Z!”</em> + giới thiệu kênh + <strong>con số từ khảo sát của lớp hôm nay</strong></td></tr>
            <tr><th>Khung 2 · THÂN<br><small>≈ 35 giây</small></th><td>Áp lực trên thẻ → hậu quả → <strong>lời khuyên vận động cụ thể ở UNC</strong></td></tr>
            <tr><th>Khung 3 · KẾT<br><small>≈ 10 giây</small></th><td><strong>Khẩu hiệu</strong> (slogan) của nhóm + lời kêu gọi (call to action)</td></tr>
          </table></div>` },

        { type: "html", title: { vi: "Kịch bản mẫu · Kênh: Bản Tin Thời Sự (~95 từ)", en: "Model script · Channel: News Report (~95 words)" }, strand: "input", mins: 4, html: `
          <div class="transcript" lang="vi">
            ${line("A (MC)", "Chào các bạn Gen Z! Đây là bản tin “Cuộc Sống Năng Động”, trực tiếp từ vườn Coker, Đại học UNC.")}
            ${line("B", "Theo khảo sát của lớp mình, hôm qua mỗi bạn ngồi khoảng chín tiếng. Nhiều quá, phải không?")}
            ${line("C", "Khi ôn thi, nhiều bạn ngồi trong thư viện cả ngày. Nếu bạn ngồi quá lâu thì đầu óc sẽ mệt mỏi và dễ căng thẳng.")}
            ${line("A (MC)", "Vì vậy, giữa hai giờ học, hãy đi bộ qua vườn Coker thay vì ngồi lướt điện thoại. Nhìn những chiếc lá vàng này xem, đẹp không?")}
            ${line("B", "Bạn không cần đến phòng tập, miễn là bạn đi bộ mười lăm phút mỗi ngày.")}
            ${line("C", "Kết quả là bạn sẽ ngủ ngon hơn và học tập một cách hiệu quả hơn.")}
            ${line("Cả nhóm", "Ngồi ít, đi nhiều, Gen Z khỏe nhiều!")}
          </div>
          <p><small>⚠️ Mẫu chỉ để tham khảo. <strong>Đừng chép!</strong> Nhóm bạn có thẻ khác, kênh khác.</small></p>` },

        { type: "mc", id: "model-check", strand: "input", mins: 3,
          title: { vi: "Kịch bản mẫu có đủ chưa?", en: "Check the model against the checklist" },
          items: [
            { q: "Con số trong kịch bản mẫu là gì?", en: "What number does the model use?", opts: ["mỗi bạn ngồi khoảng chín tiếng", "10.000 bước mỗi ngày", "35% người tập thể dục"], correct: "mỗi bạn ngồi khoảng chín tiếng" },
            { q: "Áp lực trong kịch bản mẫu là gì?", en: "Which pressure does the model use?", opts: ["áp lực học tập, thi cử", "kỳ vọng của gia đình", "mất ngủ, thức khuya"], correct: "áp lực học tập, thi cử" },
            { q: "Câu nào là câu nếu… thì?", en: "Which is the nếu… thì sentence?", opts: ["Nếu bạn ngồi quá lâu thì đầu óc sẽ mệt mỏi.", "Nhìn những chiếc lá vàng này xem.", "Bạn không cần đến phòng tập."], correct: "Nếu bạn ngồi quá lâu thì đầu óc sẽ mệt mỏi." },
            { q: "Lời khuyên cụ thể ở UNC là gì?", en: "What is the specific UNC advice?", opts: ["giữa hai giờ học, đi bộ qua vườn Coker", "đến phòng tập mỗi tối", "ngồi trong thư viện cả ngày"], correct: "giữa hai giờ học, đi bộ qua vườn Coker" },
            { q: "Thẻ Thiên nhiên của nhóm mẫu là gì?", en: "Which Nature card did the model group draw?", opts: ["lá vàng mùa thu", "giàn hoa", "ghế đá"], correct: "lá vàng mùa thu" },
          ] },

        { type: "cloze", id: "grammar-cards", strand: "language", mins: 5,
          title: { vi: "Luyện các thẻ Ngữ pháp", en: "Practise the grammar cards" },
          instr: { vi: "Điền từ. Mỗi câu dùng một cấu trúc trên thẻ Ngữ pháp hoặc câu nếu… thì.", en: "Fill in the blanks — every sentence uses a grammar card or nếu… thì." },
          items: [
            { text: "Bạn không cần đến phòng tập, {0} bạn đi bộ mười lăm phút mỗi ngày. {1} ôn thi rất bận, {2} bạn vẫn nên đứng dậy mỗi giờ một lần. Ngồi quá lâu sẽ {3} đau lưng và mệt mỏi.", answers: ["miễn là", "Mặc dù", "nhưng", "dẫn đến"], bank: ["miễn là", "Mặc dù", "nhưng", "dẫn đến", "thay vì", "một cách"] },
            { text: "{0} đi bộ mỗi ngày, Lan ngủ ngon hơn và học tập {1} hiệu quả hơn. Lan đi bộ qua vườn Coker mỗi sáng, {2} bạn ấy không còn căng thẳng nữa. {3} bạn ngồi quá lâu {4} đầu óc sẽ mệt mỏi.", answers: ["Nhờ vào", "một cách", "kết quả là", "Nếu", "thì"], bank: ["Nhờ vào", "một cách", "kết quả là", "Nếu", "thì", "miễn là", "nhưng"] },
          ] },

        { type: "flashcards", id: "lang-bank", strand: "language", mins: 6,
          title: { vi: "Ngân hàng ngôn ngữ", en: "Language bank" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Chọn câu hợp với kênh của nhóm bạn.", en: "Flip, listen, say it aloud. The deck goes: opening → body → ending & call to action → sample slogans. Pick lines that fit your channel." },
          cards: [
            /* mở đầu */
            { vi: "Chào các bạn Gen Z!", en: "Hi, Gen Z!", ex: "Chào các bạn Gen Z! Đây là bản tin “Cuộc Sống Năng Động”.", exEn: "Hi, Gen Z! This is the Active Life news." },
            { vi: "trực tiếp từ vườn Coker", en: "live from Coker Arboretum", ex: "Chúng mình đang trực tiếp từ vườn Coker, Đại học UNC.", exEn: "We’re live from Coker Arboretum at UNC." },
            { vi: "Bạn có biết", en: "Do you know … / Did you know … (+ không?)", ex: "Bạn có biết hôm qua bạn đã ngồi bao nhiêu tiếng không?", exEn: "Do you know how many hours you sat yesterday?" },
            { vi: "theo khảo sát của lớp", en: "according to the class survey", ex: "Theo khảo sát của lớp VIET 203, mỗi bạn ngồi khoảng chín tiếng một ngày!", exEn: "According to our class survey, each of us sits about nine hours a day!" },
            /* thân bài */
            { vi: "thay vì", en: "instead of", ex: "Thay vì lướt điện thoại, hãy thử đi bộ quanh vườn.", exEn: "Instead of scrolling, try a walk around the garden." },
            { vi: "hãy thử", en: "try (doing something)", ex: "Hãy thử giãn cơ năm phút giữa hai giờ học.", exEn: "Try stretching for five minutes between classes." },
            { vi: "khi bạn cảm thấy", en: "when you feel (… thì hãy …)", ex: "Khi bạn cảm thấy căng thẳng thì hãy ra ngoài hít thở.", exEn: "When you feel stressed, step outside and breathe." },
            { vi: "miễn là", en: "as long as", ex: "Bạn không cần phòng tập, miễn là bạn đi bộ mỗi ngày.", exEn: "You don’t need a gym, as long as you walk every day." },
            { vi: "nhờ vào", en: "thanks to", ex: "Nhờ vào mười lăm phút đi bộ, bạn sẽ ngủ ngon hơn.", exEn: "Thanks to fifteen minutes of walking, you’ll sleep better." },
            { vi: "một cách hiệu quả", en: "effectively", ex: "Đi bộ giúp bạn học tập một cách hiệu quả.", exEn: "Walking helps you study effectively." },
            { vi: "một cách dễ dàng", en: "easily", ex: "Bạn có thể vận động một cách dễ dàng ở UNC.", exEn: "You can move easily at UNC." },
            /* kết thúc & kêu gọi */
            { vi: "Còn chờ gì nữa?", en: "What are you waiting for?", ex: "Còn chờ gì nữa? Đứng dậy đi, Gen Z!", exEn: "What are you waiting for? Get up, Gen Z!" },
            { vi: "Hẹn gặp các bạn ở vườn Coker nhé!", en: "See you at Coker Arboretum!", ex: "Hẹn gặp các bạn ở vườn Coker nhé!", exEn: "See you at Coker Arboretum!" },
            { vi: "Nhớ bấm theo dõi nhé!", en: "Don’t forget to follow!", ex: "Nhớ bấm theo dõi “Cuộc Sống Năng Động” nhé!", exEn: "Remember to follow Active Life!" },
            /* khẩu hiệu mẫu */
            { vi: "Ngồi ít, đi nhiều, khỏe nhiều, vui nhiều!", en: "Sit less, walk more, be healthier, be happier!", ex: "Cả nhóm: Ngồi ít, đi nhiều, khỏe nhiều, vui nhiều!", exEn: "Everyone: sit less, walk more …!" },
            { vi: "Mỗi ngày một bước, sức khỏe đi trước!", en: "One step a day, health leads the way!", ex: "Hãy nhớ: mỗi ngày một bước, sức khỏe đi trước!", exEn: "Remember: one step a day …!" },
          ] },

        { type: "flashcards", id: "film-cards", strand: "language", mins: 4,
          title: { vi: "Thẻ từ · Từ vựng quay phim", en: "Flashcards: filming vocabulary" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Rồi ghép từ ở bài dưới.", en: "Flip, listen, say it aloud — then do the matching below." },
          cards: [
            { vi: "quay phim", en: "to film", ex: "Hôm nay nhóm mình quay phim ở vườn Coker.", exEn: "Today our group films at Coker Arboretum." },
            { vi: "phóng viên", en: "reporter", ex: "Phóng viên đưa tin trực tiếp từ vườn Coker.", exEn: "The reporter reports live from Coker." },
            { vi: "đạo diễn", en: "director", ex: "Đạo diễn nói: “Diễn!”", exEn: "The director says: “Action!”" },
            { vi: "biên tập viên", en: "editor", ex: "Biên tập viên kiểm tra thanh điệu.", exEn: "The editor checks the tones." },
            { vi: "kịch bản", en: "script", ex: "Kịch bản của nhóm có một trăm từ.", exEn: "Our script has a hundred words." },
            { vi: "lời thoại", en: "lines", ex: "Mình nhớ hết lời thoại rồi.", exEn: "I know all my lines." },
            { vi: "bảng phân cảnh", en: "storyboard", ex: "Bảng phân cảnh có ba khung.", exEn: "The storyboard has three frames." },
            { vi: "cảnh", en: "scene", ex: "Cảnh này đẹp quá!", exEn: "This scene is so beautiful!" },
            { vi: "góc quay", en: "camera angle", ex: "Đạo diễn chọn góc quay có lá vàng.", exEn: "The director picks an angle with yellow leaves." },
            { vi: "máy quay", en: "camera", ex: "Hãy nhìn vào máy quay.", exEn: "Look at the camera." },
            { vi: "lần quay", en: "take", ex: "Lần quay thứ hai tốt nhất.", exEn: "The second take is the best." },
            { vi: "phụ đề", en: "subtitles", ex: "Phụ đề phải có dấu.", exEn: "The subtitles need diacritics." },
            { vi: "khẩu hiệu", en: "slogan", ex: "Khẩu hiệu của nhóm rất dễ nhớ.", exEn: "Our slogan is easy to remember." },
            { vi: "hậu trường", en: "behind the scenes", ex: "Lần quay hỏng dùng cho phần hậu trường.", exEn: "The failed take goes in the bloopers." },
            { vi: "lồng tiếng", en: "voice-over", ex: "Mình không muốn lên hình, mình sẽ lồng tiếng.", exEn: "I don’t want to be on screen — I’ll do the voice-over." },
            { vi: "Diễn!", en: "Action!", ex: "Sẵn sàng chưa? Diễn!", exEn: "Ready? Action!" },
            { vi: "Cắt!", en: "Cut!", ex: "Cắt! Quay lại nhé.", exEn: "Cut! Let’s do it again." },
          ] },

        { type: "match", id: "film-words", strand: "language", mins: 3,
          title: { vi: "Từ vựng quay phim", en: "Filming vocabulary" },
          pairs: [
            { a: "quay phim", b: "to film" },
            { a: "đạo diễn", b: "director" },
            { a: "kịch bản", b: "script" },
            { a: "lời thoại", b: "lines" },
            { a: "phụ đề", b: "subtitles" },
            { a: "khẩu hiệu", b: "slogan" },
            { a: "hậu trường", b: "behind the scenes" },
            { a: "cảnh", b: "scene" },
            { a: "máy quay", b: "camera" },
            { a: "Diễn!", b: "Action!" },
            { a: "Cắt!", b: "Cut!" },
          ] },

        { type: "writing", id: "group-script", strand: "output", mins: 15,
          title: { vi: "Kịch bản của nhóm (80–110 từ)", en: "Your group’s script (80–110 words)" },
          prompt: { vi: "Viết (hoặc dán) kịch bản của nhóm. Viết vai trước mỗi câu, ví dụ “A (MC): …”. Đánh dấu câu thoại của bạn bằng ⭐. Chưa có con số khảo sát? Viết ___. Đừng viết dài hơn 110 từ — 110 từ là khoảng 60 giây nói chậm và rõ. Viết xong trên lớp; có thể sửa ở nhà trước thứ Sáu.", en: "Write (or paste) your group’s script, role before each line; mark your own lines with ⭐; use ___ for the class-survey number if you don’t have it yet. Max 110 words ≈ 60 seconds of slow, clear speech. Finish it in class today; you may polish it at home before Friday. Every member submits the same script." },
          minWords: 80,
          checklist: [
            { vi: "Câu mở đầu “Chào các bạn Gen Z!”", en: "opens with “Chào các bạn Gen Z!”" },
            { vi: "1 con số: khảo sát của lớp hôm nay hoặc bài nghe Lộc & Mai (3.660 bước / 10.000 bước / 30% / 35%)", en: "one number: the class survey or the Lộc & Mai listening" },
            { vi: "Áp lực trên thẻ Áp lực", en: "the pressure on your Pressure card" },
            { vi: "Ít nhất 1 câu nếu… thì / khi… thì", en: "at least one nếu… thì / khi… thì sentence" },
            { vi: "Cấu trúc trên thẻ Ngữ pháp", en: "the pattern on your Grammar card" },
            { vi: "1 lời khuyên cụ thể ở UNC (nơi, thời gian, hoạt động có thật)", en: "one specific UNC tip: a real place, time and activity on campus" },
            { vi: "Vật / cảnh trên thẻ Thiên nhiên — trong video và lời thoại", en: "your Nature card, in the video and in the lines" },
            { vi: "Khẩu hiệu tự sáng tác ở cuối", en: "your own slogan at the end" },
          ] },
      ],
    },

    /* ═══════════════ QUAY Ở COKER ═══════════════ */
    {
      id: "film", icon: "3️⃣", label: "Quay ở Coker",
      intro: { vi: "Bước 2 · Hôm nay, thứ Tư 28/10 · đi bộ đến vườn Coker, quay 10 phút, tối đa 3 lần.", en: "Step 2 · Today, Wednesday, October 28 · walk to Coker Arboretum, ten minutes of filming, three takes at most." },
      blocks: [
        { type: "html", title: { vi: "Quy tắc quay phim", en: "Filming rules" }, strand: "output", mins: 2, html: `
          <ol>
            <li>📱 <strong>Quay ngang</strong> (landscape), không quay dọc — trừ nhóm có thẻ Kênh “Vlog TikTok”. ${btn("Quay ngang, không quay dọc, trừ nhóm có thẻ Kênh Vlog TikTok.")}</li>
            <li>🔊 Đứng <strong>gần điện thoại</strong> (1–2 mét), quay lưng về phía gió, tránh chỗ đông người ở lối vào đường Cameron. ${btn("Đứng gần điện thoại, một đến hai mét, quay lưng về phía gió, tránh chỗ đông người ở lối vào đường Cameron.")}</li>
            <li>🙅 <strong>Không quay rõ mặt người lạ.</strong> Chỉ quay thành viên trong lớp. ${btn("Không quay rõ mặt người lạ. Chỉ quay thành viên trong lớp.")}</li>
            <li>🎬 <strong>Tối đa 3 lần quay</strong> (3 takes), chọn lần tốt nhất. Lần quay “hỏng” giữ lại: có thể dùng cho phần <strong>“Hậu trường”</strong> (bloopers)! ${btn("Tối đa ba lần quay, chọn lần tốt nhất. Lần quay hỏng giữ lại: có thể dùng cho phần hậu trường!")}</li>
            <li>⏱️ Hết <strong>10 phút</strong>, video phải nằm trong điện thoại của đạo diễn. ${btn("Hết mười phút, video phải nằm trong điện thoại của đạo diễn.")}</li>
          </ol>
          <p><strong>Thử thách bí mật 🤫:</strong> Trong video, có một người phải <strong>đang vận động</strong>: đi bộ, giãn cơ, bước lên bậc thang… Không ai được <strong>ngồi</strong> cả! (Ngồi = trừ 1 điểm sáng tạo 😄) ${btn("Thử thách bí mật: Trong video, có một người phải đang vận động: đi bộ, giãn cơ, bước lên bậc thang. Không ai được ngồi cả!")}</p>
          <p><small>Nhìn vào máy quay. Bạn có thể giữ vài từ khóa trên thẻ nhỏ, nhưng <strong>đừng đọc kịch bản</strong>. <span class="en">Short key words on a card are fine — don’t read the script word for word.</span></small></p>` },

        { type: "record", id: "voice-warmup", strand: "fluency", mins: 3,
          title: { vi: "Khởi động giọng · Nói theo mẫu", en: "Voice warm-up: shadow the model" },
          instr: { vi: "Nghe 🔊, rồi nói theo và ghi âm — to, rõ, có năng lượng như MC. Làm trên đường đi đến vườn Coker!", en: "Listen, then repeat and record — loud, clear and energetic like an MC. Do it on the walk to Coker!" },
          prompts: [
            { vi: "Chào các bạn Gen Z!", en: "Hi, Gen Z!" },
            { vi: "Đây là bản tin “Cuộc Sống Năng Động”, trực tiếp từ vườn Coker, Đại học UNC.", en: "This is the Active Life news, live from Coker Arboretum, UNC." },
            { vi: "Bạn có biết hôm qua bạn đã ngồi bao nhiêu tiếng không?", en: "Do you know how many hours you sat yesterday?", ask: false },
            { vi: "Thay vì ngồi lướt điện thoại, hãy thử đi bộ quanh vườn.", en: "Instead of scrolling, try a walk around the garden." },
            { vi: "Còn chờ gì nữa? Đứng dậy đi, Gen Z!", en: "What are you waiting for? Get up, Gen Z!", ask: false },
            { vi: "Mỗi ngày một bước, sức khỏe đi trước!", en: "One step a day, health leads the way!" },
          ] },

        { type: "html", title: { vi: "10 phút ở vườn Coker", en: "Your ten minutes, minute by minute" }, strand: "output", mins: 1, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>🚶 Trên đường đi</th><td>Vừa đi vừa tập thoại — nói to, không nhìn kịch bản. (Đi bộ = vận động! 😄)</td></tr>
            <tr><th>Phút 0</th><td>Tìm chỗ có vật / cảnh trên thẻ Thiên nhiên. Đạo diễn thử âm thanh: mỗi người nói một câu.</td></tr>
            <tr><th>Phút 2</th><td>🎬 Lần quay 1. <em>“Diễn!” … “Cắt!”</em> Xem lại nhanh: nghe rõ không?</td></tr>
            <tr><th>Phút 5</th><td>🎬 Lần quay 2. Biên tập viên nhắc lỗi của lần 1.</td></tr>
            <tr><th>Phút 8</th><td>🎬 Lần quay 3 (nếu cần).</td></tr>
            <tr><th>Phút 10</th><td>✅ Video trong điện thoại của đạo diễn. Tập trung với cả lớp, tổng kết và đếm bước.</td></tr>
          </table></div>
          <p><small>☔ Trời mưa? Quay trong lớp hoặc hành lang; thẻ Thiên nhiên đổi thành <em>cửa sổ / cầu thang / hành lang</em>. Vẫn không ai được ngồi!</small></p>` },

        { type: "tf", id: "rules-check", strand: "language", mins: 2,
          title: { vi: "Đúng hay sai?", en: "True or false?" },
          items: [
            { q: "Nhóm có thẻ “Bản Tin Thời Sự” được quay dọc.", en: "The News Report group may film vertically.", ans: false, why: "Chỉ nhóm “Vlog TikTok” được quay dọc." },
            { q: "Có thể quay rõ mặt người đi dạo trong vườn.", en: "You may film passers-by’s faces.", ans: false, why: "Không quay rõ mặt người lạ — chỉ quay thành viên trong lớp." },
            { q: "Mỗi nhóm quay tối đa ba lần.", en: "Each group films three takes at most.", ans: true },
            { q: "Trong video, một người phải đang vận động.", en: "Someone in the video must be moving.", ans: true },
            { q: "Nhóm có thẻ “Ghế đá” có thể ngồi trên ghế đá khi quay.", en: "The Bench group may sit on the bench.", ans: false, why: "Không ai được ngồi! Ngồi = trừ 1 điểm sáng tạo." },
            { q: "Lần quay hỏng có thể dùng cho phần hậu trường.", en: "A failed take can go in the bloopers.", ans: true },
          ] },

        { type: "record", id: "my-lines", strand: "fluency", mins: 5,
          title: { vi: "Tập câu thoại trước khi quay", en: "Rehearse before you film" },
          instr: { vi: "Tập đọc to, rồi ghi âm. Bạn có thể ghi lại nhiều lần — báo cáo giữ lần cuối.", en: "Practise aloud, then record. Re-record as often as you like — the report keeps the last take." },
          prompts: [
            { vi: "Tất cả câu thoại của tôi, theo thứ tự", en: "All my lines, in order (up to 1 minute)", model: false, maxSec: 60 },
            { vi: "Cả kịch bản, bấm giờ: 45–60 giây", en: "The whole script, timed: aim for 45–60 seconds — one member records the group read-through; others may skip this", model: false, maxSec: 90 },
          ] },
      ],
    },

    /* ═══════════════ HẬU KỲ ═══════════════ */
    {
      id: "post", icon: "4️⃣", label: "Hậu kỳ",
      intro: { vi: "Bước 3 · Phụ đề, tiêu đề, hashtag — rồi nộp trước buổi học thứ Sáu 30/10.", en: "Step 3 · Subtitles, a title and hashtags — then submit before Friday’s class, October 30 (exact time on Canvas)." },
      blocks: [
        { type: "html", title: { vi: "Hậu kỳ", en: "Post-production" }, strand: "output", mins: 2, html: `
          <ol>
            <li><strong>Phụ đề tiếng Việt</strong> (Vietnamese subtitles), viết <strong>có dấu, đúng chính tả</strong>. Dùng CapCut, iMovie, Clipchamp hoặc ứng dụng bạn thích. Phụ đề là phần <strong>viết</strong> của bài: biên tập viên ngôn ngữ kiểm tra lần cuối.</li>
            <li><strong>Tiêu đề</strong> + <strong>3 hashtag tiếng Việt</strong>, ví dụ: <code>#VậnĐộngNhiềuNgồiÍt #GenZNăngĐộng #ĐiBộVớiCoker</code></li>
            <li><em>(Tùy chọn · Optional)</em> <strong>10 giây hậu trường</strong> ở cuối video.</li>
            <li>Nộp lên <strong>Padlet / Canvas</strong> <strong>trước buổi học thứ Sáu 30/10</strong> (link và giờ trên Canvas). Video <strong>chỉ chia sẻ trong lớp</strong>, không đăng lên mạng xã hội công khai nếu cả nhóm chưa đồng ý.</li>
          </ol>` },

        { type: "type", id: "subtitles", strand: "language", mins: 5,
          title: { vi: "Sửa phụ đề: thêm dấu", en: "Fix the subtitles: add the tone marks" },
          instr: { vi: "Ứng dụng phụ đề tự động quên hết dấu! Nghe 🔊, rồi viết lại câu cho đúng chính tả.", en: "The auto-caption app dropped every diacritic. Listen, then retype each line correctly — use the letter buttons for ă, ơ, đ and the tone marks." },
          items: [
            { prompt: "Chao cac ban Gen Z!", say: "Chào các bạn Gen Z!", answers: ["Chào các bạn Gen Z!"] },
            { prompt: "Ngoi it, di nhieu, Gen Z khoe nhieu!", say: "Ngồi ít, đi nhiều, Gen Z khỏe nhiều!", answers: ["Ngồi ít, đi nhiều, Gen Z khỏe nhiều!"] },
            { prompt: "Hay di bo qua vuon Coker giua hai gio hoc.", say: "Hãy đi bộ qua vườn Coker giữa hai giờ học.", answers: ["Hãy đi bộ qua vườn Coker giữa hai giờ học."] },
            { prompt: "Neu ban ngoi qua lau thi dau oc se met moi.", say: "Nếu bạn ngồi quá lâu thì đầu óc sẽ mệt mỏi.", answers: ["Nếu bạn ngồi quá lâu thì đầu óc sẽ mệt mỏi."] },
            { prompt: "Ket qua la ban se ngu ngon hon.", say: "Kết quả là bạn sẽ ngủ ngon hơn.", answers: ["Kết quả là bạn sẽ ngủ ngon hơn."] },
          ] },

        { type: "writing", id: "title-tags", strand: "output", mins: 4,
          title: { vi: "Tiêu đề, hashtag và phụ đề", en: "Title, hashtags and subtitles" },
          prompt: { vi: "Viết tiêu đề video, 3 hashtag tiếng Việt, rồi dán phụ đề của nhóm (đã kiểm tra dấu).", en: "Write your video title and three Vietnamese hashtags, then paste your group’s checked subtitles." },
          minWords: 20,
          checklist: [
            { vi: "Tiêu đề", en: "a title" },
            { vi: "3 hashtag tiếng Việt", en: "three Vietnamese hashtags" },
            { vi: "Phụ đề có dấu, đúng chính tả", en: "subtitles with every diacritic, spelled correctly" },
            { vi: "Video đã nộp lên Padlet / Canvas", en: "the video is uploaded to Padlet / Canvas" },
          ] },
      ],
    },

    /* ═══════════════ LIÊN HOAN PHIM ═══════════════ */
    {
      id: "fest", icon: "5️⃣", label: "Liên hoan phim",
      intro: { vi: "Bước 4 · Liên Hoan Phim Năng Động 🏆 · thứ Sáu 30/10 — xem, hỏi, bình chọn, rồi Thử Thách 24 Giờ (báo cáo thứ Hai 2/11).", en: "Step 4 · The Active Life Film Festival, Friday, October 30 — watch, ask, vote, then the 24-hour challenge (report on Monday, November 2)." },
      blocks: [
        { type: "writing", id: "viewing-sheet", strand: "input", mins: 10,
          title: { vi: "Phiếu xem phim", en: "Viewing sheet" },
          prompt: { vi: "Trong khi xem video của các nhóm khác, ghi lại cho mỗi nhóm: Kênh · Áp lực · Lời khuyên chính · Khẩu hiệu · 1 câu hỏi cho nhóm. Ví dụ: “Nhóm 2 — Kênh: Quảng Cáo · Áp lực: mạng xã hội · Lời khuyên: … · Khẩu hiệu: … · Câu hỏi: …”", en: "While you watch the other groups’ videos, note for each group: channel · pressure · main advice · slogan · one question for the group." },
          minWords: 40,
          checklist: [
            { vi: "Mỗi nhóm khác: kênh và áp lực", en: "every other group: channel and pressure" },
            { vi: "Lời khuyên chính và khẩu hiệu", en: "main advice and slogan" },
            { vi: "1 câu hỏi cho mỗi nhóm", en: "one question for each group" },
          ] },

        { type: "html", title: { vi: "Hỏi phóng viên", en: "Press conference (1 minute per group)" }, strand: "output", mins: 2, html: `
          <p>Sau mỗi video, khán giả hỏi nhóm 1–2 câu từ cột cuối của phiếu. Ví dụ:</p>
          <div class="transcript" lang="vi">
            ${line("Khán giả", "Tại sao nhóm bạn chọn lời khuyên này?")}
            ${line("Khán giả", "Nhóm bạn có thật sự đi bộ qua Coker giữa giờ học không?")}
            ${line("Khán giả", "Nếu trời mưa thì sinh viên nên vận động ở đâu?")}
            ${line("Khán giả", "Khẩu hiệu của nhóm có ý nghĩa gì?")}
          </div>` },

        { type: "record", id: "press-answers", strand: "output", mins: 4,
          title: { vi: "Tập trả lời phóng viên", en: "Practise answering the press" },
          instr: { vi: "Nghe câu hỏi 🔊, rồi trả lời cho nhóm của bạn (1–2 câu). Thứ Sáu khán giả sẽ hỏi những câu như thế này.", en: "Hear each question, then answer for your group in 1–2 sentences — on Friday the audience will ask questions like these." },
          prompts: [
            { vi: "Tại sao nhóm bạn chọn lời khuyên này?", en: "Why did your group choose this tip?", model: false, maxSec: 45 },
            { vi: "Nhóm bạn có thật sự đi bộ qua Coker giữa giờ học không?", en: "Does your group really walk through Coker between classes?", model: false, maxSec: 45 },
            { vi: "Nếu trời mưa thì sinh viên nên vận động ở đâu?", en: "If it rains, where should students move?", model: false, maxSec: 45 },
            { vi: "Khẩu hiệu của nhóm có ý nghĩa gì?", en: "What does your group’s slogan mean?", model: false, maxSec: 45 },
            { vi: "Quay phim ở vườn Coker có khó không?", en: "Was filming at Coker hard?", model: false, maxSec: 45 },
          ] },

        { type: "html", title: { vi: "Bình chọn giải thưởng", en: "Vote for the awards" }, strand: "output", mins: 3, html: `
          <p>Mỗi bạn bỏ phiếu (<strong>không bầu cho nhóm của mình</strong>). Các giải dựa trên tiêu chí bình chọn của chuyên mục “Cuộc Sống Năng Động” ở T3.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Giải · Award</th><th>Tiêu chí T3 · Criterion</th></tr>
            <tr><td>🥇 <strong>Lời Khuyên Thiết Thực Nhất</strong> ${btn("Lời Khuyên Thiết Thực Nhất")}</td><td>Lời khuyên dễ thực hiện, có thể làm ngay hôm nay (tiêu chí 4)</td></tr>
            <tr><td>📲 <strong>Video “Viral” Nhất</strong> ${btn("Video Viral Nhất")}</td><td>Muốn chia sẻ ngay trên mạng xã hội (tiêu chí 5)</td></tr>
            <tr><td>💪 <strong>Truyền Cảm Hứng Nhất</strong> ${btn("Truyền Cảm Hứng Nhất")}</td><td>Xem xong muốn đứng dậy đi bộ (tiêu chí 6)</td></tr>
            <tr><td>📣 <strong>Khẩu Hiệu Hay Nhất</strong> ${btn("Khẩu Hiệu Hay Nhất")}</td><td>Ngắn, dễ nhớ, có vần càng tốt</td></tr>
            <tr><td>🗣️ <strong>Phát Âm Rõ Nhất</strong> ${btn("Phát Âm Rõ Nhất")}</td><td>Thanh điệu rõ, dễ nghe</td></tr>
            <tr><td>🎭 <strong>Hậu Trường Vui Nhất</strong> ${btn("Hậu Trường Vui Nhất")}</td><td><em>(nếu có)</em></td></tr>
          </table></div>
          <p><strong>Lễ trao giải:</strong> nhóm thắng giải nhận… một <strong>“huy chương”</strong> và quyền chọn <strong>động tác giãn cơ</strong> cho cả lớp làm trong 1 phút (nói bằng tiếng Việt, tất nhiên!).</p>` },

        { type: "html", title: { vi: "Thử Thách 24 Giờ · Ví dụ", en: "24-hour challenge: an example report" }, strand: "input", mins: 2, html: `
          <p>Chọn <strong>một lời khuyên từ video của nhóm khác</strong> và thử làm trong 24 giờ (thứ Sáu → thứ Bảy). Thứ Hai 2/11, báo cáo 2–3 câu. Nghe ví dụ:</p>
          <div class="transcript" lang="vi">
            ${line("Lan", "Mình đã thử lời khuyên của nhóm hai: đi bộ mười lăm phút sau bữa trưa.")}
            ${line("Lan", "Kết quả là buổi chiều mình học tập một cách hiệu quả hơn.")}
            ${line("Lan", "Mặc dù trời hơi lạnh nhưng mình thấy rất vui.")}
            ${line("Lan", "Mình sẽ tiếp tục vì đi bộ giúp mình bớt căng thẳng.")}
          </div>
          <p><small>Khung câu · Frame: <em>Mình đã thử lời khuyên của nhóm ___: ___. Kết quả là ___. Mặc dù ___ nhưng ___. Mình sẽ / sẽ không tiếp tục vì ___.</em></small></p>` },

        { type: "writing", id: "challenge-24h", strand: "output", mins: 5,
          title: { vi: "🔥 Thử Thách 24 Giờ", en: "The 24-hour challenge" },
          prompt: { vi: "Chọn một lời khuyên từ video của nhóm khác và thử làm trong 24 giờ. Rồi viết 2–3 câu: “Mình đã thử lời khuyên của nhóm ___: ___. Kết quả là ___. Mặc dù ___ nhưng ___. Mình sẽ / sẽ không tiếp tục vì ___.”", en: "Pick one tip from another group’s video and try it for 24 hours, then write 2–3 sentences with the frame. You report it aloud as the warm-up on Monday, November 2 — and you can quote it, with the class survey, as a real example in your T3 column draft." },
          minWords: 25,
          checklist: [
            { vi: "Lời khuyên của nhóm nào?", en: "whose tip you tried" },
            { vi: "kết quả là …", en: "kết quả là …" },
            { vi: "mặc dù … nhưng …", en: "mặc dù … nhưng …" },
            { vi: "Mình sẽ / sẽ không tiếp tục vì …", en: "whether you’ll keep doing it, and why" },
          ] },

        { type: "record", id: "challenge-say", strand: "fluency", mins: 2,
          title: { vi: "Báo cáo Thử Thách 24 Giờ", en: "Say your 24-hour challenge report" },
          instr: { vi: "Nói 2–3 câu, không đọc. Đây là phần khởi động của buổi học thứ Hai 2/11.", en: "Say your 2–3 sentences without reading — practice for Monday’s warm-up (November 2)." },
          prompts: [
            { vi: "Mình đã thử lời khuyên của nhóm …", en: "My 24-hour challenge (up to 1 minute)", model: false, maxSec: 60 },
          ] },
      ],
    },

    /* ═══════════════ CHẤM ĐIỂM ═══════════════ */
    {
      id: "rubric", icon: "⭐", label: "Chấm điểm",
      intro: { vi: "Đọc tiêu chí trước khi viết — rồi tự chấm nhóm bạn sau khi quay.", en: "Read the criteria before you write — then rate your group after filming." },
      blocks: [
        { type: "html", title: { vi: "Tiêu chí chấm điểm (10 điểm, chấm theo nhóm)", en: "How the video is graded (10 points, group grade)" }, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Tiêu chí · Criterion</th><th>Điểm</th></tr>
            <tr><td>Kịch bản có đủ 8 mục trong danh sách kiểm tra · <small>all 8 script checklist items</small></td><td><strong>4</strong></td></tr>
            <tr><td>Phụ đề có dấu, đúng chính tả · <small>subtitles with diacritics, spelled correctly</small></td><td><strong>2</strong></td></tr>
            <tr><td>Mọi thành viên đều nói · <small>every member speaks</small></td><td><strong>2</strong></td></tr>
            <tr><td>Thời lượng 45–60 giây, nộp đúng hạn · <small>45–60 seconds, on time</small></td><td><strong>1</strong></td></tr>
            <tr><td>Phiếu xem phim cá nhân · <small>your own viewing sheet</small></td><td><strong>1</strong></td></tr>
          </table></div>
          <p><small>Clip này là <strong>bản tập</strong> cho Hoạt động 9 (video cá nhân 3–5 phút), không thay thế Hoạt động 9. Giáo viên chấm video; phần tự chấm dưới đây vào báo cáo của bạn và không tính điểm.</small></p>` },

        { type: "rubric", id: "self-rubric", strand: "output", mins: 3,
          title: { vi: "Tự chấm nhóm bạn", en: "Rate your group’s video" },
          task: { vi: "Sau khi quay (hoặc sau Liên Hoan Phim), chọn một mức cho mỗi tiêu chí.", en: "After filming (or after the festival), pick a level for each criterion." },
          criteria: [
            { vi: "Kịch bản & 4 thẻ", en: "Script & the four cards", desc: ["Several checklist items or cards missing", "Most items, all four cards", "All 8 items, cards used naturally"] },
            { vi: "Lời khuyên & khán giả", en: "Advice & audience", desc: ["Vague advice", "Clear advice for Gen Z", "Specific UNC tip — viewers want to get up and walk"] },
            { vi: "Phát âm & nói trước máy quay", en: "Pronunciation & on camera", desc: ["Hard to hear / read the script", "Understandable, some tone errors", "Clear tones, looks at the camera, not read"] },
            { vi: "Phụ đề & chính tả", en: "Subtitles & spelling", desc: ["Many missing diacritics", "A few errors", "Every diacritic right"] },
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
