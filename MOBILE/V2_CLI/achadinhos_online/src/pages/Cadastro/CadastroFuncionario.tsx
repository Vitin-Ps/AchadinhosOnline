import { HStack, ScrollView, Text } from 'native-base'
import Titulo from '../../components/Titulo'
import { Temas } from '../../estilos/tema'
import { EntradaTexto } from '../../components/EntradaTexto'
import Botao from '../../components/Botao'
import { useState } from 'react'
import { ProdutoDTO } from '../../interfaces/Produto'
import { faMoneyBill, faShirt } from '@fortawesome/free-solid-svg-icons'
import { EntradaArquivo } from './EntradaArquivo'
import { cadastrarProduto } from '../../services/ProdutoService'

export default function CadastroFuncionario({ navigation }: any) {
  const [dados, setDados] = useState({} as ProdutoDTO)

  const handleSelecionarImagem = (imagemSelecionada: File | null) => {
    if(imagemSelecionada !== null) setDados({...dados, imagem: imagemSelecionada!});
  }

  async function cadastrar() {
    console.log('chegou')
    console.log('dados:', dados)

    const res = await cadastrarProduto(dados)
    // if (!res) console.log('Erro:', res)
    // else navigation.replace('Tabs')
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
        <EntradaTexto icon={faShirt} placeholder="Digite seu nome" onChangeText={(text) => setDados({...dados, nome: text})}/>
        <EntradaTexto icon={faMoneyBill} placeholder="Digite o valor" 
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
