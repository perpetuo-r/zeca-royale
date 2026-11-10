// t: u=tropa, b=construção, s=feitiço | c=custo, hp, d=dano, s=velocidade(tiles/s), rg=alcance, h=intervalo de ataque
// cnt=quantidade, fly=voa, air=acerta aéreos, bld=só ataca torres/construções, spl=raio de dano em área
const CARDS={
patota:{n:'Patota',c:4,t:'u',hp:1500,d:110,s:1.1,rg:.4,h:1.3,spl:1.4,rad:.7,sp:{skin:'#e8b88a',hair:'#222',shirt:'#c0392b',pants:'#234',st:'bald',acc:'beard'}},
zeca:{n:'Zeca',c:3,t:'u',hp:560,d:95,s:1.3,rg:5,h:1.1,air:1,sp:{skin:'#f1c9a0',hair:'#5a3b1e',shirt:'#27ae60',pants:'#345',st:'cap',acc:'glasses'}},
renata:{n:'Renata',c:5,t:'u',hp:2400,d:130,s:.9,rg:.4,h:1.4,bld:1,rad:.7,sp:{skin:'#d9a066',hair:'#7b2d8e',shirt:'#8e44ad',pants:'#333',st:'long',acc:'book'}},
lufa:{n:'Lufa',c:2,t:'u',hp:340,d:75,s:2.4,rg:.4,h:.9,sp:{skin:'#f1c9a0',hair:'#e67e22',shirt:'#f39c12',pants:'#556',st:'spiky'}},
leandro:{n:'Leandro',c:5,t:'u',hp:620,d:170,s:1.2,rg:5,h:1.7,spl:1.6,air:1,sp:{skin:'#e0ac80',hair:'#999',shirt:'#2980b9',pants:'#223',st:'bald',acc:'marker'}},
aluno:{n:'Aluno',c:1,t:'u',hp:240,d:55,s:1.8,rg:.4,h:1,sp:{skin:'#f1c9a0',hair:'#333',shirt:'#3498db',pants:'#2c3e50',st:'hair',acc:'bag'}},
turma:{n:'Turma (x3)',c:3,t:'u',cnt:3,hp:200,d:45,s:1.8,rg:.4,h:1,sp:{skin:'#d9a066',hair:'#111',shirt:'#e74c3c',pants:'#2c3e50',st:'hair',acc:'bag'}},
diretor:{n:'Diretor',c:6,t:'u',hp:2700,d:280,s:.9,rg:.4,h:1.8,rad:.75,sp:{skin:'#e0ac80',hair:'#aaa',shirt:'#222',pants:'#111',st:'bald',acc:'tie'}},
pombo:{n:'Pombo',c:3,t:'u',fly:1,air:1,hp:420,d:80,s:2,rg:.4,h:1,sp:'bird'},
cantina:{n:'Cantina',c:4,t:'b',b:1,hp:1100,rad:1,sp:'hut'},
prova:{n:'Prova Surpresa',c:4,t:'s',d:450,spl:2.5,sp:'paper'},
giz:{n:'Chuva de Giz',c:2,t:'s',d:150,spl:3.5,sp:'chalk'}};
