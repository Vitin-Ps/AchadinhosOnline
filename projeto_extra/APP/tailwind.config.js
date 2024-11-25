module.exports = {
  content: [
    './src/**/*.{js,ts}',
    './src/**/*.html',  
    './src/styles/**/*.css',
  ],
  important: true,
  theme: {
    screens: {
      sm: '480px',
      'max-600': { max: '600px' },
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      // Tons neutros (cinzas e brancos)
      gray100: '#f7f7f7', 
      gray200: '#efefef',
      gray300: '#d9d9d9',
      gray400: '#8a8a8a',
      gray500: '#333333', 
      white: '#ffffff', 
      black: '#000000', 

      // Tons de roxo
      purple100: '#f3e9ff', 
      purple200: '#d953f7',
      purple300: '#c353f7',
      purple400: '#8056ff',
      purple500: '#6700ac',
      purple600: '#6904ce',
      purpleTransparent: '#8036b2a1', 

      // Tons de azul
      blue100: '#e0f4ff', 
      blue200: '#90dfff',
      blue300: '#1fb6ff', 
      blue400: '#0b87cc', 

      // Tons de vermelho
      red100: '#ffe5e5', 
      red200: '#ff7a7a',
      red300: '#db0c00', 
      red400: '#990000', 

      // Tons de verde
      green100: '#eaffec', 
      green200: '#a8f7c1',
      green300: '#1ddc67', 
      green400: '#128a45', 

      // Tons de rosa
      pink100: '#ffe3f4', 
      pink200: '#ff49db', 

      // Outros tons
      orange100: '#ffe5d1',
      orange200: '#ff7849',
      yellow100: '#fff7d1',
      yellow200: '#ffc82c',

      // Sombras e transparências
      shadow100: '#ffffff26', 
      shadow200: '#00000015', 
      shadow300: '#00000035', 

      // Extras
      transparent: '#00000000',
    },

    fontFamily: {  
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        // 'marca-d-agua': "url('../SVG/MarcaDagua.svg')",       
      },
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
      scaleUp: {
        '0%': { transform: 'scale(0.5)' },
        '100%': { transform: 'scale(1)' },
      },
      scaleDown: {
        '0%': { transform: 'scale(1)' },
        '100%': { transform: 'scale(0.5)' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.5s ease-out forwards',
      fadeOut: 'fadeOut 0.5s ease-out forwards',
      scaleUp: 'scaleUp 0.5s ease-out forwards',
      scaleDown: 'scaleDown 0.5s ease-out forwards',
    },
  },
  plugins: [],
};
