import { useAppSelector } from "./hooks";
import { paletaClara, paletaOscura } from "../constants/colors";

export function useTema() {
  const modo = useAppSelector((state) => state.tema.modo);
  const colores = modo === "oscuro" ? paletaOscura : paletaClara;
  return { modo, colores };
}
