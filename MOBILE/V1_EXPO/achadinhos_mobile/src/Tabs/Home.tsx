import { HStack, ScrollView, Text } from 'native-base'
import { Temas } from '../estilos/tema'
import { CardCadastro } from '../components/CardCadastro'
import Titulo from '../components/Titulo'

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
        <Titulo>
          <Text color={Temas.colors.roxo.escuro}>Achadinhos</Text>
          <Text color={Temas.colors.verde.normal}>Online</Text>
        </Titulo>

        <CardCadastro
          icon="person"
          titulo="Funcionários"
          descricao="Clique aqui para cadastrar novos Funcionários"
          onPress={() => navigation.navigate('CadastroFuncionario')}
        />
        <CardCadastro
          icon="cart-outline"
          titulo="Vendas"
          descricao="Registre as vendas feitas por Clientes"
          onPress={() => navigation.navigate('CadastroVendas')}
        />
        <CardCadastro
          icon="shirt"
          titulo="Produtos"
          descricao="Cadastre novos Produtos"
          onPress={() => navigation.navigate('CadastroProduto')}
        />
      </HStack>
    </ScrollView>
  )
}
