import { MessageCircle } from "lucide-react"; //lib de ícones https://lucide.dev/guide/packages/lucide-react
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";

import { useEffect } from "react";
import { useCurrentLesson, useStore } from "../zustand-store";

export const Player = () => {
  const { course, loadCourse } = useStore((store) => {
    return {
      course: store.course,
      loadCourse: store.loadCourse,
    };
  });

  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    loadCourse();
  }, []);

  useEffect(() => {
    document.title = `Assistindo: ${currentLesson?.title}`;
  }, [currentLesson]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center  justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-small font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="absolute top-0 bottom-0 right-0 w-80 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {course?.modules?.map((module, index) => (
              <Module
                key={module.id}
                title={module.title}
                amountOfLessons={module.lessons.length}
                moduleIndex={index}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
};
