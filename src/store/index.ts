import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { player } from "./slices/player";

export const store = configureStore({
  reducer: {
    player: player,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//quando eu tento utilizar a função useDispatch passando a a loadCourse, que eu criei utilizando o createAsyncThunk, ele me retornar um erro. isso ocorre pq a funcionalidade do createAsyncThunk não é uma funcionalidade nativa do redux. isso acontece pq a função createAsyncThunk utiliza por baixo dos panos uma outra lib, chamada redux-thunk, que é um lib bem antiga.  o Redux por padrão ele não entende que a função que eu criei com o createAsyncThunk é uma action. então, quando eu estou utilizando a funcionalidade de thunk eu preciso fazer essa tipagem. agora, todos os lugares que eu estou utilizando o useDispatch, eu troco utilizando o useAppDispatch.
export const useAppDispatch: () => AppDispatch = useDispatch;
