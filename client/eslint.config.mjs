import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
