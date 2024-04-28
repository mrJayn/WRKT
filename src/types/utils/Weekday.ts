import ValueOf from './ValueOf'

enum Weekday {
	Sunday,
	Monday,
	Tuesday,
	Weday,
	Thurday,
	Friday,
	Saturday,
}

type WeekdayIndex = ValueOf<typeof Weekday>
// type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

export default Weekday

export type { WeekdayIndex }
