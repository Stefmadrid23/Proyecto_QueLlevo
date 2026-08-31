import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { ItemLista } from "../constants";

interface ItemRowProps {
    item: ItemLista;
    onAlternar: (id: string) => void;
    onEliminar: (id: string) => void;
}

export default function ItemRow({item, onAlternar, onEliminar}: ItemRowProps){
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

const styles= StyleSheet.create({
    fila:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    contenidoIzquierdo: {flexDirection: "row", alignItems: "center", flex:1},
    checkbox:{
        width: 24,
        height:24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    checkboxMarcado: {backgroundColor: colors.success, borderColor: colors.success},
    check: {color: "#fff", fontSize: 14, fontWeight: "bold"},
    texto: { fontSize: 15, color: colors.text, flexShrink: 1},
    textoTachado: {textDecorationLine: "line-through", color: colors.textMuted},
    eliminar: {color: colors.danger, fontSize: 16, paddingHorizontal: 8},
});