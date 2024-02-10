import {extendTheme} from 'native-base';

export const Temas = extendTheme({
  colors: {
    padrao: {
      corFundo: '#FFF',
      corAlerta: '#6904CE',
    },
    branco: {
      brancoTransparent: '#ffffffe7',
    },
    roxo: {
      transparente: '#45009396',
      claro: '#8801D1',
      normal: '#6904CE',
      escuro: '#5F229C',
      muitoEscuro: '#4A2C69',
    },
    verde: {
      claro: '#80CF9A',
      normal: '#04CF47',
      escuro: '#2C6940',
      muitoEscuro: '#244A3B',
    },
    cinza: {
      muitoClaro: '#d8d8d8',
      claro: '#989898',
      escuro: '#3E3E3E',
    },
  },
  estiloFontes: {
    Arial: 'Arial',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  shadow: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 5,
  },
});
