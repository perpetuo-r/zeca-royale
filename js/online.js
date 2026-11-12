// Batalha amistosa online (WebRTC via PeerJS). Quem cria a sala roda a partida;
// o convidado envia as jogadas e recebe "fotos" (snapshots) do jogo, já giradas 180° para ele se ver embaixo.
let NET=null;const UM={};
const box=h=>{$('det').style.display='flex';$('det').innerHTML=`<div class="box">${h}</div>`};
const err=e=>box(`<h2>Ops!</h2><p>${e&&e.type=='peer-unavailable'?'Sala não encontrada.':'Falha na conexão'+(e&&e.type?' ('+e.type+')':'')+'.'}</p><button onclick="netEnd();cl()">Fechar</button>`);
function friendly(){if(typeof Peer=='undefined')return box('<h2>Sem conexão</h2><p>Não consegui carregar o PeerJS. Verifique sua internet.</p><button onclick="cl()">Fechar</button>');
 box('<h2>Batalha Amistosa</h2><p>Sem troféus nem baús.</p><button onclick="host()">Criar sala</button><p>ou</p><input id="code" maxlength="4" placeholder="CÓDIGO"><button onclick="join()">Entrar com código</button><button onclick="cl()">Fechar</button>')}
function host(n=0){const code=[...Array(4)].map(()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.random()*32|0]).join(''),p=new Peer('zeca-royale-'+code);NET={role:'h',peer:p};
 p.on('error',e=>{if(e.type=='unavailable-id'&&n<5){p.destroy();host(n+1)}else err(e)});
 p.on('open',()=>box(`<h2>Sala criada!</h2><p>Passe este código ao amigo:</p><h1>${code}</h1><p>Aguardando...</p><button onclick="netEnd();cl()">Cancelar</button>`));
 p.on('connection',c=>{if(NET.conn)return c.close();NET.conn=c;c.on('data',m=>onHost(c,m));c.on('close',lost)})}
function join(){const code=($('code').value||'').trim().toUpperCase();if(code.length!=4)return;
 const p=new Peer();NET={role:'g',peer:p};box('<h2>Conectando...</h2>');p.on('error',err);
 p.on('open',()=>{const c=p.connect('zeca-royale-'+code,{serialization:'json'});NET.conn=c;
  c.on('open',()=>c.send({t:'hi',deck:M.deck,lv:Object.fromEntries(M.deck.map(id=>[id,LV(id)]))}));c.on('data',onGuest);c.on('close',lost)})}
function onHost(c,m){
 if(m.t=='hi'){if(!(Array.isArray(m.deck)&&m.deck.length==8&&m.deck.every(id=>CARDS[id])&&m.lv))return c.close();
  const lv={};for(const id of m.deck)lv[id]=Math.max(1,Math.min(MAXL,+m.lv[id]||1));
  cl();start({deck:m.deck,lv});c.send({t:'go',a:arena()})}
 else if(m.t=='play'&&G&&G.net&&!G.over&&Number.isFinite(m.x)&&Number.isFinite(m.y)){ // jogada do convidado (coordenadas giradas)
  const id=G.p[1].hand[m.i];if(id&&okp(1,id,W-m.x,H-m.y))play(1,m.i,W-m.x,H-m.y)}}
function onGuest(m){if(m.t=='go'){cl();gStart(m.a)}else if(m.t=='s'&&G&&G.net&&!G.over)snapApply(m);else if(m.t=='end'&&G&&!G.over)fin(m.w<0?-1:1-m.w)}
function gStart(a){for(const k in UM)delete UM[k];
 G={u:[],tw:[[],[]],p:[{hand:['aluno','aluno','aluno','aluno'],q:['aluno']},{hand:[],q:[]}],el:[5,5],cr:[0,0],time:180,ot:0,proj:[],fx:[],sel:null,over:0,mx:9,my:24,net:1};
 mkBG(AR[a].p);$('menu').style.display='none';$('end').style.display='none';rh()}
function netPlay(i,x,y){const id=G.p[0].hand[i];if(G.el[0]<CARDS[id].c)return 0;NET.conn.send({t:'play',i,x,y});return 1}
function snap(){const s=G,f=(u,i)=>({q:u.uid||'t'+i,tw:u.tw,k:u.k,team:1-u.team,x:W-u.x,y:H-u.y,hp:u.hp,mh:u.mh,rad:u.rad,act:u.act,id:u.id,b:u.b,fly:u.fly,dep:u.dep,mv:u.mv,fx:!u.fx});
 return{t:'s',u:s.u.map(f),pr:s.proj.map(p=>({x:W-p.x,y:H-p.y,team:1-p.team})),fx:s.fx.map(q=>({x:W-q.x,y:H-q.y,r:q.r,t:q.t,m:q.m,boom:q.boom})),
  h:s.p[1].hand,n:s.p[1].q[0],el:s.el[1],cr:[s.cr[1],s.cr[0]],time:s.time,ot:s.ot}}
function snapApply(s){const g=G,seen={};
 for(const d of s.u){seen[d.q]=1;const o=UM[d.q];if(!o)UM[d.q]={...d,tx:d.x,ty:d.y};else{const x=o.x,y=o.y;Object.assign(o,d);o.x=x;o.y=y;o.tx=d.x;o.ty=d.y}}
 for(const k in UM)if(!seen[k])delete UM[k];
 const u=g.u=s.u.map(d=>UM[d.q]);g.tw=[[u[4],u[3],u[5]],[u[1],u[0],u[2]]]; // torres no ponto de vista do convidado
 g.proj=s.pr;g.fx=s.fx;g.el=[s.el,0];g.cr=s.cr;g.time=s.time;g.ot=s.ot;
 const k=s.h.join()+s.n;if(g.hk!=k){g.hk=k;g.p[0]={hand:s.h,q:[s.n]};rh()}}
function net(dt){if(!G||!G.net||!NET||!NET.conn)return;
 if(NET.role=='h'){if(G.over)return;NET.acc=(NET.acc||0)+dt;if(NET.acc>=.05){NET.acc=0;NET.conn.send(snap())}} // 20 snapshots/s
 else{const k=Math.min(1,dt*18);for(const u of G.u)if(u.tx!=null){u.x+=(u.tx-u.x)*k;u.y+=(u.ty-u.y)*k}}}
function lost(){if(NET&&G&&G.net&&!G.over){G.over=1;const e=$('end');e.style.display='flex';e.innerHTML='<h2>Oponente desconectou</h2><button onclick="netEnd();home()">Continuar</button>'}}
function netEnd(){const n=NET;NET=null;if(n)try{n.conn&&n.conn.close();n.peer.destroy()}catch(e){}}
