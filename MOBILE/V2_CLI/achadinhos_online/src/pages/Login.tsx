import { Box, Image, KeyboardAvoidingView, Text } from 'native-base'
import { Temas } from '../estilos/tema'
import { Platform } from 'react-native'
import Logo from '../assets/imagens/Logo.png'
import { useState } from 'react'
import { EntradaTexto } from '../components/EntradaTexto'
import Botao, { EstadoClick } from '../components/Botao'

export default function Login({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false)

  function login() {
    EstadoClick(setIsLoading)
    navigation.replace('Tabs')
  }

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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image source={Logo} alt="Logo Lojinha" w={150} h={150} />
      <Box>
        <EntradaTexto icon="person" placeholder="Digite seu nome" />
        <EntradaTexto icon="key" placeholder="Digite sua senha" senha />
      </Box>
      <Botao isLoading={isLoading} onPress={login}>
        <Text fontSize={20} fontWeight="bold" color="white">
          Entrar
        </Text>
      </Botao>
    </KeyboardAvoidingView>
  )
}
