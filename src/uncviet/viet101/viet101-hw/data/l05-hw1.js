/* VIET 101 (UNC Viet) — Bài 5 homework 1 of 3 (Monday): Thứ, ngày, tháng · Days, dates, months
   Goes with Ngô Như Bình, Elementary Vietnamese (EV-NNB), Lesson 5. ≈ 50 minutes at home.
   All sentences, drills and the story are original (Huy Phung); no textbook text or audio is reproduced.
   Story world for the three Bài 5 homeworks: Emma (first-year, VIET 101), her friend Minh (from Hà Nội,
   birthday Sat 31/10/2026, turning 21), Minh’s older sister chị Linh (works in Raleigh).
   Calendar: October 2026 (weekdays checked) — if the course runs in another year, change the dates.
   Engine: ../assets/bv.js (standalone copy of the VIET 100 engine). */
(function () {

const OCT = `
  <div class="table-scroll"><table class="culture-table" style="text-align:center">
    <tr><th colspan="7" style="text-align:center">THÁNG MƯỜI · 2026</th></tr>
    <tr><th>T2</th><th>T3</th><th>T4</th><th>T5</th><th>T6</th><th>T7</th><th>CN</th></tr>
    <tr><td></td><td></td><td></td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
    <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td></tr>
    <tr><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td></tr>
    <tr><td>19</td><td><strong>20</strong><br><small>🌸 Ngày Phụ nữ Việt Nam</small></td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td></tr>
    <tr><td><strong>26</strong><br><small>📍 Hôm nay</small></td><td>27</td><td>28</td><td>29</td><td>30</td><td><strong>31</strong><br><small>🎂 Sinh nhật Minh · 🎃 Halloween</small></td><td></td></tr>
  </table></div>
  <p><small>T2 = thứ hai … T7 = thứ bảy · CN = chủ nhật</small></p>`;

window.BV_CHAPTER = {
  id: 5,
  titleVi: "Bài tập thứ Hai · Thứ, ngày, tháng",
  titleEn: "Monday homework: days, dates and months",
  description: "VIET 101, Lesson 5 homework 1: days of the week, dates and months — vocabulary, grammar, spelling, speaking and a short story. About 50 minutes.",
  color: "#0f766e",
  badge: { icon: "🗓️", name: "Xem lịch · Calendar reader" },

  cando: [
    { vi: "Tôi có thể nói bảy ngày trong tuần và mười hai tháng.", en: "I can say the seven days of the week and the twelve months." },
    { vi: "Tôi có thể hỏi và trả lời “Hôm nay là thứ mấy, ngày bao nhiêu?”.", en: "I can ask and answer “What day and date is it today?”" },
    { vi: "Tôi có thể đọc một tờ lịch và nói ngày tháng theo thứ tự ngày → tháng → năm.", en: "I can read a calendar and say dates in day → month → year order." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Bài tập về nhà 1/3 · Bài 5 · khoảng 50 phút.", en: "Homework 1 of 3 · Lesson 5 · about 50 minutes." },
      blocks: [
        { type: "html", title: { vi: "Hôm nay bạn làm gì?", en: "Today’s plan" }, html: `
          <p>Work through the tabs in order. Each card shows its time (⏱). You can stop and come back — your progress is saved in this browser.</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Bạn sẽ làm · What you do</th><th>⏱</th></tr>
            <tr><td>1️⃣ Từ vựng</td><td>Days of the week, calendar words</td><td>11′</td></tr>
            <tr><td>2️⃣ Ngữ pháp</td><td>Dates in Vietnamese order · read a real calendar</td><td>14′</td></tr>
            <tr><td>3️⃣ Chính tả</td><td>Tone marks in calendar words · dictation</td><td>8′</td></tr>
            <tr><td>4️⃣ Nói</td><td>Say today’s date and your birthday</td><td>7′</td></tr>
            <tr><td>5️⃣ Đọc</td><td>Story: <em>Tuần của Emma</em></td><td>8′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Rate yourself · type your name · download the report (it includes your recordings) and upload it to Canvas with the completion code</td><td>3′</td></tr>
          </table></div>
          <p><strong>Your book:</strong> this homework goes with <em>Elementary Vietnamese</em> (Ngô Như Bình), <strong>Lesson 5</strong>. If you have time, re-read the Lesson 5 dialogues and the grammar notes on days, months and dates first.</p>
          <p><small>Tip: tap <strong>EN</strong> in the blue header to hide English and test yourself · 🐢 slows the voice down. No Vietnamese keyboard? Dictation boxes accept <strong>Telex</strong> (e.g. <em>thuws tuw</em> → thứ tư).</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },
      ],
    },

    /* ═══════════════ TỪ VỰNG ═══════════════ */
    {
      id: "vocab", icon: "1️⃣", label: "Từ vựng",
      intro: { vi: "Học bảy ngày trong tuần và các từ về lịch.", en: "Learn the days of the week and calendar words." },
      blocks: [
        { type: "flashcards", id: "cards-days", strand: "language", mins: 8,
          title: { vi: "Thẻ từ · Thứ trong tuần", en: "Flashcards: the week" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "thứ hai", en: "Monday", ex: "Hôm nay là thứ hai.", exEn: "Today is Monday." },
            { vi: "thứ ba", en: "Tuesday", ex: "Thứ ba Emma học toán.", exEn: "Emma has math on Tuesday." },
            { vi: "thứ tư", en: "Wednesday", ex: "thứ tư — không phải “thứ bốn”", exEn: "thứ tư, never “thứ bốn”" },
            { vi: "thứ năm", en: "Thursday", ex: "Thứ năm mình bận.", exEn: "I’m busy on Thursday." },
            { vi: "thứ sáu", en: "Friday", ex: "Thứ sáu có lớp tiếng Việt.", exEn: "There’s Vietnamese class on Friday." },
            { vi: "thứ bảy", en: "Saturday", ex: "Thứ bảy là sinh nhật Minh.", exEn: "Saturday is Minh’s birthday." },
            { vi: "chủ nhật", en: "Sunday", ex: "Chủ nhật Emma nghỉ.", exEn: "Emma rests on Sunday." },
            { vi: "hôm nay", en: "today", ex: "Hôm nay là thứ mấy?", exEn: "What day is it today?" },
            { vi: "ngày", en: "day; date", ex: "ngày hai mươi sáu", exEn: "the 26th" },
            { vi: "tuần", en: "week", ex: "tuần này", exEn: "this week" },
            { vi: "tháng", en: "month", ex: "tháng mười", exEn: "October" },
            { vi: "năm", en: "year (also: five)", ex: "năm nay", exEn: "this year" },
          ] },

        { type: "match", id: "match-cal", strand: "language", mins: 3,
          title: { vi: "Ghép · Lịch viết tắt", en: "Match: calendar abbreviations" },
          instr: { vi: "Lịch Việt Nam viết tắt các ngày. Ghép chữ viết tắt với tên ngày.", en: "Vietnamese calendars abbreviate the days. Match each one to its name." },
          pairs: [
            { a: "T2", b: "thứ hai" },
            { a: "T3", b: "thứ ba" },
            { a: "T4", b: "thứ tư" },
            { a: "T5", b: "thứ năm" },
            { a: "T6", b: "thứ sáu" },
            { a: "T7", b: "thứ bảy" },
            { a: "CN", b: "chủ nhật" },
          ] },
      ],
    },

    /* ═══════════════ NGỮ PHÁP ═══════════════ */
    {
      id: "grammar", icon: "2️⃣", label: "Ngữ pháp",
      intro: { vi: "Người Việt nói ngày tháng thế nào? Xem ví dụ trước, rồi tìm quy luật.", en: "How do you say a date in Vietnamese? Examples first, then the rule." },
      blocks: [
        { type: "notice", id: "notice-date", strand: "language", mins: 4,
          title: { vi: "Khám phá · Ngày, tháng, năm", en: "Discover: day, month, year" },
          examples: [
            { vi: "Hôm nay là thứ hai, <strong>ngày hai mươi sáu tháng mười</strong>.", en: "Today is Monday, October 26." },
            { vi: "Sinh nhật Minh là <strong>ngày ba mươi mốt tháng mười</strong>.", en: "Minh’s birthday is October 31." },
            { vi: "Tết năm sau là <strong>ngày mồng sáu tháng hai</strong>.", en: "Next year’s Tết is February 6." },
            { vi: "Emma sinh <strong>ngày mười hai tháng tư năm 2007</strong>.", en: "Emma was born on April 12, 2007. (Big numbers like 2007 come on Wednesday!)" },
          ],
          q: "Người Việt nói ngày tháng theo thứ tự nào?", qEn: "In what order does Vietnamese say a date?",
          opts: ["ngày → tháng → năm", "tháng → ngày → năm"], correct: "ngày → tháng → năm",
          why: { "tháng → ngày → năm": "That’s the US order. Look again: ngày ba mươi mốt comes before tháng mười." },
          explain: "Day first, then month, then year — and you write it 26/10/2026.",
          reveal: `
            <ul>
              <li><strong>ngày</strong> + number + <strong>tháng</strong> + number (+ <strong>năm</strong> + year): <em>ngày hai mươi sáu tháng mười năm 2026</em> → written <strong>26/10/2026</strong>. So <em>03/04</em> on a Vietnamese form is 3 April! <button class="tts" data-say="ngày hai mươi sáu tháng mười">🔊</button></li>
              <li>For the 1st–10th, people often add <strong>mồng</strong> (North) or <strong>mùng</strong> (South): <em>ngày mồng một</em>, <em>mùng mười</em>. <button class="tts" data-say="mồng một, mồng hai, mồng mười">🔊</button></li>
              <li><strong>Months</strong> are just <em>tháng</em> + number: tháng một, tháng hai … tháng mười hai. Say <strong>tháng tư</strong> for April (not “tháng bốn”). <em>Tháng giêng</em> (1st month) and <em>tháng chạp</em> (12th month) are mostly used for the lunar calendar.</li>
              <li><strong>Weekdays</strong> count from Sunday, so Monday is <em>thứ hai</em> (“the second”). There’s no “thứ một”, and Wednesday is <strong>thứ tư</strong>.</li>
              <li><strong>Questions:</strong> <em>Hôm nay là <strong>thứ mấy</strong>?</em> (which weekday?) · <em>Hôm nay là <strong>ngày bao nhiêu</strong>?</em> or <em>ngày mấy?</em> (what date?) · <em>Sinh nhật bạn là <strong>ngày nào</strong>?</em> (which date?) · <em>Bây giờ là <strong>tháng mấy</strong>?</em> <button class="tts" data-say="Hôm nay là thứ mấy? Hôm nay là ngày bao nhiêu? Sinh nhật bạn là ngày nào?">🔊</button></li>
            </ul>` },

        { type: "html", title: { vi: "Lịch tháng mười", en: "The October calendar" }, strand: "input", mins: 1, html: OCT },

        { type: "mc", id: "cal", strand: "input", mins: 5,
          title: { vi: "Xem lịch", en: "Read the calendar" },
          instr: { vi: "Dùng lịch ở trên.", en: "Use the calendar above." },
          items: [
            { q: "Ngày hai mươi tháng mười là thứ mấy?", opts: ["thứ ba", "thứ hai", "thứ tư"], correct: "thứ ba" },
            { q: "Sinh nhật Minh là ngày nào?", opts: ["thứ bảy, ngày ba mươi mốt tháng mười", "chủ nhật, ngày ba mươi mốt tháng mười", "thứ bảy, ngày mười ba tháng mười"], correct: "thứ bảy, ngày ba mươi mốt tháng mười",
              why: { "thứ bảy, ngày mười ba tháng mười": "Mười ba is 13 — Minh’s birthday is 31: ba mươi mốt." } },
            { q: "Hôm nay là thứ hai, ngày hai mươi sáu. Thứ sáu này là ngày bao nhiêu?", opts: ["ngày ba mươi", "ngày hai mươi chín", "ngày ba mươi mốt"], correct: "ngày ba mươi" },
            { q: "Ngày mồng một tháng mười là thứ mấy?", opts: ["thứ năm", "thứ tư", "chủ nhật"], correct: "thứ năm" },
            { q: "Ở Việt Nam, ngày 20/10 là ngày gì?", opts: ["Ngày Phụ nữ Việt Nam", "Tết", "Halloween"], correct: "Ngày Phụ nữ Việt Nam",
              explain: "Vietnamese Women’s Day — people give flowers to their mothers, teachers and friends." },
          ] },

        { type: "type", id: "date-words", strand: "language", mins: 4,
          title: { vi: "Viết ngày tháng bằng chữ", en: "Write the date in words" },
          instr: { vi: "Viết bằng chữ, không dùng số. Nhớ: ngày trước, tháng sau.", en: "Words, not digits. Remember: day first, then month." },
          items: [
            { prompt: "26/10", words: true, answers: ["ngày hai mươi sáu tháng mười", "hai mươi sáu tháng mười"] },
            { prompt: "12/4 (April 12)", words: true, answers: ["ngày mười hai tháng tư", "mười hai tháng tư"], hint: "April = tháng tư." },
            { prompt: "4/7 (July 4)", words: true, answers: ["ngày mồng bốn tháng bảy", "ngày mùng bốn tháng bảy", "ngày bốn tháng bảy", "mồng bốn tháng bảy", "mùng bốn tháng bảy", "bốn tháng bảy"] },
          ] },
      ],
    },

    /* ═══════════════ CHÍNH TẢ ═══════════════ */
    {
      id: "spelling", icon: "3️⃣", label: "Chính tả",
      intro: { vi: "Dấu thanh thay đổi nghĩa! Nghe kỹ và viết đúng dấu.", en: "Tone marks change the meaning! Listen closely and spell with the right marks." },
      blocks: [
        { type: "mc", id: "tone-pick", strand: "language", mins: 3,
          title: { vi: "Nghe và chọn", en: "Listen and choose the spelling" },
          instr: { vi: "Bấm 🔊, rồi chọn cách viết đúng.", en: "Tap 🔊, then pick the correct spelling." },
          items: [
            { say: "thứ tư", q: "", opts: ["thứ tư", "thư tư", "thứ từ"], correct: "thứ tư", explain: "thứ has a sắc tone (rising) — thư (no mark) means “letter”." },
            { say: "tháng", q: "", opts: ["tháng", "thang", "thàng"], correct: "tháng", explain: "tháng (sắc) = month · thang (no mark) = ladder." },
            { say: "ngày", q: "", opts: ["ngày", "ngáy", "ngay"], correct: "ngày", explain: "ngày (huyền, falling) = day · ngay = right away · ngáy = to snore!" },
            { say: "chủ nhật", q: "", opts: ["chủ nhật", "chú nhật", "chủ nhất"], correct: "chủ nhật", explain: "chủ has a hỏi (dipping) tone; nhật has nặng (heavy, with the dot below)." },
          ] },

        { type: "type", id: "dict", strand: "language", mins: 5,
          title: { vi: "Chính tả · Nghe và viết", en: "Dictation: listen and type" },
          instr: { vi: "Bấm “Nghe”, rồi viết. Bạn có thể gõ Telex: thuws bayr → thứ bảy.", en: "Tap Listen, then type. Telex works: thuws bayr → thứ bảy." },
          items: [
            { say: "thứ bảy", telex: true, answers: ["thứ bảy"] },
            { say: "tuần này", telex: true, answers: ["tuần này"] },
            { say: "tháng mười hai", telex: true, answers: ["tháng mười hai"] },
            { say: "hôm nay là thứ mấy", telex: true, answers: ["hôm nay là thứ mấy"], show: "Hôm nay là thứ mấy?" },
            { say: "ngày mồng một", telex: true, answers: ["ngày mồng một", "ngày mùng một"] },
          ] },
      ],
    },

    /* ═══════════════ NÓI ═══════════════ */
    {
      id: "speak", icon: "4️⃣", label: "Nói",
      intro: { vi: "Nghe, rồi nói. Ghi âm và nghe lại giọng của bạn.", en: "Listen, then speak. Record and listen back to yourself." },
      blocks: [
        { type: "record", id: "shadow", strand: "fluency", mins: 4,
          title: { vi: "Nói theo", en: "Shadowing" },
          instr: { vi: "Bấm 🔊, nghe hai lần, rồi ghi âm và nói lại thật giống.", en: "Tap 🔊, listen twice, then record yourself saying it the same way." },
          prompts: [
            { vi: "Hôm nay là thứ mấy?", en: "What day is it today?" },
            { vi: "Hôm nay là thứ hai, ngày hai mươi sáu tháng mười.", en: "Today is Monday, October 26." },
            { vi: "Sinh nhật Minh là thứ bảy này.", en: "Minh’s birthday is this Saturday." },
          ] },

        { type: "record", id: "my-date", strand: "output", mins: 3,
          title: { vi: "Nói về bạn", en: "Your turn" },
          instr: { vi: "Trả lời bằng một câu đầy đủ. Không có mẫu — đây là câu của bạn!", en: "Answer in a full sentence. No model this time — it’s your sentence!" },
          prompts: [
            { vi: "Sinh nhật bạn là ngày nào?", en: "e.g. Sinh nhật mình là ngày … tháng …", model: false },
            { vi: "Thứ mấy bạn có lớp tiếng Việt?", en: "e.g. Mình có lớp tiếng Việt vào thứ …", model: false },
          ] },
      ],
    },

    /* ═══════════════ ĐỌC ═══════════════ */
    {
      id: "read", icon: "5️⃣", label: "Đọc",
      intro: { vi: "Mở truyện, bấm “Nghe và đọc theo”, rồi làm ba bài tập nhỏ bên dưới. Bấm ⏱ để đo tốc độ đọc.", en: "Open the story, tap Read along, then do the three short tasks under it. ⏱ times your reading." },
      blocks: [
        { type: "story", id: "st1", strand: "input", emoji: "🗓️", level: "Cấp 1", mins: 8,
          titleVi: "Tuần của Emma", titleEn: "Emma’s week",
          gloss: [["học toán", "to study math"], ["thư viện", "library"], ["gọi điện cho", "to call (someone)"], ["ôi", "oh!"]],
          body: [
            { t: "n", s: "Emma là sinh viên năm thứ nhất. Emma rất bận." },
            { t: "n", s: "Thứ hai, thứ tư và thứ sáu, Emma học tiếng Việt." },
            { t: "n", s: "Thứ ba và thứ năm, Emma học toán với Minh." },
            { t: "n", s: "Thứ bảy, Emma làm việc ở thư viện. Chủ nhật, Emma nghỉ và gọi điện cho mẹ." },
            { t: "n", s: "Hôm nay là thứ hai, ngày hai mươi sáu tháng mười. Emma xem lịch." },
            { t: "d", sp: "Emma", s: "Ôi! Thứ bảy này là ngày ba mươi mốt — Halloween!" },
            { t: "d", sp: "Minh", s: "Ừ. Và ngày ba mươi mốt tháng mười cũng là sinh nhật mình đấy." },
            { t: "d", sp: "Emma", s: "Thật à? Thứ bảy mình làm việc, nhưng buổi tối mình rảnh!" },
          ],
          pairs: [["thứ ba", "Tuesday"], ["chủ nhật", "Sunday"], ["xem lịch", "to look at the calendar"], ["rảnh", "free (not busy)"]],
          order: ["Emma học tiếng Việt vào thứ hai.", "Emma học toán với Minh vào thứ ba.", "Emma làm việc ở thư viện vào thứ bảy.", "Emma gọi điện cho mẹ vào chủ nhật."],
          fill: { text: "Hôm nay là thứ {0}, ngày hai mươi sáu tháng {1}. Thứ bảy này là ngày ba mươi {2}. Đó là sinh {3} Minh.", answers: ["hai", "mười", "mốt", "nhật"], bank: ["hai", "mười", "mốt", "nhật", "một", "tư"] } },
      ],
    },

    /* ═══════════════ NỘP BÀI ═══════════════ */
    {
      id: "report", icon: "📊", label: "Nộp bài", live: true,
      blocks: [
        { type: "cando", phase: "after",
          title: { vi: "Bây giờ bạn tự tin đến đâu?", en: "Now: how confident are you?" } },
        { type: "report", title: { vi: "Báo cáo · tải về và nộp trên Canvas", en: "Report · download it and submit on Canvas" } },
      ],
    },
  ],
};
})();
