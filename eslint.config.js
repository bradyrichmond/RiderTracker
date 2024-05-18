import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import parser from '@typescript-eslint/parser'
import stylistic from '@stylistic/eslint-plugin'

export default [
  pluginJs.configs.recommended,
  pluginReactConfig,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: globals.browser,
      parser
    },
    plugins: {
      'react-refresh': reactRefresh,
      '@stylistic': stylistic
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': ['off'],
      '@stylistic/arrow-spacing': 'warn',
      '@stylistic/block-spacing': 'warn',
      '@stylistic/function-call-spacing': ['warn', 'never'],
      '@stylistic/jsx-curly-spacing': ['warn', {'when': 'never', 'children': true }],
      '@stylistic/jsx-equals-spacing': ['warn', 'never'],
      '@stylistic/jsx-tag-spacing': ['warn'],
      '@stylistic/keyword-spacing': ['warn', { 'before': true, 'after': true }],
      '@stylistic/no-trailing-spaces': 'warn',
      '@stylistic/no-whitespace-before-property': 'warn',
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/semi-spacing': 'error',
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/quote-props': ['warn', 'as-needed']
    }
  }
]