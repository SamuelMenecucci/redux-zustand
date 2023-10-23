import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import { play } from "../store/slices/player";
import { useStore } from "../zustand-store";

interface ModuleProps {
  title: string;
  amountOfLessons: number;
  moduleIndex: number;
}

export const Module = ({
  title,
  amountOfLessons,
  moduleIndex,
}: ModuleProps) => {
  //com o zustand eu consigo fazer a mesma lógica de retornar da função da store somente o que eu preciso.isso é importante pois se desestruturarmos o que precisamos direto do useStore, sem passarmos nenhum parametro para o useStore, o react irá ficar observando todos os estados do zustand, e para qualquer alteração será renderizado o componente novamente. então, aqui, como queremos observar somente o isLoading, e não todo o restante do estado, é importante que eu pegue a store e retorne somente o que é necessário.
  const { currentLessonIndex, currentModuleIndex, play, lessons } = useStore(
    (store) => {
      return {
        lessons: store?.course?.modules[moduleIndex].lessons,
        currentLessonIndex: store.currentLessonIndex,
        currentModuleIndex: store.currentModuleIndex,
        play: store.play,
      };
    }
  );

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className=" flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map((lesson, lessonIndex) => (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              duration={lesson.duration}
              onPlay={() => play([moduleIndex, lessonIndex])}
              isCurrent={
                currentModuleIndex === moduleIndex &&
                currentLessonIndex === lessonIndex
              }
            />
          ))}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
