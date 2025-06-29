import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div
      className="p-3 bg-orange-100 flex items-center
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
  );
}
