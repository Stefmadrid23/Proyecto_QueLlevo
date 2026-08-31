import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useFocusEffect, CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React, {useCallback, useState} from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ListCard from "../components/ListCard";
import { colors } from "../constants/colors";
import { MainTabParamList, RootStackParamList, ListaEmpaque } from "../constants";
import { cargarListas } from "../constants/storage";



type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Inicio">,   
  NativeStackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const [listas, setListas] = useState<ListaEmpaque[]>([]);

  useFocusEffect(
    useCallback(() => {
      let activo = true;
      cargarListas().then((datos) => {
        if (activo) setListas(datos.sort((a, b) => b.creadaEn - a.creadaEn));
      });
      return () => { activo = false; };
    }, [])
  );

   return (
    <View style={styles.contenedor}>
      <Text style={styles.encabezado}>Tus listas</Text>

      {listas.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={styles.vacioTitulo}>Aún no tienes listas</Text>
          <Text style={styles.vacioTexto}>Ve a "Nueva lista" para crear tu primera lista de objetos a llevar.</Text>
        </View>
      ) : (
        <FlatList
          data={listas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <ListCard lista={item} onPress={() => navigation.navigate("DetalleLista", { listaId: item.id })} />
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 16 },
  encabezado: { fontSize: 24, fontWeight: "800", color: colors.text, marginBottom: 16 },
  lista: { paddingBottom: 24 },
  vacio: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
  vacioTitulo: { fontSize: 17, fontWeight: "700", color: colors.text, marginBottom: 6 },
  vacioTexto: { fontSize: 14, color: colors.textMuted, textAlign: "center" },
});