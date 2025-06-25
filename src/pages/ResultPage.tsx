import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { quizResult, setQuizResult } = useQuiz();
  const { questions, answers, score } = quizResult;
  const navigate = useNavigate();

  const handleRetry = () => {
    // 必要なら状態をリセット
    setQuizResult({
      questions: [],
      answers: [],
      score: 0,
    });
    navigate("/quiz"); // クイズページに戻る
  };

  return (
    <div>
      <h1>結果</h1>
      <p>
        スコア: {score} / {questions.length}
      </p>

      <ul>
        {questions.map((q, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer.country === q.country;

          return (
            <li key={index}>
              <h3>
                Q{index + 1}: {q.display_name}
              </h3>
              <p>
                あなたの答え: {userAnswer.display_name}{" "}
                {isCorrect ? "✅" : "❌"}
              </p>
              <audio controls src={q.file}></audio>
              <hr />
            </li>
          );
        })}
      </ul>
      <button
        onClick={handleRetry}
        className="mt-6 p-2 px-4 bg-green-600 text-white rounded"
      >
        もう一度プレイする
      </button>
    </div>
  );
};

export default ResultPage;
