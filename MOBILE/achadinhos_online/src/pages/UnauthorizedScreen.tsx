import {Image, Text, View} from 'native-base';
import Titulo from '../components/Titulo';
import {Temas} from '../estilos/tema';
import Logo from '../assets/imagens/Logo.png';
import ProgressBar from '../components/ProgressBar';
import { useEffect } from 'react';

export default function UnauthorizedScreen({navigation}: any) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Tabs')
        }, 2000);
    }, [])
  return (
    <View
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgColor={Temas.colors.white}>
      <Text fontSize={30} fontWeight="bold" color={Temas.colors.red[400]}>
        Erro 403
      </Text>
      <Titulo mb={1}>
        <Text color={Temas.colors.verde.normal}>Achadinhos</Text>
        <Text color={Temas.colors.roxo.normal}>Online</Text>
      </Titulo>
      <Image source={Logo} alt="Logo Lojinha" w={150} h={150} />
      <Titulo mb={1}>
        <Text color={Temas.colors.verde.normal}>Página não </Text>
        <Text color={Temas.colors.roxo.normal}>Autorizada</Text>
      </Titulo>
      <ProgressBar duracao={2000}/>
    </View>
  );
}
