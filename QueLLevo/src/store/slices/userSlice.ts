import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import { Usuario } from "../../constants";

interface UserState {
    datos: Usuario | null;
    autenticado: boolean;
}

const initialState: UserState = {
    datos: null,
    autenticado: false,
};

const userSlice = createSlice ({
    name: "usuario",
    initialState,
    reducers: {
        iniciarSesion: (state, action: PayloadAction<Usuario>) => {
            console.log("[Redux] usuario/ iniciarSesion -> payload recibido:", action.payload);
            state.datos = action.payload;
            state.autenticado = true;
            console.log("[Redux] usuario/ iniciarSesion -> nuevo estado:", state);
        },
        cerrarSesion: (state) => {
            console.log("[Redux] usuario/ cerrarSesion -> estado ANTES:", state);
            state.datos = null;
            state.autenticado = false;
            console.log ("[Redux] usuario/cerrarSesion -> estado DESPUES:", state);
        },

    },
});

export const { iniciarSesion, cerrarSesion } = userSlice.actions;
export default userSlice.reducer;