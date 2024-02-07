import { NativeBaseProvider, StatusBar, Text } from "native-base";
import { Temas } from "./estilos/tema";
import { SafeAreaView } from "react-native";

export default function App() {
  return(
    <NativeBaseProvider theme={Temas}>
      <StatusBar backgroundColor={Temas.colors.roxo.normal}/>
      <SafeAreaView>
      <Text mt={10}>Teste</Text>

      </SafeAreaView>
    </NativeBaseProvider>
  )
}