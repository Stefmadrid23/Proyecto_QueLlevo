import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { colors } from "../constants/colors";
import { RootStackParamList } from "../constants";
import { validarEmail, validarPassword, validaTelefono, validarTexto } from "../constants/validation";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

interface Errores {
  nombre?: string | null;
  email?: string | null;
  telefono?: string | null;
  password?: string | null;
}

export default function LoginScreen({ navigation }: Props) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [cargando, setCargando] = useState(false);

  function ValidarFormulario(): boolean {
    const nuevosErrores: Errores = {
      nombre: validarTexto(nombre),
      email: validarEmail(email),
      telefono: validaTelefono(telefono),
      password: validarPassword(password),
    };
    setErrores(nuevosErrores);
    return Object.values(nuevosErrores).every((e) => e === null);
  }

  function manejarIngreso() {
    if (!ValidarFormulario()) return;
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      navigation.replace("Main");
    }, 600);
  }

  return (
    <KeyboardAvoidingView style={styles.contenedor} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Image source={require("../../assets/maleta.png")} style={styles.logo} />
        <Text style={styles.titulo}>¿Qué Llevo?</Text>
        <Text style={styles.subtitulo}>Nunca más olvides algo importante al salir de casa</Text>

        <View style={styles.formulario}>
          <CustomInput etiqueta="Nombre" valor={nombre} onCambio={setNombre} placeholder="Tu nombre" error={errores.nombre} />
          <CustomInput etiqueta="Correo electrónico" valor={email} onCambio={setEmail} placeholder="nombre@correo.com" tipoTeclado="email-address" autoCapitalizar="none" error={errores.email} />
          <CustomInput etiqueta="Teléfono" valor={telefono} onCambio={setTelefono} placeholder="9999-9999" tipoTeclado="phone-pad" error={errores.telefono} />
          <CustomInput etiqueta="Contraseña" valor={password} onCambio={setPassword} placeholder="Mínimo 6 caracteres" esPassword error={errores.password} />
          <CustomButton titulo="Ingresar" onPress={manejarIngreso} cargando={cargando} estilo={{ marginTop: 8 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  logo: { width: 84, height: 84, marginBottom: 16 },
  titulo: { fontSize: 26, fontWeight: "800", color: colors.text },
  subtitulo: { fontSize: 14, color: colors.textMuted, textAlign: "center", marginTop: 6, marginBottom: 24 },
  formulario: { width: "100%" },
});