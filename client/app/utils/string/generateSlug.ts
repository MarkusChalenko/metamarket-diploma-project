const translit = (str: string): string => {
  const ruLang =
    "А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я".split(
      "-"
    );
  const enLang =
    "A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya".split(
      "-"
    );
  let replaceSymbolsResponse = "";
  for (let i = 0; i < str.length; i++) {
    let ruString = str.charAt(i);
    let symbol = ruLang.indexOf(ruString);
    if (symbol >= 0) {
      replaceSymbolsResponse += enLang[symbol];
    } else {
      replaceSymbolsResponse += ruString;
    }
  }
  return replaceSymbolsResponse;
};

export const generateSlug = (str: string): string => {
  let url: string = str.replace(/[\s]+/gi, "-");
  url = translit(url);

  url = url
    .replace(/[^0-9a-z_\-]+/gi, "")
    .replace("---", "-")
    .replace("--", "-")
    .toLowerCase();
  return url;
};
