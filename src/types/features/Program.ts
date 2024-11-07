import { Week } from './ProgramTypes'

export type Program = {
	id: number // pk
	profile: number // fk
	name: string
	startdate: string
	duration: number
	active: boolean
	order: number
	weeks?: ReadonlyArray<Week>
}
