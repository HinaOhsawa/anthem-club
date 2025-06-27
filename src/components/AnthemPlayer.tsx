import ReactPlayer from "react-player";
type Props = {
  file: string;
  playing?: boolean;
};

export default function AnthemPlayer({ file, playing = false }: Props) {
  return (
    <div className="flex justify-center my-4">
      <ReactPlayer
        url={file}
        controls
        playing={playing}
        width="400px"
        height="50px"
      />
    </div>
  );
}
