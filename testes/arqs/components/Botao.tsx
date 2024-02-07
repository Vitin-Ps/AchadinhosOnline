import {Button} from 'native-base';
import {Temas} from '../estilos/tema';

const Botao = ({isLoading, ...rest}: any) => {
  let fundoBotao = Temas.colors.roxo.normal;

  if (isLoading) {
    fundoBotao = Temas.colors.verde.claro;
  }

  return (
    <Button
      w="40%"
      h={60}
      p={2}
      bg={fundoBotao}
      mt={10}
      borderRadius={10}
      isLoadingText="Verificando"
      isLoading={isLoading}
      {...rest}></Button>
  );
};

export const EstadoClick = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsLoading(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
};

export default Botao;
