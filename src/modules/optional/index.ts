/**
 * {@link https://www.typescriptlang.org/ TypeScript} implementation of {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html java.util.Optional<T>}.
 *
 * > **Definition**
 * > A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value.
 * > Additional methods that depend on the presence or absence of a contained value are provided, such as orElse() (return a default value if value not present) and ifPresent() (execute a block of code if the value is present).
 * >
 * > This is a value-based class; use of identity-sensitive operations (including reference equality (==), identity hash code, or synchronization) on instances of Optional may have unpredictable results and should be avoided.
 *
 * The main difference is that it doesn't throw errors if the value is not defined and simply just returns `null`.
 *
 * @packageDocumentation
 */

/**
 * A {@link https://www.typescriptlang.org/ TypeScript} implementation inspired by Java's `Optional`,
 * designed as a container object that may or may not contain a non-null value.
 * It offers methods for handling the value's presence or absence in a more expressive and safer way,
 * aiming to reduce the chances of null pointer exceptions.
 *
 * @template T - The type of the value that may be contained within.
 */
export class OptionalValue<T> {
  /**
   * Initializes a new instance with the provided value, which can be `null` or `undefined`.
   *
   * @template T - The type of the value that may be contained within.
   * @param value - The initial value, potentially `null` or `undefined`.
   * @protected to prevent direct instantiation from outside the class.
   */
  protected constructor(private value: T) {}

  /**
   * Determines whether the provided value is neither `null` nor `undefined`.
   *
   * @template T - The type of the value that may be contained within.
   * @param value - The value to check.
   * @returns `true` if the value is present; otherwise, `false`.
   */
  static isPresent<T>(value: T): value is NonNullable<T> {
    return value !== undefined && value !== null;
  }

  /**
   * Creates an instance without any contained value.
   *
   * @returns An instance representing the absence of any value.
   */
  static empty(): Optional.Empty {
    return new OptionalValue(null);
  }

  /**
   * Wraps a given value in an instance if the value is non-null;
   * otherwise, returns an instance representing no value.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public static <T> Optional<T> of(T value)`}
   *
   * @template T - The type of the value that may be contained within.
   * @param value - The possibly-null value to wrap.
   * @returns An instance containing the value if non-null;
   *          otherwise, an instance representing no value.
   *
   * @example
   * ```ts
   * const optional: Optional<number> = OptionalValue.of(123);
   * ```
   *
   * @example
   * ```ts
   * const optionalString: Optional<string> = OptionalValue.of("123" as string | undefined | null);
   * const optionalNull: OptionalEmpty = OptionalValue.of(null);
   * const optionalUndefined: OptionalEmpty = OptionalValue.of(undefined);
   * ```
   */
  static of<T>(value: T): Optional<NonNullable<T>> {
    if (OptionalValue.isPresent(value)) {
      return new OptionalValue(value);
    }

    return OptionalValue.empty();
  }

  /**
   * Retrieves the contained value.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public T get()`}
   *
   * @template T - The type of the value that may be contained within.
   * @returns The contained value, which may be `null` if no value is present.
   *
   * @example
   * ```ts
   * const value: number | null = optional.get();
   * ```
   */
  public get(): T {
    return this.value;
  }

  /**
   * Checks whether a value is contained within.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public boolean isPresent()`}
   *
   * @template T - The type of the value contained within the instance.
   * @returns `true` if a value is present; otherwise, `false`.
   *
   * @example
   * ```ts
   * if (optional.isPresent()) {
   *   const copy: OptionalPresent<number> = optional;
   *   const value: number = optional.get();
   * } else {
   *   const copy: OptionalEmpty = optional;
   *   const value: null = optional.get();
   * }
   * ```
   */
  public isPresent(): this is Optional.Present<T> {
    return OptionalValue.isPresent(this.value);
  }

  /**
   * Executes a given function with the contained value if present; does nothing otherwise.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public void ifPresent(Consumer<? super T> consumer)`}
   *
   * @template T - The type of the value that may be contained within.
   * @param consumer - A function to execute with the contained value.
   *
   * @example
   * ```ts
   * optional.ifPresent((value) => console.log("Present:", value));
   * ```
   */
  public ifPresent(consumer: (value: NonNullable<T>) => void): this {
    if (this.isPresent()) {
      consumer(this.value);
    }

    return this;
  }

  /**
   * Determines whether the instance does not contain a value.
   *
   * @returns `true` if no value is present; otherwise, false.
   *
   * @example
   * ```ts
   * if (optional.isEmpty()) {
   *   const copy: OptionalEmpty = optional;
   *   const value: null = optional.get();
   * } else {
   *   const copy: OptionalPresent<number> = optional;
   *   const value: number = optional.get();
   * }
   * ```
   */
  public isEmpty(): this is Optional.Empty {
    return !OptionalValue.isPresent(this.value);
  }

  /**
   * Executes a given function if no value is contained within.
   *
   * @param consumer - A function to execute if no value is present.
   *
   * @example
   * ```ts
   * optional.ifEmpty(() => console.log("Empty"));
   * ```
   */
  public ifEmpty(consumer: () => void): this {
    if (this.isEmpty()) {
      consumer();
    }

    return this;
  }

  /**
   * Applies a predicate to the contained value if present,
   * returning an instance containing the value only if the predicate is satisfied.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public Optional<T> filter(Predicate<? super T> predicate)`}
   *
   * @template U - The type of the value that may be contained within.
   * @param predicate - A predicate function to apply to the contained value.
   * @returns An instance containing the value if the predicate is satisfied;
   *          otherwise, an instance representing no value.
   *
   * @example
   * ```ts
   * const filtered: Optional<number> = optional.filter((value) => value > 3);
   * ```
   */
  public filter<U>(this: Optional<U>, predicate: (value: NonNullable<U>) => boolean): Optional<U> {
    if (this.isEmpty()) {
      return this;
    }

    if (predicate(this.value)) {
      return this;
    }

    return OptionalValue.empty();
  }

  /**
   * Applies a mapping function to the contained value if present,
   * wrapping the result in a new instance if the result is non-null.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public <U> Optional<U> map(Function<? super T,? extends U> mapper)`}
   *
   * @template U - The type of the value that may be contained within.
   * @template V - The type of the value that may be contained within the result of the mapping function.
   * @param mapper - A function to apply to the contained value.
   * @returns An instance containing the result of the mapping function if the result is non-null;
   *          otherwise, an instance representing no value.
   *
   * @example
   * ```ts
   * const mapped: Optional<string> = optional.map((value) => String(value));
   * ```
   */
  public map<U, V>(this: Optional<U>, mapper: (value: NonNullable<U>) => V): Optional<V> {
    if (this.isEmpty()) {
      return this;
    }

    const mapped = mapper(this.value);
    if (OptionalValue.isPresent(mapped)) {
      return OptionalValue.of(mapped);
    }

    return OptionalValue.empty();
  }

  /**
   * Applies a flat-mapping function to the contained value if present,
   * returning the direct result of the function without additional wrapping.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public <U> Optional<U> flatMap(Function<? super T,Optional<U>> mapper)`}
   *
   * @template U - The type of the value that may be contained within.
   * @template V - The type of the value that may be contained within the result of the mapping function.
   * @param mapper - A flat-mapping function to apply to the contained value.
   * @returns The result of the mapping function, or an instance representing
   *          no value if the original instance does not contain a value.
   *
   * @example
   * ```ts
   * const flatMapped: Optional<string> = optional.flatMap((value) => Optional(String(value)));
   * ```
   */
  public flatMap<U, V>(this: Optional<U>, mapper: (value: NonNullable<U>) => Optional<V>): Optional<V> {
    if (this.isEmpty()) {
      return this;
    }

    return mapper(this.value);
  }

  /**
   * Retrieves the contained value if present; otherwise, returns a specified alternative value.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public T orElse(T other)`}
   *
   * @template U - The type of the value that may be contained within.
   * @param other - The alternative value to return if no value is contained.
   * @returns The contained value if present; otherwise, the alternative value.
   *
   * @example
   * ```ts
   * const orElse: number = optional.orElse(123);
   * ```
   */
  public orElse<U>(this: Optional<U>, other: NonNullable<U>): NonNullable<U> {
    if (this.isPresent()) {
      return this.value;
    }

    return other;
  }

  /**
   * Retrieves the contained value if present; otherwise, invokes a supplier function and returns its result.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public T orElseGet(Supplier<? extends T> other)`}
   *
   * @template U - The type of the value that may be contained within.
   * @param other - A supplier function providing an alternative value.
   * @returns The contained value if present; otherwise, the result of the supplier function.
   *
   * @example
   * ```ts
   * const orElseGet: number = optional.orElseGet(() => 123);
   * ```
   */
  public orElseGet<U>(this: Optional<U>, other: () => NonNullable<U>): NonNullable<U> {
    if (this.isPresent()) {
      return this.value;
    }

    return other();
  }

  /**
   * Retrieves the contained value if present; otherwise, throws an error provided by a supplier function.
   *
   * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html Java Reference: `public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X extends Throwable`}
   *
   * @template T - The type of the value contained within the instance.
   * @template E - type of the `Error` to be thrown.
   * @param errorSupplier A supplier function that provides the error to be thrown.
   * @returns The contained value if present; otherwise, throws the supplied error.
   *
   * @example
   * ```ts
   * try {
   *   const value: number = optional.orElseThrow(() => new Error("Value not present"));
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  public orElseThrow<E extends Error>(errorSupplier: () => E): NonNullable<T> {
    if (this.isPresent()) {
      return this.value;
    }

    throw errorSupplier();
  }
}

/**
 * A {@link https://www.typescriptlang.org/ TypeScript} implementation inspired by Java's `Optional`,
 * designed as a container object that may or may not contain a non-null value.
 * It offers methods for handling the value's presence or absence in a more expressive and safer way,
 * aiming to reduce the chances of null pointer exceptions.
 */
export namespace Optional {
  /**
   * Represents the type for an instance that does not contain any value.
   * This type is used to signify the absence of a value explicitly.
   */
  export type Empty = OptionalValue<null>;

  /**
   * Represents the type for an instance that contains a non-null value.
   * This type is used to handle cases where a value is definitely present.
   *
   * @template T - The type of the value contained within the instance.
   */
  export type Present<T> = OptionalValue<NonNullable<T>>;
}

/**
 * A {@link https://www.typescriptlang.org/ TypeScript} implementation inspired by Java's `Optional`,
 * designed as a container object that may or may not contain a non-null value.
 * It offers methods for handling the value's presence or absence in a more expressive and safer way,
 * aiming to reduce the chances of null pointer exceptions.
 */
export type Optional<T> = Optional.Empty | Optional.Present<T>;

/**
 * Defines a function that works with the concept of optionality,
 * either returning an instance encapsulating a value,
 * if non-null, or an instance signifying the absence of a value.
 */
interface OptionalFunction {
  /**
   * Creates an instance encapsulating the given value if it is non-null.
   * If the value is null, it returns an instance signifying the absence of any value.
   * This allows for the safe handling of values that might be `null` or `undefined`.
   *
   * @template T - The type of the value that may be contained within.
   * @param value - The value to evaluate and potentially encapsulate.
   * @returns An instance representing either the presence of a non-null value or the absence of a value.
   */
  <T>(value: T): Optional<NonNullable<T>>;

  /**
   * Creates an instance that signifies the absence of any value.
   * This is used to represent cases where a value is explicitly known to be absent or unavailable.
   *
   * @returns An instance representing the absence of a value.
   */
  empty(): Optional.Empty;
}

/**
 * A {@link https://www.typescriptlang.org/ TypeScript} implementation inspired by Java's `Optional`,
 * designed as a container object that may or may not contain a non-null value.
 * It offers methods for handling the value's presence or absence in a more expressive and safer way,
 * aiming to reduce the chances of null pointer exceptions.
 *
 * @example
 * ```ts
 * const optional: Optional<number> = Optional(123);
 * ```
 *
 * @example
 * ```ts
 * const optionalString: Optional<string> = Optional("123" as string | undefined | null);
 * const optionalNull: OptionalEmpty = Optional(null);
 * const optionalUndefined: OptionalEmpty = Optional(undefined);
 * ```
 */
export const Optional = OptionalValue.of as OptionalFunction;

Optional.empty = OptionalValue.empty;
