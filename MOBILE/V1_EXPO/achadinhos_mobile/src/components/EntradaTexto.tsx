import { Icon, Input } from 'native-base'
import { Temas } from '../estilos/tema'
import { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Pressable } from 'react-native'

interface InputProps {
  icon: string
  color?: string
  placeholder?: string
  mt?: string
  senha?: boolean
  value?: string
  onChangeText?: (text: string) => void
}

export function EntradaTexto(inputProps: InputProps): JSX.Element {
  const [show, setShow] = useState(false)
  return (
    <Input
      mt={inputProps.mt ? inputProps.mt : 5}
      fontSize="20px"
      fontWeight="bold"
      width="100%"
      color={Temas.colors.roxo.claro}
      borderColor={Temas.colors.roxo.escuro}
      borderRadius={15}
      p={4}
      // shadow={3}
      placeholder={inputProps.placeholder}
      value={inputProps.value}
      onChangeText={inputProps.onChangeText}
      type={inputProps.senha ? (show ? 'text' : 'password') : 'text'}
      InputLeftElement={
        <Icon
          as={<Ionicons name={inputProps.icon} />}
          color={inputProps.color ? inputProps.color : Temas.colors.roxo.normal}
          size={6}
          ml={2}
        />
      }
      InputRightElement={
        inputProps.senha == true && (
          <Pressable onPress={() => setShow((prevShow) => !prevShow)}>
            <Icon
              as={<Ionicons name={show ? 'eye-off' : 'eye'} />}
              color={
                inputProps.color ? inputProps.color : Temas.colors.roxo.normal
              }
              size={6}
              ml={2}
              mr={3}
            />
          </Pressable>
        )
      }
    />
  )
}
