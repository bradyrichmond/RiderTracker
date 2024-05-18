import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import stylistic from '@stylistic/eslint-plugin'
import reactRefresh from 'eslint-plugin-react-refresh'


export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: globals.browser
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
      'sort-imports': ['error', {
          'ignoreCase': false,
          'ignoreDeclarationSort': false,
          'ignoreMemberSort': false,
          'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
          'allowSeparatedGroups': false
      }],
      '@stylistic/array-bracket-newline': ['error', 'always'],
      '@stylistic/array-element-newline': ['error', 'always'],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/block-spacing': 'error',
      '@stylistic/brace-style': 'error',
      '@stylistic/comma-spacing': ['error', { 'before': false, 'after': true }],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/key-spacing': ['error', { 'beforeColon': false }],
      '@stylistic/keyword-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/max-len': ['error', {
        'code': 80,
        'tabWidth': 4,
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true
      }],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/object-curly-newline': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/padded-blocks': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single', { 'avoidEscape': true }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/semi-spacing': 'error',
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/template-curly-spacing': 'error',
  
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
]