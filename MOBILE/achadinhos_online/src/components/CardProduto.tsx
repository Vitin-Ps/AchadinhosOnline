import { Box, Image, Text } from "native-base";
import { Temas } from "../estilos/tema";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { converterMoedaReal } from "../services/FuncionalidadesService";
import { StyleSheet, TouchableOpacity } from "react-native";

interface cardProps{
    imagem?: string;
    valor: number;
    nome: string;
    selecionado?: boolean;
    onPress?: () => void;
}

export function CardProduto(cardProps: cardProps) {
  const timestamp = new Date().getTime(); // Obtém o timestamp atual
const uri = `${cardProps.imagem}?timestamp=${timestamp}`;
    const valor: string = converterMoedaReal(cardProps.valor)!;
    const styles = StyleSheet.create({
        card: {
          backgroundColor: cardProps.selecionado ? Temas.colors.roxo.transparente : Temas.colors.white,
          width: 150,
          height: 200,
          margin: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 10,
          padding: 10,
          ...(cardProps.selecionado ? {} : Temas.shadow)
        }
      })
    return (
       <TouchableOpacity style={styles.card} onPress={cardProps.onPress}>
       
       {cardProps.imagem ? ( <Image
          source={{uri: uri}}
          alt={"img_produto_" + cardProps.nome}
          w="130px"
          h="80px"
          borderRadius={15}
        />) : (<Box m={2}><FontAwesomeIcon icon={faBox} size={50} color={cardProps.selecionado ? Temas.colors.white : Temas.colors.roxo.claro}/></Box>)}
        <Text fontSize={20} fontWeight="bold" m={2} color={cardProps.selecionado ? Temas.colors.white : Temas.colors.black}>
          {valor}
        </Text>
        <Text color={cardProps.selecionado ? Temas.colors.white : Temas.colors.black}>{cardProps.nome}</Text>
       </TouchableOpacity>
    )
}