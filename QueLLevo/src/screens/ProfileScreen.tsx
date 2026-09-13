import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { colors } from "../constants/colors";
import { cerrarSesion } from "../store/slices/userSlice";


export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const usuario = useAppSelector((state) => state.usuario.datos);

  return (
    <View style={styles.contenedor}>
      <Image source={require("../../assets/maleta.png")} style={styles.avatar} />
      <Text style={styles.titulo}>{usuario?.nombre ?? "Mi perfil"}</Text>
      <Text style={styles.texto}>{usuario?.email}</Text>
      <Text style={styles.texto}>{usuario?.telefono}</Text>
      

      <CustomButton
        titulo="Cerrar sesión"
        variante="secundario"
        onPress={() => {
          dispatch(cerrarSesion());
          navigation.getParent()?.replace?.("Login")
        }}
        estilo={{ marginTop: 24, width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background, alignItems: "center", paddingTop: 48, paddingHorizontal: 24 },
  avatar: { width: 96, height: 96, marginBottom: 16, borderRadius: 20 },
  titulo: { fontSize: 22, fontWeight: "800", color: colors.text },
  texto: { fontSize: 14, color: colors.textMuted, textAlign: "center", marginTop: 8 },
});