const target = new Date("2026-11-19T00:00:00");
function tick() {
  const n = Math.max(0, target - Date.now());
  const d = Math.floor(n / 86400000), h = Math.floor(n / 3600000) % 24, m = Math.floor(n / 60000) % 60, s = Math.floor(n / 1000) % 60;
  [["d",d],["h",h],["m",m],["s",s]].forEach(([id,v]) => document.getElementById(id).textContent = String(v).padStart(2,"0"));
}
tick(); setInterval(tick, 1000);
const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); if (tg.initDataUnsafe?.user) { const u=tg.initDataUnsafe.user; document.getElementById("tg-user").textContent=`Привет, ${u.first_name || "игрок"}!`; } }
const key="gta6-platform";
document.getElementById("platform").value=localStorage.getItem(key)||"PlayStation 5";
document.getElementById("save").onclick=()=>{localStorage.setItem(key,document.getElementById("platform").value);document.getElementById("save").textContent="Сохранено ✓";};
