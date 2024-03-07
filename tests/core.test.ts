import {
  isArray,
  isArrayOfType,
  isCustomEvent,
  isEmptyString,
  isError,
  isFunction,
  isNonNullable,
  isNull,
  isNullable,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "../src/core";

const primitives = {
  string: "123", // String
  emptyString: "", // String
  number: 0, // Number
  boolean: false, // Boolean
  symbol: Symbol("a unique identifier"), // Symbol
  undefined: undefined, // Undefined
  null: null, // Null
} as const;

const objects = {
  object: { key: "value" }, // Object
  array: [1, 2, 3], // Array
  typedArray: new Uint8Array(), // Typed Array
  function: function () {
    console.log("Hello!");
  }, // Function
  arrowFunction: () => {
    console.log("Hello!");
  }, // Arrow Function
  regex: /ab+c/, // RegExp
  promise: Promise.resolve("resolved"), // Promise
  error: new Error("error message"), // Error
  map: new Map(),
  set: new Set(),
} as const;

const types = { ...primitives, ...objects } as const;

describe("core module", () => {
  describe("type-guards", () => {
    test("isUndefined", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (key === "undefined") {
          expect(isUndefined(value)).toBe(true);
        } else {
          expect(isUndefined(value)).toBe(false);
        }
      }
    });

    test("isNull", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (key === "null") {
          expect(isNull(value)).toBe(true);
        } else {
          expect(isNull(value)).toBe(false);
        }
      }
    });

    test("isNullable", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (["undefined", "null"].includes(key)) {
          expect(isNullable(value)).toBe(true);
        } else {
          expect(isNullable(value)).toBe(false);
        }
      }
    });

    test("isNonNullable", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (["undefined", "null"].includes(key)) {
          expect(isNonNullable(value)).toBe(false);
        } else {
          expect(isNonNullable(value)).toBe(true);
        }
      }
    });

    test("isNumber", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (key === "number") {
          expect(isNumber(value)).toBe(true);
        } else {
          expect(isNumber(value)).toBe(false);
        }
      }
    });

    test("isString", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (["string", "emptyString"].includes(key)) {
          expect(isString(value)).toBe(true);
        } else {
          expect(isString(value)).toBe(false);
        }
      }
    });

    test("isObject", () => {
      for (const key in primitives) {
        const value: unknown = primitives[key as keyof typeof primitives];

        expect(isObject(value)).toBe(false);
      }

      for (const key in objects) {
        const value: unknown = objects[key as keyof typeof objects];

        if (["function", "arrowFunction"].includes(key)) {
          expect(isObject(value)).toBe(false);
        } else {
          expect(isObject(value)).toBe(true);
        }
      }
    });

    test("isFunction", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (["function", "arrowFunction"].includes(key)) {
          expect(isFunction(value)).toBe(true);
        } else {
          expect(isFunction(value)).toBe(false);
        }
      }
    });

    test("isEmptyString", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (key === "emptyString") {
          expect(isEmptyString(value)).toBe(true);
        } else {
          expect(isEmptyString(value)).toBe(false);
        }
      }
    });

    test("isArray", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (key === "array") {
          expect(isArray(value)).toBe(true);
        } else {
          expect(isArray(value)).toBe(false);
        }
      }
    });

    test("isArrayOfType", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (key === "array") {
          expect(isArrayOfType(value, isNumber)).toBe(true);
          expect(isArrayOfType(value, isString)).toBe(false);
        } else {
          expect(isArrayOfType(value, (value: unknown): value is any => false)).toBe(false);
        }
      }
    });

    test("isCustomEvent", () => {
      expect(isCustomEvent(new CustomEvent("test"))).toBe(true);

      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        expect(isCustomEvent(value)).toBe(false);
      }
    });

    test("isError", () => {
      for (const key in types) {
        const value: unknown = types[key as keyof typeof types];

        if (key === "error") {
          expect(isError(value)).toBe(true);
        } else {
          expect(isError(value)).toBe(false);
        }
      }
    });
  });

  describe("types", () => {
    // TODO: types testing
  });
});
