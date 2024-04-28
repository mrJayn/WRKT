import type { IsEqual, ValueOf } from './types/utils'
import type CONST from './CONST'
import { LinkModalType } from '@screens/LinkModal'
import { Workout } from './types/features'
/**
 * Builds a URL with an encoded URI component for the `backTo` param which can be added to the end of URLs
 */
function getUrlWithBackToParam<TUrl extends string>(
	url: TUrl,
	backTo?: string
): `${TUrl}` | `${TUrl}?backTo=${string}` | `${TUrl}&backTo=${string}` {
	const backToParam = backTo ? (`${url.includes('?') ? '&' : '?'}backTo=${encodeURIComponent(backTo)}` as const) : ''
	return `${url}${backToParam}` as const
}

const ROUTES = {
	// ROOT will redirect the user to the last visited path if it exists, otherwise to the home page.
	ROOT: '',

	/**
	 * If the root navigator extends public screens, then this
	 * route will render the `Getting-Started-Screen`,
	 * otherwise it will render the `Tabs-Navigator`.
	 */
	HOME: 'home',

	REFRESH: `refresh`,

	/** Public */
	REGISTER: `r`,
	REGISTER_WITH_EMAIL: 'r/email',
	REGISTER_USER_EXISTS_MODAL: {
		route: 'r/user-exists-modal/:email',
		getRoute: (email: string) => `r/user-exists-modal/${email}` as const,
	},
	REGISTER_CREATE_PASSWORD: {
		route: 'r/:email',
		getRoute: (email: string) => `r/${email}` as const,
	},
	REGISTER_CREATE_USERNAME: {
		route: 'r/:email/:password',
		getRoute: (email: string, password: string) => `r/${email}/${password}` as const,
	},

	REGISTER_CREATE_USER: 'r/create-user',

	LOGIN: {
		route: 'login/:email?',
		getRoute: (email: string) => `login/${email}` as const,
	},
	FORGOT_PASSWORD: 'login/reset-password',

	/** Main */
	MAIN: 'Main',

	/** Workouts */
	WORKOUTS: `w`,
	WORKOUT_DAYS: {
		route: `w/:workoutID/days`,
		getRoute: (workoutID: number) => `w/${workoutID}/days` as const,
	},
	WORKOUT_DAYS_DETAIL: {
		route: `w/:wktID/d/:dayID`,
		getRoute: (wktID: number, dayID: number) => `w/${wktID}/d/${dayID}` as const,
	},
	WORKOUT_DAY_EXERCISES: {
		route: `w/:wktID/d/:dayID/e`,
		getRoute: (wktID: number, dayID: number) => `w/${wktID}/d/${dayID}/e` as const,
	},
	WORKOUT_DAY_EXERCISES_DETAIL: {
		route: `w/:wktID/d/:dayID/e/:exID`,
		getRoute: (wktID: number, dayID: number, exID: number) => `w/${wktID}/d/${dayID}/e/${exID}` as const,
	},
	WORKOUT_DAY_EXERCISE_SECONDARY: {
		route: `w/:wktID/d/:dayID/e/:exID/secondary`,
		getRoute: (wktID: number, dayID: number, exID: number) => `w/${wktID}/d/${dayID}/e/${exID}/secondary` as const,
	},
	WORKOUT_DAY_EXERCISE_SECONDARY_ADD: {
		route: `w/:wktID/d/:dayID/e/:exID/secondary/add`,
		getRoute: (wktID: number, dayID: number, exID: number) => `w/${wktID}/d/${dayID}/e/${exID}/secondary/add` as const,
	},
	WORKOUT_DAY_EXERCISE_SETS: {
		route: `w/:wktID/d/:dayID/e/:exID/s`,
		getRoute: (wktID: number, dayID: number, exID: number) => `w/${wktID}/d/${dayID}/e/${exID}/s` as const,
	},
	WORKOUT_DAY_EXERCISE_SETS_DETAIL: {
		route: `w/:wktID/d/:dayID/e/:exID/s/:setID`,
		getRoute: (wktID: number, dayID: number, exID: number, setID: number) =>
			`w/${wktID}/d/${dayID}/e/${exID}/s/${setID}` as const,
	},

	/** Programs */
	PROGRAMS: `p`,
	PROGRAM_WEEKS: {
		route: `p/:prgID/weeks`,
		getRoute: (prgID: number) => `p/${prgID}` as const,
	},
	PROGRAM_WEEKS_DETAIL: {
		route: `p/:prgID/weeks/:weekID`,
		getRoute: (prgID: number, weekID: number) => `p/${prgID}/weeks/${weekID}` as const,
	},
	PROGRAM_WEEK_EXERCISES: {
		route: `p/:prgID/w/:weekID/e`,
		getRoute: (wktID: number, weekID: number) => `p/${wktID}/d/${weekID}/e` as const,
	},
	PROGRAM_WEEK_EXERCISES_DETAIL: {
		route: `p/:prgID/w/:weekID/e/:exID`,
		getRoute: (wktID: number, weekID: number, exID: number) => `p/${wktID}/d/${weekID}/e/${exID}` as const,
	},
	PROGRAM_WEEK_EXERCISE_SECONDARY: {
		route: `p/:prgID/w/:weekID/e/:exID/secondary`,
		getRoute: (wktID: number, weekID: number, exID: number) => `p/${wktID}/d/${weekID}/e/${exID}/secondary` as const,
	},
	PROGRAM_WEEK_EXERCISE_SECONDARY_ADD: {
		route: `p/:prgID/w/:weekID/e/:exID/secondary/add`,
		getRoute: (wktID: number, weekID: number, exID: number) => `p/${wktID}/d/${weekID}/e/${exID}/secondary/add` as const,
	},
	PROGRAM_WEEK_EXERCISE_SETS: {
		route: `p/:prgID/w/:weekID/e/:exID/s`,
		getRoute: (wktID: number, weekID: number, exID: number) => `p/${wktID}/d/${weekID}/e/${exID}/s` as const,
	},
	PROGRAM_WEEK_EXERCISE_SETS_DETAIL: {
		route: `p/:prgID/w/:weekID/e/:exID/s/:setID`,
		getRoute: (wktID: number, weekID: number, exID: number, setID: number) =>
			`p/${wktID}/d/${weekID}/e/${exID}/s/${setID}` as const,
	},

	/** Library Exercises */
	SETTINGS: 's',
	SETTINGS_ACCOUNT: `s/account`,
	SETTINGS_PREFERENCES: `s/preferences`,
	SETTINGS_MAXES: `s/maxes`,
	SETTINGS_LIBRARY: `s/library`,
	SETTINGS_LIBRARY_DETAIL: {
		route: `s/library/:exerciseID`,
		getRoute: (exerciseID: number) => `s/library/${exerciseID}` as const,
	},
	SETTINGS_DELETE: `s/delete`,
} as const

type Routes = typeof ROUTES
type RoutesKey = keyof Routes

type ExtractRouteName<TRoute> = TRoute extends { getRoute: (...args: any[]) => infer TRouteName } ? TRouteName : TRoute

type AllRoutes = {
	[K in RoutesKey]: ExtractRouteName<Routes[K]>
}[RoutesKey]

type Route = IsEqual<AllRoutes, string> extends true ? never : AllRoutes

export default ROUTES

export type { AllRoutes, Route }

/*
	EXERCISES: `user/exercises`,
	EXERCISE_DETAIL: {
		route: `user/exercises/<exercise_id>`,
		getRoute: (exercise_id: number) => `user/exercises/${exercise_id}` as const,
	},
	EXERCISE_SECONDARY: {
		route: `user/exercises/<exercise_id>/secondary`,
		getRoute: (exercise_id: number) => `user/exercises/${exercise_id}/secondary` as const,
	},
	EXERCISE_ADD_SECONDARY: {
		route: `user/exercises/<exercise_id>/secondary/add`,
		getRoute: (exercise_id: number) => `user/exercises/${exercise_id}/secondary/add` as const,
	},
	EXERCISE_SETS: {
		route: `user/exercises/<exercise_id>/sets`,
		getRoute: (exercise_id: number) => `user/exercises/${exercise_id}/sets` as const,
	},
	EXERCISE_SET_DETAIL: {
		route: `user/exercises/<exercise_id>/sets/<set_id>`,
		getRoute: (exercise_id: number, set_id: number) => `user/exercises/${exercise_id}/sets/${set_id}` as const,
	},
*/
