import type { Weekday } from '../utils'
import type { Exercise } from './Exercises'

type Day = {
	id: number
	workout: number // fk
	name: string
	dayIndex: Weekday
	exercises?: readonly Exercise[]
}

type DayWithExercises = Day & {
	exercises: readonly Exercise[]
}

export type { Day }
