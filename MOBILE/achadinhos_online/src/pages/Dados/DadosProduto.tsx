import {Box, ScrollView, Text, View, useToast} from 'native-base';
import {Temas} from '../../estilos/tema';
import Titulo from '../../components/Titulo';
import {EntradaTexto} from '../../components/EntradaTexto';
import {removerAcentuacoes} from '../../services/FuncionalidadesService';
import {useEffect, useState} from 'react';
import {Produto} from '../../interfaces/Produto';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Loading} from '../../components/Loading';
import {CardProduto} from '../../components/CardProduto';
import Botao from '../../components/Botao';
import {deletarProduto, listarProdutosAll} from '../../services/ProdutoService';
import {Confirm} from '../../components/Comfirm';
import { Image } from 'react-native';

export default function DadosProduto({navigation}: any) {
  const [allProdutos, setAllProdutos] = useState<Produto[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [idProdutoSelecionado, setIdProdutoSelecionado] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [showAcoes, setShowAcoes] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toast = useToast();

  useEffect(() => {
    async function caregarDados() {
      setLoading(false);
      const produtosPageble = await listarProdutosAll();
      setAllProdutos(produtosPageble?.content!);
      setProdutos(produtosPageble?.content!);
      setLoading(true);
    }
    caregarDados();
  }, []);

  const selecionarProduto = (idProduto: number) => {
    const listaProdutos = [...produtos];

    listaProdutos.forEach(produto => {
      if (produto.id === idProduto) {
        produto.selecionado = !produto.selecionado;
        if (produto.selecionado) {
          setShowAcoes(true);
          setIdProdutoSelecionado(idProduto);
        } else setShowAcoes(false);
      } else {
        produto.selecionado = false;
      }
    });

    setProdutos(listaProdutos);
  };

  function pesquisa(text: string) {
    text = removerAcentuacoes(text);
    setProdutos(
      allProdutos.filter(produto => {
        const nome = removerAcentuacoes(produto.nome);
        return nome.includes(text);
      }),
    );
  }
  async function apagarProduto() {
    const produtosSelecionados = produtos.filter(
      produto => produto.selecionado,
    );
    if (produtosSelecionados.length === 0) {
      toast.show({
        title: 'Erro',
        description: 'Selecione ao menos um Produto',
        backgroundColor: 'red.400',
      });
      return;
    }
    let idProduto = produtosSelecionados[0].id;
    const res = await deletarProduto(idProduto!);
    if (res === undefined || res === null) {
      console.log('Erro:', res);
      toast.show({
        title: 'Erro',
        description: 'Produto não existe',
        backgroundColor: 'red.400',
      });
      return;
    } else {
      toast.show({
        description: 'Produtos excluido',
        backgroundColor: 'green.400',
      });
      navigation.replace('DadosProduto');
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
          placeholder="Busque seu produto"
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
            {produtos !== undefined && produtos.length > 0 ? (
              produtos.map(produto => (
                <CardProduto
                  key={produto.id}
                  nome={produto.nome}
                  valor={produto.valor}
                  imagem={`http://192.168.100.46:8080${produto.imagem}`}
                  selecionado={produto.selecionado}
                  onPress={() => selecionarProduto(produto.id!)}
                />
              ))
            ) : (
              <Text m={5} fontSize={20} fontWeight="bold">
                Nenhum produto encontrado...
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
              navigation.replace('EditProduto', {
                id: idProdutoSelecionado,
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
        message="Tem certeza que quer excluir esse Produto?"
        showModal={showModal}
        setShowModal={setShowModal}
        onPress={apagarProduto}
      />
    </View>
  );
}
