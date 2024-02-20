import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Temas} from '../estilos/tema';

interface Props {
  duracao: number;
}

export default function ProgressBar(props: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: props.duracao, // Tempo em milissegundos (5 segundos neste exemplo)
      useNativeDriver: false, // Desative se precisar de funcionalidades específicas do layout
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: '90%',
        maxWidth: 400,
        marginTop: 30,
        backgroundColor: Temas.colors.cinza.muitoClaro,
        borderRadius: 25,
      }}>
      <Animated.View
        style={{
          width: progress.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
          height: 25,
          backgroundColor: Temas.colors.roxo.escuro,
          borderRadius: 25,
        }}
      />
    </Animated.View>
  );
}
