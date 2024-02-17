import {HStack, ScrollView, Text, useToast} from 'native-base';
import Titulo from '../../components/Titulo';
import {Temas} from '../../estilos/tema';
import {EntradaTexto} from '../../components/EntradaTexto';
import Botao from '../../components/Botao';
import {useEffect, useState} from 'react';
import {Produto} from '../../interfaces/Produto';
import {faMoneyBill, faShirt} from '@fortawesome/free-solid-svg-icons';
import {EntradaArquivo} from '../../components/EntradaArquivo';
import {alterarProduto, detalharProduto} from '../../services/ProdutoService';
import {FileUpload} from '../../interfaces/FileUpload';
import {EntradaNumber} from '../../components/EntradaNumber';
import { useRoute } from '@react-navigation/native';
import { Loading } from '../../components/Loading';
import { converterMoedaReal } from '../../services/FuncionalidadesService';

export default function EditProduto({navigation}: any) {
  const [dados, setDados] = useState({} as Produto);
  const [image, setImage] = useState<FileUpload>();
  const [produto, setProduto] = useState<Produto>();
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute();
  const routeParams = route.params as {id: number} | undefined;
  const id = routeParams?.id;
  const toast = useToast();

  useEffect(() => {
    setLoading(false)
    async function carregarDados() {
      if(id) {
        const res = await detalharProduto(id)
        setDados(prevState => ({
          ...prevState,
          id: res.id!,
          nome: res.nome,
          valor: res.valor,
        }));
        setProduto(res);
        setLoading(true)
      }
    }
    carregarDados()
  }, []);

  const handleSelecionarImagem = (imagemSelecionada: FileUpload) => {
    if (imagemSelecionada !== null) setImage(imagemSelecionada);
  };

  async function alterar() {
    if (!dados.nome || !dados.valor) {
      toast.show({
        title: 'Erro ao Editar Produto',
        description: 'Preeencha todos os Campos',
        backgroundColor: 'red.500',
      });
      return;
    }
   if(!image) {
    if(dados.nome === produto!.nome && dados.valor === produto!.valor) {
      toast.show({
        title: 'Erro ao Editar Produto',
        description: 'Mude pelo menos um dado',
        backgroundColor: 'red.500',
      });
      return;
    }
   }
    const res = await alterarProduto(dados, image!);
    if (!res) {
      console.log('Erro:', res);
      toast.show({
        title: 'Erro ao Editar Produto',
        description: 'Erro no Banco de Dados',
        backgroundColor: 'red.500',
      });
      return;
    } else {
      toast.show({
        description: `${dados.nome} no valor de ${converterMoedaReal(dados.valor)}  alterado com sucesso alterado com sucesso`,
        backgroundColor: 'green.500',
        width: 350
      });
      navigation.replace('DadosProduto');
    }
  }

  if(!loading) return (
    <Loading h="600px"/>
  )

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
          <Text color={Temas.colors.black}>Edite seu </Text>
          <Text color={Temas.colors.roxo.normal}>Produto</Text>
        </Titulo>
        <EntradaTexto
          label="nome"
          value={produto?.nome}
          icon={faShirt}
          placeholder="Digite seu nome"
          onChangeText={text => setDados({...dados, nome: text})}
        />
        <EntradaNumber
          label="valor"
          value={String(produto?.valor)}
          icon={faMoneyBill}
          placeholder="Digite o valor"
          onChangeText={text => setDados({...dados, valor: Number(text)})}
        />
        <EntradaArquivo onImagemSelecionada={handleSelecionarImagem} />
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
