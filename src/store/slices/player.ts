import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";

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
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    //eu consigo tipar a action que aguardo receber. passo o PayloadAction e dentro dele passo o tipo de dado que eu espero receber.
    start: (state, action: PayloadAction<Course>) => {
      state.course = action.payload;
    },

    //eu consigo tipar a action que aguardo receber. passo o PayloadAction e dentro dele passo o tipo de dado que eu espero receber.
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0];
      state.currentLessonIndex = action.payload[1];
    },
    //na minha função next eu não espero ter nenhum payload, então posso remover o parametro de action, assim ,eu não preciso passar parametro para função na hora de eu chamar ela.
    next: (state) => {
      //para que eu possa dar play no próximo vídeo, preciso fazer algumas verificações, como se existe uma próxima lesson e se existe um próximo módulo.
      const nextLessonIndex = state.currentLessonIndex + 1;

      const nextLesson =
        state?.course?.modules[state.currentModuleIndex].lessons[
          nextLessonIndex
        ];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
        return;
      }

      const nextModuleIndex = state.currentModuleIndex + 1;

      const nextModule = state?.course?.modules[nextModuleIndex];

      if (nextModule) {
        state.currentModuleIndex = nextModuleIndex;
        state.currentLessonIndex = 0;
        return;
      }
    },
  },
});

export const player = playerSlice.reducer;

export const { play, next, start } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    const currentModule = state?.player?.course?.modules[currentModuleIndex];

    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentModule, currentLesson };
  });
};
