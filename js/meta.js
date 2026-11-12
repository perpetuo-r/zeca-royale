// Progressão: salvamento, troféus, arenas, baús e níveis de carta
const KEY='zr2',STARTER=['patota','zeca','renata','lufa','leandro','aluno','turma','prova'];
const AR=[{n:'Sala de Aula',t:0,p:['#7ed957','#73cf4f','#4cc9f0']},{n:'Pátio',t:200,p:['#e8d28a','#dcc57a','#4cc9f0']},{n:'Quadra',t:500,p:['#e98a6b','#de7f60','#6bd1ff']},{n:'Sala da Diretoria',t:1000,p:['#b388eb','#a578e0','#5ad1d1']}];
const CP=[2,4,10,20,50,100,200,400],GD=[5,20,50,150,400,1000,2000,4000],MAXL=9; // cartas e ouro por nível
const CH={mad:{n:'Baú de Madeira',k:4,g:[20,40],ic:'📦',pr:150},dou:{n:'Baú Dourado',k:10,g:[80,160],ic:'🎁',pr:450},mag:{n:'Baú Mágico',k:24,g:[250,500],ic:'💎',pr:1500}};
let M=null,TAB=2,SW=0;
try{M=JSON.parse(localStorage[KEY])}catch(e){}
if(!M||!M.cards)M={tr:0,ma:0,gold:100,cards:Object.fromEntries(STARTER.map(id=>[id,{lv:1,n:0}])),deck:[...STARTER],sl:[null,null,null,null],mk:0,w:0,l:0};
const save=()=>{try{localStorage[KEY]=JSON.stringify(M)}catch(e){}};
const LV=id=>M.cards[id]?M.cards[id].lv:1,rnd=(a,b)=>a+(Math.random()*(b-a)|0);
const arena=()=>{let a=0;AR.forEach((r,i)=>{if(M.tr>=r.t)a=i});return a};
const pool=a=>Object.keys(CARDS).filter(id=>CARDS[id].ar<=a);
function addChest(t){const i=M.sl.indexOf(null);if(i<0){M.gold+=CH[t].g[1];return 0}M.sl[i]=t;return 1} // slots cheios viram ouro
function openChest(t){const ids=pool(arena()),got={},nw=[],wt=id=>{const c=CARDS[id].c;return(c<=2?10:c<=4?6:c<=6?3:1)*(M.cards[id]?1:3)},tot=ids.reduce((s,id)=>s+wt(id),0);
 for(let i=0;i<CH[t].k;i++){let r=Math.random()*tot;const id=ids.find(x=>(r-=wt(x))<0)||ids[0];got[id]=(got[id]||0)+1}
 for(const id in got){if(M.cards[id])M.cards[id].n+=got[id];else{M.cards[id]={lv:1,n:got[id]-1};nw.push(id)}}
 const gold=rnd(...CH[t].g);M.gold+=gold;save();return{got,nw,gold}}
function result(w,cr){const old=arena(),r={d:0,g:0,ch:[]};
 if(w==0){r.d=25+5*cr[0];r.g=20+10*cr[0];M.w++;r.ch.push(Math.random()<.2?'dou':'mad')}
 else if(w==1){r.d=-(15+5*cr[1]);M.l++}
 const t0=M.tr;M.tr=Math.max(AR[M.ma||0].t,M.tr+r.d);r.d=M.tr-t0;M.gold+=r.g; // não cai abaixo da arena já alcançada
 for(let m=M.mk+1;m<=M.tr/100|0;m++){r.ch.push(m%5?'dou':'mag');M.mk=m} // baús de marcos de troféus
 r.ch=r.ch.filter(addChest);M.ma=Math.max(M.ma||0,arena());r.ar=arena()>old?AR[arena()].n:null;save();return r}
const cl=()=>{$('det').style.display='none'};
function home(){$('menu').style.display='flex';$('end').style.display='none';render()}
function render(){$('hd').innerHTML=`<span>🏆 ${M.tr}</span><span>${AR[arena()].n}</span><span>💰 ${M.gold}</span>`;
 $('tab').innerHTML=[shop,cards,battle][TAB]();[...$('nav').children].forEach((b,i)=>b.classList.toggle('on',i==TAB))}
function battle(){const a=arena(),A=AR[a],nx=AR[a+1],nm=(M.tr/100|0)*100+100;
 return `<div class="ar" style="background:linear-gradient(${A.p[0]},${A.p[1]})"><h2>${A.n}</h2>Arena ${a+1} · ${M.w}V / ${M.l}D</div>
 <div class="road">🎁 Próximo baú em 🏆 ${nm}<div class="pb"><u style="width:${M.tr%100}%"></u></div>${nx?`Próxima arena: ${nx.n} (🏆 ${nx.t})`:'Arena máxima!'}</div>
 <div class="sl">${M.sl.map((c,i)=>c?`<button class="ch" onclick="openSlot(${i})">${CH[c].ic}<small>${CH[c].n}</small><b>Abrir</b></button>`:'<div class="ch emp">vazio</div>').join('')}</div>
 <button id="go" onclick="start()">⚔️ BATALHA</button>`}
const ch=id=>{const c=M.cards[id],l=c.lv,nd=CP[l-1];return `<div class="cd"><img src="${img(id)}"><i>${CARDS[id].c}</i><b>${CARDS[id].n}</b><em>Nv.${l}</em><div class="pb"><u style="width:${l>=MAXL?100:Math.min(100,c.n/nd*100)}%"></u><span>${l>=MAXL?'MÁX':c.n+'/'+nd}</span></div></div>`};
function cards(){const ids=Object.keys(CARDS);
 return `<h3>Seu deck <small>(toque no slot e depois numa carta)</small></h3><div class="gr">${M.deck.map((id,i)=>`<div class="${SW==i?'sw':''}" onclick="SW=${i};render()">${ch(id)}</div>`).join('')}</div>
 <h3>Coleção ${Object.keys(M.cards).length}/${ids.length}</h3><div class="gr">${ids.map(id=>M.cards[id]?`<div onclick="det('${id}')">${ch(id)}</div>`:'<div class="cd lock">?</div>').join('')}</div>`}
function det(id){const c=CARDS[id],m=M.cards[id],l=m.lv,k=Math.pow(1.1,l-1),can=l<MAXL&&m.n>=CP[l-1]&&M.gold>=GD[l-1];
 $('det').style.display='flex';$('det').innerHTML=`<div class="box"><img src="${img(id)}" width="80"><h2>${c.n}</h2><p>Equivalente: ${c.eq} · Custo ${c.c} · Nv.${l}</p><p>${c.hp?'❤️ '+Math.round(c.hp*k)+' ':''}${c.d?'⚔️ '+Math.round(c.d*k):''}</p>
 ${l<MAXL?`<button ${can?'':'disabled'} onclick="up('${id}')">Melhorar ${m.n}/${CP[l-1]} 🃏 · ${GD[l-1]} 💰</button>`:'<p>Nível máximo!</p>'}
 <button ${M.deck.includes(id)?'disabled':''} onclick="use('${id}')">Usar no slot ${SW+1}</button><button onclick="cl()">Fechar</button></div>`}
function up(id){const m=M.cards[id];m.n-=CP[m.lv-1];M.gold-=GD[m.lv-1];m.lv++;save();det(id);render()}
function use(id){M.deck[SW]=id;save();cl();render()}
function reward(r){$('det').style.display='flex';$('det').innerHTML=`<div class="box"><h2>🎉 Recompensas!</h2><div class="gr">${Object.keys(r.got).map(id=>`<div class="cd"><img src="${img(id)}"><b>${CARDS[id].n}</b><em>x${r.got[id]}${r.nw.includes(id)?' ★NOVA!':''}</em></div>`).join('')}</div><p>+${r.gold} 💰</p><button onclick="cl();render()">Legal!</button></div>`}
function openSlot(i){const t=M.sl[i];M.sl[i]=null;reward(openChest(t))}
function buy(t){M.gold-=CH[t].pr;reward(openChest(t))}
function shop(){return '<h3>Loja de Baús</h3>'+Object.keys(CH).map(t=>`<button class="shp" ${M.gold<CH[t].pr?'disabled':''} onclick="buy('${t}')">${CH[t].ic} ${CH[t].n} (${CH[t].k} cartas) — ${CH[t].pr} 💰</button>`).join('')+`<button onclick="if(confirm('Apagar todo o progresso?')){delete localStorage[KEY];location.reload()}">Apagar progresso</button>`}
