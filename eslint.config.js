import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import parser from '@typescript-eslint/parser'
import stylistic from '@stylistic/eslint-plugin'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'

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
      'jsx-a11y': jsxA11y,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
      'tseslint': tseslint,
      'react-hooks': reactHooks
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
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
      '@stylistic/quote-props': ['warn', 'as-needed'],
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-ambiguous-text': 'off',
      // TODO: error
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/autocomplete-valid': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/control-has-associated-label': ['off', {
        ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video'],
        ignoreRoles: ['grid', 'listbox', 'menu', 'menubar', 'radiogroup', 'row', 'tablist', 'toolbar', 'tree', 'treegrid'],
        includeRoles: ['alert', 'dialog']
      }],
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/interactive-supports-focus': ['error', {
        tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox']
      }],
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/media-has-caption': 'error',
      'jsx-a11y/mouse-events-have-key-events': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/no-distracting-elements': 'error',
      'jsx-a11y/no-interactive-element-to-noninteractive-role': ['error', {
        tr: ['none', 'presentation'],
        canvas: ['img']
      }],
      'jsx-a11y/no-noninteractive-element-interactions': ['error', {
        handlers: ['onClick', 'onError', 'onLoad', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
        alert: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
        body: ['onError', 'onLoad'],
        dialog: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
        iframe: ['onError', 'onLoad'],
        img: ['onError', 'onLoad']
      }],
      'jsx-a11y/no-noninteractive-element-to-interactive-role': ['error', {
        ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
        table: ['grid'],
        td: ['gridcell'],
        fieldset: ['radiogroup', 'presentation']
      }],
      'jsx-a11y/no-noninteractive-tabindex': ['error', {
        tags: [],
        roles: ['tabpanel'],
        allowExpressionValues: true
      }],
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/no-static-element-interactions': ['error', {
        allowExpressionValues: true,
        handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp']
      }],
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/scope': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
]