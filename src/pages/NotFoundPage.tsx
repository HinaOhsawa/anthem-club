export default function NotFoundPage() {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-4">404 - NotFound</h1>
      <p className="mb-4">ページが見つかりません。</p>
      <img className="w-30 mx-auto my-6" src="images/mamosakebu.png" alt="" />
      <a
        href="/"
        className="mt-6 bg-orange-400 text-white font-semibold py-2 px-4 rounded-full hover:bg-orange-300 cursor-pointer"
      >
        ホームへ戻る
      </a>
    </div>
  );
}
