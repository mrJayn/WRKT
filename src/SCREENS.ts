/**
 * This is a file containing constants for all of the screen names. In most cases, we should use the routes for
 * navigation. But there are situations where we may need to access screen names directly.
 */

import { DeepValueOf } from './types/utils'

const PROTECTED_SCREENS = {
	HOME: 'Home',
} as const

const SCREENS = {
	...PROTECTED_SCREENS,
	//
	TRANSITION_BETWEEN_APPS: 'TransitionBetweenApps',
	REFRESH_TOKEN: 'RefreshToken',

	/** Public screens. */
	GETTING_STARTED: 'Getting_Started',
	REGISTER: {
		ROOT: 'Register',
		WITH_EMAIL: `Register_With_Email`,
		WITH_PHONE_NUMBER: `Register_With_Phone_Number`,
		CREATE_PASSWORD: `Register_Create_Password`,
		CREATE_USERNAME: `Register_Create_Profile`,
		//
		USER_EXISTS_MODAL: 'Register_User_Exists_Modal',
		CREATE_USER: 'Register_Create_User',
	},
	LOGIN: `Login`,
	FORGOT_PASSWORD: `Forgot_Password`,

	/** Auth screens. */
	TABS: {
		ROOT: 'Tabs',
		MAIN: 'Tabs_Main',
		WORKOUTS: 'Tabs_Workouts',
		PROGRAMS: 'Tabs_Program',
		SETTINGS: 'Tabs_Settings',
	},

	/** workout screens */
	WORKOUTS: {
		ROOT: 'Workout',
		DAYS: `Workout_Days`,
		DAYS_DETAIL: `Workout_Days_Detail`,
	},

	/** program screens */
	PROGRAMS: {
		ROOT: 'Programs',
		WEEKS: 'Programs_Weeks',
		WEEKS_DETAIL: 'Programs_Weeks_Detail',
	},

	/**
	 * Details Navigator for ...
	 * [ Days / Weeks ]-list-screens and
	 * [ Days / Weeks ]-detail-screens
	 */
	DETAIL: {
		ROOT: 'Detail',
		ITEMS: `Detail_Items`,
		ITEMS_DETAIL: `Detail_Items_Detail`,
	},

	/** profile screens */
	SETTINGS: {
		ROOT: 'Settings',
		ACCOUNT: `Settings_Account`,
		PREFERENCES: `Settings_Preferences`,
		MAXES: `Settings_Maxes`,
		LIBRARY: `Settings_Library`,
		DELETE_ACCOUNT: `Settings_DeleteAccount`,
	},

	/** Root modal screens */
	LINK_MODAL: 'LinkModal',

	/** catch-all screen */
	NOT_FOUND: 'NotFound',
} as const

type Screen = DeepValueOf<typeof SCREENS>

export default SCREENS

export { PROTECTED_SCREENS }

export type { Screen }
