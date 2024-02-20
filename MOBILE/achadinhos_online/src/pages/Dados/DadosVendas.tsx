import {Box, ScrollView, Text, View, useToast} from 'native-base';
import {Temas} from '../../estilos/tema';
import Titulo from '../../components/Titulo';
import {useEffect, useState} from 'react';
import {Loading} from '../../components/Loading';
import Botao from '../../components/Botao';
import {Confirm} from '../../components/Comfirm';
import {CardVenda} from '../../components/CardVenda';
import ComboBox from '../../components/ComboBox';
import {Funcionario} from '../../interfaces/Funcionario';
import {TotalVenda, Venda} from '../../interfaces/Venda';
import {deletarVenda, listarVendasAll} from '../../services/VendaService';
import CardVendasInfo from '../../components/CardVendasInfo';

export default function DadosVendas({navigation}: any) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [allVendas, setAllVendas] = useState<Venda[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [totalVenda, setTotalVenda] = useState<TotalVenda>();
  const [idVendaSelecionada, setIdVendaSelecionada] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [showAcoes, setShowAcoes] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toast = useToast();

  useEffect(() => {
    async function caregarDados() {
      setLoading(false);
      const vendasPageble = await listarVendasAll();
      setAllVendas(vendasPageble?.content!);
      setVendas(vendasPageble?.content!);
      let listaFuncionarios: Funcionario[] = [];
      let totalVenda = 0;
      let valorTotal = 0;
      vendasPageble?.content!.forEach((venda: Venda) => {
        const funcionarioExistente = listaFuncionarios.find(
          funcionario => funcionario.id === venda.funcionario.id,
        );
        if (!funcionarioExistente) {
          listaFuncionarios.push(venda.funcionario);
        }
        totalVenda++;
        valorTotal += venda.venda;
      });
      setFuncionarios(listaFuncionarios);
      setTotalVenda({
        totalVenda: totalVenda,
        valorTotal: valorTotal,
      });
      setLoading(true);
    }
    caregarDados();
  }, []);

  const selecionarVenda = (idVenda: number) => {
    const listaVendas = [...vendas];

    listaVendas.forEach(Venda => {
      if (Venda.id === idVenda) {
        Venda.selecionado = !Venda.selecionado;
        if (Venda.selecionado) {
          setShowAcoes(true);
          setIdVendaSelecionada(idVenda);
        } else setShowAcoes(false);
      } else {
        Venda.selecionado = false;
      }
    });

    setVendas(listaVendas);
  };

  async function apagarVenda() {
    const vendasSelecionadas = vendas.filter(venda => venda.selecionado);
    if (vendasSelecionadas.length === 0) {
      toast.show({
        title: 'Erro',
        description: 'Selecione ao menos uma Venda',
        backgroundColor: 'red.400',
      });
      return;
    }
    let idVenda = vendasSelecionadas[0].id;
    const res = await deletarVenda(idVenda!);
    if (res === undefined || res === null) {
      console.log('Erro:', res);
      toast.show({
        title: 'Erro',
        description: 'Venda não existe',
        backgroundColor: 'red.400',
      });
      return;
    } else {
      toast.show({
        description: 'Venda excluida',
        backgroundColor: 'green.400',
      });
      navigation.replace('DadosVendas');
    }
  }

  const handleValorSelecionado = async (itemValue: string) => {
    setLoading(false);
    const vendasPorFuncionario = allVendas.filter(
      venda => {
        if (itemValue === 'Todos') {
          return venda
        } else {
          return venda.funcionario.id === Number(itemValue)
        }
      }
      );
      setVendas(vendasPorFuncionario);

      let totalVenda = 0;
      let valorTotal = 0;
      let comissaoTotal = 0;
      if (itemValue === 'Todos') {
        vendasPorFuncionario.forEach((venda: Venda) => {
          totalVenda++;
          valorTotal += venda.venda;
        });
      } else {
        vendasPorFuncionario.forEach((venda: Venda) => {
          if (venda.funcionario.id === Number(itemValue)) {
            totalVenda++;
            valorTotal += venda.venda;
            comissaoTotal += venda.comissao!;
          }
        });
      }
    setTotalVenda({
      totalVenda: totalVenda,
      valorTotal: valorTotal,
      comissaoTotal: comissaoTotal,
    });
    setLoading(true);
  };

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
      {!loading ? (
        <Loading height="80px" />
      ) : (
        <CardVendasInfo
          totalVendas={totalVenda?.totalVenda!}
          valorTotal={totalVenda?.valorTotal!}
          comissaoTotal={totalVenda?.comissaoTotal}
        />
      )}
      <ScrollView flex={1} p={2} w="100%">
        <Titulo mb={1}>
          <Text color={Temas.colors.verde.normal}>Achadinhos</Text>
          <Text color={Temas.colors.roxo.normal}>Online</Text>
        </Titulo>
        <ComboBox
          label="funcionarioId"
          default="Todos"
          items={funcionarios}
          placeholder="Selecione o Funcionário"
          onChangeText={handleValorSelecionado}
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
            {vendas !== undefined && vendas.length > 0 ? (
              vendas.map(venda => (
                <CardVenda
                  key={venda.id}
                  id={venda.id!}
                  nome={venda.funcionario.nome}
                  valorVenda={venda.venda}
                  comissao={venda.comissao!}
                  selecionado={venda.selecionado}
                  onPress={() => selecionarVenda(venda.id!)}
                />
              ))
            ) : (
              <Text m={5} fontSize={20} fontWeight="bold">
                Nenhuma venda encontrada...
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
              navigation.replace('EditVenda', {
                id: idVendaSelecionada,
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
        message="Tem certeza que quer excluir essa Venda?"
        showModal={showModal}
        setShowModal={setShowModal}
        onPress={apagarVenda}
      />
    </View>
  );
}
