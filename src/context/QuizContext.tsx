import { createContext, useContext, useState } from "react";

export type Question = {
  country: string;
  display_name: string;
  file: string;
};

type QuizResult = {
  questions: Question[];
  answers: Question[];
  score: number;
};

const QuizContext = createContext<{
  quizResult: QuizResult;
  setQuizResult: (result: QuizResult) => void;
} | null>(null);

// クイズ結果を共有するためのラッパー
export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [quizResult, setQuizResult] = useState<QuizResult>({
    questions: [],
    answers: [],
    score: 0,
  });

  return (
    <QuizContext.Provider value={{ quizResult, setQuizResult }}>
      {children}
    </QuizContext.Provider>
  );
};

// クイズの状態を取得するためのカスタムフック
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used inside QuizProvider");
  return context;
};
