import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import AnthemPlayer from "../components/AnthemPlayer";

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
    <main>
      <h1 className="text-2xl mb-4">結果発表！</h1>
      <p className="text-xl mb-6 font-bold">
        スコア: {score} / {questions.length}
      </p>

      <ul>
        {questions.map((q, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer.country === q.country;

          return (
            <li key={index}>
              <h3 className="mt-4">
                第{index + 1}問 : {q.display_name}
              </h3>
              <p>
                あなたの答え : {userAnswer.display_name}{" "}
                {isCorrect ? "✅" : "❌"}
              </p>
              <AnthemPlayer file={q.file}></AnthemPlayer>
              <hr />
            </li>
          );
        })}
      </ul>
      <button onClick={handleRetry}>もう一度プレイする！</button>
    </main>
  );
};

export default ResultPage;
