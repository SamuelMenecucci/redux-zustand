import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../../store";

export const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();

  const handleCreateNewTodo = (e: FormEvent) => {
    e.preventDefault();

    //a função useDispatch eu utilizo para disparar a action da minha store, fazendo as alterações no estado.
    dispatch(add({ newTodo: newTodo }));

    setNewTodo("");
  };

  return (
    <form onSubmit={handleCreateNewTodo}>
      <input
        type="text"
        placeholder="Novo to-do"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};
