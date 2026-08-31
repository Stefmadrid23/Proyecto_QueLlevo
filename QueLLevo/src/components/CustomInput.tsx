import React from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../constants/colors";


interface CustomInputProps{
    etiqueta: string;
    valor: string;
    onCambio: (texto: string) => void;
    error?: string | null;
    placeholder?: string;
    esPassword?: boolean;
    tipoTeclado?: KeyboardTypeOptions;
    autoCapitalizar?: "none" | "sentences" | "words";
}

export default function CustomInput ({
    etiqueta,
    valor,
    onCambio,
    error,
    placeholder,
    esPassword = false,
    tipoTeclado = "default",
    autoCapitalizar = "sentences",
}: CustomInputProps) {
    const tieneError = !!error;

    return(
        <View style={styles.contenedor}>
            <Text style={styles.etiqueta}>{etiqueta}</Text>
            <TextInput
            style={[styles.input,tieneError && styles.inputError]}
            value={valor}
            onChangeText={onCambio}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            secureTextEntry={esPassword}
            keyboardType={tipoTeclado}
            autoCapitalize={autoCapitalizar}
            />
            {tieneError && <Text style={styles.textoError}>{error}</Text>}
        </View>
    );
    
}

const styles= StyleSheet.create({
    contenedor: { marginBottom: 16, width: "100%" },
  etiqueta: { fontSize: 14, fontWeight: "600", color: colors.text, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: colors.card,
    color: colors.text,
  },
  inputError: { borderColor: colors.danger },
  textoError: { color: colors.danger, fontSize: 12, marginTop: 4 },

});