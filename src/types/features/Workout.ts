import type { Day } from './Day'

type Workout = {
	/** Unique key for the workout. ( pk ) */
	id: number

	/** Display name for the workout. */
	name: string

	/**
	 * Whether this workout should be used in the Main Display Screen.
	 * Note that a user can only have **1** workout be active at a time.
	 */
	isActive: boolean

	//  DEL BELOW  //
	/** Unique key for the related profile. ( fk ) */
	profile: number
	order?: number
	days?: readonly Day[]
}

export type { Workout }
