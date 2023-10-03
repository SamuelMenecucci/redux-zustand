//após passar o provider do redux para os componetes que irão utilizar a store, importo o useSelector
import { useSelector } from "react-redux";

export const TodoList = () => {
  //no parametro do useSelector, useSelector(state => state), eu estou dizendo que o state é todo o store do redux. ou seja, eu estou retornando todo o store de dentro do redux, ou seja, todo o estado que possuo lá. se eu quizer algo especifico, eu consigo fazer isso dizendo o que eu quero de dentro da store. exemplo: eu tenho o reduxer "todo" dentro da store. se eu tivesse mais algum reducer e quisesse apenas o todo e não toda a store, eu poderia fazer useSelector((state) => state.todo. assim ele traria o valor do estado 'todo', que é o array que coloquei como valor.
  const store = useSelector((state) => state);

  return (
    <ul>
      {store.todo.map((element) => (
        <li key={element}>{element}</li>
      ))}
    </ul>
  );
};
