import { HStack, ScrollView, Text } from 'native-base'
import Titulo from '../../components/Titulo'
import { Temas } from '../../estilos/tema'
import { EntradaTexto } from '../../components/EntradaTexto'
import Botao from '../../components/Botao'
import { EntradaArquivo } from '../../components/EntradaArquivo'

export default function CadastroFuncionario({ navigation }) {
  const handleSelecionarImagem = (imagemSelecionada) => {
    console.log('Imagem selecionada:', imagemSelecionada)
  }

  function cadastrarProduto() {
    console.log('chegou')
    navigation.replace('Tabs')
  }

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
          <Text color={Temas.colors.black}>Cadastre seu </Text>
          <Text color={Temas.colors.roxo.normal}>Produto</Text>
        </Titulo>
        <EntradaTexto icon="shirt" placeholder="Digite seu nome" />
        <EntradaTexto icon="pricetag" placeholder="Digite o valor" />
        <EntradaArquivo onImagemSelecionada={handleSelecionarImagem} />
        <Botao>
          <Text
            fontWeight="bold"
            color={Temas.colors.white}
            fontSize={20}
            onPress={() => cadastrarProduto()}
          >
            Cadastrar
          </Text>
        </Botao>
      </HStack>
    </ScrollView>
  )
}
