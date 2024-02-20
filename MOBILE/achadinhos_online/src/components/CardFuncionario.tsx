import {Box, Image, Text} from 'native-base';
import {Temas} from '../estilos/tema';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBox, faMoneyBill, faPercent} from '@fortawesome/free-solid-svg-icons';
import {converterMoedaReal} from '../services/FuncionalidadesService';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { Comissao } from '../interfaces/Carrinho';

interface cardProps {
  id: number;
  imagem?: string;
  porcentagem: number;
  comissao: Comissao[];
  nome: string;
  selecionado?: boolean;
  onPress?: () => void;
}

export function CardFuncionario(cardProps: cardProps) {
  const timestamp = new Date().getTime(); // Obtém o timestamp atual
  const uri = `${cardProps.imagem}?timestamp=${timestamp}`;
  const comissao: string = converterMoedaReal(cardProps.comissao.find((comissao) => comissao.idFuncionario === cardProps.id)?.comissao!)!;
  const styles = StyleSheet.create({
    card: {
      backgroundColor: cardProps.selecionado
        ? Temas.colors.roxo.transparente
        : Temas.colors.white,
      width: 150,
      height: 200,
      margin: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 10,
      padding: 10,
      ...(cardProps.selecionado ? {} : Temas.shadow),
    },
  });
  return (
    <TouchableOpacity style={styles.card} onPress={cardProps.onPress}>
      {cardProps.imagem ? (
        <Image
          source={{uri: uri}}
          alt={'img_produto_' + cardProps.nome}
          w="130px"
          h="80px"
          borderRadius={15}
        />
      ) : (
        <Box m={2}>
          <FontAwesomeIcon
            icon={faBox}
            size={50}
            color={
              cardProps.selecionado
                ? Temas.colors.white
                : Temas.colors.roxo.claro
            }
          />
        </Box>
      )}
      <Text
        fontSize={15}
        fontWeight="bold"
        m={2}
        color={cardProps.selecionado ? Temas.colors.white : Temas.colors.black}>
        {cardProps.nome}
      </Text>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center">
        <FontAwesomeIcon
          icon={faPercent}
          size={15}
          color={Temas.colors.roxo.escuro}
        />
        <Text
          color={
            cardProps.selecionado ? Temas.colors.white : Temas.colors.black
          }
          ml={2}>
          {cardProps.porcentagem}
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center">
        <FontAwesomeIcon
          icon={faMoneyBill}
          size={15}
          color={Temas.colors.roxo.escuro}
        />
        <Text
          color={
            cardProps.selecionado ? Temas.colors.white : Temas.colors.black
          }
          ml={2}>
          {comissao ? comissao : "R$ 0,00"}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
