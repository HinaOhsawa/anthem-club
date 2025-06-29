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

  let imgFile = "images/kenka2-mamo.png";
  let message = "やったね！";
  if (score === 0) {
    imgFile = "images/uchu-mamo.png";
    message = "ざんねん...";
  } else if (score === questions.length) {
    imgFile = "images/heart-mamo.png";
    message = "すっごい！";
  }

  return (
    <main>
      <h1 className="text-3xl py-2 mb-6 bg-orange-200 text-orange-950 font-kaisei">
        結果発表！
      </h1>
      <p className="text-xl font-bold text-orange-500">
        スコア: {score} / {questions.length}
      </p>
      <p className="font-kaisei text-lg m-0 font-bold text-stone-600">
        {message}
      </p>
      <img className="w-40 m-auto" src={imgFile} alt="" />

      <ul className="">
        {questions.map((q, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer.country === q.country;

          return (
            <li
              key={index}
              className="bg-white p-4  border-2 border-stone-400 rounded-lg mt-4 max-w-xl mx-auto"
            >
              <h3 className="text-lg mt-2">
                第 {index + 1} 問 : {q.display_name}
              </h3>
              <p className="text-sm font-bold text-stone-500">
                あなたの答え : {userAnswer.display_name}{" "}
                {isCorrect ? "✅" : "❌"}
              </p>
              <AnthemPlayer file={q.file}></AnthemPlayer>
              {/* <hr className="text-stone-500 " /> */}
            </li>
          );
        })}
      </ul>
      <button onClick={handleRetry}>もう一度やる！</button>
    </main>
  );
};

export default ResultPage;
