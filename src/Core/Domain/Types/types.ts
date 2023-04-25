type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Uppercase<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}`
  : S;

export type SnakeCaseKeys<T> = {
  [K in keyof T as SnakeCase<string & K>]: T[K];
};
