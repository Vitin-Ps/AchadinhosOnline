import { HStack, ScrollView, Text } from 'native-base'
import Titulo from '../../components/Titulo'
import { Temas } from '../../estilos/tema'
import { EntradaTexto } from '../../components/EntradaTexto'
import Botao from '../../components/Botao'
import { useState } from 'react'
import { Produto, ProdutoDTO } from '../../interfaces/Produto'
import { faMoneyBill, faShirt } from '@fortawesome/free-solid-svg-icons'
import { EntradaArquivo } from './EntradaArquivo'
import { cadastrarProduto } from '../../services/ProdutoService'
import { FileUpload } from '../../interfaces/FileUpload'

export default function CadastroFuncionario({ navigation }: any) {
  const [dados, setDados] = useState({} as Produto)
  const [image, setImage] = useState<FileUpload>()

  const handleSelecionarImagem = (imagemSelecionada: FileUpload) => {
    if(imagemSelecionada !== null) setImage(imagemSelecionada)
  }

  async function cadastrar() {
    const res = await cadastrarProduto(dados, image!)
    if (!res) {
      console.log('Erro:', res)
      return;
    }
    else navigation.replace('Tabs')
  }

  return (
    <ScrollView flex={1} p={2} backgroundColor={Temas.colors.padrao.corFundo}>
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
        <EntradaTexto label='nome' icon={faShirt} placeholder="Digite seu nome" onChangeText={(text) => setDados({...dados, nome: text})}/>
        <EntradaTexto label='valor' icon={faMoneyBill} placeholder="Digite o valor" 
        onChangeText={(text) => setDados({...dados, valor: Number(text)})}/>
        <EntradaArquivo onImagemSelecionada={handleSelecionarImagem} />
        <Botao>
          <Text
            fontWeight="bold"
            color={Temas.colors.white}
            fontSize={20}
            onPress={() => cadastrar()}
          >
            Cadastrar
          </Text>
        </Botao>
      </HStack>
    </ScrollView>
  )
}
