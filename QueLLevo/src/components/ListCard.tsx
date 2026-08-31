import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { ListaEmpaque } from "../constants";

interface ListaCardProps {
  lista: ListaEmpaque;
  onPress: () => void;
}

export default function ListCard({ lista, onPress }: ListaCardProps) {
  const total = lista.items.length;
  const empacados = lista.items.filter((i) => i.empacado).length;
  const completa = total > 0 && empacados === total;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.barraColor, { backgroundColor: lista.color }]} />
      <View style={styles.contenido}>
        <Text style={styles.titulo}>{lista.titulo}</Text>
        <Text style={styles.actividad}>{lista.actividad}</Text>
        <Text style={[styles.progreso, completa ? styles.progresoCompleto : styles.progresoPendiente]}>
          {total === 0 ? "Sin objetos" : `${empacados}/${total} empacados`}
          {completa ? " ✓" : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 14,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  barraColor: { width: 6 },
  contenido: { flex: 1, padding: 14 },
  titulo: { fontSize: 16, fontWeight: "700", color: colors.text },
  actividad: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  progreso: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8,
  },
  progresoCompleto: {
    color: colors.success,
  },
  progresoPendiente: {
    color: colors.primary,
  },
});