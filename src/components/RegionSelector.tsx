type Props = {
  onSelect: (region: string) => void;
};

export default function RegionSelector({ onSelect }: Props) {
  return (
    <div>
      <p className="mt-8 text-lg font-bold">出題範囲を選んでチャレンジ！</p>
      <div className="mb-6">
        <button onClick={() => onSelect("g7")} className="region-button">
          G7加盟国
        </button>
        <button onClick={() => onSelect("americas")} className="region-button">
          北アメリカ・南アメリカ
        </button>
        <button onClick={() => onSelect("europe")} className="region-button">
          ヨーロッパ
        </button>
        <button onClick={() => onSelect("other")} className="region-button">
          アジア・アフリカ・オセアニア
        </button>
        <button onClick={() => onSelect("all")} className="region-button">
          全て
        </button>
      </div>
    </div>
  );
}
