import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-4xl font-kaisei mb-4">国歌当てクイズ</h1>
      <p className="text-md">
        国歌の音声を聞いて、選択肢から正しい国を当てるクイズゲームです。
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4 my-4">
        <img className="w-30" src="images/ouen-mamo.png" alt="" />

        <Link to="/quiz">
          <button>クイズを始める！</button>
        </Link>

        <img
          className="w-30"
          src="images/ouen-mamo.png"
          alt=""
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
    </main>
  );
}
