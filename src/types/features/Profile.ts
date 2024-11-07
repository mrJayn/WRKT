import type { ThemePreference } from '@styles/theme/types'
import type { Weekday } from '../utils'

type WeightUnits = 'lbs' | 'kgs'

type Profile = {
	/** The id of the current profile. */
	id?: number

	/** Indicates if push notifications are enabled. */
	notifications?: boolean

	/** The day index of the week that the week should start on.  */
	dayOneWkday?: Weekday

	/** The units of weight measurement. */
	units?: WeightUnits

	/** The preferred theme. Defaults to system. */
	theme?: ThemePreference
}

export type { WeightUnits, Profile }
