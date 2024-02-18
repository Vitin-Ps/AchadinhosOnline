import {Box, Image, ScrollView, Text, VStack} from 'native-base';
import {Temas} from '../../estilos/tema';
import {CardCadastro} from '../../components/CardCadastro';
import {
  faCartShopping,
  faShirt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {statusLojinha} from '../../services/VendaService';
import {StatusLojinha} from '../../interfaces/Venda';

export default function Administrativo({navigation}: any) {
  const [status, setStatus] = useState<StatusLojinha>();
  useEffect(() => {
    async function carregaDados() {
      const statusRes = await statusLojinha();
      setStatus(statusRes);
    }
    carregaDados();
  }, []);
  return (
    <VStack>
      <Box position="relative" height="20%">
        <Image
          source={require('../../assets/imagens/img-status-lojinha-deitado-p.jpg')}
          alt="Sua Imagem"
          width="100%"
          height="100%"
        />
        <Box
          position="absolute"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.605)" // Cor do box com transparência
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around">
          <Box display="flex" alignItems="center" p={1}>
            <Text fontSize={15} fontWeight="bold" color={Temas.colors.white}>
              Funcionários
            </Text>
            <Text fontSize={20} color={Temas.colors.white}>
              {status?.funcionarios}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" p={1}>
            <Text fontSize={15} fontWeight="bold" color={Temas.colors.white}>
              Vendas
            </Text>
            <Text fontSize={20} color={Temas.colors.white}>
              {status?.vendas}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" p={1}>
            <Text fontSize={15} fontWeight="bold" color={Temas.colors.white}>
              Produtos
            </Text>
            <Text fontSize={20} color={Temas.colors.white}>
              {status?.produtos}
            </Text>
          </Box>
        </Box>
      </Box>
      <ScrollView height="80%">
        <Box bgColor={Temas.colors.roxo.escuro}>
          <CardCadastro
            icon={faUser}
            titulo="Funcionários"
            onPress={() => navigation.navigate('DadosFuncionario')}
          />
          <CardCadastro
            icon={faCartShopping}
            titulo="Vendas"
            onPress={() => navigation.navigate('CadastroVendas')}
          />
          <CardCadastro
            icon={faShirt}
            titulo="Produtos"
            onPress={() => navigation.navigate('DadosProduto')}
          />
        </Box>
      </ScrollView>
    </VStack>
  );
}
