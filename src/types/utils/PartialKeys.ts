/**
 * From T, select a set properties to make optional.
 */
type PartialKeys<T, K extends keyof T = Extract<'id', keyof T>> = Partial<Omit<T, K>> & Pick<T, K>
