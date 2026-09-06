import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        jsx: true,
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        // Browser APIs
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        Blob: "readonly",
        HTMLInputElement: "readonly",
        Storage: "readonly",
        // Node.js/Next.js
        process: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
];
