import {Box, Icon, Input} from 'native-base';
import {Temas} from '../estilos/tema';
import {useState} from 'react';
import {Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconDefinition, faEye, faEyeDropper, faEyeSlash, faUser} from '@fortawesome/free-solid-svg-icons';

interface InputProps {
  icon: IconDefinition;
  color?: string;
  placeholder?: string;
  mt?: string;
  senha?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

export function EntradaTexto(inputProps: InputProps): JSX.Element {
  const [show, setShow] = useState(false);
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
        <Box ml={2}>
          <FontAwesomeIcon
            icon={inputProps.icon}
            color={
              inputProps.color ? inputProps.color : Temas.colors.roxo.normal
            }
            size={20}
          />
        </Box>
      }
      InputRightElement={
        inputProps.senha ? (
          <Pressable onPress={() => setShow(prevShow => !prevShow)}>
            <Box mr={5}>
              <FontAwesomeIcon
                icon={show ? faEyeSlash : faEye}
                color={
                  inputProps.color ? inputProps.color : Temas.colors.roxo.normal
                }
                size={25}
              />
            </Box>
          </Pressable>
        ) : undefined
      }
    />
  );
}
