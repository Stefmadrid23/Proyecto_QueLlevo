import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListaEmpaque } from "../../constants";

const KEY_LISTAS = "@que_llevo/listas";

interface ListasState {
  items: ListaEmpaque[];
  cargando: boolean;
}

const initialState: ListasState = {
  items: [],
  cargando: false,
};

export const cargarListasDesdeStorage = createAsyncThunk(
  "listas/cargarDesdeStorage",
  async () => {
    const json = await AsyncStorage.getItem(KEY_LISTAS);
    const listas: ListaEmpaque[] = json ? JSON.parse(json) : [];
    console.log("[Redux] Thunk cargarListasDesdeStorage -> datos leidos: ", listas);
    return listas;
  }
);

async function persistir(listas: ListaEmpaque[]) {
  await AsyncStorage.setItem(KEY_LISTAS, JSON.stringify(listas));
}

const listasSlice = createSlice({
  name: "listas",
  initialState,
  reducers: {
    agregarLista: (state, action: PayloadAction<ListaEmpaque>) => {
      console.log("[Redux] listas/agregarLista -> producto agregado:", action.payload);
      state.items.push(action.payload);
      console.log("[Redux] listas/agregarLista -> nuevo estado completo:", state.items);
      persistir(state.items);
    },
    alternarItem: (
      state,
      action: PayloadAction<{ listaId: string; itemId: string }>
    ) => {
      const lista = state.items.find((l) => l.id === action.payload.listaId);
      const item = lista?.items.find((i) => i.id === action.payload.itemId);
      if (item) item.empacado = !item.empacado;
      console.log("[Redux] listas/alternarItem -> nuevo estado: ", state.items);
      persistir(state.items);
    },
    eliminarItem: (
      state,
      action: PayloadAction<{ listaId: string; itemId: string }>
    ) => {
      const lista = state.items.find((l) => l.id === action.payload.listaId);
      if (lista) {
        lista.items = lista.items.filter((i) => i.id !== action.payload.itemId);
      }
      console.log("[Redux] listas/eliminarItem -> nuevo estado:", state.items);
      persistir(state.items);
    },
    eliminarLista: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((l) => l.id !== action.payload);
      console.log("[Redux] listas/eliminarLista -> nuevo estado:", state.items);
      persistir(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cargarListasDesdeStorage.pending, (state) => {
        state.cargando = true;
      })
      .addCase(cargarListasDesdeStorage.fulfilled, (state, action) => {
        state.items = action.payload;
        state.cargando = false;
        console.log("[Redux] listas/cargarDesdeStorage cumplido -> estado inicial: ", state.items);
      })
      .addCase(cargarListasDesdeStorage.rejected, (state) => {
        state.cargando = false;
      });
  },
});

export const { agregarLista, alternarItem, eliminarItem, eliminarLista } =
  listasSlice.actions;
export default listasSlice.reducer;