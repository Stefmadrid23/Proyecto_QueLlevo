import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Store } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from './src/store/hooks';
import { cargarListasDesdeStorage } from './src/store/slices/listaSlice';
import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/store/store';
import { cargarTemaDesdeStorage } from './src/store/slices/temaSlice';

function InicioApp (){
  const dispatch = useAppDispatch();
  const modo = useAppSelector((state) => state.tema.modo);

  useEffect(() => {
    dispatch(cargarListasDesdeStorage());
    dispatch(cargarTemaDesdeStorage());
  }, [dispatch]);

  return (
  <>
  <StatusBar style={modo === "oscuro" ? "light": "dark"} />
  <RootNavigator />
  </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <InicioApp />
    </SafeAreaProvider>
    </Provider>
  );
}


