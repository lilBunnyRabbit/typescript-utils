import { Equals } from "./misc";

/**
 * Reverses an array type.
 *
 * @template T - The array type to be reversed.
 */
export type ArrayReverse<T extends unknown[], Reversed extends unknown[] = []> = T extends [
  infer Head extends unknown,
  ...infer Tail extends unknown[]
]
  ? ArrayReverse<Tail, [Head, ...Reversed]>
  : Reversed;

/**
 * Removes the first element from an array type and returns the rest.
 *
 * @template T - The array type to shift.
 */
export type ArrayShift<T extends unknown[]> = T extends [unknown, ...infer Tail] ? Tail : [];

/**
 * Adds an element to the beginning of an array type.
 *
 * @template T - The original array type.
 * @template U - The type of the element to add to the array.
 */
export type ArrayUnshift<T extends unknown[], U> = [U, ...T];

/**
 * Adds an element to the end of an array type.
 *
 * @template T - The original array type.
 * @template U - The type of the element to add to the array.
 */
export type ArrayPush<T extends unknown[], U> = [...T, U];

/**
 * Removes the last element from an array type and returns the rest.
 *
 * @template T - The array type to pop the last element from.
 */
export type ArrayPop<T extends any[]> = T extends [...infer Rest, any] ? Rest : [];

/**
 * Returns the type of the first element in an array type.
 *
 * @template T - The array type to obtain the first element type from.
 */
export type ArrayFirst<T extends any[]> = T extends [infer First, ...any] ? First : never;

/**
 * Returns the type of the last element in an array type.
 *
 * @template T - The array type to obtain the last element type from.
 */
export type ArrayLast<T extends any[]> = T extends [...any[], infer Last] ? Last : never;

/**
 * Converts a tuple to a union of its values.
 *
 * @template T - The tuple type to convert.
 */
export type TupleToUnion<T extends unknown[]> = T[number];

/**
 * Concatenates two array types.
 *
 * @template T - The first array type.
 * @template U - The second array type.
 */
export type ConcatArrays<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U];

/**
 * Determines whether an array type includes a type.
 *
 * @template T - The array type.
 * @template U - The type to check for inclusion.
 */
export type ArrayIncludes<T extends readonly any[], U> = T extends [infer First, ...infer Rest]
  ? Equals<U, First> extends true
    ? true
    : ArrayIncludes<Rest, U>
  : false;

/**
 * Returns the length of a tuple type.
 *
 * @template T - The tuple type.
 */
export type ArrayLength<T extends readonly unknown[]> = T["length"];

/**
 * Transforms a tuple of property keys into an object type.
 *
 * @template T - The tuple of property keys.
 */
export type TupleToObject<T extends readonly PropertyKey[]> = {
  [K in T[number]]: K;
};

/**
 * Array type that allows null and undefined values.
 *
 * @template TElement - Element type.
 */
export type NullableArray<TElement> = Array<TElement | null | undefined>;
