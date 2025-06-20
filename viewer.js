let pages=[];
let surfaceMap={};
let currentPage=1;

function parseTEI(){
  return fetch('book_data/book.xml').then(r=>r.text()).then(txt=>{
    const parser=new DOMParser();
    const xml=parser.parseFromString(txt,'application/xml');
    // build surfaces
    xml.querySelectorAll('facsimile>surface').forEach(s=>{
      const id=s.getAttribute('xml:id');
      const graphic=s.querySelector('graphic');
      const img=graphic.getAttribute('url');
      const width=parseInt(graphic.getAttribute('width')); 
      const height=parseInt(graphic.getAttribute('height'));
      const zones=[];
      s.querySelectorAll('zone').forEach(z=>{
        zones.push({
          id:z.getAttribute('xml:id'),
          ulx:parseInt(z.getAttribute('ulx')||0),
          uly:parseInt(z.getAttribute('uly')||0),
          lrx:parseInt(z.getAttribute('lrx')||0),
          lry:parseInt(z.getAttribute('lry')||0)
        });
      });
      surfaceMap[id]={img,width,height,zones};
    });
    // build pages
    const div=xml.querySelector('text body div');
    if(!div) return;
    const nodes=Array.from(div.childNodes);
    let page=null;
    nodes.forEach(n=>{
      if(n.nodeName==='pb'){
        if(page) pages.push(page);
        const nnum=parseInt(n.getAttribute('n')); 
        const facs=n.getAttribute('facs');
        page={n:nnum,surface:facs?facs.substring(1):null,nodes:[]};
      }else{
        if(page) page.nodes.push(n.cloneNode(true));
      }
    });
    if(page) pages.push(page);
  });
}

function renderPage(num){
  const page=pages.find(p=>p.n===num);
  if(!page) return;
  currentPage=num;
  document.getElementById('pageInput').value=num;
  // text
  const textPane=document.getElementById('textPane');
  const serializer=new XMLSerializer();
  textPane.innerHTML=page.nodes.map(n=>serializer.serializeToString(n)).join('');
  textPane.querySelectorAll('[facs]').forEach(el=>{
    el.classList.add('facs-linked');
    el.addEventListener('click',()=>highlightZone(el.getAttribute('facs').substring(1)));
  });
  // image
  const imgInfo=surfaceMap[page.surface];
  const img=document.getElementById('facsimileImg');
  img.src='book_data/images/'+imgInfo.img;
  img.onload=()=>drawZones(page.surface);
}

function drawZones(surfaceId){
  const info=surfaceMap[surfaceId];
  const overlay=document.getElementById('overlay');
  overlay.innerHTML='';
  const img=document.getElementById('facsimileImg');
  const scaleX=img.clientWidth/info.width;
  const scaleY=img.clientHeight/info.height;
  info.zones.forEach(z=>{
    const div=document.createElement('div');
    div.className='zone';
    div.style.left=(z.ulx*scaleX)+'px';
    div.style.top=(z.uly*scaleY)+'px';
    div.style.width=((z.lrx-z.ulx)*scaleX)+'px';
    div.style.height=((z.lry-z.uly)*scaleY)+'px';
    div.dataset.zoneId=z.id;
    div.addEventListener('click',()=>scrollToText(z.id));
    overlay.appendChild(div);
  });
}

function highlightZone(zoneId){
  const overlay=document.getElementById('overlay');
  const zone=overlay.querySelector('[data-zone-id="'+zoneId+'"]');
  if(zone){
    zone.classList.add('highlight');
    setTimeout(()=>zone.classList.remove('highlight'),1000);
  }
}

function scrollToText(zoneId){
  const el=document.querySelector('[facs="#'+zoneId+'"]');
  if(el){
    el.classList.add('highlight');
    el.scrollIntoView({behavior:'smooth',block:'center'});
    setTimeout(()=>el.classList.remove('highlight'),1000);
  }
}

function setupNav(){
  document.getElementById('prevBtn').addEventListener('click',()=>{
    if(currentPage>1) renderPage(currentPage-1);
  });
  document.getElementById('nextBtn').addEventListener('click',()=>{
    if(currentPage<pages.length) renderPage(currentPage+1);
  });
  document.getElementById('pageInput').addEventListener('change',e=>{
    const n=parseInt(e.target.value); if(n>=1&&n<=pages.length) renderPage(n);
  });
}

function setupResize(){
  const divider=document.getElementById('divider');
  const container=document.getElementById('container');
  let down=false;
  divider.addEventListener('mousedown',()=>{down=true;});
  document.addEventListener('mouseup',()=>{down=false;});
  document.addEventListener('mousemove',e=>{
    if(!down) return;
    const rect=container.getBoundingClientRect();
    const percent=(e.clientX-rect.left)/rect.width*100;
    document.getElementById('textPane').style.flex='0 0 '+percent+'%';
    document.getElementById('imagePane').style.flex='0 0 '+(100-percent)+'%';
  });
}

parseTEI().then(()=>{
  setupNav();
  setupResize();
  renderPage(1);
});
