import { HStack, ScrollView, Text } from 'native-base'
import { Temas } from '../estilos/tema'
import { CardCadastro } from '../components/CardCadastro'

export default function Home({ navigation }) {
  return (
    <ScrollView flex={1} p={2}>
      <HStack
        p={5}
        m={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          mt={5}
          w="100%"
          fontSize={25}
          fontWeight="bold"
          textAlign="center"
        >
          <Text color={Temas.colors.roxo.escuro}>Achadinhos</Text>
          <Text color={Temas.colors.verde.normal}>Online</Text>
        </Text>

        <CardCadastro
          icon="person"
          titulo="Funcionários"
          descricao="Clique aqui para cadastrar novos Funcionários"
        />
        <CardCadastro
          icon="cart-outline"
          titulo="Vendas"
          descricao="Registre as vendas feitas por Clientes"
        />
        <CardCadastro
          icon="shirt"
          titulo="Produtos"
          descricao="Cadastre novos Produtos"
        />
      </HStack>
    </ScrollView>
  )
}
