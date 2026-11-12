// Ícones cartoon do menu (baús, troféu, moeda, etc.), desenhados por código
const mk=f=>{const c=cv(64,64);f(c.getContext('2d'));return c};
const chest=(c1,c2,gem,open)=>mk(g=>{
 if(open){E(g,32,30,24,14,'#fff3b0',0);g.save();g.translate(8,32);g.rotate(-1.1);R(g,0,-10,48,14,6,c1);g.restore()}
 R(g,8,34,48,24,6,c1);R(g,14,34,6,24,0,c2,2.5);R(g,44,34,6,24,0,c2,2.5);
 if(open){E(g,32,35,20,5,'#ffd23f',2);E(g,22,33,6,4,'#fff3b0',0);E(g,40,32,6,4,'#fff3b0',0)}
 else{sh(g,c1,g=>{g.moveTo(6,36);g.quadraticCurveTo(32,0,58,36)});R(g,26,30,12,13,3,'#ffd23f');E(g,32,37,2.5,3,OL,0)}
 if(gem)P(g,[[32,6],[40,15],[32,25],[24,15]],'#7df9ff',2.5)});
const trophy=()=>mk(g=>{R(g,6,12,14,18,7,'#ffd23f');R(g,44,12,14,18,7,'#ffd23f');
 sh(g,'#ffd23f',g=>{g.moveTo(16,6);g.lineTo(48,6);g.lineTo(44,34);g.quadraticCurveTo(32,48,20,34)});R(g,28,42,8,9,2,'#e0a800');R(g,18,50,28,9,3,'#c77d0a');R(g,22,11,4,16,2,'#fff8',0)});
const coin=()=>mk(g=>{E(g,32,32,25,25,'#ffd23f');E(g,32,32,17,17,'#ffc107',2.5);g.font='bold 24px "Comic Sans MS",sans-serif';g.textAlign='center';g.fillStyle=OL;g.fillText('Z',32,41)});
const crown=()=>mk(g=>{P(g,[[8,50],[4,16],[20,32],[32,8],[44,32],[60,16],[56,50]],'#ffd23f');R(g,8,46,48,11,3,'#e0a800');E(g,32,36,4,4,'#e63946',1.5);E(g,16,41,3,3,'#3a86ff',1.5);E(g,48,41,3,3,'#3a86ff',1.5)});
const lock=()=>mk(g=>{g.beginPath();g.arc(32,28,12,PI,0);g.lineWidth=9;g.strokeStyle=OL;g.stroke();g.lineWidth=4;g.strokeStyle='#ccd';g.stroke();R(g,13,28,38,28,6,'#ffb703');E(g,32,40,4.5,4.5,OL,0);R(g,30,42,4,9,1,OL,0)});
const swords=()=>mk(g=>{[-.7,.7].forEach(r=>{g.save();g.translate(32,32);g.rotate(r);g.scale(.8,.8);g.translate(-32,-32);P(g,[[32,2],[39,10],[39,38],[25,38],[25,10]],'#dfe9f5');R(g,14,38,36,7,3,'#ffd23f');R(g,28,45,8,11,2,'#8d5524');E(g,32,59,5,4,'#ffd23f');g.restore()})});
const bag=()=>mk(g=>{g.beginPath();g.arc(32,20,11,PI,0);g.lineWidth=8;g.strokeStyle=OL;g.stroke();g.lineWidth=4;g.strokeStyle='#fff';g.stroke();R(g,10,20,44,38,7,'#ff595e');E(g,32,40,10,10,'#ffd23f',2.5)});
const cardsI=()=>mk(g=>{[[-.35,'#ef8354'],[.35,'#ffd166'],[0,'#9d4edd']].forEach(([r,f])=>{g.save();g.translate(32,34);g.rotate(r);R(g,-14,-22,28,42,5,f);g.restore()});E(g,32,34,7,7,'#fff',2)});
const heart=()=>mk(g=>sh(g,'#ef476f',g=>{g.moveTo(32,56);g.bezierCurveTo(2,38,8,8,32,24);g.bezierCurveTo(56,8,62,38,32,56)}));
const IC={cmad:chest('#b9763f','#7a4a22'),cdou:chest('#ffd23f','#d99a00'),cmag:chest('#a45be0','#5a189a',1),omad:chest('#b9763f','#7a4a22',0,1),odou:chest('#ffd23f','#d99a00',0,1),omag:chest('#a45be0','#5a189a',1,1),trophy:trophy(),coin:coin(),crown:crown(),lock:lock(),swords:swords(),bag:bag(),cards:cardsI(),heart:heart()};
const U={};
const ic=(n,s=24)=>`<img src="${U[n]||(U[n]=IC[n].toDataURL())}" width="${s}" height="${s}" style="vertical-align:middle">`;
const chi=(t,s,o)=>ic((o?'o':'c')+t,s); // ícone de baú: t = mad | dou | mag
function arenaImg(i){const c=cv(320,110),g=c.getContext('2d'),fl=(x,y,w,h,f)=>R(g,x,y,w,h,0,f,0);
 if(i==0){fl(0,0,320,110,'#ffe8a3');fl(0,78,320,32,'#c68642');R(g,24,12,130,58,6,'#2d6a4f');g.strokeStyle='#fff';g.lineWidth=3;g.beginPath();g.moveTo(40,30);g.lineTo(100,30);g.moveTo(40,44);g.lineTo(130,44);g.moveTo(40,58);g.lineTo(90,58);g.stroke();
  [190,260].forEach(x=>{R(g,x,50,50,8,3,'#e9a15b');R(g,x+6,58,6,24,2,'#8d5524');R(g,x+38,58,6,24,2,'#8d5524')})}
 else if(i==1){fl(0,0,320,110,'#8fd3ff');E(g,70,24,24,10,'#fff',0);E(g,95,30,18,8,'#fff',0);fl(0,78,320,32,'#e8d28a');R(g,250,36,14,48,3,'#8d5524');E(g,257,32,28,24,'#4caf3a');E(g,60,92,12,12,'#fff');E(g,60,92,4,4,OL,0)}
 else if(i==2){fl(0,0,320,110,'#e98a6b');g.strokeStyle='#fff';g.lineWidth=4;g.strokeRect(14,10,292,90);g.beginPath();g.moveTo(160,10);g.lineTo(160,100);g.stroke();g.beginPath();g.arc(160,55,24,0,7);g.stroke();E(g,60,70,12,12,'#ff8c42');E(g,260,40,12,12,'#ff8c42')}
 else{fl(0,0,320,110,'#6d597a');fl(0,72,320,38,'#b388eb');R(g,20,12,56,48,6,'#bde0fe');g.strokeStyle='#8d5524';g.lineWidth=4;g.beginPath();g.moveTo(48,12);g.lineTo(48,60);g.moveTo(20,36);g.lineTo(76,36);g.stroke();R(g,140,46,120,30,4,'#8d5524');E(g,200,40,10,6,'#ffd23f');R(g,290,18,22,34,3,'#ffd23f')}
 return c}
const AB={},arenaBg=i=>AB[i]||(AB[i]=arenaImg(i).toDataURL());
