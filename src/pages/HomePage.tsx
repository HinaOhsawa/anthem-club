import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>国歌当てクイズアプリ</h1>
      <Link to="/quiz">
        <button>クイズを始める</button>
      </Link>
      <p>国歌の音声を聞いて、正しい国を当てるクイズです。</p>
    </div>
  );
}
