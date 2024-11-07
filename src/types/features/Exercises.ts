type Set = {
	id: number
	exercise: number // fk
	sets?: string | undefined
	reps?: string | undefined
	weight?: string | undefined
}

type WorkoutExerciseFKs = { day: number; week?: undefined }
type ProgramExerciseFKs = { day?: undefined; week: number }

type BaseExercise = {
	id: number
	name: string
	order: number
	library_ref?: number | undefined
	sets?: ReadonlyArray<Set> | undefined
}

type Exercise = BaseExercise & (WorkoutExerciseFKs | ProgramExerciseFKs)

type WorkoutExercise = BaseExercise & WorkoutExerciseFKs
type ProgramExercise = BaseExercise & ProgramExerciseFKs

export type { Exercise, Set }
