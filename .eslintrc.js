module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'plugin:storybook/recommended',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  plugins: ['react', 'prettier', 'jsx-a11y', '@typescript-eslint', 'react-hooks'],
  parserOptions: {
    typescript: true,
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    },
  ],
  rules: {
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
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prefer-destructuring': [
      1,
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'class-methods-use-this': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'prefer-template': 2,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/display-name': 0,
    'react/jsx-closing-bracket-location': 2,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/jsx-wrap-multilines': 0,
    'react/destructuring-assignment': 0,
    'require-yield': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'import/extensions': 0,
    'no-empty': [
      2,
      {
        allowEmptyCatch: true,
      },
    ],
    'react/prop-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    // There is a bug with typescript-eslint... It's safe anyway to remove this rule since typescript will do checks anyway
    'no-use-before-define': 0,
    // We want to be able to throw error objects
    'no-throw-literal': 0,
    'arrow-body-style': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'no-param-reassign': ['error', { props: false }],
    // Due to a bug caused by the typescript-eslint parser, newly created enums will be incorrectly
    // marked as already defined in the upper scope. This could be fixed by updating the library.
    // See https://github.com/typescript-eslint/tslint-to-eslint-config/issues/856
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['@', './src'],
        ],
        extensions: ['.d.ts', '.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
};
