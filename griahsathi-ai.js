(function(){
  'use strict';

  const FALLBACK_CATALOG = [
    {slug:'plumbing',title:'Plumbing',icon:'🔧'},
    {slug:'home-cleaning',title:'Home Cleaning',icon:'🧹'},
    {slug:'electrical-repair',title:'Electrical Repair',icon:'⚡'},
    {slug:'carpentry',title:'Carpentry',icon:'🪚'},
    {slug:'painting',title:'Painting',icon:'🎨'},
    {slug:'masonry',title:'Masonry',icon:'🧱'},
    {slug:'tile-work',title:'Tile Work',icon:'🧱'},
    {slug:'gardening-and-lawn-maintenance',title:'Gardening & Lawn Maintenance',icon:'🌿'},
    {slug:'appliance-repair',title:'Appliance Repair',icon:'🔌'},
    {slug:'ac-installation-and-maintenance',title:'AC Installation & Maintenance',icon:'❄️'},
    {slug:'ro-water-purifier-service',title:'RO/Water Purifier Service',icon:'💧'},
    {slug:'pest-control',title:'Pest Control',icon:'🐜'},
    {slug:'bike-automobile-mechanic',title:'Bike/Automobile Mechanic',icon:'🏍️'},
    {slug:'house-shifting',title:'House Shifting',icon:'🏠'},
    {slug:'loading-and-unloading',title:'Loading & Unloading',icon:'🚚'},
    {slug:'packing-and-unpacking',title:'Packing & Unpacking',icon:'📦'},
    {slug:'event-setup-and-cleanup',title:'Event Setup & Cleanup',icon:'🎪'},
    {slug:'welding',title:'Welding',icon:'🔥'},
    {slug:'door-and-window-repair',title:'Door & Window Repair',icon:'🚪'},
    {slug:'lock-and-key-services',title:'Lock & Key Services',icon:'🔑'},
    {slug:'waterproofing',title:'Waterproofing',icon:'🏠'},
    {slug:'roofing-repair',title:'Roofing Repair',icon:'🏗️'},
    {slug:'solar-panel-installation-and-maintenance',title:'Solar Panel Installation & Maintenance',icon:'☀️'},
    {slug:'motor-pump-repair',title:'Motor/Pump Repair',icon:'💧'}
  ];

  const getCatalog = () => {
    try {
      if (typeof SERVICE_CATALOG !== 'undefined' && Array.isArray(SERVICE_CATALOG)) return SERVICE_CATALOG.flat(Infinity);
    } catch(e) {}
    return FALLBACK_CATALOG;
  };

  const EXTRA_ALIASES = {
    plumbing:['plumber','plumbing','pipe','tap','faucet','leak','water leak','nal','paani','नल','प्लंबर','पानी की पाइप','पानी लीक','नल ठीक'],
    'electrical-repair':['electrician','electric','electrical','wiring','fan','switch','socket','bijli','इलेक्ट्रीशियन','बिजली','वायरिंग','पंखा'],
    carpentry:['carpenter','carpentry','wood','furniture','door','window','badhai','बढ़ई','लकड़ी','फर्नीचर'],
    painting:['painter','paint','painting','wall paint','rang','पेंटर','पेंट','रंगाई','रंग'],
    'home-cleaning':['cleaning','clean','house cleaning','home cleaning','safai','घर की सफाई','सफाई','घर साफ'],
    'office-cleaning':['office cleaning','ऑफिस सफाई'],
    dishwashing:['dishes','dishwashing','bartan','बर्तन','बर्तन धोना'],
    'laundry-assistance':['laundry','clothes washing','kapde','कपड़े','कपड़े धोना'],
    'gardening-and-lawn-maintenance':['gardening','garden','lawn','plants','bagwani','बागवानी','पौधे','गार्डन'],
    'house-help':['house help','domestic help','ghar ka kaam','घरेलू काम','घर का काम'],
    'car-bike-washing':['car wash','bike wash','vehicle wash','गाड़ी धोना','कार वॉश','बाइक वॉश'],
    'loading-and-unloading':['loading','unloading','लोडिंग','अनलोडिंग','सामान उठाना'],
    'packing-and-unpacking':['packing','unpacking','पैकिंग','अनपैकिंग','सामान पैक'],
    'farm-agriculture-helper':['farm','agriculture','farming','kheti','खेती','कृषि'],
    'appliance-repair':['appliance','washing machine','fridge','microwave','geyser','टीवी','फ्रिज','वॉशिंग मशीन'],
    'ac-installation-and-maintenance':['ac','air conditioner','air conditioning','एसी','एयर कंडीशनर'],
    'ro-water-purifier-service':['ro','water purifier','purifier','आरओ','पानी फिल्टर'],
    'pest-control':['pest','cockroach','termite','insects','कीड़े','दीमक','कॉकरोच'],
    'bike-automobile-mechanic':['bike mechanic','car mechanic','mechanic','automobile','गाड़ी मैकेनिक','बाइक मैकेनिक'],
    'house-shifting':['house shifting','move house','ghar shift','घर शिफ्ट','मकान बदलना'],
    'furniture-moving':['furniture moving','move furniture','फर्नीचर शिफ्ट'],
    'wedding-setup':['wedding','shaadi','शादी','विवाह'],
    'event-setup-and-cleanup':['event','function','event setup','कार्यक्रम','इवेंट'],
    'construction-helper':['construction','labour','helper','मजदूर','निर्माण','हेल्पर'],
    'masonry':['mason','masonry','brick','ईंट','राजमिस्त्री','मिस्त्री'],
    'tile-work':['tiles','tiling','tile','टाइल','टाइल का काम'],
    welding:['welder','welding','वेल्डिंग','वेल्डर'],
    'door-and-window-repair':['door repair','window repair','दरवाजा','खिड़की','दरवाजा ठीक'],
    'lock-and-key-services':['lock','key','locksmith','ताला','चाबी','लॉक'],
    waterproofing:['waterproofing','seepage','सीलन','वॉटरप्रूफिंग'],
    'roofing-repair':['roof repair','roofing','छत','छत की मरम्मत'],
    'solar-panel-installation-and-maintenance':['solar','solar panel','सोलर','सौर पैनल'],
    'motor-pump-repair':['motor','pump','मोटर','पंप']
  };

  const T = {
    en:{hello:'Hi! I’m Griah AI. Tell me what you need — I can find a service, open it for you, or register an issue.',noMatch:'I can find services, guide you to the right worker, or register a complaint. Try “I need a plumber” or tap Report Issue.',service:'I found the right service: ',opening:'Opening it for you…',choose:'I found a few possible matches. Choose one:',services:'Here are popular services:',issue:'Of course. I can register your issue right here.',statusNone:'I could not find a complaint on this device.',status:'Your latest complaint',registered:'Your complaint has been registered successfully.',ticket:'Ticket ID',support:'Our support workflow has recorded the issue for follow-up.',report:'Report Issue',check:'Check Complaint',show:'Services',send:'Send',placeholder:'Ask for a service or report an issue…',close:'Close'},
    hi:{hello:'नमस्ते! मैं Griah AI हूँ। बताइए आपको क्या चाहिए — मैं सही सेवा खोज सकता/सकती हूँ, उसे खोल सकता/सकती हूँ या आपकी शिकायत दर्ज कर सकता/सकती हूँ।',noMatch:'मैं सेवा खोजने, सही कर्मचारी तक पहुँचाने या शिकायत दर्ज करने में मदद कर सकता/सकती हूँ। जैसे “मुझे प्लंबर चाहिए” लिखें या शिकायत दर्ज करें दबाएँ।',service:'मुझे सही सेवा मिल गई: ',opening:'मैं अभी इसे खोल रहा/रही हूँ…',choose:'मुझे कुछ संभावित सेवाएँ मिली हैं। एक चुनें:',services:'यहाँ कुछ लोकप्रिय सेवाएँ हैं:',issue:'बिल्कुल। मैं आपकी समस्या यहीं दर्ज कर सकता/सकती हूँ।',statusNone:'इस डिवाइस पर कोई शिकायत नहीं मिली।',status:'आपकी नवीनतम शिकायत',registered:'आपकी शिकायत सफलतापूर्वक दर्ज हो गई है।',ticket:'टिकट आईडी',support:'समस्या को आगे की सहायता के लिए दर्ज कर लिया गया है।',report:'शिकायत दर्ज करें',check:'शिकायत की स्थिति',show:'सेवाएँ',send:'भेजें',placeholder:'सेवा पूछें या समस्या बताएं…',close:'बंद करें'}
  };
  const lang=()=>localStorage.getItem('griahsathi-language-v2')||localStorage.getItem('griahsathi-language')||'en';
  const tr=k=> (T[lang()]||T.en)[k] || T.en[k] || k;
  const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const norm=s=>String(s||'').toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}\s-]/gu,' ').replace(/\s+/g,' ').trim();

  function catalog(){
    const raw=getCatalog();
    const seen=new Set();
    return raw.filter(s=>s&&s.slug&&s.title&&!seen.has(s.slug)&&seen.add(s.slug));
  }

  function scoreService(q,s){
    const n=norm(q), title=norm(s.title), slug=norm(s.slug).replace(/-/g,' ');
    let score=0;
    const aliases=(EXTRA_ALIASES[s.slug]||[]).map(norm).filter(Boolean);
    const terms=[title,slug,...aliases];
    // Strong intent phrase matching. This is what makes "I need a plumber"
    // resolve to plumbing instead of producing a generic chatbot response.
    terms.forEach(term=>{
      if(!term)return;
      if(n===term) score=Math.max(score,120);
      else if(n.includes(term)) score=Math.max(score,95);
      else {
        const words=term.split(/\s+/).filter(w=>w.length>2);
        const hits=words.filter(w=>n.includes(w)).length;
        if(hits) score=Math.max(score,25*hits);
      }
    });
    return score;
  }

  function findServices(q){
    const n=norm(q);
    const direct=[];
    for(const s of catalog()){
      const aliases=(EXTRA_ALIASES[s.slug]||[]).map(norm).filter(Boolean);
      if(aliases.some(a=>n.includes(a)) || n.includes(norm(s.title)) || n.includes(norm(s.slug).replace(/-/g,' '))){
        direct.push(s);
      }
    }
    if(direct.length) return direct.slice(0,5);
    return catalog().map(s=>({s,score:scoreService(q,s)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,5).map(x=>x.s);
  }

  function addMessage(html,who){
    const box=document.getElementById('gs-messages'); if(!box)return;
    const d=document.createElement('div'); d.className='gs-msg '+who; d.innerHTML=html; box.appendChild(d); box.scrollTop=box.scrollHeight;
  }
  function typing(){
    addMessage('<span class="gs-typing"><i></i><i></i><i></i></span>','bot');
    const box=document.getElementById('gs-messages'); return box.lastElementChild;
  }
  function openService(slug){
    const target=`find-worker.html?service=${encodeURIComponent(slug)}`;
    setTimeout(()=>{location.href=target;},550);
  }

  let complaintState=null;
  function complaintForm(){
    return `<div class="gs-form-card">
      <label>${lang()==='hi'?'समस्या बताएं':'Describe the issue'}<textarea id="gs-issue-desc" rows="3" placeholder="${lang()==='hi'?'क्या हुआ?':'What went wrong?'}"></textarea></label>
      <div class="gs-form-grid">
        <label>${lang()==='hi'?'श्रेणी':'Category'}<select id="gs-issue-cat"><option>${lang()==='hi'?'बुकिंग':'Booking'}</option><option>${lang()==='hi'?'कर्मचारी व्यवहार':'Worker behaviour'}</option><option>${lang()==='hi'?'सेवा की गुणवत्ता':'Service quality'}</option><option>${lang()==='hi'?'भुगतान':'Payment'}</option><option>${lang()==='hi'?'सुरक्षा':'Safety'}</option><option>${lang()==='hi'?'अन्य':'Other'}</option></select></label>
        <label>${lang()==='hi'?'प्राथमिकता':'Priority'}<select id="gs-issue-priority"><option>${lang()==='hi'?'सामान्य':'Medium'}</option><option>${lang()==='hi'?'कम':'Low'}</option><option>${lang()==='hi'?'तत्काल':'High'}</option></select></label>
      </div>
      <div class="gs-form-grid"><label>${lang()==='hi'?'मोबाइल नंबर':'Phone number'}<input id="gs-issue-phone" inputmode="numeric" maxlength="10" placeholder="10-digit mobile"></label><label>${lang()==='hi'?'स्थान':'City / location'}<input id="gs-issue-location" placeholder="${lang()==='hi'?'शहर / स्थान':'City / service location'}"></label></div>
      <button type="button" class="gs-submit-issue" id="gs-submit-issue">${lang()==='hi'?'शिकायत दर्ज करें ✓':'Submit complaint ✓'}</button>
    </div>`;
  }
  function openComplaint(){
    complaintState='form';
    addMessage(`${tr('issue')} ${complaintForm()}`,'bot');
    setTimeout(()=>document.getElementById('gs-issue-desc')?.focus(),80);
  }
  function submitComplaint(){
    const description=document.getElementById('gs-issue-desc')?.value.trim();
    const category=document.getElementById('gs-issue-cat')?.value;
    const priority=document.getElementById('gs-issue-priority')?.value;
    const phone=document.getElementById('gs-issue-phone')?.value.trim();
    const location=document.getElementById('gs-issue-location')?.value.trim();
    if(!description){alert(lang()==='hi'?'कृपया समस्या लिखें।':'Please describe the issue.');return;}
    if(phone && !/^\d{10}$/.test(phone)){alert(lang()==='hi'?'कृपया सही 10 अंकों का मोबाइल नंबर दें।':'Please enter a valid 10-digit phone number.');return;}
    const id='GR-'+new Date().getFullYear()+'-'+Math.random().toString(36).slice(2,7).toUpperCase();
    const ticket={id,description,category,priority,phone,location,status:'Registered',createdAt:new Date().toISOString()};
    let list=[]; try{list=JSON.parse(localStorage.getItem('griahsathi-complaints')||'[]')}catch(e){}
    list.unshift(ticket); localStorage.setItem('griahsathi-complaints',JSON.stringify(list)); complaintState=null;
    addMessage(`${tr('registered')}<br><strong>${tr('ticket')}: ${esc(id)}</strong><br>${tr('support')}`,'bot');
  }
  function checkComplaint(){
    let list=[];try{list=JSON.parse(localStorage.getItem('griahsathi-complaints')||'[]')}catch(e){}
    if(!list.length){addMessage(tr('statusNone'),'bot');return;}
    const x=list[0]; addMessage(`${tr('status')} <strong>${esc(x.id)}</strong> — <strong>${esc(x.status)}</strong>.<br>${lang()==='hi'?'हमारी सहायता टीम आगे कार्रवाई करेगी।':'Our support workflow will follow up on it.'}`,'bot');
  }

  function handle(text){
    const q=String(text||'').trim(); if(!q)return;
    addMessage(esc(q),'user');
    const indicator=typing();
    setTimeout(()=>{
      indicator?.remove();
      if(/check|status|track|स्थिति|शिकायत.*स्थिति|मेरी शिकायत/i.test(q)){checkComplaint();return;}
      if(/complaint|issue|problem|inconvenience|bad service|refund|payment problem|didn.?t come|late|unsafe|शिकायत|समस्या|दिक्कत|परेशानी|पैसे|रिफंड|देर|नहीं आया|गलत/i.test(q)){openComplaint();return;}
      if(/show.*service|services|list|सेवाएँ|सभी सेवा/i.test(q)){
        const list=catalog().slice(0,12); addMessage(`<div>${tr('services')}</div><div class="gs-options">${list.map(s=>`<button class="gs-option" data-go="${esc(s.slug)}">${esc(s.icon||'🛠️')} ${esc(s.title)}</button>`).join('')}</div>`,'bot');return;
      }
      const results=findServices(q);
      if(results.length===1){
        const s=results[0]; addMessage(`${tr('service')}<strong>${esc(s.title)}</strong>.<br><span class="gs-opening">${tr('opening')}</span>`,'bot'); openService(s.slug); return;
      }
      if(results.length>1){addMessage(`<div>${tr('choose')}</div><div class="gs-options">${results.slice(0,4).map(s=>`<button class="gs-option" data-go="${esc(s.slug)}">${esc(s.icon||'🛠️')} ${esc(s.title)}</button>`).join('')}</div>`,'bot');return;}
      addMessage(tr('noMatch'),'bot');
    },420);
  }

  function inject(){
    if(document.getElementById('gs-chat-launcher'))return;
    const style=document.createElement('style'); style.textContent=`
      #gs-chat-launcher{position:fixed;right:22px;bottom:22px;z-index:99999;width:62px;height:62px;border:0;border-radius:20px;background:linear-gradient(135deg,#22c55e,#06b6d4);color:#06110b;font-size:27px;font-weight:900;box-shadow:0 14px 40px rgba(6,182,212,.28);cursor:pointer}
      #gs-chat{position:fixed;right:22px;bottom:96px;z-index:99999;width:min(410px,calc(100vw - 28px));height:610px;display:none;flex-direction:column;overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:24px;background:rgba(8,11,16,.98);color:#fff;box-shadow:0 25px 80px rgba(0,0,0,.5);backdrop-filter:blur(18px)}
      .gs-head{padding:16px 18px;border-bottom:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center}.gs-brand{display:flex;gap:11px;align-items:center}.gs-avatar{width:42px;height:42px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#22c55e,#06b6d4);color:#06110b;font-weight:900}.gs-head small{display:block;color:#9ca3af;margin-top:2px}.gs-close{border:0;background:transparent;color:#9ca3af;font-size:22px;cursor:pointer}
      .gs-msgs{flex:1;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:10px}.gs-msg{max-width:92%;padding:11px 13px;border-radius:15px;line-height:1.45;font-size:14px}.gs-msg.bot{align-self:flex-start;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08)}.gs-msg.user{align-self:flex-end;background:#22c55e;color:#06110b}.gs-options{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}.gs-option{border:1px solid rgba(34,197,94,.35);background:rgba(34,197,94,.08);color:#86efac;border-radius:10px;padding:8px 10px;cursor:pointer;font-weight:700}.gs-opening{color:#86efac;font-size:12px}.gs-quick{display:flex;gap:7px;padding:0 12px 10px;overflow:auto}.gs-quick button{white-space:nowrap;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#d1d5db;border-radius:999px;padding:8px 11px;cursor:pointer;font-size:12px}.gs-input{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.1)}.gs-input input{flex:1;min-width:0;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#fff;border-radius:12px;padding:11px 12px;outline:0}.gs-input button{border:0;border-radius:12px;padding:0 15px;background:#22c55e;font-weight:800;cursor:pointer}.gs-form-card{margin-top:10px;padding:12px;border-radius:14px;background:rgba(0,0,0,.18);border:1px solid rgba(255,255,255,.08)}.gs-form-card label{display:block;font-size:12px;color:#aeb6c3;margin-bottom:9px}.gs-form-card textarea,.gs-form-card input,.gs-form-card select{display:block;width:100%;box-sizing:border-box;margin-top:5px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#fff;border-radius:10px;padding:9px;outline:none}.gs-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.gs-submit-issue{width:100%;border:0;border-radius:11px;padding:11px;background:#22c55e;color:#06110b;font-weight:900;cursor:pointer}.gs-typing{display:inline-flex;gap:4px}.gs-typing i{width:6px;height:6px;border-radius:50%;background:#86efac;animation:gsdot 1s infinite}.gs-typing i:nth-child(2){animation-delay:.15s}.gs-typing i:nth-child(3){animation-delay:.3s}@keyframes gsdot{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}
      body.light-mode #gs-chat{background:rgba(255,255,255,.98);color:#111827;border-color:rgba(0,0,0,.1)} body.light-mode .gs-msg.bot{background:#f3f4f6;border-color:#e5e7eb} body.light-mode .gs-input{border-color:#e5e7eb} body.light-mode .gs-input input,body.light-mode .gs-form-card textarea,body.light-mode .gs-form-card input,body.light-mode .gs-form-card select{color:#111827;background:#fff;border-color:#d1d5db} body.light-mode .gs-quick button{color:#374151;background:#f3f4f6;border-color:#e5e7eb} body.light-mode .gs-form-card{background:#f8fafc;border-color:#e5e7eb}
      @media(max-width:600px){#gs-chat{right:12px;bottom:84px;height:76vh}#gs-chat-launcher{right:14px;bottom:14px}}
    `;document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend',`<button id="gs-chat-launcher" aria-label="Griah AI">✦</button><section id="gs-chat" aria-label="Griah AI"><div class="gs-head"><div class="gs-brand"><div class="gs-avatar">G</div><div><strong>Griah AI</strong><small>Service concierge • Support assistant</small></div></div><button class="gs-close" id="gs-close">×</button></div><div id="gs-messages" class="gs-msgs"></div><div class="gs-quick"><button data-action="issue">⚠ ${tr('report')}</button><button data-action="services">${tr('show')}</button><button data-action="check">${tr('check')}</button></div><form id="gs-form" class="gs-input"><input id="gs-input" autocomplete="off" placeholder="${tr('placeholder')}"><button>${tr('send')}</button></form></section>`);
    const chat=document.getElementById('gs-chat');
    document.getElementById('gs-chat-launcher').onclick=()=>{chat.style.display='flex';if(!document.getElementById('gs-messages').children.length)addMessage(tr('hello'),'bot');};
    document.getElementById('gs-close').onclick=()=>chat.style.display='none';
    document.getElementById('gs-form').onsubmit=e=>{e.preventDefault();const i=document.getElementById('gs-input');handle(i.value);i.value='';i.focus();};
    document.addEventListener('click',e=>{
      const go=e.target.closest('[data-go]'); if(go){openService(go.dataset.go);return;}
      const a=e.target.closest('[data-action]'); if(!a)return;
      if(a.dataset.action==='issue')openComplaint();
      if(a.dataset.action==='services')handle('show services');
      if(a.dataset.action==='check')checkComplaint();
      if(e.target.id==='gs-submit-issue')submitComplaint();
    });
    document.addEventListener('click',e=>{if(e.target.closest('#gs-submit-issue'))submitComplaint();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);else inject();
})();
