import type { Exercise } from './Exercises'

export type Week = {
	id: number // pk
	program: number // fk
	week_id: number
	exercises?: readonly Exercise[]
}
