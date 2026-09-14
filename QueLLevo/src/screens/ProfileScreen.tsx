import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import React from "react";
import { Image, StyleSheet, Switch ,Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { cerrarSesion } from "../store/slices/userSlice";
import { alternarTema } from "../store/slices/temaSlice";
import { useTema } from "../store/useTema";


export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const usuario = useAppSelector((state) => state.usuario.datos);
  const { modo, colores} = useTema();
  const styles = getStyles(colores);

  return (
    <View style={styles.contenedor}>
      <Image source={require("../../assets/maleta.png")} style={styles.avatar} />
      <Text style={styles.titulo}>{usuario?.nombre ?? "Mi perfil"}</Text>
      <Text style={styles.texto}>{usuario?.email}</Text>
      <Text style={styles.texto}>{usuario?.telefono}</Text>

      <View style={styles.filaTema}>
        <Text style={styles.textoTema}>Tema oscuro</Text>
        <Switch
          value={modo === "oscuro"}
          onValueChange={() => {
            dispatch(alternarTema());
          }}
          trackColor={{ false: colores.border, true: colores.primary }}
        />
      </View>
      

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

function getStyles(colores: ReturnType<typeof useTema>["colores"]){
 return StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.background, alignItems: "center", paddingTop: 48, paddingHorizontal: 24 },
  avatar: { width: 96, height: 96, marginBottom: 16, borderRadius: 20 },
  titulo: { fontSize: 22, fontWeight: "800", color: colores.text },
  texto: { fontSize: 14, color: colores.textMuted, textAlign: "center", marginTop: 4},
  filaTema: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    backgroundColor: colores.card,
    borderRadius: 12,
    padding: 16,
    marginTop:24,
  },
  textoTema: { fontSize: 15, fontWeight: "600", color: colores.text},
});

}