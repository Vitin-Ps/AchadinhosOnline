module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    // Regras personalizadas do ESLint
    'no-console': 'warn', // Avisar sobre o uso de console.log()
    'no-unused-vars': 'off', // Desabilitar a verificação de variáveis não utilizadas pelo ESLint
    '@typescript-eslint/no-unused-vars': 'error', // Habilitar a verificação de variáveis não utilizadas pelo TypeScript
    'react/prop-types': 'off', // Desabilitar a verificação de propTypes em componentes React
    'prettier/prettier': 'error', // Garantir que o código esteja formatado corretamente com o Prettier
  },
};
