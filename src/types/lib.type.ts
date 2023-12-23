// eslint-disable-next-line @typescript-eslint/no-type-alias
export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export type ConditionalKeys<Base, Condition> = NonNullable<
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;
