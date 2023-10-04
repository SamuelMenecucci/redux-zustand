import "./styles/global.css";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { Player } from "./pages/Player";

export function App() {
  return (
    //para a utilização do provider do redux, eu preciso passar obrigatoriamente uma prop chamada store, que é exatamente a variável que configuramos no index.tsx do diretório store.
    <ReduxProvider store={store}>
      <Player />
    </ReduxProvider>
  );
}
