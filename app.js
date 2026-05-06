// ═══════════════════════════════════════════════════════════════
//  VOTING KETUA KELAS — X PPLG 2
//  app.js  — Firebase + seluruh logika aplikasi
//  ✅ Update: kandidat bisa voting, medsos lengkap, show/hide pw
// ═══════════════════════════════════════════════════════════════

import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set, remove, onValue }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ───────────────────────────────────────────────
//  🔥 FIREBASE CONFIG
// ───────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyBJx4PvESCXLnVjWO7IdzXDJT2phg-Vjqw",
  authDomain:        "voting-pplg2.firebaseapp.com",
  databaseURL:       "https://voting-pplg2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "voting-pplg2",
  storageBucket:     "voting-pplg2.firebasestorage.app",
  messagingSenderId: "1036502899888",
  appId:             "1:1036502899888:web:78e6bb84b269e0980e2f75",
  measurementId:     "G-768JKPDXNV"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// ───────────────────────────────────────────────
//  DATA SISWA — X PPLG 2
//  kandidat:true → bisa edit profil DAN tetap bisa vote
// ───────────────────────────────────────────────
const ACCOUNTS_DEFAULT = [
  { nis:"7777777", nama:"Administrator",                         pw:"SMKN7SMG", admin:true,  kandidat:false },
  { nis:"254110629",  nama:"Ahmad Romadon",                         pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110630",  nama:"Aisha Putri Assyifa",                   pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110631",  nama:"Amelia Regina Putri",                   pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110632",  nama:"Ammar Putra Bimantara",                 pw:"pplg2025", admin:false, kandidat:true  },
  { nis:"254110633",  nama:"Andini Nindya Wuri",                    pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110634",  nama:"Asyfa Zahra Saputri",                   pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110635",  nama:"Aulia Nur Azkia",                       pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110636",  nama:"Aura Valentina",                        pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110637",  nama:"Ben Rehan Bagus Ramadhan",              pw:"pplg2025", admin:false, kandidat:true  },
  { nis:"254110638",  nama:"Biyadikalkhoiru Skiym",                 pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110639",  nama:"Destia Alif Islamiati",                 pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110640",  nama:"Eka Novianti",                          pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110641",  nama:"Fatimah Zahra Riyanti",                 pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110642",  nama:"Geraldus Asca Pratama",                 pw:"pplg2025", admin:false, kandidat:false  },
  { nis:"254110643",  nama:"Ghinaya Khalifansa Wahyudi",            pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110644",  nama:"Jessyca Allysia Shakilla",              pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110645",  nama:"Katarina Flizca Christyo Utami",        pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110646",  nama:"Katrin Anggraeni",                      pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110647",  nama:"Keisha Calya Sakhi",                    pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110648",  nama:"Kharisma Aliffila",                     pw:"pplg2025", admin:false, kandidat:true  },
  { nis:"254110649",  nama:"Kiandra Raditya Pradana",               pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110650",  nama:"Klemens Christian Narayan",             pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110651",  nama:"Laurentius Wisnu Ardianto Putra Omega", pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110652",  nama:"Lionita Joefana Rahmadini",             pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110653",  nama:"Muhamad Anas Ghufron",                  pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110654",  nama:"Muhammad Hervino Faiq Alfaridzi",       pw:"pplg2025", admin:false, kandidat:true },
  { nis:"254110655",  nama:"Muhammad Rafa Aditya Putra",            pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110656",  nama:"Muhammad Raihan Ikhsan Rabbani",        pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110657",  nama:"Raqil Labeeb Ahmad",                    pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110658",  nama:"Safa Putri Pratiwi",                    pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110659",  nama:"Safira Ziva Maharani",                  pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110660",  nama:"Satria Dani Kristyanto",                pw:"pplg2025", admin:false, kandidat:true },
  { nis:"254110661",  nama:"Sekar Arum Kasih Nandiko",              pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110662",  nama:"Sophie Aulia Hana",                     pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110663",  nama:"Tisya Harimia Gholta",                  pw:"pplg2025", admin:false, kandidat:false },
  { nis:"254110664",  nama:"Wardah Maalika Fazrih",                 pw:"pplg2025", admin:false, kandidat:false },
];

let ACCOUNTS = [];

function loadAccounts() {
  try {
    const saved = localStorage.getItem("vkk_accounts");
    if (saved) {
      const parsed = JSON.parse(saved);
      ACCOUNTS = ACCOUNTS_DEFAULT.map(def => {
        const s = parsed.find(p => p.nis === def.nis);
        return s ? { ...def, pw: s.pw } : { ...def };
      });
    } else {
      ACCOUNTS = ACCOUNTS_DEFAULT.map(a => ({ ...a }));
    }
  } catch { ACCOUNTS = ACCOUNTS_DEFAULT.map(a => ({ ...a })); }
}

function saveAccounts() {
  localStorage.setItem("vkk_accounts",
    JSON.stringify(ACCOUNTS.map(a => ({ nis: a.nis, pw: a.pw }))));
}

// ───────────────────────────────────────────────
//  KANDIDAT — medsos lengkap (ig, tt, tw, yt, li)
// ───────────────────────────────────────────────
const CANDIDATES_DEFAULT = [
  {
    id:1, nomor:"No. 01", init:"AB",
    nis:"254110632", nama:"Ammar Putra Bimantara",
    foto:"", instagram:"", tiktok:"", twitter:"", youtube:"", linkedin:"",
    visi:"Kelas aktif, disiplin, dan saling mendukung untuk berprestasi bersama.",
    misi:"1. Meningkatkan komunikasi antar siswa.\n2. Mengadakan kegiatan belajar bersama.\n3. Menjaga kekompakan kelas.",
    program:"Belajar bareng mingguan, papan informasi kelas, koordinasi piket.",
    slogan:"Bersama Kita Bisa! 💪",
    color:"linear-gradient(135deg,#7c6af7,#a56af7)"
  },
  {
    id:2, nomor:"No. 02", init:"BB",
    nis:"254110637", nama:"Ben Rehan Bagus Ramadhan",
    foto:"", instagram:"", tiktok:"", twitter:"", youtube:"", linkedin:"",
    visi:"Menciptakan suasana belajar yang seru, inklusif, dan penuh kekompakan.",
    misi:"1. Membangun komunikasi yang baik.\n2. Menciptakan lingkungan belajar menyenangkan.\n3. Menjadi penghubung antara siswa dan guru.",
    program:"Games edukatif, group belajar online, notulensi kelas.",
    slogan:"Seru, Solid, Sukses! 🚀",
    color:"linear-gradient(135deg,#f76af7,#f76aa3)"
  },
  {
    id:3, nomor:"No. 03", init:"GP",
    nis:"254110654", nama:"Muhammad Hervino Faiq Alfaridzi",
    foto:"", instagram:"", tiktok:"", twitter:"", youtube:"", linkedin:"",
    visi:"Kelas kreatif, inovatif, dan selalu menjaga kebersamaan satu sama lain.",
    misi:"1. Mendorong kreativitas siswa.\n2. Mengadakan proyek kolaboratif.\n3. Menjaga keharmonisan kelas.",
    program:"Proyek inovatif, pameran karya kelas, diskusi rutin.",
    slogan:"Kreatif Tanpa Batas! ✨",
    color:"linear-gradient(135deg,#6af7c2,#6ac2f7)"
  },
  {
    id:4, nomor:"No. 04", init:"KA",
    nis:"254110660", nama:"satria Dani Kristyanto",
    foto:"", instagram:"", tiktok:"", twitter:"", youtube:"", linkedin:"",
    visi:"Membangun kelas yang solid, harmonis, dan penuh semangat juang tinggi.",
    misi:"1. Mempererat hubungan antar teman.\n2. Meningkatkan prestasi bersama.\n3. Menciptakan suasana kelas yang harmonis.",
    program:"Kegiatan bonding, reward prestasi, jadwal kelas teratur.",
    slogan:"Harmonis Menuju Prestasi! 🌟",
    color:"linear-gradient(135deg,#f7c26a,#f78c6a)"
  },
];

let CANDIDATES = [];

function loadCandidates() {
  try {
    const saved = localStorage.getItem("vkk_candidates");
    if (saved) {
      const parsed = JSON.parse(saved);
      CANDIDATES = CANDIDATES_DEFAULT.map(def => {
        const s = parsed.find(p => p.id === def.id);
        // merge — field baru (youtube, linkedin) tetap ada meski data lama tidak punya
        return s ? { ...def, youtube:"", linkedin:"", ...s } : { ...def };
      });
    } else {
      CANDIDATES = CANDIDATES_DEFAULT.map(c => ({ ...c }));
    }
  } catch { CANDIDATES = CANDIDATES_DEFAULT.map(c => ({ ...c })); }
}

function saveCandidates() {
  localStorage.setItem("vkk_candidates", JSON.stringify(CANDIDATES));
}

const SISWA_COUNT = ACCOUNTS_DEFAULT.filter(a => !a.admin).length;

// ───────────────────────────────────────────────
//  Firebase DB helpers
// ───────────────────────────────────────────────
const DB_VOTES   = "votes";
const DB_VOTED   = "voted";
const DB_SESSION = "session";

async function dbGetVotes()   { try { const s=await get(ref(db,DB_VOTES));   return s.exists()?s.val():{};           } catch{return {};} }
async function dbGetVoted()   { try { const s=await get(ref(db,DB_VOTED));   return s.exists()?s.val():{};           } catch{return {};} }
async function dbGetSession() { try { const s=await get(ref(db,DB_SESSION)); return s.exists()?s.val():{open:false}; } catch{return {open:false};} }

async function dbSetVotes(d)   { await set(ref(db,DB_VOTES),d); }
async function dbSetVoted(d)   { await set(ref(db,DB_VOTED),d); }
async function dbSetSession(d) { await set(ref(db,DB_SESSION),d); }
async function dbClearAll()    { await remove(ref(db,DB_VOTES)); await remove(ref(db,DB_VOTED)); }

function dbListenVotes(cb)   { return onValue(ref(db,DB_VOTES),   s=>cb(s.exists()?s.val():{})); }
function dbListenVoted(cb)   { return onValue(ref(db,DB_VOTED),   s=>cb(s.exists()?s.val():{})); }
function dbListenSession(cb) { return onValue(ref(db,DB_SESSION), s=>cb(s.exists()?s.val():{open:false})); }

// ───────────────────────────────────────────────
//  Auth session (per device, localStorage)
// ───────────────────────────────────────────────
const K_SESS       = "vkk_pplg2_sess";
const getAuthSess  = ()  => localStorage.getItem(K_SESS);
const saveAuthSess = nis => localStorage.setItem(K_SESS, nis);
const clearAuthSess= ()  => localStorage.removeItem(K_SESS);

// ───────────────────────────────────────────────
//  State
// ───────────────────────────────────────────────
let user           = null;
let selectedId     = null;
let vlOpen         = false;
let voteData       = { votes:{}, voted:{} };
let voteSession    = { open:false };
let countdownTimer = null;

// ───────────────────────────────────────────────
//  INIT
// ───────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  loadAccounts();
  loadCandidates();

  const loadEl = document.getElementById("loadScreen");
  loadEl.style.display = "flex";

  try {
    const [votes, voted, session] = await Promise.all([dbGetVotes(), dbGetVoted(), dbGetSession()]);
    voteData    = { votes, voted };
    voteSession = session;
    setStatus("live","🔥 Firebase — Real-time");
  } catch(e) {
    console.error("Firebase error:",e);
    setStatus("err","Gagal terhubung ke Firebase");
  }

  loadEl.classList.add("hide");
  setTimeout(()=>(loadEl.style.display="none"),600);

  dbListenVotes(data   => { voteData.votes=data;  refreshUI(); updateSyncTime(); });
  dbListenVoted(data   => { voteData.voted=data;  refreshUI(); updateSyncTime(); });
  dbListenSession(data => { voteSession=data;      refreshUI(); startCountdown(); });

  const nis = getAuthSess();
  if (nis) { const acc=ACCOUNTS.find(a=>a.nis===nis); if(acc) enterApp(acc); }
});

// ───────────────────────────────────────────────
//  STATUS BAR
// ───────────────────────────────────────────────
function setStatus(type,txt) {
  document.getElementById("statusBar").className = "status-bar "+type;
  document.getElementById("statusTxt").textContent = txt;
}
function updateSyncTime() {
  const t=new Date(), pad=n=>String(n).padStart(2,"0");
  document.getElementById("lastSync").textContent =
    `Diperbarui ${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`;
}

// ───────────────────────────────────────────────
//  AUTH
// ───────────────────────────────────────────────
window.doLogin = function() {
  const nis  = document.getElementById("iNIS").value.trim();
  const pass = document.getElementById("iPass").value;
  const acc  = ACCOUNTS.find(a => a.nis===nis && a.pw===pass);
  if (!acc) { showMsg("msgErr"); return; }
  // ✅ Blokir hanya siswa biasa yang sudah vote
  if (!acc.admin && !acc.kandidat && voteData.voted[nis] !== undefined) {
    showMsg("msgDbl"); return;
  }
  // Kandidat & admin: boleh login kapanpun
  saveAuthSess(nis);
  enterApp(acc);
};

function enterApp(acc) {
  user=acc; selectedId=null;

  const cand  = CANDIDATES.find(c=>c.nis===acc.nis);
  const uAvEl = document.getElementById("uAv");
  if (cand && cand.foto) {
    uAvEl.style.backgroundImage    = `url(${cand.foto})`;
    uAvEl.style.backgroundSize     = "cover";
    uAvEl.style.backgroundPosition = "center";
    uAvEl.textContent = "";
  } else {
    uAvEl.style.backgroundImage = "";
    uAvEl.textContent = acc.nama.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  }

  document.getElementById("uName").textContent = acc.nama;
  const rEl = document.getElementById("uRole");
  if      (acc.admin)    { rEl.textContent="Administrator";            rEl.className="u-role admin"; }
  else if (acc.kandidat) { rEl.textContent="Kandidat · NIS "+acc.nis; rEl.className="u-role kandidat"; }
  else                   { rEl.textContent="Siswa · NIS "+acc.nis;    rEl.className="u-role"; }

  document.getElementById("adminPanel").classList.toggle("show", acc.admin);
  document.getElementById("kandidatPanel").classList.toggle("show", acc.kandidat && !acc.admin);

  showPage("appPage");
  refreshUI();
  startCountdown();
}

window.doLogout = function() {
  clearAuthSess(); user=null; selectedId=null; vlOpen=false;
  clearInterval(countdownTimer);
  ["voterList","votedBanner"].forEach(id=>document.getElementById(id).classList.remove("show"));
  document.getElementById("iNIS").value  = "";
  document.getElementById("iPass").value = "";
  // Reset semua pw toggle ke mode tertutup
  ["iPass","cpOld","cpNew","cpConfirm"].forEach(id=>{
    const el=document.getElementById(id); if(el) el.type="password";
  });
  ["pwBtn","cpOldBtn","cpNewBtn","cpConfirmBtn"].forEach(id=>{
    const el=document.getElementById(id); if(el) el.textContent="👁️";
  });
  clearMsgs();
  showPage("loginPage");
};

// ───────────────────────────────────────────────
//  UI REFRESH
// ───────────────────────────────────────────────
function refreshUI() {
  if (!user) return;
  const isOpen = isVotingOpen();

  if (user.admin) {
    renderCards(true); updateStats();
    renderAdminSessionUI();
    if (vlOpen) renderVoterList();
    return;
  }

  const myVote       = voteData.voted[user.nis];
  const alreadyVoted = myVote !== undefined;

  if (user.kandidat) {
    document.getElementById("kandidatPanel").classList.add("show");
  }

  if (alreadyVoted) {
    selectedId = myVote;
    const myC = CANDIDATES.find(c=>c.id==myVote);
    document.getElementById("votedBanner").classList.add("show");
    document.getElementById("votedForName").textContent = myC?myC.nama:"—";
    document.getElementById("voteActions").style.display = "none";
    document.getElementById("votingClosedInfo").style.display = "none";
    renderCards(true);
  } else {
    document.getElementById("votedBanner").classList.remove("show");
    // ✅ Kandidat yang belum vote: tampilkan tombol vote jika sesi buka
    document.getElementById("voteActions").style.display = isOpen ? "flex" : "none";
    const infoEl = document.getElementById("votingClosedInfo");
    if (infoEl) infoEl.style.display = isOpen ? "none" : "block";
    renderCards(false);
  }
  updateStats();
}

// ───────────────────────────────────────────────
//  VOTING SESSION
// ───────────────────────────────────────────────
function isVotingOpen() {
  if (!voteSession?.open) return false;
  const now = Date.now();
  if (voteSession.endTime   && now > voteSession.endTime)   return false;
  if (voteSession.startTime && now < voteSession.startTime) return false;
  return true;
}

function renderAdminSessionUI() {
  const el = document.getElementById("sessionStatus");
  if (!el) return;
  const open = isVotingOpen();
  const s    = voteSession || {};
  const fmt  = ts => ts ? new Date(ts).toLocaleString("id-ID") : "—";
  el.innerHTML = `
    <div class="sess-state ${open?"on":"off"}">
      ${open?"🟢 Pemilihan Sedang Berlangsung":"🔴 Pemilihan Ditutup"}
    </div>
    <div class="sess-detail">Mulai: <b>${fmt(s.startTime)}</b> &nbsp;|&nbsp; Selesai: <b>${fmt(s.endTime)}</b></div>`;
}

function startCountdown() {
  clearInterval(countdownTimer);
  const el = document.getElementById("countdownBar");
  if (!el) return;
  function tick() {
    const s=voteSession||{}, now=Date.now();
    if (s.open && s.endTime && now < s.endTime) {
      const diff=s.endTime-now;
      const h=Math.floor(diff/3600000), m=Math.floor((diff%3600000)/60000), sec=Math.floor((diff%60000)/1000);
      el.textContent=`⏳ Sisa waktu: ${h>0?h+"j ":""}${m}m ${sec}s`;
      el.style.display="block";
    } else if (s.startTime && now < s.startTime) {
      const diff=s.startTime-now;
      const h=Math.floor(diff/3600000), m=Math.floor((diff%3600000)/60000), sec=Math.floor((diff%60000)/1000);
      el.textContent=`🕐 Dimulai dalam: ${h>0?h+"j ":""}${m}m ${sec}s`;
      el.style.display="block";
    } else if (!isVotingOpen()) {
      const showInfo = user && !user.admin && voteData.voted[user?.nis]===undefined;
      el.textContent = "🔴 Pemilihan belum dibuka oleh admin.";
      el.style.display = showInfo?"block":"none";
    } else {
      el.style.display="none";
    }
  }
  tick();
  countdownTimer=setInterval(tick,1000);
}

window.openSessionModal = function() {
  const s=voteSession||{};
  if (s.startTime) document.getElementById("sessStart").value = toLocalInput(s.startTime);
  if (s.endTime)   document.getElementById("sessEnd").value   = toLocalInput(s.endTime);
  document.getElementById("sessionModal").classList.add("show");
};
window.closeSessionModal = function() { document.getElementById("sessionModal").classList.remove("show"); };

window.saveSession = async function() {
  const sv=document.getElementById("sessStart").value;
  const ev=document.getElementById("sessEnd").value;
  if (!sv||!ev) { showToast("⚠️ Isi waktu mulai dan selesai!"); return; }
  const st=new Date(sv).getTime(), et=new Date(ev).getTime();
  if (et<=st) { showToast("⚠️ Waktu selesai harus setelah mulai!"); return; }
  const now=Date.now();
  try {
    await dbSetSession({ open: now>=st && now<et, startTime:st, endTime:et });
    closeSessionModal();
    showToast("✅ Waktu pemilihan berhasil diatur!");
  } catch { showToast("❌ Gagal menyimpan."); }
};
window.forceOpenSession  = async function() { try { await dbSetSession({...voteSession, open:true});  showToast("🟢 Pemilihan dibuka!"); } catch { showToast("❌ Gagal."); } };
window.forceCloseSession = async function() { try { await dbSetSession({...voteSession, open:false}); showToast("🔴 Pemilihan ditutup!"); } catch { showToast("❌ Gagal."); } };

function toLocalInput(ts) {
  const d=new Date(ts), pad=n=>String(n).padStart(2,"0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ───────────────────────────────────────────────
//  RENDER CARDS
// ───────────────────────────────────────────────
const getVC  = id => voteData.votes[id]||0;
const totalV = ()  => CANDIDATES.reduce((s,c)=>s+getVC(c.id),0);
const pct    = c   => { const t=totalV(); return t===0?0:Math.round((getVC(c.id)/t)*100); };

function leaderId() {
  let max=-1, lid=null;
  CANDIDATES.forEach(c=>{ const v=getVC(c.id); if(v>max){max=v;lid=c.id;} });
  return totalV()>0?lid:null;
}

function avHtml(c) {
  if (c.foto) return `<div class="av" style="background:${c.color};background-image:url(${c.foto});background-size:cover;background-position:center"></div>`;
  return `<div class="av" style="background:${c.color}">${c.init}</div>`;
}

function renderCards(showBars) {
  const grid   = document.getElementById("cardGrid");
  const leader = leaderId();
  grid.innerHTML = "";

  CANDIDATES.forEach((c,i) => {
    const isSel        = selectedId===c.id;
    const isLead       = leader===c.id;
    const alreadyVoted = voteData.voted[user?.nis] !== undefined;
    // ✅ Kandidat bisa klik kartu jika belum vote & sesi terbuka
    const clickable    = !showBars && !user?.admin && !alreadyVoted;
    const p=pct(c), v=getVC(c.id);

    const card=document.createElement("div");
    card.className=`card${isSel?" selected":""}${isLead?" leading":""}${!clickable?" no-click":""}`;
    card.style.animationDelay=`${i*0.08}s`;
    if (clickable) card.onclick=()=>selectCard(c.id);

    card.innerHTML=`
      <div class="crown">👑</div>
      <div class="card-in">
        <div class="av-wrap">
          ${avHtml(c)}
          <div class="chk">✓</div>
        </div>
        <div class="c-nomor">${c.nomor}</div>
        <div class="c-nama">${c.nama}</div>
        <div class="c-nis">NIS ${c.nis}</div>
        <div class="c-slogan">${c.slogan||""}</div>
        <div class="c-visi">${c.visi}</div>
        <button class="btn-profil" onclick="event.stopPropagation();openProfilModal(${c.id})">👤 Lihat Profil Lengkap</button>
        ${showBars?`
        <div class="bar-wrap">
          <div class="bar-info"><span>${v} suara</span><span class="pct">${p}%</span></div>
          <div class="bar-track"><div class="bar-fill" id="bf${c.id}" style="background:${c.color};width:0%"></div></div>
        </div>
        <div class="vtag${isSel?" show":""}">${isSel?"✓ Pilihanmu":""}</div>`:""}
      </div>`;
    grid.appendChild(card);
  });

  if (showBars) {
    requestAnimationFrame(()=>{
      CANDIDATES.forEach(c=>{
        const el=document.getElementById("bf"+c.id);
        if(el) setTimeout(()=>(el.style.width=pct(c)+"%"),80);
      });
    });
  }
}

function updateStats() {
  const sudah=Object.keys(voteData.voted).length;
  animVal("stTotal",totalV()); animVal("stSudah",sudah);
  animVal("stBelum",Math.max(0,SISWA_COUNT-sudah));
}

function animVal(id,val) {
  const el=document.getElementById(id);
  if(!el||el.textContent===String(val)) return;
  el.style.animation="none";
  requestAnimationFrame(()=>{ el.style.animation="countUp .4s ease"; el.textContent=val; });
}

// ───────────────────────────────────────────────
//  MODAL PROFIL — tampilkan semua medsos
// ───────────────────────────────────────────────
window.openProfilModal = function(id) {
  const c=CANDIDATES.find(x=>x.id===id);
  if(!c) return;

  const avEl = document.getElementById("profilAv");
  if (c.foto) {
    avEl.style.backgroundImage    = `url(${c.foto})`;
    avEl.style.backgroundSize     = "cover";
    avEl.style.backgroundPosition = "center";
    avEl.style.background         = c.color;
    avEl.textContent = "";
  } else {
    avEl.style.backgroundImage = "";
    avEl.style.background      = c.color;
    avEl.textContent = c.init;
  }

  document.getElementById("profilNomor").textContent   = c.nomor;
  document.getElementById("profilNama").textContent    = c.nama;
  document.getElementById("profilNIS").textContent     = "NIS "+c.nis;
  document.getElementById("profilSlogan").textContent  = c.slogan||"—";
  document.getElementById("profilVisi").textContent    = c.visi||"—";
  document.getElementById("profilMisi").innerHTML      = (c.misi||"—").split("\n").map(l=>`<div>${l}</div>`).join("");
  document.getElementById("profilProgram").textContent = c.program||"—";

  // ✅ Render semua platform medsos
  const medsosEl  = document.getElementById("profilMedsos");
  const platforms = [
    { key:"instagram", icon:"📸", label:"Instagram", href: u=>`https://instagram.com/${u}` },
    { key:"tiktok",    icon:"🎵", label:"TikTok",    href: u=>`https://tiktok.com/@${u}` },
    { key:"twitter",   icon:"🐦", label:"Twitter/X", href: u=>`https://twitter.com/${u}` },
    { key:"youtube",   icon:"▶️", label:"YouTube",   href: u=>`https://youtube.com/@${u}` },
    { key:"linkedin",  icon:"💼", label:"LinkedIn",  href: u=>`https://linkedin.com/in/${u}` },
  ];
  const links = [];
  platforms.forEach(p => {
    const val = (c[p.key]||"").replace("@","").trim();
    if (val) links.push(`<a href="${p.href(val)}" target="_blank" rel="noopener" class="medsos-link medsos-${p.key}">${p.icon} @${val}</a>`);
  });
  medsosEl.innerHTML = links.length
    ? links.join("")
    : `<span style="color:var(--muted);font-size:12px">Belum ada media sosial</span>`;

  document.getElementById("profilModal").classList.add("show");
};
window.closeProfilModal = function() { document.getElementById("profilModal").classList.remove("show"); };

// ───────────────────────────────────────────────
//  EDIT PROFIL — hanya kandidat yang login
// ───────────────────────────────────────────────
window.openEditProfil = function() {
  if (!user?.kandidat) return;
  const c=CANDIDATES.find(x=>x.nis===user.nis);
  if (!c) return;

  document.getElementById("editSlogan").value    = c.slogan||"";
  document.getElementById("editVisi").value      = c.visi||"";
  document.getElementById("editMisi").value      = c.misi||"";
  document.getElementById("editProgram").value   = c.program||"";
  document.getElementById("editInstagram").value = (c.instagram||"").replace("@","");
  document.getElementById("editTiktok").value    = (c.tiktok||"").replace("@","");
  document.getElementById("editTwitter").value   = (c.twitter||"").replace("@","");
  document.getElementById("editYoutube").value   = (c.youtube||"").replace("@","");
  document.getElementById("editLinkedin").value  = (c.linkedin||"").replace("@","");
  document.getElementById("fotoData").value      = "";

  const prevEl = document.getElementById("fotoPreview");
  if (c.foto) {
    prevEl.style.backgroundImage    = `url(${c.foto})`;
    prevEl.style.backgroundSize     = "cover";
    prevEl.style.backgroundPosition = "center";
    prevEl.textContent = "";
  } else {
    prevEl.style.backgroundImage = "";
    prevEl.style.background      = c.color;
    prevEl.textContent = c.init;
  }
  document.getElementById("editProfilModal").classList.add("show");
};
window.closeEditProfil = function() { document.getElementById("editProfilModal").classList.remove("show"); };

window.handleFotoUpload = function(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 2*1024*1024) { showToast("⚠️ Ukuran foto max 2MB!"); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const base64 = e.target.result;
    const prevEl = document.getElementById("fotoPreview");
    prevEl.style.backgroundImage    = `url(${base64})`;
    prevEl.style.backgroundSize     = "cover";
    prevEl.style.backgroundPosition = "center";
    prevEl.textContent = "";
    document.getElementById("fotoData").value = base64;
  };
  reader.readAsDataURL(file);
};

window.hapusFoto = function() {
  const c = CANDIDATES.find(x=>x.nis===user?.nis);
  if (!c) return;
  document.getElementById("fotoData").value = "__HAPUS__";
  const prevEl = document.getElementById("fotoPreview");
  prevEl.style.backgroundImage = "";
  prevEl.style.background = c.color;
  prevEl.textContent = c.init;
};

window.saveEditProfil = function() {
  if (!user?.kandidat) return;
  const idx=CANDIDATES.findIndex(x=>x.nis===user.nis);
  if (idx<0) return;

  const fotoData = document.getElementById("fotoData").value;
  if (fotoData === "__HAPUS__") CANDIDATES[idx].foto = "";
  else if (fotoData)            CANDIDATES[idx].foto = fotoData;
  document.getElementById("fotoData").value = "";

  CANDIDATES[idx].slogan    = document.getElementById("editSlogan").value.trim();
  CANDIDATES[idx].visi      = document.getElementById("editVisi").value.trim();
  CANDIDATES[idx].misi      = document.getElementById("editMisi").value.trim();
  CANDIDATES[idx].program   = document.getElementById("editProgram").value.trim();
  // ✅ Simpan semua platform medsos (tanpa @ di depan)
  CANDIDATES[idx].instagram = document.getElementById("editInstagram").value.trim().replace(/^@/,"");
  CANDIDATES[idx].tiktok    = document.getElementById("editTiktok").value.trim().replace(/^@/,"");
  CANDIDATES[idx].twitter   = document.getElementById("editTwitter").value.trim().replace(/^@/,"");
  CANDIDATES[idx].youtube   = document.getElementById("editYoutube").value.trim().replace(/^@/,"");
  CANDIDATES[idx].linkedin  = document.getElementById("editLinkedin").value.trim().replace(/^@/,"");

  saveCandidates();

  // Update avatar topbar jika foto berubah
  const c     = CANDIDATES[idx];
  const uAvEl = document.getElementById("uAv");
  if (c.foto) {
    uAvEl.style.backgroundImage    = `url(${c.foto})`;
    uAvEl.style.backgroundSize     = "cover";
    uAvEl.style.backgroundPosition = "center";
    uAvEl.textContent = "";
  } else {
    uAvEl.style.backgroundImage = "";
    uAvEl.textContent = user.nama.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  }

  closeEditProfil();
  const alreadyVoted = voteData.voted[user.nis] !== undefined;
  renderCards(alreadyVoted || user.admin);
  showToast("✅ Profil berhasil diperbarui!");
};

// ───────────────────────────────────────────────
//  GANTI PASSWORD — show/hide tiap field
// ───────────────────────────────────────────────
window.openChangePass = function() {
  ["cpOld","cpNew","cpConfirm"].forEach(id=>{
    const el=document.getElementById(id); if(el){ el.value=""; el.type="password"; }
  });
  ["cpOldBtn","cpNewBtn","cpConfirmBtn"].forEach(id=>{
    const el=document.getElementById(id); if(el) el.textContent="👁️";
  });
  const msgEl=document.getElementById("cpMsg");
  msgEl.textContent=""; msgEl.className="cp-msg";
  document.getElementById("changePassModal").classList.add("show");
};
window.closeChangePass = function() { document.getElementById("changePassModal").classList.remove("show"); };

// ✅ Universal toggle show/hide password — dipakai di seluruh halaman
window.togglePwField = function(inputId, btnId) {
  const inp=document.getElementById(inputId);
  const btn=document.getElementById(btnId);
  if (!inp||!btn) return;
  inp.type = inp.type==="password" ? "text" : "password";
  btn.textContent = inp.type==="password" ? "👁️" : "🙈";
};

window.submitChangePass = function() {
  const old    = document.getElementById("cpOld").value;
  const newPw  = document.getElementById("cpNew").value;
  const conf   = document.getElementById("cpConfirm").value;
  const msgEl  = document.getElementById("cpMsg");
  const err    = t => { msgEl.textContent=t; msgEl.className="cp-msg err"; };
  const ok     = t => { msgEl.textContent=t; msgEl.className="cp-msg ok"; };

  if (!old||!newPw||!conf) return err("⚠️ Semua field harus diisi.");
  if (user.pw !== old)     return err("❌ Password lama salah.");
  if (newPw.length < 6)   return err("⚠️ Password minimal 6 karakter.");
  if (newPw !== conf)      return err("❌ Konfirmasi tidak cocok.");

  const idx=ACCOUNTS.findIndex(a=>a.nis===user.nis);
  if (idx>=0){ ACCOUNTS[idx].pw=newPw; user.pw=newPw; }
  saveAccounts();
  ok("✅ Password berhasil diubah!");
  setTimeout(()=>closeChangePass(),1500);
  showToast("🔐 Password berhasil diperbarui!");
};

// ───────────────────────────────────────────────
//  VOTING INTERAKSI
//  ✅ Kandidat bisa memilih (termasuk memilih dirinya sendiri)
// ───────────────────────────────────────────────
function selectCard(id) {
  if (!isVotingOpen()) { showToast("⏰ Pemilihan belum dibuka atau sudah ditutup!"); return; }
  selectedId = selectedId===id ? null : id;
  document.getElementById("btnVote").disabled = selectedId===null;
  renderCards(false);
}

window.openModal = function() {
  if (!selectedId) return;
  if (!isVotingOpen()) { showToast("⏰ Pemilihan sudah ditutup!"); return; }
  const c=CANDIDATES.find(x=>x.id===selectedId);
  document.getElementById("confirmName").textContent=c.nama;
  document.getElementById("modal").classList.add("show");
};
window.closeModal = function() { document.getElementById("modal").classList.remove("show"); };

window.submitVote = async function() {
  closeModal();
  if (!isVotingOpen()) { showToast("⏰ Pemilihan sudah ditutup!"); return; }
  const c=CANDIDATES.find(x=>x.id===selectedId);
  if (!voteData.votes[c.id]) voteData.votes[c.id]=0;
  voteData.votes[c.id]++;
  voteData.voted[user.nis]=c.id;
  try {
    await dbSetVotes(voteData.votes);
    await dbSetVoted(voteData.voted);
    refreshUI(); updateSyncTime();
    showToast(`✅ Suaramu untuk ${c.nama} berhasil dicatat!`);
  } catch(e) {
    showToast("❌ Gagal menyimpan. Periksa koneksi.");
    console.error(e);
  }
};

// ───────────────────────────────────────────────
//  ADMIN — daftar pemilih & reset
// ───────────────────────────────────────────────
window.toggleVList = function() {
  vlOpen=!vlOpen;
  document.getElementById("voterList").classList.toggle("show",vlOpen);
  if (vlOpen) renderVoterList();
};

function renderVoterList() {
  const siswa=ACCOUNTS.filter(a=>!a.admin);
  const sudah=siswa.filter(a=>voteData.voted[a.nis]!==undefined).length;
  document.getElementById("vlSum").textContent=`${sudah} / ${siswa.length} siswa sudah memilih`;
  const body=document.getElementById("vlBody");
  body.innerHTML="";
  siswa.forEach((acc,i)=>{
    const hasV=voteData.voted[acc.nis]!==undefined;
    const cObj=hasV?CANDIDATES.find(c=>c.id==voteData.voted[acc.nis]):null;
    const row=document.createElement("div");
    row.className="vl-row";
    row.innerHTML=`
      <div class="vl-dot ${hasV?"on":"off"}"></div>
      <div class="vl-no">${i+1}</div>
      <div class="vl-info">
        <div class="vl-nm">${acc.nama}${acc.kandidat?' <span class="tag-kandidat">Kandidat</span>':""}</div>
        <div class="vl-nis">${acc.nis}</div>
      </div>
      <div class="vl-choice">${cObj?cObj.nomor:""}</div>
      <div class="vl-status ${hasV?"ya":"blm"}">${hasV?"Sudah":"Belum"}</div>`;
    body.appendChild(row);
  });
}

window.adminReset = async function() {
  if (!confirm("Reset semua data voting?\nSemua suara dan status pemilih akan dihapus dari Firebase.")) return;
  try {
    await dbClearAll();
    voteData={votes:{},voted:{}}; selectedId=null;
    document.getElementById("votedBanner").classList.remove("show");
    document.getElementById("voteActions").style.display="flex";
    document.getElementById("btnVote").disabled=true;
    renderCards(false); updateStats();
    if(vlOpen) renderVoterList();
    showToast("🗑️ Semua data voting berhasil direset.");
  } catch { showToast("❌ Gagal reset."); }
};

// ───────────────────────────────────────────────
//  HELPERS
// ───────────────────────────────────────────────
window.clearMsgs = function() {
  document.getElementById("msgErr").classList.remove("show");
  document.getElementById("msgDbl").classList.remove("show");
};

function showMsg(id) {
  clearMsgs();
  const el=document.getElementById(id);
  el.classList.add("show"); el.style.animation="none";
  requestAnimationFrame(()=>(el.style.animation=""));
}

function showToast(msg) {
  const t=document.getElementById("toast");
  t.textContent=msg; t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),3500);
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}