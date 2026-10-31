/* ===== 1. УХААЛАГ ТААМАГЛАГЧИЙН ӨГӨГДЛИЙН САН ===== */
const smartDict = {
    "ymr": "ямар", "yrn": "ер нь", "bl": "бол", "bn": "байна", "bna": "байна",
    "sn": "сайн", "snu": "сайн уу", "bnu": "байна уу", "twan": "тайван",
    "zgr": "зүгээр", "bhk": "байхгүй", "bhgu": "байхгүй", "bga": "байгаа",
    "mdeku": "мэдэхгүй", "mdku": "мэдэхгүй", "mdq": "мэдэхгүй", "ndd": "надад",
    "yhw": "яах вэ", "za": "за", "thh": "тийм", "xxa": "хаха", "hha": "хаха",
    "ugu": "үгүй", "ugui": "үгүй", "tgd": "тэгээд", "tghd": "тэгэхэд",
    "gvl": "гэвэл", "ch": "ч", "shg": "шиг", "mgl": "монгол", "odo": "одоо",
    "yu": "юу", "hn": "хэн", "chmd": "чамаад", "mgdgui": "магадгүй", "hlh": "хэлэх"
};
const suffixes = {
    "iig": "ийг", "iin": "ийн", "giin": "гийн", "tai": "тай", "tei": "тэй",
    "toi": "той", "gui": "гүй", "ku": "гүй", "aar": "аар", "eer": "ээр",
    "oor": "оор", "uur": "уур", "nd": "нд", "d": "д", "t": "т"
};
const latToCyrMulti = { "sh": "ш", "ch": "ч", "ts": "ц", "kh": "х", "ya": "я", "yu": "ю", "ye": "е", "yo": "ё" };
const latToCyrSingle = { "a": "а", "b": "б", "v": "в", "w": "в", "g": "г", "d": "д", "e": "э", "j": "ж", "z": "з", "i": "и", "k": "к", "l": "л", "m": "м", "n": "н", "o": "о", "p": "п", "r": "р", "s": "с", "t": "т", "u": "у", "f": "ф", "h": "х", "c": "ц", "y": "й", "x": "х", "q": "к", "ö": "ө", "ü": "ү" };
const cyrToLatMulti = { "ай": "ai", "эй": "ei", "ой": "oi", "уй": "ui", "ш": "sh", "ч": "ch", "ц": "ts", "я": "ya", "ю": "yu", "е": "ye", "ё": "yo" };
const cyrToLatSingle = { "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "э": "e", "ж": "j", "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sh", "ъ": "", "ы": "y", "ь": "i", "э": "e", "ю": "yu", "я": "ya", "ө": "ö", "ү": "ü" };

/* ===== 2. УХААЛАГ ХӨРВҮҮЛЭХ АЛГОРИТМ ===== */
function smartTransliterate(word, dir) {
    if (!word.trim() || !/[a-zA-Zа-яА-ЯөӨүҮ]+/.test(word)) return word;
    let lowerWord = word.toLowerCase();
    let isCap = word[0] === word[0].toUpperCase();
    let out = lowerWord;
    if (dir === 'lat-cyr') {
        if (smartDict[lowerWord]) {
            out = smartDict[lowerWord];
        } else {
            let foundSuffix = false;
            for (const [latSuff, cyrSuff] of Object.entries(suffixes)) {
                if (lowerWord.endsWith(latSuff) && lowerWord.length > latSuff.length + 1) {
                    let root = lowerWord.slice(0, -latSuff.length);
                    let convRoot = basicReplace(root, 'lat-cyr');
                    if (latSuff.includes("ii") && !convRoot.includes("ү") && root.includes("u")) {
                        convRoot = convRoot.replace(/у/g, 'ү');
                    }
                    out = convRoot + cyrSuff;
                    foundSuffix = true;
                    break;
                }
            }
            if (!foundSuffix) {
                out = basicReplace(lowerWord, 'lat-cyr');
                if (out.includes("уг") && out.includes("ий")) out = out.replace(/уг/g, 'үг');
            }
        }
    } else {
        out = basicReplace(lowerWord, 'cyr-lat');
    }
    return isCap ? out.charAt(0).toUpperCase() + out.slice(1) : out;
}
function basicReplace(text, dir) {
    let result = text;
    if (dir === 'lat-cyr') {
        for (const [l, c] of Object.entries(latToCyrMulti)) result = result.split(l).join(c);
        for (const [l, c] of Object.entries(latToCyrSingle)) result = result.split(l).join(c);
    } else {
        for (const [c, l] of Object.entries(cyrToLatMulti)) result = result.split(c).join(l);
        for (const [c, l] of Object.entries(cyrToLatSingle)) result = result.split(c).join(l);
    }
    return result;
}

/* ===== 3. UI + AI + СУРАЛЦАХ ===== */
// local.js = таны хуучин кодын 1–2-р хэсэг (smartDict … convertText). Энд зөвхөн UI + AI.
const $ = id => document.getElementById(id);
const get = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } };
const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} };
let isDark = matchMedia('(prefers-color-scheme: dark)').matches, currentLang = 'mn', direction = 'lat-cyr', aiOn = true, reqId = 0, aiTimer, histTimer;

const T = {
  mn: { labelLat: "Латин (Ухаалаг)", labelCyr: "Кирилл", phIn: "ymr ch ugiig yrn bl... гэх мэтээр бичнэ үү", phOut: "Ухаалгаар таамаглаж энд гаргана...", copy: "Хуулах", copied: "Хууллаа!", import: "Оруулах", export: "Татах", paste: "Буулгах", word: "Үг", char: "Тэмдэгт", hist: "Сүүлийн түүх", empty: "Түүх хоосон байна.", rate: "AI зөв хөрвүүлсэн үү?", thinking: "AI бодож байна…", ready: "AI хөрвүүлсэн", offline: "Офлайн горим", thanks: "Баярлалаа! Би сурлаа", fixit: "Засаад 👍 дарвал би сурна", pasteFail: "Буулгах боломжгүй", title: "Хөрвүүлэгч" },
  en: { labelLat: "Latin (Smart)", labelCyr: "Cyrillic", phIn: "Type smart latin like ymr ch ugiig...", phOut: "Smart prediction will appear here...", copy: "Copy", copied: "Copied!", import: "Import", export: "Export", paste: "Paste", word: "Words", char: "Chars", hist: "Recent History", empty: "History is empty.", rate: "Was the AI right?", thinking: "AI thinking…", ready: "AI converted", offline: "Offline mode", thanks: "Thanks! I learned", fixit: "Edit it, then press 👍 to teach me", pasteFail: "Paste not allowed", title: "Converter" }
};
const tr = () => T[currentLang];
const input = $('inputText'), output = $('outputText'), fb = $('fb');

function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2200); }
const status = k => $('status').textContent = k ? tr()[k] : '';

// Хувийн толь + локал хөрвүүлэлт (суралцсан үгсийг түрүүлж ашиглана)
function localConvert(text) {
  const dict = get('cv_dict', {});
  return text.split(/([ \n\t,.\?!]+)/).map(w => (direction === 'lat-cyr' && dict[w.toLowerCase()]) || smartTransliterate(w, direction)).join('');
}

function update() {
  const text = input.value, t = tr();
  output.value = localConvert(text);
  fb.hidden = true; status('');
  $('counterText').textContent = `${t.word}: ${text.trim() ? text.trim().split(/\s+/).length : 0} | ${t.char}: ${text.length}`;
  localStorage.setItem('cv_current', text);
  clearTimeout(histTimer);
  histTimer = setTimeout(() => {
    if (text.trim().length > 2) { const h = get('cv_history', []); if (h[0] !== text) { h.unshift(text); set('cv_history', h.slice(0, 5)); } }
  }, 3000);
  clearTimeout(aiTimer);
  if (aiOn && text.trim().length > 1) aiTimer = setTimeout(askAI, 700);
}

async function askAI() {
  const id = ++reqId, text = input.value;
  document.querySelector('.output-box').classList.add('busy'); status('thinking');
  try {
    const r = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, direction, examples: get('cv_learned', []).slice(-6) }) });
    if (!r.ok) throw 0;
    const { result } = await r.json();
    if (id !== reqId || !result) return;
    output.value = result; status('ready'); fb.hidden = false;
  } catch { if (id === reqId) status('offline'); }
  finally { if (id === reqId) document.querySelector('.output-box').classList.remove('busy'); }
}

// Суралцах: 👍 дарахад (засвар хийсэн бол засварыг) хадгална
function learn(src, out) {
  if (direction !== 'lat-cyr') return;
  const learned = get('cv_learned', []); learned.push({ i: src.slice(0, 200), o: out.slice(0, 200) }); set('cv_learned', learned.slice(-30));
  const a = src.trim().split(/\s+/), b = out.trim().split(/\s+/);
  if (a.length === b.length) { const d = get('cv_dict', {}); a.forEach((w, i) => { if (w.length < 25 && /^[a-zA-Z]+$/.test(w)) d[w.toLowerCase()] = b[i]; }); set('cv_dict', d); }
}
function vote(up) {
  const s = get('cv_stats', { up: 0, down: 0 }); s[up ? 'up' : 'down']++; set('cv_stats', s);
  $('fbUp').title = `👍 ${s.up}`; $('fbDown').title = `👎 ${s.down}`;
  if (up) { learn(input.value, output.value); fb.hidden = true; toast(tr().thanks); }
  else { output.focus(); toast(tr().fixit); }
}
$('fbUp').onclick = () => vote(true); $('fbDown').onclick = () => vote(false);

function setLabels() { $('label-left').textContent = tr()[direction === 'lat-cyr' ? 'labelLat' : 'labelCyr']; $('label-right').textContent = tr()[direction === 'lat-cyr' ? 'labelCyr' : 'labelLat']; }
function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = tr()[e.dataset.i18n]);
  document.querySelectorAll('[data-ph]').forEach(e => e.placeholder = tr()[e.dataset.ph]);
  $('ui-title').textContent = tr().title; setLabels(); update();
}
function applyTheme() { document.body.dataset.theme = isDark ? 'dark' : 'light'; $('moon-icon').style.display = isDark ? 'none' : 'block'; $('sun-icon').style.display = isDark ? 'block' : 'none'; }

input.addEventListener('input', update);
$('clearBtn').onclick = () => { input.value = ''; update(); input.focus(); };
$('pasteBtn').onclick = async () => { try { input.value = await navigator.clipboard.readText(); update(); } catch { toast(tr().pasteFail); } };
$('fileInput').onchange = e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = x => { input.value = x.target.result; update(); }; r.readAsText(f); } };
$('exportBtn').onclick = () => { if (!output.value) return; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([output.value], { type: 'text/plain' })); a.download = 'converted.txt'; a.click(); };
$('copyBtn').onclick = () => { if (!output.value) return; navigator.clipboard.writeText(output.value).then(() => toast(tr().copied)); };
$('swapBtn').onclick = () => { direction = direction === 'lat-cyr' ? 'cyr-lat' : 'lat-cyr'; input.value = output.value; setLabels(); update(); };
$('langToggle').onclick = e => { currentLang = currentLang === 'mn' ? 'en' : 'mn'; e.target.textContent = currentLang === 'mn' ? 'EN' : 'MN'; document.documentElement.lang = currentLang; applyLang(); };
$('themeToggle').onclick = () => { isDark = !isDark; applyTheme(); };
$('aiToggle').onclick = e => { aiOn = !aiOn; e.currentTarget.classList.toggle('on', aiOn); if (aiOn) update(); else { reqId++; status('offline'); output.value = localConvert(input.value); } };

$('historyToggle').onclick = () => {
  $('historyModal').style.display = 'flex'; const list = $('historyList'), h = get('cv_history', []); list.innerHTML = '';
  if (!h.length) list.innerHTML = `<div class="empty-history">${tr().empty}</div>`;
  h.forEach(txt => { const d = document.createElement('div'); d.className = 'history-item'; d.textContent = txt; d.onclick = () => { input.value = txt; update(); $('historyModal').style.display = 'none'; }; list.appendChild(d); });
};
$('closeHistory').onclick = () => $('historyModal').style.display = 'none';
$('historyModal').onclick = e => { if (e.target.id === 'historyModal') e.target.style.display = 'none'; };

document.addEventListener('keydown', e => {
  const k = e.code, mod = e.ctrlKey || e.metaKey, plain = mod && !e.shiftKey && !e.altKey;
  if (k === 'Escape') $('historyModal').style.display = 'none';
  else if (mod && k === 'Enter') { e.preventDefault(); clearTimeout(aiTimer); if (aiOn) askAI(); }
  else if (plain && k === 'KeyK') { e.preventDefault(); $('clearBtn').click(); }
  else if (plain && k === 'KeyS') { e.preventDefault(); $('exportBtn').click(); }
  else if (plain && k === 'KeyO') { e.preventDefault(); $('fileInput').click(); }
  else if (e.altKey && !mod && k === 'KeyC') { e.preventDefault(); $('copyBtn').click(); }
  else if (e.altKey && !mod && k === 'KeyS') { e.preventDefault(); $('swapBtn').click(); }
});

window.onload = () => { applyTheme(); applyLang(); const s = localStorage.getItem('cv_current'); if (s) { input.value = s; update(); } };
