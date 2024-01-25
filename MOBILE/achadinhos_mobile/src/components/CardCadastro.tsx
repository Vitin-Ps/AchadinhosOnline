import { Box, Icon, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Temas } from '../estilos/tema'

interface Card {
    icon: string,
    titulo: string,
    descricao: string
}

export function CardCadastro(card: Card, ...rest) {
  return (
    <Box
      backgroundColor="white"
      w={220}
      h={250}
      m="auto"
      mt={5}
      justifyContent="center"
      alignItems="center"
      p={2}
      shadow={3}
      borderRadius={15}
      {...rest}
    >
      <Icon
        as={<Ionicons name={card.icon} />}
        color={Temas.colors.roxo.normal}
        size={85}
        mb={5}
      />
      <Text fontSize={20} fontWeight="bold" color={Temas.colors.verde.normal}>
        {card.titulo}
      </Text>
      <Text color={Temas.colors.cinza.claro} textAlign="center" mt={2}>
        {card.descricao}
      </Text>
    </Box>
  )
}
