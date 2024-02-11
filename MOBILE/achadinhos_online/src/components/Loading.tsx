import {Box, Spinner} from 'native-base';
import {Temas} from '../estilos/tema';

export function Loading({...rest}) {
  return (
    <Box height="400px" justifyContent="center" alignItems="center" {...rest}>
      <Spinner size={70} color={Temas.colors.roxo.normal} />
    </Box>
  );
}
