import ReactPlayer from "react-player";
type Props = {
  file: string;
};

export default function AnthemPlayer({ file }: Props) {
  return (
    <div>
      <ReactPlayer
        url={file}
        controls
        // playing={false}
        width="400px"
        height="50px"
      />
    </div>
  );
}
