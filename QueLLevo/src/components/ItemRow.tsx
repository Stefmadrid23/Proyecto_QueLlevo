import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ItemLista } from "../constants";
import { useTema } from "../store/useTema";

interface ItemRowProps {
    item: ItemLista;
    onAlternar: (id: string) => void;
    onEliminar: (id: string) => void;
}

export default function ItemRow({item, onAlternar, onEliminar}: ItemRowProps){
  const { colores } = useTema();
  const styles =getStyles (colores);

    return(
         <View style={styles.fila}>
      <TouchableOpacity style={styles.contenidoIzquierdo} onPress={() => onAlternar(item.id)} activeOpacity={0.6}>
        <View style={[styles.checkbox, item.empacado && styles.checkboxMarcado]}>
          {item.empacado && <Text style={styles.check}>✓</Text>}
        </View>
        <Text style={[styles.texto, item.empacado && styles.textoTachado]}>{item.nombre}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onEliminar(item.id)}>
        <Text style={styles.eliminar}>✕</Text>
      </TouchableOpacity>
    </View>
    );
}

function getStyles(colores: ReturnType<typeof useTema> ["colores"]){
   return StyleSheet.create({
    fila:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: colores.border,
    },
    contenidoIzquierdo: {flexDirection: "row", alignItems: "center", flex:1},
    checkbox:{
        width: 24,
        height:24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colores.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    checkboxMarcado: {backgroundColor: colores.success, borderColor: colores.success},
    check: {color: "#fff", fontSize: 14, fontWeight: "bold"},
    texto: { fontSize: 15, color: colores.text, flexShrink: 1},
    textoTachado: {textDecorationLine: "line-through", color: colores.textMuted},
    eliminar: {color: colores.danger, fontSize: 16, paddingHorizontal: 8},
});
}