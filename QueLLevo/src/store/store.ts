import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./slices/userSlice";
import listasReducer from "./slices/listaSlice";

export const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
    listas: listasReducer,
  },
});

store.subscribe(() => {
  console.log("[Redux] Store actualizado:", store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;