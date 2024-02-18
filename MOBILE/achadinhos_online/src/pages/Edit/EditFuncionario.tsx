import {HStack, ScrollView, Text, useToast} from 'native-base';
import Titulo from '../../components/Titulo';
import {Temas} from '../../estilos/tema';
import {EntradaTexto} from '../../components/EntradaTexto';
import Botao from '../../components/Botao';
import {useEffect, useState} from 'react';
import {faEnvelope, faPercent, faUser} from '@fortawesome/free-solid-svg-icons';
import {EntradaArquivo} from '../../components/EntradaArquivo';
import {FileUpload} from '../../interfaces/FileUpload';
import {EntradaNumber} from '../../components/EntradaNumber';
import {useRoute} from '@react-navigation/native';
import {Loading} from '../../components/Loading';
import {Funcionario} from '../../interfaces/Funcionario';
import {
  alterarFuncionario,
  detalharFuncionario,
} from '../../services/FuncionarioService';

export default function EditFuncionario({navigation}: any) {
  const [dados, setDados] = useState({} as Funcionario);
  const [image, setImage] = useState<FileUpload>();
  const [funcionario, setFuncionario] = useState<Funcionario>();
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute();
  const routeParams = route.params as {id: number} | undefined;
  const id = routeParams?.id;
  const toast = useToast();

  useEffect(() => {
    setLoading(false);
    async function carregarDados() {
      if (id) {
        const res = await detalharFuncionario(id);
        setDados(prevState => ({
          ...prevState,
          id: res.id!,
          nome: res.nome,
          email: res.email,
          porcentagem: res.porcentagem,
        }));
        setFuncionario(res);
        setLoading(true);
      }
    }
    carregarDados();
  }, []);

  const handleSelecionarImagem = (imagemSelecionada: FileUpload) => {
    if (imagemSelecionada !== null) setImage(imagemSelecionada);
  };

  async function alterar() {
    if (!dados.nome || !dados.email || !dados.porcentagem) {
      toast.show({
        title: 'Erro ao Editar Funcionário',
        description: 'Preeencha todos os Campos',
        backgroundColor: 'red.500',
      });
      return;
    }
    if (!image) {
      if (
        dados.nome === funcionario!.nome &&
        dados.email === funcionario!.email &&
        dados.porcentagem === funcionario!.porcentagem
      ) {
        toast.show({
          title: 'Erro ao Editar Funcionário',
          description: 'Mude pelo menos um dado',
          backgroundColor: 'red.500',
        });
        return;
      }
    }
    const res = await alterarFuncionario(dados, image!);
    if (!res) {
      console.log('Erro:', res);
      toast.show({
        title: 'Erro ao Editar Funcionário',
        description: 'Erro no Banco de Dados',
        backgroundColor: 'red.500',
      });
      return;
    } else {
      toast.show({
        description: `${dados.nome} alterado com sucesso alterado com sucesso`,
        backgroundColor: 'green.500',
        width: 350,
      });
      navigation.replace('DadosFuncionario');
    }
  }

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
          <Text color={Temas.colors.black}>Edite seu </Text>
          <Text color={Temas.colors.roxo.normal}>Produto</Text>
        </Titulo>
        <EntradaTexto
          label="nome"
          value={funcionario?.nome}
          icon={faUser}
          placeholder="Digite seu nome"
          onChangeText={text => setDados({...dados, nome: text})}
        />
        <EntradaTexto
          label="email"
          value={funcionario?.email}
          icon={faEnvelope}
          placeholder="Digite seu E-mail"
          onChangeText={text => setDados({...dados, email: text})}
        />
        <EntradaNumber
          label="valor"
          value={String(funcionario?.porcentagem)}
          icon={faPercent}
          placeholder="Digite a Porcentagem"
          onChangeText={text => setDados({...dados, porcentagem: Number(text)})}
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
