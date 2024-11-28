/**
 * Compares two types for equality.
 *
 * @template X - The first type.
 * @template Y - The second type.
 */
export type Equals<X, Y> = (<T>() => T extends X ? true : false) extends <T>() => T extends Y ? true : false
  ? true
  : false;
