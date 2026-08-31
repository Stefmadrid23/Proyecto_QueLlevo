import AsyncStorage  from "@react-native-async-storage/async-storage";
import { ListaEmpaque } from ".";

const KEY_LISTAS = "@que_llevo/listas";

export async function guardarListas(listas: ListaEmpaque[]): Promise<void>{
    try{
        const json = JSON.stringify(listas);
        await AsyncStorage.setItem(KEY_LISTAS, json);
        }catch (error){
            console.warn("No se pudieron guardar las listas", error);
        }
    }

export async function cargarListas(): Promise<ListaEmpaque[]>{
    try{
        const json =await AsyncStorage.getItem(KEY_LISTAS);
        return json ? (JSON.parse(json)as ListaEmpaque[]): []; 
    }catch (error){
        return [];
        console.warn("No se pudieron cargar las listas", error);
        
    }
}

