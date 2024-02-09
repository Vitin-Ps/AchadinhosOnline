import {Box, HStack, ScrollView, Text, useToast} from 'native-base';
import Titulo from '../../components/Titulo';
import {Temas} from '../../estilos/tema';
import {EntradaTexto} from '../../components/EntradaTexto';
import Botao from '../../components/Botao';
import {useEffect, useState} from 'react';
import {Produto} from '../../interfaces/Produto';
import {
  faCartShopping,
  faEdit,
  faMoneyBill,
  faShirt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import {EntradaArquivo} from '../../components/EntradaArquivo';
import {cadastrarProduto} from '../../services/ProdutoService';
import {FileUpload} from '../../interfaces/FileUpload';
import {EntradaNumber} from '../../components/EntradaNumber';
import ComboBox from '../../components/ComboBox';
import {Funcionario} from '../../interfaces/Funcionario';
import {listarFuncionariosAll} from '../../services/FuncionarioService';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function CadastroVendas({navigation}: any) {
  const [dados, setDados] = useState({} as Produto);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [funcionario, setFuncionario] = useState<Funcionario>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setLoading(false);
    async function carregaInfo() {
      const funcList = await listarFuncionariosAll();
      setFuncionarios(funcList?.content!);

      setLoading(true);
    }
    carregaInfo();
  }, []);

  const handleValorSelecionado = (itemValue: Funcionario) => {
    setFuncionario(itemValue);
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
    // const res = await cadastrarProduto(dados, image!);
    // if (!res) {
    //   console.log('Erro:', res);
    //   return;
    // } else navigation.replace('Tabs');
  }
  if (!loading) {
    return <Text>Carregando..... </Text>;
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
        <ComboBox
          label="funcionarioId"
          items={funcionarios}
          placeholder="Selecione o Funcionário"
          onChangeText={handleValorSelecionado}
        />
        <EntradaNumber
          label="valor"
          icon={faMoneyBill}
          editable={false}
          placeholder="Valor Carrinho"
          onChangeText={text => setDados({...dados, valor: Number(text)})}
        />

        {funcionario && (
          <Box
            w="100%"
            m={3}
            p={2}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Botao
              bgColor={Temas.colors.white}
              borderWidth={2}
              borderColor={Temas.colors.roxo.normal}
              w="">
              <Text
                fontWeight="bold"
                color={Temas.colors.roxo.normal}
                fontSize={20}
                onPress={() => cadastrar()}>
                Limpar Carrinho
              </Text>
            </Botao>
            <Botao w="100px">
              <Text
                fontWeight="bold"
                color={Temas.colors.white}
                fontSize={20}
                onPress={() => cadastrar()}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  color={Temas.colors.white}
                  size={30}
                />
              </Text>
            </Botao>
          </Box>
        )}
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
