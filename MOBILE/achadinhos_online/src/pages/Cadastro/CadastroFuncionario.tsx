import {HStack, ScrollView, Text, useToast} from 'native-base';
import Titulo from '../../components/Titulo';
import {Temas} from '../../estilos/tema';
import {EntradaTexto} from '../../components/EntradaTexto';
import Botao from '../../components/Botao';
import {useState} from 'react';
import {faEnvelope, faKey, faPercent, faUser} from '@fortawesome/free-solid-svg-icons';
import {EntradaArquivo} from '../../components/EntradaArquivo';
import {FileUpload} from '../../interfaces/FileUpload';
import {EntradaNumber} from '../../components/EntradaNumber';
import {Funcionario} from '../../interfaces/Funcionario';
import {cadastrarFuncionario} from '../../services/FuncionarioService';

export default function CadastrarFuncionario({navigation}: any) {
  const [dados, setDados] = useState({} as Funcionario);
  const [image, setImage] = useState<FileUpload>();
  const toast = useToast();

  const handleSelecionarImagem = (imagemSelecionada: FileUpload) => {
    if (imagemSelecionada !== null) setImage(imagemSelecionada);
  };

  async function cadastrar() {
    if (!dados.nome || !dados.email || !dados.porcentagem || !dados.senha) {
      toast.show({
        title: 'Erro ao Cadastrar Funcionário',
        description: 'Preeencha todos os Campos',
        backgroundColor: 'red.500',
      });
      return;
    }
    const res = await cadastrarFuncionario(dados, image!);
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
          <Text color={Temas.colors.black}>Cadastre o </Text>
          <Text color={Temas.colors.roxo.normal}>Funcionário</Text>
        </Titulo>
        <EntradaTexto
          label="nome"
          icon={faUser}
          placeholder="Digite o Nome"
          onChangeText={text => setDados({...dados, nome: text})}
        />
        <EntradaTexto
          label="email"
          icon={faEnvelope}
          placeholder="Digite o E-mail"
          onChangeText={text => setDados({...dados, email: text})}
        />
        <EntradaNumber
          label="porcentagem"
          icon={faPercent}
          placeholder="Digite a Porcentagem"
          onChangeText={text => setDados({...dados, porcentagem: Number(text)})}
        />
        <EntradaTexto
          label="senha"
          icon={faKey}
          placeholder="Digite a Senha"
          senha={true}
          onChangeText={text => setDados({...dados, senha: text})}
        />
        <EntradaArquivo onImagemSelecionada={handleSelecionarImagem} />
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
