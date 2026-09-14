import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_TEMA = "@que_llevo/tema";

export type Tema = "claro" | "oscuro";

interface TemaState {
  modo: Tema;
}

const initialState: TemaState = {
  modo: "claro",
};

export const cargarTemaDesdeStorage = createAsyncThunk(
  "tema/cargarDesdeStorage",
  async () => {
    const guardado = await AsyncStorage.getItem(KEY_TEMA);
    const modo: Tema = guardado === "oscuro" ? "oscuro" : "claro";
    console.log("[Redux] Thunk cargarTemaDesdeStorage -> modo leído:", modo);
    return modo;
  }
);

const temaSlice = createSlice({
  name: "tema",
  initialState,
  reducers: {
    alternarTema: (state) => {
      state.modo = state.modo === "claro" ? "oscuro" : "claro";
      console.log("[Redux] tema/alternarTema -> nuevo modo:", state.modo);
      AsyncStorage.setItem(KEY_TEMA, state.modo);
    },
    establecerTema: (state, action: PayloadAction<Tema>) => {
      state.modo = action.payload;
      AsyncStorage.setItem(KEY_TEMA, state.modo);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cargarTemaDesdeStorage.fulfilled, (state, action) => {
      state.modo = action.payload;
      console.log("[Redux] tema/cargarDesdeStorage cumplido -> modo inicial:", state.modo);
    });
  },
});

export const { alternarTema, establecerTema } = temaSlice.actions;
export default temaSlice.reducer;