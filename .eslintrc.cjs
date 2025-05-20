module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'error',
      { allowConstantExport: true },
    ],
    "constructor-super": "off",
    "getter-return": "off",
    "no-const-assign": "off",
    "no-dupe-args": "off",
    "no-dupe-class-members": "off",
    "no-dupe-keys": "off",
    "no-func-assign": "off",
    "no-import-assign": "off",
    "no-new-symbol": "off",
    "no-obj-calls": "off",
    "no-redeclare": "off",
    "no-setter-return": "off",
    "no-this-before-super": "off",
    "no-undef": "off",
    "no-unreachable": "off",
    "no-unsafe-negation": "off",
    "react/react-in-jsx-scope": "off",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "no-restricted-imports": "error",
    "no-console": "error"
  },
}
