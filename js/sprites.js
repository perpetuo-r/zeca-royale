// Sprites cartoon desenhados por código (formas com contorno grosso), sem imagens externas
const cv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const OL='#2a1a14',PI=Math.PI;
function sh(g,f,fn,lw=3){g.beginPath();fn(g);g.closePath();g.fillStyle=f;g.fill();if(lw){g.lineWidth=lw;g.strokeStyle=OL;g.lineJoin='round';g.stroke()}}
const E=(g,x,y,a,b,f,lw)=>sh(g,f,g=>g.ellipse(x,y,a,b,0,0,7),lw);
const R=(g,x,y,w,h,r,f,lw)=>sh(g,f,g=>g.roundRect(x,y,w,h,r),lw);
const P=(g,pts,f,lw)=>sh(g,f,g=>pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y)),lw);
function person(o){const c=cv(64,80),g=c.getContext('2d'),h=o.hair,s=o.st,a=o.acc;
 if(a=='bag')R(g,8,42,14,22,5,'#e74c3c');
 if(s=='long')R(g,8,12,48,46,18,h);
 R(g,20,60,10,14,4,o.pants);R(g,34,60,10,14,4,o.pants);E(g,24,75,9,5,'#fff');E(g,40,75,9,5,'#fff');
 E(g,13,53,6,10,o.shirt);E(g,51,53,6,10,o.shirt);E(g,12,63,5,5,o.skin);E(g,52,63,5,5,o.skin);
 R(g,17,40,30,26,11,o.shirt);
 if(a=='tie')P(g,[[28,42],[36,42],[38,60],[32,64],[26,60]],'#d62828',2.5);
 E(g,10,30,5,6,o.skin,2.5);E(g,54,30,5,6,o.skin,2.5);E(g,32,28,22,21,o.skin);
 if(a=='beard')sh(g,h,g=>g.ellipse(32,36,19,13,0,0,PI));
 if(s=='long'||s=='hair'||s=='cap'||s=='spiky')sh(g,h,g=>g.ellipse(32,24,23,19,0,PI,0));
 if(s=='spiky')[[[12,16],[14,2],[25,9]],[[24,9],[32,0],[40,9]],[[39,9],[50,2],[52,16]]].forEach(p=>P(g,p,h));
 if(s=='cap')R(g,30,14,32,8,4,h);
 if(s=='bald')E(g,24,12,5,3,'#fff8',0);
 if(a=='hat'){R(g,10,12,44,8,4,'#6a3fbf');P(g,[[16,14],[34,0],[48,14]],'#6a3fbf');E(g,34,9,3,3,'#ffd23f',1.5)}
 E(g,24,29,6,7,'#fff',2.5);E(g,40,29,6,7,'#fff',2.5);E(g,25.5,30,3,4,OL,0);E(g,41.5,30,3,4,OL,0);E(g,26.5,28.5,1.2,1.2,'#fff',0);E(g,42.5,28.5,1.2,1.2,'#fff',0);
 E(g,16,37,4,2.5,'#ff9aa2',0);E(g,48,37,4,2.5,'#ff9aa2',0);
 g.beginPath();g.arc(32,38,5,.3,PI-.3);g.lineWidth=2.5;g.strokeStyle=a=='beard'?'#fff':OL;g.stroke();
 if(a=='glasses')[24,40].forEach(x=>{g.beginPath();g.arc(x,29,9,0,7);g.fillStyle='#cfe8ff66';g.fill();g.lineWidth=3;g.strokeStyle=OL;g.stroke()});
 if(a=='book'){R(g,46,46,18,22,3,'#2e8b57');R(g,48,48,14,18,2,'#fffb',1.5)}
 return c}
function bird(){const c=cv(64,80),g=c.getContext('2d');
 P(g,[[14,44],[0,56],[16,58]],'#8f98a8');E(g,30,50,20,16,'#b9c0cc');E(g,34,56,12,8,'#e6eaf0',0);E(g,46,42,8,5,'#7bd3a0',0);
 E(g,26,48,12,9,'#8f98a8');E(g,46,34,11,11,'#b9c0cc');P(g,[[55,33],[64,37],[55,40]],'#ffb703',2.5);
 E(g,49,31,3.5,4,'#fff',2);E(g,50,32,1.8,2.2,OL,0);
 [26,36].forEach(x=>{g.beginPath();g.moveTo(x,64);g.lineTo(x,72);g.lineWidth=3;g.strokeStyle='#ff9f1c';g.stroke()});return c}
function paper(){const c=cv(64,80),g=c.getContext('2d');g.translate(32,40);g.rotate(-.15);
 R(g,-22,-30,44,60,4,'#fff');g.strokeStyle='#8aa4c8';g.lineWidth=2;
 [-20,-12,-4].forEach(y=>{g.beginPath();g.moveTo(-15,y);g.lineTo(15,y);g.stroke()});
 g.font='bold 34px "Comic Sans MS",sans-serif';g.fillStyle='#e63946';g.strokeStyle=OL;g.lineWidth=1.5;g.fillText('F',-8,22);g.strokeText('F',-8,22);return c}
function chalk(){const c=cv(64,80),g=c.getContext('2d');
 [[20,42,-.4,'#fff'],[46,42,.4,'#ff8fab'],[33,44,0,'#ffd166']].forEach(([x,y,r,f])=>{g.save();g.translate(x,y);g.rotate(r);R(g,-6,-26,12,52,4,f);R(g,-6,16,12,10,3,'#fff8',1.5);g.restore()});return c}
function hut(){const c=cv(80,80),g=c.getContext('2d');
 R(g,10,32,60,42,4,'#f4a261');for(let i=0;i<6;i++)R(g,12+i*9.3,38,9.3,14,2,i%2?'#fff':'#2a9d8f',2);
 R(g,14,58,52,10,3,'#8d5524');P(g,[[4,36],[40,6],[76,36]],'#e63946');E(g,40,24,8,8,'#ffd166',2.5);
 g.font='bold 11px "Comic Sans MS",sans-serif';g.fillStyle=OL;g.fillText('C',36.5,28);return c}
function tower(t,k){const c=cv(80,100),g=c.getContext('2d'),col=t?'#e63946':'#3a86ff';
 R(g,16,40,48,56,8,'#c9ced8');R(g,50,42,12,52,6,'#aeb4c2',0);
 g.strokeStyle='#8d93a3';g.lineWidth=2;for(let y=52;y<92;y+=12){g.beginPath();g.moveTo(18,y);g.lineTo(62,y);g.stroke()}
 R(g,32,70,16,26,[8,8,0,0],'#6b3d1a');E(g,40,54,5,7,'#2a2a3a',2);
 R(g,10,28,60,16,6,col);for(let i=0;i<4;i++)R(g,10+i*16,16,12,16,3,col);
 if(k){P(g,[[24,22],[22,4],[33,12],[40,0],[47,12],[58,4],[56,22]],'#ffd23f');E(g,40,15,3.5,3.5,'#e63946',1.5)}
 return c}
const SP={},TW=[[tower(0,0),tower(0,1)],[tower(1,0),tower(1,1)]];
for(const id in CARDS){const s=CARDS[id].sp;SP[id]=s=='bird'?bird():s=='hut'?hut():s=='paper'?paper():s=='chalk'?chalk():person(s)}
