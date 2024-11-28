/**
 * Transforms a string literal into a union of its characters.
 *
 * @template T - The string literal type to transform.
 */
export type StringToUnion<T extends string, Union = never> = T extends `${infer Head extends string}${infer Tail}`
  ? StringToUnion<Tail, Union | Head>
  : Union;

/**
 * Replaces a substring within a string type with another string, once.
 *
 * @template S - The original string type.
 * @template From - The substring to replace.
 * @template To - The string to replace with.
 */
export type Replace<S extends string, From extends string, To extends string> = S extends `${infer Head}${Exclude<
  From,
  ""
>}${infer Tail}`
  ? `${Head}${To}${Tail}`
  : S;

/**
 * Replaces all occurrences of a substring within a string type with another string.
 *
 * @template S - The original string type.
 * @template From - The substring to replace.
 * @template To - The string to replace with.
 */
export type ReplaceAll<S extends string, From extends string, To extends string> = S extends `${infer Head}${Exclude<
  From,
  ""
>}${infer Tail}`
  ? `${Head}${To}${ReplaceAll<Tail, From, To>}`
  : S;

/**
 * Computes the length of a string literal type.
 *
 * @template S - The string literal type.
 */
export type LengthOfString<S extends string, Length extends unknown[] = []> = S extends `${string}${infer Rest}`
  ? LengthOfString<Rest, [unknown, ...Length]>
  : Length["length"];

/**
 * Adds all the elements of an array into a string, separated by the specified separator string.
 *
 * @template TArray - The array type to join.
 * @template TSeparator - The separator type.
 */
export type Join<TArray extends unknown[], TSeparator extends string | number> = TArray extends [
  infer TElement extends string | number,
  ...infer TRest
]
  ? TRest["length"] extends 0
    ? `${TElement}`
    : `${TElement}${TSeparator}${Join<TRest, TSeparator>}`
  : never;
