import { FormEvent, useState } from "react";

export const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");

  const handleCreateNewTodo = (e: FormEvent) => {
    e.preventDefault();

    console.log(newTodo);
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
