import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-2xl">国歌当てクイズ</h1>
      <p>国歌の音声を聞いて、選択肢から正しい国を当てるクイズゲームです。</p>
      <Link to="/quiz">
        <button>クイズを始める！</button>
      </Link>
    </main>
  );
}
