import {Box, Text} from 'native-base';
import {Temas} from '../estilos/tema';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBagShopping,
  faMoneyBill,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {converterMoedaReal} from '../services/FuncionalidadesService';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface cardProps {
  id: number;
  nome: string;
  valorVenda: number;
  comissao: number;
  selecionado?: boolean;
  onPress?: () => void;
}

export function CardVenda(cardProps: cardProps) {
  const valorVenda: string = converterMoedaReal(cardProps.valorVenda)!;
  const comissao: string = converterMoedaReal(cardProps.comissao)!;
  const styles = StyleSheet.create({
    card: {
      backgroundColor: cardProps.selecionado
        ? Temas.colors.roxo.transparente
        : Temas.colors.white,
      width: '95%',
      minHeight: 80,
      margin: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: 10,
      padding: 10,
      ...(cardProps.selecionado ? {} : Temas.shadow),
    },
  });
  return (
    <TouchableOpacity style={styles.card} onPress={cardProps.onPress}>
      <Text fontWeight="bold" w="10%" color={cardProps.selecionado ? Temas.colors.white : Temas.colors.black}>{cardProps.id}</Text>
      <Box display="flex" alignItems="center" w="30%">
        <FontAwesomeIcon
          icon={faUser}
          size={15}
          color={cardProps.selecionado ? Temas.colors.white : Temas.colors.roxo.normal}
        />
        <Text mt={1} fontWeight="bold" textAlign="center" color={cardProps.selecionado ? Temas.colors.white : Temas.colors.black}>
          {cardProps.nome}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" w="27%">
        <FontAwesomeIcon
          icon={faBagShopping}
          size={15}
          color={cardProps.selecionado ? Temas.colors.white : Temas.colors.roxo.normal}
        />
        <Text mt={1} fontWeight="bold" fontSize={12} color={cardProps.selecionado ? Temas.colors.white : Temas.colors.black}>
          {valorVenda}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" w="27%">
        <FontAwesomeIcon
          icon={faMoneyBill}
          size={15}
          color={cardProps.selecionado ? Temas.colors.white : Temas.colors.roxo.normal}
        />
        <Text mt={1} fontWeight="bold" fontSize={12} color={cardProps.selecionado ? Temas.colors.white : Temas.colors.black}>
          {comissao}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
