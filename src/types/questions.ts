export type Question = {
  country: string;
  display_name: string;
  file: string;
  code: string; // 国コード
  region: string; // 地域名
  g7: boolean; // G7国かどうか
};
export type QuizResult = {
  questions: Question[];
  answers: Question[];
  score: number;
};
