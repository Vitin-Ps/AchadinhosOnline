import {HStack, ScrollView, Text, useToast} from 'native-base';
import Titulo from '../../components/Titulo';
import {Temas} from '../../estilos/tema';
import {} from '../../components/EntradaTexto';
import Botao from '../../components/Botao';
import {useEffect, useState} from 'react';
import {faPercent} from '@fortawesome/free-solid-svg-icons';
import {FileUpload} from '../../interfaces/FileUpload';
import {EntradaNumber} from '../../components/EntradaNumber';
import {useRoute} from '@react-navigation/native';
import {Loading} from '../../components/Loading';
import {Funcionario} from '../../interfaces/Funcionario';
import {
  detalharFuncionario,
  listarFuncionariosAll,
} from '../../services/FuncionarioService';
import {alterarVenda, detalharVenda} from '../../services/VendaService';
import {Venda} from '../../interfaces/Venda';
import {converterMoedaReal} from '../../services/FuncionalidadesService';
import ComboBox from '../../components/ComboBox';

export default function EditVenda({navigation}: any) {
  const [dados, setDados] = useState({} as Venda);
  const [venda, setVenda] = useState<Venda>();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute();
  const routeParams = route.params as {id: number} | undefined;
  const id = routeParams?.id;
  const toast = useToast();

  useEffect(() => {
    setLoading(false);
    async function carregarDados() {
      if (id) {
        const vendaEdit: Venda = await detalharVenda(id);
        const listaFunc = await listarFuncionariosAll();
        const listaFuncFormatada = listaFunc!.content.filter(
          func => func.id !== vendaEdit.funcionario.id,
        );
        setVenda(vendaEdit);
        setFuncionarios(listaFuncFormatada);
        setDados(prevState => ({
          ...prevState,
          id: vendaEdit.id!,
          funcionario: vendaEdit.funcionario,
          venda: vendaEdit.venda,
          comissao: vendaEdit.comissao,
        }));
        setLoading(true);
      }
    }
    carregarDados();
  }, []);

  async function alterar() {
    if (!dados.id || !dados.funcionario) {
      toast.show({
        title: 'Erro ao Editar Venda',
        description: 'Preeencha todos os Campos',
        backgroundColor: 'red.500',
      });
      return;
    }

    if (dados.funcionario === venda?.funcionario) {
      toast.show({
        title: 'Erro ao Editar Venda',
        description: 'Mude pelo menos um dado',
        backgroundColor: 'red.500',
      });
      return;
    }
    const res = await alterarVenda(dados);
    if (!res) {
      console.log('Erro:', res);
      toast.show({
        title: 'Erro ao Editar Venda',
        description: 'Erro no Banco de Dados',
        backgroundColor: 'red.500',
      });
      return;
    } else {
      toast.show({
        description: `Venda de ${
          dados.funcionario.nome
        } no valor de ${converterMoedaReal(dados.venda)} alterado com sucesso`,
        backgroundColor: 'green.500',
        width: 350,
      });
      navigation.replace('DadosVendas');
    }
  }

  const handleValorSelecionado = async (itemValue: string) => {
    const funcSelecionado = await detalharFuncionario(Number(itemValue));
    setDados(prevState => ({
      ...prevState,
      funcionario: funcSelecionado,
    }));
  };

  if (!loading) return <Loading h="600px" />;

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
          <Text color={Temas.colors.black}>Edite a </Text>
          <Text color={Temas.colors.roxo.normal}>Venda</Text>
        </Titulo>

        <ComboBox
          label="funcionarioId"
          items={funcionarios}
          default={venda?.funcionario.nome}
          defaultValue={String(venda?.funcionario.id)}
          placeholder="Selecione o Funcionário"
          onChangeText={handleValorSelecionado}
        />
        <EntradaNumber
          label="valor"
          value={converterMoedaReal(venda?.venda)}
          icon={faPercent}
          editable={false}
          placeholder="Digite a Porcentagem"
        />
        <Botao>
          <Text
            fontWeight="bold"
            color={Temas.colors.white}
            fontSize={20}
            onPress={() => alterar()}>
            Alterar
          </Text>
        </Botao>
      </HStack>
    </ScrollView>
  );
}
