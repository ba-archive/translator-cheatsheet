import { Dictionary } from "@/types/Dictionary";
import { distance } from "fastest-levenshtein";
import { match } from "pinyin-pro";

const specialCharacters = new RegExp(
  /[，。！“”/《》？：；「」{}｜\\"$&+,:;=?@#|'<>.^*()（）%!~～`_[\]\-\s]/g
);

export function similarity(s1: string | undefined | null, s2: string | undefined | null): number {
  // @ts-ignore
  if ([s1, s2].some(s => [undefined, null].includes(s))) return 0;
  // @ts-ignore
  return 1 - distance(s1, s2) / Math.max(s1.length, s2.length);
}

export function isPossiblePinyin(searchString: string, candidate: string) {
  if (!candidate) return false;
  const candidateWithoutSpecialCharacters = candidate.replaceAll(
    specialCharacters,
    ""
  );
  // only allow pinyin search if the candidate is in Chinese
  if (
    candidate.match(/^[\u4e00-\u9fa5]+$/) &&
    searchString.match(/^[a-zA-Z]+$/)
  ) {
    const targetPinyin = match(
      candidateWithoutSpecialCharacters,
      searchString,
      { precision: "any" }
    );
    if (null !== targetPinyin) {
      return true;
    }
  }
  return false;
}

export function isPossibleCandidate(
  searchString: string,
  candidate: Dictionary
) {
  const candidateWithoutSpecialCharacters = {
    ...candidate,
    TextCn: candidate.TextCn?.replaceAll(specialCharacters, "").toLocaleLowerCase(),
    TextJp: candidate.TextJp?.replaceAll(specialCharacters, "").toLocaleLowerCase(),
  }
  if (
    similarity(searchString, candidateWithoutSpecialCharacters.TextCn) > 0.66 ||
    searchString.includes(candidateWithoutSpecialCharacters.TextCn) ||
    candidateWithoutSpecialCharacters.TextCn?.includes(searchString) ||
    candidateWithoutSpecialCharacters.TextCn?.startsWith(searchString) ||
    candidateWithoutSpecialCharacters.TextCn?.endsWith(searchString) ||
    isPossiblePinyin(searchString, candidateWithoutSpecialCharacters.TextCn) ||
    similarity(searchString, candidateWithoutSpecialCharacters.TextJp) > 0.66 ||
    searchString.includes(candidateWithoutSpecialCharacters.TextJp) ||
    candidateWithoutSpecialCharacters.TextJp?.includes(searchString) ||
    candidateWithoutSpecialCharacters.TextJp?.startsWith(searchString) ||
    candidateWithoutSpecialCharacters.TextJp?.endsWith(searchString)
  ) {
    return true;
  }
  return false;
}

export function getPossibleCandidate(
  searchString: string,
  candidateList: Dictionary[]
) {
  if (searchString === "") {
    return candidateList;
  }
  const possibleCandidates = candidateList.filter(candidate => {
    return isPossibleCandidate(searchString, candidate);
  });
  return possibleCandidates;
}
