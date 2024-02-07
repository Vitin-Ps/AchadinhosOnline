import {Box, Button, Icon, Text} from 'native-base';
import {Temas} from '../estilos/tema';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Card {
  icon: IconProp;
  titulo: string;
  descricao: string;
  onPress?: () => void;
}

export function CardCadastro({icon, titulo, descricao, onPress}: Card) {
  return (
    <Button backgroundColor="none" onPress={onPress} mt={5}>
      <Box
        backgroundColor="white"
        w={220}
        h={250}
        justifyContent="center"
        alignItems="center"
        p={2}
        shadow={3}
        borderRadius={15}>
        <Box  mb={5}>
          <FontAwesomeIcon
            icon={icon}
            color={Temas.colors.roxo.normal}
            size={85}
          />
        </Box>
        <Text fontSize={20} fontWeight="bold" color={Temas.colors.verde.normal}>
          {titulo}
        </Text>
        <Text color={Temas.colors.cinza.claro} textAlign="center" mt={2}>
          {descricao}
        </Text>
      </Box>
    </Button>
  );
}
