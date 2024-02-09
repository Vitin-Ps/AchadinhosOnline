import {Box, HStack, Image, ScrollView, Text} from 'native-base';
import {Temas} from '../estilos/tema';
import ImgProduto from '../assets/imagens/camisa-branca.jpg';
import {EntradaTexto} from '../components/EntradaTexto';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import Titulo from '../components/Titulo';

export default function CarrinhoProdutos({navigation}: any) {
  return (
    <ScrollView flex={1} p={2} backgroundColor={Temas.colors.padrao.corFundo}>
      <HStack
        p={5}
        m={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <Titulo mb={1}>
          <Text color={Temas.colors.verde.normal}>Achadinhos</Text>
          <Text color={Temas.colors.roxo.normal}>Online</Text>
        </Titulo>
        <EntradaTexto
          label="search"
          icon={faSearch}
          placeholder="Busque seu produto"
        />
        <Box
          //   bgColor="gray.300"
          width="100%"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          mt={5}>
          <Box
            w="150px"
            h="200px"
            bgColor={Temas.colors.white}
            display="flex"
            alignItems="center"
            p={2}
            m={1}
            borderRadius={10}
            shadow={5}>
            <Image
              source={ImgProduto}
              alt="img_produto"
              w="130px"
              h="80px"
              borderRadius={15}
            />
            <Text fontSize={20} fontWeight="bold" m={2}>
              R$320,56
            </Text>
            <Text>Camisa Branca</Text>
          </Box>
          <Box
            w="150px"
            h="200px"
            bgColor={Temas.colors.roxo.claro}
            display="flex"
            alignItems="center"
            p={2}
            m={1}
            borderRadius={10}
            shadow={5}>
            <Image
              source={ImgProduto}
              alt="img_produto"
              w="130px"
              h="80px"
              borderRadius={15}
            />
            <Text
              fontSize={20}
              fontWeight="bold"
              m={2}
              color={Temas.colors.white}>
              R$320,56
            </Text>
            <Text color={Temas.colors.white}>Camisa Branca</Text>
          </Box>
          <Box
            w="150px"
            h="200px"
            bgColor={Temas.colors.white}
            display="flex"
            alignItems="center"
            p={2}
            m={1}
            borderRadius={10}
            shadow={5}>
            <Image
              source={ImgProduto}
              alt="img_produto"
              w="130px"
              h="80px"
              borderRadius={15}
            />
            <Text fontSize={20} fontWeight="bold" m={2}>
              R$320,56
            </Text>
            <Text>Camisa Branca</Text>
          </Box>
          <Box
            w="150px"
            h="200px"
            bgColor={Temas.colors.white}
            display="flex"
            alignItems="center"
            p={2}
            m={1}
            borderRadius={10}
            shadow={5}>
            <Image
              source={ImgProduto}
              alt="img_produto"
              w="130px"
              h="80px"
              borderRadius={15}
            />
            <Text fontSize={20} fontWeight="bold" m={2}>
              R$320,56
            </Text>
            <Text>Camisa Branca</Text>
          </Box>
          <Box
            w="150px"
            h="200px"
            bgColor={Temas.colors.white}
            display="flex"
            alignItems="center"
            p={2}
            m={1}
            borderRadius={10}
            shadow={5}>
            <Image
              source={ImgProduto}
              alt="img_produto"
              w="130px"
              h="80px"
              borderRadius={15}
            />
            <Text fontSize={20} fontWeight="bold" m={2}>
              R$320,56
            </Text>
            <Text>Camisa Branca</Text>
          </Box>
          <Box
            w="150px"
            h="200px"
            bgColor={Temas.colors.white}
            display="flex"
            alignItems="center"
            p={2}
            m={1}
            borderRadius={10}
            shadow={5}>
            <Image
              source={ImgProduto}
              alt="img_produto"
              w="130px"
              h="80px"
              borderRadius={15}
            />
            <Text fontSize={20} fontWeight="bold" m={2}>
              R$320,56
            </Text>
            <Text>Camisa Branca</Text>
          </Box>
        </Box>
      </HStack>
    </ScrollView>
  );
}
