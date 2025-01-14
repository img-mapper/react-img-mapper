module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-fragments': ['error', 'element'],
    'react/require-default-props': [
      'error',
      {
        functions: 'defaultArguments',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
  },
};
