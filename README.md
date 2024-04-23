# Learner Management System

This is part of the Learner Management System (LMS) tutorial, that was provided on Youtube by Code With Stein. It consists of a basic LMS 
that uses Vue for the frontend and Django for the backend.

![image](https://github.com/MinatoNami/vue-lms/assets/23627532/8f5bf74d-a09e-4b58-8ace-4a1246f544f2)
![image](https://github.com/MinatoNami/vue-lms/assets/23627532/2a17ace0-32f8-4c37-be4d-f0c7d61433d0)

This project consists of the following features:
1. Ability for user to login and logout (token authentication done on the backend).
2. Role-based accounts (admin and regular user).
3. CRUD for courses, lessons, quizzes and comments.
4. Course progression for users (active courses).
5. BULMA CSS framework for UI components.

Django backend: https://github.com/MinatoNami/django-lms
Tutorial link: https://youtu.be/VQcQKDWcWwE?si=_blVp2RFxYuDouuN

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
