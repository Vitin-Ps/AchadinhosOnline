import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Temas } from "./estilos/tema";
import Login from "./pages/Login";
import Tabs from "./pages/Tabs";
import CadastroProduto from "./pages/Cadastro/CadastroProduto";
import CadastroFuncionario from "./pages/Cadastro/CadastroFuncionario";
import CadastroVendas from "./pages/Cadastro/CadastroVendas";


const Stack = createNativeStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: Temas.colors.roxo.normal,
          },
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Login"
          component={Login as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CadastroProduto"
          component={CadastroProduto as React.FC}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="CadastroFuncionario"
          component={CadastroFuncionario as React.FC}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="CadastroVendas"
          component={CadastroVendas as React.FC}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}