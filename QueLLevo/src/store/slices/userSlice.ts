import { createSlice, PayloadAction,createAsyncThunk} from "@reduxjs/toolkit"
import { Usuario } from "../../constants";
import { supabase } from "../../services/supabaseCliente";

interface UserState {
    datos: Usuario | null;
    autenticado: boolean;
    cargando: boolean;
    error: string | null;
    
}

const initialState: UserState = {
    datos: null,
    autenticado: false,
    cargando: false,
    error: null,
    
};

export const registrarUsuario = createAsyncThunk(
  "usuario/registrar",
  async (
    datos: { nombre: string; email: string; telefono: string; password: string },
    { rejectWithValue }
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email: datos.email,
      password: datos.password,
      options: { data: { nombre: datos.nombre, telefono: datos.telefono } },
    });
    console.log("[Redux] Thunk registrarUsuario -> respuesta de Supabase:", data, error);
    if (error) return rejectWithValue(error.message);
    return { nombre: datos.nombre, email: datos.email, telefono: datos.telefono };
  }
);

// Inicia sesión con una cuenta ya existente en Supabase Auth
export const iniciarSesionConSupabase = createAsyncThunk(
  "usuario/iniciarSesionSupabase",
  async (
    credenciales: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword(credenciales);
    console.log("[Redux] Thunk iniciarSesionConSupabase -> respuesta de Supabase:", data, error);
    if (error) return rejectWithValue(error.message);
    return {
      nombre: data.user?.user_metadata?.nombre ?? "",
      email: data.user?.email ?? credenciales.email,
      telefono: data.user?.user_metadata?.telefono ?? "",
    };
  }
);

export const cerrarSesionConSupabase = createAsyncThunk(
  "usuario/cerrarSesionSupabase",
  async () => {
    const { error } = await supabase.auth.signOut();
    console.log("[Redux] Thunk cerrarSesionConSupabase -> error:", error);
  }
);

const userSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    iniciarSesion: (state, action: PayloadAction<Usuario>) => {
      state.datos = action.payload;
      state.autenticado = true;
    },
    cerrarSesion: (state) => {
      state.datos = null;
      state.autenticado = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrarUsuario.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(registrarUsuario.fulfilled, (state, action) => {
        console.log("[Redux] usuario/registrar cumplido -> usuario:", action.payload);
        state.cargando = false;
        state.datos = action.payload;
        state.autenticado = true;
      })
      .addCase(registrarUsuario.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload as string;
      })
      .addCase(iniciarSesionConSupabase.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(iniciarSesionConSupabase.fulfilled, (state, action) => {
        console.log("[Redux] usuario/iniciarSesionSupabase cumplido -> usuario:", action.payload);
        state.cargando = false;
        state.datos = action.payload;
        state.autenticado = true;
      })
      .addCase(iniciarSesionConSupabase.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.payload as string;
      })
      .addCase(cerrarSesionConSupabase.fulfilled, (state) => {
        state.datos = null;
        state.autenticado = false;
      });
  },
});

export const { iniciarSesion, cerrarSesion } = userSlice.actions;
export default userSlice.reducer;

