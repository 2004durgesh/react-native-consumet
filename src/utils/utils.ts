import { compareTwoStrings } from 'string-similarity';
// import sharp from 'sharp';
import { load } from 'cheerio';
// import * as blurhash from 'blurhash';

export const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
export const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const ANIFY_URL = 'https://anify.eltik.cc';

export const splitAuthor = (authors: string) => {
  const res: string[] = [];
  let eater = '';
  for (let i = 0; i < authors.length; i++) {
    if (authors[i] === ' ' && (authors[i - 1] === ',' || authors[i - 1] === ';')) {
      continue;
    }
    if (authors[i] === ',' || authors[i] === ';') {
      res.push(eater.trim());
      eater = '';
      continue;
    }
    eater += authors[i];
  }
  res.push(eater);
  return res;
};

export const floorID = (id: string) => {
  let imp = '';
  for (let i = 0; i < id?.length - 3; i++) {
    imp += id[i];
  }
  const idV = parseInt(imp);
  return idV * 1000;
};

export const formatTitle = (title: string) => {
  const result = title.replace(/[0-9]/g, '');
  return result.trim();
};

export const genElement = (s: string, e: string) => {
  if (s === '') return;
  const $ = load(e);
  let i = 0;
  let str = '';
  let el = $();
  for (; i < s.length; i++) {
    if (s[i] === ' ') {
      el = $(str);
      str = '';
      i++;
      break;
    }
    str += s[i];
  }
  for (; i < s.length; i++) {
    if (s[i] === ' ') {
      el = $(el).children(str);
      str = '';
      continue;
    }
    str += s[i];
  }
  el = $(el).children(str);
  return el;
};

export const range = ({ from = 0, to = 0, step = 1, length = Math.ceil((to - from) / step) }) =>
  Array.from({ length }, (_, i) => from + i * step);

export const capitalizeFirstLetter = (s: string) => s?.charAt(0).toUpperCase() + s.slice(1);

export const getDays = (day1: string, day2: string) => {
  const day1Index = days.indexOf(capitalizeFirstLetter(day1)) - 1;
  const day2Index = days.indexOf(capitalizeFirstLetter(day2)) - 1;
  const now = new Date();
  const day1Date = new Date();
  const day2Date = new Date();
  day1Date.setDate(now.getDate() + ((day1Index + 7 - now.getDay()) % 7));
  day2Date.setDate(now.getDate() + ((day2Index + 7 - now.getDay()) % 7));
  day1Date.setHours(0, 0, 0, 0);
  day2Date.setHours(0, 0, 0, 0);
  return [day1Date.getTime() / 1000, day2Date.getTime() / 1000];
};

export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export function convertDuration(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `PT${hours}H${minutes}M${seconds}S`;
}

export const calculateStringSimilarity = (first: string, second: string): number => {
  first = first.replace(/\s+/g, '');
  second = second.replace(/\s+/g, '');

  if (first === second) return 1; // identical or empty
  if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

  const firstBigrams = new Map();
  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

    firstBigrams.set(bigram, count);
  }

  let intersectionSize = 0;
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }

  return (2.0 * intersectionSize) / (first.length + second.length - 2);
};

export const substringAfter = (str: string, toFind: string) => {
  const index = str.indexOf(toFind);
  return index === -1 ? '' : str.substring(index + toFind.length);
};

export const substringBefore = (str: string, toFind: string) => {
  const index = str.indexOf(toFind);
  return index === -1 ? '' : str.substring(0, index);
};

export const substringAfterLast = (str: string, toFind: string) => {
  const index = str.lastIndexOf(toFind);
  return index === -1 ? '' : str.substring(index + toFind.length);
};

export const substringBeforeLast = (str: string, toFind: string) => {
  const index = str.lastIndexOf(toFind);
  return index === -1 ? '' : str.substring(0, index);
};

// const generateHash = async (url: string) => {
//   let returnedBuffer;

//   const response = await fetch(url);
//   const arrayBuffer = await response.arrayBuffer();
//   returnedBuffer = Buffer.from(arrayBuffer);

//   // const { info, data } = await sharp(returnedBuffer).ensureAlpha().raw().toBuffer({
//   //   resolveWithObject: true,
//   // });

//   return blurhash.encode(new Uint8ClampedArray(data), info.width, info.height, 4, 3);
// };

export const getHashFromImage = (url: string) => {
  if (url?.length === 0) {
    return '';
  } else {
    // let hash!: string;
    // generateHash(url).then(hashKey => (hash = hashKey));
    return 'hash';
  }
};

// Function to find similar titles
export function findSimilarTitles(inputTitle: string, titles: any[]): any[] {
  const results: (any & { similarity: number })[] = [];

  titles?.forEach((titleObj: any) => {
    const title = cleanTitle(
      titleObj?.title
        ?.toLowerCase()
        ?.replace(/\([^\)]*\)/g, '')
        .trim() || ''
    );

    // Calculate similarity score between inputTitle and title
    const similarity = compareTwoStrings(cleanTitle(inputTitle?.toLowerCase() || ''), title);

    if (similarity > 0.6) {
      results.push({ ...titleObj, similarity });
    }
  });

  const isSubAvailable = results.some((result) => result.episodes && result.episodes.sub > 0);

  // If episodes.sub is available, sort the results
  if (isSubAvailable) {
    return results.sort((a, b) => {
      // First sort by similarity in descending order
      if (b.similarity !== a.similarity) {
        return b.similarity - a.similarity;
      }
      // If similarity is the same, sort by episodes.sub in descending order
      return (b.episodes?.sub || 0) - (a.episodes?.sub || 0);
    });
  }

  // If episodes.sub is not available, return the original list
  return results.sort((a, b) => b.similarity - a.similarity);
}

// Function to convert Roman numerals to Arabic numbers
function romanToArabic(roman: string): number {
  const romanMap: Record<string, number> = {
    i: 1,
    v: 5,
    x: 10,
    l: 50,
    c: 100,
    d: 500,
    m: 1000,
  };

  roman = roman.toLowerCase();
  let result = 0;

  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]!]!;
    const next = romanMap[roman[i + 1]!];

    if (next && current < next) {
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }

  return result;
}

export function cleanTitle(title: string | undefined | null): string {
  if (!title) return '';

  return transformSpecificVariations(
    removeSpecialChars(
      title
        .replaceAll(/[^A-Za-z0-9!@#$%^&*() ]/gim, ' ')
        .replaceAll(/(th|rd|nd|st) (Season|season)/gim, '')
        .replaceAll(/\([^\(]*\)$/gim, '')
        .replaceAll('season', '')
        .replaceAll(/\b(IX|IV|V?I{0,3})\b/gi, (match) => romanToArabic(match).toString())
        .replaceAll('  ', ' ')
        .replaceAll('"', '')
        .trimEnd()
    )
  );
}

export function removeSpecialChars(title: string | undefined | null): string {
  if (!title) return '';

  return title
    .replaceAll(/[^A-Za-z0-9!@#$%^&*()\-= ]/gim, ' ')
    .replaceAll(/[^A-Za-z0-9\-= ]/gim, '')
    .replaceAll('  ', ' ');
}

export function transformSpecificVariations(title: string | undefined | null): string {
  if (!title) return '';

  return title.replaceAll('yuu', 'yu').replaceAll(' ou', ' oh');
}

export function sanitizeTitle(title: string): string {
  let resTitle = title.replace(/ *(\(dub\)|\(sub\)|\(uncensored\)|\(uncut\)|\(subbed\)|\(dubbed\))/i, '');
  resTitle = resTitle.replace(/ *\([^)]+audio\)/i, '');
  resTitle = resTitle.replace(/ BD( |$)/i, '');
  resTitle = resTitle.replace(/\(TV\)/g, '');
  resTitle = resTitle.trim();
  resTitle = resTitle.substring(0, 99); // truncate
  return resTitle;
}

export function stringSearch(string: string, pattern: string): number {
  let count = 0;
  string = string.toLowerCase();
  pattern = pattern.toLowerCase();
  string = string.replace(/[^a-zA-Z0-9 -]/g, '');
  pattern = pattern.replace(/[^a-zA-Z0-9 -]/g, '');

  for (let i = 0; i < string.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (pattern[j] !== string[i + j]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  return count;
}

export function parseUrl(url: string): {
  href: string;
  origin: string;
  pathname: string;
  hostname: string;
  search: string;
  hash: string;
} {
  // Simple URL parser for React Native
  try {
    const match = url.match(/^(https?:\/\/[^\/]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/);
    if (!match) throw new Error(`Invalid URL: ${url}`);

    const origin = match[1] || '';
    const pathname = match[2] || '/';
    const search = match[3] || '';
    const hash = match[4] || '';

    return {
      href: url,
      origin,
      pathname,
      hostname: origin.replace(/^https?:\/\//, ''),
      search,
      hash,
    };
  } catch (e) {
    console.error(`Error parsing URL: ${url}`, e);
    // Return a minimal object with href to prevent crashes
    return { href: url, origin: '', pathname: '', hostname: '', search: '', hash: '' };
  }
}
