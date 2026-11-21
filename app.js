const $=s=>document.querySelector(s), main=$('#main');
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem('dou-'+k))??d}catch{return d}},write=(k,v)=>{try{localStorage.setItem('dou-'+k,JSON.stringify(v));return true}catch{toast('本地空间不足，请先导出图纸');return false}};
let favorites=read('favorites',[]),projects=read('projects',[]),page='gallery',category='全部',query='',selectedColor='#507345',tool='pen',cells=[],size=32,grid=true,history=[],imageSource=null,currentProject=null,imageMeta=null,imageRequest=0;
const palette=['#f9f7ed','#343c35','#6d8953','#a9bf82','#d3dfa5','#f2d67d','#dbad64','#b88153','#f4c2be','#d98586','#b45362','#a9c6cd','#5e879f','#a398bb','#d7cde3','#ffffff'];
const names=['小兔的草莓花园','今天也要元气满满','一朵会微笑的小花','把春天装进口袋','森林里的小小蘑菇','云朵来信','奶油草莓小蛋糕','一颗桃子味的心'];
const items=names.map((name,i)=>({id:'t'+i,name,kind:['可爱萌宠','美食日常','花花草草','可爱萌宠','花花草草','趣味像素','美食日常','趣味像素'][i],bg:['#f1e8e2','#f5edcd','#f2ebd5','#f2ebd8','#ede5db','#e5edf0','#f1e3e0','#eee7ed'][i],index:i}));
const libraryTemplates=[...extraTemplates,...referenceTemplates];
libraryTemplates.forEach((item,i)=>items.push({...item,id:'t'+(i+8),index:i+8}));
// Keep template IDs and indices stable; only change gallery presentation order.
const referenceStart=names.length+extraTemplates.length;
const galleryItems=[...items.slice(referenceStart),...items.slice(names.length,referenceStart),...items.slice(0,names.length)];
function toast(s){$('#toast').textContent=s;$('#toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2600)}
function template(index){if(index>=8)return [...libraryTemplates[index-8].cells];let a=Array(32*32).fill(null);const put=(x,y,c)=>{if(x>=0&&x<32&&y>=0&&y<32)a[y*32+x]=c},rect=(x,y,w,h,c)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)put(i,j,c)},ellipse=(x,y,rx,ry,c)=>{for(let j=0;j<32;j++)for(let i=0;i<32;i++)if(((i-x)/rx)**2+((j-y)/ry)**2<=1)put(i,j,c)},eye=(x,y)=>rect(x,y,2,2,'#343c35');
const cream='#f9f7ed',green='#6d8953',pink='#d98586',dark='#b88153';
if(index===0){ellipse(12,10,3,8,cream);ellipse(21,10,3,8,cream);rect(11,4,2,9,'#f4c2be');rect(20,4,2,9,'#f4c2be');ellipse(16,20,10,9,cream);eye(12,17);eye(20,17);rect(16,21,2,1,pink);rect(9,21,3,2,'#f4c2be');rect(22,21,3,2,'#f4c2be');ellipse(17,27,5,4,pink);rect(15,23,5,2,green);put(15,27,cream);put(19,28,cream)}
if(index===1){ellipse(16,18,10,10,'#f2d67d');ellipse(16,12,11,7,'#f2d67d');rect(7,12,6,3,'#f9e9a5');eye(12,17);eye(20,17);rect(16,20,3,2,'#dbad64');rect(11,28,4,2,'#dbad64');rect(20,28,4,2,'#dbad64');rect(17,4,2,3,'#dbad64')}
if(index===2){rect(15,19,2,11,green);ellipse(11,25,5,2,green);ellipse(20,27,4,2,green);[[16,6],[9,10],[9,17],[16,21],[23,17],[23,10]].forEach(([x,y])=>ellipse(x,y,5,5,cream));ellipse(16,14,6,6,'#f2d67d');put(14,13,'#343c35');put(18,13,'#343c35');rect(15,16,3,1,dark)}
if(index===3){ellipse(16,20,10,9,'#a9bf82');ellipse(10,11,5,5,'#a9bf82');ellipse(22,11,5,5,'#a9bf82');ellipse(10,11,3,3,cream);ellipse(22,11,3,3,cream);eye(10,10);eye(21,10);rect(13,19,7,1,green);rect(10,19,2,2,pink);rect(22,19,2,2,pink);rect(8,28,6,2,green);rect(20,28,6,2,green)}
if(index===4){rect(12,16,9,13,cream);ellipse(16,13,12,9,'#b45362');rect(4,15,25,5,'#b45362');rect(8,11,4,3,cream);rect(19,8,4,4,cream);rect(21,15,4,3,cream);eye(14,23);eye(19,23);rect(7,29,19,2,green);rect(8,27,2,2,green)}
if(index===5){ellipse(16,15,7,8,cream);ellipse(9,18,6,6,cream);ellipse(23,18,6,6,cream);rect(8,18,17,7,cream);eye(12,18);eye(20,18);rect(15,22,3,1,pink);rect(10,27,2,3,'#a9c6cd');rect(22,28,2,3,'#a9c6cd');rect(16,29,2,2,'#a9c6cd')}
if(index===6){rect(6,14,21,14,'#dbad64');rect(6,14,21,5,cream);rect(6,22,21,3,'#f4c2be');ellipse(16,13,11,3,cream);ellipse(16,9,4,4,'#d98586');rect(14,4,5,2,green);put(15,8,cream);put(18,10,cream);eye(11,18);eye(21,18);rect(7,28,19,2,dark)}
if(index===7){ellipse(11,12,7,7,pink);ellipse(22,12,7,7,pink);for(let y=12;y<28;y++)for(let x=3+(y-12);x<30-(y-12);x++)put(x,y,pink);rect(8,9,3,2,'#f4c2be');rect(7,11,2,3,'#f4c2be');eye(11,15);eye(21,15);rect(15,19,3,1,'#b45362')}
return a}
function paint(canvas,data,n=32,beads=true,lines=false){const scale=beads?14:20;canvas.width=canvas.height=n*scale;let c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);if(!beads){c.fillStyle='#fff';c.fillRect(0,0,canvas.width,canvas.height)}data.forEach((color,i)=>{let x=(i%n)*scale,y=Math.floor(i/n)*scale;if(color){c.fillStyle=color;c.fillRect(x+(beads?1:0),y+(beads?1:0),scale-(beads?1.2:0),scale-(beads?1.2:0));if(beads){c.fillStyle='#00000016';c.beginPath();c.arc(x+7,y+7,2.3,0,Math.PI*2);c.fill();c.fillStyle='#ffffff30';c.fillRect(x+2,y+2,scale-4,1)}}if(lines){c.strokeStyle='#a4ad9d70';c.lineWidth=.6;c.strokeRect(x,y,scale,scale)}})}
function card(item){return `<article class="card" data-open-template="${item.id}" style="--bg:${item.bg}"><div class="card-image" role="button" tabindex="0" aria-label="编辑${item.name}" data-open-template="${item.id}"><canvas data-art="${item.index}"></canvas><span class="card-tag">示例图纸</span><button class="save-heart ${favorites.includes(item.id)?'saved':''}" aria-label="收藏${item.name}" data-fav="${item.id}">${favorites.includes(item.id)?'♥':'♡'}</button></div><div class="card-body"><h3><button class="card-title" data-open-template="${item.id}">${item.name}</button></h3><div class="meta">${item.size||32} × ${item.size||32} 格 · ${new Set(template(item.index).filter(Boolean)).size} 色 · ${item.size?'细节进阶':'入门友好'}</div></div></article>`}
function renderCards(){let list=(page==='gallery'?galleryItems:items).filter(i=>(page!=='favorites'||favorites.includes(i.id))&&(category==='全部'||i.kind===category)&&(!query||i.name.includes(query)||i.kind.includes(query)));$('#cards').innerHTML=list.length?list.map(card).join(''):'<div class="empty">还没有找到图案<p>换个关键词，或收藏你喜欢的作品吧</p></div>';document.querySelectorAll('[data-art]').forEach(c=>paint(c,template(+c.dataset.art),items[+c.dataset.art].size||32))}
function gallery(){main.innerHTML=`${page==='gallery'?`<section class="hero"><div class="hero-copy"><div class="eyebrow">LITTLE BEADS, BIG JOY</div><h1><span class="hero-desktop">把喜欢的日常，<br>拼成<em>小小的美好。</em></span><span class="hero-mobile">把喜欢，<em>拼成小美好</em></span></h1><p><span class="hero-desktop">一张图片，一把彩豆，让天马行空的想象落在指尖。</span><span class="hero-mobile">图片一键转成拼豆图纸</span></p><button class="primary" data-nav="studio"><span class="hero-desktop">✧ 制作我的拼豆图纸</span><span class="hero-mobile">✧ 开始创作</span></button><button class="text-btn" id="guide">新手怎么玩？</button></div><div class="hero-mobile-art" aria-hidden="true"><canvas data-art="38"></canvas><canvas data-art="12"></canvas></div><div class="hero-art"><div class="art-paper"><div class="tape"></div><canvas data-art="38"></canvas><span>A LITTLE HAPPINESS</span></div><div class="art-paper second"><div class="tape"></div><canvas data-art="12"></canvas><span>GROW YOUR OWN JOY</span></div><span class="float-star">✦</span></div></section><div class="quick-row"><button class="quick" data-nav="studio"><span class="symbol">✧</span><span><b>图片变图纸</b><small>把喜欢，一键变成拼豆</small></span></button><button class="quick" id="blank"><span class="symbol">▦</span><span><b>从空白开始</b><small>一格一格，创造你的灵感</small></span></button><button class="quick" id="tutorial"><span class="symbol"><svg class="guide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 5v16M12 5C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 1Z"/><path d="M5 8h4M5 12h4m6-4h4m-4 4h4"/></svg></span><span><b>新手拼豆指南</b><small>第一件作品，从这里开始</small></span></button></div>`:''}<div class="section-title"><div><h2>${page==='favorites'?'我的收藏':'灵感广场'} <span style="color:var(--accent-ink);font-size:19px">✦</span></h2></div><div class="search"><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input id="search" placeholder="搜一搜你喜欢的图案" aria-label="搜索图案"></div></div><div class="filters"><div class="chips">${['全部','可爱萌宠','萌宠换装','表情小剧场','花花草草','美食日常','几何符号','像素角色','像素头像','趣味像素'].map(x=>`<button class="chip ${category===x?'active':''}" data-category="${x}">${x}</button>`).join('')}</div></div><div class="grid" id="cards"></div>`;renderCards();$('#search').value=query;$('#search').oninput=e=>{query=e.target.value;renderCards()}}
function openTemplate(index){
  cells=template(index);
  size=items[index].size||32;
  history=[];
  currentProject=null;
  clearUpload();
  navigate('studio');
}
function navigate(to){page=to;document.body.classList.toggle('studio-mode',to==='studio');category='全部';query='';document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.nav===to));$('#crumb').innerHTML='创作空间 / <b>'+({gallery:'灵感广场',studio:'图纸工作台',projects:'我的作品',favorites:'我的收藏'}[to])+'</b>';if(to==='studio'){if(!cells.length)cells=template(0);studio()}else if(to==='projects')projectPage();else gallery();window.scrollTo(0,0)}
function gridButtonContent(){
  const eye=grid?'<path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.5 4.3A11 11 0 0 1 12 4c6 0 10 8 10 8a19 19 0 0 1-3.1 4.1M6.1 6.1A21 21 0 0 0 2 12s4 8 10 8a10 10 0 0 0 5.1-1.5"/>':'<path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>';
  return `<svg class="tool-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${eye}</svg><span>${grid?'隐藏':'显示'}网格</span>`;
}
function studio(){main.innerHTML=`<div class="section-title"><div><h2>图纸工作台 <span style="color:var(--accent-ink)">✧</span></h2><p>让灵感落到每一格里，慢慢拼出自己的喜欢</p></div><button class="secondary" id="save">保存作品</button></div><div class="studio"><section class="workspace"><div class="tools"><button data-tool="pen" class="${tool==='pen'?'active':''}"><svg class="tool-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m16 3 5 5M4 15l-1 6 6-1L21 8a2.1 2.1 0 0 0-5-5L4 15Z"/></svg><span>画笔</span></button><button data-tool="eraser" class="${tool==='eraser'?'active':''}"><svg class="tool-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m15 3 6 6a2 2 0 0 1 0 3l-8 9H8l-5-5a2 2 0 0 1 0-3l9-10a2 2 0 0 1 3 0Z"/><path d="m7 9 8 8M13 21h8"/></svg><span>擦除</span></button><button id="undo"><svg class="tool-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 4v6h6"/><path d="m3 10 4-4a8 8 0 1 1-1 12"/></svg><span>撤销</span></button><button id="grid">${gridButtonContent()}</button><button id="export"><svg class="tool-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/></svg><span>导出图纸 PNG</span></button></div><div class="canvas-wrap"><canvas id="editor" aria-label="拼豆网格编辑画布"></canvas></div><div class="stats"><span id="dimensions"></span><span id="total"></span><span id="coord">点击或拖动画布绘制</span></div></section><aside-panel class="panel"><h3>创作设置</h3><form id="settings"><div class="upload-zone" id="upload-zone"><input id="upload" type="file" accept="image/png,image/jpeg,image/webp" aria-label="选择图片" hidden><button class="drop" id="drop" type="button">＋<strong>上传一张喜欢的图片</strong><small>PNG / JPG / WEBP · 最大 10MB</small></button><div class="uploaded-image" id="uploaded-image" hidden><div class="upload-summary"><img id="upload-preview" alt="所选图片预览"><div class="upload-info"><span class="upload-status">✓ 图片已就绪</span><strong id="filename"></strong><small id="filemeta"></small></div></div><div class="upload-actions"><button type="button" class="secondary" id="replace-image">更换图片</button><button type="button" class="remove-image" id="remove-image">移除</button></div></div></div><div><label for="size">图纸尺寸</label><select id="size">${[24,32,48,64,96].map(n=>`<option ${n===size?'selected':''} value="${n}">${n} × ${n} 格</option>`).join('')}</select></div><div><label for="colors">色彩数量上限</label><select id="colors"><option value="8">8 色 · 简约</option><option value="12" selected>12 色 · 推荐</option><option value="16">16 色 · 丰富</option></select></div><button class="primary" type="submit">✧ 生成拼豆图纸</button></form><p class="notice">本地图片转图 · 免费使用<br>透明区域保留为空格，图片不会上传。</p><h3 style="margin-top:24px">画笔配色</h3><div class="palette">${palette.map(c=>`<button class="swatch ${c===selectedColor?'active':''}" style="background:${c}" data-color="${c}" aria-label="选择颜色 ${c}"></button>`).join('')}</div><label for="colorhex">自选颜色</label><div class="custom-color"><input type="color" id="customcolor" value="${selectedColor}" aria-label="打开画笔颜色选择器" title="点击选择画笔颜色"><div class="color-value"><span class="hex-label">HEX 色值</span><input type="text" id="colorhex" value="${selectedColor.toUpperCase()}" maxlength="7" spellcheck="false" autocomplete="off" aria-label="画笔 HEX 色值" aria-describedby="color-error"></div></div><p class="color-error" id="color-error" aria-live="polite" hidden></p><h3 style="margin-top:22px">用豆清单 <button class="secondary" id="csv">导出 CSV</button></h3><p class="notice">按颜色统计；实际品牌色号请对照色卡。</p><div class="counts" id="counts"></div></aside-panel></div>`;updateCanvas();renderUpload();let drawing=false,last=null;const canvas=$('#editor');const dab=e=>{let r=canvas.getBoundingClientRect(),x=Math.floor((e.clientX-r.left)/r.width*size),y=Math.floor((e.clientY-r.top)/r.height*size);if(x<0||x>=size||y<0||y>=size)return;$('#coord').textContent=`坐标 ${x+1}, ${y+1}`;if(!drawing)return;const place=(a,b)=>cells[b*size+a]=tool==='eraser'?null:selectedColor;if(last){const steps=Math.max(Math.abs(x-last[0]),Math.abs(y-last[1]));for(let i=0;i<=steps;i++)place(Math.round(last[0]+(x-last[0])*i/(steps||1)),Math.round(last[1]+(y-last[1])*i/(steps||1)))}else place(x,y);last=[x,y];updateCanvas()};canvas.onpointerdown=e=>{rememberCanvas();drawing=true;last=null;canvas.setPointerCapture(e.pointerId);dab(e)};canvas.onpointermove=dab;canvas.onpointerup=canvas.onpointercancel=()=>{drawing=false;last=null};$('#size').onchange=e=>resizeCanvas(Number(e.target.value));$('#upload').onchange=e=>{const file=e.target.files[0];e.target.value='';loadFile(file)};$('#drop').onclick=$('#replace-image').onclick=()=>$('#upload').click();$('#remove-image').onclick=()=>{clearUpload();renderUpload()};$('#upload-zone').ondragover=e=>e.preventDefault();$('#upload-zone').ondrop=e=>{e.preventDefault();loadFile(e.dataTransfer.files[0])};$('#settings').onsubmit=e=>{e.preventDefault();generate()};$('#customcolor').oninput=e=>setBrushColor(e.target.value);
$('#colorhex').oninput=e=>{
  $('#color-error').hidden=true;
  e.target.removeAttribute('aria-invalid');
  if(/^#?[0-9a-f]{6}$/i.test(e.target.value.trim()))setBrushColor(e.target.value);
};
$('#colorhex').onblur=commitHexColor;
$('#colorhex').onkeydown=e=>{
  if(e.key==='Enter'){e.preventDefault();commitHexColor()}
  if(e.key==='Escape'){e.preventDefault();setBrushColor(selectedColor)}
};}
function normalizeColor(value){
  let hex=value.trim().replace(/^#/,'');
  if(!/^(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex))return null;
  if(hex.length===3)hex=[...hex].map(c=>c+c).join('');
  return '#'+hex.toLowerCase();
}
function setBrushColor(value){
  const color=normalizeColor(value);
  if(!color)return;
  selectedColor=color;
  tool='pen';
  $('#customcolor').value=color;
  $('#colorhex').value=color.toUpperCase();
  $('#colorhex').removeAttribute('aria-invalid');
  $('#color-error').hidden=true;
  document.querySelectorAll('.swatch').forEach(button=>{
    const active=button.dataset.color.toLowerCase()===color;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  document.querySelectorAll('[data-tool]').forEach(button=>button.classList.toggle('active',button.dataset.tool===tool));
}
function commitHexColor(){
  const color=normalizeColor($('#colorhex').value);
  if(color){setBrushColor(color);return}
  $('#colorhex').setAttribute('aria-invalid','true');
  $('#color-error').textContent='请输入有效色值，如 #F2D67D 或 #FC0';
  $('#color-error').hidden=false;
}
function rememberCanvas(){
  history.push({cells:[...cells],size});
  if(history.length>30)history.shift();
}
function resizeCanvas(nextSize){
  if(![24,32,48,64,96].includes(nextSize)||nextSize===size)return;
  rememberCanvas();
  // Nearest-neighbor sampling preserves bead colors and transparent cells.
  // Resize the edited pattern, not the upload, so manual work is retained.
  const previousSize=size, previousCells=cells;
  cells=Array.from({length:nextSize*nextSize},(_,index)=>{
    const x=index%nextSize, y=Math.floor(index/nextSize);
    const sourceX=Math.min(previousSize-1,Math.floor((x+.5)*previousSize/nextSize));
    const sourceY=Math.min(previousSize-1,Math.floor((y+.5)*previousSize/nextSize));
    return previousCells[sourceY*previousSize+sourceX]??null;
  });
  size=nextSize;
  $('#coord').textContent='点击或拖动画布绘制';
  updateCanvas();
  toast(`图纸已调整为 ${size} × ${size} 格，可撤销`);
}
function updateCanvas(){$('#size').value=String(size);paint($('#editor'),cells,size,false,grid);$('#dimensions').textContent=`${size} × ${size} 格`;$('#total').textContent=`${cells.filter(Boolean).length} 颗豆 · ${new Set(cells.filter(Boolean)).size} 色`;$('#counts').innerHTML=Object.entries(counts()).sort((a,b)=>b[1]-a[1]).map(([c,n])=>`<div class="count-row"><span><i style="background:${c}"></i>${c.toUpperCase()}</span><b>${n} 颗</b></div>`).join('')}
function counts(){return cells.filter(Boolean).reduce((a,c)=>(a[c]=(a[c]||0)+1,a),{})}
function clearUpload(){
  imageRequest++;
  if(imageMeta)URL.revokeObjectURL(imageMeta.url);
  imageSource=null;imageMeta=null;
}
function renderUpload(){
  if(!$('#upload-zone'))return;
  const ready=!!(imageSource&&imageMeta);
  $('#drop').hidden=ready;
  $('#uploaded-image').hidden=!ready;
  if(!ready){$('#upload-preview').removeAttribute('src');return}
  $('#upload-preview').src=imageMeta.url;
  $('#filename').textContent=imageMeta.name;
  $('#filename').title=imageMeta.name;
  const bytes=imageMeta.bytes;
  const fileSize=bytes>=1024*1024?(bytes/1024/1024).toFixed(1)+' MB':Math.max(1,Math.round(bytes/1024))+' KB';
  $('#filemeta').textContent=`${imageSource.naturalWidth} × ${imageSource.naturalHeight} · ${fileSize}`;
}
function loadFile(f){
  if(!f)return;
  if(!['image/png','image/jpeg','image/webp'].includes(f.type)||f.size>10*1024*1024)return toast('请选择 10MB 以内的 PNG、JPG 或 WEBP');
  const request=++imageRequest,url=URL.createObjectURL(f),im=new Image();
  im.onload=()=>{
    if(request!==imageRequest){URL.revokeObjectURL(url);return}
    if(imageMeta)URL.revokeObjectURL(imageMeta.url);
    imageSource=im;imageMeta={name:f.name,bytes:f.size,url};
    renderUpload();toast('图片已就绪，点击生成图纸');
  };
  im.onerror=()=>{URL.revokeObjectURL(url);if(request===imageRequest)toast('图片无法读取，请换一张试试')};
  im.src=url;
}
function generate(){if(!imageSource)return toast('请先上传图片；也可以直接编辑当前图案');const n=+$('#size').value,k=+$('#colors').value,c=document.createElement('canvas');c.width=c.height=n;let ctx=c.getContext('2d'),im=imageSource,ratio=Math.min(n/im.width,n/im.height);ctx.drawImage(im,(n-im.width*ratio)/2,(n-im.height*ratio)/2,im.width*ratio,im.height*ratio);let raw=ctx.getImageData(0,0,n,n).data,pixels=[],hist={};for(let i=0;i<raw.length;i+=4){if(raw[i+3]<100){pixels.push(null);continue}let rgb=[raw[i],raw[i+1],raw[i+2]];pixels.push(rgb);let key=rgb.map(v=>Math.min(255,Math.round(v/24)*24)).join(',');hist[key]=(hist[key]||0)+1}let centers=Object.entries(hist).sort((a,b)=>b[1]-a[1]).slice(0,k).map(([s])=>s.split(',').map(Number));if(!centers.length)return toast('图片完全透明，请选择有内容的图片');const near=p=>centers.reduce((best,c,i)=>{const d=c.reduce((s,v,j)=>s+(v-p[j])**2,0);return d<best[1]?[i,d]:best},[0,Infinity])[0];for(let loop=0;loop<7;loop++){let sums=centers.map(()=>[0,0,0,0]);pixels.forEach(p=>{if(p){let s=sums[near(p)];p.forEach((v,j)=>s[j]+=v);s[3]++}});centers=centers.map((c,i)=>sums[i][3]?sums[i].slice(0,3).map(v=>Math.round(v/sums[i][3])):c)}size=n;cells=pixels.map(p=>p?'#'+centers[near(p)].map(v=>v.toString(16).padStart(2,'0')).join(''):null);history=[];currentProject=null;updateCanvas();toast('图纸已生成，可以开始微调了')}
function download(blob,name){const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500)}
function exportPNG(){const c=document.createElement('canvas'),legend=Object.entries(counts()),step=22,margin=35;c.width=Math.max(size*step+70,500);c.height=size*step+125+Math.ceil(legend.length/4)*30;let ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#344b32';ctx.font='bold 20px sans-serif';ctx.fillText('豆点 · 拼豆图纸',margin,30);ctx.font='10px sans-serif';for(let i=0;i<size;i++){ctx.fillText(i+1,margin+i*step+5,55);ctx.fillText(i+1,10,70+i*step+14)}cells.forEach((color,i)=>{let x=margin+i%size*step,y=70+Math.floor(i/size)*step;ctx.fillStyle=color||'#fff';ctx.fillRect(x,y,step,step);ctx.strokeStyle='#c6ccc1';ctx.strokeRect(x,y,step,step);if(color){let idx=legend.findIndex(([s])=>s===color)+1;ctx.fillStyle=parseInt(color.slice(1,3),16)*.299+parseInt(color.slice(3,5),16)*.587+parseInt(color.slice(5,7),16)*.114>150?'#344332':'white';ctx.fillText(idx,x+6,y+14)}});legend.forEach(([color,num],i)=>{let x=margin+(i%4)*(c.width-70)/4,y=size*step+100+Math.floor(i/4)*30;ctx.fillStyle=color;ctx.fillRect(x,y,15,15);ctx.strokeStyle='#aaa';ctx.strokeRect(x,y,15,15);ctx.fillStyle='#344332';ctx.fillText(`${i+1}. ${color} × ${num}`,x+20,y+11)});c.toBlob(b=>download(b,'豆点-拼豆图纸.png'))}
function saveProject(){let id=currentProject||Date.now().toString();let existing=projects.find(p=>p.id===id),name=existing?.name||'我的拼豆作品 '+(projects.length+1),entry={id,name,size,cells:[...cells],date:new Date().toLocaleDateString('zh-CN')};let next=projects.filter(p=>p.id!==id);next.unshift(entry);if(write('projects',next)){projects=next;currentProject=id;toast('作品已保存在当前浏览器')}}
function projectPage(){main.innerHTML=`<div class="section-title"><div><h2>我的作品</h2><p>每一份小小热爱，都值得好好收藏 · 保存在当前浏览器</p></div><button class="primary" data-nav="studio">＋ 新的灵感</button></div><div class="grid">${projects.length?projects.map((p,i)=>`<article class="card"><div class="card-image" style="--bg:#f5edd6" data-project="${p.id}" role="button" tabindex="0" aria-label="编辑作品"><canvas id="project-${i}"></canvas></div><div class="card-body"><h3>我的拼豆作品 ${projects.length-i}</h3><div class="meta">${p.size} × ${p.size} · ${p.date}</div><div class="project-actions"><button data-project="${p.id}">继续编辑</button><button data-delete="${p.id}">删除作品</button></div></div></article>`).join(''):'<div class="empty"><h2>第一份作品，等你来拼</h2><p>从一张喜欢的图片开始，保存你的专属图纸。</p><button class="primary" data-nav="studio">开始创作</button></div>'}</div>`;projects.forEach((p,i)=>paint($('#project-'+i),p.cells,p.size))}
function showModal(html){$('#modal-content').innerHTML=html;$('#modal').showModal()}
function guide(){showModal('<div class="guide"><div class="eyebrow">YOUR FIRST LITTLE CREATION</div><h2>拼豆，从一点点喜欢开始</h2><p>① 上传图片或在灵感广场选一个图案。新手推荐 32 × 32 格、8–12 色。</p><p>② 在工作台用画笔调整细节，橡皮擦去多余色块。用豆清单会实时更新。</p><p>③ 导出带坐标、颜色编号和数量的 PNG 图纸，对照你手上的品牌色卡准备材料。</p><p>④ 在拼豆板上按图摆豆，覆盖熨烫纸，按材料厂商说明熨烫定型。儿童请在成人陪同下使用熨斗。</p><button class="primary" data-start>开始我的第一件作品</button></div>')}
document.addEventListener('click',e=>{let b=e.target.closest('button,[data-open-template],[data-project]');if(!b)return;if(b.dataset.nav){navigate(b.dataset.nav);return}if(b.dataset.category){category=b.dataset.category;document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x.dataset.category===category));renderCards()}if(b.dataset.fav){let id=b.dataset.fav;favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];write('favorites',favorites);renderCards();return}if(b.dataset.openTemplate){const item=items.find(x=>x.id===b.dataset.openTemplate);if(item)openTemplate(item.index);return}if(b.dataset.project){let p=projects.find(x=>x.id===b.dataset.project);cells=[...p.cells];size=p.size;currentProject=p.id;history=[];clearUpload();navigate('studio')}if(b.dataset.delete){const id=b.dataset.delete;showModal('<h2>删除这份作品？</h2><p class="notice">删除后无法恢复，请先导出需要保留的图纸。</p><button class="primary" id="confirm-delete">确认删除</button>');$('#confirm-delete').onclick=()=>{projects=projects.filter(p=>p.id!==id);write('projects',projects);if(currentProject===id)currentProject=null;$('#modal').close();projectPage()}}if(b.dataset.tool){tool=b.dataset.tool;document.querySelectorAll('[data-tool]').forEach(x=>x.classList.toggle('active',x.dataset.tool===tool))}if(b.dataset.color){setBrushColor(b.dataset.color)}if(b.hasAttribute('data-start')){$('#modal').close();navigate('studio')}if(b.classList.contains('close'))$('#modal').close();switch(b.id){case'help':case'guide':case'tutorial':guide();break;case'blank':cells=Array(1024).fill(null);size=32;history=[];currentProject=null;clearUpload();navigate('studio');break;case'undo':if(history.length){const previous=history.pop();cells=previous.cells;size=previous.size;$('#coord').textContent='点击或拖动画布绘制';updateCanvas()}else toast('还没有可撤销的修改');break;case'grid':grid=!grid;b.innerHTML=gridButtonContent();updateCanvas();break;case'save':saveProject();break;case'export':exportPNG();break;case'csv':download(new Blob(['\uFEFF颜色,数量\n'+Object.entries(counts()).map(x=>x.join(',')).join('\n')],{type:'text/csv;charset=utf-8'}),'豆点-用豆清单.csv');break;}});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role="button"][data-open-template],[data-project]')){e.preventDefault();e.target.click()}});$('#modal').onclick=e=>{if(e.target===$('#modal'))$('#modal').close()};navigate('gallery');if(location.hash.startsWith('#template-t')){const i=Number(location.hash.slice(11));if(Number.isInteger(i)&&i>=0&&i<items.length){openTemplate(i)}}
