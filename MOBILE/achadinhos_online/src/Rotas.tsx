import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Temas} from './estilos/tema';
import Login from './pages/Login';
import Tabs from './pages/Tabs';
import CadastroProduto from './pages/Cadastro/CadastroProduto';
import CadastroFuncionario from './pages/Cadastro/CadastroFuncionario';
import CadastroVendas from './pages/Cadastro/CadastroVendas';
import CarrinhoProdutos from './pages/CarrinhoProdutos';
import React, {useEffect, useState} from 'react';
import DadosProduto from './pages/Dados/DadosProduto';
import EditProduto from './pages/Edit/EditProduto';
import EditFuncionario from './pages/Edit/EditFuncionario';
import DadosFuncionario from './pages/Dados/DadosFuncionario';
import DadosVendas from './pages/Dados/DadosVendas';
import EditVenda from './pages/Edit/EditVenda';
import UnauthorizedScreen from './pages/UnauthorizedScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isAdmin, isFuncionario} from './services/AuthService';

const Stack = createNativeStackNavigator();

export default function Rotas() {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    async function recuperarToken() {
      const getToken = await AsyncStorage.getItem('token');
      if (getToken) {
        setToken(getToken);
      }
    }
    recuperarToken();
  }, []);

  const roleAutorizacao = async () => {
    const newToken = await AsyncStorage.getItem('token');
    if (newToken) {
      setToken(newToken);
    }
  };

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
          component={Login}
          options={{headerShown: false}}
          initialParams={{roleAutorizacao}}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs as React.FC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CadastroProduto"
          component={
            token
              ? isFuncionario(token!)
                ? (CadastroProduto as React.FC)
                : UnauthorizedScreen
              : UnauthorizedScreen
          }
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="CadastroFuncionario"
          component={
            token
              ? isAdmin(token!)
                ? (CadastroFuncionario as React.FC)
                : UnauthorizedScreen
              : UnauthorizedScreen
          }
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="CadastroVendas"
          component={
            token
              ? isFuncionario(token!)
                ? (CadastroVendas as React.FC)
                : UnauthorizedScreen
              : UnauthorizedScreen
          }
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="CarrinhoProdutos"
          component={CarrinhoProdutos as React.FC}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="DadosProduto"
          component={
            token
              ? isAdmin(token!)
                ? (DadosProduto as React.FC)
                : UnauthorizedScreen
              : UnauthorizedScreen
          }
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="DadosFuncionario"
          component={
            token
              ? isAdmin(token!)
                ? (DadosFuncionario as React.FC)
                : UnauthorizedScreen
              : UnauthorizedScreen
          }
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="DadosVendas"
          component={
            token
              ? isAdmin(token!)
                ? (DadosVendas as React.FC)
                : UnauthorizedScreen
              : UnauthorizedScreen
          }
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="EditProduto"
          component={
            token
              ? isAdmin(token!)
                ? (EditProduto as React.FC)
                : UnauthorizedScreen
              : UnauthorizedScreen
          }
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="EditFuncionario"
          component={
            token
              ? isAdmin(token!)
                ? (EditFuncionario as React.FC)
                : UnauthorizedScreen
              : UnauthorizedScreen
          }
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="EditVenda"
          component={
            token
              ? isAdmin(token!)
                ? (EditVenda as React.FC)
                : UnauthorizedScreen
              : UnauthorizedScreen
          }
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
