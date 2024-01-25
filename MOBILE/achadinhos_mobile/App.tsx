import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text } from 'native-base';
import Rotas from './src/Rotas';
import { Temas } from './src/estilos/tema';

export default function App() {
  return (
    <NativeBaseProvider theme={Temas}>
      <StatusBar backgroundColor={Temas.colors.roxo.normal}/>
      {/* <Text mt={10}>Teste</Text> */}
      <Rotas/>
    </NativeBaseProvider>
  );
}
