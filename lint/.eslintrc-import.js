module.exports = {
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  extends: ['plugin:import/recommended', 'plugin:import/typescript'],
  rules: {
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['./*', '../*'],
            message: "Please use the absolute path '@/*' instead.",
          },
          {
            group: ['@/api/api'],
            message: 'Please use the api default export instead.',
          },
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          ['unknown', 'type'],
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        distinctGroup: true,
        pathGroupsExcludedImportTypes: ['type'],
        warnOnUnassignedImports: true,
      },
    ],
    'import/no-unresolved': 'error',
  },
};
