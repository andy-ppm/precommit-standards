import importHelpers from 'eslint-plugin-import-helpers';
import eslintConfigPrettier from "eslint-config-prettier";
import pluginQuery from '@tanstack/eslint-plugin-query';
import react from 'eslint-plugin-react';
import globals from 'globals';
import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/node_modules/*",
      "**/coverage/*",
      "**/.swc/*",
      "**/.next/*",
      "**/.cache/*",
      "**/public/*",
      "next-env.d.ts",
      "next.config.ts",
      "tsconfig.json",
      "package-lock.json",
      "package.json",
      "yarn.lock",
      "postcss.config.mjs",
      ".prettierrc",
      "tailwind.config.ts",
      "eslint.config.mjs",
    ]
  },
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      'import-helpers': importHelpers,
      '@tanstack/query': pluginQuery,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'newline-before-return': 2,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
      'import-helpers/order-imports': [
        2,
        {
          newlinesBetween: 'ignore', // 'ignore', 'always', 'always-and-inside-groups', 'never'
          groups: [
            '/^react/',
            ['/^next/', 'module'],
            '/^@//',
            ['parent', 'sibling', 'index']
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true
          }
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_'
        }
      ],
      "prettier/prettier": [
        "error",
        {
          "endOfLine": "auto"
        }
      ],
      '@tanstack/query/exhaustive-deps': 'error',
    }
  },
  eslintConfigPrettier,
]
