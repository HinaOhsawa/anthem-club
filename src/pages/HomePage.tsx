import { Link } from "react-router-dom";
import CountryList from "../components/CountryList";

export default function HomePage() {
  return (
    <main>
      <div className="flex  justify-center">
        <img src="images/icon-world_color.png" alt="" className="h-10 mr-2" />
        <h1 className="text-4xl logo mb-2">Anthem Club</h1>
        <img src="images/icon-hachibuonpu.png" alt="" className="h-10" />
      </div>

      <p className="font-bold text-3xl font-kaisei mb-2 ">国歌当てクイズ</p>
      <p className="text-md font-bold">
        国歌の音声を聞いて、選択肢から正しい国を当てるクイズゲームです。
      </p>
      <p className="text-md font-bold">
        クイズに挑戦して、世界の国歌を学ぼう！
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4 my-4">
        <img className="w-20 sm:w-30" src="images/ouen-mamo.png" alt="" />

        <Link to="/quiz">
          <button>クイズを始める！</button>
        </Link>

        <img
          className="w-20 sm:w-30"
          src="images/ouen-mamo.png"
          alt=""
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

      <CountryList />
    </main>
  );
}
