# NPM Package Template

[![npm version](https://img.shields.io/npm/v/@lilbunnyrabbit/utils.svg)](https://www.npmjs.com/package/@lilbunnyrabbit/utils)
[![npm downloads](https://img.shields.io/npm/dt/@lilbunnyrabbit/utils.svg)](https://www.npmjs.com/package/@lilbunnyrabbit/utils)

This repository serves as a template for creating npm packages, simplifying the setup and development process for your npm packages. Replace all the `<name>` with the name of the repository and/or package.

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

- **`build`**: Compiles the TypeScript source code to JavaScript, placing the output in the `dist` directory. This script is essential for preparing the package for publication or testing in a built form.
    ```sh
    npm run build
    ```
- **`test`**: Executes the test suite using Jest. This script is crucial for ensuring that your code meets all defined tests and behaves as expected.
    ```sh
    npm test
    ```
- **`clean`**: Removes both the `dist` directory and the `node_modules` directory. Useful for resetting the project's state during development or before a fresh install of dependencies.
    ```sh
    npm run clean
    ```
- **`changeset`**: Manages versioning and changelog generation based on conventional commit messages. This script helps in preparing for a new release by determining which parts of the package need version updates.
    ```sh
    npm run changeset
    ```
- **`release`**: Publishes the package to npm. It uses `changeset publish` to update package versions and changelogs automatically before publishing. This script streamlines the release process, making it easier to publish new versions of your package.
    ```sh
    npm run release
    ```

These scripts are designed to facilitate the development process, from cleaning and building the project to running tests and releasing new versions. Feel free to use and customize them as needed for your development workflow.

## Contribution

Contributions are always welcome! Please read the contribution guidelines first.

## Support

If you find this template useful, consider supporting by buying me a coffee.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/lilBunnyRabbit)

## License

MIT © Andraž Mesarič-Sirec
