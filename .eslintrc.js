module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './playground/tsconfig.json'],
  },
  ignorePatterns: ['.eslintrc.js'],
  root: true,
  env: {
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    './lint/.eslintrc-typescript.js',
    './lint/.eslintrc-import.js',
    './lint/.eslintrc-react.js',
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-void': 'off',
    'consistent-return': 'off',
    'no-array-constructor': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    'no-restricted-syntax': [
      'error',
      'ForStatement',
      'ForInStatement',
      'ForOfStatement',
      'ContinueStatement',
      'DoWhileStatement',
      'WhileStatement',
      'WithStatement',
      // REACT
      {
        selector: 'MemberExpression[object.name="React"]',
        message: 'Use of React.method is not allowed.',
      },
      // TYPESCRIPT
      {
        selector: 'TSTypeReference[typeName.left.name="React"]',
        message: 'Use of React.type is not allowed.',
      },
    ],
  },
};
