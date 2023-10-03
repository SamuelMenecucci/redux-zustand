//para a criação da store importamos o configureStore do tookit
import { configureStore, createSlice } from "@reduxjs/toolkit";

import { useSelector, TypedUseSelectorHook } from "react-redux";

//mesmo que a store seja para compartilhamento de estados globais, podemos ter pequenos pedaços de estado compartilhados para cada funcionalidade, então posso ter um reducer para cada funcionalidade. é uma forma de organização dos estados, separando em pedaços menores para não ficar muita coisa em um lugar só. dentro do toolkit isso é chamado de slice. utilizamos a função createSlice para fazer a criação desse primeiro slice.
const todoSlice = createSlice({
  //todo slice precisa ter um nome, um initialState, que é o valor que esse estado irá ser inicializado, e ele precisa ter os reducers.
  name: "todo",
  initialState: ["Fazer café", "Estudar Redux"],
  //dentro dos reducer eu coloco quais actions a interface pode fazer entro do nosso estado, ou seja, quais ações o usuário pode disparar.
  //toda action disparada pelo usuário terá a seguinte estrutura: {type: 'todo/add', payload: ''}. no type é identificada qual ação está sendo disparada, sendo um conjunto do nome do reducer seguida do nome da ação. o payload é a informação que veio de dentro do disparo.
  reducers: {
    add: (state, action) => {
      //o state do parametro é o estado original, já que ele é um array, eu estou dando um push dentro dele.
      state.push(action.payload.newTodo);
    },
  },
});

//para iniciarmos a configuração da store, precisamos da função configureStore do toolkit, assim iniciamos a confifuração do nosso estado.
export const store = configureStore({
  //são as infomações que iremos compartilhar entre todos os componentes da nossa aplicação.
  //dentro do reducer eu passo um objeto com quais são as minhas 'fatias' (os meus slices, que são os meus reducers)
  reducer: {
    todo: todoSlice.reducer,
  },
});

//dentro do meu slice eu tenho as minhas actions, que são todas as ações que o usuário pode fazer para alterar alguma informação dentro do nosso estado.
export const { add } = todoSlice.actions;

export type RootState = ReturnType<typeof store.getState>; // a função getState retorna todo o meu stado da store. o getState é uma função, então se eu utilizar somente typeof store.getState ele vai pegar o tipo fa função e eu quero o tipo do retorno da função. por isso eu utilizo o ReturnType
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
