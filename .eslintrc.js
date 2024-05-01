module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    'no-console': 'error',
    quotes: [1, 'double'],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
    ],
    'require-jsdoc': [
      'warn',
      {
        require: {
          ArrowFunctionExpression: true,
          FunctionExpression: true,
        },
      },
    ],

    'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
