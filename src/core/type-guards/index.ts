/**
 * The `type-guards` submodule within the core module offers a collection of type guards.
 * Type guards are essential utilities that allow for more robust type checking and are crucial
 * for ensuring type safety at runtime. These utilities enable developers to distinguish between types using conditional checks,
 * thereby facilitating safer type assertions and operations on different types of data.
 *
 * @packageDocumentation
 */

/**
 * Checks if a value is undefined.
 *
 * @param value - The value to check.
 * @return `true` if the value is `undefined`, `false` otherwise.
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Checks if a value is null.
 *
 * @param value - The value to check.
 * @return `true` if the value is `null`, `false` otherwise.
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks if a value is either `undefined` or `null`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is `undefined` or `null`, `false` otherwise.
 */
export function isNullable(value: unknown): value is undefined | null {
  return isUndefined(value) || isNull(value);
}

/**
 * Checks if a value is not `undefined` and not `null`.
 *
 * @template TType - The type of the value to check.
 * @param value - The value to check.
 * @returns `true` if the value is neither `undefined` nor `null`, `false` otherwise.
 */
export function isNonNullable<TType>(value: TType): value is NonNullable<TType> {
  return !isNullable(value);
}

/**
 * Checks if a value is a number.
 *
 * @param value - The value to check.
 * @return `true` if the value is a `number`, `false` otherwise.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

/**
 * Checks if a value is a string.
 *
 * @param value - The value to check.
 * @return `true` if the value is a `string`, `false` otherwise.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Checks if a value is a non-nullable object.
 *
 * @param value - The value to check.
 * @return `true` if the value is an `object` and is neither `undefined` nor `null`, `false` otherwise.
 */
export function isObject(value: unknown): value is object {
  return typeof value === "object" && isNonNullable(value);
}

/**
 * Checks if a value is a function.
 *
 * @template TArgs - Type of the function arguments.
 * @template TReturn - Return type of the function.
 * @param value - The value to check.
 * @return `true` if the value is a `Function`, `false` otherwise.
 */
export function isFunction<TArgs extends any[] = any[], TReturn = any>(
  value: unknown
): value is (...args: TArgs) => TReturn {
  return typeof value === "function";
}

/**
 * Checks if a value is an empty string.
 *
 * @param value - The value to check.
 * @return `true` if the value is an empty `string`, `false` otherwise.
 */
export function isEmptyString(value: unknown): value is "" {
  return isString(value) && value.length === 0;
}

/**
 * Checks if a value is an array. Doesn't include typed arrays.
 *
 * @template TType - Type of the array elements.
 * @param value - The value to check.
 * @return `true` if the value is an `Array`, `false` otherwise.
 */
export function isArray<TType>(value: unknown): value is TType[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is an array of a specific type.
 *
 * @template TType - Type of the array elements.
 * @param value - The value to check.
 * @param isType - Type guard function for the array elements.
 * @return `true` if the value is an `Array` of the specified type, `false` otherwise.
 */
export function isArrayOfType<TType>(value: unknown, isType: (element: unknown) => element is TType): value is TType[] {
  return isArray<unknown>(value) && value.every((element) => isType(element));
}

/**
 * Checks if a value is a CustomEvent instance.
 *
 * @param value - The value to check.
 * @return `true` if the value is a `CustomEvent` instance, `false` otherwise.
 */
export function isCustomEvent(value: unknown): value is CustomEvent {
  return value instanceof CustomEvent;
}

/**
 * Checks if a value is an Error instance.
 *
 * @param value - The value to check.
 * @return `true` if the value is an `Error` instance, `false` otherwise.
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}
