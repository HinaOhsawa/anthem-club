import type { Question } from "../types/questions";

// 配列をシャッフル
export function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// 出題リストを生成
export function generateQuestionSet(
  data: Question[],
  total: number
): Question[] {
  return shuffleArray(data).slice(0, total);
}

// 選択肢を生成
export function generateOptions(
  correct: Question,
  all: Question[],
  numOptions = 4
): Question[] {
  const wrong = all.filter((c) => c.country !== correct.country);
  const wrongOptions = shuffleArray(wrong).slice(0, numOptions - 1);
  return shuffleArray([...wrongOptions, correct]);
}
