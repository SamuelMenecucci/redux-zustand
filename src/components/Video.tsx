import ReactPlayer from "react-player"; //lib que permite que eu faça embed de vídeos de vários sources (providers). https://www.npmjs.com/package/react-player

export const Video = () => {
  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        url="https://www.youtube.com/watch?v=oPOKpSFqy-I"
      />
    </div>
  );
};
