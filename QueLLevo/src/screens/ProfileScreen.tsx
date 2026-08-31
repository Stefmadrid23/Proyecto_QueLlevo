import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { colors } from "../constants/colors";
import { MainTabParamList, RootStackParamList } from "../constants";

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Inicio">,   
  NativeStackNavigationProp<RootStackParamList>
>;

export default function ProfileScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <View style={styles.contenedor}>
      <Image source={require("../../assets/maleta.png")} style={styles.avatar} />
      <Text style={styles.titulo}>Mi perfil</Text>
      <Text style={styles.texto}>Administra tus datos y cierra sesión desde aquí.</Text>

      <CustomButton
        titulo="Cerrar sesión"
        variante="secundario"
        onPress={() => navigation.getParent<NativeStackNavigationProp<RootStackParamList>>()?.replace?.("Login")}
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