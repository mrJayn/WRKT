type Only<T, U> = {
	[P in keyof T]: T[P]
} & {
	[P in keyof U]?: never
}

/**
 * Requires one of T or U, and makes the other optional.
 */
export type Either<T, U> = Only<T, U> | Only<U, T>
