Markdown
# 🇲🇳 Smart Latin-Cyrillic Converter | Ухаалаг Латин-Кирилл Хөрвүүлэгч

![UI Preview](https://img.shields.io/badge/UI-Glassmorphism-blue?style=flat-square)
![Mode](https://img.shields.io/badge/Mode-Dark%2FLight-lightgrey?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-yellow?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

🌍 **Read in:** [English](#-english) | [Монгол хэлээр унших](#-монгол)

🚀 **Live Demo:** [Experience the Smart Converter Here](https://khuleqsh.github.io/Latin-to-Cyrillic-MN/)

---

## <a name="-english"></a> 🇬🇧 English

A lightning-fast, offline-capable web application that automatically converts Mongolian Latin (Galig) text into Cyrillic script (and vice versa) in real-time. 

Unlike standard translators, this tool is powered by a custom **NLP (Natural Language Processing)** engine built directly into the browser. It intelligently predicts internet chat slang, expands abbreviations, and correctly applies suffix and vowel harmony rules—all without relying on external APIs.

### ✨ Key Features

- **🧠 Smart Chat NLP Engine:** Automatically recognizes and expands common Mongolian internet abbreviations. 
  - *Example:* `ymr ch ugiig yrn bl` ➔ `ямар ч үгийг ер нь бол`
- **🧩 Advanced Morphology:** Intelligently separates root words from suffixes to apply accurate vowel harmony. 
  - *Example:* `ugiig` ➔ `ug` + `iig` ➔ `үгийг`
- **🔄 Two-Way Real-Time Conversion:** Instant translation as you type (Latin ➔ Cyrillic & Cyrillic ➔ Latin).
- **🔠 Smart Capitalization & Digraphs:** Accurately converts multi-character Latin inputs (`sh` ➔ `ш`, `ch` ➔ `ч`) while preserving correct sentence and name capitalization.
- **💾 Auto-Save & History:** Never lose your work. The app automatically saves your current progress and maintains a history of your last 5 conversions.
- **📄 Import & Export .txt:** Seamlessly upload large `.txt` files for bulk conversion and instantly download the result.
- **🌓 Modern Glassmorphism UI:** A beautiful, Apple-inspired interface featuring Dark/Light modes and a bilingual (English/Mongolian) UI.

### ⌨️ Keyboard Shortcuts

Built for power users and maximum productivity:
- `Ctrl + Shift + S` : Swap conversion direction (Latin ↔ Cyrillic)
- `Ctrl + Shift + C` : Copy the converted output to clipboard

### 🛠️ Tech Stack

Built with pure, lightweight web technologies. No heavy frameworks or external libraries required.
- **HTML5:** Semantic web structure
- **CSS3:** Modern styling, Glassmorphism, and responsive design
- **Vanilla JavaScript (ES6):** Core NLP algorithms, conversion logic, and DOM manipulation

### 🚀 Getting Started

1. Clone the repository to your local machine:
   ```bash
   git clone [https://github.com/Khuleqsh/Latin-to-Cyrillic-MN.git](https://github.com/Khuleqsh/Latin-to-Cyrillic-MN.git)
Open the cloned folder.

Simply double-click index.html to open it in any modern web browser.

Enjoy 100% offline, instant conversions!

 🇲🇳 Монгол
Шууд туршиж үзэх: Энд дарж хөрвүүлэгч рүү орно уу

Монгол хэлний галиг (латин) болон кирилл үсгийн хооронд бодит хугацаанд автоматаар хөрвүүлэх дэвшилтэт, вэб суурьтай ухаалаг хөрвүүлэгч.

Энэхүү төсөл нь гадны API ашиглахгүйгээр хөтөч дээр шууд ажиллах бөгөөд хүмүүсийн интернэт орчинд түгээмэл ашигладаг чатын товчлол, үгсийн үндэс, дагавар нөхцөлийг автоматаар таньж, эгшиг зохицуулан хөрвүүлэх Ухаалаг Таамаглагч (NLP) хөдөлгүүртэйгээрээ онцлог юм.

✨ Онцлох боломжууд
🧠 Ухаалаг чатын товчлол (NLP): Хүмүүсийн их бичдэг товчлолуудыг автоматаар бүтэн үг болгоно.

Жишээ нь: ymr ch ugiig yrn bl ➔ ямар ч үгийг ер нь бол

🧩 Дагавар, нөхцөл таних алгоритм: Үгийн үндэс болон дагаврыг салгаж, эгшиг зохицох дүрмээр алдаагүй хөрвүүлнэ.

Жишээ нь: ugiig ➔ ug + iig ➔ үгийг

🔄 Хоёр чиглэлт хөрвүүлэлт: Бичихтэй зэрэгцэн Латинаас Кирилл рүү, мөн Кирилээс Латин руу шууд хөрвүүлнэ.

🔠 Том үсэг & Хос үсгийн мэдрэмж: sh ➔ ш, ch ➔ ч зэрэг хос үсгүүдийг танихаас гадна, хүний нэр, өгүүлбэрийн эхний үсгийг алдаагүй томоор бичнэ.

💾 Түүх болон Автомат хадгалалт: Хуудсаа санамсаргүй шинэчлэхэд текст устгахаас сэргийлж автоматаар хадгалах бөгөөд сүүлийн 5 түүхээ харах боломжтой.

📄 Файл оруулах / Татах: Урт хэмжээний текст, нийтлэл хөрвүүлэхийн тулд .txt файл оруулж, үр дүнгээ буцаагаад файл хэлбэрээр татаж авна.

🌓 Dark / Light горим: Apple-ийн Glassmorphism загварын орчин үеийн, нүдэнд ээлтэй дизайн. Англи болон Монгол хэлний сонголттой.

⌨️ Гарын товчлолууд (Shortcuts)
Хулгана ашиглахгүйгээр хурдан үйлдэл хийх:

Ctrl + Shift + S : Хөрвүүлэх чиглэлийг солих

Ctrl + Shift + C : Хөрвүүлсэн үр дүнг хуулах

🛠️ Ашигласан технологи
Ямар нэгэн нэмэлт сан, фрэймворк шаардахгүй цэвэр код (Vanilla):

HTML5: Вэб хуудасны бүтэц

CSS3: Өнгө үзэмж, Glassmorphism дизайн

JavaScript (ES6): Хөрвүүлэх алгоритм, NLP үйлдэл танигч болон UI логик

🚀 Хэрхэн ажиллуулах вэ?
Төслийг өөрийн компьютер руу татаж авах:

Bash
git clone [https://github.com/Khuleqsh/Latin-to-Cyrillic-MN.git](https://github.com/Khuleqsh/Latin-to-Cyrillic-MN.git)
Татаж авсан хавтас руугаа орно.

index.html файлыг дурын веб хөтөч дээрээ (Chrome, Safari, Edge г.м) нээгээд шууд ашиглаж эхэлнэ. (Интернэтгүй үед ч бүрэн ажиллана!)
