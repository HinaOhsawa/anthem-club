import { useState, useEffect } from "react";
import AnthemPlayer from "../components/AnthemPlayer";

// Questionの型定義
type Question = {
  country: string;
  file: string;
  display_name: string;
};
export default function QuizPage() {
  const TOTAL_QUESTIONS = 3; // 問題数
  const [questions, setQuestions] = useState<Question[]>([]);
  const [correct, setCorrect] = useState<Question | null>(null);
  const [options, setOptions] = useState<Question[]>([]);
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [answered, setAnswered] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  // JSONファイルから読み込み
  useEffect(() => {
    fetch("/data/country.json")
      .then((res) => res.json())
      .then((data: Question[]) => {
        setQuestions(data);
        generateNewQuestion(data);
      });
  }, []);

  function shuffleArray<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() })) // 各要素にランダムなsortプロパティを追加
      .sort((a, b) => a.sort - b.sort) // sortプロパティのランダム値順にソート
      .map(({ value }) => value); //元の値だけを取り出して新しい配列を作成
  }

  function generateOptions(
    correct: Question,
    all: Question[],
    numOptions = 4
  ): Question[] {
    const wrong = all.filter((c) => c.country !== correct.country); // 正解以外の国をフィルタリング
    const wrongOptions = shuffleArray(wrong).slice(0, numOptions - 1); // ランダムにダミーを選択
    return shuffleArray([...wrongOptions, correct]); // 正解とダミーを結合してシャッフル
  }

  //新しい問題を出題する
  function generateNewQuestion(data: Question[]) {
    const q = data[Math.floor(Math.random() * data.length)];
    setCorrect(q); //問題一覧からランダムに正解の国を選ぶ
    setOptions(generateOptions(q, data)); //その正解を元に選択肢を作成
  }

  function handleAnswer(selectedCountry: string) {
    if (!correct) return;

    setSelected(selectedCountry);
    setAnswered(true); // 答えたフラグを立てる

    if (selectedCountry === correct.country) {
      setScore((prev) => prev + 1);
      setFeedback("正解！");
    } else {
      setFeedback("不正解！");
    }
  }

  function handleNextQuestion() {
    if (questionNumber < TOTAL_QUESTIONS) {
      setQuestionNumber((prev) => prev + 1);
      generateNewQuestion(questions);
      setFeedback("");
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  }

  if (!correct) return <div>Loading...</div>;

  if (showResult) {
    return (
      <div>
        <h1>結果発表</h1>
        <p>
          あなたのスコア: {score} / {TOTAL_QUESTIONS}
        </p>
        <button
          onClick={() => {
            setScore(0);
            setQuestionNumber(1);
            setShowResult(false);
            generateNewQuestion(questions);
          }}
        >
          もう一度
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <h1>国歌当てクイズ</h1>
      <p>第 {questionNumber} 問</p>
      <AnthemPlayer file={correct.file} />
      <div className="mt-10">
        {options.map((opt) => (
          <button
            key={opt.country}
            onClick={() => handleAnswer(opt.country)}
            className={`m-2 p-4 rounded border 
            ${
              answered
                ? opt.country === selected
                  ? "border-4"
                  : "border"
                : "bg-gray-900 hover:bg-gray-500"
            }`}
            disabled={answered}
          >
            {opt.display_name}
          </button>
        ))}

        {feedback && (
          <div style={{ marginTop: "20px", fontSize: "20px" }}>{feedback}</div>
        )}

        {answered && (
          <div
            style={{
              marginTop: "20px",
              fontSize: "24px",
              color: selected === correct.country ? "green" : "red",
            }}
          >
            {selected === correct.country
              ? `正解は ${correct.display_name} です！`
              : `正解は ${correct.display_name} でした。`}
          </div>
        )}

        {answered && (
          <button
            onClick={handleNextQuestion}
            style={{ marginTop: "20px", padding: "10px" }}
          >
            次の問題へ
          </button>
        )}
      </div>
    </div>
  );
}
