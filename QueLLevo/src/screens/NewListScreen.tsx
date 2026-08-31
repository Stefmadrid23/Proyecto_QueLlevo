import { useNavigation } from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import React, {useState} from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { colors, listColors } from "../constants/colors";
import { MainTabParamList, ListaEmpaque, ItemLista } from "../constants";
import { cargarListas, guardarListas } from "../constants/storage";
import { validarRequerido, validarTexto } from "../constants/validation";

type Navigation = BottomTabNavigationProp<MainTabParamList, "NuevaLista">;

const SUGERENCIAS: { actividad: string; items: string[] }[] = [
  { actividad: "Ir a clases", items: ["Cuaderno", "Lapicero", "Laptop", "Botella de agua"] },
  { actividad: "Hacer ejercicio", items: ["Ropa deportiva", "Toalla", "Botella de agua", "Audífonos"] },
  { actividad: "Viajar", items: ["Pasaporte", "Cargador", "Ropa", "Cepillo de dientes"] },
];

export default function NewListScreen() {
  const navigation = useNavigation<Navigation>();

  const [titulo, setTitulo] = useState("");
  const [actividad, setActividad] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState(listColors[0]);
  const [nuevoItem, setNuevoItem] = useState("");
  const [items, setItems] = useState<ItemLista[]>([]);
  const [errorTitulo, setErrorTitulo] = useState<string | null>(null);
  const [errorActividad, setErrorActividad] = useState<string | null>(null);

  function aplicarSugerencia(sugerencia: (typeof SUGERENCIAS)[number]) {
    setActividad(sugerencia.actividad);
    if (!titulo) setTitulo(sugerencia.actividad);
    setItems(sugerencia.items.map((nombre) => ({ id: `${Date.now()}-${nombre}`, nombre, empacado: false })));
  }

  function agregarItem() {
    const error = validarRequerido(nuevoItem);
    if (error) return;
    setItems((prev) => [...prev, { id: `${Date.now()}`, nombre: nuevoItem.trim(), empacado: false }]);
    setNuevoItem("");
  }

  function quitarItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function guardarLista() {
    const eTitulo = validarTexto(titulo);
    const eActividad = validarRequerido(actividad);
    setErrorTitulo(eTitulo);
    setErrorActividad(eActividad);
    if (eTitulo || eActividad) return;

    const nuevaLista: ListaEmpaque = {
      id: `${Date.now()}`,
      titulo: titulo.trim(),
      actividad: actividad.trim(),
      color: colorSeleccionado,
      items,
      creadaEn: Date.now(),
    };

    const listasActuales = await cargarListas();
    await guardarListas([...listasActuales, nuevaLista]);

    setTitulo("");
    setActividad("");
    setItems([]);
    navigation.navigate("Inicio");
  }
return (
    <ScrollView style={styles.contenedor} contentContainerStyle={styles.scroll}>
      <Text style={styles.encabezado}>Nueva lista</Text>

      <Text style={styles.subEncabezado}>Sugerencias rápidas</Text>
      <View style={styles.filaSugerencias}>
        {SUGERENCIAS.map((s) => (
          <TouchableOpacity key={s.actividad} style={styles.chip} onPress={() => aplicarSugerencia(s)}>
            <Text style={styles.chipTexto}>{s.actividad}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomInput etiqueta="Título de la lista" valor={titulo} onCambio={setTitulo} placeholder="Ej: Mi mochila de clases" error={errorTitulo} />
      <CustomInput etiqueta="Actividad" valor={actividad} onCambio={setActividad} placeholder="Ej: Ir a clases" error={errorActividad} />

      <Text style={styles.subEncabezado}>Color de la lista</Text>
      <View style={styles.filaColores}>
        {listColors.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setColorSeleccionado(c)}
            style={[styles.circuloColor, { backgroundColor: c }, colorSeleccionado === c && styles.circuloSeleccionado]}
          />
        ))}
      </View>

       <Text style={styles.subEncabezado}>Objetos a llevar</Text>
      <View style={styles.filaAgregarItem}>
        <View style={{ flex: 1 }}>
          <CustomInput etiqueta="" valor={nuevoItem} onCambio={setNuevoItem} placeholder="Ej: Botella de agua" />
        </View>
        <TouchableOpacity style={styles.botonAgregar} onPress={agregarItem}>
          <Text style={styles.botonAgregarTexto}>+</Text>
        </TouchableOpacity>
      </View>

      {items.map((item) => (
        <View key={item.id} style={styles.itemPreview}>
          <Text style={styles.itemPreviewTexto}>• {item.nombre}</Text>
          <TouchableOpacity onPress={() => quitarItem(item.id)}>
            <Text style={styles.itemQuitar}>Quitar</Text>
          </TouchableOpacity>
        </View>
      ))}

      <CustomButton titulo="Guardar lista" onPress={guardarLista} estilo={{ marginTop: 24, marginBottom: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20 },
  scroll: { paddingTop: 16 },
  encabezado: { fontSize: 24, fontWeight: "800", color: colors.text, marginBottom: 16 },
  subEncabezado: { fontSize: 14, fontWeight: "700", color: colors.textMuted, marginBottom: 10, marginTop: 4 },
  filaSugerencias: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },
  chip: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, marginRight: 8, marginBottom: 8 },
  chipTexto: { color: colors.primary, fontWeight: "600", fontSize: 13 },
  filaColores: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  circuloColor: { width: 32, height: 32, borderRadius: 16, marginRight: 12, borderWidth: 2, borderColor: "transparent" },
  circuloSeleccionado: { borderColor: colors.text },
  filaAgregarItem: { flexDirection: "row", alignItems: "flex-start" },
  botonAgregar: { backgroundColor: colors.primary, width: 48, height: 48, borderRadius: 10, justifyContent: "center", alignItems: "center", marginLeft: 10, marginTop: 2 },
  botonAgregarTexto: { color: "#fff", fontSize: 22, fontWeight: "700" },
  itemPreview: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  itemPreviewTexto: { color: colors.text, fontSize: 14 },
  itemQuitar: { color: colors.danger, fontSize: 12, fontWeight: "600" },
});