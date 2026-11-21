/* Editable 48 × 48 bead patterns, inspired by expressive pets and everyday objects. */
const extraTemplates=(()=>{
 const K='#343238',W='#fff4df',Y='#f3ce57',O='#d79a5d',B='#9d6346',PINK='#ec9aa9',RED='#d95961',G='#7b9b68',BLUE='#78bac7',PURPLE='#7974af';
 const catalog=[['困困橘猫','表情小剧场'],['草帽猫的假日','可爱萌宠'],['猫猫赶稿中','表情小剧场'],['蝴蝶结小白猫','可爱萌宠'],['星夜魔法小狗','萌宠换装'],['今天我是小国王','萌宠换装'],['侦探汪的放大镜','萌宠换装'],['雨天也要出门','萌宠换装'],['围巾企鹅','可爱萌宠'],['咖啡续命蛙','表情小剧场'],['气鼓鼓的小辣椒','表情小剧场'],['躺平小黄豆','表情小剧场'],['彩虹四角星','几何符号'],['橘子味小太阳','几何符号'],['送你一支玫瑰','花花草草'],['草莓奶油苏打','美食日常'],['复古随身听','趣味像素'],['害羞的小幽灵','趣味像素']];
 return catalog.map(([name,kind],i)=>{
 const a=Array(48*48).fill(null),put=(x,y,c)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&x<48&&y>=0&&y<48)a[y*48+x]=c;};
 const R=(x,y,w,h,c)=>{for(let v=y;v<y+h;v++)for(let u=x;u<x+w;u++)put(u,v,c);};
 const E=(x,y,rx,ry,c)=>{for(let v=Math.floor(y-ry);v<=y+ry;v++)for(let u=Math.floor(x-rx);u<=x+rx;u++)if(((u-x)/rx)**2+((v-y)/ry)**2<=1)put(u,v,c);};
 const L=(x,y,xx,yy,c,width=1)=>{const n=Math.max(Math.abs(xx-x),Math.abs(yy-y));for(let t=0;t<=n;t++)R(Math.round(x+(xx-x)*t/(n||1)),Math.round(y+(yy-y)*t/(n||1)),width,width,c);};
 const poly=(pts,c)=>{for(let y=0;y<48;y++)for(let x=0;x<48;x++){let hit=false;for(let j=0,k=pts.length-1;j<pts.length;k=j++){const [u,v]=pts[j],[uu,vv]=pts[k];if((v>y)!==(vv>y)&&x<(uu-u)*(y-v)/(vv-v)+u)hit=!hit;}if(hit)put(x,y,c);}};
 const eye=(x,y)=>{R(x,y,3,4,K);put(x,y,W);};
 const cheeks=()=>{R(12,27,4,2,PINK);R(32,27,4,2,PINK);};
 const sparkle=(x,y,c=Y)=>{L(x-2,y,x+2,y,c);L(x,y-2,x,y+2,c);};
 if(i<4){
  E(24,34,11,8,O);E(24,35,7,6,W);E(24,22,16,13,i===3?W:O);
  poly([[9,18],[10,7],[20,15]],i===3?W:O);poly([[28,14],[38,7],[39,19]],i===3?W:O);
  poly([[12,15],[12,10],[17,15]],PINK);poly([[32,15],[36,10],[36,16]],PINK);
  E(24,28,10,6,W);if(i!==3){R(22,11,3,7,B);R(17,13,2,4,B);R(28,13,2,4,B);L(9,23,14,25,B,2);L(34,25,39,23,B,2);}
  if(i===0){L(14,23,19,23,K);L(29,23,34,23,K);L(15,24,18,24,K);L(30,24,33,24,K);R(34,3,7,1,BLUE);L(40,4,35,8,BLUE);R(34,9,7,1,BLUE);}
  else {eye(16,22);eye(30,22);}
  R(23,27,3,2,PINK);L(24,29,22,31,K);L(24,29,27,31,K);L(5,27,11,28,K);L(36,28,42,27,K);
  if(i===1){E(24,13,21,3,Y);E(24,8,12,6,Y);R(13,10,23,3,B);R(17,4,12,2,'#f9e8a4');}
  if(i===2){L(14,20,20,22,K);L(28,22,34,20,K);R(10,33,29,10,BLUE);R(12,35,25,6,'#b8d6da');R(8,43,33,2,K);R(21,37,6,3,W);sparkle(42,12,RED);sparkle(5,12,RED);}
  if(i===3){poly([[27,9],[27,3],[35,7],[42,3],[42,14],[35,10]],RED);E(35,8,3,3,'#b84765');cheeks();R(19,37,11,4,PINK);}
 }else if(i<8){
  E(24,34,10,9,W);R(17,40,5,4,O);R(28,40,5,4,O);E(24,23,14,13,O);E(10,25,5,12,B);E(38,25,5,12,B);E(24,28,10,7,W);R(22,12,5,16,W);
  R(15,23,6,4,K);R(28,23,6,4,K);R(15,22,6,1,W);R(28,22,6,1,W);R(23,28,3,2,K);L(24,31,21,32,K);L(24,31,28,32,K);
  if(i===4){poly([[10,14],[26,2],[34,15]],PURPLE);E(24,15,20,3,PURPLE);L(14,13,33,13,Y,2);sparkle(25,7,W);R(16,34,18,5,PURPLE);L(40,25,40,42,B,2);sparkle(40,23,Y);}
  if(i===5){poly([[12,14],[10,5],[18,9],[24,3],[30,9],[37,5],[35,14]],Y);R(13,12,22,3,Y);R(22,10,4,3,RED);poly([[14,33],[12,42],[20,39],[24,44],[28,39],[36,42],[34,33]],PURPLE);R(22,34,4,5,Y);}
  if(i===6){E(24,12,17,3,K);poly([[13,11],[16,5],[28,4],[34,12]],'#536c63');L(34,32,41,42,B,3);E(35,26,8,9,K);E(35,26,6,7,BLUE);E(35,26,4,5,'#d1e7e8');L(32,24,36,21,W,2);}
  if(i===7){E(24,21,19,17,G);E(24,22,14,12,O);E(24,28,9,6,W);R(22,12,4,16,W);R(15,22,6,4,K);R(29,22,6,4,K);R(23,28,3,2,K);R(12,33,26,9,G);L(24,33,24,42,Y);R(12,42,9,3,Y);R(29,42,9,3,Y);[[5,8],[40,6],[43,17]].forEach(([x,y])=>{L(x,y,x-1,y+3,BLUE,2);});}
 }else if(i===8){
  const black='#111111',white='#ffffff',scarf='#d9002b',gold='#efb544';
  // Broad feet and short, stepped wings sit behind the round body.
  R(14,44,21,1,gold);R(13,43,23,1,gold);
  poly([[9,23],[6,25],[4,30],[3,37],[5,39],[7,37],[10,40],[12,31]],black);
  poly([[38,23],[41,25],[43,30],[44,37],[42,39],[40,37],[37,40],[35,31]],black);
  const bodyRows=[[20,28],[18,30],[16,32],[14,34],[13,35],[12,36],[11,37],[10,38],[9,39],[9,39],[8,40],[8,40],[8,40],...Array(16).fill([7,41]),...Array(4).fill([8,40]),[10,38],[10,38],[11,37],[12,36],[14,34],[18,30]];
  bodyRows.forEach(([left,right],y)=>R(left,y+5,right-left+1,1,black));
  // The white bib begins below the scarf and tapers at the feet.
  poly([[11,25],[37,25],[38,32],[35,39],[30,43],[18,43],[13,39],[10,32]],white);
  // Wide-eyed face: squared white eye patches with tiny black pupils.
  R(16,9,5,6,white);R(15,10,7,4,white);
  R(27,9,5,6,white);R(26,10,7,4,white);
  R(18,11,2,2,black);R(29,11,2,2,black);
  // Flat, golden beak, wider than the eyes' gap.
  R(18,18,13,4,gold);R(14,19,21,2,gold);R(21,17,7,1,gold);
  // Curved red wrap, with the short end hanging on the left.
  poly([[7,21],[12,22],[17,23],[32,23],[40,21],[40,24],[34,26],[17,27],[12,26],[7,24]],scarf);
  R(12,25,5,5,scarf);
  // Chest placard: hand-pixelled characters stay editable bead by bead.
  R(13,31,23,11,scarf);
  const glyphs=[
   ['000100100','011100101','000100100','111111111','000100100','001100101','110100010','000100101','001101011'],
   ['111111111','001000100','011110101','010010110','101100100','000100100','001000100','010000101','100000111']
  ];
  glyphs.forEach((rows,j)=>rows.forEach((row,y)=>[...row].forEach((v,x)=>{if(v==='1')put(15+j*11+x,32+y,white);})));
 }else if(i===9){
 E(24,28,16,15,G);E(15,14,8,8,G);E(33,14,8,8,G);E(15,14,5,5,W);E(33,14,5,5,W);R(13,15,5,3,K);R(31,15,5,3,K);L(13,25,34,25,K,2);E(24,35,10,7,'#b6c68b');R(4,28,13,13,W);R(5,26,11,3,B);E(18,33,3,4,W);E(18,33,1,2,null);R(8,31,5,5,B);L(8,19,10,22,'#acb1b1');L(13,17,12,22,'#acb1b1');
 }else if(i===10){
 L(23,12,25,5,G,3);L(25,5,32,6,G,3);E(17,24,10,14,RED);E(29,24,10,14,RED);E(23,32,12,10,RED);L(11,16,12,26,PINK,2);L(14,20,20,22,K,2);L(27,22,33,20,K,2);R(16,24,3,3,K);R(28,24,3,3,K);E(24,33,5,4,K);R(21,35,6,2,PINK);sparkle(41,16,Y);
 }else if(i===11){
 E(23,30,18,10,Y);E(34,23,10,11,Y);E(21,32,11,6,W);R(8,37,7,3,O);R(30,38,7,3,O);L(29,21,33,22,K);L(37,21,41,20,K);R(33,26,5,2,RED);R(35,28,3,2,PINK);R(8,9,7,1,BLUE);L(14,10,9,14,BLUE);R(8,15,7,1,BLUE);
 }else if(i===12){
 const cs=['#ee7e8e','#eca66d','#f2cf63','#a9c77d','#74c5c4','#7097cf'];
 for(let j=0;j<cs.length;j++)poly([[20+j,4+j],[25+j,18+j],[40+j,22+j],[25+j,26+j],[20+j,41+j],[16+j,26+j],[2+j,22+j],[16+j,18+j]],cs[j]);
 sparkle(35,7,Y);sparkle(7,36,PINK);
 }else if(i===13){
 for(let j=0;j<12;j++){const t=j*Math.PI/6;L(Math.round(24+15*Math.cos(t)),Math.round(24+15*Math.sin(t)),Math.round(24+20*Math.cos(t)),Math.round(24+20*Math.sin(t)),O,2);}
 E(24,24,13,13,O);E(24,24,11,11,Y);eye(18,21);eye(28,21);L(21,30,27,30,B);R(14,27,3,2,PINK);R(33,27,3,2,PINK);
 }else if(i===14){
 L(24,18,24,43,G,2);poly([[24,32],[13,25],[13,31],[24,36]],G);poly([[25,26],[36,20],[35,26],[25,30]],G);E(24,14,10,10,'#a94058');E(20,12,7,7,RED);E(28,12,7,7,RED);E(24,16,7,6,RED);L(20,9,27,9,PINK,2);L(27,9,29,14,PINK,2);L(19,17,25,18,'#a94058',2);poly([[17,20],[24,24],[31,20],[27,26],[21,26]],G);
 }else if(i===15){
 R(17,6,16,2,RED);R(29,6,3,15,RED);poly([[10,17],[38,17],[34,43],[14,43]],BLUE);poly([[12,19],[36,19],[32,40],[16,40]],'#bce3de');R(14,25,20,5,PINK);R(15,34,18,6,PINK);E(21,30,6,7,RED);poly([[16,24],[21,26],[27,24],[23,22],[19,22]],G);put(19,29,W);put(23,31,W);E(15,17,6,4,W);E(25,16,8,5,W);E(34,17,5,4,W);sparkle(41,8,Y);
 }else if(i===16){
 R(7,12,34,28,PURPLE);R(9,14,30,24,'#b2a7d1');R(12,17,24,14,K);R(14,19,20,10,W);E(19,24,4,4,BLUE);E(29,24,4,4,BLUE);E(19,24,1,1,K);E(29,24,1,1,K);L(19,24,29,24,K);R(15,34,18,2,PURPLE);R(13,8,7,4,PINK);R(24,8,10,4,Y);L(41,18,44,18,K,2);L(44,18,44,31,K,2);L(44,31,41,31,K,2);
 }else if(i===17){
 E(24,22,14,16,W);poly([[10,22],[38,22],[39,41],[32,37],[26,42],[20,38],[14,42],[9,38]],W);eye(17,21);eye(29,21);E(25,29,3,4,PINK);R(11,27,4,2,PINK);R(33,27,4,2,PINK);sparkle(5,12,PURPLE);sparkle(41,8,Y);
 }
 // A one-bead outline makes silhouettes readable on light and dark backgrounds.
 const cells=[...a];a.forEach((c,n)=>{if(!c||i===8)return;const x=n%48,y=Math.floor(n/48);for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,yy=y+dy;if(xx>=0&&xx<48&&yy>=0&&yy<48&&!a[yy*48+xx])cells[yy*48+xx]=K;}});
 return {name,kind,size:48,cells,bg:['#f2e7d5','#e7ecdc','#e8e5f1','#f3e2e4'][i%4]};
 });
})();
