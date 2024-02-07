import { NativeBaseProvider, StatusBar } from "native-base";
import { Temas } from "./estilos/tema";
import Rotas from "./Rotas";



export default function App() {
  return (
    <NativeBaseProvider theme={Temas}>
      <StatusBar backgroundColor={Temas.colors.roxo.normal} />
        {/* <Text mt={10}>Teste</Text> */}
        <Rotas />
    </NativeBaseProvider>
  );
}
