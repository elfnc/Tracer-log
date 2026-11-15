import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default defineConfig([
    { ignores: ['dist', 'node_modules'] },
    js.configs.recommended,
    tseslint.configs.recommended,
    vue.configs['flat/recommended'],
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
    },
    { languageOptions: { globals: globals.browser } },
    prettier,
    { rules: { 'vue/multi-word-component-names': 'off' } },
])