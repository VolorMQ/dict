function shuffleVerb(sentence) {
  const words = sentence.split(" ");
  for (let i = 0; i < words.length - 1; i++) {
    if (isVerb(words[i])) {
      const copy = [...words];
      [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
      return copy.join(" ");
    }
  }

  // если не нашли глагол — переставляем случайные два слова
  if (words.length >= 2) {
    const copy = [...words];
    const idx = Math.floor(Math.random() * (words.length - 1));
    [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
    return copy.join(" ");
  }
  return null;
}


function removeArticle(sentence) {
  if (!/\b(en|et)\b/.test(sentence)) return null;
  return sentence.replace(/\b(en|et)\b\s?/g, "");
}

function wordOrderError(sentence) {
  const words = sentence.split(" ");
  const index = words.findIndex(w => ["nu", "ikke", "også"].includes(w));
  if (index > 1) {
    const copy = [...words];
    const temp = copy.splice(index, 1)[0];
    copy.splice(1, 0, temp);
    return copy.join(" ");
  }
  return null;
}

const wrongVerbs = {
  "gå": ["gik", "gået"],
  "spise": ["spiste", "spist"],
  "have": ["havde", "haft"],
  "læse": ["læste", "læst"],
  "købe": ["købte", "købt"],
  "se": ["så", "set"],
  "tale": ["talte", "talt"],
  "skrive": ["skrev", "skrevet"],
  "drikke": ["drak", "drukket"],
  "sove": ["sov", "sovet"],
  "komme": ["kom", "kommet"],
  "finde": ["fandt", "fundet"],
  "tage": ["tog", "taget"],
  "starte": ["startede", "startet"],
  "slutte": ["sluttede", "sluttet"],
  "spille": ["spillede", "spillet"],
  "synge": ["sang", "sunget"],
  "arbejde": ["arbejdede", "arbejdet"],
  "køre": ["kørte", "kørt"],
  "bo": ["boede", "boet"],
  "levere": ["leverede", "leveret"],
  "forstå": ["forstod", "forstået"],
  "forklare": ["forklarede", "forklaret"],
  "sige": ["sagde", "sagt"],
  "give": ["gav", "givet"],
  "spørge": ["spurgte", "spurt"],
  "besøge": ["besøgte", "besøgt"]
};

function wrongVerb(sentence) {
  const words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    if (wrongVerbs[word]) {
      const forms = wrongVerbs[word];
      const wrongForm = forms[Math.floor(Math.random() * forms.length)];
      const copy = [...words];
      copy[i] = wrongForm;
      return copy.join(" ");
    }
  }
  return null;
}


// 🔹 Простейший детектор глаголов
function isVerb(word) {
  const w = word.toLowerCase();
  // 🔹 проверка по словарю
  if (wrongVerbs[w]) return true;

  // 🔹 проверка по окончанию
  return w.endsWith("r") || w.endsWith("er");
}

function swapRandom(sentence) {
  const words = sentence.split(" ");
  if (words.length < 2) return sentence;
  const idx = Math.floor(Math.random() * (words.length - 1));
  const copy = [...words];
  [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
  return copy.join(" ");
}


// 🔹 Генерация 3 разных «неправильных» вариантов + 1 правильный
function generateOptions(correct) {
  const variants = new Set();
  variants.add(correct);

  const generators = [shuffleVerb, removeArticle, wordOrderError, wrongVerb];

  let safety = 0;

  while (variants.size < 4 && safety < 50) {
    safety++;
    // случайный генератор
    const gen = generators[Math.floor(Math.random() * generators.length)];
    let result = gen(correct);

    // если генератор вернул null или совпадает с correct → делаем резервную перестановку
    if (!result || result === correct) {
      result = swapRandom(correct);
    }

    if (!variants.has(result)) {
      variants.add(result);
    }
  }

  return shuffleArray([...variants]);
}


function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
