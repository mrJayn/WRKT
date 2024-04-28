import { ForeignKey } from '../utils'
import { Exercise } from './Exercises'

type Workout<TDay extends Day = Day> = {
	id: number
	profile: ForeignKey
	name: string
	is_active: boolean
	order: number
	days?: ReadonlyArray<TDay>
}

type EditableWorkout = {
	id: number
	name?: string
	is_active?: boolean
	order?: number
}

type Day<TExercise extends Exercise = Exercise> = {
	id: number
	workout: ForeignKey
	name: string
	day_id: number
	exercises?: ReadonlyArray<TExercise>
}

export type { Workout, EditableWorkout, Day }
