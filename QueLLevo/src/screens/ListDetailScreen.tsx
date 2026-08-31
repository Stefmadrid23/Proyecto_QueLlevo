import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import ItemRow from "../components/ItemRow";
import { colors } from "../constants/colors";
import { ListaEmpaque, RootStackParamList } from "../constants";
import { cargarListas, guardarListas } from "../constants/storage";

type Props = NativeStackScreenProps<RootStackParamList, "DetalleLista">;

export default function ListDetailScreen({ route, navigation }: Props) {
  const { listaId } = route.params;
  const [lista, setLista] = useState<ListaEmpaque | null>(null);
  const [todasLasListas, setTodasLasListas] = useState<ListaEmpaque[]>([]);

  useEffect(() => {
    cargarListas().then((datos) => {
      setTodasLasListas(datos);
      const encontrada = datos.find((l) => l.id === listaId) ?? null;
      setLista(encontrada);
      navigation.setOptions({ title: encontrada?.titulo ?? "Lista" });
    });
  }, [listaId]);

  async function actualizarLista(listaActualizada: ListaEmpaque) {
    setLista(listaActualizada);
    const nuevas = todasLasListas.map((l) => (l.id === listaActualizada.id ? listaActualizada : l));
    setTodasLasListas(nuevas);
    await guardarListas(nuevas);
  }

  function alternarItem(id: string) {
    if (!lista) return;
    actualizarLista({ ...lista, items: lista.items.map((i) => (i.id === id ? { ...i, empacado: !i.empacado } : i)) });
  }

  function eliminarItem(id: string) {
    if (!lista) return;
    actualizarLista({ ...lista, items: lista.items.filter((i) => i.id !== id) });
  }

  async function eliminarLista() {
    const nuevas = todasLasListas.filter((l) => l.id !== listaId);
    await guardarListas(nuevas);
    navigation.goBack();
  }

  if (!lista) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoVacio}>Cargando lista...</Text>
      </View>
    );
  }

  const total = lista.items.length;
  const empacados = lista.items.filter((i) => i.empacado).length;

  return (
    <View style={styles.contenedor}>
      <View style={[styles.encabezado, { borderLeftColor: lista.color }]}>
        <Text style={styles.actividad}>{lista.actividad}</Text>
        <Text style={styles.progreso}>
          {total === 0 ? "No hay objetos en esta lista" : `${empacados} de ${total} empacados`}
        </Text>
      </View>

       <FlatList
        data={lista.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaItems}
        renderItem={({ item }) => <ItemRow item={item} onAlternar={alternarItem} onEliminar={eliminarItem} />}
        ListEmptyComponent={<Text style={styles.textoVacio}>Esta lista no tiene objetos todavía.</Text>}
      />

      <CustomButton titulo="Eliminar lista" variante="peligro" onPress={eliminarLista} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background, padding: 20 },
  centrado: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background },
  encabezado: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, borderLeftWidth: 5 },
  actividad: { fontSize: 18, fontWeight: "700", color: colors.text },
  progreso: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  listaItems: { flexGrow: 1, paddingBottom: 16 },
  textoVacio: { textAlign: "center", color: colors.textMuted, marginTop: 24 },
});