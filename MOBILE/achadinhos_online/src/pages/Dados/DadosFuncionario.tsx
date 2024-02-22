import {Box, ScrollView, Text, View, useToast} from 'native-base';
import {Temas} from '../../estilos/tema';
import Titulo from '../../components/Titulo';
import {EntradaTexto} from '../../components/EntradaTexto';
import {removerAcentuacoes} from '../../services/FuncionalidadesService';
import {useEffect, useState} from 'react';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Loading} from '../../components/Loading';
import Botao from '../../components/Botao';
import {Confirm} from '../../components/Comfirm';
import {Funcionario} from '../../interfaces/Funcionario';
import {
  deletarFuncionario,
  listarFuncionariosAll,
} from '../../services/FuncionarioService';
import {CardFuncionario} from '../../components/CardFuncionario';
import {listarComissoes} from '../../services/VendaService';
import {Comissao} from '../../interfaces/Carrinho';
import {getBaseUrl} from '../../services/api.';

export default function DadosFuncionario({navigation}: any) {
  const [allFuncionarios, setAllFuncionarios] = useState<Funcionario[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [comissoes, setComissoes] = useState<Comissao[]>([]);
  const [idFuncionarioSelecionado, setIdFuncionarioSelecionado] =
    useState<number>();
  const [loading, setLoading] = useState(false);
  const [showAcoes, setShowAcoes] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toast = useToast();

  useEffect(() => {
    async function caregarDados() {
      setLoading(false);
      const funcionariosPageble = await listarFuncionariosAll();
      const vendasPageble = await listarComissoes();
      setComissoes(vendasPageble);
      setAllFuncionarios(funcionariosPageble?.content!);
      setFuncionarios(funcionariosPageble?.content!);
      setLoading(true);
    }
    caregarDados();
  }, []);

  const selecionarFuncionario = (idFuncionario: number) => {
    const listaFuncionarios = [...funcionarios];

    listaFuncionarios.forEach(funcionario => {
      if (funcionario.id === idFuncionario) {
        funcionario.selecionado = !funcionario.selecionado;
        if (funcionario.selecionado) {
          setShowAcoes(true);
          setIdFuncionarioSelecionado(idFuncionario);
        } else setShowAcoes(false);
      } else {
        funcionario.selecionado = false;
      }
    });
    setFuncionarios(listaFuncionarios);
  };

  function pesquisa(text: string) {
    text = removerAcentuacoes(text);
    setFuncionarios(
      allFuncionarios.filter(funcionario => {
        const nome = removerAcentuacoes(funcionario.nome);
        return nome.includes(text);
      }),
    );
  }
  async function apagarFuncionario() {
    const funcionariosSelecionados = funcionarios.filter(
      funcionario => funcionario.selecionado,
    );
    if (funcionariosSelecionados.length === 0) {
      toast.show({
        title: 'Erro',
        description: 'Selecione ao menos um Funcionário',
        backgroundColor: 'red.400',
      });
      return;
    }
    let idFuncionario = funcionariosSelecionados[0].id;
    const res = await deletarFuncionario(idFuncionario!);
    if (res === undefined || res === null) {
      console.log('Erro:', res);
      toast.show({
        title: 'Erro',
        description: 'Funcionário não existe',
        backgroundColor: 'red.400',
      });
      return;
    } else {
      toast.show({
        description: 'Funcionário excluido',
        backgroundColor: 'green.400',
      });
      navigation.replace('DadosFuncionario');
    }
  }

  return (
    <View
      backgroundColor={Temas.colors.padrao.corFundo}
      flex={1}
      p={2}
      m={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <ScrollView flex={1} p={2} w="100%">
        <Titulo mb={1}>
          <Text color={Temas.colors.verde.normal}>Achadinhos</Text>
          <Text color={Temas.colors.roxo.normal}>Online</Text>
        </Titulo>
        <EntradaTexto
          label="search"
          icon={faSearch}
          placeholder="Busque pelo Funcionário"
          onChangeText={pesquisa}
        />
        {!loading ? (
          <Loading />
        ) : (
          <Box
            //   bgColor="gray.300"
            width="100%"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            mt={5}>
            {funcionarios !== undefined && funcionarios.length > 0 ? (
              funcionarios.map(funcionario => (
                <CardFuncionario
                  key={funcionario.id}
                  id={funcionario.id!}
                  nome={funcionario.nome}
                  porcentagem={funcionario.porcentagem}
                  comissao={comissoes}
                  imagem={funcionario.imagem}
                  selecionado={funcionario.selecionado}
                  onPress={() => selecionarFuncionario(funcionario.id!)}
                />
              ))
            ) : (
              <Text m={5} fontSize={20} fontWeight="bold">
                Nenhum funcionário encontrado...
              </Text>
            )}
          </Box>
        )}
      </ScrollView>
      {showAcoes && (
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignContent="center">
          <Botao
            bgColor={Temas.colors.white}
            borderWidth={2}
            borderColor={Temas.colors.roxo.normal}
            w=""
            onPress={() =>
              navigation.replace('EditFuncionario', {
                id: idFuncionarioSelecionado,
              })
            }>
            <Text
              fontWeight="bold"
              color={Temas.colors.roxo.normal}
              fontSize={20}>
              Editar
            </Text>
          </Botao>
          <Botao w="100px">
            <Text
              fontWeight="bold"
              color={Temas.colors.white}
              fontSize={20}
              onPress={() => setShowModal(true)}>
              Excluir
            </Text>
          </Botao>
        </Box>
      )}
      <Confirm
        message="Tem certeza que quer excluir esse Funcionário?"
        showModal={showModal}
        setShowModal={setShowModal}
        onPress={apagarFuncionario}
      />
    </View>
  );
}
