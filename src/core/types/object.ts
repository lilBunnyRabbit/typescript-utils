/**
 * Makes properties of an object type prettier by enforcing an identity mapping.
 * Useful for fixing type display issues in TypeScript.
 *
 * @template T - The object type to be prettified.
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Makes specified keys of an object type optional. If no keys are specified, all properties are made optional.
 *
 * @template T - The object type.
 * @template K - The keys within T to be made optional.
 */
export type PickPartial<T, K extends keyof T = keyof T> = Prettify<
  {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;

/**
 * Makes specified keys of an object type required. If no keys are specified, all properties are made required.
 *
 * @template T - The object type.
 * @template K - The keys within T to be made required.
 */
export type PickRequired<T, K extends keyof T = keyof T> = Prettify<
  {
    [P in keyof T as P extends K ? P : never]-?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;

/**
 * Picks properties from an object type where the property types are assignable to a specified type.
 *
 * @template T - The object type.
 * @template U - The type to which the properties' types should be assignable.
 */
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

/**
 * Makes specified keys of an object type readonly. If no keys are specified, all properties are made readonly.
 *
 * @template T - The object type.
 * @template K - The keys within T to be made readonly.
 */
export type PickReadonly<T, K extends keyof T = keyof T> = {
  readonly [P in keyof T as P extends K ? P : never]: T[P];
} & {
  [P in keyof T as P extends K ? never : P]: T[P];
};

/**
 * Makes selected keys in `T` required and non-nullable.
 *
 * @template T - The object type.
 * @template K - The keys to be modified.
 */
export type PickRequiredNullable<T, K extends keyof T> = T & {
  [P in K]-?: Exclude<T[P], undefined | null>;
};

/**
 * Makes properties nullable or undefined, except those specified by `OmitKeys`.
 *
 * @template T - The object type.
 * @template OmitKeys - Keys in `T` not affected. Defaults to none.
 */
export type PartialWithNullable<T, OmitKeys extends keyof T = never> = {
  [K in keyof T]?: K extends OmitKeys ? T[K] : T[K] | undefined | null;
};

/**
 * Makes every property of an object type (and its sub-objects) recursively readonly.
 *
 * @template T - The object type.
 */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends PropertyKey | Function ? T[K] : DeepReadonly<T[K]>;
};

/**
 * Makes every property of an object type (and its sub-objects) recursively optional.
 *
 * @template T - Object type.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends PropertyKey | Function ? T[K] : DeepPartial<T[K]>;
};

/**
 * Makes every property of an object type (and its sub-objects) recursively non-nullable.
 *
 * @template T - The object type.
 */
export type DeepNonNullable<T> = {
  [K in keyof T]-?: T[K] extends PropertyKey | Function ? NonNullable<T[K]> : DeepNonNullable<T[K]>;
};

/**
 * Merges two object types. Keys of the second type override keys of the first type.
 *
 * @template First - The first object type.
 * @template Second - The second object type.
 */
export type MergeObjects<First, Second> = {
  [K in keyof (First & Second)]: K extends keyof Second ? Second[K] : K extends keyof First ? First[K] : never;
};

/**
 * Returns a type representing the difference between two object types.
 *
 * @template First - The first object type.
 * @template Second - The second object type.
 */
export type ObjectDifference<First, Second> = {
  [K in keyof (First & Second) as K extends keyof First
    ? K extends keyof Second
      ? never
      : K
    : K]: K extends keyof First ? First[K] : K extends keyof Second ? Second[K] : never;
};
