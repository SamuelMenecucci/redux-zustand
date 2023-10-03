//para a criação da store importamos o configureStore do tookit
import { configureStore, createSlice } from "@reduxjs/toolkit";

//mesmo que a store seja para compartilhamento de estados globais, podemos ter pequenos pedaços de estado compartilhados para cada funcionalidade, então posso ter um reducer para cada funcionalidade. é uma forma de organização dos estados, separando em pedaços menores para não ficar muita coisa em um lugar só. dentro do toolkit isso é chamado de slice. utilizamos a função createSlice para fazer a criação desse primeiro slice.
const todoSlice = createSlice({
  //todo slice precisa ter um nome, um initialState, que é o valor que esse estado irá ser inicializado, e ele precisa ter os reducers.
  name: "todo",
  initialState: ["Fazer café", "Estudar Redux"],
  reducers: {},
});

//para iniciarmos a configuração da store, precisamos da função configureStore do toolkit, assim iniciamos a confifuração do nosso estado.
export const store = configureStore({
  //são as infomações que iremos compartilhar entre todos os componentes da nossa aplicação.
  //dentro do reducer eu passo um objeto com quais são as minhas 'fatias' (os meus slices, que são os meus reducers)
  reducer: {
    todo: todoSlice.reducer,
  },
});
