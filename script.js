let isDark = false;
let currentLang = 'mn'; 
let direction = 'lat-cyr'; 

// UI Орчуулга
const translations = {
    mn: {
        title: "Хөрвүүлэгч", labelLat: "Латин (Ухаалаг)", labelCyr: "Кирилл",
        placeholderIn: "ymr ch ugiig yrn bl... гэх мэтээр бичнэ үү", placeholderOut: "Ухаалгаар таамаглаж энд гаргана...",
        copy: "Хуулах", copied: "Хууллаа!", import: "📄 Оруулах", export: "📥 Татах",
        word: "Үг", char: "Тэмдэгт", histTitle: "Сүүлийн түүх", histEmpty: "Түүх хоосон байна."
    },
    en: {
        title: "Converter", labelLat: "Latin (Smart)", labelCyr: "Cyrillic",
        placeholderIn: "Type smart latin like ymr ch ugiig...", placeholderOut: "Smart prediction will appear here...",
        copy: "Copy", copied: "Copied!", import: "📄 Import", export: "📥 Export",
        word: "Words", char: "Chars", histTitle: "Recent History", histEmpty: "History is empty."
    }
};

/* --- 1. УХААЛАГ ТААМАГЛАГЧИЙН ӨГӨГДЛИЙН САН --- */
// Хүмүүсийн хамгийн их бичдэг товчлолууд
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

// Түгээмэл дагавар нөхцөлүүд (салгаж таних зорилгоор)
const suffixes = {
    "iig": "ийг", "iin": "ийн", "giin": "гийн", "tai": "тай", "tei": "тэй",
    "toi": "той", "gui": "гүй", "ku": "гүй", "aar": "аар", "eer": "ээр",
    "oor": "оор", "uur": "уур", "nd": "нд", "d": "д", "t": "т"
};

// Үндсэн үсгүүд
const latToCyrMulti = { "sh": "ш", "ch": "ч", "ts": "ц", "kh": "х", "ya": "я", "yu": "ю", "ye": "е", "yo": "ё" };
const latToCyrSingle = { "a": "а", "b": "б", "v": "в", "w": "в", "g": "г", "d": "д", "e": "э", "j": "ж", "z": "з", "i": "и", "k": "к", "l": "л", "m": "м", "n": "н", "o": "о", "p": "п", "r": "р", "s": "с", "t": "т", "u": "у", "f": "ф", "h": "х", "c": "ц", "y": "й", "x": "х", "q": "к", "ö": "ө", "ü": "ү" };
const cyrToLatMulti = { "ай": "ai", "эй": "ei", "ой": "oi", "уй": "ui", "ш": "sh", "ч": "ch", "ц": "ts", "я": "ya", "ю": "yu", "е": "ye", "ё": "yo" };
const cyrToLatSingle = { "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "э": "e", "ж": "j", "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sh", "ъ": "", "ы": "y", "ь": "i", "э": "e", "ю": "yu", "я": "ya", "ө": "ö", "ү": "ü" };

/* --- 2. УХААЛАГ ХӨРВҮҮЛЭХ АЛГОРИТМ --- */
function smartTransliterate(word, dir) {
    if (!word.trim() || !/[a-zA-Zа-яА-ЯөӨүҮ]+/.test(word)) return word;
    
    let lowerWord = word.toLowerCase();
    let isCap = word[0] === word[0].toUpperCase();
    let out = lowerWord;

    if (dir === 'lat-cyr') {
        // 1. Шууд таамаглах толь бичгээс шалгах (ymr -> ямар)
        if (smartDict[lowerWord]) {
            out = smartDict[lowerWord];
        } 
        else {
            let foundSuffix = false;
            // 2. Дагаврыг салгаж таних (ugiig -> ug + iig)
            for (const [latSuff, cyrSuff] of Object.entries(suffixes)) {
                if (lowerWord.endsWith(latSuff) && lowerWord.length > latSuff.length + 1) {
                    let root = lowerWord.slice(0, -latSuff.length);
                    
                    // Үндсийг хөрвүүлэх (ug -> үг)
                    let convRoot = basicReplace(root, 'lat-cyr');
                    
                    // Эгшиг зохицох (u нь ү, ө байх магадлалтай үед засварлах)
                    if (latSuff.includes("ii") && !convRoot.includes("ү") && root.includes("u")) {
                        convRoot = convRoot.replace(/у/g, 'ү'); // ugiig -> угийг биш үгийг
                    }
                    
                    out = convRoot + cyrSuff;
                    foundSuffix = true;
                    break;
                }
            }

            // 3. Хэрэв толь болон дагаварт ороогүй бол энгийнээр ухаалгаар солих
            if (!foundSuffix) {
                out = basicReplace(lowerWord, 'lat-cyr');
                // Ухаалаг эгшиг зохицол (Жишээ нь ugiig гэхэд шууд үгийг болгох)
                if(out.includes("уг") && out.includes("ий")) {
                    out = out.replace(/уг/g, 'үг');
                }
            }
        }
    } else {
        // Кириллээс Латин руу (Энгийн буцаалт)
        out = basicReplace(lowerWord, 'cyr-lat');
    }

    // Том үсгээр эхэлсэн бол буцаагаад том болгох
    return isCap ? out.charAt(0).toUpperCase() + out.slice(1) : out;
}

// Энгийн үсэг солих функц
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

// Үндсэн текстийг үгүүдэд хувааж хөрвүүлэх
function convertText(text, dir) {
    // Үг, цэг таслал, хоосон зайг салгаж авах (Regular Expression)
    let words = text.split(/([ \n\t,.\?!]+)/);
    return words.map(word => smartTransliterate(word, dir)).join('');
}

/* --- 3. UI БОЛОН ҮЙЛДЛҮҮДИЙН КОД --- */
const DOM = {
    input: document.getElementById('inputText'), output: document.getElementById('outputText'),
    counter: document.getElementById('counterText'), clearBtn: document.getElementById('clearBtn'),
    importBtn: document.getElementById('fileInput'), exportBtn: document.getElementById('exportBtn'),
    swapBtn: document.getElementById('swapBtn'), copyBtn: document.getElementById('copyBtn'),
    histBtn: document.getElementById('historyToggle'), histModal: document.getElementById('historyModal'),
    closeHist: document.getElementById('closeHistory'), histList: document.getElementById('historyList')
};

let saveTimeout;
function updateUI() {
    const text = DOM.input.value;
    
    // Хөрвүүлэх дуудах
    DOM.output.value = convertText(text, direction);
    
    // Үг, Тэмдэгт тоолох
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const t = translations[currentLang];
    DOM.counter.textContent = `${t.word}: ${words} | ${t.char}: ${chars}`;

    // Auto-save
    localStorage.setItem('cv_current', text);
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        if (text.trim().length > 2) {
            let history = JSON.parse(localStorage.getItem('cv_history')) || [];
            if (history[0] !== text) {
                history.unshift(text);
                if (history.length > 5) history.pop();
                localStorage.setItem('cv_history', JSON.stringify(history));
            }
        }
    }, 3000);
}
DOM.input.addEventListener('input', updateUI);

// Цэвэрлэх
DOM.clearBtn.addEventListener('click', () => {
    DOM.input.value = ''; updateUI(); DOM.input.focus();
});

// Import & Export
DOM.importBtn.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (res) => { DOM.input.value = res.target.result; updateUI(); };
        reader.readAsText(file);
    }
});
DOM.exportBtn.addEventListener('click', () => {
    const text = DOM.output.value; if (!text) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    a.download = 'smart_converted.txt'; a.click();
});

// Түүх
DOM.histBtn.addEventListener('click', () => {
    DOM.histModal.style.display = 'flex';
    let history = JSON.parse(localStorage.getItem('cv_history')) || [];
    DOM.histList.innerHTML = '';
    if (history.length === 0) DOM.histList.innerHTML = `<div class="empty-history">${translations[currentLang].histEmpty}</div>`;
    else history.forEach(txt => {
        const div = document.createElement('div'); div.className = 'history-item'; div.textContent = txt;
        div.onclick = () => { DOM.input.value = txt; updateUI(); DOM.histModal.style.display = 'none'; };
        DOM.histList.appendChild(div);
    });
});
DOM.closeHist.addEventListener('click', () => DOM.histModal.style.display = 'none');
DOM.histModal.addEventListener('click', (e) => { if(e.target === DOM.histModal) DOM.histModal.style.display = 'none'; });

// Shortcuts (Ctrl+Shift+S, Ctrl+Shift+C)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyS') { e.preventDefault(); DOM.swapBtn.click(); }
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') { e.preventDefault(); DOM.copyBtn.click(); }
});

// Бусад товчлуурууд
DOM.swapBtn.addEventListener('click', () => {
    direction = direction === 'lat-cyr' ? 'cyr-lat' : 'lat-cyr';
    DOM.input.value = DOM.output.value; updateUI();
    const t = translations[currentLang];
    document.getElementById('label-left').textContent = t[direction === 'lat-cyr' ? 'labelLat' : 'labelCyr'];
    document.getElementById('label-right').textContent = t[direction === 'lat-cyr' ? 'labelCyr' : 'labelLat'];
});

document.getElementById('langToggle').addEventListener('click', (e) => {
    currentLang = currentLang === 'mn' ? 'en' : 'mn'; e.target.textContent = currentLang === 'mn' ? 'EN' : 'MN';
    const t = translations[currentLang];
    document.getElementById('ui-title').textContent = t.title; document.getElementById('ui-history-title').textContent = t.histTitle;
    document.querySelector('label[for="fileInput"]').textContent = t.import; DOM.exportBtn.textContent = t.export;
    document.getElementById('ui-copy').textContent = t.copy;
    document.getElementById('label-left').textContent = t[direction === 'lat-cyr' ? 'labelLat' : 'labelCyr'];
    document.getElementById('label-right').textContent = t[direction === 'lat-cyr' ? 'labelCyr' : 'labelLat'];
    DOM.input.placeholder = t.placeholderIn; DOM.output.placeholder = t.placeholderOut; updateUI();
});

document.getElementById('themeToggle').addEventListener('click', () => {
    isDark = !isDark; document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.getElementById('moon-icon').style.display = isDark ? 'none' : 'block';
    document.getElementById('sun-icon').style.display = isDark ? 'block' : 'none';
});

DOM.copyBtn.addEventListener('click', () => {
    if (!DOM.output.value) return;
    navigator.clipboard.writeText(DOM.output.value).then(() => {
        const span = document.getElementById('ui-copy'); const orig = span.textContent;
        span.textContent = translations[currentLang].copied; setTimeout(() => span.textContent = orig, 2000);
    });
});

window.onload = () => { const saved = localStorage.getItem('cv_current'); if (saved) { DOM.input.value = saved; updateUI(); } };
