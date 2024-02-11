import {Box, ScrollView, Text, View, useToast} from 'native-base';
import {Temas} from '../estilos/tema';
import {EntradaTexto} from '../components/EntradaTexto';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import Titulo from '../components/Titulo';
import {CardProduto} from '../components/CardProduto';
import {useEffect, useState} from 'react';
import {listarProdutosAll} from '../services/ProdutoService';
import {Produto} from '../interfaces/Produto';
import Botao from '../components/Botao';
import {Loading} from '../components/Loading';
import {removerAcentuacoes} from '../services/FuncionalidadesService';
import {useRoute} from '@react-navigation/native';
import {Carrinho, CarrinhoEnvio} from '../interfaces/Carrinho';
import {addItemCarrinho} from '../services/CarrinhoService';

export default function CarrinhoProdutos({navigation}: any) {
  const [allProdutos, setAllProdutos] = useState<Produto[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const route = useRoute();
  const {id} = route.params as {id: number};

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
    // Criando uma cópia do array de produtos
    const listaProdutos = [...produtos];

    // Encontrando o índice do produto com base no id
    const produtoSelecionado = listaProdutos.findIndex(
      produto => produto.id === idProduto,
    );

    // Verificando se o produto foi encontrado
    if (produtoSelecionado !== -1) {
      // Modificando o atributo selecionado do produto na cópia do array
      listaProdutos[produtoSelecionado] = {
        ...listaProdutos[produtoSelecionado], // Mantendo as outras propriedades do produto
        selecionado: !listaProdutos[produtoSelecionado].selecionado, // Invertendo o valor do atributo selecionado
      };

      // Atualizando o estado com a nova cópia do array de produtos
      setProdutos(listaProdutos);
    }
  };

  async function adicionarProduto() {
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
    let carrinho: CarrinhoEnvio[] = [];
    produtosSelecionados.forEach(produto => {
      carrinho.push({
        funcionarioId: id,
        produtoId: produto.id!,
      });
    });
    const res = await addItemCarrinho(carrinho);
    if (res === undefined || res === null) {
      console.log('Erro:', res);
      return;
    } else {
      navigation.replace('CadastroVendas', {id: id});
      toast.show({
        description: 'Produtos adicionados no Carrinho',
        backgroundColor: 'green.400',
      });
    }
  }

  function pesquisa(text: string) {
    text = removerAcentuacoes(text);
    setProdutos(
      allProdutos.filter(produto => {
        const nome = removerAcentuacoes(produto.nome);
        return nome.includes(text);
      }),
    );
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
                  imagem={produto.imagem}
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
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        p={2}
        alignContent="center">
        <Botao mt="0" onPress={adicionarProduto}>
          <Text color={Temas.colors.white} fontSize={20} fontWeight="bold">
            Adicionar
          </Text>
        </Botao>
      </Box>
    </View>
  );
}
