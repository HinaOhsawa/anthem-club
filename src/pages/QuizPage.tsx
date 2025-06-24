import { useState, useEffect } from "react";
import AnthemPlayer from "../components/AnthemPlayer";
import type { Question } from "../utils/quiz";
import { generateOptions, generateQuestionSet } from "../utils/quiz";

const TOTAL_QUESTIONS = 3; // 問題数

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [options, setOptions] = useState<Question[]>([]);

  //---------------------------------------------------
  // JSONファイルから読み込み
  //---------------------------------------------------
  useEffect(() => {
    fetch("/data/country.json")
      .then((res) => res.json())
      .then((data: Question[]) => {
        const selectedQuestions = generateQuestionSet(data, TOTAL_QUESTIONS);
        setQuestions(selectedQuestions);
        setOptions(generateOptions(selectedQuestions[0], selectedQuestions));
      });
  }, []);

  if (questions.length === 0) return <div>Loading...</div>;

  const correct = questions[currentIndex];

  //---------------------------------------------------
  // 選択肢を選んだときの処理
  //---------------------------------------------------
  const handleAnswer = (country: string) => {
    setSelected(country);
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
      setOptions(generateOptions(nextCorrect, questions));
    } else {
      setShowResult(true);
    }
  };
  //---------------------------------------------------
  if (!correct) return <div>Loading...</div>;

  if (showResult) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl">結果発表</h1>
        <p>
          あなたのスコア: {score} / {TOTAL_QUESTIONS}
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setSelected(null);
            setScore(0);
            setShowResult(false);
          }}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          もう一度
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20 text-center">
      <h1 className="text-2xl mb-4">国歌当てクイズ</h1>
      <p>第 {currentIndex + 1} 問</p>
      <AnthemPlayer file={correct.file} />

      <div className="mt-10">
        {options.map((opt) => (
          <button
            key={opt.country}
            onClick={() => handleAnswer(opt.country)}
            className={`m-2 p-4 rounded border
              ${
                selected
                  ? opt.country === selected
                    ? "bg-gray-700"
                    : ""
                  : "bg-gray-950 hover:bg-gray-700"
              }`}
            disabled={selected !== null}
          >
            {opt.display_name}
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="mt-4 text-xl font-semibold"
          style={{ color: selected === correct.country ? "green" : "red" }}
        >
          {selected === correct.country
            ? `正解！「${correct.display_name}」です！`
            : `不正解！正解は「${correct.display_name}」でした。`}
        </div>
      )}

      {selected && (
        <button
          onClick={handleNext}
          className="mt-6 p-2 bg-blue-500 text-white rounded"
        >
          次の問題へ
        </button>
      )}
    </div>
  );
}
