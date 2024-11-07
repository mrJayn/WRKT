import type { Week } from './Week'

export type Program = {
	id: number // pk
	profile: number // fk
	name: string
	startdate: string
	duration: number
	isActive: boolean
	order: number
	weeks?: readonly Week[]
}
