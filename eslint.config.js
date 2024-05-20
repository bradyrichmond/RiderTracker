import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import parser from '@typescript-eslint/parser'
import stylistic from '@stylistic/eslint-plugin'
import jsxAlly from 'jsx-ally'

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
      '@stylistic': stylistic,
      'jsx-ally': jsxAlly
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'jsx-a11y/alt-text': [ 2, {
        'elements': [ 'img', 'object', 'area', 'input[type=\'image\']' ],
        'img': ['Image'],
        'object': ['Object'],
        'area': ['Area'],
        'input[type=\'image\']': ['InputImage']
      }],
      'react/react-in-jsx-scope': ['off'],
      'react/jsx-no-useless-fragment': ['warn', { 'allowExpressions': true }],
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
      '@stylistic/semi-spacing': ['warn', { 'after': true }],
      '@stylistic/space-before-blocks': 'warn',
      '@stylistic/space-infix-ops': 'warn',
      '@stylistic/spaced-comment': ['warn', 'always'],
      '@stylistic/template-curly-spacing': 'warn',
      '@stylistic/type-annotation-spacing': ['warn', { 'before': false, 'after': true, 'overrides': { 'arrow': { 'before': true, 'after': true } } }],
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/quote-props': ['warn', 'as-needed']
    }
  }
]