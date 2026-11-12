const releaseAt=new Date("2026-11-19T00:00:00+03:00");
function countdown(){const ms=Math.max(0,releaseAt-Date.now());const vals={d:Math.floor(ms/86400000),h:Math.floor(ms/3600000)%24,m:Math.floor(ms/60000)%60,s:Math.floor(ms/1000)%60};for(const[id,v]of Object.entries(vals)){const el=document.getElementById(id);if(el)el.textContent=String(v).padStart(2,"0");}const label=document.getElementById("count-label");if(label)label.textContent=ms===0?"ИГРА УЖЕ ВЫШЛА":"ДО РЕЛИЗА";}
countdown();setInterval(countdown,1000);
const tg=window.Telegram?.WebApp;if(tg){tg.ready();tg.expand();tg.setHeaderColor?.("#08090d");tg.setBackgroundColor?.("#08090d");const u=tg.initDataUnsafe?.user;if(u){const greeting=document.getElementById("tg-user");if(greeting)greeting.textContent="Привет, "+(u.first_name||"игрок")+"! Хорошего путешествия по Leonida.";}}
const platform=document.getElementById("platform"),save=document.getElementById("save"),platformKey="gta6-platform";if(platform)platform.value=localStorage.getItem(platformKey)||"PlayStation 5";if(save)save.onclick=()=>{localStorage.setItem(platformKey,platform.value);save.textContent="Сохранено ✓";setTimeout(()=>save.textContent="Сохранить",1800);};
const favKey="gta6-favorites";let favorites=JSON.parse(localStorage.getItem(favKey)||"[]");const favCount=document.getElementById("fav-count");function updateFavCount(){if(favCount)favCount.textContent=favorites.length;renderFavorites();}
function renderFavorites(){const grid=document.getElementById("favorites-grid");if(!grid)return;grid.innerHTML="";const savedCards=cards.filter(c=>favorites.includes(c.dataset.art));if(!savedCards.length){grid.innerHTML='<p class="empty-favorites">Пока пусто. Открой арт и нажми ♡</p>';return;}savedCards.forEach(card=>{const item=document.createElement("button");item.className="favorite-card";item.innerHTML='<img src="'+card.querySelector("img").src+'" alt=""><span>'+card.dataset.title+'</span><b>×</b>';item.onclick=()=>openArt(cards.indexOf(card));grid.appendChild(item);});}
const trailerFeature=document.querySelector(".trailer-feature"),trailerFrame=document.getElementById("trailer-frame"),trailerInline=document.getElementById("trailer-inline-player");document.getElementById("trailer-open")?.addEventListener("click",()=>{trailerFeature.classList.add("playing");trailerInline.classList.add("open");trailerFrame.src="https://www.youtube-nocookie.com/embed/VQRLujxTm3c?autoplay=1&rel=0&playsinline=1";trailerInline.scrollIntoView({behavior:"smooth",block:"nearest"});});function closeTrailer(){trailerFeature.classList.remove("playing");trailerInline.classList.remove("open");trailerFrame.src="";}document.getElementById("trailer-close")?.addEventListener("click",closeTrailer);
const cards=[...document.querySelectorAll(".art-card")],lightbox=document.getElementById("lightbox"),lightImg=document.getElementById("lightbox-img"),lightTitle=document.getElementById("lightbox-title"),favBtn=document.getElementById("favorite-btn");let activeIndex=0;updateFavCount();
function currentArt(){return cards[activeIndex]?.dataset.art||"";}function currentTitle(){return cards[activeIndex]?.dataset.title||"GTA VI Artwork";}
function syncFavorite(){const isFav=favorites.includes(currentArt());favBtn.classList.toggle("faved",isFav);favBtn.textContent=isFav?"♥ В избранном":"♡ В избранное";}
function showArt(i){activeIndex=(i+cards.length)%cards.length;lightImg.src=currentArt();lightImg.alt=currentTitle();lightTitle.textContent=currentTitle();syncFavorite();}
function openArt(i){showArt(i);lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeArt(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");document.body.style.overflow="";}
cards.forEach((card,i)=>card.addEventListener("click",()=>openArt(i)));document.getElementById("lightbox-close").onclick=closeArt;document.querySelector(".lightbox-prev").onclick=()=>showArt(activeIndex-1);document.querySelector(".lightbox-next").onclick=()=>showArt(activeIndex+1);lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeArt();});
favBtn.onclick=()=>{const art=currentArt();favorites=favorites.includes(art)?favorites.filter(x=>x!==art):[...favorites,art];localStorage.setItem(favKey,JSON.stringify(favorites));syncFavorite();updateFavCount();};
document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("open"))return;if(e.key==="Escape")closeArt();if(e.key==="ArrowLeft")showArt(activeIndex-1);if(e.key==="ArrowRight")showArt(activeIndex+1);});
let touchX=0;lightbox.addEventListener("touchstart",e=>touchX=e.changedTouches[0].screenX,{passive:true});lightbox.addEventListener("touchend",e=>{const dx=e.changedTouches[0].screenX-touchX;if(Math.abs(dx)>55)showArt(activeIndex+(dx<0?1:-1));},{passive:true});
function switchScreen(name){if(!["home","world","gallery","club","news","profile"].includes(name))name="home";document.body.dataset.screen=name;document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.go===name));window.scrollTo({top:0,behavior:"smooth"});}
document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>switchScreen(btn.dataset.go)));
document.querySelectorAll('a[href="#places"]').forEach(a=>a.addEventListener("click",e=>{e.preventDefault();switchScreen("world");}));
document.querySelectorAll('a[href="#gallery"]').forEach(a=>a.addEventListener("click",e=>{e.preventDefault();switchScreen("gallery");}));


switchScreen("home");
const navItems=[...document.querySelectorAll(".nav-item")],targets=[];
if("IntersectionObserver"in window){const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in-view");reveal.unobserve(e.target);}}),{threshold:.12});document.querySelectorAll(".section-head,.tiles,.feature-section,.places-section,.gallery-section,.profile,.news,.functions-section,.club-section").forEach(el=>reveal.observe(el));const spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const id=e.target.id;navItems.forEach(n=>n.classList.toggle("active",n.dataset.go===id||(id==="places"&&n.dataset.go==="world")||(id==="characters"&&n.dataset.go==="world")));}}),{rootMargin:"-35% 0px -55% 0px"});document.querySelectorAll("#home,#world,#gallery,#news,#club,#profile").forEach(t=>spy.observe(t));}

document.querySelectorAll(".club-action").forEach(btn=>btn.addEventListener("click",()=>{const feature=btn.dataset.feature||"Функция";btn.textContent="Скоро будет доступно";btn.setAttribute("aria-label",feature+" — скоро будет доступно");}));

document.getElementById("go-countdown")?.addEventListener("click",()=>{switchScreen("home");document.querySelector(".countdown-section")?.scrollIntoView({behavior:"smooth"});});



// Unified preorder navigation and modal flow (avoid competing click listeners)
(()=>{
 const page=document.querySelector('#preorder');
 const modal=document.querySelector('#preorder-modal');
 if(!page||!modal)return;
 let platform='PS5',edition='Standard Edition';
 const refresh=()=>{const el=document.querySelector('#chosen-edition');if(el)el.textContent=edition+' · '+platform;};
 const openModal=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
 const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
 const openCatalog=()=>{closeModal();page.classList.add('active');document.body.dataset.screen='preorder';setTimeout(()=>page.scrollIntoView({behavior:'smooth',block:'start'}),40);};
 document.querySelectorAll('[data-preorder-open]').forEach(b=>b.addEventListener('click',openCatalog));
 modal.querySelectorAll('[data-preorder-close]').forEach(b=>b.addEventListener('click',closeModal));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});
 page.querySelectorAll('[data-platform]').forEach(b=>b.addEventListener('click',()=>{platform=b.dataset.platform;page.querySelectorAll('[data-platform]').forEach(x=>x.classList.toggle('selected',x===b));refresh();}));
 page.querySelectorAll('[data-edition]').forEach(b=>b.addEventListener('click',()=>{edition=b.dataset.edition;refresh();openModal();}));
 document.querySelector('#preorder-interest')?.addEventListener('click',openModal);
 modal.querySelector('#preorder-form')?.addEventListener('submit',e=>{e.preventDefault();const success=modal.querySelector('#preorder-success');success.textContent='Заявка пока не отправляется: подключение к Telegram-боту ещё не настроено. Мы не сохраняем контакт и не принимаем оплату.';success.hidden=false;});
 page.querySelectorAll('[data-pre-tab]').forEach(b=>b.addEventListener('click',()=>{page.querySelectorAll('[data-pre-tab]').forEach(x=>x.classList.toggle('active',x===b));const c=page.querySelector('#preorder-content');const t=b.dataset.preTab;if(t==='editions'){c.style.display='grid';c.querySelectorAll('.edition-card,.edition-comparison,.preorder-bonus').forEach(x=>x.hidden=false);}else{c.style.display='grid';c.querySelectorAll('.edition-card,.edition-comparison,.preorder-bonus').forEach(x=>x.hidden=true);let box=c.querySelector('.tab-info');if(!box){box=document.createElement('div');box.className='preorder-bonus tab-info';c.append(box);}box.hidden=false;box.innerHTML=t==='bonuses'?'<h3>Vintage Vice City Pack</h3><p>Бонусный набор и его состав требуют официального подтверждения.</p>':t==='details'?'<h3>Grand Theft Auto VI</h3><p>Релиз: 19 ноября 2026 · PlayStation 5 и Xbox Series X|S.</p>':'<h3>FAQ</h3><p>Leonida Hub не принимает платежи. Официальные условия предзаказа зависят от платформы и продавца.</p>';}}));
 refresh();
})();

/* Keep fixed order bar away from countdown and preorder accordions */
(()=>{const bar=document.querySelector('#global-order-cta'),hero=document.querySelector('.hero');if(!bar||!hero)return;
const update=()=>{const preorder=document.querySelector('#preorder')?.classList.contains('active');const topHome=document.body.dataset.screen==='home'&&window.scrollY<(hero.offsetHeight+180);bar.classList.toggle('cta-hidden',!!preorder||topHome);};
window.addEventListener('scroll',update,{passive:true});new MutationObserver(update).observe(document.body,{attributes:true,attributeFilter:['data-screen']});update();})();
