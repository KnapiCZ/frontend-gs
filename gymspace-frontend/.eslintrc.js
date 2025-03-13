module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-recommended", // Vue 3 specific linting rules
        "eslint:recommended", // ESLint recommended rules
        "@vue/typescript/recommended", // Vue + TypeScript recommended rules
        "prettier", // Add Standard coding style rules
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "prettier/prettier": "error", // Treat Prettier issues as ESLint errors
        "no-unused-vars": "warn",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "vue/no-deprecated-slot-attribute": "off",
        "@typescript-eslint/no-explicit-any": "off",
        // Add custom overrides or additional rules here
    },
    plugins: ["prettier"],
}
