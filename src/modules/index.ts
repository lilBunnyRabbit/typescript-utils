/**
 * The `modules` directory contains a set of distinct, focused submodules that extend the package's functionality.
 * Each submodule is designed to provide specific functionalities or utilities that can be independently integrated into projects.
 * This modular structure allows for flexible adoption, enabling users to include only the parts of the package
 * that are relevant to their needs.
 *
 * ## Importing
 *
 * ```ts
 * import * as Modules from "@lilbunnyrabbit/utils/modules";
 * ```
 *
 * @packageDocumentation
 */

export * from "./event-emitter";
export * from "./optional";
