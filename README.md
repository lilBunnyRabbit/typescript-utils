# TypeScript Utils

[![npm version](https://img.shields.io/npm/v/@lilbunnyrabbit/utils.svg)](https://www.npmjs.com/package/@lilbunnyrabbit/utils)
[![npm downloads](https://img.shields.io/npm/dt/@lilbunnyrabbit/utils.svg)](https://www.npmjs.com/package/@lilbunnyrabbit/utils)

TypeScript Utils is a comprehensive collection of utilities tailored for [TypeScript](https://www.typescriptlang.org/) development, crafted to support a broad spectrum of projects and packages. This toolkit is designed to enhance developer productivity and code quality, offering a diverse array of utilities ranging from custom types and type guards to an extensive set of tools for event management, data manipulation, and more. Whether you're streamlining your development workflow, ensuring type safety, or facilitating event-driven architectures, TypeScript Utils provides the essential building blocks to elevate your [TypeScript](https://www.typescriptlang.org/) projects.

## Documentation

Explore the full capabilities of TypeScript Utils and learn how to integrate these utilities into your projects by visiting the [API Documentation](https://lilbunnyrabbit.github.io/typescript-utils/api).

## Installation

To use this package in your project, run:

```sh
npm i @lilbunnyrabbit/utils
```

## Development

This section provides a guide for developers to set up the project environment and utilize various npm scripts defined in the project for efficient development and release processes.

### Setting Up

Clone the repository and install dependencies:

```sh
git clone https://github.com/lilBunnyRabbit/typescript-utils.git
cd typescript-utils
npm install
```

### NPM Scripts

The project includes several npm scripts to streamline common tasks such as building, testing, and cleaning up the project.

| Script              | Description                                                                                                                                                                                       | Command                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **`build`**         | Compiles the [TypeScript](https://www.typescriptlang.org/) source code to JavaScript, placing the output in the `dist` directory. Essential for preparing the package for publication or testing. | `npm run build`         |
| **`test`**          | Executes the test suite using [Jest](https://jestjs.io/). Crucial for ensuring that your code meets all defined tests and behaves as expected.                                                    | `npm test`              |
| **`clean`**         | Removes both the `dist` directory and the `node_modules` directory. Useful for resetting the project's state during development or before a fresh install.                                        | `npm run clean`         |
| **`changeset`**     | Manages versioning and changelog generation based on conventional commit messages. Helps prepare for a new release by determining which parts of the package need version updates.                | `npm run changeset`     |
| **`release`**       | Publishes the package to npm. Uses `changeset publish` to automatically update package versions and changelogs before publishing. Streamlines the release process.                                | `npm run release`       |
| **`generate:docs`** | Generates project documentation using [Typedoc](https://typedoc.org/). Facilitates the creation of comprehensive and accessible API documentation.                                                | `npm run generate:docs` |

These scripts are designed to facilitate the development process, from cleaning and building the project to running tests and releasing new versions. Feel free to use and customize them as needed for your development workflow.

## Contribution

Contributions are always welcome! For any enhancements or bug fixes, please open a pull request linked to the relevant issue. If there's no existing issue related to your contribution, feel free to create one.

## Support

Your support is greatly appreciated! If this package has been helpful, consider supporting its development. Your contributions help maintain and improve this project.  

[![GitHub Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/lilBunnyRabbit)

## License

MIT © Andraž Mesarič-Sirec
