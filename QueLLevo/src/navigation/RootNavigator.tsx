import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { colors } from "../constants/colors";
import LoginScreen from "../screens/LoginScreen";
import ListDetailScreen from "../screens/ListDetailScreen";
import { RootStackParamList } from "../constants";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700" },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="DetalleLista" component={ListDetailScreen} options={{ title: "Detalle de lista" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}