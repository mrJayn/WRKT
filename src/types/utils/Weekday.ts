import type { ValueOf } from './ValueOf'

type FirstThreeChars<S> = S extends `${infer A}${infer B}${infer C}${string}` ? `${A}${B}${C}` : never

// enum WeekdayValues {
// 	Sunday,
// 	Monday,
// 	Tuesday,
// 	Wednesday,
// 	Thurday,
// 	Friday,
// 	Saturday,
// }

const WeekdayValuesMap = {
	Sunday: 0,
	Monday: 1,
	Tuesday: 2,
	Wednesday: 3,
	Thurday: 4,
	Friday: 5,
	Saturday: 6,
} as const

type Weekday = ValueOf<typeof WeekdayValuesMap>

type WeekdayName = keyof typeof WeekdayValuesMap

type WeekdayShortName = FirstThreeChars<WeekdayName>

export type { Weekday, WeekdayName, WeekdayShortName }
