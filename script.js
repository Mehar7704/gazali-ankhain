const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const passwordScreen=$("#passwordScreen"), main=$("#mainWebsite"), password=$("#passwordInput"), error=$("#loginError");
const pages=$$(".page"), indicator=$("#pageIndicator"); let current=0, unlocked=false;
const secret="muhtrma";

window.addEventListener("load",()=>setTimeout(()=>$("#loader").style.opacity="0",650));
setTimeout(()=>{const l=$("#loader");if(l)l.style.pointerEvents="none"},1300);

$("#togglePassword").onclick=()=>{password.type=password.type==="password"?"text":"password"};
$("#unlockButton").onclick=unlock;
password.addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});
const bgMusic=new Audio("music.mp3");
bgMusic.loop=true;
bgMusic.volume=0.35;
let musicOn=false;

function updateMusicButton(){
  const btn=$("#musicButton");
  if(!btn)return;
  btn.textContent=musicOn?"♫":"🔇";
  btn.title=musicOn?"Music ON":"Music OFF";
  btn.classList.toggle("active",musicOn);
}

async function startMusic(){
  try{
    await bgMusic.play();
    musicOn=true;
    updateMusicButton();
  }catch(e){
    console.log("Music playback was blocked:",e);
    musicOn=false;
    updateMusicButton();
  }
}

function stopMusic(){
  bgMusic.pause();
  musicOn=false;
  updateMusicButton();
}

function unlock(){
  if(password.value.trim().toLowerCase()===secret){
    unlocked=true; passwordScreen.classList.add("hidden"); main.classList.remove("locked"); showPage(0); toast("Welcome to your private little world ♡"); petals(12); startMusic();
  }else{error.textContent="Not quite… try again ♡"; password.animate([{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],260)}
}
function showPage(i){
  if(!unlocked)return;
  current=Math.max(0,Math.min(pages.length-1,i));
  pages.forEach((p,n)=>p.classList.toggle("active",n===current));
  indicator.textContent=String(current+1).padStart(2,"0")+" / "+pages.length;
  $$(".page").forEach(p=>p.scrollTop=0); window.scrollTo({top:0,behavior:"smooth"});
  $$("[data-go]").forEach(b=>b.classList.toggle("active",Number(b.dataset.go)===current+1));
}
$("#next").onclick=()=>showPage(current+1); $("#prev").onclick=()=>showPage(current-1);
$$(".next").forEach(b=>b.onclick=()=>showPage(current+1));
$$("[data-go]").forEach(b=>b.onclick=()=>showPage(Number(b.dataset.go)-1));
document.addEventListener("keydown",e=>{
  if(!unlocked)return;
  if(e.key==="ArrowRight"||e.key==="PageDown")showPage(current+1);
  if(e.key==="ArrowLeft"||e.key==="PageUp")showPage(current-1);
  if(e.key==="Home")showPage(0); if(e.key==="End")showPage(pages.length-1);
});
$("#themeButton").onclick=()=>{document.body.classList.toggle("light");toast(document.body.classList.contains("light")?"Soft Day Mode ☀":"Midnight Mode 🌙")};
$("#musicButton").onclick=()=>{
  if(musicOn){
    stopMusic();
    toast("Music OFF 🔇");
  }else{
    startMusic();
    toast("Music ON ♫");
  }
};
updateMusicButton();
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>x.classList.remove("show"),2400)}
function petals(n=5){for(let i=0;i<n;i++){const p=document.createElement("span");p.className="particle";p.textContent=Math.random()>.35?"🌸":"✦";p.style.left=Math.random()*100+"vw";p.style.fontSize=(10+Math.random()*14)+"px";p.style.animationDuration=(4+Math.random()*5)+"s";p.style.animationDelay=Math.random()*1.5+"s";$("#particles").appendChild(p);setTimeout(()=>p.remove(),10000)}}
setInterval(()=>unlocked&&petals(2),2200);
document.addEventListener("pointerdown",e=>{if(!unlocked)return;const h=document.createElement("span");h.className="particle";h.textContent="♡";h.style.left=e.clientX+"px";h.style.top=e.clientY+"px";h.style.position="fixed";h.style.color="var(--pink)";h.style.animationDuration="1.2s";$("#particles").appendChild(h);setTimeout(()=>h.remove(),1300)});

$("#smileButton").onclick=()=>{petals(22);toast("Smile detected! Flowers are blooming 🌸");$("#flowerBurst").animate([{transform:"scale(1)"},{transform:"scale(1.35)"},{transform:"scale(1)"}],500)};
$("#modeButton").onclick=()=>{const t=$("#modeText");t.textContent="Safe Mode activated: chocolate + patience + respect required. 😂";toast("Churail Mode handled safely 😄")};
$$(".moods button").forEach(b=>b.onclick=()=>{const m={happy:"Aaj ka rule: smile ko preserve karna hai. 🌸",calm:"Soft music, slow thoughts, peaceful night. 🌙",angry:"Okay… first breathe, then talk. 🤍",cute:"Cute mode confirmed. System approves. 🥰"};$("#moodResult").textContent=m[b.dataset.mood]});
$$(".gift").forEach(b=>b.onclick=()=>{$("#giftResult").textContent=b.dataset.gift;toast("Mystery gift opened 🎁")});
$("#hiddenHeart").onclick=()=>{$("#missionResult").textContent="Mission complete! Muhtrma found. Reward: one sincere smile. ♡";petals(15)};
$$(".gift").forEach(b=>b.addEventListener("dblclick",()=>{petals(10);toast("Secret bonus unlocked ✨")}));
function galaxyStars(){const g=$("#galaxy"); if(!g)return; $$("#galaxy span").forEach((s,i)=>{s.style.left=(10+Math.random()*80)+"%";s.style.top=(10+Math.random()*75)+"%";s.style.animationDelay=(i*.2)+"s"})}
galaxyStars();
$("#restart").onclick=()=>{showPage(0);toast("Welcome back, Muhtrma Ji ♡")};
setInterval(()=>{if(unlocked){const p=pages[current];if(p.dataset.page==="13")petals(2)}},3500);

/* --- Extra Premium Interactions --- */
function updateProgress(){
  const total=pages.length;
  const pct=((current+1)/total)*100;
  const fill=$("#progressFill"); if(fill)fill.style.width=pct+"%";
}
const oldShowPage=showPage;
showPage=function(i){oldShowPage(i);updateProgress()};
updateProgress();

$("#topButton").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
window.addEventListener("scroll",()=>$("#topButton")?.classList.toggle("show",window.scrollY>280));

const compliments=[
  "Muhtrma Meter says: too special for ordinary calculations. ♡",
  "Result: elegance detected, attitude slightly dangerous. 😄",
  "Care level: beautifully unlimited. 🌸",
  "Eyes module: system temporarily unavailable. 👀",
  "Smile module: instant mood improvement detected. ✨",
  "Respect module: always ON. 🤍",
  "Final diagnosis: one-of-one Muhtrma Ji."
];
$("#loveMeterButton")?.addEventListener("click",()=>{
  const value=95+Math.floor(Math.random()*6);
  $("#loveMeterFill").style.width=value+"%";
  $("#loveMeterValue").textContent=value+"%";
  $("#complimentBox").textContent=compliments[Math.floor(Math.random()*compliments.length)];
  petals(18); toast("Analysis complete 💗");
});

$$(".memory-card").forEach(card=>card.addEventListener("click",()=>{
  card.classList.toggle("revealed");
  if(card.classList.contains("revealed")){petals(5);toast("Memory opened ✨")}
}));

let secretClicks=0,secretTimer;
$("#secretHeart")?.addEventListener("click",()=>{
  secretClicks++;
  clearTimeout(secretTimer);
  const btn=$("#secretHeart");
  btn.animate([{transform:"scale(1)"},{transform:"scale(1.25)"},{transform:"scale(1)"}],260);
  secretTimer=setTimeout(()=>secretClicks=0,1500);
  if(secretClicks>=3){
    secretClicks=0;
    $("#secretMessage").textContent="Secret unlocked: “No matter how many pages this world has, the nicest part is still the person it was made for.” ♡";
    petals(30); toast("Secret message unlocked 🔐");
    setTimeout(()=>showPage(20),700);
  }
});

$("#celebrateButton")?.addEventListener("click",()=>{
  const zone=$("#confettiZone");
  const symbols=["♡","✦","🌸","✨","💗","🌹","★"];
  for(let i=0;i<45;i++){
    const c=document.createElement("span"); c.className="confetti";
    c.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    c.style.left=Math.random()*96+"%";
    c.style.animationDelay=(Math.random()*1.2)+"s";
    c.style.animationDuration=(1.8+Math.random()*1.5)+"s";
    zone.appendChild(c); setTimeout(()=>c.remove(),4000);
  }
  $("#celebrateText").textContent="Celebration complete. Keep the smile safe. ♡";
  toast("A tiny celebration for Muhtrma Ji 🎉");
});

document.addEventListener("dblclick",e=>{
  if(!unlocked)return;
  for(let i=0;i<7;i++){
    const h=document.createElement("span"); h.className="heart-pop"; h.textContent="♡";
    h.style.left=(e.clientX+(Math.random()*70-35))+"px";
    h.style.top=(e.clientY+(Math.random()*50-25))+"px";
    document.body.appendChild(h); setTimeout(()=>h.remove(),1000);
  }
});

const extraCompliments=[
 "Aap ki smile ka notification kisi bhi bad day ko mute kar sakta hai. 🌸",
 "Aap ki simplicity mein hi aap ka charm hai. ✨",
 "Muhtrma Meter confirms: one-of-one personality detected. 👑",
 "Aap ki care quietly noticeable hai — aur isi liye special hai. 🤍",
 "Gazali eyes + haya + smile = Pagal system overloaded. 👀",
 "Aap ki presence ordinary moments ko memorable bana deti hai. 🌙",
 "Official report: respect level permanently high. 💗"
];
$("#complimentButton")?.addEventListener("click",()=>{
 const text=extraCompliments[Math.floor(Math.random()*extraCompliments.length)];
 $("#randomCompliment").textContent="“"+text+"”";
 petals(10); toast("New compliment generated ✨");
});
