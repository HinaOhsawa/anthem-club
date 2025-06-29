export default function Footer() {
  return (
    <footer
      className="p-3 bg-orange-100 
      "
    >
      <div
        className=" flex items-center max-w-4xl mx-auto
      "
      >
        <p className="flex logo ">
          <img src="images/icon-world_color.png" alt="" className="h-6 mr-1" />
          Anthem Club
        </p>
        <div className="logo"></div>
      </div>

      <div className="text-left p-2 max-w-4xl mx-auto">
        <p className="font-bold ">Credit</p>
        <p>
          Music Files：
          <a
            className="underline"
            target="_blank"
            href="https://nationalanthems.info/"
          >
            nationalanthems.info
          </a>
        </p>
        <p>
          Illustration：
          <a
            className="underline"
            target="_blank"
            href="https://hiyokoyarou.com/"
          >
            ぴよたそ
          </a>
        </p>
        <p>
          National Flag：
          <a
            className="underline"
            target="_blank"
            href="https://www.npmjs.com/package/react-world-flags"
          >
            react-world-flags
          </a>
        </p>
        <p>
          Icon Library：
          <a className="underline" target="_blank" href="https://lucide.dev/">
            Lucide
          </a>
        </p>
      </div>
      <p className="text-sm mt-4">© 2025 Anthem Club. All rights reserved.</p>
    </footer>
  );
}
