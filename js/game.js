const T=20,W=18,H=32,BR=[4,14],RV=[15,17],cvs=document.getElementById('g'),g=cvs.getContext('2d'),$=i=>document.getElementById(i);
g.imageSmoothingEnabled=false;
let G=null,deck;try{deck=JSON.parse(localStorage.zr)}catch(e){}
if(!Array.isArray(deck)||deck.length!=8)deck=['patota','zeca','renata','lufa','leandro','aluno','diretor','prova'];
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y)-a.rad-b.rad;
const ok=(u,e)=>e.hp>0&&e.team!=u.team&&(!e.fly||u.air)&&(!u.bld||e.tw||e.b);
const shuf=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const img=id=>SP[id].toDataURL();
const cardH=(id,s)=>`<div class="cd ${s?'on':''}"><img src="${img(id)}"><i>${CARDS[id].c}</i><b>${CARDS[id].n}</b></div>`;
function menu(){$('menu').style.display='flex';$('end').style.display='none';
 $('coll').innerHTML=Object.keys(CARDS).map(id=>cardH(id,deck.includes(id)).replace('class=',`data-id="${id}" class=`)).join('');
 $('play').disabled=deck.length!=8;$('play').textContent='JOGAR ('+deck.length+'/8)'}
$('coll').onclick=e=>{const d=e.target.closest('.cd');if(!d)return;const id=d.dataset.id,i=deck.indexOf(id);if(i>=0)deck.splice(i,1);else if(deck.length<8)deck.push(id);menu()};
$('play').onclick=()=>{try{localStorage.zr=JSON.stringify(deck)}catch(e){}start()};
const mkT=(team,x,y,k)=>({team,tw:1,k,x,y,hp:k?2400:1400,mh:k?2400:1400,rad:k?1.5:1.2,rg:k?5:5.8,d:k?65:55,h:k?1:.8,air:1,act:!k,cd:0,tgt:null,dep:0});
function start(){const mkp=d=>{const q=shuf(d);return{hand:q.slice(0,4),q:q.slice(4)}};
 const t=[[mkT(0,3.5,25),mkT(0,14.5,25),mkT(0,9,29,1)],[mkT(1,3.5,7),mkT(1,14.5,7),mkT(1,9,3,1)]];
 G={u:[...t[0],...t[1]],tw:t,p:[mkp(deck),mkp(shuf(Object.keys(CARDS)).slice(0,8))],el:[5,5],cr:[0,0],time:180,ot:0,proj:[],fx:[],sel:null,over:0,at:3,mx:9,my:24};
 $('menu').style.display='none';$('end').style.display='none';rh()}
function fin(w){if(G.over)return;G.over=1;const e=$('end');e.style.display='flex';
 e.innerHTML=`<h2>${w<0?'EMPATE':w==0?'🏆 VITÓRIA!':'💀 DERROTA'}</h2><p>👑 ${G.cr[0]} × ${G.cr[1]}</p><button onclick="menu()">Menu</button>`}
function hurt(e,d){if(e.hp<=0)return;e.hp-=d;
 if(e.tw){if(e.k)e.act=1;if(e.hp<=0){const s=G;s.cr[1-e.team]=Math.min(3,s.cr[1-e.team]+(e.k?3:1));
  if(!e.k)s.tw[e.team][2].act=1; // rei acorda quando uma torre princesa cai
  s.fx.push({x:e.x,y:e.y,r:2,t:.5,m:.5,boom:1});if(e.k||s.ot)fin(1-e.team)}}}
function aoe(team,x,y,r,d,sp,air=1){for(const e of G.u)if(e.team!=team&&e.hp>0&&(air||!e.fly)&&Math.hypot(e.x-x,e.y-y)<=r+e.rad)hurt(e,sp&&e.tw?d*.35:d)}
function pick(u,m,tb){let b=null,bd=m;for(const e of G.u){if(!ok(u,e)||tb&&!(e.tw||e.b))continue;const d=dist(u,e);if(d<bd){bd=d;b=e}}return b}
function atk(u,t){if(u.rg>1.5)G.proj.push({x:u.x,y:u.y,t,tx:t.x,ty:t.y,d:u.d,spl:u.spl,team:u.team,air:u.air});
 else if(u.spl)aoe(u.team,t.x,t.y,u.spl,u.d,0,u.air);else hurt(t,u.d)}
function towerAI(u,dt){u.cd-=dt;if(!u.act)return;
 // foco: mantém o alvo até morrer ou sair do alcance
 if(!u.tgt||u.tgt.hp<=0||dist(u,u.tgt)>u.rg)u.tgt=pick(u,u.rg,0);
 if(u.tgt&&u.cd<=0){u.cd=u.h;atk(u,u.tgt)}}
function troop(u,dt){u.cd-=dt;u.rt-=dt;let t=u.tgt;
 if(!t||t.hp<=0||(t.tw||t.b)&&u.rt<=0||dist(u,t)>9){u.rt=.4;t=u.tgt=pick(u,5.5,0)||pick(u,99,1)}
 if(!t)return;
 if(dist(u,t)<=u.rg){if(u.cd<=0){u.cd=u.h;atk(u,t)}}else move(u,t.x,t.y,dt)}
function bld(u,dt){u.hp-=u.mh/30*dt;u.sc=(u.sc??2)-dt;if(u.sc<=0){u.sc=5;spawn('aluno',u.team,u.x,u.y+(u.team?1.5:-1.5))}}
function move(u,tx,ty,dt){
 if(!u.fly){const inr=u.y>RV[0]-.5&&u.y<RV[1]+.5;
  if((u.y-16)*(ty-16)<0||inr){const bx=Math.abs(u.x-BR[0])<Math.abs(u.x-BR[1])?BR[0]:BR[1];
   if(Math.abs(u.x-bx)>.5&&!inr)ty=u.y<16?RV[0]-.8:RV[1]+.8;tx=bx}}
 const dx=tx-u.x,dy=ty-u.y,l=Math.hypot(dx,dy)||1,st=Math.min(l,u.s*dt);u.x+=dx/l*st;u.y+=dy/l*st;u.fx=dx<0}
function sep(){const a=G.u;for(const u of a){if(u.tw||u.b||u.hp<=0||u.dep>0)continue;
 for(const e of a){if(e===u||e.hp<=0||!!e.fly!=!!u.fly)continue;
  const dx=u.x-e.x,dy=u.y-e.y,d=Math.hypot(dx,dy)||.01,ov=u.rad+e.rad-d;
  if(ov>0){const f=(e.tw||e.b?1:.5)*ov/d;u.x+=dx*f;u.y+=dy*f}}
 if(!u.fly){u.x=Math.max(.5,Math.min(W-.5,u.x));u.y=Math.max(.5,Math.min(H-.5,u.y));
  if(u.y>RV[0]&&u.y<RV[1]){const bx=Math.abs(u.x-BR[0])<Math.abs(u.x-BR[1])?BR[0]:BR[1];u.x=Math.max(bx-1.4,Math.min(bx+1.4,u.x))}}}}
function proj(dt){for(const p of G.proj){if(p.t.hp>0){p.tx=p.t.x;p.ty=p.t.y}
 const dx=p.tx-p.x,dy=p.ty-p.y,l=Math.hypot(dx,dy),st=14*dt;
 if(l<=st+.2){p.dead=1;p.spl?aoe(p.team,p.tx,p.ty,p.spl,p.d,0,p.air):hurt(p.t,p.d)}else{p.x+=dx/l*st;p.y+=dy/l*st}}
 G.proj=G.proj.filter(p=>!p.dead)}
function spawn(id,t,x,y){const c=CARDS[id],n=c.cnt||1;for(let i=0;i<n;i++){const a=i*6.28/n;
 G.u.push({...c,id,team:t,x:x+(n>1?Math.cos(a)*.8:0),y:y+(n>1?Math.sin(a)*.8:0),mh:c.hp,hp:c.hp,cd:0,rt:0,dep:1,tgt:null,rad:c.rad||.5})}}
function play(t,i,x,y){const p=G.p[t],id=p.hand[i],c=CARDS[id];if(G.el[t]<c.c||G.over)return 0;
 G.el[t]-=c.c;p.hand[i]=p.q.shift();p.q.push(id); // ciclo de cartas
 if(c.t=='s')G.fx.push({x,y,r:c.spl,t:.8,m:.8,cb:()=>aoe(t,x,y,c.spl,c.d,1)});else spawn(id,t,x,y);return 1}
function okp(t,id,x,y){if(CARDS[id].t=='s')return 1;if(x<.6||x>W-.6||y<.6||y>H-.6)return 0;
 const yy=t?H-y:y,pocket=G.tw[1-t][x<9?0:1].hp<=0&&yy>=11; // pode avançar se a torre inimiga da raia caiu
 if(!(yy>17.5||pocket))return 0;
 return G.u.every(e=>!(e.tw||e.b)||e.hp<=0||Math.hypot(e.x-x,e.y-y)>e.rad+.6)}
function ai(dt){G.at-=dt;if(G.at>0)return;const p=G.p[1],e=G.el[1];
 const op=p.hand.map((id,i)=>i).filter(i=>CARDS[p.hand[i]].c<=e);
 if(!op.length||e<(G.ot?3:6)&&Math.random()<.8){G.at=.7;return}
 const i=op[Math.random()*op.length|0],id=p.hand[i],c=CARDS[id],foes=G.u.filter(u=>u.team==0&&!u.tw&&u.hp>0);let x,y;
 const near=(a)=>foes.filter(o=>Math.hypot(o.x-a.x,o.y-a.y)<2.5).length;
 if(c.t=='s'){const f=foes.sort((a,b)=>near(b)-near(a))[0];if(!f||near(f)<2&&c.c>2){G.at=1;return}x=f.x;y=f.y}
 else{const th=foes.filter(u=>u.y<16).sort((a,b)=>a.y-b.y)[0];
  if(th){x=th.x;y=Math.max(3,Math.min(13,th.y-2.5))}else{x=(Math.random()<.5?4:14)+Math.random()*2-1;y=11+Math.random()*2}}
 if(!okp(1,id,x,y)){G.at=.4;return}
 play(1,i,x,y);G.at=1.2+Math.random()*2}
function update(dt){const s=G;if(s.over)return;s.time-=dt;
 if(s.time<=0){if(!s.ot){if(s.cr[0]!=s.cr[1])return fin(s.cr[0]>s.cr[1]?0:1);s.ot=1;s.time=120}else return fin(-1)} // morte súbita
 const rate=(s.ot?3:s.time<=60?2:1)/2.8;for(const t of[0,1])s.el[t]=Math.min(10,s.el[t]+rate*dt);
 ai(dt);
 for(const u of s.u){if(u.hp<=0)continue;if(u.dep>0){u.dep-=dt;continue}u.tw?towerAI(u,dt):u.b?bld(u,dt):troop(u,dt)}
 sep();proj(dt);
 for(const f of s.fx){f.t-=dt;if(f.t<=0&&f.cb){f.cb();f.cb=0;f.t=f.m=.3;f.boom=1}}
 s.fx=s.fx.filter(f=>f.t>0);
 s.u=s.u.filter(u=>{if(u.hp>0||u.tw)return 1;s.fx.push({x:u.x,y:u.y,r:.8,t:.3,m:.3,boom:1});return 0})}
const bar=(x,y,w,r,team)=>{g.fillStyle='#000a';g.fillRect(x-w/2,y,w,4);g.fillStyle=team?'#e33':'#38f';g.fillRect(x-w/2+1,y+1,(w-2)*Math.max(0,r),2)};
function draw(){const s=G;g.clearRect(0,0,360,640);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){g.fillStyle=(x+y)%2?'#6cbf4a':'#64b544';g.fillRect(x*T,y*T,T,T)}
 g.fillStyle='#3aa8e8';g.fillRect(0,RV[0]*T,360,2*T);g.fillStyle='#8fd8ff';
 for(let i=0;i<9;i++)g.fillRect((i*47+performance.now()/60)%360,(15.3+(i%3)*.6)*T,14,2);
 for(const b of BR){g.fillStyle='#b07a45';g.fillRect((b-1.5)*T,(RV[0]-.3)*T,3*T,2.6*T);g.fillStyle='#8a5a2b';for(let k=0;k<6;k++)g.fillRect((b-1.5)*T,(14.9+k*.45)*T,3*T,2)}
 for(const u of[...s.u].sort((a,b)=>(a.fly?100:0)+a.y-(b.fly?100:0)-b.y)){
  if(u.tw){const w=u.rad*2.4*T,h=w*1.25;
   if(u.hp<=0){g.fillStyle='#555';g.fillRect(u.x*T-w/2,u.y*T-h*.2,w,h*.35);continue}
   g.drawImage(TW[u.team][u.k?1:0],u.x*T-w/2,u.y*T-h*.75,w,h);bar(u.x*T,u.y*T-h*.75-5,w,u.hp/u.mh,u.team);
   if(u.k&&!u.act){g.fillStyle='#fff';g.font='bold 10px sans-serif';g.fillText('zZ',u.x*T+8,u.y*T-h*.7)}continue}
  if(u.hp<=0)continue;const im=SP[u.id],h=(u.b?2.4:1.8)*T*(u.rad>.6?1.2:1),w=h*im.width/im.height,fy=u.fly?-12:0;
  g.fillStyle=u.team?'rgba(255,60,60,.55)':'rgba(60,120,255,.55)';g.beginPath();g.ellipse(u.x*T,u.y*T,w*.45,4,0,0,7);g.fill();
  g.globalAlpha=u.dep>0?.5:1;g.save();g.translate(u.x*T,0);g.scale(u.fx?-1:1,1);g.drawImage(im,-w/2,u.y*T-h+fy+4,w,h);g.restore();g.globalAlpha=1;
  if(u.hp<u.mh)bar(u.x*T,u.y*T-h+fy,24,u.hp/u.mh,u.team)}
 for(const p of s.proj){g.fillStyle=p.team?'#f66':'#fff';g.beginPath();g.arc(p.x*T,p.y*T,3,0,7);g.fill()}
 for(const f of s.fx){g.beginPath();g.arc(f.x*T,f.y*T,f.r*T,0,7);
  if(f.boom){g.fillStyle=`rgba(255,200,60,${f.t/f.m*.7})`;g.fill()}else{g.fillStyle='rgba(255,80,80,.2)';g.fill();g.strokeStyle='#f44';g.stroke()}}
 if(s.sel!=null&&!s.over){const id=s.p[0].hand[s.sel],c=CARDS[id],v=okp(0,id,s.mx,s.my);
  if(c.t=='s'){g.fillStyle='rgba(255,80,80,.25)';g.beginPath();g.arc(s.mx*T,s.my*T,c.spl*T,0,7);g.fill()}
  else{g.fillStyle='rgba(255,255,255,.18)';for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(okp(0,id,x+.5,y+.5))g.fillRect(x*T,y*T,T,T);
   const im=SP[id],h=1.8*T,w=h*im.width/im.height;g.globalAlpha=.7;g.drawImage(im,s.mx*T-w/2,s.my*T-h+4,w,h);g.globalAlpha=1;
   if(!v){g.fillStyle='#f22';g.font='bold 20px sans-serif';g.fillText('✖',s.mx*T-8,s.my*T)}}}}
function hud(){const s=G,m=Math.max(0,s.time|0);
 $('clock').textContent=(s.ot?'⚡ ':'')+(m/60|0)+':'+String(m%60).padStart(2,'0');$('crowns').textContent='👑 '+s.cr[0]+' × '+s.cr[1];
 $('dbl').textContent=s.ot?'Elixir 3x':s.time<=60?'Elixir 2x':'';$('ef').style.width=s.el[0]*10+'%';$('en').textContent=s.el[0]|0;
 [...$('hand').children].forEach((d,i)=>d.classList.toggle('dis',CARDS[s.p[0].hand[i]].c>s.el[0]))}
function rh(){const p=G.p[0];$('hand').innerHTML=p.hand.map((id,i)=>cardH(id,i===G.sel)).join('');$('nx').innerHTML='Próxima'+cardH(p.q[0],0)}
$('hand').onclick=e=>{const d=e.target.closest('.cd');if(!d||!G)return;const i=[...$('hand').children].indexOf(d);G.sel=G.sel===i?null:i;rh()};
const pos=e=>{const r=cvs.getBoundingClientRect();return[(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H]};
cvs.onmousemove=e=>{if(G)[G.mx,G.my]=pos(e)};
cvs.onclick=e=>{if(!G||G.over||G.sel==null)return;const[x,y]=pos(e);G.mx=x;G.my=y;
 if(okp(0,G.p[0].hand[G.sel],x,y)&&play(0,G.sel,x,y)){G.sel=null;rh()}};
onkeydown=e=>{if(G&&!G.over&&'1234'.includes(e.key)){G.sel=e.key-1;rh()}};
let last=0;function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;if(G){update(dt);draw();hud()}requestAnimationFrame(loop)}
menu();requestAnimationFrame(loop);
