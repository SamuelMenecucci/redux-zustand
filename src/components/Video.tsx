import ReactPlayer from "react-player"; //lib que permite que eu faça embed de vídeos de vários sources (providers). https://www.npmjs.com/package/react-player
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { next } from "../store/slices/player";

export const Video = () => {
  const dispatch = useDispatch();

  const lesson = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    const currentLesson =
      state.player.course.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ];

    return currentLesson;
  });

  const handlePlayNext = () => {
    dispatch(next());
  };

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        url={`https://www.youtube.com/watch?v=${lesson.id}`}
        onEnded={handlePlayNext}
        playing // para que o vídeo de autoplay
      />
    </div>
  );
};
