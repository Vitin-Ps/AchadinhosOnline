import { ITextProps, Text } from 'native-base'

interface TextoProps extends ITextProps {
  children: React.ReactNode
}

const Titulo = ({ children, ...rest }: TextoProps) => {
  return (
    <Text
      mt={5}
      w="100%"
      fontSize={25}
      fontWeight="bold"
      textAlign="center"
      color="white"
      {...rest}
    >
      {children}
    </Text>
  )
}

export default Titulo
