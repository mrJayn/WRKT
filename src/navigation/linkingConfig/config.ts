import type { LinkingOptions } from '@react-navigation/native'
import type { RootStackParamList } from '../types'
import NAVIGATORS from '@src/NAVIGATORS'
import SCREENS from '@src/SCREENS'
import ROUTES, { Route } from '@src/ROUTES'

const config: LinkingOptions<RootStackParamList>['config'] = {
	initialRouteName: NAVIGATORS.TABS_NAVIGATOR,
	screens: {
		// Main Routes
		[NAVIGATORS.REGISTER_NAVIGATOR]: {
			path: ROUTES.REGISTER,
			screens: {
				[SCREENS.REGISTER.WITH_EMAIL]: ROUTES.REGISTER_WITH_EMAIL,
				[SCREENS.REGISTER.USER_EXISTS_MODAL]: {
					path: ROUTES.REGISTER_USER_EXISTS_MODAL.route,
					exact: true,
				},
				[SCREENS.REGISTER.CREATE_PASSWORD]: {
					path: ROUTES.REGISTER_CREATE_PASSWORD.route,
					exact: true,
				},
				[SCREENS.REGISTER.CREATE_USERNAME]: {
					path: ROUTES.REGISTER_CREATE_USERNAME.route,
					exact: true,
				},
			},
		},
		[SCREENS.LOGIN]: {
			path: ROUTES.LOGIN.route,
			exact: true,
		},
		[SCREENS.FORGOT_PASSWORD]: ROUTES.FORGOT_PASSWORD,

		//
		[NAVIGATORS.TABS_NAVIGATOR]: {
			path: ROUTES.ROOT,
			screens: {
				[SCREENS.TABS.MAIN]: ROUTES.MAIN,
				[SCREENS.TABS.WORKOUTS]: ROUTES.WORKOUTS,
				[SCREENS.TABS.PROGRAMS]: ROUTES.PROGRAMS,
				[SCREENS.TABS.SETTINGS]: ROUTES.SETTINGS,
			},
		},

		[NAVIGATORS.WORKOUTS_NAVIGATOR]: {
			screens: {
				[SCREENS.WORKOUTS.DAYS]: {
					path: ROUTES.WORKOUT_DAYS.route,
				},
				[SCREENS.WORKOUTS.DAYS_DETAIL]: ROUTES.WORKOUT_DAYS_DETAIL.route,
			},
		},

		[NAVIGATORS.PROGRAMS_NAVIGATOR]: {
			screens: {
				[SCREENS.PROGRAMS.WEEKS]: ROUTES.PROGRAM_WEEKS.route,
				[SCREENS.PROGRAMS.WEEKS_DETAIL]: ROUTES.PROGRAM_WEEKS_DETAIL.route,
			},
		},

		[NAVIGATORS.SETTINGS_NAVIGATOR]: {
			screens: {
				[SCREENS.SETTINGS.ACCOUNT]: ROUTES.SETTINGS_ACCOUNT,
				[SCREENS.SETTINGS.PREFERENCES]: ROUTES.SETTINGS_PREFERENCES,
				[SCREENS.SETTINGS.MAXES]: ROUTES.SETTINGS_MAXES,
				[SCREENS.SETTINGS.LIBRARY]: ROUTES.SETTINGS_LIBRARY,
				[SCREENS.SETTINGS.DELETE_ACCOUNT]: ROUTES.SETTINGS_DELETE,
			},
		},
		// [SCREENS.WORKOUTS.ROOT]: {
		// 	path: 'workouts/:workout/:days',
		// 	parse: {
		// 		workout: Number,
		// 	},
		// },
		// [SCREENS.NOT_FOUND]:"*",
	},
}

export default config
