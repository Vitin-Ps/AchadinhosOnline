import {HStack, ScrollView, Text, useToast} from 'native-base';
import Titulo from '../../components/Titulo';
import {Temas} from '../../estilos/tema';
import {EntradaTexto} from '../../components/EntradaTexto';
import Botao from '../../components/Botao';
import {useEffect, useState} from 'react';
import {Produto} from '../../interfaces/Produto';
import {faMoneyBill, faShirt} from '@fortawesome/free-solid-svg-icons';
import {EntradaArquivo} from '../../components/EntradaArquivo';
import {cadastrarProduto} from '../../services/ProdutoService';
import {FileUpload} from '../../interfaces/FileUpload';
import {EntradaNumber} from '../../components/EntradaNumber';
import ComboBox from '../../components/ComboBox';
import {Funcionario} from '../../interfaces/Funcionario';

export default function CadastroVendas({navigation}: any) {
  const [dados, setDados] = useState({} as Produto);
  const [image, setImage] = useState<FileUpload>();
  const toast = useToast();

  const funcionarios: Funcionario[] = [
    {
      id: 1,
      nome: 'Victor',
      email: 'teste@email.com',
      porcentagem: 33,
    },
    {
      id: 2,
      nome: 'Marcos',
      email: 'teste@email.com',
      porcentagem: 33,
    },
    {
      id: 3,
      nome: 'Vini',
      email: 'teste@email.com',
      porcentagem: 33,
    },
    {
      id: 4,
      nome: 'Joao',
      email: 'teste@email.com',
      porcentagem: 33,
    },
  ];

  const handleSelecionarImagem = (imagemSelecionada: FileUpload) => {
    if (imagemSelecionada !== null) setImage(imagemSelecionada);
  };

  async function cadastrar() {
    if (!dados.nome || !dados.valor) {
      toast.show({
        title: 'Erro ao Cadastrar Produto',
        description: 'Preeencha todos os Campos',
        backgroundColor: 'red.500',
      });
      return;
    }
    const res = await cadastrarProduto(dados, image!);
    if (!res) {
      console.log('Erro:', res);
      return;
    } else navigation.replace('Tabs');
  }

  return (
    <ScrollView flex={1} p={2} backgroundColor={Temas.colors.padrao.corFundo}>
      <HStack
        p={5}
        m={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <Titulo>
          <Text color={Temas.colors.black}>Cadastre seu </Text>
          <Text color={Temas.colors.roxo.normal}>Produto</Text>
        </Titulo>
        <ComboBox label="funcionarioId" items={funcionarios} placeholder='Selecione o Funcionário'/>
        <EntradaNumber
          label="valor"
          value="22"
          icon={faMoneyBill}
          editable={false}
          placeholder="Digite o valor"
          onChangeText={text => setDados({...dados, valor: Number(text)})}
        />
        <Botao>
          <Text
            fontWeight="bold"
            color={Temas.colors.white}
            fontSize={20}
            onPress={() => cadastrar()}>
            Cadastrar
          </Text>
        </Botao>
      </HStack>
    </ScrollView>
  );
}
