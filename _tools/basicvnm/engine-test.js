(async function(){
const out=[]; const ok=(c,m)=>out.push((c?'PASS ':'FAIL ')+m);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const btnText=(root,t)=>$$('button',root).find(b=>b.textContent.trim()===t);
try{
ok($$('.tab-btn').length===7,'7 tabs: '+$$('.tab-btn').map(b=>b.textContent.trim()).join(' | '));
ok(document.getElementById('bvXpCount').textContent.includes('/'),'xp count '+document.getElementById('bvXpCount').textContent);
// MC wrong then right (bt1 q1)
const q1=$$('#panel-dialogue .q').find(q=>q.textContent.includes('Bây giờ là ___'));
btnText(q1,'7 giờ').click(); await sleep(50);
ok(q1.querySelector('.fb').textContent.includes('Thử lại'),'mc wrong → retry msg: '+q1.querySelector('.fb').textContent);
btnText(q1,'6 giờ rưỡi').click(); await sleep(50);
const st=()=>JSON.parse(localStorage.getItem('basic-vn'))['4'];
ok(st().items['bt1-1'].pts===5,'mc retry worth 5: '+JSON.stringify(st().items['bt1-1']));
// gist reveals transcript
const tx=document.getElementById('d1-tx'); ok(tx.hidden,'transcript hidden before gist');
const g=document.querySelector('#panel-dialogue .gist'); btnText(g,'Sơn dậy muộn và sắp trễ học.').click(); await sleep(50);
ok(!tx.hidden,'transcript revealed after gist');
// builder
const bq=$$('#panel-grammar .q').find(q=>q.textContent.includes('I have dinner at 7'));
for(const t of ['Tôi','ăn tối','lúc','7 giờ']) btnText(bq.querySelector('.build-bank'),t).click();
bq.querySelector('.check-btn').click(); await sleep(50);
ok(st().items['bt4-1'] && st().items['bt4-1'].pts===10,'builder correct first try: '+bq.querySelector('.fb').textContent);
// typing with tone feedback
const tq=$$('#panel-vocab .q').find(q=>q.textContent.includes('early'));
const inp=tq.querySelector('input'); inp.value='som'; tq.querySelector('.check-btn').click(); await sleep(30);
ok(tq.querySelector('.fb').className.includes('near'),'missing tone → near: '+tq.querySelector('.fb').textContent);
inp.value='sớm'; tq.querySelector('.check-btn').click(); await sleep(30);
ok(st().items['bt-vocab-1'].pts===5,'typed correct on 2nd try = 5');
// palette tone placement
const tq2=$$('#panel-vocab .q').find(q=>q.textContent.includes('to go home'));
const i2=tq2.querySelector('input'); const pal=tq2.querySelector('.palette');
const tone=(w,name)=>{ i2.value=w; i2.focus(); i2.setSelectionRange(w.length,w.length); pal.querySelector('[aria-label="Dấu '+name+'"]').click(); return i2.value; };
const cases=[['ngươi','huyền','người'],['hoa','huyền','hoà'],['giơ','huyền','giờ'],['quy','sắc','quý'],['mua','huyền','mùa'],['toan','sắc','toán'],['tuôi','hỏi','tuổi'],['ngoai','huyền','ngoài'],['vê nha','huyền','vê nhà'],['bay','hỏi','bảy'],['ruơi','ngã','ruỡi'],['rươi','ngã','rưỡi'],['mây','sắc','mấy'],['tiêng','sắc','tiếng']];
const bad=cases.filter(([w,n,e])=>tone(w,n)!==e).map(([w,n,e])=>w+'+'+n+'→'+tone(w,n)+' (want '+e+')');
ok(!bad.length,'tone placement '+(bad.join('; ')||cases.length+' cases'));
// letter insert
i2.value='u'; i2.setSelectionRange(1,1); pal.querySelector('[aria-label="Chèn ư"]').click(); ok(i2.value==='uư','letter insert: '+i2.value);
// clock read
const cr=$$('#panel-time .q').filter(q=>q.querySelector('svg.clock')&&q.querySelector('input'));
const tryClock=async(i,v)=>{ const q=cr[i]; q.querySelector('input').value=v; q.querySelector('.check-btn').click(); await sleep(30); return q.querySelector('.fb').className.includes('ok'); };
ok(await tryClock(1,'8 giờ kém 10'),'7:50 = 8 giờ kém 10');
ok(await tryClock(0,'sáu rưỡi'),'6:30 = sáu rưỡi');
ok(await tryClock(2,'Bây giờ là 10h15 sáng'),'10:15 = Bây giờ là 10h15 sáng');
ok(!(await tryClock(3,'8 giờ hơn'))  ,'8:00 ≠ 8 giờ hơn (rejected)');
ok(await tryClock(4,'3:45'),'3:45 digits accepted');
// clock set: 9:00 from 12:00 → 9 hour presses back 3
const cs=$$('#panel-time .q').filter(q=>q.querySelector('.clock-set-controls'))[0];
const minus=cs.querySelector('[aria-label^="Giờ trừ"]'); minus.click(); minus.click(); minus.click();
ok(cs.querySelector('.clock-readout').textContent==='9:00','clock readout '+cs.querySelector('.clock-readout').textContent);
cs.querySelector('.check-btn').click(); await sleep(30); ok(st().items['clock-set-1'].pts===10,'clock set correct');
// match: click correct pair
const mcard=$$('#panel-time .card').find(c=>c.querySelector('.match-grid'));
const L_=$$('.match-col',mcard)[0], R_=$$('.match-col',mcard)[1];
btnText(L_,'12:30').click(); btnText(R_,'Ba giờ bảy phút').click(); await sleep(20);
btnText(L_,'12:30').click(); btnText(R_,'Mười hai rưỡi').click(); await sleep(20);
const mi=Object.entries(st().items).find(([k])=>k.startsWith('bt8-')); ok(mi && mi[1].pts===5,'match after miss = 5 '+JSON.stringify(mi));
// flashcards
const fc=document.querySelector('.flashcard'); fc.click(); await sleep(20);
ok(fc.classList.contains('flipped') && !document.querySelector('.know-btn.yes').disabled,'flashcard flips, rating enabled');
document.querySelector('.know-btn.yes').click(); ok(Object.keys(st().cards).length===1,'known card saved');
// cando before
const cd=document.querySelector('#panel-goals .card .cando-opts'); ok(!!cd,'cando rendered');
// EN toggle
const en=$$('.tool-btn')[0]; en.click(); ok(document.body.classList.contains('hide-en'),'EN toggle hides English'); en.click();
// report tab
document.getElementById('tab-report').click(); await sleep(300);
const rep=document.querySelector('#panel-report .report');
ok(rep && rep.textContent.includes('Kết quả từng phần'),'report renders');
ok(rep.querySelectorAll('table tr').length>3,'report section rows: '+rep.querySelectorAll('table')[0].querySelectorAll('tr').length);
ok(location.hash==='#report','hash = '+location.hash);
// keyboard nav on tabs
document.getElementById('tab-report').dispatchEvent(new KeyboardEvent('keydown',{key:'Home',bubbles:true}));
ok(document.getElementById('tab-goals').getAttribute('aria-selected')==='true','Home key → first tab');
// stars/mastery computed
ok(typeof st().mastery==='number','mastery '+st().mastery+'% xp '+st().xp);
}catch(e){ out.push('FAIL exception '+e.stack); }
const pre=document.createElement('pre'); pre.id='RESULTS'; pre.textContent=out.join('\n'); document.body.prepend(pre);
})();
