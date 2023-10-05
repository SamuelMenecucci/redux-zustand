import { MessageCircle } from "lucide-react"; //lib de ícones https://lucide.dev/guide/packages/lucide-react

import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { useAppSelector } from "../store";

export const Player = () => {
  //o selector tem um conceito interessante que acaba diferenciando o redux da context api. isso pq na context api, quando usamos os dados do contexto dentro de um componente, independente de qual dado daquele contexto mudar, aquele componente irá atualizar, isso nos causa até uma perca de performance. no redux isso não acontece. no redux nós extraimos somente a informação que eu quero. no que estamos fazendo aqui é, estamos indo lá no meu state do redux, na store, indo no reducer/slice de player, acessando course e acessando os modulos. o que o useSelector irá faze nesse componente é: ele só irá atualizar o componente, ou seja, re-renderizar o componente se mudar a informação dos modules (que é o que eu estou retornando com o useSelector). por isso é importante não retornarmos todo o estado, e sim, somente o que realmente iremos utilizar.
  const modules = useAppSelector((state) => state.player.course.modules);

  console.log("modules", modules);

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
            {modules.map((module, index) => (
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
