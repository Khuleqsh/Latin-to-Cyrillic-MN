let isDark = false;
let currentLang = 'mn'; 
let direction = 'lat-cyr'; 
let apiDebounceTimeout;

const translations = {
    mn: {
        title: "Хөрвүүлэгч", labelLat: "Латин", labelCyr: "Кирилл",
        placeholderIn: "ymr ch ugiig yrn bl...", placeholderOut: "AI-ийн үр дүн энд гарна...",
        copy: "Хуулах", copied: "Хууллаа", import: "Оруулах", export: "Татах",
        word: "Үг", char: "Тэмдэгт", histTitle: "Түүх", histEmpty: "Түүх хоосон байна.", 
        thinking: "AI боловсруулж байна...", askApiKey: "Та Groq API түлхүүрээ оруулна уу (Түлхүүр таны хөтөчид хадгалагдана):"
    },
    en: {
        title: "Converter", labelLat: "Latin", labelCyr: "Cyrillic",
        placeholderIn: "Type slang latin like ymr ch ugiig...", placeholderOut: "AI output will appear here...",
        copy: "Copy", copied: "Copied", import: "Import", export: "Export",
        word: "Words", char: "Chars", histTitle: "History", histEmpty: "History is empty.", 
        thinking: "AI is processing...", askApiKey: "Please enter your Groq API key (It will be saved locally):"
    }
};

const DOM = {
    input: document.getElementById('inputText'),
    output: document.getElementById('outputText'),
    counter: document.getElementById('counterText'),
    clearBtn: document.getElementById('clearBtn'),
    importBtn: document.getElementById('fileInput'),
    exportBtn: document.getElementById('exportBtn'),
    swapBtn: document.getElementById('swapBtn'),
    copyBtn: document.getElementById('copyBtn'),
    histBtn: document.getElementById('historyToggle'),
    histModal: document.getElementById('historyModal'),
    closeHist: document.getElementById('closeHistory'),
    histList: document.getElementById('historyList'),
    loading: document.getElementById('loadingIndicator')
};

// API түлхүүр шалгах/авах функц
function getApiKey() {
    let key = localStorage.getItem('groq_api_key');
    if (!key) {
        key = prompt(translations[currentLang].askApiKey);
        if (key && key.trim() !== '') {
            localStorage.setItem('groq_api_key', key.trim());
        } else {
            return null;
        }
    }
    return key;
}

// AI API ХӨРВҮҮЛЭХ ФУНКЦ
async function fetchAIConversion(text, dir) {
    if (!text.trim()) {
        DOM.output.value = '';
        DOM.loading.style.display = 'none';
        return;
    }

    const apiKey = getApiKey();
    if (!apiKey) {
        DOM.output.value = "API Key оруулаагүй тул ажиллахгүй.";
        return;
    }

    DOM.loading.style.display = 'flex';

    const systemPrompt = dir === 'lat-cyr' 
        ? "You are an expert Mongolian translator. Convert informal, abbreviated Mongolian Latin text (e.g. 'ymr ch ugiig yrn bl', 'sn bn u') into fully accurate, natural Mongolian Cyrillic script. Output ONLY the converted text without any explanation."
        : "You are an expert Mongolian translator. Convert Mongolian Cyrillic text into readable Mongolian Latin script. Output ONLY the converted text without any explanation.";

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`, // Энд хувьсагчаар дамжуулна
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: text }
                ],
                temperature: 0.1
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('groq_api_key'); // Буруу түлхүүр байвал устгах
                throw new Error("API Key буруу эсвэл хугацаа нь дууссан байна.");
            }
            throw new Error(`Алдаа гарлаа: ${response.status}`);
        }

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            DOM.output.value = data.choices[0].message.content.trim();
            saveToHistory(text);
        }
    } catch (error) {
        console.error("AI Error:", error);
        DOM.output.value = error.message || "Сүлжээний алдаа гарлаа. Дахин оролдоно уу.";
    } finally {
        DOM.loading.style.display = 'none';
    }
}

function handleInput() {
    const text = DOM.input.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const t = translations[currentLang];
    DOM.counter.textContent = `${t.word}: ${words} | ${t.char}: ${chars}`;

    localStorage.setItem('cv_current', text);

    clearTimeout(apiDebounceTimeout);
    if (text.trim()) {
        apiDebounceTimeout = setTimeout(() => {
            fetchAIConversion(text, direction);
        }, 600);
    } else {
        DOM.output.value = '';
        DOM.loading.style.display = 'none';
    }
}

function saveToHistory(text) {
    if (text.trim().length <= 2) return;
    let history = JSON.parse(localStorage.getItem('cv_history')) || [];
    if (history[0] !== text) {
        history.unshift(text);
        if (history.length > 5) history.pop();
        localStorage.setItem('cv_history', JSON.stringify(history));
    }
}

DOM.input.addEventListener('input', handleInput);

DOM.clearBtn.addEventListener('click', () => {
    DOM.input.value = '';
    DOM.output.value = '';
    handleInput();
    DOM.input.focus();
});

DOM.importBtn.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (res) => { DOM.input.value = res.target.result; handleInput(); };
        reader.readAsText(file);
    }
});

DOM.exportBtn.addEventListener('click', () => {
    const text = DOM.output.value;
    if (!text) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    a.download = 'converted.txt';
    a.click();
});

DOM.histBtn.addEventListener('click', () => {
    DOM.histModal.style.display = 'flex';
    let history = JSON.parse(localStorage.getItem('cv_history')) || [];
    DOM.histList.innerHTML = '';
    if (history.length === 0) {
        DOM.histList.innerHTML = `<div style="text-align:center; color:var(--text-muted); font-size:13px;">${translations[currentLang].histEmpty}</div>`;
    } else {
        history.forEach(txt => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.textContent = txt;
            div.onclick = () => { DOM.input.value = txt; handleInput(); DOM.histModal.style.display = 'none'; };
            DOM.histList.appendChild(div);
        });
    }
});

DOM.closeHist.addEventListener('click', () => DOM.histModal.style.display = 'none');
DOM.histModal.addEventListener('click', (e) => { if(e.target === DOM.histModal) DOM.histModal.style.display = 'none'; });

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyS') { e.preventDefault(); DOM.swapBtn.click(); }
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') { e.preventDefault(); DOM.copyBtn.click(); }
});

DOM.swapBtn.addEventListener('click', () => {
    direction = direction === 'lat-cyr' ? 'cyr-lat' : 'lat-cyr';
    DOM.input.value = DOM.output.value;
    handleInput();
    const t = translations[currentLang];
    document.getElementById('label-left').textContent = t[direction === 'lat-cyr' ? 'labelLat' : 'labelCyr'];
    document.getElementById('label-right').textContent = t[direction === 'lat-cyr' ? 'labelCyr' : 'labelLat'];
});

document.getElementById('langToggle').addEventListener('click', (e) => {
    currentLang = currentLang === 'mn' ? 'en' : 'mn';
    e.target.textContent = currentLang === 'mn' ? 'EN' : 'MN';
    const t = translations[currentLang];
    document.getElementById('ui-title').textContent = t.title;
    document.getElementById('ui-history-title').textContent = t.histTitle;
    document.getElementById('ui-thinking').textContent = t.thinking;
    document.querySelector('label[for="fileInput"]').textContent = t.import;
    DOM.exportBtn.textContent = t.export;
    document.getElementById('ui-copy').textContent = t.copy;
    document.getElementById('label-left').textContent = t[direction === 'lat-cyr' ? 'labelLat' : 'labelCyr'];
    document.getElementById('label-right').textContent = t[direction === 'lat-cyr' ? 'labelCyr' : 'labelLat'];
    DOM.input.placeholder = t.placeholderIn;
    DOM.output.placeholder = t.placeholderOut;
    handleInput();
});

document.getElementById('themeToggle').addEventListener('click', () => {
    isDark = !isDark;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.getElementById('moon-icon').style.display = isDark ? 'none' : 'block';
    document.getElementById('sun-icon').style.display = isDark ? 'block' :
