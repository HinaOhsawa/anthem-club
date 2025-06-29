import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Props = {
  file: string;
  playing?: boolean;
};

export default function QAnthemPlayer({ file }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="text-center">
      {/* 音声再生用（非表示） */}
      <audio
        ref={audioRef}
        src={file}
        autoPlay
        onEnded={() => setIsPlaying(false)}
      />

      {/* 画像 */}
      <img
        src={isPlaying ? "images/sakebu-mamo.png" : "images/noke-mamo.png"}
        alt="Anthem Club Logo"
        className="w-24 m-auto"
      />

      {/* 再生・停止ボタン */}
      <button
        onClick={togglePlay}
        className="mt-2 p-3 aspect-square bg-orange-400 text-white rounded-full hover:bg-orange-300"
      >
        {isPlaying ? <Play /> : <Pause />}
      </button>
    </div>
  );
}
