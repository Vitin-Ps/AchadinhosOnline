import { Button, ITextProps} from 'native-base'
import { Temas } from '../estilos/tema'

interface TextoProps extends ITextProps {
  children: React.ReactNode
  isLoading?: boolean
}

const Botao = ({ children, isLoading, ...rest }: TextoProps) => {
  let fundoBotao = Temas.colors.roxo.normal

  if (isLoading) {
    fundoBotao = Temas.colors.verde.claro
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
      {...rest}
    >
      {children}
    </Button>
  )
}

export const EstadoClick = (setIsLoading) => {
  setIsLoading(true) // quando eu clico vai pra true
  setTimeout(() => {
    setIsLoading(false) // depois de 2000 milessegundos ele volta pra false
  }, 2000)
}

export default Botao
