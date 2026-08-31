import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {Text} from "react-native";
import { colors } from "../constants/colors";
import HomeScreen from "../screens/HomeScreen";
import NewListScreen from "../screens/NewListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MainTabParamList } from "../constants";

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONOS: Record<keyof MainTabParamList, string> = {
  Inicio: "🏠",
  NuevaLista: "➕",
  Perfil: "👤",
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: () => <Text style={{ fontSize: 18 }}>{ICONOS[route.name as keyof MainTabParamList]}</Text>,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="NuevaLista" component={NewListScreen} options={{ title: "Nueva lista" }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}