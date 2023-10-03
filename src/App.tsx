import { Provider as ReduxProvider } from "react-redux";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { store } from "./store";

export function App() {
  return (
    //para a utilização do provider do redux, eu preciso passar obrigatoriamente uma prop chamada store, que é exatamente a variável que configuramos no index.tsx do diretório store.
    <ReduxProvider store={store}>
      <TodoList />
      <AddTodo />
    </ReduxProvider>
  );
}
