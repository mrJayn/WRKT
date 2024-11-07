import { Exercise } from './Exercises'

export type Week = {
	id: number // pk
	program: number // fk
	week_id: number
	exercises?: ReadonlyArray<Exercise>
}
