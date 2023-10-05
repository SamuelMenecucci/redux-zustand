import ReactPlayer from "react-player"; //lib que permite que eu faça embed de vídeos de vários sources (providers). https://www.npmjs.com/package/react-player
import { next, useCurrentLesson } from "../store/slices/player";
import { useAppDispatch, useAppSelector } from "../store";
import { Loader } from "lucide-react";

export const Video = () => {
  const dispatch = useAppDispatch();

  const { currentLesson } = useCurrentLesson();

  const isCourseloading = useAppSelector((state) => state.player.isLoading);

  const handlePlayNext = () => {
    dispatch(next());
  };

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isCourseloading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          onEnded={handlePlayNext}
          playing // para que o vídeo de autoplay
        />
      )}
    </div>
  );
};
