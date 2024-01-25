import { Image, ScrollView, Text, VStack } from 'native-base'
import { Temas } from '../estilos/tema'
import Titulo from '../components/Titulo'

export default function Sobre({ navigation }) {
  return (
    <ScrollView flex={1} backgroundColor={Temas.colors.cinza.escuro} p={10}>
      <Titulo>
        <Text color={Temas.colors.roxo.claro}>Achadinhos</Text>
        <Text color={Temas.colors.verde.normal}>Online</Text>
      </Titulo>
      <Text
        color="white"
        fontSize={17}
        mt={10}
        lineHeight={30}
      >
        O Achadinhos Online visa democratizar a moda, proporcionando uma
        alternativa sustentável e acessível para aqueles que desejam se
        expressar através de seu estilo pessoal. Nosso objetivo é criar uma
        comunidade online onde as pessoas possam descobrir tesouros de moda a
        preços acessíveis, promovendo a reutilização e a conscientização
        ambiental. Queremos facilitar a experiência de compra, tornando a moda
        mais inclusiva, diversificada e amigável para todos os orçamentos.
      </Text>
      <Text
        color="white"
        fontSize={17}
        mt={20}
        mb={20}
        lineHeight={30}
        textAlign="center"

      >&copy; 2024 AchadinhosOnline. Todos os direitos reservados.</Text>
    </ScrollView>
  )
}