import type { Question } from "../types/questions";
import { useState, useEffect, useRef } from "react";
import QAnthemPlayer from "../components/QAnthemPlayer";
import { generateOptions, generateQuestionSet } from "../utils/quiz";
import country from "../data/country.json";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import Flag from "react-world-flags";
import { useSearchParams } from "react-router-dom";
import { useConfirmModal } from "../hooks/useConfirmModal";

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
  const correct = questions[currentIndex];

  const [searchParams] = useSearchParams();
  const region = searchParams.get("region"); // 出題範囲を取得
  const resultRef = useRef<HTMLDivElement>(null);
  const { showModal, closeModal } = useConfirmModal(); // 確認モーダル

  //---------------------------------------------------
  // JSONファイルから読み込み
  //---------------------------------------------------

  useEffect(() => {
    let filtered: Question[] = [];

    if (region === "americas") {
      filtered = country.filter(
        (q) => q.region === "North America" || q.region === "South America"
      );
    } else if (region === "europe") {
      filtered = country.filter((q) => q.region === "Europe");
    } else if (region === "asia") {
      filtered = country.filter((q) => q.region === "Asia");
    } else if (region === "africa") {
      filtered = country.filter((q) => q.region === "Africa");
    } else if (region === "oceania") {
      filtered = country.filter((q) => q.region === "Oceania");
    } else if (region === "g7") {
      filtered = country.filter((q) => q.g7 === true);
    } else {
      // fallback（全体）
      filtered = country;
    }

    setAllCountries(filtered);
    const selectedQuestions = generateQuestionSet(filtered, TOTAL_QUESTIONS);
    setQuestions(selectedQuestions);
    setOptions(generateOptions(selectedQuestions[currentIndex], filtered));
  }, [region]);

  //---------------------------------------------------
  // 出題範囲の表示名を取得する関数
  //---------------------------------------------------
  const regionDisplayName = (region: string) => {
    switch (region) {
      case "g7":
        return "G7加盟国";
      case "americas":
        return "北アメリカ・南アメリカ";
      case "europe":
        return "ヨーロッパ";
      case "asia":
        return "アジア";
      case "africa":
        return "アフリカ";
      case "oceania":
        return "オセアニア";
      case "all":
      default:
        return "全ての国";
    }
  };
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

  useEffect(() => {
    // 正誤判定までスクロール
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selected]);

  //---------------------------------------------------
  // 次の問題へ進む処理
  //---------------------------------------------------
  const handleNext = () => {
    if (currentIndex + 1 < TOTAL_QUESTIONS) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      const nextCorrect = questions[currentIndex + 1];
      setOptions(generateOptions(nextCorrect, allCountries));
      window.scrollTo(0, 0);
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
    navigate(`/result?region=${region}`);
  };
  //---------------------------------------------------
  if (!correct) return <div>Loading...</div>;
  const code = correct.code;

  return (
    <>
      {/* 確認モーダル */}
      {showModal && (
        <div className="fixed inset-0  bg-stone-950/25 z-50 flex items-center justify-center">
          <div className="bg-white/95 rounded-xl p-6 max-w-sm w-full text-center shadow-lg border-2 border-orange-700">
            <p className="text-gray-800 font-bold">
              国歌が再生されます！準備はいいですか？
            </p>
            <button onClick={closeModal} className="button">
              OK
            </button>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-kaisei mb-4">国歌当てクイズ</h1>
      <p className="font-bold text-orange-700 mb-4">
        出題範囲：
        <span className="">{regionDisplayName(region ?? "all")}</span>
      </p>
      <p className="text-xl font-bold py-2 mb-6  bg-orange-200">
        第 {currentIndex + 1} 問
      </p>

      {/* 問題の表示 */}
      {!showModal && (
        <>
          <QAnthemPlayer file={correct.file} playing={false} />
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
        </>
      )}

      {/* 正誤判定 */}
      {selected && (
        <>
          <div
            ref={resultRef}
            className={`scroll-mt-16 mt-6 text-2xl font-semibold font-kaisei
          ${selected === correct.country ? "text-green-600" : "text-red-600"}`}
          >
            {selected === correct.country ? `正解！` : `不正解！`}
          </div>
          <img
            className="w-30 m-auto"
            src={
              selected === correct.country
                ? `images/marakas-mamo.png`
                : `images/mamosakebu.png`
            }
            alt=""
          />
          <p className="mt-4 text-xl font-semibold">
            答えは「{correct.display_name}」でした！
          </p>
          <Flag className="m-auto h-20 shadow-md" code={code} />
        </>
      )}
      {selected && (
        <button onClick={handleNext} className="mt-6">
          {currentIndex + 1 == TOTAL_QUESTIONS
            ? " 結果発表へ ＞"
            : " 次の問題へ ＞"}
        </button>
      )}
    </>
  );
}
