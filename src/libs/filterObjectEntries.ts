type Entry<T> = {
	[K in keyof T]: [K, T[K]]
}[keyof T]

type FilterFunction<T> = (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean

/**
 * Helper function to filter an object from the entries.
 * @returns filtered object.
 */
export default <T extends object>(obj: T, fn: FilterFunction<T>) => {
	return Object.fromEntries((Object.entries(obj) as Entry<T>[]).filter(fn)) as Partial<T>
}
