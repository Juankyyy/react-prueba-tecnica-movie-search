const WORD_TRANSLATIONS = {
  capitulo: "chapter",
  capitulos: "chapters",
  parte: "part",
  temporada: "season",
  serie: "series",
  pelicula: "movie",
};

const NUMBER_TO_WORD = {
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
};

const NUMBER_TO_ROMAN = {
  "1": "i",
  "2": "ii",
  "3": "iii",
  "4": "iv",
  "5": "v",
  "6": "vi",
  "7": "vii",
  "8": "viii",
  "9": "ix",
  "10": "x",
};

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const replaceWords = (value) =>
  value.replace(/\b[a-z]+\b/g, (word) => WORD_TRANSLATIONS[word] ?? word);

const replaceNumbers = (value, map) =>
  value.replace(/\b(\d{1,2})\b/g, (digits) => map[digits] ?? digits);

const buildSequelVariants = (value) => {
  const match = value.match(/^(.*)\s(\d{1,2})$/);
  if (!match) return [];

  const title = match[1].trim();
  const number = match[2];
  const numberWord = NUMBER_TO_WORD[number];
  const numberRoman = NUMBER_TO_ROMAN[number];

  if (!numberWord) return [];

  const variants = [
    `${title} chapter ${numberWord}`,
    `${title} part ${numberWord}`,
    `${title} ${numberWord}`,
  ];

  if (numberRoman) {
    variants.push(`${title} ${numberRoman}`);
  }

  return variants;
};

const isShortNumericSequelQuery = (value) => {
  const normalized = normalizeText(value);
  const match = normalized.match(/^(.*)\s(\d{1,2})$/);

  if (!match) return false;

  const titleWithoutSpaces = match[1].replace(/\s+/g, "");
  return titleWithoutSpaces.length > 0 && titleWithoutSpaces.length <= 3;
};

export const buildTooManyResultsVariants = (query) => {
  const base = query.replace(/\s+/g, " ").trim();
  const normalized = normalizeText(base);

  if (!normalized) return [];

  const translated = replaceWords(normalized);
  const words = translated.split(" ");
  const isShortSingleWord = words.length === 1 && words[0].length <= 4;

  if (!isShortSingleWord) return [];

  return [
    ...new Set([
      `${translated} chapter two`,
      `${translated} chapter 2`,
      `${translated} two`,
      `${translated} 2`,
    ]),
  ];
};

export const buildQueryVariants = (query) => {
  const base = query.replace(/\s+/g, " ").trim();
  const normalized = normalizeText(base);
  const translated = replaceWords(normalized);
  const translatedWithWords = replaceNumbers(translated, NUMBER_TO_WORD);
  const translatedWithRoman = replaceNumbers(translated, NUMBER_TO_ROMAN);

  const sequelPriorityVariants = [
    ...buildSequelVariants(base),
    ...buildSequelVariants(translated),
    ...buildSequelVariants(translatedWithWords),
  ];

  const preferSequelVariantsFirst = isShortNumericSequelQuery(base);
  const orderedVariants = preferSequelVariantsFirst
    ? [
        ...sequelPriorityVariants,
        base,
        normalized,
        translated,
        translatedWithWords,
        translatedWithRoman,
      ]
    : [
        base,
        normalized,
        translated,
        translatedWithWords,
        translatedWithRoman,
        ...sequelPriorityVariants,
      ];

  return [
    ...new Set([
      ...orderedVariants,
    ]),
  ]
    .filter((value) => value.length > 0)
    .slice(0, 12);
};
