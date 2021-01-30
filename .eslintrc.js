module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 0,
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'never'],
    'jsx-quotes': ['error', 'prefer-single']
  }
};