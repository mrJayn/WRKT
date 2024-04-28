type Entry<T> = {
	[K in keyof T]: [K, T[K]]
}[keyof T]

type FilterFn<T> = (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean

function filterObject<T extends object>(obj: T, fn: FilterFn<T>) {
	return Object.fromEntries((Object.entries(obj) as Entry<T>[]).filter(fn)) as Partial<T>
}

export { filterObject }
