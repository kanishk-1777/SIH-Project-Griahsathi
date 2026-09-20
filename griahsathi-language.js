(function(){
  'use strict';
  const KEY='griahsathi-language-v2';
  const legacy='griahsathi-language';
  const current=()=>localStorage.getItem(KEY)||localStorage.getItem(legacy)||'';
  const setLang=l=>{localStorage.setItem(KEY,l);localStorage.setItem(legacy,l);};

  const UI={
    en:{title:'Choose your preferred language',sub:'You can change this anytime.',en:'English',hi:'हिंदी',switch:'Language',close:'Close'},
    hi:{title:'अपनी पसंदीदा भाषा चुनें',sub:'आप इसे कभी भी बदल सकते हैं।',en:'English',hi:'हिंदी',switch:'भाषा',close:'बंद करें'}
  };

  function setGoogleCookie(lang){
    if(lang==='hi'){
      const value='/en/hi';
      document.cookie='googtrans='+value+';path=/';
      document.cookie='googtrans='+value+';path=/;domain='+location.hostname;
    }else{
      document.cookie='googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie='googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain='+location.hostname;
    }
  }

  function loadGoogle(){
    if(window.google && google.translate) return;
    window.griahsathiGoogleInit=function(){
      try{ new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'en,hi',autoDisplay:false,multilanguagePage:true},'google_translate_element'); }catch(e){}
      setTimeout(applyGoogle,300);
    };
    if(document.getElementById('gs-google-script'))return;
    const s=document.createElement('script');s.id='gs-google-script';s.src='https://translate.google.com/translate_a/element.js?cb=griahsathiGoogleInit';s.async=true;document.head.appendChild(s);
  }

  function applyGoogle(){
    const l=current()||'en';
    setGoogleCookie(l);
    const combo=document.querySelector('.goog-te-combo');
    if(combo){combo.value=l==='hi'?'hi':'en';combo.dispatchEvent(new Event('change'));}
    document.documentElement.lang=l;
    if(l==='en'){
      document.body.classList.add('gs-force-en');
    }else{
      document.body.classList.remove('gs-force-en');
      setTimeout(()=>{const c=document.querySelector('.goog-te-combo');if(c){c.value='hi';c.dispatchEvent(new Event('change'));}},500);
    }
  }

  function switchLanguage(l){
    setLang(l);setGoogleCookie(l);
    // Google Translate reads the cookie on page load and translates the complete DOM.
    location.reload();
  }

  function popup(){
    if(document.getElementById('gs-language-overlay'))return;
    const l=current()||'en';
    const d=document.createElement('div');d.id='gs-language-overlay';d.innerHTML=`<div class="gs-lang-backdrop"></div><div class="gs-lang-modal" role="dialog" aria-modal="true"><div class="gs-lang-logo">G</div><h2>${UI[l].title}</h2><p>${UI[l].sub}</p><div class="gs-lang-buttons"><button data-lang="en">🇬🇧 ${UI[l].en}</button><button data-lang="hi">🇮🇳 ${UI[l].hi}</button></div></div>`;
    document.body.appendChild(d);
    d.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{sessionStorage.setItem('griahsathi-language-popup-seen','1');d.remove();switchLanguage(b.dataset.lang)}));
  }

  function switcher(){
    const lang=current()==='hi'?'hi':'en';
    const label=lang==='hi'?'हिंदी → English':'English → हिंदी';
    const buttons=[
      document.getElementById('gs-language-switcher'),
      document.getElementById('gs-language-switcher-mobile')
    ].filter(Boolean);
    buttons.forEach(b=>{
      b.textContent=label;
      b.title=lang==='hi'?'Switch to English':'हिंदी में बदलें';
      b.setAttribute('aria-label',b.title);
      if(!b.dataset.gsBound){
        b.dataset.gsBound='1';
        b.addEventListener('click',()=>{
          const next=current()==='hi'?'en':'hi';
          switchLanguage(next);
        });
      }
    });
    return buttons.length>0;
  }

  function addStyles(){
    if(document.getElementById('gs-lang-style'))return;
    const s=document.createElement('style');s.id='gs-lang-style';s.textContent=`
      #google_translate_element{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;left:-9999px!important;top:-9999px!important}.goog-te-banner-frame,.skiptranslate iframe{display:none!important}body{top:0!important}.goog-tooltip,.goog-tooltip:hover{display:none!important}
      #gs-language-switcher,#gs-language-switcher-mobile{margin-left:0;min-width:112px;border:1px solid rgba(34,197,94,.35);background:rgba(34,197,94,.08);color:#86efac;border-radius:11px;padding:9px 12px;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap}.light-mode #gs-language-switcher{color:#166534;background:#f0fdf4;border-color:#86efac}
      #gs-language-overlay{position:fixed;inset:0;z-index:100000;display:grid;place-items:center}.gs-lang-backdrop{position:absolute;inset:0;background:rgba(2,6,23,.78);backdrop-filter:blur(10px)}.gs-lang-modal{position:relative;width:min(430px,calc(100vw - 32px));padding:34px;border-radius:28px;background:#0b111b;color:#fff;border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 100px rgba(0,0,0,.55);text-align:center}.gs-lang-logo{width:58px;height:58px;margin:0 auto 18px;border-radius:18px;display:grid;place-items:center;background:linear-gradient(135deg,#22c55e,#06b6d4);color:#06110b;font-weight:1000;font-size:24px}.gs-lang-modal h2{font-size:25px;margin:0 0 8px}.gs-lang-modal p{margin:0 0 24px;color:#9ca3af}.gs-lang-buttons{display:grid;grid-template-columns:1fr 1fr;gap:12px}.gs-lang-buttons button{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#fff;border-radius:15px;padding:15px;font-size:15px;font-weight:800;cursor:pointer;transition:.2s}.gs-lang-buttons button:hover{transform:translateY(-2px);border-color:#22c55e;background:rgba(34,197,94,.12)}
      #gs-language-switcher-mobile{width:100%;margin:0 0 10px;padding:10px}@media(max-width:760px){#gs-language-switcher{margin-left:5px;padding:8px 9px}.gs-lang-modal{padding:28px 20px}}
    `;document.head.appendChild(s);
  }

  function init(){
    addStyles();
    const hidden=document.createElement('div');hidden.id='google_translate_element';document.body.appendChild(hidden);
    // First visit: immediate language choice. Existing preference: apply silently.
    // Show the chooser once per browser session. The saved preference is still reused,
    // so reopening the browser gives judges the chooser again without losing their language.
    if(!sessionStorage.getItem('griahsathi-language-popup-seen')) popup();
    loadGoogle();
    let tries=0;const timer=setInterval(()=>{if(switcher()||++tries>30)clearInterval(timer)},150);
    setTimeout(applyGoogle,1200);
    // Re-apply a few times so shared/dynamic UI injected shortly after load is translated too.
    let passes=0; const reapply=setInterval(()=>{ if(current()==='hi') applyGoogle(); if(++passes>=8) clearInterval(reapply); },900);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
