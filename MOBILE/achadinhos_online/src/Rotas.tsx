import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Temas} from './estilos/tema';
import Login from './pages/Login';
import Tabs from './pages/Tabs';
import CadastroProduto from './pages/Cadastro/CadastroProduto';
import CadastroFuncionario from './pages/Cadastro/CadastroFuncionario';
import CadastroVendas from './pages/Cadastro/CadastroVendas';
import CarrinhoProdutos from './pages/CarrinhoProdutos';
import React from 'react';
import DadosProduto from './pages/Dados/DadosProduto';
import EditProduto from './pages/Edit/EditProduto';
import EditFuncionario from './pages/Edit/EditFuncionario';
import EditVenda from './pages/Edit/EditVenda';
import DadosFuncionario from './pages/Dados/DadosFuncionario';
import DadosVendas from './pages/Dados/DadosVendas';

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
        <Stack.Screen
          name="CarrinhoProdutos"
          component={CarrinhoProdutos as React.FC}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="DadosProduto"
          component={DadosProduto as React.FC}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="DadosFuncionario"
          component={DadosFuncionario as React.FC}
          options={{headerShown: true}}
        />
         <Stack.Screen
          name="DadosVendas"
          component={DadosVendas as React.FC}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="EditProduto"
          component={EditProduto as React.FC}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="EditFuncionario"
          component={EditFuncionario as React.FC}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="EditVenda"
          component={EditVenda as React.FC}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
