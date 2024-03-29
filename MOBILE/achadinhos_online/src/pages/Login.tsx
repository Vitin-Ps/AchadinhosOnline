import {Box, Image, KeyboardAvoidingView, Text, useToast} from 'native-base';
import {Temas} from '../estilos/tema';
import {Platform} from 'react-native';
import Logo from '../assets/imagens/Logo.png';
import {useEffect, useState} from 'react';
import {EntradaTexto} from '../components/EntradaTexto';
import Botao, {EstadoClick} from '../components/Botao';
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fazerLogin} from '../services/AutenticacaoServico';
import {validadeToken} from '../services/TokenService';
import Titulo from '../components/Titulo';

export default function Login({navigation, route}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const toast = useToast();
  const { roleAutorizacao } = route.params;

  useEffect(() => {
    async function verificarLogin() {
      setCarregando(false);
      const token = await AsyncStorage.getItem('token');
      if (token && validadeToken(token)) {
        navigation.replace('Tabs');
      }
      if(!validadeToken(token!)) AsyncStorage.removeItem('token')
      setCarregando(true);
    }
    verificarLogin();
  }, []);

  async function efetuarLogin() {
    EstadoClick(setIsLoading);
    const resultado = await fazerLogin(login, senha);
    console.log(resultado);
    if (!login || !senha) {
      toast.show({
        title: 'Erro no Login',
        description: 'Preeencha todos os Campos',
        backgroundColor: 'red.500',
      });
    } else if (resultado) {
      console.log('voltou');
      const {token}: any = resultado;
      AsyncStorage.setItem('token', token);
      roleAutorizacao()
      navigation.replace('Tabs');
    } else {
      toast.show({
        title: 'Erro no login',
        description: 'E-mail ou Senha incorretos',
        backgroundColor: 'red.500',
      });
    }

    console.log('saiu do else: ', resultado);
  }

  if(!carregando) return null;

  return (
    <KeyboardAvoidingView
      backgroundColor={Temas.colors.white}
      alignItems="center"
      justifyContent="center"
      flex={1}
      p={5}
      h={{
        base: '100px',
        lg: 'auto',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image source={Logo} alt="Logo Lojinha" w={150} h={150} />
      <Titulo mb={3}>
        <Text color={Temas.colors.verde.normal}>Achadinhos</Text>
        <Text color={Temas.colors.roxo.normal}>Online</Text>
      </Titulo>
      <Box>
        <EntradaTexto
          icon={faUser}
          placeholder="Digite seu nome"
          label="login"
          value={login}
          onChangeText={setLogin}
        />
        <EntradaTexto
          icon={faKey}
          placeholder="Digite sua senha"
          senha
          label="senha"
          value={senha}
          onChangeText={setSenha}
        />
      </Box>
      <Botao isLoading={isLoading} onPress={efetuarLogin}>
        <Text fontSize={20} fontWeight="bold" color="white">
          Entrar
        </Text>
      </Botao>
    </KeyboardAvoidingView>
  );
}
