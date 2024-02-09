import React, {useEffect, useState} from 'react';
import {Select} from 'native-base';
import {Temas} from '../estilos/tema';
import {Funcionario} from '../interfaces/Funcionario';

interface ComboProps {
  label: string;
  placeholder?: string;
  items: Funcionario[]; // Ajuste o tipo da propriedade 'items'
  onChangeText?: (itemValue: Funcionario) => void; // Adicione a função de retorno de chamada
}

export default function ComboBox(comboProps: ComboProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined,
  );

  const handleChange = (itemValue: string) => {
    setSelectedValue(itemValue); // Atualiza o valor selecionado
    console.log(itemValue);
    if (comboProps.onChangeText) {
      comboProps.items.forEach(item => {
        if (item.id === Number(itemValue)) comboProps.onChangeText!(item);
      });
    }
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
      selectedValue={selectedValue}
      onValueChange={itemValue => handleChange(itemValue)}>
      {comboProps.items.map(item => (
        <Select.Item key={item.id} label={item.nome} value={String(item.id)} />
      ))}
    </Select>
  );
}
