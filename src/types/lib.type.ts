// eslint-disable-next-line @typescript-eslint/no-type-alias
export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };
