import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className=" bg-orange-100 ">
      <div
        className="p-3 flex items-center max-w-4xl mx-auto
    "
      >
        <Link
          to="/"
          className="flex logo hover:scale-105 transition-transform text-orange-700
"
        >
          <img src="images/icon-world_color.png" alt="" className="h-6 mr-1" />
          Anthem Club
        </Link>
        <div className="logo"></div>
      </div>
    </header>
  );
}
