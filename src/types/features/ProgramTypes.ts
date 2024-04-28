import { ForeignKey } from '../utils'
import { Exercise } from './Exercises'

type Program<TWeek extends Week = Week> = {
	id: number
	profile: ForeignKey
	name: string
	startdate: string
	duration: number
	active: boolean
	order: number
	weeks?: ReadonlyArray<TWeek>
}

type Week<TExercise extends Exercise = Exercise> = {
	id: number
	program: ForeignKey
	week_id: number
	exercises?: ReadonlyArray<TExercise>
}

export type { Program, Week }
