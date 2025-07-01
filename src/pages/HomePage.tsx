import { Link, useNavigate } from "react-router-dom";
import CountryList from "../components/CountryList";
import RegionSelector from "../components/RegionSelector";

export default function HomePage() {
  const navigate = useNavigate();

  const handleStartQuiz = (region: string) => {
    navigate(`/quiz?region=${region}`);
  };

  return (
    <>
      <div className="flex  justify-center">
        <img src="images/icon-world_color.png" alt="" className="h-10 mr-2" />
        <h1 className="text-4xl logo mb-2">Anthem Club</h1>
        <img src="images/icon-hachibuonpu.png" alt="" className="h-10" />
      </div>

      <p className="font-bold text-3xl font-kaisei mb-2 ">国歌当てクイズ</p>
      <p className="text-md font-bold">
        世界の国歌を聴いて、どこの国か当ててみよう！
      </p>

      <div className="flex flex-wrap justify-center items-center gap-0 sm:gap-4 my-4">
        <img className="w-20 sm:w-30" src="images/ouen-mamo.png" alt="" />

        <div>
          <p className="font-bold text-mx">全ての国でチャレンジ！</p>
          <Link to="/quiz?region=all">
            <button className="m-2">クイズを始める！</button>
          </Link>
        </div>

        <img
          className="w-20 sm:w-30"
          src="images/ouen-mamo.png"
          alt=""
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

      <RegionSelector onSelect={handleStartQuiz} />
      <CountryList />
    </>
  );
}
