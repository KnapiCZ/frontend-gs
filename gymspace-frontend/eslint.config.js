import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
    // 1. TypeScript & Vue Defaults
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],

    // 2. Custom Rules & Plugins
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        // Apply to all Vue and TS files
        files: ['*.vue', '**/*.vue', '*.ts', '**/*.ts'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                sourceType: 'module',
            },
        },
        rules: {
            // General housekeeping
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'yoda': ['error', 'never'],
            'vue/block-order': ['error', {
                order: ['script', 'template', 'style']
            }],
            'vue/multi-word-component-names': 'off',
        },
    },
]