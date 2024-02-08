import {Box, CheckIcon, Select} from 'native-base';
import {Temas} from '../estilos/tema';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Funcionario } from '../interfaces/Funcionario';

interface ComboProps {
    label: string;
    placeholder?: string;
    items: Funcionario[],
    onChangeText?: (text: string) => void;
  }

export default function ComboBox(comboProps: ComboProps) {
  const handleChange = (itemValue: string) => {
    console.log('Novo valor selecionado:', itemValue);
    // Adicione aqui a lógica para lidar com a mudança de valor
  };

  return (
    <Select
      accessibilityLabel={comboProps.label}
      placeholder={comboProps.placeholder}
      w="100%"
      borderColor={Temas.colors.roxo.escuro}
      mt={5}
      p={4}
      fontSize="20px"
      fontWeight="bold"
      placeholderTextColor={Temas.colors.cinza.claro}
      color={Temas.colors.roxo.normal}
      borderRadius={15}
      >
      {comboProps.items.map(item => (
        <Select.Item key={item.id} label={item.nome} value={String(item.id)} />
      ))}
    </Select>
  );
}
