import { beforeEach, describe, expect, it } from "vitest";
import { useStore } from ".";

const course = {
  id: 1,
  modules: [
    {
      id: 1,
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
      id: 2,
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
};

//coloquei o initialState fora do beforeEach, isso pq eu quero que ele pegue o valor inicial do estado, que são os valores iniciais sem nenhuma alteração prévia. se eu coloco esse initialState dentro do beforeEach ele não vai pegar o valor inicial, ele irá pegar o valor atual do estado a cada vez que a função executar.
const initialState = useStore.getState();

describe("zustand store", () => {
  //o beforeEach serve para que a gente consiga rodar uma funcionalidade antes de cada teste. como os testes que fazemos irão alterar o que tem na store, precisamos reiniciar os valores para que um teste não influencie no outro. por isso iremos utilizar essa função. antes de cada teste, irá rodar esse código.

  beforeEach(() => {
    useStore.setState(initialState);
  });

  it("should be able to play", () => {
    //no useStore, se eu chamo a função com o parenteses, useStore(), ele me retorna os estados. dessa forma eu consigo desestruturar os estados/funções. mas se eu não chamo, fazendo somente useStore, quando eu coloco um ponto, eu tenho algumas funções que eu posso utilizar, tendo entre elas o getState, para pegar os dados do estado, e setState, para setar o estado.
    // o useStore() é um hook, então eu só consigo utiliza-lo dentro de componentes react, então quando eu estou fora de componentes react e eu quero acessar os dados do store eu preciso utilizar dessa forma.

    const { play } = useStore.getState();

    play([1, 2]);

    const { currentLessonIndex, currentModuleIndex } = useStore.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(2);
  });

  it("should be able to play next video automatically", () => {
    useStore.setState({ course });

    const { next } = useStore.getState();

    next();

    const { currentLessonIndex, currentModuleIndex } = useStore.getState();

    expect(currentModuleIndex).toEqual(0);
    expect(currentLessonIndex).toEqual(1);
  });

  it("should be able to jump to next module automatically", () => {
    useStore.setState({ course });

    const { next } = useStore.getState();

    useStore.setState({ currentLessonIndex: 1 });

    next();

    const { currentLessonIndex, currentModuleIndex } = useStore.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(0);
  });

  it("should not update the current module and lesson index if there is no next lesson available", () => {
    useStore.setState({ course });

    const { next } = useStore.getState();

    useStore.setState({ currentLessonIndex: 1, currentModuleIndex: 1 });

    next();

    const { currentLessonIndex, currentModuleIndex } = useStore.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(1);
  });
});
