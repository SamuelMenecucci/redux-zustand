import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../services/api";

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
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
};

//as actions do redux devem ser funções puras, ou seja, que não são async, não retornam promises, não possu side-effects. createAsyncThunk pode ser utilizada como uma action porém assincrona. como primeiro parametro eu passo uma string, que é o nome da action. e como segundo parametro a função. o intuíto de utilizar o createAsyncThunk é podermos fazer a busca dos nossos cursos aqui pela store. como iremos trabalhar com promise, teremos que utiliza-lo pois não iremos conseguir fazer isso dentro das actions comuns.,
//DOC OVERVIEW: A function that accepts a Redux action type string and a callback function that should return a promise. It generates promise lifecycle action types based on the action type prefix that you pass in, and returns a thunk action creator that will run the promise callback and dispatch the lifecycle actions based on the returned promise.
export const loadCourse = createAsyncThunk("load", async () => {
  const response = await api.get("/courses/1");

  return response.data;
});

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
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
  //quando utilizamos o asyncThunk e são criadas as actions de pending, fulfilled ou reject, podemos utilizar uma opção chamada extraReducers. essa função recebe um parametro chamado builder. agora dentro do builder eu acesso o método addCase, que no caso é a nossa função de loadCourse, passando o fulfilled do loadCourse. ou seja, eu quero executar alguma coisa quando a ação de fulfilled do meu async thunk for executada.
  //o extraReducers é uma forma de fazer com que um reducer do redux ouça actions (disparo de ações) de outros locais, que podem ser outros reducers(slices) ou o async thunks
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
  },
});

export const player = playerSlice.reducer;

export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    const currentModule = state?.player?.course?.modules[currentModuleIndex];

    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentModule, currentLesson };
  });
};
