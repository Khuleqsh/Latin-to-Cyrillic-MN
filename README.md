# 🇲🇳 Smart Latin–Cyrillic Converter | Ухаалаг Латин–Кирилл Хөрвүүлэгч

![UI](https://img.shields.io/badge/UI-Minimal-black?style=flat-square)
![Mode](https://img.shields.io/badge/Mode-Light%20%2F%20Dark-lightgrey?style=flat-square)
![AI](https://img.shields.io/badge/AI-Groq-orange?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20Vanilla%20JS-yellow?style=flat-square)

🌍 **Read in:** [English](#-english) | [Монгол хэлээр унших](#-монгол)

🚀 **Live Demo:** https://img.shields.io/badge/UI-Minimal-black?style=flat-square*

---

## <a name="-english"></a> 🇬🇧 English

A fast web app that converts Mongolian Latin chat-slang into proper Cyrillic (and back) in real time. It combines a **built-in rule-based engine** with an **AI layer powered by Groq**, so results are instant *and* context-aware.

### ✨ Features

- **✨ AI conversion (Groq):** after you stop typing, the AI refines the result using context: vowel harmony, abbreviations and spelling.
  - `ymr ch ugiig yrn bl` ➔ `ямар ч үгийг ер нь бол`
- **🛟 Always works:** if the AI is unavailable or offline, the built-in engine keeps converting. The app never breaks.
- **🧠 Learns from you:** rate the result with 👍 / 👎. Edit a wrong answer, press 👍, and the app remembers your correction. Learned words go into a personal dictionary and the latest examples are sent to the AI as guidance.
- **🧩 Smart engine:** a chat-abbreviation dictionary, suffix detection (`ugiig` ➔ `ug` + `iig` ➔ `үгийг`), digraphs (`sh` ➔ `ш`, `ch` ➔ `ч`) and capitalization.
- **🔄 Two-way:** Latin ➔ Cyrillic and Cyrillic ➔ Latin.
- **💾 Auto-save & history:** your text is saved automatically, with the last 5 entries in history.
- **📄 Import / Export `.txt`** and a one-click **Paste / Clear / Copy**.
- **🌓 Clean, minimal UI:** light mode by default, dark mode on demand (your choice is remembered), English / Mongolian interface, responsive on mobile.
- **🔒 API key stays secret:** the Groq key lives only in Vercel environment variables and is used by a serverless function, never exposed in the browser.

### ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` | Convert with AI now |
| `Ctrl + K` | Clear |
| `Ctrl + S` | Export result as `.txt` |
| `Ctrl + O` | Import a `.txt` file |
| `Alt + C` | Copy result |
| `Alt + S` | Swap direction (Latin ↔ Cyrillic) |
| `Esc` | Close history |

On Mac, use `Cmd` instead of `Ctrl`.

### 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **AI:** [Groq API](https://console.groq.com) (`llama-3.3-70b-versatile`)
- **Backend:** Vercel Serverless Function (`api/ai.js`)
- **Hosting:** Vercel, deployed from GitHub

### 📁 Project Structure

```
├── index.html     # page markup
├── style.css      # minimal light/dark design
├── script.js      # rule-based engine + UI + AI + learning
└── api/
    └── ai.js      # serverless function that calls Groq (key stays server-side)
```

### 🚀 Getting Started

**Deploy your own (Vercel):**

1. Fork or clone this repository.
2. Create an API key at [console.groq.com](https://console.groq.com).
3. In [Vercel](https://vercel.com): **Add New → Project**, import the repository.
4. Under **Environment Variables** add `GROQ_API_KEY` = your key (select all environments).
5. Click **Deploy**.

**Run locally:**

```bash
git clone https://github.com/Khuleqsh/Latin-to-Cyrillic-MN.git
cd Latin-to-Cyrillic-MN
npm i -g vercel
echo "GROQ_API_KEY=your_key_here" > .env
vercel dev
```

Opening `index.html` directly also works, but only the built-in engine will run (no AI).

> ⚠️ Never commit your API key. `.env` is already listed in `.gitignore`.

### 🗺️ Roadmap

- [ ] Rate limiting for the AI endpoint
- [ ] Shared learning across all users (database + moderation)
- [ ] Voice input
- [ ] Installable PWA

---

## <a name="-монгол"></a> 🇲🇳 Монгол

Монгол хэлний латин (галиг) бичвэрийг кирилл рүү (мөн буцааж) шууд хөрвүүлдэг вэб апп. **Өөрийн дүрэмт хөдөлгүүр** болон **Groq AI** хоёрыг хослуулсан тул үр дүн нь хурдан бөгөөд утгыг ойлгосон байдаг.

### ✨ Боломжууд

- **✨ AI хөрвүүлэлт (Groq):** бичихээ болиход AI контекстоор нь эгшиг зохицол, товчлол, зөв бичгийг сайжруулна.
  - `ymr ch ugiig yrn bl` ➔ `ямар ч үгийг ер нь бол`
- **🛟 Үргэлж ажиллана:** AI ажиллахгүй эсвэл интернэтгүй үед суурь хөдөлгүүр маань хөрвүүлсээр байна. Апп хэзээ ч эвдрэхгүй.
- **🧠 Хэрэглэгчээс суралцана:** үр дүнг 👍 / 👎-аар үнэлнэ. Буруу хариуг засаад 👍 дарвал засварыг тань санана. Суралцсан үгс хувийн толь болж, сүүлийн жишээнүүд AI-д чиглүүлэг болон очно.
- **🧩 Ухаалаг хөдөлгүүр:** чатын товчлолын толь, дагавар таних (`ugiig` ➔ `ug` + `iig` ➔ `үгийг`), хос үсэг (`sh` ➔ `ш`, `ch` ➔ `ч`), том үсгийн мэдрэмж.
- **🔄 Хоёр чиглэлт:** Латин ➔ Кирилл болон Кирилл ➔ Латин.
- **💾 Автомат хадгалалт ба түүх:** текст автоматаар хадгалагдаж, сүүлийн 5 түүх харагдана.
- **📄 `.txt` оруулах / татах**, мөн Буулгах / Цэвэрлэх / Хуулах товчнууд.
- **🌓 Цэвэрхэн, энгийн дизайн:** анхдагчаар цагаан горим, хүсвэл хар горим (сонголтыг нь санана), Монгол / Англи интерфейс, утсан дээр зохицно.
- **🔒 API түлхүүр нууцлагдана:** Groq түлхүүр зөвхөн Vercel-ийн environment variable-д хадгалагдаж, серверийн функцээр ашиглагдана. Хөтөч дээр огт харагдахгүй.

### ⌨️ Гарын товчлолууд

| Товчлол | Үйлдэл |
|---|---|
| `Ctrl + Enter` | AI-аар шууд хөрвүүлэх |
| `Ctrl + K` | Цэвэрлэх |
| `Ctrl + S` | Үр дүнг `.txt` болгон татах |
| `Ctrl + O` | `.txt` файл оруулах |
| `Alt + C` | Үр дүнг хуулах |
| `Alt + S` | Чиглэл солих (Латин ↔ Кирилл) |
| `Esc` | Түүхийг хаах |

Mac дээр `Ctrl`-ын оронд `Cmd` ашиглана.

### 🛠️ Ашигласан технологи

- **Frontend:** HTML5, CSS3, цэвэр JavaScript (фрэймворкгүй)
- **AI:** [Groq API](https://console.groq.com) (`llama-3.3-70b-versatile`)
- **Backend:** Vercel Serverless Function (`api/ai.js`)
- **Hosting:** Vercel (GitHub-аас deploy хийдэг)

### 📁 Төслийн бүтэц

```
├── index.html     # хуудасны бүтэц
├── style.css      # цагаан/хар горимтой энгийн дизайн
├── script.js      # дүрэмт хөдөлгүүр + UI + AI + суралцах
└── api/
    └── ai.js      # Groq-г дууддаг серверийн функц (түлхүүр сервер дээр үлдэнэ)
```

### 🚀 Хэрхэн ажиллуулах вэ?

**Өөрөө Vercel дээр deploy хийх:**

1. Repository-г fork эсвэл clone хийнэ.
2. [console.groq.com](https://console.groq.com) дээр API түлхүүр үүсгэнэ.
3. [Vercel](https://vercel.com) дээр **Add New → Project** дарж repository-гоо import хийнэ.
4. **Environment Variables** хэсэгт `GROQ_API_KEY` нэрээр түлхүүрээ нэмнэ (бүх environment-ийг сонгоно).
5. **Deploy** дарна.

**Компьютер дээрээ ажиллуулах:**

```bash
git clone https://github.com/Khuleqsh/Latin-to-Cyrillic-MN.git
cd Latin-to-Cyrillic-MN
npm i -g vercel
echo "GROQ_API_KEY=таны_түлхүүр" > .env
vercel dev
```

`index.html`-ийг шууд нээж ч болно. Гэхдээ зөвхөн суурь хөдөлгүүр ажиллана (AI байхгүй).

> ⚠️ API түлхүүрээ хэзээ ч GitHub руу commit хийж болохгүй. `.env` нь `.gitignore`-д аль хэдийн орсон.

### 🗺️ Цаашдын төлөвлөгөө

- [ ] AI хандалтад rate limit тавих
- [ ] Бүх хэрэглэгчээс хамтдаа суралцах (өгөгдлийн сан + шүүлт)
- [ ] Дуут оруулга
- [ ] PWA болгож суулгах боломж

---

Made with ♥ by **KhuleqSH**
