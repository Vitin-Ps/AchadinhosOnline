import {Box, HStack, ScrollView, Text, useToast} from 'native-base';
import Titulo from '../../components/Titulo';
import {Temas} from '../../estilos/tema';
import Botao from '../../components/Botao';
import {useEffect, useState} from 'react';
import {Produto} from '../../interfaces/Produto';
import {
  faCartShopping,
  faMoneyBill,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {EntradaNumber} from '../../components/EntradaNumber';
import ComboBox from '../../components/ComboBox';
import {Funcionario} from '../../interfaces/Funcionario';
import {
  detalharFuncionario,
  listarFuncionariosAll,
} from '../../services/FuncionarioService';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useRoute} from '@react-navigation/native';
import {EntradaTexto} from '../../components/EntradaTexto';
import {limparCarrinho, listarItensCarrinhoPorFuncionarioId} from '../../services/CarrinhoService';
import {converterMoedaReal} from '../../services/FuncionalidadesService';
import InputLoading from '../../components/InputLoading';
import { VendaDTO } from '../../interfaces/Venda';
import { registraVenda } from '../../services/VendaService';

interface ParamsType {
  id?: number;
  // Outras propriedades, se houver
}

export default function CadastroVendas({navigation}: any) {
  const [dados, setDados] = useState<VendaDTO>({} as VendaDTO);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [funcionarioId, setFuncionarioId] = useState<number>();
  const [funcionario, setFuncionario] = useState<Funcionario>();
  const [valorTotal, setValorTotal] = useState<string>();
  const [loadValor, setLoadValor] = useState(true);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const route = useRoute();
  const routeParams = route.params as ParamsType | undefined;
  const id = routeParams?.id;

  useEffect(() => {
    console.log('id: ', id);
    setLoading(false);
    async function carregaInfo() {
      if (id !== undefined) {
        // await detalharFuncionario(id);
        await Promise.all([
          detalharFuncionario(id).then((res) => {
            const func = res
            setDados({...dados, idFuncionario: res.id})
            setFuncionario(func);
          }),
          listarItensCarrinhoPorFuncionarioId(id).then(res => {
            let valor: number = 0;
            res?.content.forEach(item => {
              valor += item.produto.valor;
            });
            setDados({...dados, valor: valor});
            const valorConvertido = converterMoedaReal(valor);
            setValorTotal(valorConvertido);
          }),
        ]);
      } else {
        await Promise.all([
          listarFuncionariosAll().then(res => {
            setFuncionarios(res?.content!);
          }),
        ]);
      }
      setLoading(true);
    }
    carregaInfo();
  }, []);

  const handleValorSelecionado = async (itemValue: Funcionario) => {
    setDados({...dados, idFuncionario: itemValue.id!})
    setFuncionarioId(itemValue.id);
    setLoadValor(false);


    await listarItensCarrinhoPorFuncionarioId(itemValue.id!).then(res => {
      let valor: number = 0;
      res?.content.forEach(item => {
        valor += item.produto.valor;
      });
      setDados({...dados, valor: valor});
      const valorConvertido = converterMoedaReal(valor);
      setValorTotal(valorConvertido);
      setLoadValor(true);
    });
  };

  async function cadastrar() {
    console.log("dados: ", dados)
    if (!dados.idFuncionario || !dados.valor) {
      toast.show({
        title: 'Erro ao Cadastrar Produto',
        description: 'Preeencha todos os Campos',
        backgroundColor: 'red.500',
      });
      return;
    }
    const res = await registraVenda(dados);
    if (!res) {
      console.log('Erro:', res);
      return;
    } else {
      await limparCarrinho(dados.idFuncionario);
      navigation.replace('Tabs', {id: id});
      toast.show({
        description: ' Venda registrada com sucesso',
        backgroundColor: 'green.400',
      });
    }
  }

async function limparCarrinhoFuncionario() {
  console.log("chrgou")
  if(funcionarioId) await limparCarrinho(funcionarioId)
  if(funcionario) await limparCarrinho(funcionario.id!)
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
        {funcionario ? (
          <EntradaTexto
            icon={faUser}
            label="funcionarioId"
            value={funcionario.nome}
            editable={false}
          />
        ) : (
          <ComboBox
            label="funcionarioId"
            items={funcionarios}
            placeholder="Selecione o Funcionário"
            onChangeText={handleValorSelecionado}
          />
        )}
        {!loadValor && <InputLoading icon={faMoneyBill} />}
        {loadValor && (
          <EntradaNumber
            label="valor"
            icon={faMoneyBill}
            value={valorTotal ? valorTotal : ''}
            editable={false}
            placeholder="Valor Carrinho"
          />
        )}

        {(funcionarioId || funcionario) && (
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
                onPress={() => limparCarrinhoFuncionario()}>
                Limpar Carrinho
              </Text>
            </Botao>
            <Botao w="100px">
              <Text
                fontWeight="bold"
                color={Temas.colors.white}
                fontSize={20}
                onPress={() =>
                  navigation.navigate('CarrinhoProdutos', {id: funcionarioId ? funcionarioId : funcionario!.id})
                }>
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
