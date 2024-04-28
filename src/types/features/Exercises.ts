import { ForeignKey } from '../utils'

type Set = {
	id: number
	exercise: ForeignKey
	sets?: string | undefined
	reps?: string | undefined
	weight?: string | undefined
}

type ExerciseForeignKeys =
	| {
			day: ForeignKey
			week?: undefined
	  }
	| {
			day?: undefined
			week: ForeignKey
	  }

type Exercise = {
	id: number
	name: string
	order: number
	library_ref?: ForeignKey | undefined
	sets?: ReadonlyArray<Set> | undefined
} & ExerciseForeignKeys

export type { Exercise, Set }
