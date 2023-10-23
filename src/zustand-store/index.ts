import { create } from "zustand";

export interface Course {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;

  //como estou retornando no create as funções de play e next, irei adicionar elas na tipagem.

  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
}

//sobre os parametros set e get: o set e o get são basicamente duas funções que eu posso utilizar o get para buscar informações que estão salvas no estado enquanto o set é uma função para eu atualizar alguma informação do estado.
//o método create do zustand é um  generic. o generic no typescript nada mais é que uma função que pode receber um parametro de tipagem para dizermos para a função qual que é o tipo de informação que temos dentro dela.
export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    play: (moduleAndLessonIndex: [number, number]) => {
      //fazendo a desestruturação do array q eu recebo como parametro.
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex;

      //para atualizar um estado eu utilizo a função set, que vem do parametro do create.
      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      });
    },

    next: () => {
      //o método get não recebe parametro. ele retorna todas as informações do estado.
      const { currentLessonIndex, currentModuleIndex, course } = get();

      const nextLessonIndex = currentLessonIndex + 1;

      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        });
        return;
      }

      const nextModuleIndex = currentModuleIndex + 1;

      const nextModule = course?.modules[nextModuleIndex];

      if (nextModule) {
        set({
          currentModuleIndex: nextModuleIndex,
          currentLessonIndex: 0,
        });

        return;
      }
    },
  };
});
