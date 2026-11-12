// eq = carta equivalente no jogo original (mostrada no menu)
// t: u=tropa, b=construção, s=feitiço | c=custo, hp, d=dano, s=velocidade(tiles/s), rg=alcance, h=intervalo de ataque
// cnt=quantidade, fly=voa, air=acerta aéreos, bld=só ataca torres/construções, spl=raio de dano em área
const CARDS={
patota:{n:'Patota',eq:'Valquíria',c:4,t:'u',hp:1500,d:110,s:1.1,rg:.4,h:1.3,spl:1.4,rad:.7,sp:{skin:'#e8b88a',hair:'#3b2a20',shirt:'#e63946',pants:'#234',st:'bald',acc:'beard'}},
zeca:{n:'Zeca',eq:'Mosqueteira',c:4,t:'u',hp:600,d:100,s:1.3,rg:5,h:1,air:1,sp:{skin:'#f1c9a0',hair:'#d62828',shirt:'#2a9d8f',pants:'#345',st:'cap',acc:'glasses'}},
renata:{n:'Renata',eq:'Gigante',c:5,t:'u',hp:2400,d:130,s:.9,rg:.4,h:1.4,bld:1,rad:.7,sp:{skin:'#d9a066',hair:'#7b2d8e',shirt:'#9d4edd',pants:'#333',st:'long',acc:'book'}},
lufa:{n:'Lufa',eq:'Goblin',c:2,t:'u',hp:340,d:75,s:2.4,rg:.4,h:.9,sp:{skin:'#f1c9a0',hair:'#e67e22',shirt:'#ffb703',pants:'#556',st:'spiky'}},
leandro:{n:'Leandro',eq:'Mago',c:5,t:'u',hp:620,d:170,s:1.2,rg:5,h:1.7,spl:1.6,air:1,sp:{skin:'#e0ac80',hair:'#999',shirt:'#3a86ff',pants:'#223',st:'bald',acc:'hat'}},
aluno:{n:'Aluno',eq:'Esqueletos',c:1,t:'u',hp:240,d:55,s:1.8,rg:.4,h:1,sp:{skin:'#f1c9a0',hair:'#333',shirt:'#4dabf7',pants:'#2c3e50',st:'hair',acc:'bag'}},
turma:{n:'Turma (x3)',eq:'Gangue de Goblins',c:3,t:'u',cnt:3,hp:200,d:45,s:1.8,rg:.4,h:1,sp:{skin:'#d9a066',hair:'#111',shirt:'#ff595e',pants:'#2c3e50',st:'hair',acc:'bag'}},
diretor:{n:'Diretor',eq:'P.E.K.K.A',c:7,t:'u',hp:2900,d:290,s:.9,rg:.4,h:1.8,rad:.75,sp:{skin:'#e0ac80',hair:'#aaa',shirt:'#333',pants:'#111',st:'bald',acc:'tie'}},
pombo:{n:'Pombo',eq:'Servos (voador)',c:3,t:'u',fly:1,air:1,hp:420,d:80,s:2,rg:.4,h:1,sp:'bird'},
cantina:{n:'Cantina',eq:'Cabana de Goblins',c:5,t:'b',b:1,hp:1100,rad:1,spw:'aluno',sp:'hut'},
prova:{n:'Prova Surpresa',eq:'Bola de Fogo',c:4,t:'s',d:450,spl:2.5,sp:'paper'},
giz:{n:'Chuva de Giz',eq:'Flechas',c:3,t:'s',d:150,spl:3.6,sp:'chalk'},
inspetor:{n:'Inspetor',eq:'Cavaleiro',c:3,t:'u',hp:1100,d:85,s:1.1,rg:.4,h:1.1,sp:{skin:'#e0ac80',hair:'#4a3728',shirt:'#6c757d',pants:'#2b2d42',st:'cap',acc:'tie'}},
coordenadora:{n:'Coordenadora',eq:'Arqueiras',c:3,t:'u',cnt:2,hp:220,d:55,s:1.2,rg:5,h:1,air:1,sp:{skin:'#f1c9a0',hair:'#ff9f1c',shirt:'#06d6a0',pants:'#333',st:'long',acc:'glasses'}},
merendeira:{n:'Merendeira',eq:'Bruxa',c:5,t:'u',hp:750,d:90,s:1.1,rg:5,h:1.2,spl:1.5,air:1,sp:{skin:'#f1c9a0',hair:'#fff',shirt:'#ffd6e0',pants:'#555',st:'cap'}},
vicediretor:{n:'Vice-Diretor',eq:'Mini P.E.K.K.A',c:4,t:'u',hp:1000,d:340,s:1.2,rg:.4,h:1.6,sp:{skin:'#f1c9a0',hair:'#222',shirt:'#6d597a',pants:'#111',st:'hair',acc:'tie'}},
atleta:{n:'Treinador',eq:'Príncipe',c:5,t:'u',hp:1200,d:220,s:1.7,rg:.4,h:1.4,rad:.65,sp:{skin:'#8d5524',hair:'#111',shirt:'#e63946',pants:'#111',st:'spiky'}},
zelador:{n:'Zelador',eq:'Golem',c:8,t:'u',hp:3600,d:140,s:.7,rg:.4,h:1.6,bld:1,rad:.9,sp:{skin:'#c68b59',hair:'#444',shirt:'#2a9d8f',pants:'#1d3557',st:'cap',acc:'beard'}},
aviao:{n:'Avião de Papel',eq:'Bebê Dragão',c:4,t:'u',fly:1,air:1,hp:1000,d:100,s:1.4,rg:3.5,h:1.5,spl:1.5,rad:.6,sp:'plane'},
corujas:{n:'Bando de Corujas',eq:'Horda de Servos',c:5,t:'u',cnt:3,fly:1,air:1,hp:300,d:70,s:2,rg:.4,h:1,sp:'owl'},
quadro:{n:'Quadro Negro',eq:'Canhão',c:3,t:'b',b:1,hp:800,d:80,h:.9,rg:5.5,rad:.9,life:30,sp:'board'},
apagador:{n:'Apagador',eq:'Zap',c:2,t:'s',d:90,spl:2.5,sp:'eraser'}};
// arena em que a carta passa a poder cair nos baús (0 = inicial)
const AROF={cantina:1,quadro:1,merendeira:1,apagador:1,atleta:2,aviao:2,vicediretor:2,diretor:3,corujas:3,zelador:3};
for(const id in CARDS)CARDS[id].ar=AROF[id]||0;
