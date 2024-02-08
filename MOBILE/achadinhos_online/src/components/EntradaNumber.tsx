import {Box, View} from 'native-base';
import {Temas} from '../estilos/tema';
import {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

interface InputProps {
  label?: string;
  icon: IconDefinition;
  color?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

export function EntradaNumber(inputProps: InputProps): JSX.Element {
  const [valor, setValor] = useState('');

  const validaInputNumber = (text: string) => {
    // Remove caracteres não numéricos
    const numberFormatado = text.replace(/[^0-9]/g, '');
    setValor(numberFormatado);
    if (inputProps.onChangeText) {
      inputProps.onChangeText(numberFormatado);
    }
  };

  return (
    //
    <View style={styles.inputContainer}>
      <Box m={1}>
        <FontAwesomeIcon
          icon={inputProps.icon}
          color={inputProps.color ? inputProps.color : Temas.colors.roxo.normal}
          size={20}
        />
      </Box>
      <TextInput
        keyboardType="numeric"
        style={styles.inputNumber}
        value={valor}
        onChangeText={validaInputNumber}
        placeholder={inputProps.placeholder}
        placeholderTextColor={Temas.colors.cinza.claro}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: Temas.colors.roxo.escuro,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 25
  },
  icon: {
    marginRight: 10,
  },
  inputNumber: {
    flex: 1,
    color: Temas.colors.roxo.claro,
    paddingHorizontal: 10,
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
