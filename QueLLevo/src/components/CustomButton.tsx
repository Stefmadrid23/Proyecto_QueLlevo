import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../constants/colors"

interface CustomButtonProps {
    titulo: string;
    onPress: () => void;
    variante?: "primario" | "secundario" | "peligro";
    cargando?: boolean;
    deshabilitado?: boolean;
    estilo?: ViewStyle;
}

export default function CustomButton({
    titulo,
    onPress,
    variante ="primario",
    cargando = false,
    deshabilitado = false,
    estilo, 
}: CustomButtonProps){
    const estaDeshabilitado = deshabilitado || cargando;

    return (
        <TouchableOpacity
        style={[
            styles.base,
            variante === "primario" && styles.primario,
            variante === "secundario" && styles.secundario, 
            variante === "peligro" && styles.peligro,
            estaDeshabilitado && styles.deshabilitado,
            estilo,
        ]}
        onPress={onPress}
        disabled={estaDeshabilitado}
        activeOpacity={0.8}
        >
            {cargando?(
                <ActivityIndicator color={variante === "secundario" ? colors.primary: "#fff"}/>
            ):(
                <Text style={[styles.texto, variante === "secundario" && styles.textoSecundario]}>
                    {titulo}
                </Text>
            )}

        </TouchableOpacity>
    );
}

const styles= StyleSheet.create({
    base: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        minHeight: 50,
    },
    primario: {backgroundColor: colors.primary},
    secundario: {backgroundColor: "transparent", borderWidth: 1.5, borderColor: colors.primary},
    peligro: {backgroundColor: colors.danger},
    deshabilitado: {opacity: 0.5},
    texto: { color: "#fff", fontSize: 16, fontWeight: "600"},
    textoSecundario: {color: colors.primary},
});