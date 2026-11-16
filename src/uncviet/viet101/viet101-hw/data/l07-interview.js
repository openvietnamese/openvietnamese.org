/* VIET 101 (UNC Viet) — Bài 7 task: Phỏng vấn một bạn cùng lớp · Interview a classmate
   From Huy's task sheet _source/viet101/VIET101-TASK-Interview.md: pairs interview each other (5–7 min, recorded),
   then each student writes a 150–200-word narrative about the partner, like the Lesson 7 Narrative in
   Ngô Như Bình, Elementary Vietnamese (EV-NNB) p. 75, and a reflection in English (before + after).
   Grading (task sheet): interview recording 50 % · narrative 50 %; reflection graded for thoughtfulness and clarity.
   Due Friday 20/11/2026, midnight.
   The model narrative (David introduces Tuấn) is original (Huy Phung); Tuấn's family as in the Bài 7 Friday deck
   (bố 58 bác sĩ, mẹ has a phở restaurant, chị gái 26 math teacher, em trai 14) and the review-week cards (Charlotte).
   Engine: ../assets/bv.js. */
(function () {

const LEVELS = [
  { vi: "Cần cố gắng", en: "Developing" },
  { vi: "Đạt", en: "Meets" },
  { vi: "Xuất sắc", en: "Exceeds" },
];

window.BV_CHAPTER = {
  id: 7,
  titleVi: "Nhiệm vụ · Phỏng vấn một bạn cùng lớp",
  titleEn: "Lesson 7 task: interview a classmate",
  description: "VIET 101, Lesson 7 task: prepare your questions, interview a classmate for 5–7 minutes and record it, then write a 150–200-word narrative about your partner — name, age, studies, family, home, future plans and holidays — and reflect on the experience. Due Friday, November 20.",
  color: "#be123c",
  badge: { icon: "🎤", name: "Phóng viên · Interviewer" },
  rubricLevels: LEVELS,

  cando: [
    { vi: "Tôi có thể hỏi một bạn về tên, tuổi, ngành học, gia đình, nhà, kế hoạch và kỳ nghỉ.", en: "I can ask a classmate about their name, age, major, family, home, plans and holidays." },
    { vi: "Tôi có thể nói chuyện bằng tiếng Việt 5–7 phút với một bạn.", en: "I can keep a conversation going in Vietnamese with a partner for 5–7 minutes." },
    { vi: "Tôi có thể viết 150–200 từ giới thiệu một người bạn.", en: "I can write a 150–200-word narrative introducing a friend." },
  ],

  tabs: [

    /* ═══════════════ BẮT ĐẦU ═══════════════ */
    {
      id: "overview", icon: "🎯", label: "Bắt đầu",
      intro: { vi: "Nhiệm vụ Bài 7 · phỏng vấn, ghi âm, viết · hạn nộp: thứ Sáu 20/11, 12 giờ đêm.", en: "Lesson 7 task · interview, record, write · due Friday, November 20, at midnight." },
      blocks: [
        { type: "html", title: { vi: "Nhiệm vụ này là gì?", en: "What is this task?" }, html: `
          <p>You will <strong>interview a classmate</strong> (your partner from today’s class) about their life, family and background, and they will interview you. Then you write a <strong>narrative in Vietnamese about your partner</strong>, like the Narrative in your book (<em>Elementary Vietnamese</em>, Lesson 7, p. 75).</p>
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Bước · Step</th><th>Bạn làm gì · What you do</th><th>⏱</th></tr>
            <tr><td>🎯 Bắt đầu</td><td>Write how you feel before you start (English)</td><td>4′</td></tr>
            <tr><td>1️⃣ Chuẩn bị</td><td>New words, the question bank, phrases to keep talking, a short practice</td><td>20′</td></tr>
            <tr><td>2️⃣ Phỏng vấn</td><td><strong>In class:</strong> the interview, 5–7 minutes, recorded · your notes on your partner</td><td>15′</td></tr>
            <tr><td>3️⃣ Viết</td><td>Read a model narrative, plan, then write <strong>150–200 words</strong> about your partner</td><td>35′</td></tr>
            <tr><td>4️⃣ Chấm điểm</td><td>How it’s graded · check your own work</td><td>3′</td></tr>
            <tr><td>📊 Nộp bài</td><td>Reflection (English) · download the report and upload it to Canvas</td><td>12′</td></tr>
          </table></div>
          <p><strong>Grading:</strong> interview recording <strong>50 %</strong> · narrative <strong>50 %</strong> · plus a short reflection. <strong>Due: Friday, November 20, midnight.</strong></p>
          <p><small>You don’t need to script or rehearse the conversation. Just give it a try and see how much — and how well — you can talk in Vietnamese.</small></p>` },

        { type: "cando", phase: "before",
          title: { vi: "Bạn tự tin đến đâu?", en: "Before you start: how confident are you?" },
          instr: { vi: "Chọn một mức cho mỗi câu. Cuối bài bạn sẽ chọn lại.", en: "Rate each statement. You’ll rate them again at the end." } },

        { type: "writing", id: "before", strand: "output", mins: 4,
          title: { vi: "Trước khi bắt đầu · in English", en: "Before you start (in English)" },
          prompt: { vi: "Viết bằng tiếng Anh, 2–4 câu.", en: "In 2–4 sentences: How do you feel about this task before starting — excited, nervous, confident? What do you expect to struggle with the most? (You’ll come back to this in your reflection.)" },
          minWords: 20,
          checklist: [
            { vi: "Cảm giác của bạn", en: "How you feel" },
            { vi: "Điều bạn nghĩ sẽ khó nhất", en: "What you expect to be hardest" },
          ] },
      ],
    },

    /* ═══════════════ CHUẨN BỊ ═══════════════ */
    {
      id: "prepare", icon: "1️⃣", label: "Chuẩn bị",
      intro: { vi: "Học vài từ mới, đọc ngân hàng câu hỏi, tập hỏi to.", en: "Learn a few new words, read the question bank, practise asking aloud." },
      blocks: [
        { type: "flashcards", id: "cards-interview", strand: "language", mins: 5,
          title: { vi: "Thẻ từ · Từ cho cuộc phỏng vấn", en: "Flashcards: words for the interview" },
          instr: { vi: "Lật thẻ, nghe, nói theo. Bấm “Biết rồi” khi bạn nhớ.", en: "Flip, listen, say it aloud. Tap “I know it” when you’ve got it." },
          cards: [
            { vi: "ngành", en: "major, field of study", ex: "Bạn học ngành gì? — Mình học ngành sinh học.", exEn: "What’s your major? — Biology." },
            { vi: "quê", en: "hometown", ex: "Quê bạn ở đâu?", exEn: "Where’s your hometown?" },
            { vi: "sống", en: "to live", ex: "Gia đình mình sống ở Charlotte.", exEn: "My family lives in Charlotte." },
            { vi: "to · nhỏ", en: "big · small", ex: "Nhà mình không to lắm.", exEn: "My house isn’t very big." },
            { vi: "phòng · phòng ngủ", en: "room · bedroom", ex: "Nhà mình có ba phòng ngủ.", exEn: "Our house has three bedrooms." },
            { vi: "ký túc xá", en: "dorm", ex: "Mình sống ở ký túc xá.", exEn: "I live in a dorm." },
            { vi: "sau khi tốt nghiệp", en: "after graduating", ex: "Sau khi tốt nghiệp, mình muốn làm bác sĩ.", exEn: "After I graduate, I want to be a doctor." },
            { vi: "muốn", en: "to want", ex: "Bạn muốn làm gì?", exEn: "What do you want to do?" },
            { vi: "kỳ nghỉ", en: "break, vacation", ex: "kỳ nghỉ hè · kỳ nghỉ đông", exEn: "summer break · winter break" },
            { vi: "thường", en: "usually", ex: "Vào kỳ nghỉ, mình thường về nhà.", exEn: "During breaks I usually go home." },
            { vi: "đi du lịch", en: "to travel", ex: "Bạn có thích đi du lịch không?", exEn: "Do you like to travel?" },
          ] },

        { type: "html", title: { vi: "Ngân hàng câu hỏi", en: "Question bank — pick, mix and add your own" }, strand: "language", mins: 6, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Chủ đề · Topic</th><th>Câu hỏi · Questions</th></tr>
            <tr><td>👋 <strong>Giới thiệu</strong><br><small>Introduce yourself</small></td><td><em>Bạn tên là gì?</em> · <em>Bạn năm nay bao nhiêu tuổi?</em> · <em>Bạn học ngành gì?</em> · <em>Bạn là sinh viên năm thứ mấy?</em> · <em>Quê bạn ở đâu?</em> <button class="tts" data-say="Bạn tên là gì? Bạn năm nay bao nhiêu tuổi? Bạn học ngành gì?">🔊</button></td></tr>
            <tr><td>👪 <strong>Gia đình</strong><br><small>Family</small></td><td><em>Gia đình bạn có nhiều người không?</em> · <em>Gia đình bạn có mấy người?</em> · <em>Bố mẹ bạn làm gì?</em> · <em>Bạn có anh chị em không?</em> · <em>Anh / chị / em bạn bao nhiêu tuổi? Làm gì?</em> <button class="tts" data-say="Gia đình bạn có nhiều người không? Bố mẹ bạn làm gì? Bạn có anh chị em không?">🔊</button></td></tr>
            <tr><td>🏠 <strong>Nơi ở</strong><br><small>Where you live</small></td><td><em>Gia đình bạn sống ở đâu?</em> · <em>Nhà bạn có to không?</em> · <em>Nhà bạn có mấy phòng ngủ?</em> · <em>Ở Chapel Hill, bạn sống ở ký túc xá à?</em> <button class="tts" data-say="Gia đình bạn sống ở đâu? Nhà bạn có to không?">🔊</button></td></tr>
            <tr><td>🎓 <strong>Kế hoạch</strong><br><small>Plans for the future</small></td><td><em>Bạn sẽ làm gì sau khi tốt nghiệp?</em> · <em>Bao giờ bạn tốt nghiệp?</em> · <em>Sau này bạn muốn làm gì?</em> <button class="tts" data-say="Bạn sẽ làm gì sau khi tốt nghiệp? Sau này bạn muốn làm gì?">🔊</button></td></tr>
            <tr><td>🏖️ <strong>Kỳ nghỉ</strong><br><small>Holidays &amp; vacations</small></td><td><em>Bạn thường làm gì vào kỳ nghỉ?</em> · <em>Bạn có thích đi du lịch không?</em> · <em>Bạn đã đi Việt Nam chưa?</em> · <em>Kỳ nghỉ đông này bạn sẽ đi đâu?</em> <button class="tts" data-say="Bạn thường làm gì vào kỳ nghỉ? Bạn có thích đi du lịch không?">🔊</button></td></tr>
          </table></div>
          <h4>💬 Giữ cuộc nói chuyện · Keep the conversation going</h4>
          <div class="table-scroll"><table class="culture-table">
            <tr><td><em>Thế còn bạn?</em></td><td>And what about you?</td><td><button class="tts" data-say="Thế còn bạn?">🔊</button></td></tr>
            <tr><td><em>Thật à? · Hay quá! · Vui quá!</em></td><td>Really? · Great! · How fun!</td><td><button class="tts" data-say="Thật à? Hay quá! Vui quá!">🔊</button></td></tr>
            <tr><td><em>Xin lỗi, bạn nói lại được không?</em></td><td>Sorry, could you say that again?</td><td><button class="tts" data-say="Xin lỗi, bạn nói lại được không?">🔊</button></td></tr>
            <tr><td><em>Bạn nói chậm một chút được không?</em></td><td>Could you speak a little more slowly?</td><td><button class="tts" data-say="Bạn nói chậm một chút được không?">🔊</button></td></tr>
            <tr><td><em>“…” tiếng Việt là gì?</em></td><td>How do you say “…” in Vietnamese?</td><td><button class="tts" data-say="tiếng Việt là gì?">🔊</button></td></tr>
            <tr><td><em>Tại sao?</em> · <em>Còn … thì sao?</em></td><td>Why? · And what about …?</td><td><button class="tts" data-say="Tại sao? Còn em gái bạn thì sao?">🔊</button></td></tr>
          </table></div>
          <p><small>Ask a follow-up question after every answer — that is what makes 5–7 minutes easy. Partners call each other <em>bạn</em> and themselves <em>mình</em>.</small></p>` },

        { type: "mc", id: "ask-right", strand: "language", mins: 4,
          title: { vi: "Hỏi cho đúng", en: "Ask it the right way" },
          items: [
            { q: "Ask your classmate’s age:", opts: ["Bạn năm nay bao nhiêu tuổi?", "Bạn mấy tuổi?", "Bạn là bao nhiêu tuổi?"], correct: "Bạn năm nay bao nhiêu tuổi?", why: { "Bạn mấy tuổi?": "Mấy tuổi is for small children.", "Bạn là bao nhiêu tuổi?": "No là before an age." } },
            { q: "Ask what they’ll do after graduating:", opts: ["Bạn sẽ làm gì sau khi tốt nghiệp?", "Bạn đã làm gì sau khi tốt nghiệp?", "Bạn làm gì sau khi tốt nghiệp rồi?"], correct: "Bạn sẽ làm gì sau khi tốt nghiệp?", why: { "Bạn đã làm gì sau khi tốt nghiệp?": "Đã is the past — your classmate hasn’t graduated yet." } },
            { q: "Ask whether they have been to Vietnam (yet):", opts: ["Bạn đã đi Việt Nam chưa?", "Bạn có đi Việt Nam chưa?", "Bạn đi Việt Nam không rồi?"], correct: "Bạn đã đi Việt Nam chưa?" },
            { q: "Your partner says: “Nhà mình to lắm.” A good follow-up:", opts: ["Thật à? Nhà bạn có mấy phòng ngủ?", "Bạn tên là gì?", "Cảm ơn bạn. Chào bạn!"], correct: "Thật à? Nhà bạn có mấy phòng ngủ?", why: { "Bạn tên là gì?": "Follow up on what they just said — ask more about the house." } },
            { q: "You didn’t catch the answer. You say:", opts: ["Xin lỗi, bạn nói lại được không?", "Thế còn bạn?", "Hay quá!"], correct: "Xin lỗi, bạn nói lại được không?" },
          ] },

        { type: "record", id: "practice", strand: "fluency", mins: 5,
          title: { vi: "Tập nói", en: "Practice before class" },
          instr: { vi: "Câu 1–2: nghe rồi nói theo. Câu 3–4: trả lời về bạn — bạn sẽ nghe những câu này ở lớp!", en: "1–2: listen, then repeat. 3–4: answer about yourself — your partner will ask you these in class!" },
          prompts: [
            { vi: "Bạn sẽ làm gì sau khi tốt nghiệp?", en: "What will you do after you graduate? (repeat the question)", ask: false },
            { vi: "Bạn thường làm gì vào kỳ nghỉ?", en: "What do you usually do on breaks? (repeat the question)", ask: false },
            { vi: "Gia đình bạn sống ở đâu? Nhà bạn có to không?", en: "Where does your family live? Is your house big?", model: false, maxSec: 45 },
            { vi: "Sau này bạn muốn làm gì?", en: "What do you want to do in the future?", model: false, maxSec: 45 },
          ] },
      ],
    },

    /* ═══════════════ PHỎNG VẤN ═══════════════ */
    {
      id: "interview", icon: "2️⃣", label: "Phỏng vấn",
      intro: { vi: "Ở lớp: phỏng vấn nhau 5–7 phút và ghi âm. Rồi ghi chú về bạn của bạn.", en: "In class: interview each other for 5–7 minutes and record it. Then take notes on your partner." },
      blocks: [
        { type: "html", title: { vi: "Cách phỏng vấn", en: "How to do the interview" }, where: "class", html: `
          <ol>
            <li><strong>Both of you press ● Record below at the same time</strong>, each on your own device — then each report has the recording. (Or record on Zoom or a phone and upload that file on Canvas; then skip the recorder here.)</li>
            <li>Take turns: A asks about one topic, B answers; then B asks A. Cover <strong>all five topics</strong> — introduce yourself, family, where you live, plans, holidays.</li>
            <li>Speak about <strong>equally</strong>, and only in Vietnamese. Ask follow-up questions; it’s fine to say <em>Xin lỗi, bạn nói lại được không?</em></li>
            <li>Aim for <strong>5–7 minutes</strong>. The recorder stops by itself at 8 minutes.</li>
            <li>Sit somewhere quiet, close to the microphone, so both voices are clear.</li>
          </ol>` },

        { type: "record", id: "the-interview", strand: "output", where: "class", mins: 8,
          title: { vi: "Ghi âm cuộc phỏng vấn", en: "Record the interview" },
          instr: { vi: "Bấm ● Ghi âm khi hai bạn bắt đầu. Bấm lại khi xong. Bạn có thể nghe lại.", en: "Tap ● Record when you both start, and tap it again when you finish. Listen back to check both voices are clear." },
          prompts: [
            { vi: "Cuộc phỏng vấn", en: "The whole interview with your partner — 5 to 7 minutes, both of you speaking", model: false, maxSec: 480 },
          ] },

        { type: "writing", id: "notes", strand: "output", mins: 6, allowPaste: true,
          title: { vi: "Ghi chú về bạn của bạn", en: "Notes on your partner" },
          prompt: { vi: "Ngay sau khi phỏng vấn, ghi chú những gì bạn nhớ — tiếng Việt, từ hoặc câu ngắn đều được.", en: "Right after the interview, note what you remember — in Vietnamese; single words or short phrases are fine. Listen to the recording again to fill gaps. You’ll use these notes to write." },
          minWords: 25,
          checklist: [
            { vi: "Tên, tuổi, ngành, năm thứ mấy", en: "Name, age, major, year" },
            { vi: "Gia đình: ai, làm gì", en: "Family: who, what they do" },
            { vi: "Sống ở đâu, nhà thế nào", en: "Where they live, the house" },
            { vi: "Kế hoạch sau khi tốt nghiệp", en: "Plans after graduating" },
            { vi: "Kỳ nghỉ, du lịch", en: "Holidays, travel" },
          ] },
      ],
    },

    /* ═══════════════ VIẾT ═══════════════ */
    {
      id: "write", icon: "3️⃣", label: "Viết",
      intro: { vi: "Đọc bài mẫu, lập dàn ý, rồi viết 150–200 từ về bạn của bạn.", en: "Read the model, plan, then write 150–200 words about your partner." },
      blocks: [
        { type: "story", id: "model", strand: "input", emoji: "📝", level: "Bài mẫu", mins: 7,
          titleVi: "Bạn cùng lớp của tôi", titleEn: "My classmate — a model narrative (David writes about Tuấn)",
          gloss: [["bạn cùng lớp", "classmate"], ["ngành", "major"], ["kỹ thuật", "engineering"], ["nhà hàng", "restaurant"], ["phòng ngủ", "bedroom"], ["ký túc xá", "dorm"], ["sau khi", "after"], ["vài", "a few"], ["lần", "time(s)"]],
          body: [
            { t: "n", s: "Tôi muốn giới thiệu với các bạn một người bạn cùng lớp: Tuấn. Tuấn năm nay mười chín tuổi. Bạn ấy là sinh viên năm thứ nhất ở UNC, học ngành kỹ thuật." },
            { t: "n", s: "Gia đình Tuấn có năm người: bố mẹ, chị gái, em trai và Tuấn. Bố Tuấn năm mươi tám tuổi, là bác sĩ. Mẹ Tuấn có một nhà hàng phở. Chị gái Tuấn hai mươi sáu tuổi, là giáo viên toán. Em trai Tuấn mười bốn tuổi, vẫn còn học trung học." },
            { t: "n", s: "Gia đình Tuấn sống ở Charlotte. Nhà Tuấn không to lắm, có ba phòng ngủ, nhưng rất đẹp. Ở Chapel Hill, Tuấn sống ở ký túc xá." },
            { t: "n", s: "Sau khi tốt nghiệp, Tuấn muốn làm kỹ sư ở một công ty lớn. Bạn ấy cũng muốn sang Việt Nam làm việc vài năm." },
            { t: "n", s: "Vào kỳ nghỉ, Tuấn thường về Charlotte và làm việc ở nhà hàng của mẹ. Tuấn rất thích đi du lịch. Bạn ấy đã đi Việt Nam hai lần. Kỳ nghỉ đông này, Tuấn sẽ đi Đà Nẵng với gia đình." },
          ],
          pairs: [["ngành", "major"], ["sống", "to live"], ["sau khi", "after"], ["đi du lịch", "to travel"]],
          order: ["Tên, tuổi và ngành học của Tuấn.", "Gia đình Tuấn.", "Nhà của Tuấn.", "Kế hoạch sau khi tốt nghiệp.", "Kỳ nghỉ và du lịch."],
          fill: { text: "Tuấn học {0} kỹ thuật. Em trai Tuấn {1} còn học trung học. Ở Chapel Hill, Tuấn sống ở {2}. Kỳ nghỉ đông này, Tuấn {3} đi Đà Nẵng.", answers: ["ngành", "vẫn", "ký túc xá", "sẽ"], bank: ["ngành", "vẫn", "ký túc xá", "sẽ", "đã", "phòng"] } },

        { type: "mc", id: "to-narrative", strand: "language", mins: 4,
          title: { vi: "Từ câu trả lời đến bài viết", en: "From your partner’s answer to your narrative" },
          instr: { vi: "Bạn của bạn nói “mình”. Trong bài viết, bạn viết về bạn ấy.", en: "Your partner said “mình” (I). In the narrative you write about them: use their name or bạn ấy / anh ấy / chị ấy." },
          items: [
            { q: "Partner: “Mình học ngành sinh học.” → narrative:", opts: ["Bạn ấy học ngành sinh học.", "Mình học ngành sinh học.", "Nó học ngành sinh học."], correct: "Bạn ấy học ngành sinh học.", why: { "Mình học ngành sinh học.": "In the narrative, mình would mean you!", "Nó học ngành sinh học.": "Nó is rude for a classmate." } },
            { q: "Partner: “Bố mình là kỹ sư.” → narrative:", opts: ["Bố Sofia là kỹ sư.", "Bố mình là kỹ sư.", "Bố là kỹ sư Sofia."], correct: "Bố Sofia là kỹ sư." },
            { q: "Partner: “Mình chưa đi Việt Nam.” → narrative:", opts: ["Bạn ấy chưa đi Việt Nam.", "Bạn ấy không đi Việt Nam.", "Bạn ấy đã đi Việt Nam."], correct: "Bạn ấy chưa đi Việt Nam.", why: { "Bạn ấy không đi Việt Nam.": "Không = doesn’t (go); chưa = hasn’t yet — keep your partner’s meaning." } },
            { q: "Partner: “Sau khi tốt nghiệp, mình muốn làm giáo viên.” → narrative:", opts: ["Sau khi tốt nghiệp, bạn ấy muốn làm giáo viên.", "Sau khi tốt nghiệp, bạn ấy đã làm giáo viên.", "Bạn ấy tốt nghiệp giáo viên."], correct: "Sau khi tốt nghiệp, bạn ấy muốn làm giáo viên." },
          ] },

        { type: "html", title: { vi: "Dàn ý · Plan your narrative", en: "Plan: five short paragraphs" }, strand: "output", mins: 3, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Đoạn · Paragraph</th><th>Bắt đầu với · Sentence starters</th></tr>
            <tr><td>1 · Giới thiệu</td><td><em>Tôi muốn giới thiệu với các bạn …</em> · <em>… năm nay … tuổi.</em> · <em>Bạn ấy là sinh viên năm thứ … ở …, học ngành …</em></td></tr>
            <tr><td>2 · Gia đình</td><td><em>Gia đình … có … người: …</em> · <em>Bố / mẹ … là …</em> · <em>… có một anh trai / chị gái / em …</em> · <em>… vẫn còn …</em></td></tr>
            <tr><td>3 · Nơi ở</td><td><em>Gia đình … sống ở …</em> · <em>Nhà … (không) to lắm, có … phòng ngủ.</em> · <em>Ở Chapel Hill, … sống ở …</em></td></tr>
            <tr><td>4 · Kế hoạch</td><td><em>Sau khi tốt nghiệp, … muốn / sẽ …</em> · <em>Sau này …</em></td></tr>
            <tr><td>5 · Kỳ nghỉ</td><td><em>Vào kỳ nghỉ, … thường …</em> · <em>… (không) thích đi du lịch.</em> · <em>… đã / chưa đi …</em> · <em>Kỳ nghỉ đông này, … sẽ …</em></td></tr>
          </table></div>
          <p><small>Use your partner’s name or <em>bạn ấy / anh ấy / chị ấy</em> — never <em>nó</em>. Join sentences with <em>và, nhưng, cũng, vì</em>. Write every tone mark. Type it here yourself — no translators.</small></p>` },

        { type: "writing", id: "narrative", strand: "output", mins: 25,
          title: { vi: "Viết · Bạn cùng lớp của tôi", en: "Write: my classmate (150–200 words)" },
          prompt: { vi: "Viết 150–200 từ về bạn của bạn, dựa vào cuộc phỏng vấn. Viết câu đầy đủ.", en: "Write 150–200 words about your partner, from the interview, in full sentences: name, age, where they study; family (parents, siblings, what they do); where they live and their house; future goals; holidays and vacations." },
          minWords: 150,
          checklist: [
            { vi: "Tên, tuổi, học ở đâu, ngành gì", en: "Name, age, where they study, major" },
            { vi: "Gia đình: bố mẹ, anh chị em, làm gì", en: "Family: parents, siblings, what they do" },
            { vi: "Sống ở đâu, nhà thế nào", en: "Where they live and their house" },
            { vi: "Kế hoạch: sau khi tốt nghiệp / sau này", en: "Future goals" },
            { vi: "Kỳ nghỉ, du lịch", en: "Holidays and vacations" },
            { vi: "bạn ấy / tên — không dùng “mình”, “nó”", en: "bạn ấy or the name — not mình or nó" },
            { vi: "Dấu (tone marks) đầy đủ", en: "All tone marks written" },
          ] },
      ],
    },

    /* ═══════════════ CHẤM ĐIỂM ═══════════════ */
    {
      id: "rubric", icon: "4️⃣", label: "Chấm điểm",
      intro: { vi: "Đọc tiêu chí, rồi tự kiểm tra bài của bạn.", en: "Read the criteria, then check your own work." },
      blocks: [
        { type: "html", title: { vi: "Tiêu chí chấm điểm", en: "How the task is graded" }, html: `
          <div class="table-scroll"><table class="culture-table">
            <tr><th>Phần · Part</th><th>Your teacher looks for</th><th>%</th></tr>
            <tr><td>🎤 <strong>Ghi âm phỏng vấn</strong><br><small>Interview recording</small></td><td>Clear and audible · both partners speak, about equally · <strong>at least 5 minutes</strong> · relevant content on the five topics</td><td>50</td></tr>
            <tr><td>📝 <strong>Bài viết</strong><br><small>Narrative</small></td><td>Accurate vocabulary and sentence structures · clear, coherent, well-organised narrative (150–200 words, all five topics) · correct grammar, punctuation and spelling (tone marks)</td><td>50</td></tr>
            <tr><td>💭 <strong>Suy nghĩ</strong><br><small>Reflection (English)</small></td><td>Thoughtfulness — depth of reflection and insight · clarity — clear, concise writing</td><td>✓</td></tr>
          </table></div>` },

        { type: "rubric", id: "self-check", strand: "output", mins: 3,
          title: { vi: "Tự kiểm tra", en: "Check your own work" },
          task: { vi: "Chọn một mức cho mỗi tiêu chí. Phần này không tính điểm.", en: "Pick a level for each criterion. Your teacher sees it in the report; it isn’t graded." },
          criteria: [
            { vi: "Ghi âm: rõ, cả hai người nói", en: "Recording: clear, both speak", desc: ["Hard to hear, or one person talks most", "Clear, both speak", "Clear, both speak equally, follow-up questions"] },
            { vi: "Ghi âm: độ dài và nội dung", en: "Recording: length and content", desc: ["Under 5 minutes or topics missing", "5 minutes, most topics", "5–7 minutes, all five topics"] },
            { vi: "Bài viết: nội dung và bố cục", en: "Narrative: content and organisation", desc: ["Under 150 words or topics missing", "150+ words, most topics", "150–200 words, five clear paragraphs"] },
            { vi: "Bài viết: ngữ pháp và chính tả", en: "Narrative: grammar and spelling", desc: ["Many errors or missing tone marks", "Some errors, meaning clear", "Few errors, tone marks correct"] },
          ] },
      ],
    },

    /* ═══════════════ NỘP BÀI ═══════════════ */
    {
      id: "report", icon: "📊", label: "Nộp bài", live: true,
      blocks: [
        { type: "cando", phase: "after",
          title: { vi: "Bây giờ bạn tự tin đến đâu?", en: "Now: how confident are you?" } },
        { type: "report", timing: true, title: { vi: "Báo cáo · tải về và nộp trên Canvas", en: "Report · download it and submit on Canvas (with your audio file if you recorded elsewhere)" },
          survey: {
            title: "Reflection",
            note: "Write in English, after the interview and the narrative. 2–3 short paragraphs in total is enough — be honest and specific. Your “before” answer from the first tab is in your report too, so you can compare.",
            sections: [
              { title: "Quick check", intro: "Your first reaction.", items: [
                { id: "conf-before", type: "scale", q: "Before the interview, how confident were you about talking with a classmate in Vietnamese for 5 minutes?", low: "Not at all", high: "Very" },
                { id: "conf-after", type: "scale", q: "Now, how confident are you?", low: "Not at all", high: "Very" },
              ] },
              { title: "Reflection", intro: "Answer each in 3–5 sentences, with an example from your conversation or your narrative.", items: [
                { id: "experience", type: "long", q: "1 · The experience", hint: "How did you feel during the interview — comfortable, nervous, confident? What went well in the conversation, and what challenges did you face? Was writing the narrative easy or challenging?" },
                { id: "self-eval", type: "long", q: "2 · Self-evaluation", hint: "How would you assess your speaking, listening and writing in this task? Which skills do you think you improved? What would you do differently next time?" },
                { id: "expect", type: "long", q: "3 · Expectations vs. performance", hint: "Compare with what you wrote before you started: was your performance better, worse or as expected? What did you learn from this experience?" },
              ] },
            ],
          } },
      ],
    },
  ],
};
})();
