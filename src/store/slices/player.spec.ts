import { describe, expect, it } from "vitest"; //estamos utilizando o vitest para teste pois é uma ferramente de teste desenvolvida pelo próprio time do vite., sendo assim, as configurações necessárias para os testes são mínimas. se fossemos utilizar o jest, teriamos que fazer configurações a mais.
import { player as reducer, playerSlice, play, next } from "./player";

const exampleState = {
  course: {
    modules: [
      {
        id: "1",
        title: "Iniciando com React",
        lessons: [
          { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
          {
            id: "w-DW4DhDfcw",
            title: "Estilização do Post",
            duration: "10:05",
          },
        ],
      },
      {
        id: "2",
        title: "Estrutura da aplicação",
        lessons: [
          {
            id: "gE48FQXRZ_o",
            title: "Componente: Comment",
            duration: "13:45",
          },
          { id: "Ng_Vk4tBl0g", title: "Responsividade", duration: "10:05" },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
};

describe("player slice", () => {
  const initialState = playerSlice.getInitialState();
  it("should be able to play", () => {
    //o reducer recebe dois parametros. o primeiro é o estado antes de acontecer a ação e o segundo é o que eu estou querendo fazer. por isso passo o initialState.
    const state = reducer(initialState, play([1, 2]));

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(2);
  });

  it("should be able to play next video automatically", () => {
    const state = reducer(initialState, next());

    expect(state.currentModuleIndex).toEqual(0);
    expect(state.currentLessonIndex).toEqual(1);
  });

  it("should be able to jump to next module automatically", () => {
    const lastLessonInFirstModule =
      initialState.course.modules[0].lessons.length - 1;

    const state = reducer(
      { ...initialState, currentLessonIndex: lastLessonInFirstModule },
      next()
    );

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(0);
  });

  it("should not update the current module and lesson index if there is no next lesson available", () => {
    const lastLessonInFirstModule =
      initialState.course.modules[0].lessons.length - 1;

    const state = reducer(
      {
        ...initialState,
        currentLessonIndex: lastLessonInFirstModule,
        currentModuleIndex: 1,
      },
      next()
    );

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(lastLessonInFirstModule);
  });
});
