// 1. Бүтэн үгийн товчлолууд (Shortcuts)
const wordShortcuts = {
    "bn": "байна", "bna": "байна",
    "sn": "сайн", "snu": "сайн уу", "bnu": "байна уу",
    "zgr": "зүгээр", "twan": "тайван", "taiw": "тайван",
    "bhgui": "байхгүй", "bhgvi": "байхгүй", "bgui": "байхгүй",
    "bga": "байгаа", "bgaa": "байгаа",
    "mdeku": "мэдэхгүй", "mdeq": "мэдэхгүй", "mdq": "мэдэхгүй",
    "ndd": "надад", "cnd": "чамд", "cmd": "чамд",
    "yhw": "яах вэ", "yahw": "яах вэ",
    "za": "за", "thh": "тийм", "mhn": "мхн", "xxa": "хаха", "hh": "хаха",
    "ugu": "үгүй", "ugui": "үгүй", "ugv": "үгүй", "ugvi": "үгүй",
    "ochood": "очоод", "ircheed": "ирчээд"
};

// 2. Олон үсэгт галиг
const multiChars = {
    "sh": "ш", "ch": "ч", "ts": "ц", "kh": "х", "ya": "я", "yu": "ю",
    "ye": "е", "yo": "ё", "ai": "ай", "ei": "эй", "oi": "ой", "ui": "уй"
};

// 3. Дан үсэгт галиг
const singleChars = {
    "a": "а", "b": "б", "v": "в", "w": "в", "g": "г", "d": "д",
    "e": "э", "j": "ж", "z": "з", "i": "и", "k": "к", "l": "л",
    "m": "м", "n": "н", "o": "о", "p": "п", "r": "р", "s": "с",
    "t": "т", "u": "у", "f": "ф", "h": "х", "c": "ц", "y": "й",
    "x": "х", "q": "к", "ö": "ө", "ü": "ү"
};

function convertLatinToCyrillic(text) {
    // Үгсийг салгах (цэг, таслал, зай зэргийг хадгалж үлдэхийн тулд Regex ашиглана)
    let words = text.split(/(\b|\s+)/);
    
    let result = words.map(word => {
        // Зөвхөн үсгээс бүрдсэн үгсийг л шалгана
        if (!/^[a-zA-Z]+$/.test(word)) return word;
        
        let lowerWord = word.toLowerCase();
        let isCapitalized = word[0] === word[0].toUpperCase();
        
        // 1. Товчлол шалгах
        if (wordShortcuts[lowerWord]) {
            let convertedWord = wordShortcuts[lowerWord];
            return isCapitalized ? convertedWord.charAt(0).toUpperCase() + convertedWord.slice(1) : convertedWord;
        }

        // 2. Хэрэв товчлол биш бол үсгүүдийг хөрвүүлэх
        let outWord = lowerWord;
        
        // Хос үсгүүдийг солих
        for (const [lat, cyr] of Object.entries(multiChars)) {
            outWord = outWord.split(lat).join(cyr);
        }
        
        // Дан үсгүүдийг солих
        for (const [lat, cyr] of Object.entries(singleChars)) {
            outWord = outWord.split(lat).join(cyr);
        }

        return isCapitalized ? outWord.charAt(0).toUpperCase() + outWord.slice(1) : outWord;
    });

    return result.join('');
}

// Үйлдэл танигч (Event Listener)
const latinInput = document.getElementById('latinInput');
const cyrillicOutput = document.getElementById('cyrillicOutput');

latinInput.addEventListener('input', function() {
    cyrillicOutput.value = convertLatinToCyrillic(this.value);
});
