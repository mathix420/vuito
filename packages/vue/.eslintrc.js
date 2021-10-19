module.exports = {
    extends: ['prettier', 'plugin:prettier/recommended'],
    rules: {},
    plugins: ['prettier'],
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module',
      allowImportExportEverywhere: true,
    },
  };
  