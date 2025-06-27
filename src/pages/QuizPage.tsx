import { useState, useEffect } from "react";
import AnthemPlayer from "../components/AnthemPlayer";
import type { Question } from "../utils/quiz";
import { generateOptions, generateQuestionSet } from "../utils/quiz";

import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const TOTAL_QUESTIONS = 3; // 問題数

export default function QuizPage() {
  const [allCountries, setAllCountries] = useState<Question[]>([]); // 全ての国のデータ
  const [questions, setQuestions] = useState<Question[]>([]); // 出題リスト
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 現在の問題のインデックス
  const [options, setOptions] = useState<Question[]>([]); // 選択肢リスト

  const [selected, setSelected] = useState<string | null>(null); // 選択された国
  const [score, setScore] = useState<number>(0); // スコア
  const [selectedAnswers, setSelectedAnswers] = useState<Question[]>([]);
  const navigate = useNavigate();
  const { setQuizResult } = useQuiz();

  //---------------------------------------------------
  // JSONファイルから読み込み
  //---------------------------------------------------

  useEffect(() => {
    fetch("/data/country.json")
      .then((res) => res.json())
      .then((data: Question[]) => {
        setAllCountries(data);
        const selectedQuestions = generateQuestionSet(data, TOTAL_QUESTIONS);
        setQuestions(selectedQuestions);
        setOptions(generateOptions(selectedQuestions[currentIndex], data));
      });
  }, []);

  if (questions.length === 0) return <div>Loading...</div>;
  const correct = questions[currentIndex];

  //---------------------------------------------------
  // 選択肢を選んだときの処理
  //---------------------------------------------------
  const handleAnswer = (country: string) => {
    setSelected(country);

    const selectedOption = options.find((opt) => opt.country === country);
    if (selectedOption) {
      setSelectedAnswers((prev) => [...prev, selectedOption]);
    }

    if (country === correct.country) {
      setScore((prev) => prev + 1);
    }
  };

  //---------------------------------------------------
  // 次の問題へ進む処理
  //---------------------------------------------------
  const handleNext = () => {
    if (currentIndex + 1 < TOTAL_QUESTIONS) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      const nextCorrect = questions[currentIndex + 1];
      setOptions(generateOptions(nextCorrect, allCountries));
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setQuizResult({
      questions,
      answers: selectedAnswers,
      score,
    });
    navigate("/result");
  };
  //---------------------------------------------------
  if (!correct) return <div>Loading...</div>;

  return (
    <main>
      <h1 className="text-2xl mb-4">国歌当てクイズ</h1>
      <p className="text-xl">第 {currentIndex + 1} 問</p>
      <AnthemPlayer file={correct.file} playing={true} />

      <div className="mt-10">
        {options.map((opt) => (
          <button
            key={opt.country}
            onClick={() => handleAnswer(opt.country)}
            className={`answer-button
              ${
                selected &&
                (opt.country === selected
                  ? "cursor-auto bg-stone-600"
                  : "cursor-auto hover:bg-stone-900")
              }`}
            disabled={selected !== null}
          >
            {opt.display_name}
          </button>
        ))}
      </div>

      {selected && (
        <>
          <div
            className={`mt-4 text-xl font-semibold
          ${selected === correct.country ? "text-green-600" : "text-red-600"}`}
          >
            {selected === correct.country ? `正解！` : `不正解！`}
          </div>
          <p className="mt-4 text-xl font-semibold">
            答えは「{correct.display_name}」でした
          </p>
        </>
      )}

      {selected && (
        <button onClick={handleNext} className="mt-6">
          次の問題へ ＞
        </button>
      )}
    </main>
  );
}
