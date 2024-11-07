/**
 * Utility type to get the first three characters of a string.
 */
type FirstThreeChars<S extends string> = S extends ''
	? ''
	: S extends `${infer A}${infer B}${infer C}${infer Rest}`
	? `${A}${B}${C}`
	: never
