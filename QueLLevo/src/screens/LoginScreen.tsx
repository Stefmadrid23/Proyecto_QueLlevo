import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { RootStackParamList} from "../constants";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useTema } from "../store/useTema";
import { validarEmail, validarPassword, validarTexto, validarTelefono } from "../constants/validation";
import { registrarUsuario, iniciarSesionConSupabase } from "../store/slices/userSlice";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

interface Errores {
  nombre?: string | null;
  email?: string | null;
  telefono?: string | null;
  password?: string | null;
}

export default function LoginScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const {colores } = useTema();
  const styles = getStyles (colores);
  const cargando = useAppSelector((state) => state.usuario.cargando);
  const errorSupabase = useAppSelector ((state) => state.usuario.error);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [esRegistro, setEsRegistro] = useState(false);
  
  

  function validarFormulario(): boolean {
    const nuevosErrores: Errores = {
      email: validarEmail(email),
      password: validarPassword(password),
      ...(esRegistro && {
        nombre: validarTexto(nombre),
        telefono: validarTelefono(telefono),
      }),
    };
    setErrores(nuevosErrores);
    return Object.values(nuevosErrores).every((e) => !e);
  }

  async function manejarEnvio() {
    if (!validarFormulario()) return;

    const resultado = esRegistro
      ? await dispatch(registrarUsuario({ nombre, email, telefono, password }))
      : await dispatch(iniciarSesionConSupabase({ email, password }));

    if (resultado.meta.requestStatus === "fulfilled") {
      navigation.replace("Main");
    }
  }

  return (
    <KeyboardAvoidingView style={styles.contenedor} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Image source={require("../../assets/maleta.png")} style={styles.logo} />
        <Text style={styles.titulo}>¿Qué Llevo?</Text>
        <Text style={styles.subtitulo}>
          {esRegistro ? "Crea tu cuenta" : "Nunca más olvides algo importante al salir de casa"}
        </Text>

        <View style={styles.formulario}>
          {esRegistro && (
            <>
              <CustomInput etiqueta="Nombre" valor={nombre} onCambio={setNombre} placeholder="Tu nombre" error={errores.nombre} />
              <CustomInput etiqueta="Teléfono" valor={telefono} onCambio={setTelefono} placeholder="9999-9999" tipoTeclado="phone-pad" error={errores.telefono} />
            </>
          )}
          <CustomInput etiqueta="Correo electrónico" valor={email} onCambio={setEmail} placeholder="nombre@correo.com" tipoTeclado="email-address" autoCapitalizar="none" error={errores.email} />
          <CustomInput etiqueta="Contraseña" valor={password} onCambio={setPassword} placeholder="Mínimo 6 caracteres" esPassword error={errores.password} />

          {errorSupabase && <Text style={styles.errorSupabase}>{errorSupabase}</Text>}

          <CustomButton
            titulo={esRegistro ? "Crear cuenta" : "Ingresar"}
            onPress={manejarEnvio}
            cargando={cargando}
            estilo={{ marginTop: 8 }}
          />

          <TouchableOpacity onPress={() => setEsRegistro(!esRegistro)} style={styles.toggle}>
            <Text style={styles.toggleTexto}>
              {esRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function getStyles(colores: ReturnType<typeof useTema>["colores"]) {
  return StyleSheet.create({
    contenedor: { flex: 1, backgroundColor: colores.background },
    scroll: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 },
    logo: { width: 84, height: 84, marginBottom: 16 },
    titulo: { fontSize: 26, fontWeight: "800", color: colores.text },
    subtitulo: { fontSize: 14, color: colores.textMuted, textAlign: "center", marginTop: 6, marginBottom: 24 },
    formulario: { width: "100%" },
    errorSupabase: { color: colores.danger, fontSize: 13, textAlign: "center", marginBottom: 8 },
    toggle: { marginTop: 16, alignItems: "center" },
    toggleTexto: { color: colores.primary, fontSize: 13, fontWeight: "600" },
  });
}