import { useStore, useCurrentLesson } from "../zustand-store";

export const Header = () => {
  const { currentModule, currentLesson } = useCurrentLesson();

  // quando utilizamos o useStore, desustruturando somente o que iremos usar, assim como no redux, devemos tomar cuidado para não utilizar o useStore sem passar nenhum parametro, pois dessa forma irá ficar observando todos os estados do zustand, e para qualquer alteração será renderizado o componente novamente. então, aqui, como queremos observar somente o isLoading, e não todo o restante do estado, é importante que eu pegue a store e retorne somente o que é necessário.
  // const { isLoading } = useStore();

  const isLoading = useStore((store) => store.isLoading);

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>;
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">
        Módulo {currentModule?.title}
      </span>
    </div>
  );
};
