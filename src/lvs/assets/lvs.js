/*
 * LVS (Learning Vietnamese via Songs): shared lesson engine.
 * © 2026 Huy Phung · Open Vietnamese · code MIT.
 *
 * Every song page carries its own markup (texts, headings, notes) plus one data block:
 *   <script type="application/json" id="lvs-data">{ … }</script>
 * read here as D. The same block feeds _tools/lvs/make-recording-list.js (recorder items + audio manifest),
 * so a text changed here is a text to re-record there.
 *
 * D: id, title, credit, tones[6], steps{warm,gist,lyrics,lang,create,talk: minutes}, vocab[{vi,en,ex,exEn}],
 *    targets[], markStarts[], titleOpts[{t,en}], gist[{q,en,opts,a,ok}], moods[], moodNote,
 *    countStart{phrase,label}?, sort{bins,items,ok,hint}, pairs{items[{a,b}],ok,hint}, cloze[{s,o,a,en}],
 *    model[], compose{lines,prefill,starts,minWords,needs[{kind:"re"|"lay"|"start",re?,phrase?,min,label}],ok},
 *    wordbank[{lab,w[]}], self[], finish
 */
(function(){
"use strict";
var D = JSON.parse(document.getElementById("lvs-data").textContent);
var KEY = "ov-lvs-" + D.id + "-v1";
var S = load();
function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; } }
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} }
S.done = S.done || {};

function $(s, r){ return (r||document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
function el(tag, attrs, html){
  var e = document.createElement(tag);
  if (attrs) for (var k in attrs){ if (k === "class") e.className = attrs[k]; else e.setAttribute(k, attrs[k]); }
  if (html != null) e.innerHTML = html;
  return e;
}
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
function shuffle(a){ a = a.slice(); for (var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function fb(id, cls, html){ var f=$("#"+id); f.className = "fb show " + cls; f.innerHTML = html; }
function toast(msg){ var t=$("#toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(toast._t); toast._t=setTimeout(function(){ t.classList.remove("show"); }, 2200); }
function norm(s){ return String(s||"").normalize("NFC").toLowerCase().replace(/[.,!?;:"“”'‘’…()\-–—]/g,"").replace(/\s+/g," ").trim(); }
function bare(s){ return norm(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d"); }
function startsWith(v, phrase){ return v === phrase || v.indexOf(phrase + " ") === 0; }
var STARTS = (D.markStarts || []).map(norm);
function startLen(line){ var v = norm(line); for (var i=0;i<STARTS.length;i++) if (startsWith(v, STARTS[i])) return STARTS[i].split(" ").length; return 0; }

/* ── voice: Huy's recordings first (manifest from _tools/lvs/make-recording-list.js), text-to-speech as fallback ── */
var viVoice = null;
function pickVoice(){
  if (!("speechSynthesis" in window)) return;
  viVoice = speechSynthesis.getVoices().filter(function(v){ return /^vi/i.test(v.lang); })[0] || null;
  var w = $("#ttsWarn");
  if (w) w.textContent = viVoice ? "" : " · Máy bạn chưa có giọng tiếng Việt (vi-VN); hãy cài thêm giọng đọc trong cài đặt hệ thống.";
}
if ("speechSynthesis" in window){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
var AUD = window.LVS_AUDIO || {}, AUD_BASE = "/lvs/audio/";
var NOW = { audio: null, token: 0 };
function akey(t){ return String(t).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim(); }   // same as the generator
function clipFor(text){ return AUD[akey(text)] || null; }
function stopAll(){ NOW.token++; if (NOW.audio){ NOW.audio.pause(); NOW.audio = null; } if ("speechSynthesis" in window) speechSynthesis.cancel(); }
function slider(){ return parseFloat(($("#rate")||{}).value || 0.85); }
function clipRate(r){ return r >= 0.8 ? 1 : Math.max(0.6, r / 0.8); }   // the speed slider slows recordings too (pitch kept)
function tts(text, rate, h){
  h = h || {};
  if (!("speechSynthesis" in window)) { toast("Trình duyệt không hỗ trợ đọc to."); return false; }
  speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(text);
  u.lang = "vi-VN"; if (viVoice) u.voice = viVoice;
  u.rate = rate || slider();
  if (h.start) u.onstart = h.start;
  if (h.boundary) u.onboundary = function(e){ h.boundary(e.charIndex); };
  if (h.end){ u.onend = h.end; u.onerror = h.end; }
  speechSynthesis.speak(u);
  return true;
}
function speak(text, rate){
  stopAll();
  var clip = clipFor(text);
  if (!clip) return tts(text, rate);
  var a = new Audio(AUD_BASE + clip); NOW.audio = a;
  a.playbackRate = rate ? 1 : clipRate(slider());
  a.onerror = function(){ if (NOW.audio === a){ NOW.audio = null; tts(text, rate); } };
  a.play().catch(function(){ if (NOW.audio === a) tts(text, rate); });
  return true;
}
var SPK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6h3l4-3v10L5 10H2z" fill="currentColor"/><path d="M11 5.5c1 .8 1 4.2 0 5M12.8 3.8c2 1.8 2 6.6 0 8.4" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>';

/* ── tones: the LVS signature. Contours are drawn from the diacritics. ── */
var TONE_D = {ngang:"M3 7 H37", huyen:"M3 8 L37 19", sac:"M3 19 L37 3", hoi:"M3 8 Q18 27 37 11", nga:"M3 11 L15 15 M20 15 L37 2", nang:"M3 12 L25 20"};
var TONE_NAME = {ngang:"ngang", huyen:"huyền", sac:"sắc", hoi:"hỏi", nga:"ngã", nang:"nặng"};
var TONES = ["ngang","huyen","sac","hoi","nga","nang"], MA = D.tones;   // this song's six-tone series
function toneOf(syl){
  var d = String(syl).normalize("NFD");
  if (/\u0301/.test(d)) return "sac"; if (/\u0300/.test(d)) return "huyen"; if (/\u0309/.test(d)) return "hoi";
  if (/\u0303/.test(d)) return "nga"; if (/\u0323/.test(d)) return "nang"; return "ngang";
}
function toneSvg(t, cls){
  return '<svg class="'+(cls||"tn")+' t-'+t+'" viewBox="0 0 40 24" aria-hidden="true"><path d="'+TONE_D[t]+'"/>'+(t==="nang"?'<circle cx="31" cy="21" r="2.8"/>':"")+'</svg>';
}
function sylHTML(text, markStart){
  var n = markStart ? startLen(text) : 0;
  return String(text).split(/\s+/).filter(Boolean).map(function(w, i){
    var core = w.replace(/[^\p{L}]/gu, "");
    return '<span class="syl'+(i < n ? " co" : "")+'">'+(core ? toneSvg(toneOf(core)) : '<svg class="tn"></svg>')+'<span class="sw">'+esc(w)+'</span></span>';
  }).join(" ");
}
/* karaoke: highlight syllables as they are sung, line by line (.pl rows, or the box itself).
   With a recording the highlight is spread over the take; with TTS it follows word boundaries or a timer. */
function karaoke(box, rate){
  stopAll();
  var tok = NOW.token, lines = $$(".pl", box);
  if (!lines.length) lines = [box];
  $$(".syl", box).forEach(function(x){ x.classList.remove("sung","now"); });
  (function next(i){ if (i < lines.length && tok === NOW.token) singLine(lines[i], rate, tok).then(function(){ next(i + 1); }); })(0);
}
function singLine(line, rate, tok){
  return new Promise(function(done){
    var syls = $$(".syl", line); if (!syls.length) return done();
    var words = syls.map(function(x){ return $(".sw", x).textContent; }), text = words.join(" ");
    var r = rate || slider(), finished = false;
    function upto(k){ syls.forEach(function(x, j){ x.classList.toggle("sung", j <= k); x.classList.toggle("now", j === k); }); }
    function finish(){ if (finished) return; finished = true; upto(syls.length - 1); setTimeout(function(){ syls.forEach(function(x){ x.classList.remove("now"); }); }, 300); done(); }
    var clip = clipFor(text);
    if (clip){
      var a = new Audio(AUD_BASE + clip), raf = 0; NOW.audio = a; a.playbackRate = clipRate(slider());
      var tick = function(){
        if (tok !== NOW.token){ cancelAnimationFrame(raf); a.pause(); return done(); }
        if (a.duration){ var f = (a.currentTime - 0.28) / Math.max(0.2, a.duration - 0.56); upto(Math.min(syls.length - 1, Math.floor(f * syls.length))); }
        raf = requestAnimationFrame(tick);
      };
      a.onended = function(){ cancelAnimationFrame(raf); finish(); };
      a.onerror = function(){ cancelAnimationFrame(raf); viaTTS(); };
      a.play().then(tick, viaTTS);
      return;
    }
    viaTTS();
    function viaTTS(){
      var offs = [], p = 0; words.forEach(function(w){ offs.push(p); p += w.length + 1; });
      var step = 440 / r, i = 0, timer = null, viaBoundary = false, started = false;
      function start(){ if (started) return; started = true; upto(0); timer = setInterval(function(){ if (tok !== NOW.token){ clearInterval(timer); return done(); } if (viaBoundary) return; i++; if (i < syls.length) upto(i); else { clearInterval(timer); finish(); } }, step); }
      var ok = tts(text, r, {
        start: start,
        boundary: function(ci){ viaBoundary = true; var k = 0; for (var j=0;j<offs.length;j++) if (offs[j] <= ci) k = j; upto(k); },
        end: function(){ if (viaBoundary){ clearInterval(timer); finish(); } }
      });
      setTimeout(start, ok ? 1200 : 0);   // no voice installed: still run the highlight
    }
  });
}
function sayBtn(text){ var b = el("button",{"class":"say","type":"button","aria-label":"Nghe: "+text,"title":"Nghe"},SPK); b.addEventListener("click", function(e){ e.stopPropagation(); speak(text); }); return b; }

/* ── tabs & progress: six steps = six tones of this song's syllable ── */
var panels = $$(".panel");
var PROG = panels.filter(function(p){ return !p.dataset.noprog && p.id !== "p-intro"; }).map(function(p){ return p.id; });
var tabs = $("#tabs"), ST = D.steps || {};
var META = {"p-intro":["00",null,"♪",""],"p-warm":["01","ngang",MA[0],ST.warm],"p-gist":["02","huyen",MA[1],ST.gist],"p-lyrics":["03","sac",MA[2],ST.lyrics],"p-lang":["04","hoi",MA[3],ST.lang],"p-create":["05","nga",MA[4],ST.create],"p-talk":["06","nang",MA[5],ST.talk],"p-teacher":["GV",null,"GV",""]};
var NOTE_SVG = '<svg class="tc" viewBox="0 0 40 24" aria-hidden="true"><path d="M24 19 V3 L33 6"/><circle cx="20" cy="19" r="4.2"/></svg>';
var KEY_SVG = '<svg class="tc" viewBox="0 0 40 24" aria-hidden="true"><path d="M14 11 V8 a6 6 0 0 1 12 0 V11"/><path d="M10 11 H30 V22 H10 Z"/></svg>';
function stepIcon(m, cls){ if (m[1]) return toneSvg(m[1], cls); return (m[0]==="GV" ? KEY_SVG : NOTE_SVG).replace('class="tc"', 'class="'+cls+'"'); }
panels.forEach(function(p, i){
  var m = META[p.id] || [String(i).padStart(2,"0"), null, "", ""];
  var kick = m[1] ? 'Bước '+m[0]+' · thanh '+TONE_NAME[m[1]]+' · <i>'+m[2]+'</i>' : (p.id==="p-teacher" ? "Dành cho giáo viên" : "Dạo đầu · prelude");
  var head = el("div",{"class":"ph-head"}, '<div class="ph-tone">'+stepIcon(m,"tbig")+'<span class="syl-big">'+m[2]+'</span></div><div><div class="ph-k">'+kick+'</div><h2 class="ph-t">'+esc(p.dataset.title)+'</h2></div>'+(m[3] ? '<div class="ph-m">'+m[3]+' phút</div>' : ''));
  p.insertBefore(head, p.firstChild);
  var b = el("button",{"class":"tab","role":"tab","type":"button","aria-controls":p.id,"data-i":i}, stepIcon(m,"tc")+'<span class="tl"><b>'+m[0]+'</b>'+esc(p.dataset.title)+'</span><span class="ts">'+(m[1] ? m[2]+' · '+TONE_NAME[m[1]] : (p.id==="p-teacher" ? "cần mã" : "bắt đầu"))+'</span>');
  b.addEventListener("click", function(){ go(i); });
  tabs.appendChild(b);
});
function go(i){
  panels.forEach(function(p, j){ p.classList.toggle("on", j===i); });
  $$(".tab").forEach(function(t, j){ t.setAttribute("aria-selected", j===i ? "true":"false"); if (j===i && t.parentNode.scrollWidth > t.parentNode.clientWidth) t.parentNode.scrollTo({left: t.offsetLeft - t.parentNode.clientWidth/2 + t.offsetWidth/2, behavior:"smooth"}); });
  S.tab = i; save();
  var top = $("nav.tabs").offsetTop;
  if (window.scrollY > top) window.scrollTo({top: top, behavior:"smooth"});
}
$("#flow").innerHTML = panels.filter(function(p){ return META[p.id] && META[p.id][1]; }).map(function(p){ var m = META[p.id]; return '<div class="fs">'+toneSvg(m[1],"tc")+'<b>'+m[0]+' · '+esc(p.dataset.title)+'</b><span>'+m[2]+' · '+m[3]+' phút</span></div>'; }).join("");
$("#footTones").innerHTML = TONES.map(function(t, k){ return '<span>'+toneSvg(t,"tc")+MA[k]+'</span>'; }).join("");
$$("[data-go]").forEach(function(b){ b.addEventListener("click", function(){ go(+b.dataset.go); }); });
function mark(panelId){
  if (!S.done[panelId]){ S.done[panelId] = true; save(); toast("✓ Đã hoàn thành: " + $("#"+panelId).dataset.title); }
  renderProg();
}
function renderProg(){
  var n = PROG.filter(function(id){ return S.done[id]; }).length;
  var la = $("#laLine");
  if (!la.dataset.built){ $$(".ll", la).forEach(function(l){ l.innerHTML = sylHTML(l.textContent); }); la.dataset.built = "1"; }
  var syls = $$(".syl", la), k = Math.round(syls.length * n / PROG.length);
  syls.forEach(function(x, j){ x.classList.toggle("sung", j < k); });
  $("#progLabel").textContent = n+" / "+PROG.length+" phần";
  $$(".tab").forEach(function(t){ t.classList.toggle("done", !!S.done[t.getAttribute("aria-controls")]); });
}

/* ═══ 1 · WARM-UP ═══ */
var VOCAB = D.vocab, MODEL = D.model;
(function(){
  var box = $("#titleGuess");
  D.titleOpts.forEach(function(o, i){
    var b = el("button",{"class":"opt","type":"button"}, "<span>"+esc(o.t)+' <span class="en">· '+esc(o.en)+"</span></span>");
    if (S.titleGuess === i) b.classList.add("sel");
    b.addEventListener("click", function(){
      S.titleGuess = i; save();
      $$(".opt", box).forEach(function(x){ x.classList.remove("sel"); }); b.classList.add("sel");
      fb("titleFb","mid","Đã lưu dự đoán. Bạn sẽ kiểm tra ở <b>Bước 2</b>. <span class='en'>Prediction saved, check it while you listen.</span>");
    });
    box.appendChild(b);
  });
})();
(function(){
  var g = $("#vgrid");
  VOCAB.forEach(function(v, vi){
    var c = el("div",{"class":"vcard","tabindex":"0","role":"button","aria-label":v.vi},
      '<div class="in"><div class="f"><span class="no">'+String(vi+1).padStart(2,"0")+' / '+VOCAB.length+'</span><div class="w">'+sylHTML(v.vi)+'</div></div>'+
      '<div class="b"><div class="m">'+esc(v.en)+'</div><div class="serif">'+esc(v.ex)+'</div><i>'+esc(v.exEn)+'</i></div></div>');
    c.appendChild(sayBtn(v.vi));
    var exb = sayBtn(v.ex); exb.classList.add("say-ex"); exb.setAttribute("aria-label", "Nghe câu ví dụ: " + v.ex); $(".b", c).appendChild(exb);
    function flip(){ c.classList.toggle("flip"); }
    c.addEventListener("click", flip);
    c.addEventListener("keydown", function(e){ if (e.key==="Enter"||e.key===" "){ e.preventDefault(); flip(); } });
    g.appendChild(c);
  });
})();
var MATCH = VOCAB.slice(0,8);
function buildMatch(){
  var m = $("#match"); m.innerHTML = "";
  var opts = shuffle(MATCH.map(function(v){ return v.en; }));
  MATCH.forEach(function(v){
    var r = el("div",{"class":"mr"});
    r.appendChild(el("div",{"class":"serif"},"<b>"+esc(v.vi)+"</b>"));
    var s = el("select",{"aria-label":"Nghĩa của "+v.vi});
    s.appendChild(el("option",{value:""},"— chọn nghĩa —"));
    opts.forEach(function(o){ s.appendChild(el("option",{value:o},esc(o))); });
    s.dataset.ans = v.en;
    r.appendChild(s); r.appendChild(sayBtn(v.vi));
    m.appendChild(r);
  });
}
buildMatch();
$("#matchCheck").addEventListener("click", function(){
  var ok = 0, sel = $$("#match select");
  sel.forEach(function(s){ var r = s.value===s.dataset.ans; s.classList.toggle("right", r); s.classList.toggle("wrong", !!s.value && !r); if (r) ok++; });
  if (ok===sel.length){ fb("matchFb","ok","Tuyệt vời! "+ok+"/"+sel.length+". Bạn đã sẵn sàng để nghe."); mark("p-warm"); }
  else fb("matchFb", ok>=5?"mid":"bad", ok+"/"+sel.length+" đúng. Lật lại thẻ ở trên để xem nghĩa, rồi thử lại.");
});
$("#matchReset").addEventListener("click", function(){ buildMatch(); $("#matchFb").className="fb"; });

/* ═══ 2 · GIST ═══ */
function ytId(u){
  var m = String(u).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : (/^[A-Za-z0-9_-]{11}$/.test(u.trim()) ? u.trim() : null);
}
function setVideo(id){
  if (!id) return;
  $("#video").innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/'+id+'" title="'+esc(D.title)+'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}
$("#ytSet").addEventListener("click", function(){
  var id = ytId($("#ytUrl").value);
  if (!id){ toast("Link YouTube chưa đúng."); return; }
  S.yt = id; save(); setVideo(id);
});
if (S.yt){ setVideo(S.yt); $("#ytUrl").value = "https://youtu.be/"+S.yt; }
(function(){
  var box = $("#gistQs"); S.gist = S.gist || {};
  D.gist.forEach(function(g, gi){
    var q = el("div",{"class":"q"}, '<div class="qt">'+(gi+1)+'. '+g.q+' <span class="en">'+esc(g.en)+'</span></div>');
    var f = el("div",{"class":"fb"});
    if (g.type === "num"){
      var r = el("div",{"class":"row"});
      var inp = el("input",{"class":"txt","type":"number","min":"0","max":"30","style":"width:110px"});
      var b = el("button",{"class":"btn sm","type":"button"},"Kiểm tra");
      b.addEventListener("click", function(){
        var right = +inp.value === g.a;
        f.className = "fb show " + (right?"ok":"bad"); f.innerHTML = right ? g.ok : g.no;
        if (right){ S.gist[gi]=1; save(); gistDone(); }
      });
      r.appendChild(inp); r.appendChild(b); q.appendChild(r);
    } else {
      var os = el("div",{"class":"opts"});
      g.opts.forEach(function(o, oi){
        var b2 = el("button",{"class":"opt","type":"button"}, esc(o));
        b2.addEventListener("click", function(){
          $$(".opt", os).forEach(function(x){ x.classList.remove("right","wrong"); });
          var right = oi === g.a;
          b2.classList.add(right?"right":"wrong");
          f.className = "fb show " + (right?"ok":"bad"); f.innerHTML = right ? g.ok : (g.no || "Chưa đúng. Nghe lại nhé.");
          if (right){ S.gist[gi]=1; save(); gistDone(); }
        });
        os.appendChild(b2);
      });
      q.appendChild(os);
    }
    q.appendChild(f); box.appendChild(q);
  });
  var mq = $("#moodNo"); if (mq) mq.textContent = (D.gist.length + 1) + ".";
})();
function gistDone(){ if (Object.keys(S.gist).length >= D.gist.length && S.moods) mark("p-gist"); }
(function(){
  var box = $("#moods");
  D.moods.forEach(function(m){
    var p = el("button",{"class":"pill","type":"button"}, m);
    if (S.moods && S.moods.indexOf(m) > -1) p.classList.add("sel");
    p.addEventListener("click", function(){ p.classList.toggle("sel"); });
    box.appendChild(p);
  });
  $("#moodSave").addEventListener("click", function(){
    var sel = $$(".pill.sel", box).map(function(p){ return p.textContent; });
    if (!sel.length){ toast("Chọn ít nhất một từ."); return; }
    S.moods = sel; save();
    fb("moodFb","ok","Bạn thấy bài hát <b>"+esc(sel.join(", "))+"</b>. Hãy nói với bạn cùng lớp: <i>“Bài hát này làm mình thấy… vì…”</i>. "+(D.moodNote || ""));
    gistDone();
  });
})();

/* ═══ 3 · LYRICS TOOLS (built from lyrics the teacher pastes; never published) ═══ */
var lines = [], usingDemo = false, level = 1, gaps = [];
function setLyrics(text, demo){
  lines = String(text||"").normalize("NFC").split(/\r?\n/).map(function(s){ return s.trim(); }).filter(Boolean);
  usingDemo = !!demo;
  $("#lyricTools").style.display = lines.length ? "" : "none";
  $("#lyricsStatus").textContent = lines.length ? (lines.length+" dòng"+(demo?" · bài mẫu OV":" · lời bài hát")) : "";
  $("#srcNote").innerHTML = demo
    ? "Đang dùng <b>bài mẫu của OV</b> (không phải lời bài hát) để luyện tập. Dán lời bài hát ở trên để luyện với bài hát thật."
    : "Đang dùng lời bài hát bạn đã dán. Mở bài hát ở Bước 2 trong lúc làm bài.";
  buildGap(); buildOrder(); buildHunt();
}
$("#lyricsSave").addEventListener("click", function(){
  var t = $("#lyricsIn").value.trim();
  if (t.split(/\n/).length < 3){ toast("Hãy dán lời bài hát, mỗi câu hát một dòng."); return; }
  S.lyrics = t; save(); setLyrics(t, false); toast("Đã lưu lời bài hát trên máy này.");
});
$("#lyricsDemo").addEventListener("click", function(){ setLyrics(MODEL.join("\n"), true); });
$("#lyricsClear").addEventListener("click", function(){ delete S.lyrics; save(); $("#lyricsIn").value=""; setLyrics("", false); });
$$("#ltabs button").forEach(function(b){
  b.addEventListener("click", function(){
    $$("#ltabs button").forEach(function(x){ x.classList.toggle("on", x===b); });
    $$("[data-ltp]").forEach(function(p){ p.hidden = p.dataset.ltp !== b.dataset.lt; });
  });
});
$$("#lvl button").forEach(function(b){
  b.addEventListener("click", function(){ $$("#lvl button").forEach(function(x){ x.classList.toggle("on", x===b); }); level = +b.dataset.l; buildGap(); });
});
$("#gapNew").addEventListener("click", buildGap);
$("#showBank").addEventListener("change", function(){ $("#bank").style.display = this.checked ? "" : "none"; });

var TARGETS = VOCAB.map(function(v){ return norm(v.vi); }).concat((D.targets || []).map(norm));
function buildGap(){
  var box = $("#gapLines"), bank = $("#bank"); box.innerHTML = ""; bank.innerHTML = ""; gaps = []; $("#gapFb").className = "fb";
  if (!lines.length) return;
  var step = level===1 ? 0 : (level===2 ? 4 : 2), counter = 0;
  lines.forEach(function(line){
    var toks = line.split(/\s+/);
    var lowered = toks.map(function(t){ return norm(t); });
    var blank = {}, keep = startLen(line);
    if (level === 1){
      // blank this song's target words (multi-syllable aware)
      TARGETS.forEach(function(tg){
        var parts = tg.split(" ");
        for (var i=0;i<=lowered.length-parts.length;i++){
          var hit = true;
          for (var j=0;j<parts.length;j++) if (lowered[i+j] !== parts[j]) { hit=false; break; }
          if (hit) for (var j2=0;j2<parts.length;j2++) blank[i+j2] = true;
        }
      });
    } else {
      toks.forEach(function(t, i){
        if (i < keep || !norm(t)) return;   // keep the song's line opener (Có… / Hôm qua… / Khi…)
        counter++; if (counter % step === 0) blank[i] = true;
      });
    }
    var ln = el("div",{"class":"ln"});
    toks.forEach(function(t, i){
      if (blank[i] && norm(t)){
        var core = t.match(/^([^\wÀ-ỹ]*)(.*?)([^\wÀ-ỹ]*)$/i) || ["",'',t,''];
        var inp = el("input",{"class":"gap","type":"text","autocomplete":"off","autocapitalize":"off","spellcheck":"false","aria-label":"Chỗ trống"});
        inp.style.width = Math.max(3.2, norm(t).length*0.72+1.4)+"em";
        inp.dataset.ans = core[2];
        inp.addEventListener("input", markBank);
        if (core[1]) ln.appendChild(document.createTextNode(core[1]));
        ln.appendChild(inp);
        if (core[3]) ln.appendChild(document.createTextNode(core[3]));
        ln.appendChild(document.createTextNode(" "));
        gaps.push(inp);
      } else ln.appendChild(document.createTextNode(t+" "));
    });
    box.appendChild(ln);
  });
  shuffle(gaps.map(function(g){ return norm(g.dataset.ans); })).forEach(function(w){ bank.appendChild(el("span",null,esc(w))); });
  bank.style.display = $("#showBank").checked ? "" : "none";
  if (!gaps.length) box.insertBefore(el("p",{"class":"muted small"},"Không tìm thấy từ mục tiêu ở mức Dễ. Hãy chọn mức Vừa hoặc Khó."), box.firstChild);
}
function markBank(){
  var typed = gaps.map(function(g){ return norm(g.value); });
  $$("#bank span").forEach(function(s){
    var i = typed.indexOf(s.textContent);
    if (i > -1){ typed[i] = null; s.classList.add("used"); } else s.classList.remove("used");
  });
}
$("#gapCheck").addEventListener("click", function(){
  if (!gaps.length) return;
  var ok=0, near=0;
  gaps.forEach(function(g){
    var a = norm(g.dataset.ans), v = norm(g.value);
    g.classList.remove("right","wrong","near");
    if (v === a){ g.classList.add("right"); ok++; }
    else if (v && bare(v) === bare(a)){ g.classList.add("near"); near++; }
    else if (v) g.classList.add("wrong");
  });
  var pct = Math.round(100*ok/gaps.length);
  var msg = ok+"/"+gaps.length+" đúng ("+pct+"%)"+(near?" · <b>"+near+"</b> chỗ gần đúng: kiểm tra lại dấu thanh/dấu nguyên âm.":"");
  fb("gapFb", pct>=80?"ok":(pct>=50?"mid":"bad"), '<span class="score">'+pct+'<small>điểm</small></span><span>'+msg+'</span>');
  if (pct >= 70){ S.gapOk = true; save(); lyricsDone(); }
});
$("#gapHint").addEventListener("click", function(){
  gaps.forEach(function(g){ if (norm(g.value) !== norm(g.dataset.ans)) { g.value = ""; g.placeholder = g.dataset.ans.charAt(0) + "…"; } });
});
$("#gapShow").addEventListener("click", function(){
  gaps.forEach(function(g){ if (norm(g.value) !== norm(g.dataset.ans)){ g.value = g.dataset.ans; g.classList.remove("wrong","near"); g.classList.add("near"); } });
  markBank();
});

var orderCorrect = [];
function buildOrder(){
  var ol = $("#orderList"); ol.innerHTML = ""; $("#orderFb").className = "fb";
  if (!lines.length) return;
  var seen = {};
  orderCorrect = lines.filter(function(l){
    var k = norm(l);
    if (!startLen(l) || seen[k]) return false;
    seen[k] = 1; return true;
  });
  if (orderCorrect.length < 3) orderCorrect = lines.filter(function(l){ var k=norm(l); if (seen["_"+k]) return false; seen["_"+k]=1; return true; }).slice(0, 8);
  var sh = shuffle(orderCorrect);
  for (var tries=0; tries<5 && sh.join("|")===orderCorrect.join("|"); tries++) sh = shuffle(orderCorrect);
  sh.forEach(function(l){ ol.appendChild(orderItem(l)); });
}
function orderItem(text){
  var li = el("li");
  li.appendChild(el("span",{"class":"t"},esc(text)));
  var up = el("button",{"class":"mv","type":"button","aria-label":"Lên"},"▲");
  var dn = el("button",{"class":"mv","type":"button","aria-label":"Xuống"},"▼");
  up.addEventListener("click", function(){ if (li.previousElementSibling) li.parentNode.insertBefore(li, li.previousElementSibling); clearOrder(); });
  dn.addEventListener("click", function(){ if (li.nextElementSibling) li.parentNode.insertBefore(li.nextElementSibling, li); clearOrder(); });
  li.appendChild(up); li.appendChild(dn);
  return li;
}
function clearOrder(){ $$("#orderList li").forEach(function(li){ li.classList.remove("right","wrong"); }); }
$("#orderCheck").addEventListener("click", function(){
  var items = $$("#orderList li"), ok = 0;
  items.forEach(function(li, i){ var r = $(".t",li).textContent === orderCorrect[i]; li.classList.toggle("right", r); li.classList.toggle("wrong", !r); if (r) ok++; });
  if (ok === items.length){ fb("orderFb","ok","Hoàn hảo! Bạn đã sắp xếp đúng cả "+ok+" câu."); S.orderOk = true; save(); lyricsDone(); }
  else fb("orderFb", ok>=items.length/2?"mid":"bad", ok+"/"+items.length+" câu đúng vị trí. Nghe lại đoạn đó và sửa những câu màu đỏ.");
});
$("#orderShuffle").addEventListener("click", buildOrder);
function buildHunt(){
  var h = $("#hunt"); h.innerHTML = ""; $("#huntFb").className = "fb";
  VOCAB.forEach(function(v){ h.appendChild(el("span",{"data-w":v.vi}, esc(v.vi))); });
  var cs = D.countStart, out = $("#coCount");
  if (!out) return;
  if (!cs || !lines.length){ out.innerHTML = ""; return; }
  var p = norm(cs.phrase), cnt = 0, uniq = {};
  lines.forEach(function(l){ var k = norm(l); if (startsWith(k, p)){ cnt++; uniq[k] = 1; } });
  out.innerHTML = "Trong văn bản này có <b>"+cnt+"</b> dòng bắt đầu bằng "+cs.label+" (<b>"+Object.keys(uniq).length+"</b> dòng khác nhau). "+(cs.note || "");
}
$("#huntReveal").addEventListener("click", function(){
  var all = " " + lines.map(norm).join(" ") + " ", hits = 0;
  $$("#hunt span").forEach(function(s){
    var w = norm(s.dataset.w), re = new RegExp("(^|\\s)"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?=\\s|$)");
    var h = re.test(all); s.classList.toggle("hit", h); if (h) hits++;
  });
  fb("huntFb","ok","<b>"+hits+"</b>/"+VOCAB.length+" từ ở Bước 1 xuất hiện trong "+(usingDemo?"bài mẫu":"lời bài hát")+". Những từ còn lại vẫn hữu ích cho bài viết của bạn ở Bước 5!");
  S.huntOk = true; save(); lyricsDone();
});
function lyricsDone(){ if (S.huntOk && (S.gapOk || S.orderOk)) mark("p-lyrics"); }
if (S.lyrics){ $("#lyricsIn").value = S.lyrics; setLyrics(S.lyrics, false); } else setLyrics("", false);

/* ═══ 4 · LANGUAGE ═══ */
var sortSel = null, SORT = D.sort;
function buildSort(){
  var pool = $("#sortPool"), bins = $("#bins"); pool.innerHTML = ""; bins.innerHTML = ""; sortSel = null; $("#sortFb").className="fb";
  bins.style.setProperty("--bins", SORT.bins.length);
  shuffle(SORT.items).forEach(function(s){
    var it = el("span",{"class":"si","tabindex":"0","role":"button"}, esc(s.t)); it.dataset.k = s.k;
    function pick(){ $$(".si.sel").forEach(function(x){ x.classList.remove("sel"); }); sortSel = it; it.classList.add("sel"); }
    it.addEventListener("click", function(e){ e.stopPropagation(); pick(); });
    it.addEventListener("keydown", function(e){ if (e.key==="Enter"){ pick(); } });
    pool.appendChild(it);
  });
  SORT.bins.forEach(function(b){
    var d = el("div",{"class":"bin","data-k":b.k,"tabindex":"0","role":"button"}, "<h4>"+b.h+"</h4>");
    function drop(){ if (!sortSel) { toast("Chọn một câu trước."); return; } sortSel.classList.remove("sel","right","wrong"); d.appendChild(sortSel); sortSel = null; }
    d.addEventListener("click", drop);
    d.addEventListener("keydown", function(e){ if (e.key==="Enter") drop(); });
    bins.appendChild(d);
  });
}
buildSort();
$("#sortCheck").addEventListener("click", function(){
  var ok = 0, placed = 0;
  $$(".bin").forEach(function(b){ $$(".si", b).forEach(function(s){ placed++; var r = s.dataset.k===b.dataset.k; s.classList.toggle("right", r); s.classList.toggle("wrong", !r); if (r) ok++; }); });
  if (placed < SORT.items.length){ fb("sortFb","mid","Còn "+(SORT.items.length-placed)+" câu chưa xếp."); return; }
  if (ok === SORT.items.length){ fb("sortFb","ok", SORT.ok); S.sortOk=true; save(); langDone(); }
  else fb("sortFb","bad",ok+"/"+SORT.items.length+". "+SORT.hint);
});
$("#sortReset").addEventListener("click", buildSort);
(function(){
  var P = D.pairs, m = $("#simile"), ends = shuffle(P.items.map(function(s){ return s.b; }));
  P.items.forEach(function(s){
    var r = el("div",{"class":"mr"}); r.style.gridTemplateColumns = "minmax(160px,1fr) 1fr 32px";
    r.appendChild(el("div",{"class":"serif"}, esc(s.a)));
    var sel = el("select"); sel.appendChild(el("option",{value:""},"— chọn —"));
    ends.forEach(function(e){ sel.appendChild(el("option",{value:e},esc(e))); });
    sel.dataset.ans = s.b; r.appendChild(sel);
    var sb = el("button",{"class":"say","type":"button","title":"Nghe"},SPK);
    sb.addEventListener("click", function(){ speak(s.a.replace("…"," ") + " " + (sel.value || s.b)); });
    r.appendChild(sb);
    m.appendChild(r);
  });
  $("#simCheck").addEventListener("click", function(){
    var ok = 0, all = $$("#simile select");
    all.forEach(function(s){ var r = s.value===s.dataset.ans; s.classList.toggle("right",r); s.classList.toggle("wrong",!!s.value&&!r); if (r) ok++; });
    if (ok === all.length){ fb("simFb","ok", P.ok); S.simOk=true; save(); langDone(); }
    else fb("simFb", ok>=all.length-2?"mid":"bad", ok+"/"+all.length+". "+P.hint);
  });
})();
(function(){
  var box = $("#cloze");
  D.cloze.forEach(function(c, ci){
    var q = el("div",{"class":"q"});
    var parts = c.s.split("___");
    var sel = el("select",{"aria-label":"Chọn từ"}); sel.style.cssText = "width:auto;padding:4px 8px;margin:0 4px";
    sel.appendChild(el("option",{value:""},"……"));
    c.o.forEach(function(o, oi){ sel.appendChild(el("option",{value:oi},esc(o))); });
    sel.dataset.ans = c.a;
    var line = el("div",{"class":"serif","style":"font-size:1.05rem"});
    line.appendChild(document.createTextNode((ci+1)+". "+parts[0])); line.appendChild(sel); line.appendChild(document.createTextNode(parts[1]));
    q.appendChild(line);
    q.appendChild(el("div",{"class":"en small","style":"margin-top:4px"}, esc(c.en)));
    box.appendChild(q);
  });
  $("#clozeCheck").addEventListener("click", function(){
    var ok = 0, all = $$("#cloze select");
    all.forEach(function(s){ var r = s.value===String(s.dataset.ans); s.classList.toggle("right", r); s.classList.toggle("wrong", !!s.value && !r); if (r) ok++; });
    if (ok===all.length){ fb("clozeFb","ok","Đúng hết! "+ok+"/"+all.length+"."+(D.clozeOk ? " "+D.clozeOk : "")); S.clozeOk=true; save(); langDone(); }
    else fb("clozeFb", ok>=all.length-2?"mid":"bad", ok+"/"+all.length+". "+(D.clozeHint || "Đọc câu tiếng Anh bên dưới để đoán nghĩa."));
  });
})();
function langDone(){ if (S.sortOk && S.simOk && S.clozeOk) mark("p-lang"); }
(function(){
  var sh = $("#shadow");
  $("#toneLegend").innerHTML = TONES.map(function(t, k){ return '<button type="button" data-say="'+MA[k]+'" aria-label="Nghe: '+MA[k]+', thanh '+TONE_NAME[t]+'">'+toneSvg(t,"tc")+'<b>'+MA[k]+'</b>'+TONE_NAME[t]+'</button>'; }).join("");
  $$("#toneLegend button").forEach(function(b){ b.addEventListener("click", function(){ speak(b.dataset.say); }); });
  MODEL.forEach(function(l){
    var r = el("div",{"class":"sl"}), line = el("span",{"class":"pl"}, sylHTML(l));
    var b = el("button",{"class":"say","type":"button","aria-label":"Hát: "+l,"title":"Hát karaoke"}, SPK);
    b.addEventListener("click", function(){ karaoke(line); });
    r.appendChild(b); r.appendChild(line); sh.appendChild(r);
  });
  $("#rate").addEventListener("input", function(){ $("#rateV").textContent = this.value+"×"; });
})();

/* ═══ 5 · CREATE ═══ */
var C = D.compose;
$("#modelPoem").innerHTML = MODEL.map(function(l){ return '<div class="pl">'+sylHTML(l, true)+'</div>'; }).join("");
$("#modelKara").addEventListener("click", function(){ karaoke($("#modelPoem"), 0.85); });
var lastFocus = null;
function prefill(i){ return Array.isArray(C.prefill) ? (C.prefill[i] || "") : (C.prefill || ""); }
(function(){
  var c = $("#compose"); S.poem = S.poem || [];
  for (var i=0;i<C.lines;i++){
    var r = el("div",{"class":"cl"});
    r.appendChild(el("span",{"class":"no"}, i+1));
    var inp = el("input",{"class":"txt","type":"text","aria-label":"Câu "+(i+1)});
    inp.value = S.poem[i] || prefill(i);
    inp.addEventListener("focus", function(){ lastFocus = this; });
    inp.addEventListener("input", function(){ S.poem = $$("#compose input").map(function(x){ return x.value; }); save(); });
    r.appendChild(inp);
    (function(inp){ var sb = el("button",{"class":"say","type":"button","title":"Nghe"},SPK); sb.addEventListener("click", function(){ speak(inp.value); }); r.appendChild(sb); })(inp);
    c.appendChild(r);
  }
  var wb = $("#wordbank");
  D.wordbank.forEach(function(g){
    var row = el("div",{"class":"wb"}); row.appendChild(el("span",{"class":"lab"}, g.lab));
    g.w.forEach(function(w){
      var b = el("button",{"type":"button"}, esc(w));
      b.addEventListener("mousedown", function(e){ e.preventDefault(); });
      b.addEventListener("click", function(){
        var ins = $$("#compose input");
        var t = lastFocus || ins.filter(function(x, i){ return norm(x.value) === norm(prefill(i)); })[0] || ins[0];
        var v = t.value; t.value = v + (/\s$/.test(v)||!v ? "" : " ") + w + " "; t.focus(); lastFocus = t;
        t.dispatchEvent(new Event("input"));
      });
      row.appendChild(b);
    });
    wb.appendChild(row);
  });
})();
function poemLines(){ return $$("#compose input").map(function(x){ return x.value.trim(); }); }
function hasLay(v){   // a reduplicated pair: two neighbouring syllables with the same letters (be bé, xinh xinh, lành lạnh)
  var w = v.split(" ");
  for (var i=0;i<w.length-1;i++) if (w[i].length > 1 && bare(w[i]) === bare(w[i+1])) return true;
  return false;
}
$("#poemCheck").addEventListener("click", function(){
  var ins = $$("#compose input"), ls = poemLines(), good = 0, issues = [], counts = C.needs.map(function(){ return 0; });
  var starts = (C.starts || []).map(norm);
  ins.forEach(function(inp, i){
    var v = norm(ls[i]), words = v ? v.split(" ").length : 0;
    var ok = words >= (C.minWords || 4) && (!starts.length || starts.some(function(p){ return startsWith(v, p); })) && (!C.comma || /,/.test(ls[i]));
    inp.classList.toggle("okline", ok); inp.classList.toggle("badline", !ok);
    if (ok) good++;
    C.needs.forEach(function(n, k){
      if (n.kind === "lay" ? hasLay(v) : n.kind === "start" ? startsWith(v, norm(n.phrase)) : new RegExp(n.re).test(v)) counts[k]++;
    });
  });
  if (good < C.lines) issues.push((C.lines-good)+" câu cần "+C.lineRule+".");
  C.needs.forEach(function(n, k){ if (counts[k] < n.min) issues.push("Thêm "+(n.min-counts[k])+" "+n.label+"."); });
  if (!issues.length){ fb("poemFb","ok", C.ok); S.poemOk = true; save(); mark("p-create"); }
  else fb("poemFb","mid", issues.join("<br>"));
  $("#poemView").innerHTML = ls.filter(Boolean).map(function(l){ return '<div class="pl">'+sylHTML(l, true)+'</div>'; }).join("") + '<div class="small muted" style="margin-top:10px">— '+esc(C.title)+' · '+esc(C.signature)+'</div>';
  $("#poemOut").style.display = "block";
});
$("#poemRead").addEventListener("click", function(){ speak(poemLines().filter(Boolean).join(". "), 0.8); });
$("#poemKara").addEventListener("click", function(){ karaoke($("#poemView"), 0.85); });
$("#poemCopy").addEventListener("click", function(){
  var t = poemLines().filter(Boolean).join("\n");
  if (navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ toast("Đã sao chép."); }, function(){ toast("Không sao chép được."); });
});
$("#poemPrint").addEventListener("click", function(){
  var w = window.open("", "_blank"); if (!w) return;
  w.document.write('<!DOCTYPE html><meta charset="utf-8"><title>'+esc(C.title)+'</title><body style="font-family:Georgia,serif;font-size:20px;line-height:1.9;padding:40px"><h2>'+esc(C.title)+'</h2>'+poemLines().filter(Boolean).map(esc).join("<br>")+'<p style="font-size:13px;color:#777;margin-top:30px">Open Vietnamese · Học tiếng Việt qua bài hát</p></body>');
  w.document.close(); w.print();
});
(function(){
  var b = $("#selfcheck"); S.self = S.self || {};
  D.self.forEach(function(s, i){
    var l = el("label",{"style":"display:flex;gap:10px;padding:6px 0;cursor:pointer"});
    var c = el("input",{"type":"checkbox"}); c.checked = !!S.self[i];
    c.addEventListener("change", function(){ S.self[i] = c.checked; save(); });
    l.appendChild(c); l.appendChild(el("span",null,esc(s))); b.appendChild(l);
  });
})();

/* ═══ 6 · FINISH ═══ */
$("#finish").addEventListener("click", function(){
  mark("p-talk");
  var n = PROG.filter(function(id){ return S.done[id]; }).length;
  fb("finishFb", n===PROG.length?"ok":"mid", n===PROG.length ? '<span class="score">100<small>điểm</small></span>'+(D.finish || "Chúc mừng! Bạn đã hoàn thành cả 6 phần. Hẹn gặp lại ở bài hát tiếp theo.") : "Bạn đã xong "+n+"/"+PROG.length+" phần. Các phần chưa có dấu ✓ trên thanh bước vẫn đang chờ bạn.");
});
$("#resetAll").addEventListener("click", function(){
  if (!confirm("Xoá toàn bộ tiến độ, lời bài hát và bài viết đã lưu trên máy này?")) return;
  localStorage.removeItem(KEY); location.reload();
});

/* ═══ TEACHER GATE (soft lock: keeps notes out of learners' way; not real security) ═══ */
var TKEY = "ov-lvs-teacher";
function teacherView(open){
  $("#tGate").hidden = open; $("#tBody").hidden = !open;
  var t = $$(".tab").filter(function(x){ return x.getAttribute("aria-controls")==="p-teacher"; })[0];
  if (t) $(".ts", t).textContent = open ? "đã mở" : "cần mã";
}
$("#tForm").addEventListener("submit", function(e){
  e.preventDefault();
  if ($("#tCode").value.trim().toLowerCase() === "ovteach"){
    try { sessionStorage.setItem(TKEY, "1"); } catch(err){}
    $("#tCode").value = ""; $("#tFb").className = "fb"; teacherView(true);
  } else {
    fb("tFb","bad","Mã chưa đúng. <span class='en'>Incorrect passcode.</span>");
    var g = $("#tGate"); g.classList.remove("shake"); void g.offsetWidth; g.classList.add("shake");
  }
});
$("#tLock").addEventListener("click", function(){ try { sessionStorage.removeItem(TKEY); } catch(err){} teacherView(false); });
teacherView((function(){ try { return sessionStorage.getItem(TKEY) === "1"; } catch(err){ return false; } })());

renderProg();
go(typeof S.tab === "number" && S.tab < panels.length ? S.tab : 0);
})();
