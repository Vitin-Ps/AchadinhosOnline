import {Box, Text} from 'native-base';
import {Temas} from '../estilos/tema';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {converterMoedaReal} from '../services/FuncionalidadesService';

interface Props {
  totalVendas: number;
  valorTotal: number;
  comissaoTotal?: number;
}

export default function CardVendasInfo(props: Props) {
  const valorTotal = converterMoedaReal(props.valorTotal);
  const comissaoTotal: string | undefined = converterMoedaReal(
    props.comissaoTotal,
  );
  return (
    <Box>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[
          Temas.colors.roxo.muitoClaro,
          Temas.colors.roxo.claro,
          Temas.colors.roxo.normal,
        ]}
        style={styles.card}>
        <Box
          w="90%"
          bgColor={Temas.colors.white}
          p={2}
          display="flex"
          alignItems="center"
          flexDirection="row"
          justifyContent="space-around">
          <Box display="flex" alignItems="center">
            <Text fontWeight="bold">Total Vendas</Text>
            <Text>{props.totalVendas}</Text>
          </Box>
          <Box display="flex" alignItems="center">
            <Text fontWeight="bold">Valor</Text>
            <Text>{valorTotal}</Text>
          </Box>
          {comissaoTotal && (
            <Box display="flex" alignItems="center">
              <Text fontWeight="bold">Comissão</Text>
              <Text>{comissaoTotal}</Text>
            </Box>
          )}
        </Box>
      </LinearGradient>
    </Box>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    ...Temas.shadow,
  },
});
