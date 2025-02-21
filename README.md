<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
=======
# best-hackathon

## Prerequisites

Node.js (latest)
npm/yarn/pnpm

## Getting started
```
git clone git@github.com:DanisJa/best-hackathon.git
cd best-hackathon
```

## Install dependencies
npm:
```npm install```
yarn:
```yarn install```
pnpm:
```pnpm install```

## Run dev server:
npm:
```npm run dev```
yarn:
```yarn dev```
pnpm:
```pnpm dev```

## Build for prod
npm:
```npm run build```
yarn:
```yarn build```
pnpm:
```pnpm build```

## Preview prod build
npm:
```npm run preview```
yarn:
```yarn preview```
pnpm:
```pnpm preview```

## ENV variables (we know it is a security issue, but we trust the judges :D)
```VITE_SUPABASE_SERVICE_KEY: ```

```VITE_SUPABASE_URL: ```
>>>>>>> fbf316333b9334150014874b9c416cb6162ce0c2
