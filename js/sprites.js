// Todos os sprites são desenhados em pixel art por código (sem imagens externas)
const cv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const px=(c,a)=>{const g=c.getContext('2d');for(const[x,y,w,h,f]of a){g.fillStyle=f;g.fillRect(x,y,w,h)}return c};
const K='#222';
function person(o){const a=[],h=o.hair,s=o.st;
 if(o.acc=='bag')a.push([1,8,3,7,'#e74c3c']);
 a.push([5,15,2,4,o.pants],[9,15,2,4,o.pants],[4,19,3,1,K],[9,19,3,1,K],[4,8,8,8,o.shirt],[2,9,2,6,o.shirt],[12,9,2,6,o.shirt],[2,15,2,1,o.skin],[12,15,2,1,o.skin],[5,1,6,7,o.skin],[6,4,1,1,K],[9,4,1,1,K],[7,6,2,1,'#a33']);
 if(s=='long')a.push([4,0,8,2,h],[4,2,1,8,h],[11,2,1,8,h]);
 else if(s=='spiky')a.push([5,1,6,2,h],[5,0,1,1,h],[7,0,2,1,h],[10,0,1,1,h]);
 else if(s=='cap')a.push([4,0,8,2,h],[3,2,4,1,h]);
 else if(s=='hair')a.push([5,0,6,2,h],[5,2,1,2,h]);
 else a.push([5,1,6,1,'#fff6']);
 if(o.acc=='glasses')a.push([5,3,3,3,K],[8,3,3,3,K],[6,4,1,1,'#cef'],[9,4,1,1,'#cef']);
 if(o.acc=='tie')a.push([7,8,2,7,'#c00'],[7,8,2,1,'#fff']);
 if(o.acc=='beard')a.push([5,6,6,2,h]);
 if(o.acc=='book')a.push([12,10,4,5,'#2e8b57'],[12,10,4,1,'#fff']);
 if(o.acc=='marker')a.push([13,7,1,7,'#fff'],[13,7,1,2,'#e33']);
 return px(cv(16,20),a)}
const bird=()=>px(cv(16,20),[[3,9,9,5,'#aab'],[11,7,3,3,'#aab'],[14,8,2,1,'#fb0'],[12,8,1,1,K],[1,5,5,5,'#789'],[0,11,4,2,'#789'],[6,14,1,3,'#fb0'],[9,14,1,3,'#fb0']]);
const paper=()=>px(cv(16,20),[[3,2,10,16,'#fff'],[3,2,10,1,'#ccc'],[5,5,6,1,'#99c'],[5,8,6,1,'#99c'],[7,11,1,5,'#d22'],[7,11,4,1,'#d22'],[7,13,3,1,'#d22']]);
const chalk=()=>px(cv(16,20),[[6,2,4,15,'#fff'],[6,2,4,2,'#ddd'],[6,15,4,2,'#bbb'],[3,18,10,1,'#fffa']]);
const hut=()=>px(cv(20,20),[[1,5,18,4,'#c33'],[3,9,14,9,'#d9a05b'],[8,12,4,6,'#6b3d1a'],[4,10,3,3,'#8cf'],[13,10,3,3,'#8cf'],[6,2,8,3,'#fff']]);
const tower=(t,k)=>{const c=t?'#d63a3a':'#3a6fd6';return px(cv(32,40),[[6,14,20,24,'#a9a9b9'],[6,14,20,2,'#888'],[4,8,24,7,c],[4,4,6,5,c],[13,4,6,5,c],[22,4,6,5,c],[13,24,6,14,'#4a3a2a'],[9,20,3,3,'#334'],[20,20,3,3,'#334'],...(k?[[8,1,16,3,'#fc3'],[8,0,3,2,'#fc3'],[14,0,4,2,'#fc3'],[21,0,3,2,'#fc3']]:[])])};
const SP={},TW=[[tower(0,0),tower(0,1)],[tower(1,0),tower(1,1)]];
for(const id in CARDS){const s=CARDS[id].sp;SP[id]=s=='bird'?bird():s=='hut'?hut():s=='paper'?paper():s=='chalk'?chalk():person(s)}
