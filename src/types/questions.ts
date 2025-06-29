export type Question = {
  country: string;
  display_name: string;
  file: string;
  code: string; // ISOコードを追加
};
export type QuizResult = {
  questions: Question[];
  answers: Question[];
  score: number;
};
