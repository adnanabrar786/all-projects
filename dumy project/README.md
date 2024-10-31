# Quick-GPT

## Version: 0.1.0

Seed is a private project for scaffolding. This project is built using Node.js version 18.16.0 and includes a range of dependencies for web development and analytics.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Scripts](#scripts)
- [Commit Standards](#commit-standards)
- [Commit Format](#commit-format)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)

## Prerequisites

Before you can start using Seeds, make sure you have the following prerequisites installed:

- Node.js >= 18.16.0

## Scripts

Seeds provides the following scripts for development and testing:

- `dev`: Start the development server with Next.js.
- `build`: Build the Next.js application.
- `start`: Start the Next.js production server.
- `prepare`: Install Husky hooks.
- `lint`: Lint TypeScript and JavaScript files using ESLint.
- `check-app-types`: Check TypeScript types for the application.
- `check-test-types`: Check TypeScript types for tests.
- `check-lint`: Run ESLint to check code style.
- `check-format`: Check code formatting using Prettier.
- `format`: Automatically format code using Prettier.
- `test`: Run Jest tests.
- `test:watch`: Run Jest tests in watch mode.

## Commit Standards

We follow a specific set of commit standards for this project. Each commit message should start with a type and include a brief description. Here are the commit types and their meanings:

- **feat**: For new features or enhancements.
- **fix**: For bug fixes.
- **chore**: Typically for maintenance tasks or things not directly related to the codebase (hidden in the changelog).
- **docs**: For documentation changes (hidden in the changelog).
- **style**: For code style changes (hidden in the changelog).
- **refactor**: For code refactoring (hidden in the changelog).
- **perf**: For performance improvements (hidden in the changelog).
- **test**: For adding or modifying tests (hidden in the changelog).

## Commit Format

Each commit message should follow this format:
<type>: <description>
For Example:

```
feat: Add user authentication
fix: Fix issue with login button
```

## Dependencies

Seeds has the following dependencies:

- `@emotion/react`: ^11.11.1
- `@emotion/styled`: ^11.11.0
- `@mui/icons-material`: ^5.11.16
- `@mui/material`: ^5.13.4
- `@mui/system`: ^5.13.2
- `@mui/x-date-pickers`: ^6.12.1
- `@tanstack/react-query`: ^4.35.0
- `@tanstack/react-query-devtools`: ^4.35.0
- `@tanstack/react-query-next-experimental`: ^5.0.0-alpha.80
- `@typegoose/typegoose`: ^11.4.1
- `@types/node`: 20.2.5
- `@types/react`: 18.2.9
- `@types/react-dom`: 18.2.4
- `axios`: ^1.5.0
- `dayjs`: ^1.11.9
- `eslint`: 8.2.0
- `eslint-config-next`: 13.4.4
- `formik`: ^2.4.3
- `luxon`: ^3.3.0
- `mongoose`: ^7.4.5
- `next`: ^13.4.19
- `next-i18next`: ^14.0.0
- `react`: 18.2.0
- `react-big-calendar`: ^1.8.2
- `react-dom`: 18.2.0
- `react-dropzone`: ^14.2.3
- `react-i18next`: ^13.2.1
- `react-query`: ^3.39.3
- `react-toastify`: ^9.1.3
- `styled-components`: ^6.0.7
- `typescript`: 5.1.3
- `yup`: ^1.2.0

## Dev Dependencies

Seeds uses the following dev dependencies:

- `@commitlint/cli`: ^17.6.5
- `@commitlint/config-conventional`: ^17.6.5
- `@testing-library/jest-dom`: ^5.16.5
- `@testing-library/react`: ^14.0.0
- `@types/jest`: ^29.5.2
- `@types/luxon`: ^3.3.0
- `@types/react-redux`: ^7.1.25
- `@typescript-eslint/eslint-plugin`: ^5.13.0
- `@typescript-eslint/parser`: ^5.0.0
- `autoprefixer`: ^10.4.14
- `eslint-config-airbnb`: 19.0.4
- `eslint-config-airbnb-typescript`: ^17.0.0
- `eslint-config-prettier`: ^8.8.0
- `eslint-plugin-import`: 2.25.3
- `eslint-plugin-jsx-a11y`: 6.5.1
- `eslint-plugin-prettier`: ^4.2.1
- `eslint-plugin-react`: 7.28.0
- `eslint-plugin-react-hooks`: 4.3.0
- `husky`: ^8.0.3
- `jest`: ^29.5.0
- `jest-environment-jsdom`: ^29.5.0
- `lint-staged`: ^13.2.2
- `postcss`: ^8.4.24
- `prettier`: ^2.8.8
- `ts-jest`: ^29.1.0
- `ts-node`: ^10.9.1
