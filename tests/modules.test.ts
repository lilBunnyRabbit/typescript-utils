import { Optional, OptionalValue } from "../src/modules";

describe("modules module", () => {
  describe("optional", () => {
    test("Optional(value)", () => {
      const optional: Optional<number> = Optional(123);
      expect(optional).toBeInstanceOf(OptionalValue);

      const nullOptional: Optional.Empty = Optional(null);
      expect(nullOptional).toBeInstanceOf(OptionalValue);

      const undefinedOptional: Optional.Empty = Optional(undefined);
      expect(undefinedOptional).toBeInstanceOf(OptionalValue);
    });

    test("Optional.empty()", () => {
      const optional = Optional.empty();
      expect(optional).toBeInstanceOf(OptionalValue);
    });

    test("Optional.get()", () => {
      const value = 123;

      const optional: Optional<number> = Optional(value);
      expect(optional.get()).toEqual(value);

      const nullOptional: Optional.Empty = Optional(null);
      expect(nullOptional.get()).toEqual(null);

      const undefinedOptional: Optional.Empty = Optional(undefined);
      expect(undefinedOptional.get()).toEqual(null);

      const emptyOptional = Optional.empty();
      expect(emptyOptional.get()).toEqual(null);
    });

    test("Optional.isPresent()", () => {
      const value = 123;

      const optional: Optional<number> = Optional(value);

      expect(optional.isPresent()).toBe(true);
      expect(optional.get()).toBe(value);

      const emptyOptional = Optional.empty();
      expect(emptyOptional.isPresent()).toBe(false);
      expect(emptyOptional.get()).toBe(null);
    });

    test("Optional.ifPresent(consumer)", () => {
      const value = 123;

      const optional: Optional<number> = Optional(value);

      let output = false;
      optional.ifPresent(() => (output = true));
      expect(output).toBe(true);

      const emptyOptional = Optional.empty();

      let emptyOutput = false;
      emptyOptional.ifPresent(() => (emptyOutput = true));
      expect(emptyOutput).toBe(false);
    });

    test("Optional.isEmpty()", () => {
      const value = 123;

      const optional: Optional<number> = Optional(value);

      expect(optional.isEmpty()).toBe(false);
      expect(optional.get()).toBe(value);

      const emptyOptional = Optional.empty();
      expect(emptyOptional.isEmpty()).toBe(true);
      expect(emptyOptional.get()).toBe(null);
    });

    test("Optional.ifEmpty(consumer)", () => {
      const value = 123;

      const optional: Optional<number> = Optional(value);

      let output = false;
      optional.ifEmpty(() => (output = true));
      expect(output).toBe(false);

      const emptyOptional = Optional.empty();

      let emptyOutput = false;
      emptyOptional.ifEmpty(() => (emptyOutput = true));
      expect(emptyOutput).toBe(true);
    });

    test("Optional.filter(predicate)", () => {
      const value = 1;

      const optional: Optional<number> = Optional(value);

      const trueFiltered = optional.filter((value) => value > 0);
      expect(trueFiltered).toBeInstanceOf(OptionalValue);
      expect(trueFiltered.get()).toBe(value);

      const falseFiltered = optional.filter((value) => value < 0);
      expect(falseFiltered).toBeInstanceOf(OptionalValue);
      expect(falseFiltered.isEmpty()).toBe(true);

      const emptyOptional = Optional.empty();

      const emptyTrueFiltered = emptyOptional.filter(() => true);
      expect(emptyTrueFiltered).toBeInstanceOf(OptionalValue);
      expect(emptyTrueFiltered.isEmpty()).toBe(true);

      const emptyFalseFiltered = emptyOptional.filter(() => false);
      expect(emptyFalseFiltered).toBeInstanceOf(OptionalValue);
      expect(emptyFalseFiltered.isEmpty()).toBe(true);
    });

    test("Optional.map(mapper)", () => {
      const value = 123;

      const optional: Optional<number> = Optional(value);

      const mapped = optional.map((value) => String(value));
      expect(mapped).toBeInstanceOf(OptionalValue);
      expect(mapped.get()).toBe(String(value));

      const emptyOptional = Optional.empty();

      const emptyMapped = emptyOptional.map((value) => String(value));
      expect(emptyMapped).toBeInstanceOf(OptionalValue);
      expect(emptyMapped.isEmpty()).toBe(true);
    });

    test("Optional.flatMap(mapper)", () => {
      const value = 123;

      const optional: Optional<number> = Optional(value);

      const flatMapped = optional.flatMap((value) => Optional(String(value)));
      expect(flatMapped).toBeInstanceOf(OptionalValue);
      expect(flatMapped.get()).toBe(String(value));

      const emptyOptional = Optional.empty();

      const emptyFlatMapped = emptyOptional.flatMap((value) => Optional(String(value)));
      expect(emptyFlatMapped).toBeInstanceOf(OptionalValue);
      expect(emptyFlatMapped.isEmpty()).toBe(true);
    });

    test("Optional.orElse(other)", () => {
      const value = 123;
      const other = 456;

      const optional: Optional<number> = Optional(value);

      const orElse = optional.orElse(other);
      expect(orElse).toEqual(value);

      const emptyOptional = Optional.empty();

      const emptyOrElse = emptyOptional.orElse(other);
      expect(emptyOrElse).toEqual(other);
    });

    test("Optional.orElseGet(other)", () => {
      const value = 123;
      const other = 456;

      const optional: Optional<number> = Optional(value);

      const orElseGet = optional.orElseGet(() => other);
      expect(orElseGet).toEqual(value);

      const emptyOptional = Optional.empty();

      const emptyOrElseGet = emptyOptional.orElseGet(() => other);
      expect(emptyOrElseGet).toEqual(other);
    });

    test("Optional.orElseThrow(errorSupplier)", () => {
      const value = 123;
      const error = new Error("Value not present");

      const optional: Optional<number> = Optional(value);

      const testOptional = () => optional.orElseThrow(() => error);

      expect(testOptional).not.toThrow(Error);
      expect(testOptional).not.toThrow(error.message);

      const emptyOptional = Optional.empty();

      const testEmptyOptional = () => emptyOptional.orElseThrow(() => error);

      expect(testEmptyOptional).toThrow(Error);
      expect(testEmptyOptional).toThrow(error.message);
    });
  });
});
