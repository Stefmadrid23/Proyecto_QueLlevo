export interface ItemLista {
    id: string;
    nombre: string;
    empacado: boolean;
}

export interface ListaEmpaque {
    id: string;
    titulo: string;
    actividad: string;
    color: string;
    items: ItemLista[];
    creadaEn: number;
}

export interface Usuario {
    nombre: string;
    email: string;
    telefono: string;
}

export type RootStackParamList ={
    Login: undefined; 
    Main: undefined;
    DetalleLista: {listaId: string};
};

export type MainTabParamList ={
    Inicio: undefined;
    NuevaLista: undefined;
    Perfil: undefined;
};