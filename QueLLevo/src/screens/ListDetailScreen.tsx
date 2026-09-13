import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import ItemRow from "../components/ItemRow";
import { colors } from "../constants/colors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { alternarItem, eliminarItem, eliminarLista } from "../store/slices/listaSlice";


export default function ListDetailScreen({ route, navigation }: any) {
  const { listaId } = route.params;
  const dispatch = useAppDispatch();
  const lista = useAppSelector((state) =>
    state.listas.items.find((l) => l.id === listaId)
  );

  if (!lista){
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoVacio}>Esta lista ya no existe.</Text>
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
        renderItem={({ item }) => (
          <ItemRow
             item={item}
            onAlternar={(itemId) => dispatch(alternarItem({ listaId, itemId }))}
            onEliminar={(itemId) => dispatch(eliminarItem({ listaId, itemId }))}  />
        )}
        ListEmptyComponent={<Text style={styles.textoVacio}>Esta lista no tiene objetos todavía.</Text>}
      />

      <CustomButton
      titulo="Eliminar lista"
      variante="peligro"
      onPress={() => {
        dispatch(eliminarLista(listaId));
        navigation.goBack();
      }}
      />
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